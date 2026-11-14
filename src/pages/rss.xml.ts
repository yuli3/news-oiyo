import type { APIRoute } from "astro";
import data from "../data/news.json";
import { flattenFeed, type Day } from "../lib/feed";
import { buildRss } from "../lib/rss";

export const GET: APIRoute = () =>
  new Response(buildRss(flattenFeed(data.days as Day[])), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
