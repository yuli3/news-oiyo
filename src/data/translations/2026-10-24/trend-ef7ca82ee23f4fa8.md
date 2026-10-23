---
id: trend-ef7ca82ee23f4fa8
title: "Gemma-4-26B-A4B with 39-69% less thinking at same accuracy"
sourceUrl: https://bottlecapai.com/post/thinkingcap-gemma-4-26b
summary: "BottleCap AI가 Google gemma-4-26B-A4B-it의 사고 토큰을 12개 벤치마크 평균 38.9%, 최대 69.1% 줄이면서 정확도는 0.15%p만 낮춘 ThinkingCap 모델을 공개했어요. 반복 루프도 3.6%에서 0.8%로 줄었대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> BottleCap AI 블로그 글의 앞부분(TL;DR, 학습 목표, 결과 표 일부)을 기준으로 옮겼어요. 표의 나머지 벤치마크와 글 후반부는 읽지 못했어요.

### 요약

ThinkingCap 시리즈의 다섯 번째 모델이에요. Google의 **gemma-4-26B-A4B-it**이 생각하는 양을 줄이되 답의 품질은 지키는 게 목표였어요.

- 사고 토큰 **최대 69.1%**, 12개 벤치마크 **평균 38.9%** 감소
- 정확도 변화는 **−0.15%p**로, 시리즈 중 가장 작은 손실이래요
- 반복(looping) 응답이 원본의 **3.6%에서 0.8%**로 줄었어요
- 샘플링 설정(thinking on, temperature 1.0, top_p 0.95)과 서빙 스택(vLLM)이 같아 그대로 바꿔 끼울 수 있어요

유료 PRO 판은 사고 토큰을 최대 87.6%, 평균 62% 줄인다고 홍보해요.

### 이전 모델들

지금까지 Qwen3.6-27B, Qwen3.8-27B, NVIDIA Nemotron-3.5-Lightning-30B-A3B, Qwen3.8-Flash-Next 네 모델에 적용했고, Google 모델은 이번이 처음이에요. gemma-4-26B-A4B는 총 26B 파라미터에 토큰당 약 4B가 활성화되는 희소 MoE예요.

### 학습 목표

답에 이르는 토큰을 줄이는 것 말고는 아무것도 바꾸지 않는 게 목표래요. 지식, 추론 능력, 답 품질, 지시 따르기, 안전 행동을 그대로 지키려 했어요.

### 결과 (과제군별)

| 과제군 | 정확도 변화 | 사고 토큰 감소 |
|---|---|---|
| 지시 따르기·에이전트 | +0.65%p | 17.2% |
| 수학 | +0.39%p | 36.1% |
| 코드 | −0.02%p | 27.6% |
| 지식·추론 | −0.51%p | 44.4% |
| 긴 컨텍스트·멀티모달 | −0.92%p | 54.4% |

개별 예로 AIME26은 정확도 86.20%→86.72%, 평균 사고 토큰 14,766→8,963(−39.3%)이고, GPQA Diamond는 79.92%→78.96%, 7,699→4,284(−44.4%)예요. MMLU-Pro는 사고 토큰이 49.1% 줄었어요.
