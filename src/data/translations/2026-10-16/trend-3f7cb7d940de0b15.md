---
id: trend-3f7cb7d940de0b15
title: "Introducing Muse Spark Open: the most capable US open-weight model to date"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x6r9pz/introducing_muse_spark_open_the_most_capable_us"
summary: "Meta(u/AIatMeta)가 LocalLLaMA에 Muse Spark Open 공개를 직접 알렸어요. 총 816B·활성 42B, 1M 컨텍스트, 텍스트·이미지·영상·오디오 입력을 지원하고 M5 Ultra Mac Studio 두 대에서 MLX로 돌릴 수 있다고 해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Reddit이 원문 페이지에 403을 돌려줘 **RSS 본문**을 기준으로 옮겼어요. 글 본문은 RSS에 들어 있지만 댓글 반응은 보지 못해 `partial`로 표시해요. 같은 발표의 Meta 블로그 원문은 오늘의 다른 항목(Muse Spark Open)에 따로 옮겼어요.

### 공지 내용
Meta 공식 계정이 r/LocalLlama에 "지금까지 가장 뛰어난 미국산 오픈웨이트 모델"이라며 Muse Spark Open을 소개했어요. 코딩과 에이전트 작업용으로, 긴 호흡의 작업, 복잡한 소프트웨어 엔지니어링, 여러 단계 추론에 강하다고 해요.

### 주요 사양
- 파라미터: 총 816B / 활성 42B
- 컨텍스트: 1M 토큰
- 모달리티: 텍스트, 이미지, 영상, 오디오
- 안전: 추가 안전 후처리 학습, Meta Superintelligence Scaling Framework에 따른 평가

### 추론·튜닝·배포
- **Helion GPU 커널**: SGLang에 자동 튜닝되는 커스텀 커널이 들어가 NVIDIA·AMD GPU에서 커널 단위 1.03–3.95배, AMD MI350에서 엔드투엔드 3% 개선이 있다고 해요.
- **엔진**: SGLang, vLLM, TensorRT-LLM, Hugging Face Transformers, Apple MLX, llama.cpp, Unsloth. AMD·Apple·Intel·NVIDIA 최적화가 들어가 있어요.
- **Apple Silicon**: 최신 MLX로 M5 Ultra Mac Studio 두 대에서 돌도록 최적화했어요.
- **파인튜닝**: PyTorch, TorchTitan으로 추가 튜닝할 수 있어요.
- **API**: Baseten, Fireworks AI, Groq, Modal, Nebius, OpenRouter, Together AI
- **가중치**: Amazon SageMaker AI, Google Cloud Model Garden, Hugging Face, Microsoft Foundry Models

### 라이선스
Muse Model License로 공개하고, 제한적인 상업 조건이 붙지만 많은 개발자가 무료로 쓸 수 있다고 해요. 글 끝에서 피드백을 기다린다며 연구 블로그와 Hugging Face 컬렉션 링크를 붙였어요.
