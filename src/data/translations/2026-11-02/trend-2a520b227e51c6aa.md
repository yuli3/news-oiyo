---
id: trend-2a520b227e51c6aa
title: "Are bespoke inference engines overhyped? My Strata experience on 2× R9700"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xl0oqz/are_bespoke_inference_engines_overhyped_my_strata
summary: "2× R9700(64GB)에서 Qwen 3.8 Flash-Next를 Strata 엔진으로 돌려 본 사용자가, 이론상 더 빠르지만 3비트로만 안정적이었고 HumanEval+ 점수와 토큰 효율이 llama.cpp의 Qwen3.8-27B Q8보다 못했다며 전용 엔진이 과대평가된 것 아니냐고 물어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

Reddit이 API 키 없이 막혀 있어 r/LocalLLaMA RSS 본문을 기준으로 옮겼어요. 수치는 작성자 측정이에요.

### 목표

작성자는 **qwen 3.8 27b Q8 MTP**와 최소 같은 수준이면서 컨텍스트가 더 긴(이상적으로 1M) 구성을 찾았대요. 이미 llama.cpp로 Next Flash Q2를 돌리고 있었는데 대화에는 좋지만 코딩엔 부족했고, Q4는 돌아가지만 너무 느렸어요. 이 게시판에서 Strata가 qwen next flash로 성능이 좋다는 글을 많이 보고 써 봤어요.

### 결과: 실망

- 두 카드에 전문가를 RAM으로 내리면 **긴 작업마다 멈췄대요.** 어떤 설정도 소용없었고, **모든 전문가가 VRAM에 들어갈 때만** 안정적이었어요. 64GB에선 3비트 양자화가 한계였어요.
- 서류상으론 llama.cpp 대비 약 **60 t/s**로 더 빨라요.
- 하지만 **HumanEval+**에서 3비트 Flash-Next는 **93.9%**, 일반 llama.cpp의 Qwen3.8-27B Q8은 **95.1%**였고, Flash-Next는 거기까지 가는 데 **토큰이 거의 두 배** 들었대요.

그래서 성숙한 스택 대비 실사용 이득이 없었다고 해요. 안정적인 엔진 하나 대신 **단일 모델 전용 엔진, 그 포크들, 특수 양자화, 환경변수 우회책 더미**를 얻었다는 거예요.

### 질문

이게 Strata가 아직 어려서인지, 구조적인 문제인지 물어요. llama.cpp나 vLLM 대신 모델 전용 엔진으로 **오래가는 실사용 이득**을 본 사람이 있는지도요.
