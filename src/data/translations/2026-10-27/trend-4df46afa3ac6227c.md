---
id: trend-4df46afa3ac6227c
title: "어텐션이 필요한 것은 아니다 (2025)"
sourceUrl: https://arxiv.org/abs/2512.19428
summary: "Zhang Chong의 논문 'Attention Is Not What You Need'는 명시적 셀프 어텐션 대신 Grassmann 다양체 위의 부분공간 흐름으로 토큰을 섞는 Causal Grassmann 층을 제안해요. Wikitext-2에서 비슷한 크기 Transformer 대비 검증 perplexity가 약 10–15% 안이라고 해요. > arXiv 초록과 메타데이터만 읽고 옮겼어요. 본문 PDF는 열지 않았어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-27
---

### 문제 제기

저자는 시퀀스 모델링의 기본 질문으로 **"강한 성능과 추론에 명시적 셀프 어텐션이 정말 필요한가?"**를 다시 던져요.

표준 멀티헤드 어텐션을 **텐서 리프팅**으로 봐요. 은닉 벡터를 쌍별 상호작용의 고차원 공간으로 올리고, 경사하강으로 그 텐서를 제약한다는 해석이에요. 표현력은 크지만, 층이 쌓이면 소수의 명시적 불변량으로 모델을 설명하기 어려워진대요.

### 제안: Causal Grassmann

어텐션이 없는 대안으로 **Grassmann flows** 기반 구조를 제안해요. L×L 어텐션 행렬을 만들지 않고 Causal Grassmann 층이 이렇게 동작해요.

1. 토큰 상태를 선형으로 줄임
2. 국소 토큰 쌍을 Plücker 좌표로 Grassmann 다양체 위의 2차원 부분공간으로 인코딩
3. 이 기하 특징을 게이트 믹싱으로 다시 은닉 상태에 합침

정보는 다중 스케일 국소 창 위에서 저랭크 부분공간의 제어된 변형으로 전파되고, 핵심 계산은 비구조적 텐서 공간이 아니라 **유한 차원 다양체** 위에 있어요.

### 보고된 결과 (초록)

- **Wikitext-2** 언어 모델링: 파라미터 1,300만~1,800만의 순수 Grassmann 모델이 비슷한 크기 Transformer 대비 검증 perplexity가 **약 10~15% 안**이래요.
- **SNLI** 자연어 추론: DistilBERT 위에 올린 Grassmann-Plücker 헤드가 Transformer 헤드를 살짝 앞섰대요. 최고 검증/테스트 정확도 **0.8550 / 0.8538** 대 **0.8545 / 0.8511**.
- 복잡도 분석에서는 고정 랭크에서 시퀀스 길이에 대해 **선형**으로 늘어난다고 주장해요.

### 메타데이터

- 저자: Zhang Chong
- arXiv:2512.19428 [cs.LG] (제출 2025-12-22)
- 주제: Machine Learning, Artificial Intelligence, Algebraic Geometry
