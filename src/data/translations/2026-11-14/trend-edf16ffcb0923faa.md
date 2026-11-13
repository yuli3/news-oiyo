---
id: trend-edf16ffcb0923faa
title: "Brave Search API, x402 프로토콜을 통한 에이전트 결제 지원"
sourceUrl: https://brave.com/blog/search-api-agentic-payments
summary: "Brave Search API가 오픈 결제 프로토콜 x402를 지원해, AI 에이전트가 API 키나 계정 없이 요청마다 Base 체인의 USDC로 건당 0.005달러를 내고 검색할 수 있게 됐다는 Brave 공식 블로그 발표예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-14
---

Brave 공식 블로그 글을 읽고 옮겼어요. 블로그 아래 다른 글 소개와 설치 안내는 옮기지 않았어요.

### 무엇이 바뀌었나

웹 데이터로 앱을 만드는 개발자 도구 **Brave Search API**가 오픈 결제 프로토콜 **x402**를 통한 즉시·종량제 '에이전트 결제'를 지원해요. 에이전트 검색이 필요한 개발자와 자율 AI 에이전트가 Brave의 독립 검색 인덱스를 프로그램으로 조회하고, 응답을 그라운딩하고, 요청마다 실시간으로 결제할 수 있어요. 기존의 **API 키 관리가 필요 없어져요**.

### 어떻게 동작하나

- Brave가 직접 **Base 블록체인의 USDC**를 받는 facilitator를 운영해요. 다른 네트워크와 스테이블코인도 곧 지원할 예정이에요.
- 계정을 만들거나 요금제를 고를 필요 없이, 에이전트 지갑에 Base 네트워크로 USDC를 넣으면 바로 쓸 수 있어요.
- x402 뒤의 엔드포인트는 인증 대신 **요청마다 결제**를 요구해요. 결제 없이 보내면 **HTTP 402 Payment Required**와 함께 가격과 결제 정보가 와요.
- 에이전트가 그 금액의 USDC 결제에 서명해 첨부하고 다시 요청하면, 검증 후 검색 결과와 Base 체인 거래 영수증이 함께 와요.

### 가격

- 에이전트용 검색 컨텍스트 API **LLM Context**: 건당 0.005달러(1,000건당 5달러)
- 웹(사람용 검색), 뉴스, 이미지, 동영상, 로컬 엔드포인트도 같은 가격이에요.
- Base 체인 가스비는 한시적으로 Brave가 부담해요.

가장 쉬운 방법은 Stripe가 만든 에이전트용 CLI 지갑 **Purl Wallet**을 설치하고 Base 네이티브 USDC를 충전하는 거라고 해요. 자세한 내용은 Brave Search x402 프록시 문서에 있어요.
