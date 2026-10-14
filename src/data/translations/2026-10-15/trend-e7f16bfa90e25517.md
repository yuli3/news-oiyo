---
id: trend-e7f16bfa90e25517
title: "How Third Moment Research runs 10,000 agents for 36+ hours"
sourceUrl: "https://openai.com/index/third-moment-research"
summary: "Third Moment Research가 GPT-6 Astra·Sol·Codex·Daybreak로 동시 1만 에이전트, 세션당 36~48시간 자율 연구를 돌린다고 OpenAI가 소개해요. Codex로 백테스트가 약 3시간에서 3~5분으로 줄었다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

OpenAI 고객 스토리(Third Moment Research, 2026-10-14)를 옮겼어요.

### 규모(원문 하이라이트)
- 동시 **10,000** 에이전트
- 자율 연구 세션 **36–48시간**
- Codex로 백테스트 시간 **약 97% 감소**(약 3시간 → 약 3–5분)
- 하루 **1조** OpenAI 토큰을 쓴 사례도 언급

### 무엇을 하나
회사별 워크플로·성공 정의에 맞는 **자기 개선 에이전트**를 만들어요. 약점을 찾아 수천 개 합성 시나리오를 만들고 다시 학습하는 루프예요. 초기 응용은 성과 측정이 뚜렷한 **퀀트 금융**이에요.

### Codex 병목 해결
수천 개 시뮬레이션 trajectory를 분석해, 연간 호가 단위 미국 주식 데이터 백테스트가 수 시간 걸리며 에이전트가 완료를 폴링해 토큰·컨텍스트를 낭비하는 병목을 찾았어요. 캐싱·메모리 패킹으로 수 분대로 줄였다고 해요.

### 하네스
기본 Codex 하네스를 Docker 환경에 두고, 바깥 하네스(GPT-6 Sol/6.1 Sol)가 미완료 trajectory를 보고 재시도·종료·사람 에스컬레이션을 정해요. Daybreak로 시뮬레이션 환경 탈출 여부 등 보안 테스트를 자동화해요.

인용은 Adam Khakhar·Jeffrey Yan 발언을 원문 기준으로 했어요.

### 연구 루프
에이전트가 백테스트 결과로 다음 실험을 설계하고, 예상 못 한 신호(비표시 거래 비중 등)를 찾기도 했다고 해요. GPT-6.1 Sol은 토큰 효율로 가장 많이 쓰고, Astra는 속도업 벤치에서 큰 폭을 냈다고 해요.

### 보안
1만 에이전트 규모라 Daybreak로 시뮬 탈출·인프라 침투를 에이전트 스스로 테스트하게 한다고 해요.
