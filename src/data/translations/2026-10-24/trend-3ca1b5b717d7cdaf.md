---
id: trend-3ca1b5b717d7cdaf
title: "Strata now supports Qwen 3.6 35B"
sourceUrl: https://github.com/Niko1221/Strata/blob/main/docs/QWEN36.md
summary: "로컬 추론 엔진 Strata가 Qwen3.6-35B-A3B(35B MoE, 3B 활성)를 지원해요. Unsloth GGUF로 텍스트뿐 아니라 그림 입력과 동시 다중 요청을 처리하고, 그림 인코더 결과를 llama.cpp와 단계별로 대조해 검증했어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> GitHub 문서 페이지는 자동 수집에서 429가 나서 같은 문서의 원본(raw) 파일을 읽었어요. 문서 앞부분(개요, 그림 입력, llama.cpp 대조 도입부)만 옮겼고 동시 요청·속도 부분은 읽지 못했어요. r/LocalLLaMA 공유 글에는 gfx906(MI50 16GB)에서 llama.cpp보다 디코드가 느렸다는 사용자 소감이 붙어 있었어요.

### 무엇을 지원하나요

Strata는 **Qwen3.6-35B-A3B**(35B 전문가 혼합, 활성 3B, 전문가 256개 중 top-8)를 Unsloth의 MTP 층 포함 GGUF(UD-Q4_K_XL, UD-Q6_K_XL, Q8_0)로 자체 엔진 경로(`src/qwen35`)에서 돌려요. 파일 아키텍처를 보고 자동으로 이 경로로 바꾸고, 앱 모델 목록, `strata launch`, 설정의 `--family qwen36`으로 고를 수 있어요.

텍스트 말고도 **그림을 읽고**, **여러 요청을 동시에** 처리해요. Flash-Next 모델과 같은 두 옵션이에요.

### 측정 환경

- AMD Radeon AI PRO R9700 32GB(HIP, Linux, UD-Q4_K_XL, 전문가 전부 VRAM)
- RTX 3060 12GB(CUDA, 20스레드, 하이브리드 모드로 층마다 전문가 256개 중 22~37개만 VRAM, 나머지는 CPU)
- 같은 파일로 llama.cpp 972b5fc와 비교

### 그림 입력

비전 인코더는 Unsloth의 `mmproj-F16.gguf`(0.9GB, SHA-256 확인)로, 2×2 병합기가 달린 27층 ViT예요. 그래픽 메모리 24GB 미만이면 CPU 리더(그림당 몇 초, VRAM 없음), 24GB 이상이면 GPU 인코더(최대 1,024 이미지 토큰에 약 1.2GB VRAM)를 기본으로 써요. Mac 엔진은 이 모델을 돌리지 않아요.

| 인코더 | 그림당 시간(260 / 350토큰) | VRAM |
|---|---|---|
| GPU, RTX 3060 | 0.10초 / 0.15초 | 1,179MiB |
| CPU 32스레드 | 0.9초 / 1.1초 | 없음 |
| CPU 10스레드 | 1.6초 / 2.1초 | 없음 |

그림은 컨텍스트의 최대 1,024토큰이 되고(CPU 기본 300), llama.cpp와 똑같이 M-RoPE로 2차원 위치를 줘요. 정확성은 llama.cpp의 `mtmd`와 같은 프롬프트로 24단계 로짓을 비교해 확인했대요.
