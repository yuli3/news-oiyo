import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// news.oiyo.net — OIYO 패밀리 뉴스 (디자인·코딩·AI·프로그래밍·경제·주식 데일리 큐레이션).
// 2026-07-04 공개 전환: noindex 해제, sitemap 추가. 데이터는 sync가 레포 안으로 복사.
export default defineConfig({
  site: "https://news.oiyo.net",
  integrations: [
    sitemap({
      filter: (page) => !/\/\d{4}-\d{2}-\d{2}\/?$/.test(page),
    }),
  ],
});
