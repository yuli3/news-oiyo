# news.oiyo.net — OIYO News

개인용 트렌드 뉴스 뷰어 (HN/GeekNews 스타일). Hermes 스킬 `oiyo-news-feed`(크론
매일 10시 KST)가 수집한 HN·Lobsters·GeekNews·TechCrunch·GitHub 큐레이션 +
**미국·한국 증시**를 한 페이지로 보여준다. `trend_scout.py`는 폐기.

## 데이터 흐름

```
oiyo-news-feed (cron 매일 10시)  → company-brain/.../sources/trends/YYYY-MM-DD.md
stock_analysis cron              → company-brain/reports/market-latest.json
  → npm run sync   # scripts/sync-news.mjs → src/data/news.json (레포 안으로 복사)
  → git commit && push   # Cloudflare Pages 자동 빌드·배포
```

빌드는 레포 안 `src/data/news.json`만 읽는다 (레포 밖 파일을 빌드에서 읽지 않음).

## 로컬

```bash
npm install
npm run sync    # 두뇌 → news.json
npm run dev     # localhost:4321
npm run build
```

## 배포 셋업 (1회, 사용자)

1. Cloudflare Pages → 새 프로젝트 → `yuli3/news-oiyo` 연결 (build: `npm run build`, output: `dist`)
2. Custom domain: `news.oiyo.net`

## 갱신 자동화 (선택)

hermes cron에 daily 스텝 추가: `cd ~/coding/news && npm run sync && git add -A && git commit -m "sync $(date +%F)" && git push`
