# 본문 번역 워크플로 (GeekNews식 요약 + 번역)

2026-10-13부터 그날 항목 **전부**에 대해 두 가지를 직접 써요.

1. **요약(`summary`)**: 원문을 읽은 사람이나 에이전트가 직접 쓴 한국어 1–3문장, 최대 240자예요. 이 요약이 피드 원문 텍스트(GeekNews Atom 등)보다 우선하고, `AGENTS.md`의 2026-09-23 요약 정책을 덮어써요.
2. **본문 번역(`translationKo`)**: 상세 페이지 `/item/<id>/`의 "본문 번역" 섹션에 들어가는 긴 한국어 번역·해설이에요.

어떤 도구나 에이전트로 써도 돼요. 단, **로컬 LLM이나 스크립트 파이프라인으로 자동 생성하지 않아요.** 원문을 직접 읽고 직접 써요.

## SSOT: `src/data/translations/<date>/<id>.md`

`news.json`은 `sync-news.mjs`가 매번 다시 만들어요. 번역은 이 md 파일에만 두고, sync할 때 id로 덮어씌워요(`scripts/lib/translations.mjs` → `applyTranslation`). 그래서 다시 sync해도 번역이 사라지지 않아요.

```md
---
id: trend-0123456789abcdef
title: "원문 제목 (JSON 문자열)"
sourceUrl: https://example.com/post        # news.json의 item.url과 같아야 해요
summary: 직접 쓴 한국어 요약 (최대 240자)
translationStatus: full                     # full | partial | blocked
sourceShort: true                           # 선택: 원문 자체가 짧을 때만
translatedBy: Grok Bot                      # 쓴 사람이나 에이전트
translatedAt: 2026-10-13
---

본문(markdown)…
```

sync가 채우는 필드는 `summary`, `detailSummary`(같은 요약), `summaryAuthoredBy`, `detailStatus: ok`, `translationKo`, `translationStatus`, `translatedBy`, `translatedAt`이에요. `detailSummary`가 있으면 상세 페이지가 생겨요.

### translationStatus

| 값 | 뜻 | 최소 길이(공백 제외) |
|---|---|---|
| `full` | 원문 전체를 읽고 옮김 | 600 |
| `partial` | 일부만 읽음(이미지 속 수치, 긴 README·논문 일부, 403이라 RSS 본문만 읽음 등) | 400 |
| `blocked` | 원문을 못 읽어 큐레이터 소개글(GeekNews 등)로만 씀 | 300 |

원문 자체가 짧으면(몇 줄짜리 Reddit 글, 짧은 보도자료 등) `sourceShort: true`를 붙여요. 그러면 최소 길이가 300자로 내려가요. **분량을 채우려고 내용을 지어내지 않아요.**

## 스타일 가이드

- 해요체로 써요. 600–2000자 정도로 구체적으로 써요.
- 원문 구조를 따라 `### 소제목`, 목록, 인용(`>`), 코드 블록을 써요. 지원하는 문법은 `src/lib/markdown.ts`에 있어요(HTML과 링크는 escape되고, 출처 링크는 페이지가 달아요).
- 제품명, API, 모델명 등 용어는 자연스러우면 영어 그대로 둬요.
- 숫자, 인용, 고유명은 원문에 있는 것만 써요. 추측, 과장, 원문에 없는 배경 설명은 넣지 않아요. 해설은 원문 주장을 정리하는 데까지만 해요.
- 원문을 다 읽지 못했으면 본문 첫머리나 끝에 그 사실을 밝혀요(예: "Reddit이 403을 돌려줘 RSS 본문을 기준으로 옮겼어요").
- 큐레이터(HN, GeekNews, Lobsters, Reddit)가 아니라 가리키는 원문을 읽어요. 원문을 못 읽으면 `blocked`로 표시해요.

## 명령

```bash
npm run update                                      # 수집 → sync (번역 overlay 포함)
npm run translations:pending -- --date 2026-10-13   # 번역 파일이 없는 항목과 만들 경로 (--json 지원)
# … 원문을 읽고 md 파일 작성 …
npm run sync                                        # news.json에 반영
npm run translations:check -- --date 2026-10-13 --report   # 검증, 실패하면 exit 1
npm run lint && npm run build
```

`translations:check`가 검사하는 항목:

- 그날 모든 항목에 파일이 있는지
- status 값이 올바른지
- summary가 있고 240자를 넘지 않는지
- 본문이 최소 길이를 넘는지
- translatedBy와 translatedAt이 있는지
- sourceUrl이 일치하는지
- news.json에 반영됐는지

`--date`를 생략하면 번역 디렉터리가 있는 모든 날짜를 검사해요.

## X AI 트렌딩

X 게시물 카드는 번역 대상이 아니에요. 수집(Grok Bot 전용)과 파일 형식은 `docs/x-trending.md`를 봐요.
