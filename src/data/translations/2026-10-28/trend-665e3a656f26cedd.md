---
id: trend-665e3a656f26cedd
title: "Nietzschian Debugger - 답 대신 질문으로 스스로 버그 원인을 찾게 하는 디버거"
sourceUrl: https://github.com/DilawarShafiq/nietzschian-debugger
summary: "Nietzschian Debugger는 버그를 고쳐 주지 않고 질문을 되돌려 주는 디버거예요. 가정에 도전하고, 피하던 증거를 마주하게 하고, 가장 자신 있던 가정을 공격해 스스로 원인을 찾게 해요. Claude 위에서 돌고 pip로 설치해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 콘셉트

> 네 코드를 죽이지 못하는 것은 코드를 더 강하게 만든다.

README는 "버그를 고쳐 주진 않아요. 당신을 고쳐 줘요"라고 소개해요. 다른 도구는 답을 주지만 이 도구는 **질문을 돌려줘요.** 버그를 붙여 넣으면 이렇게 해요.

- 무슨 일이 일어나는지에 대한 **가정에 도전**해요.
- 피하고 있던 **증거를 마주하게** 해요.
- 더 이상 의심하지 않던, **가장 자신 있는 가정을 공격**해요.
- 결국 **스스로 수정에 이르도록** 이끌어요. AI의 깨달음이 아니라 당신의 깨달음이요.

### 왜 만들었나

작성자는 AI가 개발자를 약하게 만든다고 봐요. ChatGPT에서 복사·붙여넣기하고 배포하고 반복하다 보니 자기 코드를 아무도 이해하지 못한다는 거예요. 이 도구는 지름길이 아니라 **분투를 통해** 더 강한 개발자를 만들겠다고 해요.

반AI가 아니라 일부러 **Claude 위에서** 돌아요. 반대하는 건 '생각을 외주 주는 것'이래요. 다른 도구는 모델로 답을 건네지만, 이 도구는 모델로 질문을 돌려줘요.

### 설치와 사용

```bash
pip install nietzschian-debugger
nietzschian debug "your bug"
nietzschian demo   # API 키 없이 시연
```

- Python 3.10 이상이 필요해요.
- Anthropic API 키(BYOK)를 쓰거나, OpenAI·Gemini·DeepSeek 등 다른 모델, 또는 키가 필요 없는 로컬 Ollama 모델을 쓸 수 있어요.
- 예전 `npx nietzschian-debugger`는 재작성 이전 빌드라 더 이상 쓰지 않고 pip 패키지로 바뀌었어요.
- `nietzschian`만 실행하면 기본은 적응형 세션이고, 사용자의 상태를 읽어 관점을 바꾼대요.

> README 앞부분(콘셉트, 설치, 빠른 시작)을 기준으로 옮겼어요. 모드별 상세는 다 읽지 않았어요.
