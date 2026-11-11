---
id: trend-c1e5e15bfdeb7fce
title: "Huawei releases MACaQ, its internal quantizer for local inference"
sourceUrl: https://github.com/huawei-csl/MACaQ
summary: "Huawei CSL이 모델 종류와 무관한 양자화 도구 MACaQ를 공개했어요. llama.cpp용 2/3/4비트 GGUF, vLLM·Diffusers·PyTorch용 W4A4를 지원하고, 1,220억 파라미터 모델을 32.5GB 메모리로 64분 만에 양자화한다고 README에 적었어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

GitHub 저장소 README의 앞부분(약 5,500자)을 읽고 옮겼어요. Ascend 절 이후와 논문·블로그 본문은 읽지 못했어요.

### 무엇인가

**MACaQ**(huawei-csl/MACaQ)는 "로컬 추론을 위한 고품질 GGUF, 텍스트를 넘어선 모델 무관 양자화"를 내건 저장소예요. 텍스트·이미지·비디오·오디오 모델을 양자화해 llama.cpp, vLLM, Diffusers, PyTorch로 돌릴 수 있어요.

README가 내세우는 수치:

- 1,220억(122B) 파라미터 모델을 **64분**, 장치 메모리 **32.5GB**로 양자화
- MR-GPTQ, DuQuant++보다 낮은 퍼플렉서티, 또는 Llama-3-8B에서 이들의 최고 퍼플렉서티를 **11배 짧은** 양자화 시간으로 맞춤

### 백엔드별 지원

- **Diffusers**: 이미지·비디오·오디오 생성, W4A4. FLUX.2-klein-4B, Wan2.2-TI2V-5B, stable-audio-1.0 예시가 있어요. 이미지→비디오는 보정 때 조건 이미지를 써요.
- **llama.cpp**: 텍스트 생성, 2/3/4비트 GGUF. Qwen3-4B, Qwen3-30B-A3B, Qwen3-Coder-30B-A3B, OLMoE-1B-7B, Qwen3-Next-80B-A3B 등 dense·MoE 워크플로가 있고 CPU 실행도 돼요.
- **vLLM**: 텍스트 생성·서빙, 기본 W4A4 또는 가중치 전용. Qwen3.8-27B에서 BF16 퍼플렉서티 2.8463 대비 W4A4는 2.8994이고, prefill 2.33배·decode 2.58배 빨랐다고 해요.
- **PyTorch**: Qwen3-TTS, Chatterbox Turbo 같은 음성 생성기를 W4A4로 양자화해 WAV를 만들어요. 저장한 체크포인트는 보정을 다시 하지 않고 불러와요.
- Huawei **Ascend** 용 W4A4 dense 경로도 따로 있어요.

백엔드마다 Python 3.12와 별도 환경을 쓰라고 권해요.
