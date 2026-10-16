---
id: trend-11f3bca8f6eda87b
title: "Intel LLM-Scaler-vLLM PV 1.5 brings big improvements"
sourceUrl: "https://www.phoronix.com/news/Intel-LLM-Scaler-vLLM-PV-1.5"
summary: "Intel이 Arc 그래픽에서 LLM을 돌리는 컨테이너 스택 LLM-Scaler-vLLM PV 1.5를 냈어요. vLLM을 0.14에서 0.26으로, PyTorch를 2.10에서 2.12로 올렸고 Qwen3.6·Gemma 4 지원과 온라인 FP8·INT4 양자화, FP8 KV 캐시를 더했어요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

Phoronix 기사(Michael Larabel, 2026-10-16) 원문을 읽고 옮겼어요. 원문이 짧은 뉴스라 `sourceShort`로 표시했어요.

### 무엇이 나왔나
Intel 소프트웨어 엔지니어들이 **LLM-Scaler-vLLM PV 1.5**를 공개했어요. Intel Arc 그래픽 하드웨어에서 AI/LLM을 편하게 쓰도록 묶은 Docker 컨테이너 스택이고, Project Battlematrix에서 출발했어요. 앞으로 나올 데이터센터용 Crescent Island "GPU D Series"를 앞둔 큰 업데이트라고 해요.

### 바뀐 점
| 구분 | 이전 → 1.5 |
|---|---|
| vLLM | 0.14 → 0.26 (업스트림은 현재 0.31) |
| PyTorch | 2.10 → 2.12 |
| 새 모델 | Qwen3.6-27B, Qwen3.8-27B, Qwen3.6-35B-A3B, gemma-4-26B-A4B-it, gemma-4-31B-it |
| 양자화 | 온라인 FP8, 대칭 INT4 |
| 캐시 | FP8 KV 캐시 지원 |

버전 도약 폭이 커서 업스트림에 한층 가까워졌지만, 여전히 최신 vLLM보다는 몇 버전 뒤에 있어요.

### 성능 개선
- Qwen과 Gemma 4 모델의 첫 토큰까지 시간(TTFT) 단축
- MTP(다중 토큰 예측) 디코딩 성능 향상
- LoRA 서빙과 FP8 KV 캐시 성능 개선
여기에 버그 수정이 더해졌고, 릴리스는 GitHub에서 받을 수 있어요.

### 왜 볼 만한가
Arc 소비자 GPU로 로컬 LLM 서빙을 하려는 사람에게는 지원 모델과 양자화 옵션이 크게 넓어졌다는 뜻이에요. 다만 업스트림과의 버전 차이가 남아 있어 최신 vLLM 기능은 바로 쓰지 못할 수 있어요.
