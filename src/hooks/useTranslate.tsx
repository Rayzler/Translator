import { translateText } from "@/app/actions/translate";
import { AUTO_LANGUAGE } from "@/constants/languages";
import { AutoLanguageCode } from "@/interfaces/translation";
import {
  SourceLanguageCode,
  TargetLanguageCode
} from "@/interfaces/translation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  showNotification: (message: string) => void;
};

export const useTranslate = ({ showNotification }: Props) => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<
    SourceLanguageCode | AutoLanguageCode
  >("auto");
  const [targetLanguage, setTargetLanguage] =
    useState<TargetLanguageCode>("en-US");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (sourceText.trim() === "") {
      setTranslatedText("");
      return;
    }
    translateText(
      sourceText,
      targetLanguage,
      sourceLanguage == AUTO_LANGUAGE ? null : sourceLanguage
    )
      .then((response) => {
        setTranslatedText(response);
      })
      .catch(() => {
        showNotification("Translation failed. Please try again.");
        setTranslatedText("");
      })
      .finally(() => {
        setIsTyping(false);
      });
  }, [sourceText, sourceLanguage, targetLanguage]);

  // Swap languages
  const handleSwapLanguages = () => {
    if (sourceLanguage === AUTO_LANGUAGE) {
      showNotification("Auto language cannot be swapped.");
      return;
    }

    setSourceLanguage(targetLanguage.split("-")[0] as SourceLanguageCode);
    setTargetLanguage(
      sourceLanguage === "en" ? "en-US" : (sourceLanguage as TargetLanguageCode)
    );
    setSourceText(translatedText);
    setTranslatedText("");
    if (sourceRef.current) {
      sourceRef.current.value = translatedText;
      sourceRef.current.focus();
    }
  };

  const sourceRef = useRef<HTMLTextAreaElement>(null);

  const debounced = useDebouncedCallback((value: string) => {
    setSourceText(value);
  }, 500);

  const handleChangeSourceText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.target.value.trim() === "") {
      setTranslatedText("");
      return;
    }
    debounced(evt.target.value);
    setIsTyping(true);
  };

  return {
    sourceRef,
    sourceText,
    translatedText,
    sourceLanguage,
    targetLanguage,
    isTyping,
    setSourceLanguage,
    setTargetLanguage,
    handleChangeSourceText,
    handleSwapLanguages
  };
};
