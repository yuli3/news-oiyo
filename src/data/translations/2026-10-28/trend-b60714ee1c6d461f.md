---
id: trend-b60714ee1c6d461f
title: "Update: My 4B coding model is getting better at generating 3D scenes"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xgc7uv/update_my_4b_coding_model_is_getting_better_at
summary: "Qwen3.5-4B를 코딩용으로 파인튜닝 중인 개발자가 Three.js 3D 장면 생성이 체크포인트마다 좋아지고 있다며 Q4_K_M·Q8_0 파일을 갱신했어요. 10월 28일 07:30 UTC쯤 학습을 마치면 FP16 가중치, 데이터셋, 기술 보고서를 낼 계획이래요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> Reddit이 자동 수집을 막아 RSS에 실린 본문을 기준으로 옮겼어요. 결과 영상은 보지 못했어요.

### 업데이트 내용

u/ConfidentDinner6648이 전에 올린 4B 모델의 근황을 전해요.

- **Qwen3.5-4B**를 일반 코딩용으로 파인튜닝하고 있고, 지금은 **Three.js 장면 생성**을 주된 테스트로 써요.
- 첫 시도에 장면을 망치기도 하지만, 새 체크포인트일수록 장면 품질과 한 번에 성공하는 비율이 눈에 띄게 좋아진대요.
- **Q4_K_M과 Q8_0**을 갱신했고, 이전 파일에서 일부 사용자가 겪은 레이어 문제를 고쳤어요. 파일은 Hugging Face `ccore/Qwen3.5-4B-3D-Coder`에 있어요.

### 다음 계획

- 체크포인트마다 테스트 결과를 저장해 두고 있어서, 여러 프롬프트로 학습 중 개선 과정을 보여 주는 보고서를 만들 수 있대요.
- 계획대로라면 학습은 **10월 28일 07:30 UTC**(한국 시간 16:30)쯤 끝나요.
- 그 뒤 **전체 FP16 가중치, 모든 양자화 버전, 학습 데이터셋, 기술 보고서**를 공개할 예정이에요.
- 작은 4B를 어디까지 밀어붙일 수 있을지 궁금하다며, 잘 되는 것과 깨지는 것 모두 공유해 달라고 해요.
