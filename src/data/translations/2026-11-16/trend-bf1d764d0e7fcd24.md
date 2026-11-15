---
id: trend-bf1d764d0e7fcd24
title: "qdrant/qdrant"
sourceUrl: https://github.com/qdrant/qdrant
summary: "Rust로 만든 오픈소스 벡터 유사도 검색 엔진이자 벡터 데이터베이스예요. 페이로드 필터링, 밀집·희소·멀티벡터 하이브리드 검색, 최대 97% RAM을 줄이는 양자화, 앱 내부에서 도는 Qdrant Edge, AI 코딩 도우미용 에이전트 스킬을 제공해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

GitHub 저장소 README를 끝까지 읽고 정리했어요.

### 무엇인가

**Qdrant**('쿼드런트'로 읽어요)는 **벡터 유사도 검색 엔진이자 벡터 데이터베이스**예요. 벡터에 추가 정보(페이로드)를 붙인 '포인트'를 저장·검색·관리하는 프로덕션용 서비스를 편한 API로 제공해요. **Rust**로 작성돼 높은 부하에서도 빠르고 안정적이라고 해요. 라이선스는 **Apache 2.0**이고, 무료 티어가 있는 완전 관리형 Qdrant Cloud도 있어요.

### 빠른 시작

- `docker run -p 6333:6333 qdrant/qdrant`로 로컬에서 띄울 수 있어요.
- README는 이 방식이 **인증 없이 모든 네트워크 인터페이스에 열린** 배포라고 경고하고, 프로덕션 전에 설치·보안 가이드를 꼭 읽으라고 해요.
- 파이썬에선 `QdrantClient(url="http://localhost:6333")`로 접속해요. REST API(OpenAPI 3.0 명세)와 더 빠른 gRPC 인터페이스도 있어요.

### 에이전트 스킬

AI 코딩 도우미에 Qdrant 벡터 검색 지식을 넣어 주는 **에이전트 스킬** 모음을 제공해요. 양자화, 샤딩, 테넌트 격리, 하이브리드 검색, 모델 마이그레이션 같은 엔지니어링 결정을 돕는 용도예요.

### Qdrant Edge

엣지 기기와 자원이 제한된 환경용 경량 버전이에요. 클라이언트-서버 구조가 아니라 **애플리케이션 프로세스 안에서** 돌고, 데이터를 로컬에 저장·조회하며 Qdrant 서버와 동기화할 수 있어요. 파이썬·Rust에서 `EdgeShard`로 시작해요.

### 주요 기능

- **밀집·희소·멀티벡터 검색**: 의미 유사도, 전문 검색, ColBERT 같은 late interaction 모델 지원
- **페이로드 필터링**: 키워드, 전문, 숫자 범위, 위치 조건을 should/must/must_not으로 조합
- **하이브리드 쿼리**: RRF, DBSF 같은 융합 전략으로 결과 병합
- **양자화와 디스크 저장**: RAM 사용을 최대 97% 줄이고 속도·정밀도 균형 조절
- 샤딩·복제로 수평 확장, 무중단 컬렉션 변경
- 패싯, 추천, 디스커버리, MMR 등 관련성 조정, 멀티테넌시, 관측성·감사 로그
- SIMD 가속, NVIDIA·AMD GPU 인덱싱, io_uring 비동기 I/O, 정전에도 버티는 WAL
- 컬렉션을 살펴보고 관리하는 웹 UI

### 기여

개발 브랜치는 `master`가 아니라 **`dev`** 예요. 포크 후 dev에서 브랜치를 만들어 dev로 PR을 보내야 해요.
