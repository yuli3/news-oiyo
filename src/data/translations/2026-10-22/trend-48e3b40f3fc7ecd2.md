---
id: trend-48e3b40f3fc7ecd2
title: "Inference time abliteration"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xc1e9y/inference_time_abliteration
summary: "AbliteratedOutTheBox는 불러오는 모델을 추론 시점에 바로 abliteration(거부 방향 제거)하는 llama.cpp 포크예요. 파인튜닝이나 별도 파일, 추가 VRAM 없이 동작한다고 소개돼요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 429) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글은 읽지 못했어요. 링크된 GitHub 저장소는 따로 읽지 않았어요.

### 글 내용

작성자 u/AccountAntique9327이 **AbliteratedOutTheBox**를 소개했어요.

- **llama.cpp 포크**예요.
- 불러오는 **어떤 모델이든 추론 시점(live)에 abliterate**해요.
- **파인튜닝도, 추가 파일도 필요 없어요.**
- abliteration을 위한 번거로운 작업을 없애고, **VRAM도 더 쓰지 않는다**고 해요.
- 저장소: github.com/heterodoxin/AbliteratedOutTheBox

### 용어 설명

abliteration은 모델 내부 활성에서 "거부(refusal)"에 해당하는 방향을 찾아 지워, 안전 거부를 줄이는 기법이에요. 보통은 가중치를 수정한 새 모델 파일을 만드는데, 이 포크는 그 과정을 실행 중에 처리한다는 점이 차이예요. 안전장치를 끄는 도구라 쓰임새와 책임에 주의가 필요해요.
