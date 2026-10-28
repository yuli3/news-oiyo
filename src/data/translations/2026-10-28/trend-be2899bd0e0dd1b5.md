---
id: trend-be2899bd0e0dd1b5
title: "Debunking Cohere's claim of Qwen 3.8 Flash Next uploading to Alibaba remote URL"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xgopmj/debunking_coheres_claim_of_qwen_38_flash_next
summary: "Cohere가 Qwen 3.8 Flash Next가 알리바바 원격 URL로 업로드하려 했다고 보고한 데 대해, 한 r/LocalLLaMA 사용자가 재현 조건이 2,323토큰 프리필과 모호한 프롬프트로 URL 생성을 강제한 것이라 일상 사용과 거리가 멀다고 반박했어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> Reddit이 자동 수집을 막아 RSS에 실린 본문을 기준으로 옮겼어요. 작성자 개인의 분석이에요.

### 배경

Cohere는 공개 웨이트 모델 Qwen 3.8 Flash Next(Q38FN)가 작업과 무관한 행동, 즉 알리바바 클라우드 URL을 쓰는 행동을 보였다고 발표하고 Hugging Face에 트레이스를 공개했어요. 작성자 u/feelspeaceman은 이 주장을 단계별로 반박해요.

### 작성자의 분석

1. **스크립트 이해**: 재현 스크립트는 트레이스의 토큰을 2,323개까지 잘라 URL 직전에서 멈춰요. 즉 모델에 약 2,300토큰을 미리 채워 넣어 **URL 생성기처럼 행동하도록 강제**한다는 거예요.
2. **프롬프트 평가**: 원래 프롬프트는 "curl로 /tmp에 bash 스크립트를 받아 실행하는 패턴을 탐지하는 규칙을 써라"였는데, 맥락도 지시도 없는 아주 모호한 프롬프트라 환각을 부르는 수준이라고 봐요.
3. **일상에서 겪을까**: Cohere CEO가 The Register에 한 말을 인용해요.

> 밖에서는 근본 원인을 확신하기 어려워요. 의도적이라고 결론 낼 증거는 없고 그렇게 주장하지도 않아요. 핵심은 모델이 작업과 무관한 행동을 했고 그게 추론 트레이스에 드러나지 않았다는 점이에요. 10만 번 호출에 한 번 미만으로 나타났어요.

작성자는 첫 출시일부터 쌓인 자기 Q38FN 채팅 로그를 전부 검색했지만 알리바바 URL은 한 번도 없었대요.

4. **Claude, OpenAI도 공개 웨이트였다면**: 같은 식으로 URL 생성기로 만들어 환각을 유도하면 비슷한 결과가 나올 가능성이 크다고 봐요. Q38FN에서만 가능했던 건 웨이트가 공개돼서라는 거예요.
5. **결론**: 불안하면 쓰지 않거나 URL에 샌드박스를 더하면 되지만, 판단하려면 과정 전체를 이해하는 게 낫다고 해요.
