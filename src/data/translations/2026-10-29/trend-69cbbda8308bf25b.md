---
id: trend-69cbbda8308bf25b
title: "이 브라우저 지문 수집 스크립트는 왜 생물무기를 만들고 있을까?"
sourceUrl: https://nullpt.rs/fingerprinting-bioweapons
summary: "웹사이트 1만 곳의 브라우저 지문 수집 캔버스를 모으던 개발자가 생물무기·자해를 연상시키는 이름이 담긴 안티봇 스크립트를 발견했어요. 위험한 기능을 실제로 만든다기보다 LLM 안전장치를 자극해 난독화 해제를 막으려는 기법으로 보여요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

### 출발점

글쓴이 veritas는 FingerprintJS나 Cloudflare Turnstile, Akamai 같은 안티봇의 브라우저 지문 수집 스크립트를 역분석하는 걸 좋아했어요. 그 밖에 어떤 스크립트가 있는지 궁금해서 웹을 크롤링하며 지문 수집 관련 브라우저 API 호출을 가로채 지도로 만들어 보기로 했어요.

### 방법

- Tranco 상위 사이트 목록을 Playwright로 크롤링했어요.
- 캔버스 `toDataURL` 호출과 `navigator.webdriver` 같은 속성을 후킹해 평범한 캔버스를 걸러 냈어요.
- 캔버스 지문은 HTML 캔버스에 글자나 도형을 그리고 픽셀을 뽑아, 브라우저·OS·그래픽 드라이버·하드웨어마다 다른 렌더링 차이로 환경을 구별하는 방식이에요.

### 결과

1만 개 사이트를 돌자 다양한 캔버스가 모였고, 글쓴이는 이를 **fingerprint.garden**에 모았어요. 1,033개 캔버스를 업체별로 묶은 콜라주도 만들었어요. FingerprintJS, Castle 같은 익숙한 것도 있었지만 모르는 것도 많았어요.

그중 Tame Impala 앨범 'Currents' 표지를 닮은 캔버스가 눈에 띄어 어떤 스크립트인지 추적했어요. 큐레이터 요약에 따르면 그 안티봇 스크립트에는 생물무기와 자해를 연상시키는 함수명과 문자열이 들어 있었고, LLM의 안전장치를 건드려 AI로 난독화를 푸는 걸 막으려는 기법으로 보여요.

> 원문 앞부분과 큐레이터 요약을 함께 참고했어요. 스크립트 분석 본문은 읽지 못했어요.
