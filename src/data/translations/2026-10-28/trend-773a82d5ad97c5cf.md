---
id: trend-773a82d5ad97c5cf
title: "Introducing LFM3: Every Modality for Specialized Intelligence"
sourceUrl: https://www.liquid.ai/blog/lfm3
summary: "Liquid AI가 차세대 오픈 웨이트 모델군 LFM3를 공개했어요. 하나의 백본(LFM3-1.7B-Base)에서 텍스트·비전·오디오·옴니·결정 모델 6종(2B급)을 뽑았고, 22T 토큰 사전학습, 4비트 약 1GB, 256K 컨텍스트, GPU 한 장 파인튜닝이 특징이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 발표 요지

Liquid AI가 '특화 지능(specialized intelligence)'을 위한 차세대 Liquid Foundation Model **LFM3**를 발표했어요. 텍스트, 비전, 오디오, 옴니, 결정(decision) 모델을 **하나의 새 공유 백본**에 올렸고, 첫 릴리스는 2B 파라미터급이에요.

- 새 하이브리드 아키텍처와 **22T 토큰** 사전학습으로 LFM2보다 표현력이 크게 늘면서도 효율은 유지했대요.
- 베이스·후학습 모델 모두 **오픈 웨이트**로 Hugging Face, Playground, Liquid AI API에 올라왔어요.

### 하이라이트

- **파라미터당 성능**: 새 tri-hybrid 아키텍처로 LFM3-1.7B가 이전 LFM2.5-2.6B를 파라미터 35% 적게 쓰고도 앞선대요.
- **모든 모달리티, 하나의 백본**: LFM3-1.7B-Base에서 학습한 2B급 모델 6종
- **엣지용**: 텍스트 모델은 4비트에서 약 **1GB**
- 자체 개발한 새 비전·오디오 인코더
- 텍스트 모델 **256K 컨텍스트**
- 모든 모델을 **GPU 한 장으로 파인튜닝** 가능

### 아키텍처

LFM2는 짧은 합성곱과 어텐션의 하이브리드가 온디바이스에서 품질을 잃지 않고 빠를 수 있다는 걸 보였어요. LFM3에서는 하드웨어를 루프에 넣는 자동 아키텍처 탐색을 에이전트 용도(파라미터당 더 큰 역량, 긴 컨텍스트에서 빠른 추론)에 맞춰 다시 돌렸대요.

- 탐색 대상 하드웨어를 LFM2의 폰·노트북 CPU 두 종에서 **14개 기기·백엔드 조합**으로 넓혔어요. Galaxy S26 Ultra, OnePlus 15, Raspberry Pi 5, Apple M4 Max, AMD Ryzen AI, Arm·x86 클라우드 CPU, GPU, Qualcomm Hexagon NPU가 포함돼요.
- 게이트 짧은 합성곱이 여전히 레이어의 절반 이상이에요. 일부를 다른 블록으로 바꿔 본 결과 **슬라이딩 윈도 어텐션(SWA)**이 품질과 속도의 균형이 가장 좋았대요.
- 그래서 LFM3는 **게이트 짧은 합성곱, SWA, 전역 어텐션** 세 연산을 섞어요.
- 파라미터당 짧은 프롬프트에선 LFM2-1.2B와 비슷하고, 컨텍스트 8K 토큰에선 약 25% 빠르대요.

> 원문 앞부분(하이라이트와 아키텍처 도입)을 기준으로 옮겼어요. 레이어 구성 상세와 벤치마크 표는 다 읽지 않았어요.
