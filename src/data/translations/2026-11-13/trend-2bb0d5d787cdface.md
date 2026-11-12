---
id: trend-2bb0d5d787cdface
title: "MoE and expert offloading on llama, exllamav3, strata on 9070XT"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xun15v/moe_and_expert_offloading_on_llama_exllamav3
summary: "RX 9070 XT(16GB)와 DDR4 32GB에서 llama.cpp, ExLlamaV3, Strata로 MoE 전문가 오프로딩을 128K 컨텍스트 기준으로 비교한 벤치마크 글이에요. 35B-A3B 모델은 ExLlamaV3가 가장 나았고 Qwen3.8 Flash Next Coder는 Polystrata가 앞섰대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

Reddit API 키가 승인 전이라 넣지 않았고 Wayback 스냅샷도 없어, RSS로 받은 본문 텍스트만 기준으로 옮겼어요. 그래프와 링크된 GitHub 저장소는 읽지 못했어요. 수치는 글쓴이 측정이에요.

### 실험 조건

글쓴이는 자신이 전문가는 아니라고 먼저 밝혀요. RDNA4 **RX 9070 XT(VRAM 16GB)**와 DDR4 32GB 시스템에서 ROCm으로 이틀 동안 MoE 전문가 오프로딩을 여러 엔진에서 벤치마크했대요.

- 목표 컨텍스트: 에이전트 작업의 최소선으로 본 **128K**(압축 없이)
- KV 캐시: Q8(ExLlamaV3에서 Q8_0/Q5_1은 오히려 느렸대요), 드래프터 캐시는 Q4
- 대상: 35B-A3B급 Ornith 1.5와 Qwen 3.6, 그리고 Qwen 3.8 Flash Next(Coder). Gemma는 ExLlamaV3 오프로딩에 필요한 EXL3 양자화가 없어 빠졌어요.
- 드래프터 없음, MTP, DFlash2를 가능한 곳에서 비교했어요.

16GB로는 의미 있는 컨텍스트와 괜찮은 Q4 양자화를 함께 쓰기 어렵지만, Strata·ExLlamaV3·최근 llama.cpp의 '자주 쓰는 전문가 캐시' 덕분에 느린 시스템 메모리로도 현실적이 됐다고 봐요.

### 결과(128K 기준 최고 조합)

- **Ornith 1.5 35B-A3B**: EXL3 4.0bpw + DFlash2 / ExLlamaV3 — 프리필 1,168 tok/s, 디코드 57.3 tok/s
- **Qwen3.6-35B-A3B**: EXL3 4.0bpw + DFlash2(드래프트 2) / ExLlamaV3 — 프리필 1,246 tok/s, 디코드 71.6 tok/s
- **Qwen3.8-Flash-Next Coder**: IQ1_M / Polystrata(`--spec 2`) — 프리필 1,572 tok/s, 디코드 44.0 tok/s

35B 모델의 프리필이 16K에서 1,900 tok/s였다가 128K에서 700 tok/s로 떨어진 점은 놀라웠다고 해요(llama.cpp와 ExLlamaV3 차이는 100~200 tok/s 안). Strata 계열은 자동 생성 설정에 몇 가지를 더했는데도 비-QFN 모델에서 전반적으로 느렸고, 설정이나 벤치가 잘못됐을 수도 있다고 덧붙여요. 전체적으로 ExLlamaV3 결과가 특히 유망하고 꽤 쓸 만하다는 평가예요.
