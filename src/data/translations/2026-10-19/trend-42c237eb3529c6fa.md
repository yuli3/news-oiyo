---
id: trend-42c237eb3529c6fa
title: "DeepSeek search and fetch – $0.75 per 1000 successful requests"
sourceUrl: "https://api-docs.deepseek.com/guides/search"
summary: "DeepSeek이 자체 검색 엔진 기반 Search API와 웹 페이지를 Markdown으로 가져오는 Fetch API를 공개했어요. 둘 다 성공 요청 1,000건당 0.75달러이고 계정당 QPS 5예요. Claude Code·Codex 등에서 쓰는 서버 측 호출은 11월 1일(베이징 시각)부터 과금돼요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

DeepSeek API 문서의 "Search & Fetch" 가이드 전체를 읽고 옮겼어요.

### 무엇이 나왔나
Search API와 Fetch API는 에이전트와 RAG 애플리케이션이 실시간 웹 콘텐츠를 쓸 수 있게 해 주는 API예요.

- **Search API**: 질의에 맞는 웹 페이지를 찾아 구조화된 결과로 돌려줘요. DeepSeek의 **자체(in-house) 검색 엔진**으로 동작해요.
- **Fetch API**: 웹 페이지 하나를 가져와 내용을 **Markdown**으로 돌려줘요.

둘 다 순수 JSON API이고, DeepSeek API와 같은 bearer 인증을 써요. 엔드포인트는 `POST https://api.deepseek.com/v1/tools/search`, `POST https://api.deepseek.com/v1/tools/fetch`예요.

### Search 요청 필드
| 필드 | 설명 |
|---|---|
| `query` (필수) | 1–128자, 아래 연산자 지원 |
| `count` | 결과 수 1–50, 기본 10 |
| `ori_question` | 검색을 촉발한 사용자 원래 질문(1–128자), 질의 이해 개선용 |
| `localization` | 결과 현지화용 IP 주소(선택) |
| `need_content` | `true`면 `content`에 페이지 본문을 담아요(기본 false) |

연산자는 `site:`, `-site:`, `-단어`, `-"구문"`, `"정확한 구문"`, `lang:zh,en`, `after:2025`, `before:2026-06-01`을 지원하고 여러 개를 섞을 수 있어요.

### 응답
결과마다 `rerank_score`(0–3, 1.5 이상이면 고품질), `title`, `url`, `snippet`(UI용 100–200자), `summary`(모델이 읽기 위한 600–800자), `content`, `site_name`, `site_icon`, `date`(RFC 3339, UTC), `authority`(0–4, 3 이상이면 권위 높음, -1은 모름)가 들어 있어요. Fetch 응답은 `title`과 Markdown `content`예요. 가져오기는 대상 사이트의 가용성과 접근 정책을 따라요.

### 오류
OpenAI 호환 오류 형식이에요. 400(잘못된 요청), 401(키 문제), 402(잔액 부족), 403(Fetch가 보안 정책에 막힘), 404(쓸 만한 본문을 못 가져옴), 408, 413, 429(QPS 초과), 500, 504가 정의돼 있어요. 408·429·5xx는 기다렸다 재시도하고, 402는 충전 후 재시도하라고 안내해요.

### 과금
- Search와 Fetch 모두 **성공 요청 1,000건당 0.75달러**예요. 토큰이나 결과 수가 아니라 요청 단위로 매겨요.
- HTTP 200이면서 결과가 있을 때만 과금돼요(Search는 결과 배열이 비지 않아야 하고 Fetch는 본문이 있어야 해요). 실패, 빈 결과, 타임아웃은 과금하지 않아요. `count`는 가격에 영향이 없어요.
- DeepSeek Harness, Claude Code, Codex를 통해 DeepSeek API를 쓰면 서버 측 도구 호출이 이미 이 API를 치고 있는데, 지금은 무료이고 **2026년 11월 1일 0시(베이징 시각)부터** 요청당 과금이 시작돼요.

### 속도 제한
계정 단위로 Search와 Fetch가 따로 **QPS 5**씩이에요. API 키와 무관하게 계정 기준이고, 모델 동시성 한도와도 별개예요. Fetch는 도메인별 QPS 제한도 따로 있어 넘으면 429가 와요.
