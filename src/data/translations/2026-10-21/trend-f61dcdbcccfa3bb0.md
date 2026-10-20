---
id: trend-f61dcdbcccfa3bb0
title: "Launch HN: Respan (YC W24) – Open-source Rust AI gateway built around plugins"
sourceUrl: "https://news.ycombinator.com/item?id=50167583"
summary: "Respan이 모든 기능을 플러그인으로 만드는 오픈소스 Rust AI 게이트웨이를 Launch HN으로 소개했어요. LiteLLM 위에 10만 줄 넘게 쌓은 래퍼를 버리고, Nginx처럼 이벤트만 나누는 작은 코어로 다시 설계했어요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

Hacker News가 요청을 막아(419) 글 페이지와 댓글은 읽지 못했어요. 수집 때 받은 Launch HN 본문(앞 4,000자)을 기준으로 옮겼어요.

### 무엇인가
Respan의 Andy가 소개한 **오픈소스 Rust AI 게이트웨이**예요. 공급자(OpenAI, Anthropic, Gemini), 프로토콜(채팅, 실시간 음성, MCP), 모달리티(이미지, 영상), 게이트웨이 기능(폴백, PII 가림, 스마트 라우팅)까지 **전부 플러그인**이에요. 큰 패키지 대신 작은 코어와 공개 인터페이스를 주고, 팀이 필요한 인프라를 조립하게 해요.

### 왜 다시 만들었나
2024년부터 LiteLLM 기반 게이트웨이로 수천 개 조직에 서비스해 왔어요. 조직마다 API 키 설정, 라우트, 한도가 달라 LiteLLM을 계속 감쌌고, 래퍼 코드가 한때 **10만 줄**을 넘었어요. 올해 1월 일상적인 LiteLLM 업그레이드 뒤 간헐적 연결 오류가 나서 되돌렸고, 원인은 아직 모른다고 해요. 그 뒤로는 직접 업그레이드하지 않고 업스트림 수정을 손으로 옮겨 왔는데, 이게 오래갈 방법이 아니라고 판단했어요.

### 설계
- Nginx에서 영감을 받아 코어는 **이벤트 분배만** 맡아요.
- 공급자 하나가 짧은 파일이에요. Mistral은 22줄이고, Groq이 토큰 사용량을 별도 필드에 두는 것 같은 특이점도 각각 플러그인과 테스트가 있어요.
- OpenAI SDK로 Claude·Gemini를 부르는 것 말고도 도구, 이미지, 추론 프로토콜을 자동으로 다뤄요. OpenAI Realtime API 앱이 게이트웨이를 거쳐 Gemini Live를 쓸 수도 있지만 모든 기능이 옮겨지지는 않아요.
- 클라이언트와 공급자가 같은 형식이고 플러그인이 내용을 바꾸지 않으면 원본 바이트를 그대로 통과시키고, 다르면 공통 타입으로 번역해요.
