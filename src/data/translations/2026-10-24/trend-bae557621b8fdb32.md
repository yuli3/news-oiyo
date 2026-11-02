---
id: trend-bae557621b8fdb32
title: "Kimi K3.1 Pro and K3.1 Pro Highspeed"
sourceUrl: https://www.kimi.ai/blog/kimi-k3-1-pro
summary: "Moonshot AI가 1M 토큰 컨텍스트의 3T급 오픈 웨이트 모델 Kimi K3.1 Pro와 2~3배 빠른 Highspeed 판을 공개했어요. Terminal-Bench 4.0에서 65.7%를 기록했고 전체 가중치는 11월 4일까지 공개한대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> Kimi 기술 블로그 앞부분(소개, 성능, 코딩, 3D 모델링 도입부)을 기준으로 옮겼어요. 뒤쪽 벤치마크 표와 나머지 사례는 읽지 못했어요.

### 무엇이 나왔나요

Kimi는 새 K3.1 시리즈의 첫 모델 **Kimi K3.1 Pro**를 소개했어요. 지금까지 낸 것 중 가장 강한 **3T급 오픈 웨이트 모델**이고, 컨텍스트 창은 **100만 토큰**이에요. 코딩, 3D 제작, 금융 리서치 같은 에이전트 작업에서 크게 좋아졌다고 해요.

함께 나온 **Kimi K3.1 Pro Highspeed**는 K3.1 Pro보다 **2~3배 빠른** 판이에요. 두 모델 모두 오늘부터 Kimi.ai, Kimi Work, Kimi Code, Kimi API에서 쓸 수 있고, **전체 가중치는 11월 4일까지** 공개한대요.

### 어떻게 만들었나요

K3.1 Pro는 Kimi K3를 훨씬 큰 후학습 연산으로 다시 학습한 모델이에요. 수백 개 도메인에 걸친 대규모 공동 RL을 돌리려고 RL 프레임워크, 긴 컨텍스트 추론, 학습 효율, 샌드박스 인프라, 롤아웃 스케줄링, 환경 품질 검사 플랫폼까지 스택 전체를 손봤대요. 그래서 RL 연산을 늘릴 때마다 안정적이고 예측 가능한 향상이 나왔다고 해요.

### 벤치마크

- **Terminal-Bench 4.0**: 65.7%로 GPT-6 Astra(58.2%)보다 높고 Claude Opus 5.5(66.4%)보다 살짝 낮아요.
- **Kimi Code Bench 3.0 Long-horizon**(사내 벤치마크): 61.2%로 K3의 55.95%보다 올랐어요.

### 코딩 사례

Unity, Unreal Engine, Godot 같은 게임 엔진을 웹 검색·3D 생성과 엮어 완성된 경험을 만든다고 해요. 사내 테스트에서는 뼈 296개, 근육 402개로 이뤄진 오픈소스 인체 모델 human-atlas 위에 보행 시뮬레이터를 만들었어요. 167번의 미션과 420번의 독립 검토를 거쳐, 몇 초 만에 쓰러지던 시뮬레이션 인간이 **11.2초 동안** 번갈아 걸음을 내딛게 됐대요. 보상 설계로 팔 움직임이 안 나아지자 시뮬레이터를 직접 탐색해 어깨 근육 모멘트 암 계산 오류 **36개**를 찾아 고친 뒤 다시 학습했다고 해요.
