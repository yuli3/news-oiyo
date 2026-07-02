import { defineConfig } from "astro/config";

// news.oiyo.net — 개인용 트렌드 뉴스 뷰어 (HN/GeekNews 스타일).
// 데이터는 scripts/sync-news.mjs가 company-brain 트렌드 노트에서 레포 안
// src/data/news.json으로 복사해 두고, 빌드는 레포 안 파일만 읽는다.
export default defineConfig({
  site: "https://news.oiyo.net",
});
