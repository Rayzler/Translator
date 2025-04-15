import {
  AutoLanguageCode,
  SourceLanguageCode,
  TargetLanguageCode
} from "@/interfaces/translation";
import { VolumeIcon, CopyIcon } from "./icons";

type Props = {
  value: string;
  language: SourceLanguageCode | TargetLanguageCode | AutoLanguageCode;
  showNotification?: (message: string) => void;
  copyEnabled?: boolean;
};

const TextOptions = ({
  value,
  language,
  showNotification,
  copyEnabled
}: Props) => {
  // Copy translated text
  const handleCopyText = () => {
    navigator.clipboard.writeText(value);
    showNotification && showNotification("Copied to clipboard");
  };

  // Text-to-speech (mock implementation)
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(value);
      // TODO: Set the language based on the selected language
      // utterance.lang = BCP47_LANGUAGES[language as LanguageCode];
      window.speechSynthesis.speak(utterance);
    } else {
      showNotification &&
        showNotification("Your browser does not support text-to-speech");
    }
  };

  return (
    <div className="flex space-x-2">
      {value && (
        <button
          onClick={handleSpeak}
          className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ccc1ee]"
          title="Listen"
        >
          <VolumeIcon />
        </button>
      )}
      {value && copyEnabled && (
        <button
          onClick={handleCopyText}
          className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ccc1ee]"
          title="Copy to clipboard"
        >
          <CopyIcon />
        </button>
      )}
    </div>
  );
};

export default TextOptions;
