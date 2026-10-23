---
id: trend-2f5f6bdacf80589b
title: "nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB · Hugging Face"
sourceUrl: https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB
summary: "NVIDIA가 Gemma-4-E4B-it을 추가 후학습한 소형 모델 Nemotron-3.5-Bolt-E4B-4GB를 Hugging Face에 올렸어요. 총 8B(실효 4B), Q4_K_M, 입출력 64K 토큰이고 로컬 음성·기기 비서처럼 빠른 첫 응답이 필요한 곳을 겨냥해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> Hugging Face 모델 카드(README)의 앞부분(설명, 요약표, 개요, 빠른 시작)을 기준으로 옮겼어요. 벤치마크, 학습 데이터, 안전 관련 뒷부분은 읽지 못했어요.

### 어떤 모델인가요

**NVIDIA-Nemotron-3.5-Bolt-E4B-4GB**는 NVIDIA가 Google의 **Gemma-4-E4B-it**을 추가로 후학습한 소형 언어 모델(SLM)이에요. Gemma의 대화 능력을 이어받으면서 **멀티턴 도구 사용, 지시 따르기, 입력 근거(grounding)**를 개선했어요. 빠른 로컬 음성·기기 비서, 대화형 페르소나, 임베디드·엣지 인터페이스를 겨냥해요.

메모리를 적게 쓰고 첫 토큰까지 시간(TTFT)이 짧도록 설계해, 에이전트가 빨리 답하면서도 앱이나 옆의 다른 모델 파이프라인에 여유를 남긴대요. 상업·비상업 용도 모두 쓸 수 있어요.

### 요약표

| 항목 | 내용 |
|---|---|
| 파라미터 | 총 8B(실효 4B) |
| 아키텍처 | Gemma-4-E4B |
| 정밀도 | Q4_K_M |
| 컨텍스트 | 입력 최대 64K, 출력 최대 64K 토큰 |
| 입출력 | 텍스트 / 텍스트 |
| 배포 | llama.cpp(레시피 준비 중) |
| 추론 모드 | 채팅 템플릿의 `enable_thinking`, 런타임 사고 예산 |
| 대화 모드 | `conversational_mode` 옵션 |
| 권장 샘플링 | temperature 1.0, top_p 0.95 |
| 라이선스 | OpenMDW-1.1 |

개발 기간은 2025년 12월~2026년 5월이고, 후학습 데이터는 2026년 5월까지예요. 34개 언어(한국어 포함)를 태그로 달았어요.

### 함께 나온 것

- 추측 디코딩용 **DFlash drafter**(NVIDIA-Nemotron-3.5-Bolt-E4B-4GB-DFlash)
- 전체 정밀도 **BF16** 판

### 빠른 시작

`hf download`로 GGUF와 drafter를 받고, llama.cpp 서버 도커 이미지로 `-c 65536 -ngl 999 --jinja` 옵션을 줘 띄워요. drafter를 쓸 때는 `--spec-type draft-dflash --spec-draft-n-max 7`을 더해요. 그다음 OpenAI 호환 `/v1/chat/completions`로 호출해요.
