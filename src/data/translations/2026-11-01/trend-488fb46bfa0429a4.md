---
id: trend-488fb46bfa0429a4
title: "AI, Lean, and the Future of Formal Verification, with Lean Creator Leo de Moura"
sourceUrl: https://thedataexchange.media/leo-de-moura-lean-aws
summary: "Lean을 만든 Leo de Moura(AWS)가 The Data Exchange 팟캐스트에서 AI가 코드를 쉽게 만들수록 기계가 검증하는 증명이 신뢰의 병목을 푼다고 말했어요. zlib을 Lean으로 옮긴 사례와 Rust 검증 도구 Aeneas도 소개해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

The Data Exchange 에피소드 페이지의 소개, 목차, 대본 앞부분(Aeneas 설명 시작까지)을 읽고 옮겼어요. 대본 전체는 읽지 못했어요.

### 에피소드 소개

진행자 Ben Lorica가 Lean의 창시자이자 AWS VP·Distinguished Scientist, Lean FRO(Focused Research Organization) 수석 아키텍트인 Leo de Moura와 이야기해요. 주제는 AI가 형식 검증을 쉽게 만들면서 소프트웨어 공학이 어떻게 바뀌는지예요. 명세와 기계 검증 증명의 중요성, AI가 만든 코드와 자율 에이전트를 믿는다는 것의 의미, 검증된 소프트웨어 스택이라는 비전, 수학 연구의 변화, 엔지니어·연구자의 역량과 커리어를 다뤄요.

목차에는 Rust 검증·자동 형식화·Mathlib 확장, AI가 만든 형식 모델을 믿을 수 있는지, Navier-Stokes와 증명 불일치, 테스트와 형식 검증의 차이, "코드에서 명세로" 이동하는 소프트웨어 공학, AI 에이전트·샌드박스·보안 정책 검증, 금융·화학·회계·법 같은 수학 밖 분야가 있어요.

### 대본 앞부분

Lorica는 "생성은 쉬워졌다. 싸지는 않지만(Claude Code 사용자는 알 것이다) 쉬워졌다. 그래서 핵심 과제는 검증"이라고 대화의 전제를 잡아요.

de Moura의 설명은 이래요.

- Lean은 프로그래밍 언어이자 증명 보조기예요. 코드를 쓰고, 코드가 가져야 할 성질을 적고, 증명을 Lean 언어로 써요. 증명은 **기계가 검사해요.**
- Lean 전체는 큰 코드지만 결과를 믿으려면 증명을 검사하는 **커널만** 믿으면 돼요. 증명은 데이터처럼 내보내 다른 검사기로도 확인할 수 있고, 검증된 검사기가 두 개 있으며 세 번째가 곧 나와요.
- 이 능력은 사람 사이뿐 아니라 **사람과 AI 사이의 신뢰 병목**을 풀어요. 예전엔 코드를 짜고 property-based testing 같은 테스트를 붙였지만, 테스트는 버그를 찾는 데 유용할 뿐 버그가 없음을 증명하지 못해요.
- 이제는 성질을 먼저 적고 AI에게 "이걸 만족하는 코드를 짜고 증명해 줘"라고 할 수 있고, AI가 그걸 해낼 수 있다고 말해요.

예로 동료 Kim Morrison이 압축 라이브러리 zlib을 Lean으로 옮긴 실험을 들어요. 압축했다 풀면 데이터가 그대로 돌아온다는 성질을 압축 수준에 상관없이 정리(theorem)로 증명했어요.

Rust로 먼저 짠 코드도 Lean으로 검증할 수 있냐는 질문에는 두 방법이 있다고 답하고, 첫째로 Rust 코드를 Lean으로 검증하는 도구 **Aeneas**를 소개해요. Microsoft SymCrypt 팀이 이 도구를 쓴다고 해요.
