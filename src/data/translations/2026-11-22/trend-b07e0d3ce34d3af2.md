---
id: trend-b07e0d3ce34d3af2
title: "5.4 GB 메모리의 Inkling-2-Mini"
sourceUrl: https://github.com/ShinMegamiBoson/lookatmyquant
summary: "LookAtMyQuant는 모델 조각별 압축 손상을 측정해 크기 예산 안에서 손실이 가장 적은 코드를 고르는 양자화 컴파일러예요. 18.89GB인 Inkling-2-Mini 텍스트 가중치를 5.38GB로 줄이고도 GSM8K·HumanEval에서 같은 크기대 Unsloth GGUF보다 높은 점수를 냈다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-22
---

GeekNews가 소개한 ShinMegamiBoson/lookatmyquant 깃허브 README를 읽고 옮겼어요. 수집 도구가 앞부분 약 1만 4,000자만 가져와 README 끝부분(최근 레시피 개선 절 이후)은 읽지 못했어요.

### LookAtMyQuant란

모델의 저장된 조각 하나하나를 압축했을 때 출력이 얼마나 망가지는지 측정하고, 전체 모델이 크기 예산에 맞으면서 손상이 가장 적도록 조각마다 코드를 고르는 **양자화 컴파일러**예요. MIT 라이선스예요. Gemma 4 E2B에서는 같은 파일 크기의 Q4_K_M보다 KL이 12배 낮은 GGUF를 만들었다고 해요.

### 주요 결과

- **Qwen3.5-4B → 1.23GB(가중치당 2.3비트)**: 정답형 수학 문제 540개 중 330개를 풀었어요. Prism ML의 Bonsai 2 Ternary 4B(1.20GB)는 328개, 원본은 359개예요. 비공개 텍스트 기준 원본과의 KL은 0.45 nats로 Bonsai(0.59)보다 낮아요. 레시피 비용은 GPU 시간 약 34달러라고 해요.
- **Qwen3.8-27B → 53.7GB에서 7.2GB(2.1비트)**: 수학 540문제 중 401개로 원본과 같았고, 같은 크기 Unsloth UD-IQ2_XXS는 348개였어요. HumanEval 73.8% 대 67.1%, MMLU 78.8% 대 75.0%, GSM8K 94.5% 대 92.7%로 앞섰어요. 1.02GB짜리 4비트 DSpine 드래프터를 붙이면 Apple Silicon에서 수학·코드 디코딩 속도가 대략 두 배가 된다고 해요.
- **Inkling-2-Mini(26.4B 물리 / 5.4B 활성, 3회 루프 MoE)**: 텍스트 가중치 18.89GB를 5.38GB(1.63비트)와 8.87GB(2.69비트)로 줄였어요.

### Inkling-2-Mini 비교

- 원본 BF16: GSM8K 200문제 중 147개(73.5%), HumanEval 164문제 중 66개(40.2%).
- LookAtMyQuant 5.4GB: 134개(67.0%), 60개(36.6%).
- Unsloth UD-Q2_K_XL 9.14GB: 132개(66.0%), 49개(29.9%).
- LookAtMyQuant 8.9GB: 148개(74.0%), 58개(35.4%).
- Unsloth UD-IQ3_XXS 11.66GB: 148개(74.0%), 68개(41.5%).

README는 5.38GB판이 41% 작으면서 9.14GB UD-Q2_K_XL을 두 벤치마크 모두에서 앞서고, 8.9GB판은 GSM8K에서 BF16 원본과 맞먹는다고 정리해요. M5 Max에서 5.4GB판은 직렬 디코딩 초당 75.3토큰, 드래프터를 쓴 무손실 추측 디코딩 중앙값 초당 124.4토큰(활성 RAM 5.98GB)이 나왔다고 해요.

### 레시피와 사용법

- 학습 후 양자화에 trellis 코드를 쓰고, 모델 자신의 수학 풀이로 보정하면서 숫자 토큰에 10배 가중치를 주고, Fisher 정보로 행마다 비트를 배분해요. 이어서 4,000스텝 증류를 하며 각 층을 원본 가중치에서 한 번 다시 양자화해요.
- Apple Silicon에서는 `pip install git+https://github.com/ShinMegamiBoson/lookatmyquant.git`로 런타임을 깔고 `lamq generate <모델>`이나 `lamq chat`으로 써요. `runtime_mlx.load`는 `mlx_lm.generate`와 호환돼요.
- 컴파일러 자체는 SmolLM2-360M에서 `measure` → `allocate` → `quantize` 세 단계로 시험해 볼 수 있어요. 저자 실행에서는 원본 퍼플렉서티 15.31 대비 16.64, KL 0.0926이 나왔어요.
