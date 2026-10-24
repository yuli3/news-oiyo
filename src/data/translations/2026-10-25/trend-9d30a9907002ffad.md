---
id: trend-9d30a9907002ffad
title: "[Release] ISTA GSQ-RCO GGUFs for DeepSeek-V4.1-Flash-1017"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xe2wg8/release_ista_gsqrco_ggufs_for_deepseekv41flash1017
summary: "ISTA DASLab이 7,632억 파라미터 MoE 모델 DeepSeek-V4.1-Flash-1017을 GSQ·RCO로 1.75~2.25비트 GGUF로 양자화해 공개했어요. 2.00bpw 버전은 평가한 벤치마크에서 원본과 같은 점수를 냈고, 12GB GPU 하나로 Strata에서 돌아간대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-25
---

> Reddit이 자동 수집을 막아 RSS 피드에 실린 연구실 공지 본문을 기준으로 옮겼어요. Hugging Face 모델 카드와 논문은 읽지 않았어요.

### 무엇을 공개했나요

**ISTA Deep Algorithms and Systems Lab**이 **DeepSeek-V4.1-Flash-1017**을 **GSQ와 RCO**로 양자화해 **1.75~2.25 bpw**로 공개했어요. 원 모델은 층마다 라우팅 전문가 384개 중 토큰당 6개가 켜지는 희소 MoE이고, 파라미터 **7,632억 개**, 컨텍스트 **100만 토큰**이에요. 원본은 FP8 밀집 가중치와 FP4 라우팅 전문가로 배포됐어요.

### 구성

- GGUF 3종: **IQ1_M(1.75bpw)**, **IQ2_XXS(2.00bpw)**, **IQ2_XS(2.25bpw)**, 백본 크기 120.7~155.2GB예요. 비트 폭은 5,519억 백본 파라미터 기준 평균이에요.
- 공용 **Engram 파일**(110.6GB): 두 Engram 조회 테이블(1,966억 파라미터)을 IQ4_NL로 담았고, 모든 빌드에 같아서 한 번만 받으면 돼요. 토큰마다 한 행만 읽어서 디스크에 메모리 매핑해 둬도 된대요.
- 모든 빌드가 **12GB GPU 하나**에서 **Strata**로 돌아가요.

### 방법

- **GSQ(Gumbel-Softmax Quantization)**: 격자 배정과 그룹 스케일을 함께 학습하는 학습 후 스칼라 양자화로, 낮은 비트에서 스칼라와 벡터 양자화의 격차를 대부분 메운대요.
- **RCO(Riemannian Constrained Optimization)**: 제약별 튜닝 없이 정확한 비트 예산을 맞추며 텐서마다 양자화 타입을 배정해요. 밀집 경로(Q5_K~Q8_0)와 라우팅 전문가(IQ1_S~IQ3_S)에 따로 사다리를 둬요.
- 추론 강도(1~100 또는 low/high/max)까지 포함해 DeepSeek 프롬프트 인코더를 그대로 재현하는 채팅 템플릿이 들어 있어요.

### 결과 (추론 강도 50)

| 빌드 | AIME25 | GPQA-Diamond | LiveCodeBench v6 | 평균 유지율 |
|---|---|---|---|---|
| IQ1_M | 100.00 | 88.38 (원본 90.91) | 88.57 (원본 89.71) | 98.7% |
| IQ2_XXS | 100.00 | 90.91 | 89.71 | 100.0% |
| IQ2_XS | 추후 공개 | | | |

### 실행

llama.cpp는 아직 DeepSeek-V4.1을 지원하지 않아 GGUF가 거기서는 돌지 않아요. Strata는 원클릭 설치와 localhost의 OpenAI 호환 엔드포인트를 제공해요. 빌드마다 1,008개 텐서의 RCO 배정 전체를 저장소에 함께 실었대요.
