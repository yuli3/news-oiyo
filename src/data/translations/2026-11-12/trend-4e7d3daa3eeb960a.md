---
id: trend-4e7d3daa3eeb960a
title: "New Paper -&gt; Unless Told Otherwise, an Open Language Model Says OpenAI Made It"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xtpqxm/new_paper_unless_told_otherwise_an_open_language
summary: "심리학 연구자가 학습 데이터가 공개된 OLMo 3를 추적해, 시스템 프롬프트가 알려 주지 않으면 이 모델이 자기를 만든 곳을 OpenAI라고 답한다는 프리프린트를 공유했어요. 공개 전 77%가 OpenAI라고 답했고, 모델이 OpenAI를 말한다고 ChatGPT 답변으로 학습했다는 증거는 약하다고 결론 내렸어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

Reddit API 키가 없어(승인 전이라 넣지 않았어요) Wayback도 없어서 RSS 본문을 기준으로 옮겼어요. RSS에 초록 전체가 들어 있었고, 프리프린트 본문은 읽지 못했어요.

### 글쓴이 소개

AI가 취미인 심리학 연구자로, 로컬 하드웨어로 연구하고 함께할 사람을 찾으려고 r/LLMPsychology를 열었다고 해요. 연구 과정 상당 부분을 자동화했고 어떤 모델과 노력 수준을 썼는지 투명하게 밝히려 한다고 덧붙였어요. 재현이나 반박을 환영한대요.

### 초록 요약: *Factory Settings*

- 질문: 챗봇은 자기를 만든 회사를 어떻게 배우나요? 학습 데이터가 공개된 **OLMo 3**의 학습 과정을 추적하고, 모델에 가짜 정체성도 직접 가르쳐 봤어요.
- OLMo 3는 따로 알려 주지 않으면 **OpenAI가 만들었다**고 답해요. Ai2가 대화 학습을 하기 전 62%, 공개 버전은 **77%** 예요.
- 학습 대화에서 실제 이름은 약 40번만 나오고, 거의 매번 같은 대화의 시스템 프롬프트가 이미 "Olmo, Ai2 제작"이라고 알려 줘요. 공개 버전의 시스템 프롬프트에는 이름이 없어요.
- 가짜 이름을 예시 대화 24개로 가르쳤더니, 시스템 프롬프트 없이 가르치면 이후 92%가 새 이름을 댔지만, 예시마다 이름을 적은 시스템 프롬프트가 있으면 그 프롬프트를 빼는 순간 한 번도 대지 못했어요.
- 이름이 남아도 얕아요. 오슬로에서 만들었다고 가르쳐도 개발자가 달러로 월급을 받는다고 말해요.
- Claude나 GPT가 쓴 답으로 학습하면 Anthropic이라고 답하는 비율이 약 4분의 1로, 사람이 쓴 답(10분의 1)보다 높았어요.

### 결론

챗봇은 학습이 가르쳐야만 진짜 제작사를 말하고, 그렇지 않으면 대화 학습 전부터 있던 OpenAI라는 기본값(온라인 ChatGPT 대화에서 익혔을 가능성)으로 돌아가요. 사람이 쓴 대화로만 학습한 모델도 OpenAI를 비슷하게 말해서, "OpenAI가 만들었다"는 답은 ChatGPT 답변으로 학습했다는 **약한 증거**라고 봐요.
