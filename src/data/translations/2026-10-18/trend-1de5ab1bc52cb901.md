---
id: trend-1de5ab1bc52cb901
title: "nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16 · Hugging Face"
sourceUrl: "https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-Dory1.0-4B-BF16"
summary: "NVIDIA가 공유 레이어 블록을 여러 번 반복하는 루프형(latent-recurrent) 4B 모델 Nemotron-Labs Dory1.0을 공개했어요. 같은 체크포인트로 루프 수를 1·2·4로 바꿔 연산과 정확도를 맞바꾸고, 2루프 기준 SWE-bench Verified 59.5예요. 상업적 이용이 가능해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Hugging Face 모델 카드의 요약·아키텍처·특징·벤치마크·vLLM 실행 부분을 읽고 옮겼어요. 그 뒤의 세부 사용법과 학습 데이터 절은 읽지 못해 `partial`로 표시했어요.

### 모델 요약
| 항목 | 값 |
|---|---|
| 파라미터 | 4B |
| 구조 | 루프형(latent-recurrent) normalized-GPT, 슬라이딩 윈도 어텐션과 전체 어텐션 교차 |
| 정밀도 | BF16 (MXFP8, NVFP4, Q5_K_M 형식도 제공) |
| 컨텍스트 | 최대 256K |
| 언어 | 영어 |
| 라이선스 | OpenMDW 1.1, 상업·비상업 사용 가능 |
| 공개일 | 2026-10-16 |

### 루프형이란
레이어를 입력(I) 8개, 반복(R) 20개, 출력(O) 8개로 나누고, **공유된 반복 블록을 여러 번 적용**해요. 루프마다 입력을 다시 주입해요. 토큰당 연산을 늘려 "지능을 키우는" 방식이에요.

### 특징
- **탄력적 추론 연산**: 체크포인트 하나로 루프 수만 바꿔 연산과 정확도를 맞바꿔요. 재학습이나 모델 교체가 필요 없어요.
- **토큰 효율**: 루프가 늘수록 같은 과제를 더 적은 생성 토큰으로 풀어요. 추가 연산이 긴 출력 대신 잠재 공간에서의 사고로 가요.
- **메모리 효율 루프**: 마지막 루프 KV만 저장하는 모드를 켜면 루프 수와 상관없이 비루프 모델 대비 KV 캐시 오버헤드가 없어요.
- **NVFP4 네이티브 사전학습** 후 BF16으로 이어 학습했어요.

### 벤치마크 (NVIDIA 측정, Dory 1/2/4루프)
| 과제 | 1루프 | 2루프 | 4루프 | Qwen3.5-4B |
|---|---|---|---|---|
| SWE-bench Verified | 50.3 | 59.5 | 61.8 | 54.7 |
| Terminal-Bench 2.1 | 12.5 | 18.1 | 22.2 | 15 |
| GPQA Diamond | 69.19 | 72.41 | 72.16 | 77.71 |
| IFBench | 74.29 | 77.94 | 79 | 53.83 |

### 실행
vLLM 지원은 PR #60149에서 검토 중이라 그 PR에서 설치하라고 안내해요. 권장 시작점은 **2루프**로, 정확도 이득 대부분이 두 번째 루프에서 나온다고 해요. 연산을 아끼려면 1루프, Terminal-Bench·SWE-bench 같은 에이전트 과제에는 4루프를 권해요.
