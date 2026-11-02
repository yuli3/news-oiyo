---
id: trend-04627b08ff1ad2b7
title: "langchain-ai/langchain"
sourceUrl: https://github.com/langchain-ai/langchain
summary: "LangChain은 에이전트와 LLM 앱을 만드는 프레임워크로, 스스로를 '에이전트 엔지니어링 플랫폼'이라 불러요. 모델·임베딩·벡터스토어를 표준 인터페이스로 묶고, Deep Agents·LangGraph·LangSmith 같은 생태계와 이어져요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> GitHub 트렌딩에 오른 저장소예요. README 앞부분을 기준으로 옮겼어요.

### 무엇인가

**LangChain**은 **에이전트와 LLM 기반 앱을 만드는 프레임워크**예요. 저장소 설명은 "에이전트 엔지니어링 플랫폼"이에요. 서로 맞물리는 컴포넌트와 서드파티 통합을 엮어 AI 앱 개발을 쉽게 하고, 밑바탕 기술이 바뀌어도 설계 결정이 덜 흔들리게 해 준대요.

### 빠른 시작

```
uv add langchain
```

README 예시는 `init_chat_model("openai:gpt-5.5")`로 모델을 만들고 `invoke("Hello, world!")`를 부르는 몇 줄짜리 코드예요. JS/TS용은 LangChain.js가 따로 있어요.

### 생태계

| 이름 | 역할 |
|---|---|
| Deep Agents | 계획, 서브에이전트, 파일시스템 사용이 내장된 상위 패키지(처음이라면 여기부터 권해요) |
| LangGraph | 제어 가능한 에이전트 워크플로를 위한 저수준 오케스트레이션 |
| Integrations | 채팅·임베딩 모델, 도구·툴킷 |
| LangSmith | 에이전트 평가, 관측, 디버깅 |
| LangSmith Deployment | 오래 도는 상태 저장 워크플로용 배포·확장 플랫폼 |

### 왜 쓰나

- **실시간 데이터 보강**: 모델 제공자, 도구, 벡터스토어, 리트리버 통합 라이브러리로 다양한 데이터 소스에 연결해요.
- **모델 상호운용성**: 실험하면서 모델을 쉽게 갈아 끼울 수 있어요.
- **빠른 프로토타이핑**: 모듈형 구조라 처음부터 다시 만들지 않고 여러 방식을 시험할 수 있어요.

이어지는 "프로덕션 기능" 이후 내용은 다 읽지 못했어요.
