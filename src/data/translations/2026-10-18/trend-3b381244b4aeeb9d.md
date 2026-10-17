---
id: trend-3b381244b4aeeb9d
title: "apache/superset"
sourceUrl: "https://github.com/apache/superset"
summary: "Apache Superset은 엔터프라이즈용 오픈소스 BI 웹 앱이에요. 노코드 차트 빌더, 웹 SQL 에디터, 가벼운 시맨틱 레이어, 캐싱, 확장 가능한 권한·인증, API를 제공하고, Python DB-API 드라이버와 SQLAlchemy 방언이 있는 거의 모든 SQL 데이터베이스에 붙어요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

GitHub 저장소 README 원문을 읽고 옮겼어요. 끝부분의 외부 자료 링크 목록은 제목만 확인했어요.

### 무엇인가
Superset은 현대적이고 엔터프라이즈에 쓸 수 있는 비즈니스 인텔리전스(BI) 웹 애플리케이션이에요. 많은 팀에서 상용 BI 도구를 대체하거나 보완할 수 있다고 소개해요.

### 제공 기능
| 기능 | 내용 |
|---|---|
| 노코드 차트 빌더 | 코드 없이 빠르게 차트 생성 |
| SQL 에디터 | 고급 쿼리용 웹 기반 에디터 |
| 시맨틱 레이어 | 사용자 정의 차원·지표를 빠르게 정의 |
| 연결 | 거의 모든 SQL 데이터베이스·데이터 엔진 기본 지원 |
| 시각화 | 막대 차트부터 지리 공간 시각화까지 |
| 캐싱 | 데이터베이스 부하를 줄이는 설정 가능한 캐싱 계층 |
| 보안 | 확장 가능한 역할과 인증 옵션 |
| 확장 | 프로그램으로 커스터마이즈하는 API, 확장 프레임워크 |
| 아키텍처 | 처음부터 확장을 고려한 클라우드 네이티브 구조 |

### 지원 데이터베이스
Python DB-API 드라이버와 SQLAlchemy 방언이 있는 SQL 데이터 저장소라면 Presto, Trino, Athena 등 무엇이든 조회할 수 있어요. 새 데이터 엔진 지원을 추가하는 기술 요건 문서도 있어요.

### 문서와 참여
- 문서는 분석가용 **User Guide**, 설치·운영용 **Administrator Guide**, 기여·REST API·확장용 **Developer Guide**로 나뉘어요.
- 빠른 시작 가이드와 운영 배포 옵션, 공식 Docker 이미지와 Helm 차트가 있어요.
- Stack Overflow `apache-superset` 태그, Slack, dev@superset.apache.org 메일링 리스트, Town Hall 정기 회의로 참여할 수 있어요.
- 기능 플래그 현황, RBAC 표준 역할, 개선 제안(SIP) 현황, 데이터셋 중심 시각화와 시맨틱 레이어 설명 글도 링크돼 있어요.

저장소 루트에 `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `GPT.md` 같은 AI 에이전트용 안내 파일이 있는 점도 눈에 띄어요. 커밋은 2만 3,794개예요.
