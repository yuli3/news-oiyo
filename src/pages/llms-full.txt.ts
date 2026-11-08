import type { APIRoute } from "astro";
import data from "../data/news.json";
import { flattenFeed, hasDetailPage, publicDaySummary, type Day } from "../lib/feed";

/**
 * Machine-readable Comprehensive LLM Context File (llms-full.txt)
 * Adheres to the /llms-full.txt standard for AI search engines and agents
 * (ChatGPT Search, Perplexity, Claude, Google AI Overviews, Copilot).
 * Exposes the curated AI & financial market briefings, AI model catalog endpoints,
 * and AI-native company architecture documentation on news.oiyo.net.
 */

export const GET: APIRoute = async () => {
  const base = "https://news.oiyo.net";
  const days = (data.days as Day[]).slice(0, 30);
  const detailedItems = flattenFeed(data.days as Day[], { includeRepos: true })
    .filter(hasDetailPage)
    .slice(0, 60);

  const lines: string[] = [
    `# OIYO News — Full AI, Tech & Financial Market Briefings Catalog (llms-full.txt)`,
    ``,
    `> Source-linked daily AI, engineering, and market briefings with Korean synthesis, plus maintained AI model catalogs and AI-native operating system manuals.`,
    `> Canonical Domain: ${base}`,
    `> Primary Language: ko (Korean), with English support on select AI reference pages`,
    `> Machine-readable AI Model Catalog: ${base}/ai/data/ai-models.json`,
    `> Short LLM Manifest: ${base}/llms.txt`,
    ``,
    `## Core Sections & Reference Manuals`,
    `- Daily Curated News Home: ${base}/`,
    `- AI Models, Pricing & Curation Hub: ${base}/ai/`,
    `- Curated AI Services & Dataset Directory: ${base}/ai/curator/`,
    `- Financial & Market Briefings: ${base}/finance/`,
    `- Chronological Daily Archive: ${base}/archive/`,
    `- AI-Native Company Systems Architecture: ${base}/systems/`,
    `- Operational Manual (Setup, Agents, Brain, Gates, Loops): ${base}/systems/manual/`,
    `- Reusable Agent Playbooks: ${base}/systems/playbooks/`,
    ``,
    `## Recent Daily Briefings (Last 30 Days)`,
    ``,
  ];

  for (const day of days) {
    const summary = publicDaySummary(day.summary).replace(/\s+/g, " ").trim();
    lines.push(`### ${day.date} — ${base}/${day.date}/`);
    if (summary) {
      lines.push(`- Summary: ${summary.slice(0, 240)}`);
    }
    lines.push(`- Curated Items: ${day.items.length}`);
    lines.push(``);
  }

  lines.push(`## Recent Detailed Korean Analysis & Translations`);
  lines.push(``);
  for (const item of detailedItems) {
    const cleanSummary = (item.detailSummary ?? "").replace(/\s+/g, " ").trim();
    lines.push(`- [${item.title}](${base}/item/${item.id}/) (${item.date}, source: ${item.src})`);
    if (cleanSummary) {
      lines.push(`  * Summary: ${cleanSummary.slice(0, 180)}`);
    }
  }

  lines.push(``);
  lines.push(`## Sister Network Services`);
  lines.push(`- Interactive Self-Discovery & Psychological Tools: https://oiyo.net`);
  lines.push(`- Academic Lectures & Calculators: https://blog.oiyo.net`);
  lines.push(`- Instant Browser Games Studio: https://game.oiyo.net`);
  lines.push(`- Encyclopedic Reference: https://wiki.oiyo.net`);
  lines.push(``);

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
};
