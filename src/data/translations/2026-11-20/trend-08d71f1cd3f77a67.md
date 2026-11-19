---
id: trend-08d71f1cd3f77a67
title: "Introducing Gemini 4 Neon"
sourceUrl: https://deepmind.google/blog/introducing-gemini-4-neon
summary: "Google DeepMind가 Gemini 4 Neon을 공개했어요. Artificial Analysis 지능 지수 61점(xhigh)으로 전체 3위, 코딩 에이전트 지수 1위(58.6)이고, 가격은 입력 100만 토큰당 3달러·출력 15달러, 컨텍스트는 100만 토큰이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

Google DeepMind 블로그 글(2026년 11월 18일, Koray Kavukcuoglu)의 앞쪽 절반쯤(사이버 방어 절 도입부까지, 약 7,000자)을 읽고 옮겼어요. 뒷부분의 취약점 탐지 세부와 이후 절은 옮기지 않았어요. 모든 순위·점수는 Google이 발표한 수치예요.

### 한눈에 보기

Gemini 4 Neon은 복잡한 소프트웨어 엔지니어링, 지식 노동, 과학 워크플로에서 빠른 엔드투엔드 작업 완료와 프런티어급 지능을 내세워요.

- Artificial Analysis Intelligence Index: xhigh 사고 수준에서 61점, 비슷한 모델보다 앞서 전체 3위(더 크고 느린 모델 바로 뒤)
- Vals Index 2위, 파레토 프런티어
- 새 Agent Arena Index의 조종성(작업 중 사용자 수정에 깔끔하게 적응) 2위
- 내부 Google Antigravity 테스트에서 지금까지 가장 낮은 날조(fabrication)율
- 가격: 입력 100만 토큰당 3달러(캐시 입력 0.15달러, 95% 할인), 출력 15달러, 컨텍스트 100만 토큰
- 출시: Google AI Studio의 Gemini API, Gemini for business, 유료 Google AI Pro·Ultra 구독자의 Google Antigravity, Pro·Ultra 구독자의 Gemini 앱

### 기업·분석·과학 업무

스프레드시트, PDF, 차트, 오디오, 영상을 100만 토큰 컨텍스트 하나에서 종합해 구조화된 결과물로 만든다고 해요.

- Vals Index 2위(70.9%), Legal Research Bench·Tax Agent Bench 1위
- Surge AI에서 금융·회계·스프레드시트 모델링·복잡한 제약 준수 대부분 1위
- Chartography 73.5%, Agents' Last Exam v1.1 75.8%(선두 모델과 비슷)
- Zapier AutomationBench 1위(56.3%), Andon Labs Vending-Bench 2 1위(16,843달러)
- Arena Agent Arena Index 1336점으로 세계 2위(실제 에이전트 세션 4,200건 이상)
- 과학·수학: Terminal-Bench Science 70.5%, RiemannBench 84.0%, HLE-Diamond 71.3%로 동급 최고

### 프로덕션 코드

장시간 에이전트 워크플로에 맞춰, 단독으로든 Google Antigravity에서 병렬 Hydrogen 서브에이전트를 지휘하는 Orchestrator로든 도구를 많이 쓰는 작업을 끝까지 이어 간다고 해요. 중복 파일 읽기를 줄이고, 진행 상황을 공유하고, 긴 세션의 컨텍스트 컴팩션을 안정적으로 처리해요.

- Artificial Analysis Coding Agent Index 1위(58.6), Terminal-Bench 4.1 65.2%, FrontierCode 2.0 46.2%(기본 high)
- SWE-sweep: mini-SWE 하네스 12.8%로 선두, Google Antigravity에서는 39.0%로 세 배 넘게 올라 최고 수준

시연으로는 Blender MCP를 /swarm으로 다뤄 모델 이름을 원소로 표현한 실사풍 3D 실험대, 실제 몽블랑·샤모니 고도 지형 위 1인칭 WebGL2 프리라이드 스키 시뮬레이터(커스텀 셰이더 10,200줄, 120Hz 물리), 기록 사진으로 재현한 앨런 튜링의 1936년 킹스 칼리지 연구실 3D, 이미지 하나를 수식 50만 개 이상의 10만 셀 Google Sheet로 바꿔 에지 검출·깊이·재조명을 하는 예를 들어요.

### 효율과 제어

사고 수준 네 단계로 지능과 토큰 비용을 조절해요. 기본 high에서는 Carbon보다 작업당 비용이 32% 낮고, Vals Index와 Agent Arena에서 경쟁 프런티어 모델보다 작업당 약 50~80% 싸다고 해요. xhigh는 가장 어려운 작업용으로, 경쟁 모델 최고 설정보다 작업당 36% 이상 저렴하다고 해요.

### 사이버 방어

AutoBaxBench 모든 난이도에서 Carbon보다 안전한 코드를 만들고 hard 등급 76%로 최고 수준, WebExploitBench v1.2에서 51.26%로 최고 수준을 경쟁 대형 모델의 절반 비용에 냈다고 해요. 취약점 발견·검증·패치 전 주기에서 프런티어급 성능을 낸다고 하는데, 이후 세부는 옮기지 않았어요.
