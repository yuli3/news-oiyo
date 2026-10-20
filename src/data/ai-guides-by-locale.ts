// Use-case guides and keyword maps for every language (2026-10-20). Korean lives in ai-use-cases.ts
// (+ ko-extra for the creative guides); other languages are country-specific files in ai-use-cases-locales/.
import type { Locale } from "./ai-i18n";
import { GUIDES, KEYWORD_MAP, type Guide, type KeywordCategory } from "./ai-use-cases";
import * as en from "./ai-use-cases-locales/en";
import * as ja from "./ai-use-cases-locales/ja";
import * as zh from "./ai-use-cases-locales/zh";
import * as fr from "./ai-use-cases-locales/fr";
import * as es from "./ai-use-cases-locales/es";

export const GUIDES_BY_LOCALE: Record<Locale, { guides: Guide[]; keywordMap: KeywordCategory[] }> = {
  ko: { guides: GUIDES, keywordMap: KEYWORD_MAP },
  en, ja, zh, fr, es,
};
