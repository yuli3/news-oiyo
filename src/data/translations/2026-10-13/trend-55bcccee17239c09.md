---
id: trend-55bcccee17239c09
title: "I built a tiny table that learns your local LLM's classification answers and serves the repeats in microseconds [D]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x3vkej/i_built_a_tiny_table_that_learns_your_local_llms"
summary: "로컬 LLM의 분류 답변을 기록해 약 1,000건 뒤 작은 테이블로 컴파일하고, 반복 질문은 CPU에서 마이크로초 단위로 답하는 프록시 shad0w 소개 글이에요. 보류 데이터에서 모델과 95% 이상 일치하는 경우에만 대신 답해요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요. 원문이 짧은 소개 글이에요.

r/MachineLearning [D] 글로, 프로젝트 페이지는 2796gaurav.github.io/shad0w예요.

### 해결하려는 문제
로컬 모델로 분류 작업을 해 봤다면 그 기다림을 알 거예요. 수백 번 답해 본 질문인데도 메시지마다 몇 초씩 걸려요.

### 어떻게 동작하나
**shad0w**는 OpenAI 호환 서버 앞에 붙는 프록시예요. Ollama는 바로 동작해요(`llm="ollama/llama3.1"` 또는 `shad0w proxy --upstream http://localhost:11434/v1`).
1. 모델의 답변을 기록해요.
2. 약 **1,000건**이 쌓이면 작은 테이블을 컴파일해요.
3. 이후 반복되는 질문은 이 테이블이 **CPU에서 마이크로초** 단위로 답해요.

단, 보류(held-out) 답변에서 모델과 **95% 이상 일치**하는 영역에서만 대신 답하고, 나머지는 여전히 모델로 보내요.

### 재미있는 부분
LLM이 둔 수를 보고 **Snake 게임**을 학습해, LLM은 못 따라가는 초당 10수로 계속 플레이해요(데모는 프로젝트의 arena 페이지).

라이선스는 Apache-2.0이고 Python/JS/C로 제공돼요. 작성자는 질문을 환영하며 어디서 깨지는지 알려 달라고 했어요.
