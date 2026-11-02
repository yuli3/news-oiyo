---
id: trend-7fb3fa2305e3c657
title: "memt-1.0 architecture breakdown gated deltanet-2, mixture-of-storage, and 66x smaller storage footprint for agent memory [D]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xeu0ht/memt10_architecture_breakdown_gated_deltanet2
summary: "r/MachineLearning 글이 에이전트 기억을 모델 연산 층에 넣는 memt-1.0 구조를 정리했어요. Gated DeltaNet-2와 mixture-of-storage를 쓰고, 128K 이력에서 전체 KV 캐시 대비 추론 1.86배 빠르고 저장 공간은 66배 작대요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> Reddit이 자동 수집을 막아 RSS 피드에 실린 본문을 기준으로 옮겼어요. 글은 memt-1.0 자료를 읽은 사용자의 정리이고, 원 논문이나 발표 자료 링크는 RSS 본문에 없어 직접 확인하지 못했어요.

### 무엇을 다르게 하나

작성자 u/Mrs-Grumpy23은 memt-1.0의 '메모리 네이티브' 구조를 살펴보며, 전체 컨텍스트 **KV 캐시**와 **모델 안에 넣은 파라미터 기억** 사이의 공학적 절충이 흥미롭다고 했어요.

- 프롬프트를 계속 덧붙이거나 외부 **RAG 파이프라인**을 쓰는 대신, 기억을 **모델 연산 층에 직접** 넣어요.
- 각 턴 안에서 토큰 단위로 안정적으로 기억을 갱신하는 **Gated DeltaNet-2**를 쓰고,
- 용량을 늘리려고 **mixture-of-storage(MoS)** 층을 결합해요.

### 정리한 요점

1. **절차 경험의 내재화**: 보통 에이전트는 과거 실행 로그를 원문 그대로 불러와 컨텍스트 창을 부풀려요. memt-1.0은 여러 턴 에이전트 작업 중 불러온 절차 경험을 **모델 가중치·상태에 계속 흡수**해요.
2. **128K 컨텍스트 효율**: 이력이 128K 토큰일 때 **memt-1.0-nano**는 전체 KV 캐시 방식보다 엔드투엔드 추론이 약 **1.86배 빠르고**, 영구 저장 공간은 **66배 작대요.**
3. **일반 능력 보존**: 파라미터 기억 층을 학습하면 보통 기본 LLM 능력이 떨어지는데, **두 단계 학습**(지속 사전학습 + 사후학습, 총 **340억 토큰**)으로 일반 추론을 경쟁력 있게 유지하면서 기존 파라미터 기억 기준선보다 나았대요.

### 던진 질문

작성자는 긴 시간 동작하는 에이전트를 만드는 사람들에게, Gated DeltaNet이나 MoS 같은 **구조 수준의 갱신 층으로 상태를 내재화하는 것**이 KV 캐시 메모리 병목에서 벗어나는 최종 해법인지 물었어요. 수치는 모두 작성자가 전한 memt-1.0 측 주장이에요.
