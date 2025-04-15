"use server";

import {
  SourceLanguageCode,
  TargetLanguageCode
} from "@/interfaces/translation";
import { Translator } from "deepl-node";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const translator = new Translator(DEEPL_API_KEY!);

export async function translateText(
  text: string,
  target_lang: TargetLanguageCode,
  source_lang: SourceLanguageCode | null
) {
  try {
    const result = await translator.translateText(
      text,
      source_lang || null,
      target_lang
    );
    return result.text;
  } catch (error) {
    console.log("Translation error:", error);
    throw new Error("Translation failed. Please try again.");
  }
}
