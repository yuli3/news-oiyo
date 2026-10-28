// WHY 2026-10-29: use one attribution contract in drafts and upload metadata;
// rendering a link never publishes a post or changes an Instagram profile.
export function socialAttributionUrl(site, platform, date) {
  const origins = { news: "https://news.oiyo.net/", show: "https://show.oiyo.net/" };
  if (!origins[site] || !["youtube", "instagram", "x"].includes(platform)) throw new RangeError("Unsupported social destination");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new RangeError("Expected briefing date");
  const url = new URL(origins[site]);
  url.search = new URLSearchParams({ utm_source: platform, utm_medium: platform === "x" ? "social" : "shorts", utm_campaign: `briefing-${date}` }).toString();
  return url.href;
}
