---
id: trend-b9c4f4a93b2b595c
title: "Intel Arc Vulkan prefill got a dedicated FA kernel in llama.cpp master"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xumdj4/intel_arc_vulkan_prefill_got_a_dedicated_fa
summary: "llama.cpp master에 Intel Arc·Xe용 Vulkan Flash Attention 프리필 전용 커널이 들어갔어요. 인텔 행렬 코어 형태와 SLM 구조에 맞춘 셰이더로, ARL-H·Xe2·Xe3에서 프리필 속도가 크게 올랐고 A770처럼 결과가 불안정한 기기에서는 꺼 뒀대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

Reddit API 키가 승인 전이라 넣지 않았고 Wayback 스냅샷도 없어, RSS로 받은 본문 텍스트만 기준으로 옮겼어요. 원래 PR과 댓글은 읽지 못했어요. 수치는 글쓴이가 올린 측정값이에요.

### 무엇이 바뀌었나

llama.cpp에 Intel Arc와 Xe용 **Vulkan Flash Attention 프리필 전용 커널**이 들어왔어요. 인텔 고유의 행렬 코어 형태와 SLM(공유 로컬 메모리) 구조를 쓰도록 맞춘 셰이더이고, m16n16k16/SIMD32를 지원해요.

- 안정성을 위해 ARL-H, Xe2, Xe3 등 특정 아키텍처에서만 켜고, 테스트 결과가 들쭉날쭉한 **A770 같은 기기에서는 꺼 뒀어요**.
- 백엔드 개선으로 MQA·MLA처럼 KV 헤드가 하나인 모델도 혜택을 받아요.

### 프리필 성능(pp8192, 기존 → PR, 토큰/초)

- **ARL-H Windows**: qwen3 8B 126.6 → 415.3, qwen35 27B 83.4 → 120.0, qwen35moe 35B.A3B 247.8 → 394.4, gpt-oss 20B 478.1 → 639.0
- **PTL-H Windows**: qwen3 8B 234.9 → 911.6, gpt-oss 20B 804.7 → 1,357.3
- **B70 Pro Windows**: qwen3 8B 1,064.7 → 2,955.8, gpt-oss 20B 2,311.4 → 3,967.3
- **B70 Pro Linux**: qwen3 8B 783.7 → 1,518.2, gpt-oss 20B 1,237.5 → 1,841.4

### Arc B580 세부(f16 프리필 pp16384)

- Gemma4 E4B Q4_K_M: 116.0 → 1,156.6(+897%)
- Phi-3.5-mini: +142.7%, Granite 4.2 8B: +84.3%, Llama 3.1 8B: +82.2%
- Qwen3.5-9B Q6_K: +42.5%, Gemma3 4B: +37.7%
- KV 헤드가 하나인 모델에서 특히 커서 Ling-3.0-tiny는 76 → 1,239(+1,530%), Gemma4 12B는 52 → 649(+1,144%)였어요.
