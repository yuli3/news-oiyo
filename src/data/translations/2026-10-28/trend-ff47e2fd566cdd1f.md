---
id: trend-ff47e2fd566cdd1f
title: "Three TLS Bugs in GoAhead"
sourceUrl: https://foxio.io/blog/choose-your-backend-three-tls-bugs-in-goahead
summary: "FoxIO가 수억 대 IoT·방화벽·OT 기기에 쓰이는 임베디드 웹 서버 GoAhead의 TLS 버그 3건을 공개했어요. OpenSSL 백엔드는 CRL을 읽고도 폐기 인증서를 받아들이고(CVSS 9.1), Mbed TLS는 오타로 DH 모듈러스가 1바이트로 줄어요. 6.1.1 이상으로 올리면 돼요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 요약

FoxIO의 Sébastien Féry가 2026년 10월 26일 **GoAhead**의 TLS 연동에서 서로 독립적인 버그 3건을 공개했어요. GoAhead는 Palo Alto Networks, Comcast, D-Link, HP, Canon, Honeywell, GE, Oracle, Siemens, Rockwell, Lockheed Martin, Boeing 등의 IoT·방화벽·OT·군용 기기 수억 대에 쓰이는 장치 관리용 임베디드 웹 서버예요. 영향은 기기에 빌드된 TLS 라이브러리와 검증 설정에 따라 달라요.

### 세 가지 버그

| 백엔드 | 심각도 | 내용 | 권고 |
|---|---|---|---|
| OpenSSL 호환 (GoAhead 3.4.5–6.1.0) | Critical, CVSS 9.1 | mTLS에서 CRL을 불러오지만 폐기 확인을 켜지 않아 **폐기된 클라이언트 인증서가 조용히 통과** (GOAHEAD-SA-2026-0006) | 6.1.1 이상으로 업그레이드 |
| LibreSSL 레거시 검증기 (3.2.x, 3.3.2–3.3.6) | High, CVSS 7.4 | 클라이언트 인증서 필수이지만 발급자 검사를 끈 경우(VERIFY_PEER=1, VERIFY_ISSUER=0) **깊이 제한을 넘는 체인을 허용** (GOAHEAD-SA-2026-0004) | VERIFY_ISSUER=1과 신뢰 CA 번들, 또는 OpenSSL·LibreSSL 4.x |
| Mbed TLS (4.0.2–6.1.0) | Medium, CVSS 5.9 | 버퍼 길이 오타로 **2048비트 DH 모듈러스가 1바이트**로 줄어, 깨진 파라미터를 받아들이는 클라이언트와의 TLS 1.2 DHE_RSA 세션이 복호화 가능 (GOAHEAD-SA-2026-0005) | 6.1.1 이상, 유한체 DHE 스위트 끄기, 또는 OpenSSL 백엔드 |

### 배경

- GoAhead는 기본인 OpenSSL과 MbedTLS 두 TLS 백엔드를 지원하고, OpenSSL 백엔드는 LibreSSL 같은 호환 라이브러리와도 동작해요.
- 설정 일부를 **컴파일 시점**에 정해요. `ME_GOAHEAD_SSL_VERIFY_PEER=1`은 클라이언트 인증서 요구, `SSL_AUTHORITY`는 신뢰 CA 번들, `SSL_VERIFY_ISSUER=1`은 발급자 신뢰 검증, `SSL_REVOKE`는 CRL 경로예요. OpenSSL 백엔드는 체인 깊이를 10으로 제한해요.
- OpenSSL 경로의 문제는 `sslOpen()`이 CRL을 인증서 저장소에 넣기만 하고 폐기 검사 플래그를 켜지 않는 데 있대요.

> 원문의 TL;DR, 표, 배경과 첫 번째 버그 도입부까지 옮겼어요. 코드 수준 분석은 다 옮기지 않았어요.
