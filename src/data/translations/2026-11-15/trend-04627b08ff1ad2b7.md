---
id: trend-04627b08ff1ad2b7
title: "langchain-ai/langchain"
sourceUrl: https://github.com/langchain-ai/langchain
summary: "LangChain은 에이전트와 LLM 앱을 만드는 프레임워크로, 이제 스스로를 '에이전트 엔지니어링 플랫폼'이라고 소개해요. 모델·임베딩·벡터 스토어를 표준 인터페이스로 묶고, Deep Agents·LangGraph·LangSmith로 생태계를 넓혀요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

GitHub 저장소 README를 읽고 정리했어요.

### 한 줄 소개

저장소 설명은 **"에이전트 엔지니어링 플랫폼"** 이에요. LangChain은 에이전트와 LLM 기반 애플리케이션을 만드는 프레임워크로, 서로 호환되는 구성 요소와 서드파티 연동을 엮어 AI 앱 개발을 단순하게 만들고, 기반 기술이 바뀌어도 설계 결정이 오래가도록 돕는다고 해요.

### 빠른 시작

`uv add langchain`으로 설치하고, `init_chat_model("openai:gpt-5.5")`처럼 모델을 지정해 바로 호출할 수 있어요. 처음이라면 계획, 서브에이전트, 파일 시스템 사용 같은 기능이 들어간 상위 패키지 **Deep Agents**를 먼저 보라고 권해요. 더 세밀한 에이전트 오케스트레이션은 **LangGraph**로 하면 돼요.

### 생태계

- **Deep Agents**: 계획하고 서브에이전트를 쓰며 파일 시스템을 활용하는 에이전트
- **LangGraph**: 복잡한 작업을 안정적으로 처리하는 저수준 에이전트 오케스트레이션 프레임워크
- **Integrations**: 채팅·임베딩 모델, 도구와 툴킷
- **LangSmith**: 에이전트 평가, 관측, 디버깅
- **LangSmith Deployment**: 오래 돌고 상태를 가진 워크플로를 배포·확장하는 플랫폼

### 왜 쓰나요 (README 주장)

- **실시간 데이터 보강**: 모델 제공자, 도구, 벡터 스토어, 리트리버 등 방대한 연동으로 LLM을 데이터와 시스템에 연결해요.
- **모델 상호 운용성**: 실험하면서 모델을 쉽게 바꿀 수 있어요.
- **빠른 프로토타이핑**: 모듈형 구성으로 처음부터 다시 만들지 않고 반복할 수 있어요.
- **운영 기능**: LangSmith 연동으로 모니터링, 평가, 디버깅을 지원해요.
- **유연한 추상화**: 고수준 체인부터 저수준 구성 요소까지 필요한 수준을 고를 수 있어요.

문서, API 레퍼런스, 커뮤니티 포럼, 무료 강의인 LangChain Academy, 기여 가이드도 안내해요.
