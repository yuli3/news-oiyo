---
id: trend-f7e436da3ee6135a
title: "LiquidAI/LFM3-1.7B · Hugging Face"
sourceUrl: https://huggingface.co/LiquidAI/LFM3-1.7B
summary: "Liquid AI의 LFM3-1.7B 모델 카드예요. 로컬 에이전트·특화 앱용 텍스트 모델로, 24층(짧은 합성곱 13, SWA 5, 전역 어텐션 6), 256K 컨텍스트, 16개 언어(한국어 포함)를 지원하고 4비트에서 약 1GB예요. 에이전트 코딩용으로는 권하지 않는대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> r/LocalLLaMA에 공유된 Hugging Face 모델 카드(README)를 직접 읽어 옮겼어요.

### 무엇인가

**LFM3-1.7B**는 Liquid AI의 새 tri-hybrid 아키텍처 기반 **로컬 에이전트·특화 애플리케이션용 텍스트 모델**이에요.

- **에이전트 학습**: Hermes Agent, Pi, OpenClaw 같은 에이전트 하네스에 맞춰 후학습했어요.
- **엣지용**: 4비트에서 약 **1GB** 메모리라 폰이나 노트북에 들어가요.
- **특화용**: GPU 한 장으로 빠르게 파인튜닝해 도메인·형식·도구에 맞출 수 있어요.

### 사양

| 항목 | 내용 |
|---|---|
| 파라미터 | 1.73B |
| 구조 | 24층: 게이트 짧은 합성곱 13, 슬라이딩 윈도 어텐션 5, 전역 어텐션 6 |
| 컨텍스트 | 256K 토큰(입력+출력) |
| 어휘 | 128,000 토큰 |
| 언어 | 영어, 아랍어, 중국어, 프랑스어, 독일어, 이탈리아어, 일본어, 한국어 등 16개 |
| 라이선스 | LFM Open License v1.0 |

로컬 에이전트, 도구 호출, 구조화 출력, 도메인 파인튜닝용이에요. 지식이 많이 필요한 일엔 검색을 붙이라고 하고, 작은 크기 때문에 **에이전트 코딩이나 복잡한 다단계 추론에는 권하지 않아요.**

### 추론

- BF16(vLLM, SGLang, Transformers), FP8·NVFP4(SGLang), GGUF(llama.cpp, Ollama, LM Studio), MLX(Apple Silicon 4비트), ONNX 변형이 있어요.
- 권장 샘플링: 일반(채팅·도구·에이전트·코딩) `temperature=0.1, top_k=50, repetition_penalty=1.1`, 수학·과학 `temperature=1.0, top_p=0.95, top_k=20`
- ChatML 형식 채팅 템플릿을 써요.

> 모델 카드 앞부분을 기준으로 옮겼어요. 벤치마크 표와 파인튜닝 안내는 다 읽지 않았어요.
