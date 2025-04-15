import {
  AUTO_LANGUAGE,
  SOURCE_LANGUAGES,
  TARGET_LANGUAGES
} from "@/constants/languages";

export type SourceLanguageCode = keyof typeof SOURCE_LANGUAGES;
export type TargetLanguageCode = keyof typeof TARGET_LANGUAGES;
export type AutoLanguageCode = typeof AUTO_LANGUAGE;