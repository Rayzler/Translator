import type { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from "./constants.ts";

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;

interface TranslationState {
    fromLanguage: Language | AutoLanguage;
    toLanguage: Language;
    fromText: string;
    result: string;
    loading: boolean;
}

export type TranslationAction =
    | { type: "INTERCHANGE_LANGUAGES" }
    | { type: "SET_FROM_LANGUAGE", payload: Language | AutoLanguage }
    | { type: "SET_TO_LANGUAGE", payload: Language }
    | { type: "SET_FROM_TEXT", payload: string }
    | { type: "SET_RESULT", payload: string }

export enum SectionType {
    From = "from",
    To = "to"
}

export interface BodyRequestAPI {
    text: string;
    target_lang: string;
    source_lang?: string | null;
}