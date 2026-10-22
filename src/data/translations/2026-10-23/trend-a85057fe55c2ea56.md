---
id: trend-a85057fe55c2ea56
title: "Carbon-X is an open 14.8B model trained jointly on DNA and text [R]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xchayq/carbonx_is_an_open_148b_model_trained_jointly_on
summary: "r/MachineLearning에 Carbon-X 소개 글이 올라왔어요. 14.8B 디코더 모델로 채팅에서 DNA를 그대로 받아 영어로 답하고, DNA 벤치마크 5개 평균 66.7%(GPT-6.1 Sol 67.5%)를 냈으며 Apache 2.0으로 80GB GPU 한 장에 들어가요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 스냅샷 없음) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글과 글에 달린 링크·이미지는 읽지 못했어요.

### 모델 요약

작성자 u/jatingargiitk가 Hugging Face 모델 카드를 출처로 정리한 내용이에요.

- **Carbon-X**는 **14.8B 파라미터 디코더 전용** 모델이에요.
- 일반 채팅 안에서 **날 DNA 서열을 받아 영어로 답해요.**
- 텍스트와 DNA가 **하나의 토큰 흐름**을 공유하고, DNA는 **6-mer 토큰**으로 다뤄요.
- **302B 토큰**으로 중간 학습했어요.

### 성능과 배포

- Hugging Face는 thinking을 끈 상태에서 DNA 벤치마크 5개 **평균 66.7%**를 보고했어요. 비교 대상인 **GPT-6.1 Sol은 67.5%**예요.
- 가중치는 bfloat16으로 **80GB GPU 한 장**에 들어가요.
- 라이선스는 **Apache 2.0**이에요.

### 한계

- **임상적으로 검증되지 않았어요.**
- 모델 카드는 정확한 서열 연산은 여전히 코드로 처리해야 한다고 말해요.

### 작성자의 질문

작성자는 쓸모 있는 부분이 민감한 데이터셋에서도 쓸 수 있게 **서열 분석을 로컬로 돌릴 수 있게 된 점**이라고 봐요. 그러면서 벤치마크 향상이 **비공개 변이 데이터셋**에서도 유지되는지 시험해 본 사람이 있는지 물었어요.
