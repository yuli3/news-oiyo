---
id: trend-e1e4c633af9d3092
title: "[Benchmark] Strata/Basalt runs Qwen3.8 Flash Next IQ3_S with 16GB VRAM and 55GB RAM with up to 250 tok/s generation and 5,600 tok/s prompt processing (5080, Concurrency 1)"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xesda1/benchmark_stratabasalt_runs_qwen38_flash_next_iq3
summary: "r/LocalLLaMA 사용자가 RTX 5080 16GB와 DDR5 62GB에서 Basalt 엔진으로 Qwen3.8-Flash-Next IQ3_S를 262K 컨텍스트로 돌린 벤치마크를 올렸어요. 에이전트 코딩 세션에서 평균 프리필 5,011, 생성 153 tok/s였대요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> Reddit이 자동 수집을 막아 RSS 피드에 실린 본문(벤치마크 표와 설명)을 기준으로 옮겼어요. Strata/Basalt가 무엇인지에 대한 설명과 댓글은 RSS 본문에 없어 옮기지 않았어요.

### 환경

- 모델: **Qwen3.8-Flash-Next IQ3_S**, 엔진 **Basalt**
- GPU **RTX 5080 16GB**, CPU Core Ultra 9 285K, **DDR5-6800 62GB**
- 컨텍스트 **262K**, int8 KV 캐시, 동시성 1

### 결과

| 작업(프롬프트 5K+) | 프리필 평균 | 프리필 최고 | 생성 평균 | 생성 최고 | VRAM | RAM(엔진/남은 양) |
|---|---|---|---|---|---|---|
| 에이전트 코딩 세션(opencode, 요청 103개, 최대 130K) | 5,011 | 5,118 | 153.0 | 262 | 15.7GB | 54.1GB / 5.2GB |
| 컨텍스트 스윕(새 프롬프트 15K–207K) | 5,475 | 5,662 | 154.9 | 186.6 | 15.7GB | 54.1GB / 5.1GB |

단위는 모두 초당 토큰(tok/s)이에요.

### 측정 방법 설명

- 에이전트 프리필 수치는 캐시에 없던 큰 읽기 두 번(새 토큰 10.7K, 8K)에서 나왔어요.
- 에이전트 세션에서 프롬프트 토큰의 **99.5%가 프롬프트 캐시**에서 왔고, 첫 토큰까지 시간 중앙값은 **0.2초**였대요.
- 에이전트 생성 최고치는 가장 좋았던 1초 구간이고, 평균은 전체 생성 토큰 ÷ 전체 디코드 시간이에요.
- 스윕의 생성 수치는 요청별 평균(각 384토큰, temperature 0.7)이고, 깊이마다 두 번씩 돌렸어요.

### 읽을 때 참고할 점

제목의 '최대 250 tok/s 생성, 5,600 tok/s 프리필'은 표의 최고치(생성 262, 프리필 5,662)에 해당해요. 평균 생성 속도는 약 153–155 tok/s였어요. 16GB VRAM에 모델 전체가 들어가지 않아 시스템 RAM 54GB를 함께 쓰는 구성이에요.
