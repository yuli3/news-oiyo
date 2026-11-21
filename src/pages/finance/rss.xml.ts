import type { APIRoute } from "astro";
import data from "../../data/news.json";
import { flattenFeed, type Day } from "../../lib/feed";
import { buildRss, SECTION_CHANNELS } from "../../lib/rss";
import { storySections } from "../../../scripts/lib/story-scope.mjs";

export const GET: APIRoute = () =>
  new Response(
    buildRss(flattenFeed(data.days as Day[]).filter((item) => storySections(item).includes("finance")), new Date(), SECTION_CHANNELS.finance),
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
