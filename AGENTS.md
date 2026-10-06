# news.oiyo.net 작업 진입

공통 계약은 `/Users/seuncho/coding/AGENTS.md`다. 이 파일은 이 repo에만 있는 것을 적는다.

## "news 업데이트 해줘" — 어느 런타임에서든 이것 하나

```bash
npm run update
```

`update` = `collect` → `collect:market` → `audit:trends` → `sync`. 뉴스 수집·증시 시세·검사·반영이 한 명령이고, Claude·Codex·Grok·Grok Bot 어디서 실행하든 같은 결과가 나온다. 셸을 쓸 수 있으면 되고 특정 런타임의 스킬·플러그인·크론을 요구하지 않는다. 당일 트렌드 노트가 이미 있으면 collect 는 건너뛰고(덮어쓰려면 `--force`) 시세는 매번 갱신한다.

그 다음 배포는 별도 승인이다:

```bash
git add src/data/news.json && git commit -m "sync $(date +%F)" && git push
```

푸시하면 Cloudflare Pages가 자동 배포한다. **즉 푸시가 곧 공개 발행이다** — 배치별 명시 승인 없이는 하지 않는다.

## 왜 이 능력이 repo 안에 있나

앞 세대 수집기는 Hermes 스킬 `oiyo-news-feed`였다. 2026-08-29 Hermes가 퇴장하자 **능력이 런타임과 함께 사라졌고 피드는 그날 멈췄다.** 09-01에야 발견됐다. 교훈은 하나다 — 능력은 런타임이 아니라 repo가 소유한다. 스킬·플러그인·크론에 능력을 두면 그 런타임이 사라질 때 같이 죽는다.

폐기된 `trend_scout` 복원과 혼동하지 말 것. 소스 목록·재시도·실패 판정은 `company-brain/AI-Sessions/wiki/decisions/trend-scout-retired-2026-08-20.md`가 규정한 흡수본 그대로다.

## 파이프라인

```
collect-news.mjs   → company-brain/AI-Sessions/wiki/sources/trends/<date>.{md,sources.json}
collect-market.mjs → company-brain/reports/market-latest.json
                   → sync-news.mjs → src/data/news.json → Cloudflare Pages
```

| 파일 | 소관 |
|---|---|
| `scripts/collect-news.mjs` | 수집·선별·노트 작성 |
| `scripts/collect-market.mjs` | 미국·한국 증시 시세 |
| `scripts/audit-trend-notes.mjs` | 노트 형식 게이트 |
| `scripts/sync-news.mjs` | 노트+시세 → `news.json` |
| `scripts/lib/fetch-article.mjs` | 원문 fetch·excerpt (HN 요약·detail seed 공유) |
| `scripts/list-pending-details.mjs` | detailSummary 대기 목록 (agent-batch) |
| `scripts/apply-detail-summaries.mjs` | `{id, detailSummary}` 적용 |
| `scripts/daily-publish.sh` | 발행(입력 나이 보고 포함) |
| `scripts/lib/news-pipeline-sources.json` | **소스 이름 SSOT** |

## 지켜야 할 계약

- **`## Summary` 절은 필수다.** `sync-news.mjs`가 이 헤딩으로 사이트 리드 문단을 뽑는다. 없으면 그 날 페이지에 요약이 통째로 빠지고 아무 에러도 안 난다 — 2026-08-23~09-01에 실제로 일어났다. `audit:trends`가 이제 막는다.
- **공개 `## Summary`에 내부 작업 메모를 넣지 않는다** (audit 2026-10-05 S5). "빈 배열을 반환합니다", "당사/우리 서비스/오이요에 적용할 아이디어", 수집 공백·운영 메모, `[[위키링크]]`는 뉴스가 아니다. 사이트는 `src/lib/feed.ts` `publicDaySummary()`로 그런 문단을 렌더 시점에 거르고(`news.json`은 그대로), `audit:trends`가 2026-10-07 이후 노트에서 막는다. 패턴 목록은 두 파일이 같아야 한다. `## 도출된 아이디어`는 brain 용이며 사이트에 공개하지 않는다.
- **소스 이름은 레지스트리를 따른다.** 미등록 `src`는 sync가 조용히 버린다. 새 이름을 쓰지 말고 레지스트리의 `id` 또는 `aliases`를 쓴다. `r-localllama` 같은 변형이 15개 항목을 버리게 만들었다.
- **URL은 https만.** 어댑터가 거부한다.
- **GeekNews는 원본 URL만.** `news.hada.io` 토픽 링크가 아니라 그 글의 원본 주소를 쓴다. `collect-news.mjs`가 자동 해석한다.
- **추측성·YMYL 제외.** 확인되지 않은 루머와 의료·건강은 이 파이프라인이 검증할 수 없다.
- **항목 설명(`summary`) 정책 (2026-09-23).** 길이는 240자에서 자르고, URL 한 줄은 설명이 아니므로 버린다.
  - **GeekNews:** 피드 Atom `<content type="html">`만 `summary`로 쓴다(원문). 지어내지 않는다. `news.hada.io` 토픽은 계속 원본 URL로 해석한다.
  - **그 외 소스:** description / story_text / repo description 등 소스가 준 텍스트가 있으면 그걸 우선한다. **없으면** Grok Bot(또는 지정 요약 패스)이 한국어 1–2문장·최대 240자로 요약할 수 있다. 근거는 제목·공개 메타만. 추측·과장 금지.
  - **기존 항목 자동 소급 백필은 기본 안 함.** 세운/Planner가 지정한 날짜만 채운다.
- **GitHub Trending은 그날의 별(stars today)로 센다.** 누적 스타로 정렬하면 오래된 대형 저장소가 늘 위에 온다. 선별은 제목이 아니라 `제목 + 설명`으로 판정한다 — `github.com/foo/bar` 이름만으로는 AI 신호인지 알 수 없다.
- **`raw == 0`만 실패다.** 소스 일부가 429/403이어도 조용한 날과 구분해 계속 진행한다.

## 편집 요약

`collect-news.mjs`가 새로 쓰는 노트의 공개 `## Summary`는 그날 한국어 제목·요약이 있는 선별 항목에서 뽑은 사건 문장(최대 3문장)이다. 한글 항목이 없으면 지정 폴백 한 문장만 쓴다. 건수·소스 분포 로그는 `## 수집 기록`에만 둔다 — 공개 Summary·메타·JSON-LD에 넣지 않는다. 이미 있는 날짜 노트는 소급하지 않는다(`--force`로 과거를 덮어쓰지 않는다). 사람·에이전트가 공개 Summary를 손볼 때는 새 고유명·숫자·인용을 지어내지 말고, 그날 항목에 있는 사실만 다듬는다. `## Summary` 헤딩 자체는 필수다(없으면 사이트 리드가 통째로 빠진다).


## 상세 읽기 (detail pages, agent-batch)

- 라우트: `/item/<id>/` (`id` = `trend-<hash>`). 목록의 **자세히 읽기**가 여기로 간다.
- 수집기는 HN·공식 블로그·KR RSS·GeekNews에 `detailExcerpt` / `excerptSource` / `detailFetchedAt` / `detailStatus`를 심는다. `detailSummary`(한국어)는 비워 둔다.
- **Pages 런타임 LLM 없음.** Grok/에이전트가 `detailExcerpt`+제목·URL을 보고 한국어 `detailSummary`를 쓴 뒤 `apply-detail-summaries.mjs`로 넣는다. excerpt가 없으면 지어내지 않는다. 전문 HTML 재게시 금지.
- YouTube·GitHub·X/Twitter는 skip. 사설망 SSRF 차단은 `fetch-article.mjs`에 있다.
- 1698건 일괄 백필은 기본 안 함. 새 collect + (선택) 해당 날짜 enrich만.
- 워크플로: `npm run collect` → `node scripts/list-pending-details.mjs` → 에이전트가 요약 JSONL 작성 → `node scripts/apply-detail-summaries.mjs summaries.jsonl` → `npm run sync`(소스 반영 확인용, apply가 news.json도 패치함).

## 검증

```bash
npm run audit:trends   # 노트 형식·소스 이름·URL
npm run lint           # type-check + shadcn lint
npm run build          # 현재 62페이지
```

`npm run type-check`(astro check)와 `npm run build`가 CI 검증 게이트다.

- **shadcn lint 필수(2026-10-06 세운 결정, Claude·Codex·Grok Build·Grok Bot·Cursor 공통)**: UI·컴포넌트·스타일(`src/**/*.{astro,tsx,ts,jsx,js}`)을 바꿨으면 끝내기 전에 `npm run lint`(`npm run type-check` + `npm run lint:shadcn`)를 돌리고, 실패하면 push하지 않는다. `lint:shadcn`은 공식 [`@shadcn/lint`](https://github.com/shadcn-ui/lint) 규칙을 `eslint.config.mjs`로 실행하며 CI에서도 차단한다. news는 Tailwind·shadcn 컴포넌트가 없어 `no-unknown-classes`·`no-inline-styles`는 끄고(의미 클래스와 scoped `<style>`을 전부 잡기 때문), raw 팔레트 색·임의값·동적 클래스·컴포넌트 restyle 규칙만 켠다. Tailwind v4를 도입하면 `components.json`을 추가하고 두 규칙을 다시 켠다. 도입 시점의 기존 위반은 `eslint-suppressions.json` 기준선이라 새 위반만 실패한다. 새 위반은 테마 토큰·컴포넌트 variant로 고치고, `--suppress-all`/`--suppress-rule`로 기준선을 늘려 통과시키지 않는다. 기존 위반을 고쳤으면 `npm run lint:shadcn:prune`으로 기준선을 줄인다.

- `public/_headers`를 건드리면 `npm run audit:headers-collision`을 함께 돌린다. **Cloudflare Pages는 매칭되는 규칙을 전부 적용하고 같은 헤더를 이어 붙인다**(교체가 아니다). 넓은 규칙(`/*`)에 Cache-Control을 두면 자산별 정책과 충돌해 `max-age`가 두 개인 헤더가 나가고, RFC 9111이 반복 지시어 처리를 구현에 맡기므로 실효 정책이 모호해진다. 2026-09-01에 다섯 사이트 전부 그 상태였고 해시 자산의 1년 불변 캐시가 무효화돼 있었다. 캐시 정책은 좁은 경로에만 건다. 스크립트 정본은 `shared/scripts/`다.
