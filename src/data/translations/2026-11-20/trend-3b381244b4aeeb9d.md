---
id: trend-3b381244b4aeeb9d
title: "apache/superset"
sourceUrl: https://github.com/apache/superset
summary: "Apache Superset은 현대적인 엔터프라이즈용 오픈소스 BI 웹 애플리케이션이에요. 노코드 차트 빌더, 웹 SQL 편집기, 가벼운 시맨틱 레이어를 갖추고 SQL을 쓰는 거의 모든 데이터베이스에 연결되며, 상용 BI 도구를 대체하거나 보완할 수 있다고 소개해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

GitHub 저장소 apache/superset의 README 전체를 읽고 정리했어요. Apache-2.0 라이선스이고, 읽은 시점 기준 스타 약 7.56만 개였어요.

### Superset이란

Superset은 현대적이고 엔터프라이즈에 바로 쓸 수 있는 비즈니스 인텔리전스(BI) 웹 애플리케이션이에요. 데이터 탐색·시각화 플랫폼으로, 많은 팀에서 상용 BI 도구를 대체하거나 보완할 수 있고 다양한 데이터 소스와 잘 통합된다고 해요.

### 제공 기능

- 차트를 빠르게 만드는 노코드 인터페이스
- 고급 쿼리를 위한 강력한 웹 기반 SQL 편집기
- 커스텀 차원과 지표를 빠르게 정의하는 가벼운 시맨틱 레이어
- 거의 모든 SQL 데이터베이스·데이터 엔진 기본 지원
- 단순 막대 차트부터 지리공간 시각화까지 다양한 시각화
- DB 부하를 줄이는 가볍고 설정 가능한 캐싱 레이어
- 확장성 높은 보안 역할과 인증 옵션
- 프로그래밍 방식 커스터마이즈용 API
- 처음부터 확장을 고려해 설계한 클라우드 네이티브 아키텍처

### 지원 데이터베이스

Python DB-API 드라이버와 SQLAlchemy 방언(dialect)이 있는 SQL 데이터 저장소나 엔진(Presto, Trino, Athena 등)이라면 쿼리할 수 있어요. 전체 목록과 설정 방법은 문서에 있고, 새 데이터 저장소 지원을 추가하려면 기술 요구 사항 문서를 보면 돼요.

### 문서 구성

- **사용자 가이드**: 분석가·현업 사용자용. 데이터 탐색, 차트·대시보드 만들기, DB 연결
- **관리자 가이드**: 설치, 설정, 운영. 보안, 확장, DB 드라이버
- **개발자 가이드**: 기여하거나 REST API와 확장 프레임워크로 개발

설치는 퀵스타트 가이드나 운영 배포 옵션 문서를 따르면 되고, 공식 Docker 이미지와 Helm 차트도 있어요.

### 커뮤니티와 자료

Stack Overflow(apache-superset 태그), Slack, dev@superset.apache.org 메일링 리스트, X·LinkedIn·Bluesky·Reddit에서 소통해요. 여러 DB 드라이버 이슈를 도울 사람을 모으는 'Database Familiarity Rolodex', 정기 타운홀 미팅도 있어요. 자료로는 사용 사례 목록, 기능 플래그 상태, RBAC 역할 매핑, 위키, SIP(Superset 개선 제안) 현황, 데이터셋 중심 시각화와 시맨틱 레이어 설명, Docker Compose로 2분 만에 시작하기, Bing 팀의 커스터마이즈 사례, 시각화 플러그인 만들기, Apache ECharts를 택한 이유 같은 글이 소개돼요.
