import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// news.oiyo.net — OIYO 패밀리 뉴스 (디자인·코딩·AI·프로그래밍·경제·주식 데일리 큐레이션).
// 2026-07-04 공개 전환: noindex 해제, sitemap 추가. 데이터는 sync가 레포 안으로 복사.
export default defineConfig({
  site: "https://news.oiyo.net",
  integrations: [
    sitemap({
      // 2026-09-08 뒤집었다. 사이트맵 52개 중 29개가 `/page/N/` 페이지네이션이었고,
      // 본문 1만 자짜리 날짜 페이지 39개는 이 필터가 걷어내고 있었다 — 광고한 적 없는
      // 콘텐츠가 노출되지 않는 것은 콘텐츠 문제가 아니다.
      // 페이지네이션은 90일 노출 0 이라 빼도 잃을 것이 없다(blog 와 같은 정책).
      filter: (page) => !/\/page\/\d+\/?$/.test(page),
    }),
  ],
});
