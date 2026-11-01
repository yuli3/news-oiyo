---
id: trend-32be9bd98999ae11
title: "The AI cost of JavaScript frameworks"
sourceUrl: https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks
summary: "Nolan Lawson이 같은 포켓몬 앱을 Opus 5.5 에이전트로 12개 JS 프레임워크마다 5번씩 만들게 해 비용·품질을 비교했어요. 앞부분 기준 비용 중앙값은 Hono+htmx 2.67달러가 가장 싸고 Angular 4.97달러가 가장 비쌌어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

원문이 길어 앞부분(약 6,500자, 비용 결과까지)만 읽고 옮겼어요. 품질·유지보수성 결과는 이 번역에 넣지 않았어요.

### 왜 벤치마크를 했나

필자는 웹 개발 커뮤니티의 결정이 **감(vibes)으로** 내려진다는 점을 꼬집어요. 프레임워크는 "엄청 빠르다", 도구는 개발을 "터보로" 만든다는 말이 근거 없이 오가요. 예전엔 DX(JSX를 치는 느낌 같은 것)가 이유였다면, 사람이 코드를 직접 치지 않는 에이전트 시대에도 "이 프레임워크가 에이전트에 더 낫다"며 프런트엔드를 다시 쓰는 일이 근거 없이 벌어진대요. "에이전트한테 물어보긴 했나요?" 그래서 직접 벤치마크를 만들었어요.

### 실험 방법

- PokéAPI로 작지만 단순하지 않은 포켓몬 앱(타입·기술·게임별 데이터, 검색·필터)을 설계해요.
- 에이전트에게 특정 프레임워크(Next.js, Nuxt, SvelteKit 등)로 만들게 해요.
- 에이전트의 꼼수를 막으려고 **스펙 적합성 테스트**로 결과를 검사해요. DOM이 아니라 접근성 트리 기준이라 shadow DOM을 쓰는 프레임워크도 공정하게 시험해요.
- 개발 시간, 토큰, 코드 줄 수, Lighthouse 성능·접근성 점수를 봐요.

공정성을 위해 프레임워크마다 **공식 MCP나 skills**를 쓰게 했고, SSR/CSR 같은 구조나 성능 최적화는 지정하지 않았어요. Opus 5.5(high effort)에 스펙을 주고 최신 버전을 쓰라고만 했고, Tailwind·Bootstrap 같은 컴포넌트 프레임워크는 쓰지 말라고 했어요. 앱 하나만 본 실험이라 위키백과에 가까운 콘텐츠형 사이트에 치우쳐 있다는 한계도 밝혀요.

결과는 매우 **확률적**이었대요. 에이전트가 가끔 엉뚱한 길로 빠져 토큰을 낭비하고, Lighthouse의 LCP도 실행마다 다른 요소를 고를 수 있어요. 그래서 프레임워크마다 5번 만들어 중앙값을 냈어요(Angular는 두 번 측정 가능한 앱을 못 만들어 일부 지표는 3회).

### 비용 (실행당, 중앙값)

| 프레임워크 | 비용 |
|---|---|
| Hono+htmx | $2.67 |
| Astro | $2.76 |
| Nuxt | $2.82 |
| Vanilla | $2.98 |
| Next.js | $3.14 |
| Qwik | $3.27 |
| TanStack Start | $3.54 |
| SolidStart | $3.79 |
| React Router | $3.81 |
| SvelteKit | $4.28 |
| Gracile+Lit | $4.65 |
| Angular | $4.97 |

Claude Code가 보여 주는 API 가격 기준이고, 필자는 월 100달러 Max 플랜이라 실제로 이만큼 쓴 건 아니래요. 분산도 커서 React Router의 가장 싼 실행($2.82)이 Hono+htmx의 가장 비싼 실행($3.19)보다 쌌어요. 그래도 SvelteKit, Gracile+Lit, Angular가 더 비싸다는 패턴은 뚜렷했어요. SvelteKit은 에이전트가 매번 v3 마이그레이션 가이드를 읽었는데, Opus 5.5 학습 데이터에 없을 만큼 새 버전이라서일 거래요. Gracile은 에이전트가 프레임워크를 잘 몰라 저장소를 직접 클론하기도 했어요.
