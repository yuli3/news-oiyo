---
id: trend-e42ce0be85c2653e
title: "Introducing Gemini 4 Hydrogen"
sourceUrl: https://deepmind.google/blog/introducing-gemini-4-hydrogen
summary: "Google DeepMind가 Gemini 4 Hydrogen을 공개하며 네 단계 생각 수준, Gemini 앱·검색 개선, 안전성 수치를 함께 밝혔어요. 에이전트 작업의 지나친 행동을 최대 81% 줄였고, 20만 턴 감사에서 사고 사슬 가독성 99.9%를 유지했대요. 오늘부터 전 세계에 순차 제공돼요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

Google DeepMind 블로그 원문 전체를 읽고 옮겼어요(본문 앞부분은 blog.google에 실린 같은 글과 같아요). 모든 수치는 구글 발표 기준이에요. 모델 개요와 개발자용 벤치마크는 짧게 줄이고 뒷부분을 자세히 옮겼어요.

### 개요

Hydrogen은 일상 코딩과 에이전트 작업을 빠르고 효율적으로 하도록 만든 모델이에요. Artificial Analysis 지수 51(Argon 50, xhigh 54), 100만 토큰 전 구간 입력 1.5달러·출력 7.5달러(100만 토큰당), 3.8 Flash보다 2.5배 빠르고 Terminal-Bench 4.1 57%(3.8 Flash 18.2%)예요. Antigravity의 Orchestrator는 Carbon과 Hydrogen을 오가며 쿼터 24% 절감, 19% 단축을 냈대요. 데모로는 Google Sheets를 애니메이션 픽셀 캔버스로 만들기, 유튜브 기조연설 영상으로 Google Slides 발표 자료 만들고 겹친 글자 자동 수정, Sheets에서 재무 데이터로 시나리오 모델을 30% 넘게 빨리 만들기 등이 나왔어요.

### 네 단계 생각 수준

low, medium, high(기본), 새로 생긴 **xhigh**가 있어요. 품질·지연·비용이 매끄럽게 이어지게 만들어, 작업에 필요한 만큼만 기다리고 비용을 내게 했대요.

### Gemini 앱과 검색

- **Gemini 앱**: 말투·형식·규칙을 더 잘 지켜 이메일 초안이나 문서를 첫 시도에 쓸 수 있게 나오고, 업로드 파일·Gmail·Drive·Airtable·Dropbox 같은 연결 앱에서 맥락을 가져와 단계별로 일을 처리해요. 실시간 낙뢰 데이터로 만든 3D 지구본과 음악 엔진, WebGL2 물·유리 시각화 데모를 보여 줬어요.
- **검색**: 여러 부분으로 된 질문이나 오타가 있어도 의도를 더 잘 이해하고, 더 시각적인 답을 주며, 질의 확장(fan-out)을 개선해 더 다양한 링크를 연결해요.

### 안전성

- 에이전트 작업에서 **지나친 행동(overreach) 최대 81%**, 덜 해 주기(under-service) 최대 79% 감소
- 도구 사용·코딩 평가에서 정렬되지 않은 행동과 작업 편법 12배 감소
- 불가능하거나 막힌 작업에서 권한 경계를 넘을 가능성 최대 2배 감소, 내부 에이전트 정직성 평가 96.7%
- 20만 턴 이상 감사에서 **사고 사슬 가독성 99.9%**, 기만적 추론 수정 0건
- 간접 프롬프트 인젝션 벤치마크(Gray Swan IPI)에서 2.3배 넘게 강해짐
- 바이오 보안 위험과 정당한 의학·과학 질문을 더 정확히 구분해 HealthBench Pro 잘못된 거절 0.4% 미만

### 제공

오늘부터 전 세계에 순차 제공돼요. 개발자는 AI Studio·Android Studio의 Gemini API와 (유료 Pro·Ultra라면) Antigravity, 기업은 비즈니스용 Gemini·Antigravity·Sheets, 일반 사용자는 Gemini 앱과 검색에서 쓸 수 있어요. 무료 Gemini 앱 사용자는 적합한 질문일 때 자동 모델 선택으로 Hydrogen을 쓰게 돼요.
