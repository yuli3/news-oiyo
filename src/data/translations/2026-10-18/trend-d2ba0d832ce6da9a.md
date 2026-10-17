---
id: trend-d2ba0d832ce6da9a
title: "[Research] 2,788 tokens/s on a single RTX 5090 with a diffusion LLM — Introducing ORL (fully open source) [R]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x7qgr0/research_2788_tokenss_on_a_single_rtx_5090_with_a"
summary: "확산 언어 모델(dLLM)을 품질 손실 없이 빠르게 하는 ORL(On-Policy Residual Learning)과 전용 엔진 dlmrt를 오픈소스로 공개했다는 연구 소개예요. RTX 5090 한 장에서 LLaDA-2.1-mini로 단일 요청 초당 2,788토큰을 냈고, QwenDLM-4B는 처리량이 약 6.9배 올랐다고 해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Reddit은 API 키 없이 본문을 직접 읽을 수 없어 RSS 발췌로 옮겼어요. 발췌가 약 4,000자에서 잘려 링크 목록 일부는 못 봤고, arXiv 논문(2610.20687)도 따로 읽지 않았어요. 수치는 모두 저자들의 발표예요.

### 핵심 결과
| 설정 | 결과 |
|---|---|
| RTX 5090 1장, LLaDA-2.1-mini + ORL, NVFP4 | 초당 2,788토큰 |
| B200 8장, DiffusionGemma 26B MoE + ORL, NVFP4 | 초당 7,708토큰 |
| QwenDLM-4B | 종단 처리량 최대 6.9배, 품질은 같거나 더 좋음 |
| H100 단일 요청, 같은 정확도 | DFlash 투기적 디코딩보다 1.74배 빠름 |

모두 **배치 1 단일 요청** 디코딩이고, 특정 벤치마크에서의 최고값이지 평균이 아니라고 밝혔어요.

### 아이디어
확산 LLM은 토큰을 하나씩이 아니라 여러 개를 병렬로 다듬어 확정할 수 있지만, 적은 forward 패스로 수렴시키기가 어려워요.
1. **온폴리시 잔차 학습**: 매 디노이징 단계에서 처음부터 예측하지 않고, 이전 예측을 잔차 맥락으로 이어 받아 다듬어요. 잔차는 모델이 스스로 만들고 학습 중 분포가 바뀌기 때문에, 오래된 오프라인 잔차 대신 현재 모델이 만든 새 궤적으로 학습해 추론 때와 같은 상태를 재현해요.
2. **Adjacent Entropy Contraction**: 각 단계가 이전 단계보다 불확실성을 줄이도록 유도하는 손실이에요. 이미 확신하는 예측은 건드리지 않게 게이트를 걸어요.

### 모델별 결과
- **QwenDLM-4B**(Qwen3-4B에서 변환): forward당 토큰 최대 6.2배, HumanEval pass@1 82.9% → 89.6%
- **LLaDA-2.1-mini**: 자체 생성 학습 토큰 420만 개, H100 36 GPU시간 후학습으로 처리량 최대 3배
- **DiffusionGemma 26B MoE**: forward당 토큰 최대 1.2배
- H100에서 QwenDLM-4B + ORL은 초당 1,298토큰으로 DFlash 746, EAGLE3 405보다 빨랐어요. 다만 ORL은 dlmrt, 비교 대상은 vLLM을 쓴 시스템 간 비교예요.

### dlmrt 엔진
디노이징 루프 전체를 CUDA 그래프로 잡아 GPU에서 실행해 CPU 동기화를 없앴고, RTX 5090을 포함한 Blackwell에서 NVFP4를 지원해요. 같은 조건에서 SGLang·vLLM보다 1.2~1.6배 빠르고, 학습 단계도 최대 5.2배 빨라졌다고 해요. 모델, 학습 코드, 평가, 엔진을 모두 공개했어요.
