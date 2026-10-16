---
id: trend-8a912eccca2cc7b9
title: "Apple ML Research: Muse Spark Open with MLX on Mac Studio"
sourceUrl: "https://machinelearning.apple.com/research/mlx-distributed-inference"
summary: "Apple ML 리서치가 새 MLX와 Thunderbolt RDMA로 Mac Studio 여러 대에서 Meta의 816B Muse Spark Open을 돌리는 방법을 공개했어요. M5 Ultra 4대 텐서 병렬로 초당 36토큰 넘게 생성하고, 단일 기기에선 M3 Ultra 대비 TTFT가 최대 4.6배 빨라졌다고 해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

Apple Machine Learning Research 원문(2026-10-15)을 읽었어요. 글이 길어서 앞부분부터 2대 파이프라인 병렬 설명까지 옮겼고, 이후 텐서 병렬 상세 수치는 읽지 못해 `partial`로 표시해요.

### 요약
MLX는 Apple silicon의 통합 메모리를 쓰는 오픈소스 배열 프레임워크예요. 이 글은 오늘 나온 최신 MLX로 1조에 가까운 파라미터의 **Muse Spark Open**을 책상 위에서 돌리는 방법을 보여 줘요. Mac Studio 4대 클러스터에서 초당 36토큰 이상을 생성해 사람의 평균 읽기 속도를 넘는다고 해요.

### 평가한 모델
| 모델 | 전체 | 활성 | 평가 정밀도 |
|---|---:|---:|---|
| Muse Spark Open (MoE) | 816B | 42B | NVFP4 |
| Mistral Medium 3.5 | 128B | 128B | FP8 |
| Qwen 3.8 | 27B | 27B | BF16 |

`mlx_lm.benchmark`로 TTFT(첫 토큰까지 시간), 생성 처리량, 최대 전력을 8,192·65,536 컨텍스트에서 쟀어요. 에이전트 코딩처럼 긴 컨텍스트가 필요한 로컬 사용을 염두에 둔 설정이에요.

```bash
mlx_lm.benchmark --model Qwen/Qwen3.8-27B -p 8192 -g 128 -b 1
```

### Mac Studio 한 대
- Qwen 3.8과 Mistral Medium 3.5는 512GB 한 대에 들어가요(65,536 컨텍스트에서 각각 최대 68GB, 158GB).
- TTFT는 연산 병목이라 M5 Ultra GPU Neural Accelerator의 행렬곱 지원이 효과를 내서 M3 Ultra보다 **최대 4.6배** 빨라요.
- 생성 속도는 메모리 대역폭 병목이에요. 대역폭이 819GB/s에서 1.2TB/s로 늘어 **1.6배** 빨라졌어요.
- 최대 전력은 M3 Ultra 약 200W, M5 Ultra 약 300W라 가정이나 사무실에 둘 수 있다고 해요.

### 여러 대로 나누기
Muse Spark Open은 BF16이면 파라미터만 1.6TB가 넘고, NVFP4로 줄여도 약 493GB라 중간 계산까지 넣으면 한 대에 안 들어가요.

- **파이프라인 병렬**: 층을 깊이 방향으로 반씩 나눠 두 대가 차례로 실행해요. 코드 변경이 아주 적어요.
- **텐서 병렬**: 층을 너비 방향으로 나눠요.
- macOS 26.2의 Thunderbolt 5 RDMA 드라이버 위에서 MLX v0.30.1+가 `jaccl` 통신 집합 연산을 제공해요. 실험에선 두 대를 Thunderbolt 케이블 2개로 연결해 대역폭을 두 배로 했어요.

```bash
mlx.launch --hostfile hostfile.json --backend jaccl -- env MLX_METAL_FAST_SYNCH=1 -- \
mlx_lm.benchmark --model mistralai/Mistral-Medium-3.5-128B -p 8192 -g 128 -b 1 --prefill-step-size 8192 --pipeline
```

`MLX_METAL_FAST_SYNCH=1`은 CPU–GPU 동기화를 빠르게 하는 실험 기능이에요. 원문은 파이프라인 병렬의 생성 속도가 단일 기기와 거의 비슷하다고 설명을 이어 가요.
