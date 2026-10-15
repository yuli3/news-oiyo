---
id: trend-3ca3ffb2ecad6c9c
title: "Muse Spark Open"
sourceUrl: "https://research.meta.ai/blog/muse-spark-open"
summary: "Meta가 총 816B·활성 42B 파라미터, 1M 토큰 컨텍스트의 네이티브 멀티모달 오픈웨이트 모델 Muse Spark Open을 공개했어요. 코딩·에이전트 작업용이고, M5 Ultra Mac Studio 두 대에서 MLX로 돌릴 수 있다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Meta AI Research 블로그 원문을 직접 읽고 옮겼어요. 벤치마크 표는 이미지라 수치는 옮기지 않았어요.

### 무엇을 공개했나
Meta는 Muse Spark Open의 가중치를 공개하면서 "지금까지 가장 뛰어난 미국산 오픈웨이트 모델"이라고 소개해요.

- 네이티브 멀티모달 모델이에요. 총 816B 파라미터 중 42B가 활성화돼요.
- 컨텍스트 창은 1M 토큰이에요.
- 코딩과 에이전트 작업을 위해 만들었고, 긴 호흡의 작업, 복잡한 소프트웨어 엔지니어링, 여러 단계 추론에 강하다고 해요.

### 데스크톱에서 돌리는 첫 모델
Meta는 "미래는 모두의 것"이고, 고급 모델을 집을 포함해 어디서든 돌릴 자유도 그 일부라고 말해요. Muse Spark Open은 이 체급에서 처음으로 Apple M5 Ultra Mac Studio 두 대와 최신 MLX로 데스크톱에서 돌아가는 모델이라고 해요.

- M5 Ultra의 통합 메모리 구조 덕분에 Mac Studio 한 대당 GPU가 최대 512GB를 쓸 수 있어서, 두 대면 모델 전체를 올릴 수 있어요.
- 칩의 메모리 대역폭 1.2TB/s는 토큰마다 필요한 작은 조각을 읽기에 충분하다고 해요. 그래서 두 대가 1TB 통합 메모리를 가진 슈퍼컴퓨터처럼 동작한다고 설명해요.
- Muse Spark Open 기반 Muse Code로 온디바이스 에이전트 작업을 시험했어요. 오픈소스 Mastodon 클라이언트 Ice Cubes에 실제 iOS 변경(버그 수정, 새 기능, 전체 빌드)을 반영하고, DaVinci Resolve를 처음부터 끝까지 조작해 영상을 프레임 단위로 검토하고 좋은 장면을 세로로 잘라내게 했다고 해요.

### 어디서 쓸 수 있나
- API: Baseten, Fireworks AI, Groq, Modal, Nebius, OpenRouter, Together AI
- 가중치 다운로드: Amazon SageMaker AI, Google Cloud Model Garden, Hugging Face, Microsoft Foundry Models
- 추론 엔진: SGLang, vLLM, TensorRT-LLM, Hugging Face Transformers, Apple MLX, llama.cpp, Unsloth. AMD·Apple·Intel·NVIDIA 실리콘 최적화가 들어가 있고, PyTorch로 추가 튜닝할 수 있어요.

SGLang에는 자동 튜닝되는 Helion GPU 커널이 함께 들어가요. NVIDIA·AMD GPU에서 커널 단위 1.03–3.95배 속도 향상, AMD MI350에서 엔드투엔드 3% 속도 향상을 냈다고 해요.

### 안전성과 라이선스
Meta는 오픈웨이트 공개가 "개인 초지능"의 혜택을 모두에게 나누는 방법이자 업계 안전 연구를 진전시키는 방법이라고 말해요. 다만 오픈웨이트는 고유한 고려 사항이 있어서 추가 안전 후처리 학습을 했다고 해요. Meta Superintelligence Scaling Framework에 따라 가장 심각한 위험을 평가했고, 공개에 필요한 기준을 충족했다고 밝혀요. 자세한 결과는 모델 카드에 있고, 전체 평가 보고서는 곧 나온다고 해요.

라이선스는 Muse Model License로, 제한적인 상업 조건이 붙지만 많은 개발자가 무료로 쓸 수 있다고 해요.

### 시작하기
PyTorch TorchTitan으로 용도에 맞게 튜닝할 수 있고, Apple 실리콘에서는 MLX가 Hugging Face에서 가중치를 바로 받아 와요. Mac Studio용 MLX 어댑터도 함께 공개했어요.
