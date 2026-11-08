---
id: trend-da762ae2a9ad3742
title: "I merged attention and MLP processing into a single gated Transformer block. GAP [R]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xr47tw/i_merged_attention_and_mlp_processing_into_a
summary: "어텐션과 MLP를 하나의 게이트 블록으로 합친 실험 아키텍처 GAP(Gated Attention Projection)를 공개한 글이에요. 파라미터를 약 20% 줄였지만 최종 언어 모델 정확도는 표준 Transformer가 더 좋았다고 솔직히 밝혀요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

Reddit이 자동 경로로 열리지 않아 RSS 피드 본문을 기준으로 옮겼어요. 링크된 GitHub 저장소와 논문은 읽지 않았어요.

### 아이디어
작성자는 GAP(Gated Attention Projection)라는 대안 Transformer 구조를 실험했어요. 표준 Transformer처럼 어텐션과 피드포워드(MLP) 서브레이어를 따로 두지 않고, 하나의 게이트 블록 안에서 어텐션과 MLP식 처리를 함께 해요.

### 실험
- WikiText-103에서 모델당 1억 개의 점수 매긴 학습 토큰으로 표준 Transformer와 비교했어요.
- GAP20은 표준 Transformer보다 파라미터가 19.91% 적어요.
- 더 작은 구성은 파라미터를 34.31%까지 줄일 수 있지만 표준 Transformer 대비 성능이 좋지 않아서, 절감분 중 14%를 모델 너비를 늘리는 데 다시 써서 약 20% 적은 상태로 맞췄고 그래서 이름이 GAP20이에요.
- **최종 언어 모델 정확도는 표준 Transformer가 더 좋았어요.**
- 한 CPU 벤치마크에서 GAP20을 torch.compile로 컴파일하면 컴파일 안 한 GAP20보다 학습 처리량이 약 19.9% 늘었어요.

### 공개물과 태도
아키텍처 코드, 크기 설정, 속도 벤치마크, 연구 논문을 GitHub(`rickey1990/Gated-Attention-Projection`)에 올렸어요. 작성자는 실험적 구조일 뿐 Transformer보다 전반적으로 낫다는 주장이 아니라고 분명히 하고, 설계·수학·개선 방향에 대한 피드백을 구해요.
