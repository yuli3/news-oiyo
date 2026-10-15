---
id: trend-c6b8104fea478a78
title: "Moving a running model's layers between GPUs mid-reply (8 ms, no re-prefill)"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x5i7o9/moving_a_running_models_layers_between_gpus"
summary: "jitllm 추론 엔진이 생성 중에 모델 레이어를 GPU 사이로 옮겨요. 2×T4에서 Llama-3.2-3B 이동 일시정지 약 8ms, 재프리필 0토큰이라고 해요. KV는 레이어와 함께 페이징돼요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 아이디어
OS·JIT 감성으로 커널을 하드웨어에 맞게 생성하고, 레이어를 프로세스처럼 **배치·이동**해요.

### 표(포스트)
| 환경 | 모델 | 이동 | Pause | 재계산 |
|---|---|---|---|---|
| 2×T4 | Llama-3.2-3B Q4 | GPU0→1 | **8.1 ms** | 0 |
| 2×T4 | 동일 | GPU1→0 | 8.4 ms | 0 |
| 2×V100 | 1.8k chat | | 20–21 ms | 0 |
| 랩탑 3050 Ti | 1B Q4 | CUDA→Vulkan | 91 ms | 0 |

KV 캐시가 레이어와 함께 이동해 프롬프트를 다시 넣지 않는다고 해요.
