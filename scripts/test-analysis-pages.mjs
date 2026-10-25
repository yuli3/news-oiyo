// 2026-10-15: verify the public build, not source strings that may fail Markdown rendering.
// Run after npm run build: node --test scripts/test-analysis-pages.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
const locales = ["ko", "en", "ja", "zh", "fr", "es"];
const slug = "ai-price-performance";
const read = path => readFileSync(path, "utf8");
const canonical = lang => `https://news.oiyo.net/analysis/${lang}/${slug}/`;
const getTags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(m => m[0]);
const attr = (tag, key) => tag.match(new RegExp(`(?:^|\\s)${key}="([^"]*)"`))?.[1];
const links = html => getTags(html, "a").map(tag => attr(tag, "href")).filter(Boolean);
const requiredSources = ["https://claude.com/pricing", "https://developers.openai.com/siwc/quickstart", "https://developers.openai.com/api/docs/pricing", "https://platform.claude.com/docs/en/about-claude/pricing", "https://ai.google.dev/gemini-api/docs/pricing", "https://artificialanalysis.ai/methodology/intelligence-benchmarking/", "https://www.swebench.com/verified.html", "https://artificialanalysis.ai/methodology/performance-benchmarking", "https://ai.google.dev/gemini-api/terms"];
const sitemaps = readdirSync("dist").filter(name => /^sitemap-\d+\.xml$/.test(name)).map(name => read(`dist/${name}`)).join("");

for (const lang of locales) {
  test(`${lang}: rendered article, language, evidence and search metadata`, () => {
    const html = read(`dist/analysis/${lang}/${slug}/index.html`);
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    assert.equal(getTags(html, "h1").length, 1);
    // WHY 2026-10-25: the existing sourced-price and review sections were added after this test.
    // Keep the original six-section prose contract below, and assert both additions explicitly.
    assert.equal(getTags(html, "h2").length, 9);
    assert.equal(getTags(html, "table").length, 4);
    assert.equal(getTags(html, "caption").length, 4);
    assert.equal(getTags(html, "pre").length, 0);
    assert.ok(!html.includes("**"), "no literal Markdown emphasis");
    const canonicalTag = getTags(html, "link").find(tag => attr(tag,"rel") === "canonical");
    assert.equal(attr(canonicalTag,"href"), canonical(lang));
    for (const other of locales) {
      const alternate = getTags(html, "link").find(tag => attr(tag,"hreflang") === other);
      assert.equal(attr(alternate,"href"), canonical(other));
    }
    assert.ok(sitemaps.includes(`<loc>${canonical(lang)}</loc>`));
    const completeArticle = html.match(/<article>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(completeArticle?.includes('data-official-prices="2026-10-23"'));
    assert.ok(completeArticle?.includes('data-review-cost'));
    assert.ok(completeArticle?.includes('data-review-rate="0"'));
    assert.ok(completeArticle?.includes('data-review-rate="0.30"'));
    const articleHtml = completeArticle?.split('<section data-official-prices=')[0];
    // Equal character floors penalize CJK translations without testing completeness.
    // Freeze this article's full structure; independent prose review checks meaning.
    assert.ok(articleHtml);
    assert.equal(getTags(articleHtml, "h2").length, 6);
    assert.equal(getTags(articleHtml, "p").length, 24); // includes the existing official-price scope paragraph
    assert.equal(getTags(articleHtml, "tr").length, 16);
    for (const source of requiredSources) assert.ok(links(articleHtml).includes(source), source);
    for (const table of [...html.matchAll(/<table>([\s\S]*?)<\/table>/g)]) {
      assert.match(table[1], /scope="col"/); assert.match(table[1], /scope="row"/);
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const article = schemas.find(s => s["@type"] === "Article");
    assert.equal(article.inLanguage, lang); assert.equal(article.mainEntityOfPage, canonical(lang));
    assert.equal(article.datePublished, "2026-10-15"); assert.equal(article.dateModified, "2026-10-23");
    assert.ok(schemas.some(s => s["@type"] === "BreadcrumbList"));
    for (const href of links(html).filter(h => h.startsWith("/"))) {
      const path = href.split(/[?#]/)[0];
      assert.ok(existsSync(`dist${path}${path.endsWith("/") ? "index.html" : ""}`), href);
    }
  });
  test(`${lang}: hypothetical costs and equal meter scale survive rendering`, () => {
    const html = read(`dist/analysis/${lang}/${slug}/index.html`);
    const meters = getTags(html, "meter");
    assert.equal(meters.length, 2);
    assert.deepEqual(meters.map(t => attr(t, "max")), ["56", "56"]);
    assert.deepEqual(meters.map(t => attr(t, "value")), ["56", "19.25"]);
    for (const meter of meters) assert.ok(attr(meter, "aria-label")?.length > 8);
    const table = [...html.matchAll(/<table>([\s\S]*?)<\/table>/g)][1][1];
    for (const value of ["$2.00", "$5.00", "$54.00", "$14.25", "$56.00", "$19.25"]) assert.ok(table.includes(value), value);
    assert.equal((2 + 60 * 3 * 0.30).toFixed(2), "56.00");
    assert.equal((5 + 95 * 0.5 * 0.30).toFixed(2), "19.25");
    assert.equal((56 / 60).toFixed(2), "0.93");
    assert.equal((19.25 / 95).toFixed(2), "0.20");
  });
}
test("AI hub → analysis index → all six articles: no orphaned article", () => {
  assert.ok(links(read("dist/ai/index.html")).includes("/analysis/"));
  const index = read("dist/analysis/index.html");
  for (const lang of locales) assert.ok(links(index).includes(`/analysis/${lang}/${slug}/`));
});
