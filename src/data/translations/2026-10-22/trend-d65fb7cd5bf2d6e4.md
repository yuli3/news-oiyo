---
id: trend-d65fb7cd5bf2d6e4
title: "Real question for people running open models on a Macbook: Qwen3.8-Flash-Next, Qwen 35B, dense 27B ? Or maybe Nemotron Bolt?"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xcbzbh/real_question_for_people_running_open_models_on_a
summary: "r/LocalLLaMA 사용자가 맥북에서 Qwen3.8-Flash-Next, Qwen 35B, 27B 중 무엇을 주로 쓰는지 묻고, Apple Silicon용 오픈소스(Apache 2.0) 추론 프로젝트 kapitsa의 최적화 우선순위를 정하려 해요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 429) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글은 읽지 못했어요.

### 질문 내용

작성자 u/DotaMate는 맥북에서 오픈 모델을 돌리는 사람들에게 묻는 글을 올렸어요.

- 본인은 코딩할 때 자꾸 **Qwen 27B**로 돌아온대요. 자기만 그런지 궁금하대요.
- 로컬 추론에서 가장 인기 있는 모델이 뭔지 알고 싶어 해요. 후보는 제목대로 **Qwen3.8-Flash-Next, Qwen 35B, 27B** 등이에요.

### 이유: kapitsa 프로젝트

작성자는 Apache 2.0 오픈소스 프로젝트 **kapitsa**(github.com/nace-ai/kapitsa)를 만들고 있어요.

- Apple Silicon에서 어떤 모델부터 최적화할지 정하려고 질문한 거예요.
- **M1부터 M5 Ultra까지 모든 M 칩**에서 동작한대요.
- 자신의 M4 Pro 장비에서 Qwen 35B/27B의 **디코드와 프리필 속도로 최고 기록(SOTA)**을 냈다고 주장해요.
