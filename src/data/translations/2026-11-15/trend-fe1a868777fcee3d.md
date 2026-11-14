---
id: trend-fe1a868777fcee3d
title: "Unsloth Qwen3.8-27B 양자화 모델, Dynamic v3.1 업데이트"
sourceUrl: https://unsloth.ai/docs/models/qwen3.8
summary: "Unsloth가 Qwen3.8-27B GGUF를 Dynamic V3.1(프리뷰) 양자화로 다시 냈어요. 같은 크기에서 Terminal Bench·DeepSWE 등 벤치마크 평균 정확도가 5~10% 올랐다고 하고, 2~6비트 대부분을 갱신했지만 3비트 UD3는 그대로 뒀어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

Unsloth 문서의 Qwen3.8 페이지 앞부분(모델 소개, 11월 11일 업데이트, 벤치마크 방법, Exllama-v3 비교 메모)을 옮겼어요. 실행 방법과 설정 표는 읽지 못했어요.

### Qwen3.8-27B

Qwen3.8-27B는 Qwen의 **270억 파라미터 dense 모델**로 비전과 추론 기능, **256K 컨텍스트**를 갖추고 **17GB RAM/VRAM**에서 로컬로 돌릴 수 있다고 해요. 에이전트 코딩, 비전, 채팅에 강하고, Unsloth GGUF, NVFP4, Unsloth Desktop으로 실행할 수 있어요.

### 11월 11일 업데이트: Dynamic V3.1

- Qwen3.8-27B GGUF가 **Unsloth Dynamic V3.1(프리뷰)** 알고리즘을 쓰도록 바뀌었어요.
- 비슷한 크기에서 Terminal Bench, DeepSWE 등 대부분 벤치마크의 평균 정확도가 **5~10%** 올랐다고 해요. 코딩, 에이전트 작업, 일반 채팅 대부분에서 동급 최고라고 주장해요.
- **2비트~6비트 양자화 대부분**을 갱신했어요. 3비트 UD3는 UD3.1과 성능이 비슷해 갱신하지 않았어요.
- Qwen4와 이후 모델에 적용할 더 나은 Dynamic 양자화도 준비 중이라고 해요.
- 함께 들어간 것: Codex 같은 에이전트 도구를 위한 **Developer 역할 지원**, 중첩 객체 파싱을 개선한 **도구 호출**.

### 벤치마크 방법

에이전트 벤치마크로 **Terminal Bench 2.1, DeepSWE v1.1**, 일반 벤치마크로 **LiveCodeBench v6, GPQA Diamond, MMLU-Pro, AIME25** 등을 돌렸어요. 에이전트 벤치마크는 256K, 나머지는 128K 컨텍스트를 썼고, 같은 V3.1 프리뷰 알고리즘을 쓴 DeepSeek-V4.1-Flash, Qwen3.8-Flash-Next와 같은 방법을 따랐다고 해요.

### Exllama-v3 비교 메모

GSQ-RCO와 Exllama-v3를 비교하려고 그래프의 x축(크기)에서 토큰 임베딩 레이어를 뺐어요. Exllama-v3는 임베딩을 BF16으로 두기 때문이에요. 실제 다운로드 크기와 전체 RAM 사용량으로 보면 BF16 임베딩 테이블이 더해져 그래프가 달라지고, 문서는 이 실제 사용량 기준 그래프도 따로 보여 줘요. Exllama-v3가 왜 임베딩을 BF16으로 두는지는 조사하지 않았다고 밝혔어요.
