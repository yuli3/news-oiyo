// Article + HowTo structured data for a use-case guide page, any language.
import type { Guide } from "./ai-use-cases";
import { UI, guidePath, type Locale } from "./ai-i18n";

export function guideJsonLd(lang: Locale, guide: Guide): object[] {
  const name = guide.title.replace(/\s*[(（].*[)）]$/, "");
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      inLanguage: lang === "zh" ? "zh-CN" : lang,
      url: `https://news.oiyo.net${guidePath(lang, guide.slug)}`,
      datePublished: guide.checked,
      dateModified: guide.checked,
      author: { "@type": "Organization", name: lang === "ko" ? "OIYO 편집부" : "OIYO News", url: "https://news.oiyo.net/" },
      keywords: guide.keywords.join(", "),
      citation: [...new Set(guide.tools.map((t) => t.source.url))],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `${name} ${UI[lang].workflowSuffix}`,
      step: guide.workflow.map((w, i) => ({ "@type": "HowToStep", position: i + 1, name: w.step, text: w.detail })),
    },
  ];
}
