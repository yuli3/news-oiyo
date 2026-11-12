---
id: trend-172142daf3d5a83f
title: "Solved High CPU usage when model fit in GPU, beware of -ngl -1 llama.cpp layers offloading to GPU and llama-fit-param"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xun196/solved_high_cpu_usage_when_model_fit_in_gpu
summary: "RTX 3090에서 27B 모델이 VRAM에 들어가는데도 CPU 사용률이 높았던 원인이 llama.cpp의 -ngl -1(자동) 설정이었다는 글이에요. 레이어 일부만 GPU에 올라갔고, -ngl all로 바꾸자 CPU 사용이 사라지며 생성 속도가 60에서 76 tok/s로 올랐대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

Reddit API 키가 승인 전이라 넣지 않았고 Wayback 스냅샷도 없어, RSS로 받은 본문 텍스트만 기준으로 옮겼어요. 댓글은 읽지 못했어요.

### 상황

글쓴이는 RTX 3090(모니터는 메인보드에 연결해 GPU를 계산에만 씀)에서 컨텍스트를 얼마나 쓸 수 있는지 알아보고 있었어요. 모델은 Swift-1.5-Qwen3.8-27B Q4_K_M, KV 캐시 q8_0, Flash Attention 켬이에요.

- `llama-fit-params`에 `-ngl -1`을 주자 `-c 150272 -ngl -1`을 권했어요.
- 그런데 더 작은 131072 컨텍스트로 `llama-server`를 띄워도, 로그를 보면 마지막에 **66개 중 64개 레이어만** GPU에 올라갔어요. 그래서 모든 프롬프트에서 CPU 사용률이 높았어요.

### 해결

`-ngl`을 `-1`에서 **`all`**로 바꾸자 66/66 레이어가 모두 올라가고 CPU 사용이 사라졌어요(99나 999를 써도 같지만 보기 안 좋대요). 이것만으로 생성 속도가 **60 → 76 tok/s**가 됐어요.

### 더 헷갈리는 점

- `llama-fit-params`에 `-ngl all`을 주면 출력에 `-2`가 나오고, 로그에는 "사용자가 n_gpu_layers를 -2로 이미 정해 맞추기를 중단한다"는 메시지가 남아요.
- 결론적으로 `-1`은 'auto', `-2`는 'all'을 뜻하는 것으로 보여요.
- 그런데 도움말은 `-ngl N`을 "VRAM에 둘 **최대** 레이어 수(정확한 수, auto, all 중 하나, 기본값 auto)"라고 설명해서, 하한이 아니라 상한처럼 읽혀 더 헷갈린다고 해요.

이론상 GPU에 다 들어가는 모델인데 CPU 사용률이 높다면 `all`을 써 보라는 게 글쓴이의 조언이에요.
