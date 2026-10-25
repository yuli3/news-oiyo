---
id: trend-09d9409be22fbb44
title: "nocodb/nocodb"
sourceUrl: https://github.com/nocodb/nocodb
summary: "NocoDB는 무료로 직접 호스팅할 수 있는 Airtable 대안이에요. Docker나 한 줄 설치 스크립트로 띄우고, 그리드·갤러리·폼·칸반·캘린더 뷰와 역할 기반 권한, Slack·이메일·스토리지 연동을 지원해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> GitHub README 앞부분(설치·기능·앱스토어 일부)을 기준으로 정리했어요.

### 한 줄 요약

**NocoDB**는 "온라인으로 데이터베이스를 가장 빠르고 쉽게 만드는 방법"을 내세운 **무료, 셀프 호스팅 Airtable 대안**이에요.

### 설치 방법

| 방법 | 내용 |
|---|---|
| Docker | SQLite 또는 PostgreSQL(`NC_DB` 환경변수)과 함께 실행 |
| Auto-upstall | 한 줄 명령으로 서버에 프로덕션용 설치, 내부적으로 docker-compose 생성 |
| 바이너리 | macOS·Linux·Windows(arm64/x64)용, **로컬 빠른 테스트 전용** |

**Auto-upstall**이 해 주는 일:
- Docker, docker-compose 같은 사전 요구사항 자동 설치
- PostgreSQL, Redis, **Traefik 게이트웨이**와 함께 NocoDB 설치
- 명령을 다시 실행하면 최신 버전으로 업그레이드
- 도메인을 입력하면 **SSL 발급과 갱신**까지 자동

로컬에서는 `http://localhost:8080/dashboard`로 접속해요. README 예시 명령의 JWT 시크릿은 예시값이니 실제로는 직접 만든 값으로 바꿔야 해요.

### 주요 기능

- 테이블·열·행 **CRUD**
- 정렬, 필터, 그룹, 열 숨기기
- 뷰: **그리드(기본), 갤러리, 폼, 칸반, 캘린더**
- 뷰 권한: 협업 뷰, 잠금 뷰
- 베이스·뷰 공유: 공개 또는 **비밀번호 보호** 비공개
- 셀 타입: ID, 링크, Lookup, Rollup, 텍스트, 첨부, 통화, 수식, 사용자 등
- **역할 기반 세밀한 접근 제어**

### 워크플로 자동화 앱스토어

- 채팅: Slack, Discord, Mattermost 등
- 이메일: AWS SES, SMTP, MailerSend 등
- 스토리지: AWS S3, Google Cloud Storage 등

### 이런 분께

스프레드시트처럼 쓰는 DB가 필요하지만 데이터를 외부 SaaS에 두고 싶지 않은 팀에 맞아요.
