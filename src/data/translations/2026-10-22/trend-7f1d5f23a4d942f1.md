---
id: trend-7f1d5f23a4d942f1
title: "facebookresearch/faiss"
sourceUrl: https://github.com/facebookresearch/faiss
summary: "Faiss는 Meta FAIR가 만든 밀집 벡터 유사도 검색·클러스터링 라이브러리예요. RAM에 다 안 들어가는 크기의 벡터 집합도 검색할 수 있고, C++로 작성돼 Python/numpy 래퍼와 GPU 구현을 함께 제공해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> GitHub 트렌딩에 오른 저장소예요. README 앞부분을 기준으로 옮겼어요.

### 무엇인가

**Faiss**는 **밀집 벡터(dense vector)의 효율적인 유사도 검색과 클러스터링**을 위한 라이브러리예요.

- 크기와 상관없이 벡터 집합을 검색하는 알고리즘을 담고 있고, **RAM에 다 들어가지 않는 규모**도 다룰 수 있어요.
- 평가와 파라미터 튜닝을 돕는 코드도 들어 있어요.
- **C++**로 작성됐고 **Python/numpy 래퍼**를 완전하게 제공해요.
- 가장 유용한 알고리즘 일부는 **GPU**에서도 돌아가요.
- 주로 **Meta의 Fundamental AI Research(FAIR)** 그룹이 개발해요.

최신 기능은 CHANGELOG.md에서 볼 수 있어요.

### 기본 개념

Faiss에는 여러 유사도 검색 방법이 있어요. 전제는 이래요.

- 각 항목은 **벡터**로 표현되고 **정수 ID**로 식별돼요.
- 벡터끼리는 **L2(유클리드) 거리**나 **내적(dot product)**으로 비교해요.
- 쿼리 벡터와 비슷한 벡터란 L2 거리가 가장 작거나 내적이 가장 큰 벡터예요.

RAG(검색 증강 생성)나 추천 시스템에서 임베딩 검색 엔진으로 널리 쓰이는 기반 라이브러리예요. 인덱스 종류와 압축 방식 설명은 README 뒷부분에 이어지는데 다 읽지 못했어요.
