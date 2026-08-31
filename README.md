# news.oiyo.net — OIYO News

개인용 트렌드 뉴스 뷰어 (HN/GeekNews 스타일). repo 소유 수집기
`scripts/collect-news.mjs`가 모은 HN·Lobsters·GeekNews·공식 AI 소스 큐레이션과
**미국·한국 증시**를 한 페이지로 보여준다. `trend_scout.py`와 Hermes 수집 스킬은 폐기됐다.

## 데이터 흐름

```
scripts/collect-news.mjs          → company-brain/.../sources/trends/YYYY-MM-DD.md
stock_analysis cron              → company-brain/reports/market-latest.json
  → npm run update # collect → audit:trends → sync → src/data/news.json
  → local commit   # 여러 변경을 모은 뒤 승인된 배치 push로 Cloudflare 배포
```

빌드는 레포 안 `src/data/news.json`만 읽는다 (레포 밖 파일을 빌드에서 읽지 않음).

## 로컬

```bash
npm install
npm run update  # 수집 → 감사 → 두뇌 및 news.json 반영
npm run dev     # localhost:4321
npm run build
```

## 배포 셋업 (1회, 사용자)

1. Cloudflare Pages → 새 프로젝트 → `yuli3/news-oiyo` 연결 (build: `npm run build`, output: `dist`)
2. Custom domain: `news.oiyo.net`

## 갱신·배포 정책

특정 런타임의 스킬·크론에 수집 능력을 두지 않는다. `npm run update`로 갱신하고 명시 경로만 로컬 커밋한다. 작은 갱신마다 push하지 않고 상당한 양이 모였을 때 사용자 승인 배치로 push한다.
