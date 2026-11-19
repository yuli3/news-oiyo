---
id: trend-fecc98aa76d9be6e
title: "pola-rs/polars"
sourceUrl: https://github.com/pola-rs/polars
summary: "Polars는 Rust로 만든 분석용 쿼리 엔진이에요. DataFrame API와 SQL을 섞어 써도 같은 옵티마이저와 엔진에서 돌아가고, 멀티스레드·SIMD 실행, 디스크 스필, NVIDIA GPU 가속, Apache Arrow 무복사 공유를 지원해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

GitHub 저장소 pola-rs/polars의 README 전체를 읽고 정리했어요. MIT 라이선스이고, 읽은 시점 기준 스타 약 4.04만 개였어요. 문서는 Python, Rust, Node.js, R, SQL용이 있고, 에이전트용 Skill과 MCP 안내도 README 상단에 링크돼 있어요.

### Polars란

Polars는 Rust로 작성된 분석용 쿼리 엔진이에요. DataFrame API로 쓰든, SQL로 쓰든, 둘을 섞든 같은 옵티마이저와 같은 엔진을 거쳐요. 빠르고 쓰기 쉽고 표현력 있게 설계됐어요.

### 주요 특징

- **빠름**: Rust로 처음부터 작성했고 멀티스레드, 벡터화(SIMD) 실행을 해요.
- **디스크 스필**: 메모리를 넘는 연산은 디스크로 내려 처리해요.
- **표현력 있는 API**: 강력한 표현식(expression)으로 복잡한 쿼리를 조합해요.
- **확장성**: I/O 플러그인과 표현식 플러그인으로 커스텀 코드를 네이티브로 붙여요.
- **GPU 지원**: 선택적으로 NVIDIA GPU에서 쿼리를 가속해요.
- **상호운용성**: Apache Arrow 컬럼 형식으로 데이터를 복사 없이 공유해요.

### 사용 예

- **DataFrame API**: `pl.scan_parquet("orders.parquet")`에서 status가 shipped인 행을 걸러 customer_id별로 금액 합계와 주문 수를 구하고 정렬해요. 이런 지연(lazy) 쿼리는 자동으로 최적화되고 모든 코어에서 병렬로 돌아가요.
- **SQL**: `pl.sql()` 안에서 CTE, `read_parquet`, 조인, `RANK() OVER` 윈도 함수까지 쓸 수 있어요.
- **혼합**: 범위 안의 DataFrame·LazyFrame을 이름으로 SQL에서 부를 수 있고, SQL 결과도 일반 LazyFrame이라 SQL과 표현식을 자유롭게 오가요.

### 성능과 설치

- README는 Polars가 DataFrame과 SQL 워크로드 모두에서 가장 성능 좋은 쿼리 엔진 중 하나라고 하며, 근거로 PDS-H 벤치마크를 제시해요.
- Python은 `pip install polars`로 설치해요.
- 소스 빌드: 최신 Rust 컴파일러와 maturin을 설치하고 py-polars 폴더에서 `make build`(디버그, 빠른 컴파일)부터 `make build-dist-release`(가장 빠른 바이너리, 매우 긴 컴파일)까지 골라요. 기본은 최신 CPU용 최적화이고, AVX2 등을 지원하지 않는 오래된 CPU면 `LTS_CPU=1`을 붙여요.
- Python 바인딩 크레이트는 py-polars지만 패키지와 모듈 이름은 모두 polars예요. 2^32(약 42억)행 초과, 2011년 이전 CPU, Apple Silicon의 Rosetta x86-64 Python 같은 경우는 설치 가이드를 보라고 해요.

### 기여와 확장

기여 가이드와 'good first issue' 라벨, Discord가 있고, 하드웨어 한계에 부딪히면 클러스터에서 수평 확장하는 'Distributed Polars' 안내도 있어요.
