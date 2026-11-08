---
id: trend-2eb7a2515b8ca47b
title: "Llama-modchip: 284B DeepSeek on 64GB RAM, no GPU"
sourceUrl: https://github.com/synchopate/llama-modchip
summary: "llama-modchip은 llama.cpp 커널 패치와 양자화 도구로, 284B DeepSeek-V4-Flash를 1.71bpw(56.56GiB)로 줄여 64GB RAM CPU 단독으로 돌린다고 주장하는 오픈소스 프로젝트예요(README 기준 수치)."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

GitHub README(v2.4.0)의 앞부분을 읽고 옮겼어요. 수치는 모두 README의 주장이고 제가 재현한 것이 아니에요.

### 무엇인가
llama-modchip은 ggml/llama.cpp 커널 패치, 양자화 변환기, 런타임 도구 모음이에요. 희소 MoE(Mixture-of-Experts) 체크포인트를 x86_64(AVX-512/AVX2)와 ARM64(NEON/SVE/Apple Metal)의 시스템 RAM에서 GPU 없이 돌리는 걸 목표로 해요.

### README의 핵심 수치
- 284.33B 파라미터(활성 13.17B) DeepSeek-V4-Flash를 1.71bpw GGUF 56.56GiB로 줄이고, 256K 컨텍스트에서 최대 VmRSS 57.61GiB예요.
- 16코어 Zen 5에서 284B 프리필 44.36 tok/s, 디코드 9.1~14.7 tok/s, 30B MoE CPU 디코드 25.0~111.6 tok/s예요.
- /dev/shm KV 슬롯 복원 13.1ms, 필요한 GPU 0개예요.

### 하드웨어별 목표
16~32GB 노트북/미니PC는 Nemotron-3.5-30B-A3B(14.35GiB, 3.75bpw)로 25.0~60.4 tok/s, 64GB 데스크톱/서버는 DeepSeek-V4-Flash 284B로 쓸 수 있는 리눅스 RAM 62.5GiB 안에 들어가요. 16GB GPU가 있는 하이브리드는 어텐션/SSM 줄기를 GPU에, 차가운 MoE 전문가를 CPU RAM에 둬서 80.80 tok/s를 내요. 8채널 워크스테이션(Threadripper)은 30B로 111.62 tok/s예요.

### 세 가지 접근
1. 표준 UD-IQ1_S 빌드는 76.87GiB라 64GB 시스템에 안 들어가 페이지 캐시 스래싱이나 OOM이 나는데, 이를 56.56GiB로 줄여 라우팅된 전문가 6개(Top-6)를 가지치기 없이 모두 계산해요.
2. CPU 캐시·SIMD 커널 패치로 프리필 +77%, 디코드 +53%를 주장해요(다중 열 타일링, MQA8 FlashAttention, 비임시 스트리밍).
3. Stockfish-PVS식 n-gram 드래프터(1.64MB)와 /dev/shm KV 스냅샷으로 40개 도구 Claude Code 프롬프트의 컨텍스트를 13.1~32.6ms에 복원해요.

뒷부분(양자화 상세 표, 지원 모델, 벤치마크, FAQ)은 읽은 범위 밖이에요.
