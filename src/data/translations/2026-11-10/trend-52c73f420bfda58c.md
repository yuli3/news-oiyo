---
id: trend-52c73f420bfda58c
title: "Show HN: Flide, Jev 계열 의사결정 모델을 최대 9.5배 빠르게 실행"
sourceUrl: https://github.com/OmniJev/Flide
summary: "Flide는 Jev 계열 의사결정(decision) 모델용 추론 엔진이에요. 정확한 상태 분기(exact state forking)로 vLLM·SGLang보다 최대 9.5배 빠르면서 각 질문의 답은 단독으로 물었을 때와 같다고 해요. Jev /v1/systemone API를 제공해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

GitHub 저장소 `OmniJev/Flide` README의 소개와 뉴스 목록을 읽고 옮겼어요. 빠른 시작과 옵션 문서는 읽지 못해 `partial`이에요.

### 무엇인가요

Flide는 Jev 스타일 의사결정 모델을 빠르게 돌리는 추론 인프라예요. 의사결정 모델은 글을 쓰는 대신 정해진 선택지마다 확률을 돌려주는 모델이에요. Flide는 **exact state forking**으로 vLLM과 SGLang보다 최대 9.5배 빠르다고 주장해요. 여러 질문을 한꺼번에 처리해도 각 답은 모델이 그 질문만 받았을 때의 답과 같다는 게 핵심이에요. Jev의 `/v1/systemone` API를 그대로 제공해요.

### 최근 소식(README 기준)

- **11월 10일, 0.1.11**: 이메일 분류 데모를 추가했어요. H200 한 장에서 이메일 1만 통에 질문 8개씩 태그를 다는 데 28초가 걸렸다고 해요.
- **11월 9일, 0.1.10**: Ainvest-Decision, Darwin-27B-RSI-Decision, KnowLine-31B-Gen1.5를 추가했고 KnowLine 계열이 이미지를 읽게 됐어요.
- **11월 9일, 0.1.9**: pplx-decider-v1.1-27b와 JEV-35B를 추가했고, `/v1/systemone`이 한 요청 본문에 여러 요청을 받게 됐어요.
- **11월 2일**: 논문 "Flide: Accelerating Decision Inference with Exact State Forking"을 arXiv에 냈어요.
- 10월 24일 0.1.0 이후 거의 매일 새 모델 계열을 붙였고, `flide verify`로 내 모델과 요청에서 정확한 분기를 검사할 수 있어요. 질문 하나에 선택지는 256개까지 넣을 수 있어요.
