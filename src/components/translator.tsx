"use client";

import { PickerType } from "@/constants/languages";
import LanguagePicker from "./languagePicker";
import TextOptions from "./textOptions";
import { useToast } from "@/hooks/useToast";
import { SwipeIcon } from "./icons";
import clsx from "clsx";
import { useTranslate } from "@/hooks/useTranslate";
import {
  SourceLanguageCode,
  TargetLanguageCode
} from "@/interfaces/translation";

export default function Translator() {
  const { showToast, showToastNotification, toastMessage } = useToast();
  const {
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
  } = useTranslate({
    showNotification: showToastNotification
  });

  return (
    <div className="relative">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <div className="rounded-xl shadow-[0px_4px_15px_2px_rgba(0,_0,_0,_0.1)] p-4 md:p-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source language section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <LanguagePicker
                type={PickerType.From}
                value={sourceLanguage}
                onChange={(lan) => setSourceLanguage(lan as SourceLanguageCode)}
              />
              <TextOptions
                value={sourceText}
                language={sourceLanguage}
                showNotification={showToastNotification}
              />
            </div>
            <textarea
              ref={sourceRef}
              placeholder="Enter text to translate"
              className="w-full min-h-[200px] p-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ccc1ee] focus:border-transparent resize-none bg-white"
              defaultValue={sourceText}
              onChange={handleChangeSourceText}
            />
          </div>

          {/* Target language section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <LanguagePicker
                type={PickerType.To}
                value={targetLanguage}
                onChange={(lan) => setTargetLanguage(lan as TargetLanguageCode)}
              />
              <TextOptions
                value={translatedText}
                language={targetLanguage}
                showNotification={showToastNotification}
                copyEnabled
              />
            </div>
            <textarea
              placeholder="Translation"
              className={clsx(
                "w-full min-h-[200px] p-3 rounded-md border border-slate-300 bg-white/95 focus:outline-none focus:ring-2 focus:ring-[#ccc1ee] focus:border-transparent resize-none",
                {
                  "cursor-not-allowed": isTyping,
                  "text-gray-500": isTyping
                }
              )}
              value={isTyping ? "Loading..." : translatedText}
              readOnly
            />
          </div>
        </div>

        {/* Swap languages button */}
        <div className="flex justify-center mt-4">
          <button
            className="rounded-full h-10 w-10 flex items-center justify-center bg-white shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#ccc1ee]"
            onClick={handleSwapLanguages}
          >
            <SwipeIcon />
            <span className="sr-only">Swap languages</span>
          </button>
        </div>
      </div>
    </div>
  );
}
