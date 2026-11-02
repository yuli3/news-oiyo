import { pdfGuides } from "./pdf-table-guide";
// Use-case guides and keyword maps for every language (2026-10-20). Korean lives in ai-use-cases.ts
// (+ ko-extra for the creative guides, ko-work for batch 2); other languages are country-specific files in
// ai-use-cases-locales/, with batch 2 (2026-10-21) in the matching *-work file.
import type { Locale } from "./ai-i18n";
import { GUIDES, KEYWORD_MAP, type Guide, type KeywordCategory } from "./ai-use-cases";
import * as en from "./ai-use-cases-locales/en";
import * as ja from "./ai-use-cases-locales/ja";
import * as zh from "./ai-use-cases-locales/zh";
import * as fr from "./ai-use-cases-locales/fr";
import * as es from "./ai-use-cases-locales/es";
import { guides as enWork } from "./ai-use-cases-locales/en-work";
import { guides as jaWork } from "./ai-use-cases-locales/ja-work";
import { guides as zhWork } from "./ai-use-cases-locales/zh-work";
import { guides as frWork } from "./ai-use-cases-locales/fr-work";
import { guides as esWork } from "./ai-use-cases-locales/es-work";

export const GUIDES_BY_LOCALE: Record<Locale, { guides: Guide[]; keywordMap: KeywordCategory[] }> = {
  ko: { guides: GUIDES, keywordMap: KEYWORD_MAP },
  en: { guides: [...en.guides, ...enWork, pdfGuides.en], keywordMap: en.keywordMap },
  ja: { guides: [...ja.guides, ...jaWork, pdfGuides.ja], keywordMap: ja.keywordMap },
  zh: { guides: [...zh.guides, ...zhWork, pdfGuides.zh], keywordMap: zh.keywordMap },
  fr: { guides: [...fr.guides, ...frWork, pdfGuides.fr], keywordMap: fr.keywordMap },
  es: { guides: [...es.guides, ...esWork, pdfGuides.es], keywordMap: es.keywordMap },
};
