# X AI 트렌딩 ("X에서 뜨는 AI 이야기")

2026-10-14부터 날짜 페이지(`/<date>/`)에 X에서 화제가 된 AI 게시물을 정적 카드로 붙여요. 기획: `company-brain/projects/oiyo-ecosystem/news-x-ai-trending-plan-2026-10-13.md`.

## 수집은 Grok Bot만 해요

X 읽기 권한은 Grok Bot의 `x` MCP에만 있어요. 다른 에이전트(Claude, Codex 등)는 X를 수집하지 않고, 스크래핑도 하지 않아요. 파일이 없는 날짜는 섹션이 그냥 안 보여요.

- 도구: `search_news`(AI 스토리, 24h), `search_posts_all`(스토리 키워드, `-is:retweet -is:reply`), `get_trends_by_woeid`(한국 23424868), 필요하면 `get_posts_by_ids`로 원 게시물 지표 확인.
- 한도: 분당 30, 일 1000, 호출당 25건. 하루 예산 ~50호출.
- `min_faves:` 같은 참여도 연산자는 안 돼요. 노출이 적은 잡글, 복붙 스팸, 코인 홍보, 욕설·비방 글은 직접 걸러요.
- 오늘 news 항목과 같은 이야기면 `related_item_ids`에 항목 id를 적어요.

## 파일: `data/x-trending/<date>.json`

```json
{
  "schema": "x-trending/v1",
  "date": "2026-10-14",
  "collected_at": "…+09:00",
  "collected_by": "Grok Bot",
  "budget": { "calls_used": 12 },
  "posts": [{
    "id": "…", "url": "https://x.com/<handle>/status/<id>",
    "author": { "username": "…", "name": "…", "followers": 0 },
    "created_at": "…Z",
    "quote": "원문 그대로의 앞부분(~200자, 수정 금지)",
    "metrics": { "like": 0, "repost": 0, "reply": 0, "quote": 0, "bookmark": 0, "impression": 0 },
    "topic": "짧은 주제",
    "summary_ko": "직접 쓴 해요체 한국어 요약 1–2문장",
    "link": "게시물이 가리키는 외부 URL 또는 null",
    "related_item_ids": []
  }]
}
```

## 표시 규칙

- `src/components/XTrending.astro`가 `[date].astro`에서 그날 파일을 읽어 카드로 그려요. 임베드나 외부 스크립트는 없어요.
- 카드: 작성자 이름·@핸들, 짧은 인용, 한국어 요약, x.com 링크(+ 링크된 글).
- 게시물 전문 번역은 하지 않아요. 긴 GeekNews식 번역은 게시물이 가리키는 외부 1차 출처를 news 항목으로 넣을 때만 `docs/translation-workflow.md` 규칙대로 해요.
- Grok 스토리 요약(`search_news`) 문장을 그대로 옮기지 않아요. 게시물과 링크를 읽고 다시 써요.
