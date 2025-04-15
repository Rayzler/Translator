import { useState, useRef, useEffect } from "react";

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toast notification handler
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    // Clear any existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    // Hide toast after 3 seconds
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Cleanup toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  return {
    showToast,
    toastMessage,
    showToastNotification
  };
};
