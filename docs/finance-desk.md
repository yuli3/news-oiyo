# 금융 데스크 수집 (2026-10-16)

`/finance/`는 `storySections(item)`이 `finance`를 돌려주는 항목을 보여 줘요(`scripts/lib/story-scope.mjs`). 2026-10-16부터 `npm run collect`가 금융 전용 피드를 직접 모아요. 이제 company-brain의 `sources.json`을 손으로 고칠 필요가 없어요.

## 범위

부동산, 금, 금융(은행·저축은행·증권·보험·대출), 투자, 정책 변화(한국은행·재정경제부·Fed·SEC·금융위·과세), 주식, ETF, 배당, 크립토를 다뤄요.

- **소스로 판정해요.** `FINANCE_SOURCES`에 있는 피드의 항목은 제목에 키워드가 없어도 금융 데스크에 실려요. 소스만으로 AI 데스크에 실리지는 않아요.
- **키워드로도 판정해요.** `FINANCE_SCOPE`가 다른 소스(GeekNews, ZDNet 등)의 금융 기사를 잡아요. `은행나무`, `memory bank`, `10 sec` 같은 비슷한 말은 걸러요. 테스트는 `npm run test:story-scope`예요.
- 선별(`select()`)은 AI 신호, 금융 신호, 금융 전용 피드 중 하나면 통과해요. 추측과 YMYL 제외(`EXCLUDE`), 이전 날짜 중복 제외는 그대로 적용해요.

## 피드 (`FINANCE_FEEDS` in `scripts/collect-news.mjs`)

| id | 피드 | 최대/일 | 나이 제한 | 2026-10-16 Mac mini 확인 |
|---|---|---|---|---|
| `hankyung-finance` | https://www.hankyung.com/feed/finance | 6 | 36h | 200, 50건, 본문 읽힘 |
| `hankyung-realestate` | https://www.hankyung.com/feed/realestate | 4 | 36h | 200, 50건, 본문 읽힘 |
| `mk-economy` | https://www.mk.co.kr/rss/30100041/ | 5 | 36h | 200, 50건, 본문 읽힘 |
| `bok` | https://www.bok.or.kr/portal/bbs/P0000559/news.rss?menuNo=200690 | 3 | 72h | 200, 100건, 본문 읽힘 |
| `moef` | https://mofe.go.kr/com/detailRssTagService.do?bbsId=MOSFBBS_000000000028 | 3 | 48h | 200, 40건, 상세는 thin(JS 렌더링)이라 제목만 있어요 |
| `federal-reserve` | https://www.federalreserve.gov/feeds/press_all.xml | 3 | 72h | 200, 20건, 본문 읽힘 |
| `sec` | https://www.sec.gov/news/pressreleases.rss | 3 | 48h | 200, 25건, 본문 읽힘 |
| `coindesk` | https://www.coindesk.com/arc/outboundfeeds/rss/ | 4 | 36h | 200, 25건, 본문 읽힘 |
| `cnbc-finance` | https://www.cnbc.com/id/10000664/device/rss/rss.html | 4 | 36h | 200, 30건, 본문 읽힘 |

피드 하나가 실패해도 수집은 계속돼요(`raw == 0`만 실패). 하루 최대 35건이고, 나이 제한과 이전 날짜 중복 제외 때문에 실제로는 더 적어요.

### 확인했지만 넣지 않은 소스

- 한국은행 보도자료 `B0000338/news.rss`: 200이지만 2024년에서 멈춰 있어요.
- 금융위원회 `fsc.go.kr` RSS: 503이에요.
- 금융감독원 RSS: 200이지만 항목이 0건이에요.
- 정책브리핑 `korea.kr/rss/dept_*.xml`: 404예요.
- Yahoo Finance RSS: 차단 페이지가 와요(Mac mini, box 둘 다).
- Kitco 금 뉴스 RSS: 404예요.
- 이데일리 증권 RSS: 항목이 0건이에요.
- Reuters: 401, needs-browser예요. 페이월이나 캡차는 우회하지 않아요.

## 번역

금융 항목도 `docs/translation-workflow.md` 규칙 그대로 요약과 본문 번역을 써요. 한국경제와 매일경제의 유료 기사(페이월)는 우회하지 않고 `blocked`로 둬요. 재정경제부 상세처럼 본문이 비면 피드 제목과 1차 출처 첨부만 기준으로 쓰고 `partial`이나 `blocked`로 표시해요.
