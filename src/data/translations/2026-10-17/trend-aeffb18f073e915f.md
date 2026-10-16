---
id: trend-aeffb18f073e915f
title: "Infisical/infisical"
sourceUrl: "https://github.com/Infisical/infisical"
summary: "Infisical은 비밀값·인증서·특권 접근을 관리하는 오픈소스 보안 인프라 플랫폼이에요. 비밀값 동기화·회전·동적 발급·유출 방지에 더해, AI 에이전트가 실제 자격증명을 쥐지 않게 프록시로 주입하는 'Agent Vault'와 미끼 자격증명 'Honey Tokens'도 내세워요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

GitHub 저장소 README를 읽고 옮겼어요. README가 길어 비밀값·인증서 관리 부분까지 옮겼고 나머지 기능 목록은 읽지 못해 `partial`이에요.

### 무엇인가
Infisical은 팀이 비밀값(secrets), 인증서, 특권 접근 관리를 위해 쓰는 오픈소스 보안 인프라 플랫폼이에요. 보안 도구를 보안팀만이 아니라 모두가 쓰기 쉽게 만들겠다며 개발자 경험을 처음부터 다시 설계한다고 해요. 클라우드와 자체 호스팅을 모두 제공해요.

### 비밀값 관리
| 기능 | 설명 |
|---|---|
| 대시보드 | 프로젝트·환경(개발, 운영 등)별 비밀값 관리 |
| Secret Syncs | GitHub, Vercel, AWS 등으로 동기화, Terraform·Ansible 연동 |
| 버전·시점 복구 | 모든 비밀값과 프로젝트 상태 추적, 필요 시 롤백 |
| 회전 | PostgreSQL, MySQL, AWS IAM 등 주기적 교체 |
| 동적 비밀값 | PostgreSQL, MySQL, RabbitMQ 등에 일회성 자격증명 즉시 발급 |
| 유출 방지 | 비밀값이 git으로 새는 것을 스캔·차단 |
| Kubernetes Operator·Agent | 워크로드에 비밀값 전달·자동 재배포, 코드 수정 없이 주입 |

### 눈에 띄는 기능
- **Honey Tokens**: 진짜 비밀값 옆에 미끼 자격증명을 심어, 공격자가 쓰는 순간 팀에 알림이 가요.
- **Agent Vault**: AI 에이전트의 외부 API 접근을 중개해요. 에이전트는 실제 자격증명을 갖지 않고, 나가는 요청이 프록시를 거치며 비밀값이 주입돼요. 프롬프트 인젝션으로 자격증명이 유출될 위험을 없애려는 설계예요.

### 인증서 관리
내부 CA 계층 운영, Let's Encrypt·DigiCert·Microsoft AD CS 등 외부 CA 연동, API·ACME·EST 발급과 갱신·폐기·CRL까지의 수명주기 관리, AWS Certificate Manager·Azure Key Vault 동기화, 만료 알림, 코드 서명 기능을 제공해요.
