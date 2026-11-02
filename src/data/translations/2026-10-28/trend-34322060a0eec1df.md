---
id: trend-34322060a0eec1df
title: "Ling-3.1-flash-1019 weights are out, and they released the base model too"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xgrr8n/ling31flash1019_weights_are_out_and_they_released
summary: "inclusionAI가 Ling-3.1-flash-1019 가중치와 함께 추가 학습용 베이스 모델(BF16)도 Hugging Face에 공개했어요. 총 560B·활성 25B, 1M 컨텍스트이고 AA Intelligence Index가 41에서 44로 올랐대요. SGLang 예시 경로가 아직 옛 모델을 가리킨다는 주의도 있어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> Reddit이 자동 수집을 막아 RSS에 실린 본문을 기준으로 옮겼어요. 원문 자체가 짧은 소식 글이에요.

### 소식

u/BerryBlush_Rogers691이 지난주 올린 예고 글에 이어 쓴 글이에요. "곧 공개"가 5일 만에 현실이 됐대요.

- **Ling-3.1-flash-1019** 가중치가 Hugging Face에 올라왔어요.
- 여전히 **총 560B, 활성 25B**, 컨텍스트 **1M**이에요.
- 릴리스 기준 **Artificial Analysis Intelligence Index v4.3.2 점수 44**(이전 41), **AutomationBench-AA 62% → 68%**예요.

### 베이스 모델도 공개

추가 학습용 **Ling-3.1-flash-base(BF16)**도 함께 내놨어요. 작성자는 완성된 채팅 모델이 아니라 자체 후학습의 출발점을 준다는 점에서 반겨요.

### 주의할 점

1019 README의 SGLang 예시가 아직 `inclusionAI/Ling-3.1-flash`를 가리켜요. 새 체크포인트를 쓰려면 모델 경로를 `inclusionAI/Ling-3.1-flash-1019`로 바꿔야 해요.
