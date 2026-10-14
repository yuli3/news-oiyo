---
id: trend-2d7a11f1a100deea
title: "패스키는 함정이 아니다"
sourceUrl: "https://scotthelme.co.uk/passkeys-are-not-a-trap"
summary: "Scott Helme가 '패스키는 함정' 글을 반박해요. 일반 동기화 패스키는 사이트에 인증기 증명을 주지 않으므로, 그 이유만으로 비밀번호·TOTP로 돌아갈 필요는 없다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Scott Helme 블로그(2026-10-14)를 옮겼어요.

### 배경
"Passkeys are a trap. Do not use them." 글이 HN 등에서 돌며, 비기술 독자에게 패스키를 끄고 TOTP·비밀번호로 돌아가라고 권했어요. Helme에게 "이게 맞냐"는 질문이 많이 왔다고 해요.

### 핵심 반박
상대 글은 **attestation(인증기 증명)**을 "숨은 다이얼"로 부르며, 사이트가 승인된 OS·소프트웨어만 허용하게 조일 것이라고 주장해요. Helme는 **일반적으로 쓰는 동기화 패스키는 웹사이트에 attestation을 제공하지 않는다**고 해요. 따라서 attestation 공포만으로 패스키를 버릴 이유는 약하다고 봐요.

### WebAuthn attestation이란
인증기의 제조사·모델을 암호학적으로 확인하는 기능이에요. 엔터프라이즈·규제 맥락에서 쓰일 수는 있지만, 소비자용 동기화 패스키의 기본 동작과는 다르다는 구분이에요.

### 결론(저자)
패스키가 세션 이후의 모든 위험을 없애지는 않지만(후원 문구에도 "로그인 보호 ≠ 세션 보호"), "함정이니 쓰지 말라"는 프레임에는 동의하지 않아요.


### 독자 대상
원 비판 글이 비기술 독자에게 "패스키 끄라"고 한 만큼, Helme는 용어(attestation, 동기화 패스키, WebAuthn)를 구분해 공포를 걷어내요.

### 남는 리스크
패스키가 만능은 아니에요. 로그인 이후 세션 탈취·피싱은 별 계층이고, 엔터프라이즈에서 attestation을 켜는 정책도 존재할 수 있어요. 다만 "일반 사용자 동기화 패스키 = 함정"은 과장이라고 반박해요.
