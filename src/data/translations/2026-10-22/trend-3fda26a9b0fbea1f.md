---
id: trend-3fda26a9b0fbea1f
title: "Cloudflare links vulnerability discovery to defense with OpenAI"
sourceUrl: https://openai.com/index/cloudflare-cyber
summary: "Cloudflare가 OpenAI Daybreak 모델에 실시간 트래픽·보안 신호를 결합해 고객 코드의 취약점을 조사하고 수정안을 제안하는 조기 접근 서비스를 운영해요. Codex로는 제품 하나를 3일, 토큰 비용 1,100달러에 다시 만들었대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> OpenAI 고객 사례 앞부분을 기준으로 옮겼어요. 수치는 OpenAI·Cloudflare가 밝힌 것이에요.

### 주요 수치

- Cloudflare 네트워크에서 하루 평균 **2,340억 건**의 사이버 위협 차단(2026년 1분기)
- 새 제품 개발 자원 **10배 절감**
- Codex로 제품 재구축 **3일**, 토큰 비용 **1,100달러**

### 무엇을 하나

Cloudflare는 세계 최대급 네트워크로 웹 트래픽의 약 20%를 프록시해요. **Cloudflare Managed Defense**의 조기 접근 서비스 **Vulnerability Discovery and Remediation**에서 Daybreak로 접근하는 OpenAI 모델과 자사 글로벌 네트워크·위협 맥락을 결합해요.

- 모델이 코드를 조사하고 잠재 취약점을 평가해요.
- Cloudflare가 실시간 트래픽 데이터, 보안 신호, 검증을 더해 우선순위를 정하고, 고객이 검토할 **완화책과 패치 제안**을 준비해요.

Codex는 엔지니어링 조직 전반에서 산출량과 코드 품질을 높이는 데 쓰여요.

> Daybreak와 Codex가 주는 자동화의 장점은 잡일을 기계에 맡기고 사람은 가장 중요한 엔지니어링·보안 결정에 판단력을 쓸 수 있다는 거예요. — Mark Anderson, Cloudflare 매출 부문 사장

### 소스 코드와 운영 환경을 잇기

보안팀에는 취약점 정보와 경보가 끊임없이 쏟아져요. 손으로 걸러 내느라 정작 중요한 문제를 볼 여력이 줄어요. Anderson은 "전통적인 보안팀에는 유용한 데이터가 많지만 다룰 사람과 시간이 없다"고 말해요.

Cloudflare의 접근은 소스 코드의 취약점을 **운영 환경에서 실제로 일어나는 일**과 연결하는 거예요.

- 영향받는 경로(route)가 실제로 쓰이고 있나?
- 그 경로에 의심스러운 트래픽이 오나?
- 기존 보안 통제가 이미 막고 있나?

이런 신호로 무엇부터 조사할지 정해요. 서비스는 고객이 승인한 코드만 조사하고, 각 발견을 뒷받침하는 증거를 확인해요.
