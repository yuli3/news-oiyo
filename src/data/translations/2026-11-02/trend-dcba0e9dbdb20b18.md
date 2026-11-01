---
id: trend-dcba0e9dbdb20b18
title: "[Release] Drex Max v1: Open-weight 27B multimodal decision model, 262K context, local inference on Apple Silicon"
sourceUrl: https://huggingface.co/nace-ai/drex-max-v1
summary: "Nace.AI가 텍스트를 생성하지 않고 한 번의 순전파로 최대 255개 선택지 확률을 돌려주는 27B 멀티모달 '결정 모델' Drex Max v1을 공개했어요. 컨텍스트는 최대 262K이고 Apple Silicon에서도 돌아가요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

Hugging Face 모델 카드(raw README)의 앞부분(약 3,500자)과 Reddit 공개 글(RSS)을 읽고 옮겼어요. 성능 표 뒷부분은 반영하지 않았어요.

### 무엇이 다른가

**Drex Max**는 주어진 컨텍스트에 대한 정형 질문에 답하는 모델이에요. 컨텍스트를 `state`(텍스트, JSON, 이미지)로 주고 이름 붙인 질문을 하나 이상 넣으면, **한 번의 순전파로 모든 선택지의 확률**을 돌려줘요. **아무것도 생성하지 않아요.** 토큰도, 파싱할 JSON도 없어요. Reddit 글에 따르면 지연 시간은 약 400ms예요.

- 밀집(dense) **27B 파라미터**, **255-way readout head**
- 라이선스: Nace.AI Open RAIL-M
- 공개 Decision Index 0.4에서 **67.52**, 공개 vision index 73.92, Artificial Analysis Decision Index 64점이래요.

### 구조

백본은 64층이에요. 왼쪽에서 오른쪽으로 가는 **Gated DeltaNet 선형 어텐션 48층**과, 4층마다 하나씩 있는 **비인과(양방향) full attention 16층**이라 모든 토큰이 전체 시퀀스를 볼 수 있어요. 이미지는 네이티브 비전 타워를 거쳐 요청의 모든 질문에 공유되고, Reddit 글 기준 이미지당 최대 4,194,304픽셀이에요. 마지막 hidden state를 `readout.safetensors`가 최대 255개 선택지 확률로 바꿔요. 번들 로더가 비인과 어텐션을 적용하니, 일반 인과 채팅으로 돌리면 점수가 재현되지 않는대요.

### 실행 환경

- NVIDIA GPU에서는 Python으로 돌아요.
- Apple Silicon에서는 텍스트 백본이 llama.cpp, Ollama, Kapitsa, MLX로, CPU에서는 llama.cpp와 Ollama 포크로 돌아요.
- affine Q4는 메모리 24GB 이상 Apple Silicon Mac, Q8_0 GGUF는 48GB가 필요해요. bf16 가중치는 약 49GB예요.
- 기본 한도는 요청당 16,384토큰이고 `DREX_MAX_CONTEXT=N`이나 `--max-length N`으로 **262,144토큰**까지 늘려요.

### 성능 (2026년 10월 19일 기준, 공개 텍스트 지수)

| 모델 | 공개 지수 | 도구 |
|---|---|---|
| Drex Max (27B) | 67.52 | 81.9 |
| Drex v2.0 (35B) | 61.25 | 76.5 |
| Jev 1.13.0 | 57.96 | 75.1 |

공개 지수는 5개 영역 37개 벤치마크 평균이고, 답하지 못한 요청은 오답으로 쳐요.
