---
id: trend-9be04d29c3fa3645
title: "pgvector/pgvector"
sourceUrl: https://github.com/pgvector/pgvector
summary: "pgvector는 포스트그레스에 벡터 유사도 검색을 더하는 오픈소스 확장이에요. 정확한 검색과 근사 최근접, 여러 거리 함수, 양자화를 지원하고, README의 설치 예는 v0.8.7 브랜치와 포스트그레스 13+를 안내해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-19
---

pgvector/pgvector 저장소 README 앞부분을 읽었어요. 스타 수는 이 수집본에 없어 적지 않았고, 설치와 시작하기 안내까지를 중심으로 옮겼어요.

pgvector는 포스트그레스를 위한 오픈소스 벡터 유사도 검색이에요. 벡터를 다른 데이터와 함께 저장하고, 정확한 검색과 근사 최근접 검색, 단정밀도·반정밀도·이진·희소 벡터, L2, 내적, 코사인, L1, 해밍, 자카드 거리, 포스트그레스 클라이언트가 있는 어떤 언어든 지원한다고 해요. 여기에 포스트그레스의 ACID, 특정 시점 복구, JOIN 등도 쓸 수 있고, 벡터가 많으면 양자화로 규모를 키우라고 해요.

리눅스와 맥에서는 확장으로 컴파일해 설치하며 포스트그레스 13+를 지원하고, README의 예는 `git clone --branch v0.8.7` 뒤 make, make install이에요. 도커, 홈브루, PGXN, APT, Yum, pkg, APK, conda-forge로도 설치할 수 있고, Postgres.app과 많은 호스팅 제공자에 미리 들어 있으며, GitHub Actions용 안내도 있다고 해요. 윈도우에서는 비주얼 스튜디오 C++ 지원과 관리자 권한 x64 Native Tools 명령 프롬프트에서 nmake를 쓰고, 예제의 PGROOT는 `C:\Program Files\PostgreSQL\18`이에요. 도커나 conda-forge로도 설치할 수 있다고 해요.

시작하기는 데이터베이스마다 한 번 `CREATE EXTENSION vector;`를 실행하고, 예를 들어 3차원 `vector(3)` 컬럼을 만든 뒤 벡터를 넣고, L2 거리 연산자 `<->`로 최근접을 조회하는 식이이에요. 내적은 `<#>`, 코사인은 `<=>`, L1은 `<+>`를 지원하고, `<#>`는 음수 내적을 돌려 주는데, 포스트그레스가 해당 연산자의 인덱스 스캔에서 오름차순만 지원하기 때문이라고 해요.
