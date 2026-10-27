---
id: trend-3670c7cbc093fe58
title: "Ψ-0.6: Adaptive Streams of Thought in a Unified Vision-Language World Model [R]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xgwq9u/%CF%8806_adaptive_streams_of_thought_in_a_unified
summary: "Stanford NeuroAI Lab의 Ψ-0.6은 말뿐 아니라 깊이, 움직임, 카메라 자세, 상상한 장면을 오가며 추론하는 통합 비전-언어 월드 모델이에요. 어떤 표현으로 생각할지 RL로 배우고, MindCube·FlowBench에서 앞섰으며 시뮬레이션 학습이 실제 로봇으로 옮겨졌대요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> Reddit이 자동 수집을 막아 RSS에 실린 본문을 기준으로 옮겼어요. 논문은 읽지 않았어요.

### 문제의식

Chain-of-thought는 AI 추론을 바꿨지만 **말로만** 생각해요. 물리 세계에 해당하는 건 무엇일까요?

### Ψ-0.6

- 하나의 모델이 **'생각의 흐름(streams of thought)'**으로 추론해요. 흐름에는 말, 깊이, 움직임, 카메라 자세, 상상한 장면이 있어요.
- 상황마다 **어떤 표현으로 추론할지 스스로 배워요.** 이 선택은 강화학습(RL)으로 익혀요.
- 한 모델이 지각기, VLM, 월드 모델, 추론기, 정책 역할을 모두 해요.

### 작성자가 밝힌 결과

- 복잡한 공간 추론 벤치마크 **MindCube**(제로샷)에서 주요 공개 웨이트 모델을 넘어섰대요.
- 물체가 어떻게 움직일지 예측하는 **FlowBench**에서 다른 월드 모델보다 좋았대요.
- **시뮬레이션 방**에서 학습했는데 **실제 로봇 테이블 위 작업**으로 옮겨졌대요.

### 링크

X 스레드(영상 포함), arXiv 논문(2610.32177), 프로젝트 웹사이트(neuroailab.github.io), GitHub `neuroailab/psi-0.6` 코드가 공개돼 있어요.
