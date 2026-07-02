# news.oiyo.net — OIYO News

개인용 트렌드 뉴스 뷰어 (HN/GeekNews 스타일). `trend_scout` cron이 매일 수집한
HN·Lobsters·GeekNews 큐레이션 + **미국·한국 증시**(S&P·Nasdaq·Dow·KOSPI·KOSDAQ,
관심종목·배당ETF)를 한 페이지로 보여준다. **noindex** (내부용).

## 데이터 흐름

```
trend_scout.py (cron 매일 10시)  → company-brain/.../sources/trends/YYYY-MM-DD.md
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
