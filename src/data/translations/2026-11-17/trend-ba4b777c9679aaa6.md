---
id: trend-ba4b777c9679aaa6
title: "wagtail/wagtail"
sourceUrl: https://github.com/wagtail/wagtail
summary: "Django 기반 오픈소스 CMS Wagtail 저장소예요. 편집자용 빠른 인터페이스, 프런트엔드 완전 제어, StreamField, Elasticsearch·PostgreSQL 검색, 헤드리스 API, 다중 사이트·다국어를 지원해요. NASA, 구글, NHS 등이 쓰고 BSD 라이선스예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

GitHub 저장소 README를 끝까지 읽고 정리했어요.

### 무엇인가

**Wagtail**은 **Django로 만든 오픈소스 콘텐츠 관리 시스템(CMS)**이에요. 탄탄한 커뮤니티와 상업 지원이 있고, 사용자 경험에 집중하면서 디자이너와 개발자에게 세밀한 제어권을 줘요. README 상단에서는 11월 18~20일 열리는 Wagtail Space 2026 콘퍼런스를 알리고 있어요.

### 특징

- 작성자를 위한 빠르고 보기 좋은 인터페이스
- 프런트엔드 디자인과 구조를 완전히 제어
- 수백만 페이지, 수천 명의 편집자까지 확장
- 기본적으로 빠르고, 필요할 때 캐시 친화적
- 프런트엔드를 분리한 '헤드리스' 사이트용 콘텐츠 API
- 라즈베리파이부터 다중 데이터센터 클라우드까지 실행
- 구조를 지키면서 유연한 콘텐츠를 만드는 **StreamField**
- Elasticsearch나 PostgreSQL 기반 통합 검색
- 이미지와 임베드 콘텐츠 지원, 다중 사이트·다국어 지원

### 시작하기

가상환경에서 `pip install wagtail` → `wagtail start mysite` → 의존성 설치 → `python manage.py migrate` → `createsuperuser` → `runserver` 순서로 시작해요. 기존 Django 프로젝트라면 통합 문서부터 보라고 안내해요.

### 호환성

Django 5.2.x·6.0.x·6.1.x, Python 3.11~3.15, PostgreSQL·MySQL·MariaDB·SQLite(JSON1)를 지원해요.

### 누가 쓰나

NASA, 구글, 옥스팜, NHS, 모질라, MIT, 적십자, 세일즈포스, NBC, BMW, 미국·영국 정부가 쓴다고 해요.

### 운영

Torchbox가 후원하고, 기능 릴리스는 **3개월마다** 나오며 일부는 장기 지원(LTS) 버전이에요. 매일 밤 main 기준 나이틀리 빌드도 있어요. 보안 문제는 GitHub 이슈 전에 security@wagtail.org로 먼저 알려 달라고 해요. 라이선스는 **BSD**예요.
