---
id: trend-ddb7edd8a8cfc41d
title: "ranaroussi/yfinance"
sourceUrl: https://github.com/ranaroussi/yfinance
summary: 야후 파이낸스의 공개 API에서 시세와 금융 데이터를 파이썬으로 내려받는 오픈소스 라이브러리예요. 야후와 무관한 연구·교육용 도구이고, 데이터 사용 권리는 야후 이용약관을 따라야 한다고 강조해요. 투자 조언 도구가 아니에요.
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

GitHub 트렌딩에 오른 **yfinance** 저장소의 README를 우리말로 옮겼어요. 수집 시점 기준 별 약 2만5,700개, 포크 약 3,500개이고, 라이선스는 Apache-2.0이에요. 금융 데이터를 다루는 도구 소개일 뿐, 투자 권유가 아니에요.

### yfinance는 무엇인가요

**야후 파이낸스(Yahoo! Finance)에서 금융·시장 데이터를 파이썬답게 가져오는** 라이브러리예요.

### 꼭 알아둘 점

- yfinance는 **야후와 제휴하거나 야후의 승인·검증을 받은 도구가 아니에요.** 야후가 공개한 API를 쓰는 오픈소스 도구이고, **연구와 교육 목적**으로 만들어졌어요.
- 내려받은 데이터를 쓸 권리는 **야후 이용약관**을 확인하라고 해요.
- README는 **야후 파이낸스 API가 개인용으로만 쓰도록 되어 있다**는 점을 다시 한번 강조해요. 이 경고는 README 끝의 법적 고지에서도 반복돼요.

### 주요 구성 요소

- `Ticker`: 종목 하나의 데이터
- `Tickers`: 여러 종목의 데이터
- `download`: 여러 종목의 시장 데이터 내려받기
- `Market`: 시장 정보
- `WebSocket`, `AsyncWebSocket`: 실시간 스트리밍 데이터
- `Search`: 검색으로 시세와 뉴스 찾기
- `Sector`, `Industry`: 섹터와 업종 정보
- `EquityQuery`, `Screener`: 조건식을 만들어 종목 스크리닝

가격은 기본값으로 **배당을 반영해 조정**돼요(`auto_adjust=True`).

### 설치와 문서

`pip install yfinance`로 설치해요. 요청 대체 경로로 쓰는 curl_cffi 없이 설치하는 방법은 고급 설치 문서에 있어요. 새 문서 사이트(ranaroussi.github.io/yfinance)도 열렸어요. 버그 조사와 코드 기여는 커뮤니티에 기대고 있다고 해요.

### 참고

이 사이트의 시장 지표 수집기도 야후 응답이 막히면 다른 데이터 소스로 넘어가요. 오늘 수집에서도 야후가 429(요청 과다)를 돌려줬는데, 개인용·비공식 API에 기대는 도구는 이런 제한을 언제든 받을 수 있다는 점을 염두에 두면 좋아요.
