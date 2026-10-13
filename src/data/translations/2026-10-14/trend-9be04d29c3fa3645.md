---
id: trend-9be04d29c3fa3645
title: "pgvector/pgvector"
sourceUrl: "https://github.com/pgvector/pgvector"
summary: "pgvector는 Postgres용 오픈소스 벡터 유사도 검색 확장이에요. 벡터를 다른 데이터와 함께 저장하고, 정확·근사 최근접 이웃 검색, 반정밀도·이진·희소 벡터, L2·내적·코사인 등 여러 거리 함수를 Postgres의 ACID·JOIN과 함께 써요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-14"
---
pgvector 깃허브 README의 소개, 설치, 시작하기, 저장·쿼리·인덱싱 개요를 옮겼어요. 인덱스 튜닝 등 긴 뒷부분은 생략해 partial로 표시해요. 원문의 SQL 연산자 기호는 추출 과정에서 빠져 있어 설명만 옮겨요.

### pgvector란
Postgres를 위한 오픈소스 **벡터 유사도 검색** 확장이에요. "벡터를 나머지 데이터와 함께 저장하라"는 게 핵심이에요.
- 정확(exact) 및 근사(approximate) 최근접 이웃 검색
- 단정밀도, 반정밀도, 이진, 희소 벡터
- L2 거리, 내적, 코사인 거리, L1 거리, 해밍 거리, 자카드 거리
- Postgres 클라이언트가 있는 모든 언어
여기에 ACID, 시점 복구, JOIN 등 Postgres의 모든 기능을 그대로 써요. 벡터가 많으면 양자화로 확장하라고 해요.

### 설치
리눅스·맥은 확장을 컴파일해 설치하고 Postgres 13 이상을 지원해요. Docker, Homebrew, PGXN, APT, Yum, pkg, APK, conda-forge로도 설치되고 Postgres.app과 많은 호스팅 서비스에 기본 포함돼 있어요. 윈도우는 Visual Studio C++ 지원을 깔고 관리자 권한 x64 Native Tools 명령 프롬프트에서 nmake로 빌드해요.

### 시작하기
데이터베이스마다 한 번 확장을 켜고, 3차원 vector 컬럼을 만들고, 벡터를 넣은 뒤 L2 거리로 최근접 이웃을 조회해요. 내적, 코사인, L1도 지원하는데, Postgres가 인덱스 스캔에서 오름차순만 지원해서 내적 연산자는 **음의 내적**을 돌려준다고 주의를 줘요.

### 저장과 쿼리
새 테이블에 vector 컬럼을 만들거나 기존 테이블에 추가하고, 삽입, COPY 대량 적재, 업서트, 갱신, 삭제를 할 수 있어요. 벡터나 특정 행의 최근접 이웃, 일정 거리 안의 행을 구할 수 있고, 인덱스를 쓰려면 ORDER BY와 LIMIT을 함께 쓰라고 해요. 내적은 -1을 곱하고, 코사인 유사도는 1에서 코사인 거리를 빼서 구해요. 벡터 평균 같은 집계도 돼요.

### 인덱싱
기본은 정확 검색이라 재현율이 완벽해요. 속도를 위해 근사 인덱스를 추가할 수 있고, 그 대신 재현율이 일부 떨어진다는 설명으로 이어져요.
