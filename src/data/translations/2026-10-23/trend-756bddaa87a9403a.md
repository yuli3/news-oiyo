---
id: trend-756bddaa87a9403a
title: "Llama.cpp PR: How to beat strata decode performance with a R9700"
sourceUrl: https://github.com/ggml-org/llama.cpp/pull/30971
summary: "llama.cpp 기여자 pwilkin이 R9700과 RAM 128GB 환경에서 디코드 성능으로 Strata를 이기려고 만든 '적응형 단일 그래프 MoE 오프로드' 드래프트 PR을 올렸어요. 성능을 위해 코어에 얼마나 특수한 최적화를 허용할지 토론을 제안했어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> Reddit 스레드 대신 링크된 GitHub PR 설명과 공개 댓글을 읽고 옮겼어요. 코드 변경 자체는 읽지 않았어요.

### PR 소개

PR #30971 "llama : add adaptive single-graph MoE offload"는 **드래프트이자 토론용**으로 올라왔어요. 작성자 pwilkin은 이렇게 설명해요.

> 아마 변경이 너무 많아 이대로 완전히 채택되긴 어려울 거예요. 제 목표는 가장 깔끔한 구조가 아니라, 제 **R9700 + RAM 128GB**에서 **디코드 성능으로 Strata를 실제로 이기는 것**이었어요. 이 빌드가 그걸 해내요.

CPU 코어 작업 부하 최적화처럼 아주 특수한 처리가 들어갔다며, **"경쟁력 있는 성능을 위해 코어 코드에 얼마나 허용할 것인가"**를 질문으로 던졌어요. 리뷰어로 am17an과 ggerganov를 불렀고, AI 사용 공개란에는 "네, 아주 긴 Codex 대화 세션으로 여기까지 왔다"고 적었어요.

### 무엇이 들어 있나요

리뷰어가 핵심 아이디어와 각각의 기여도를 요약해 달라고 하자, 작성자는 다섯 가지를 꼽았어요.

1. 여러 가지 연산 **퓨전(fusion)**
2. **대기 커널로 그래프 병합**: 지금은 전문가(expert)를 CPU로 오프로드하면 그 지점에서 그래프가 쪼개져, 배치 전체가 대략 층마다 끊긴 그래프들로 실행돼요.
3. CPU와 GPU 간 **데이터 복사 타이밍** 최적화
4. **전문가 배치** 최적화
5. 코어 활용을 위한 **어피니티(affinity) 조정**

마지막 항목은 작성자 개인 환경(i9-14900KF)에 맞춘 결과일 수 있어 다른 플랫폼에서도 확인해 볼 가치가 있다고 했어요. 또 (4)는 am17an의 #30966, (2)는 #30685가 상당 부분 다루고 있다고 덧붙였어요.

### 현재 상태

PR은 드래프트로 표시돼 있고 ggerganov와 CISC의 리뷰를 기다리고 있어요. 병합하려면 승인 리뷰가 최소 2개 필요해요. 여러 사용자가 관심 표시(👀)를 남겼어요.
