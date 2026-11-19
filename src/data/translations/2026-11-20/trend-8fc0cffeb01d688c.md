---
id: trend-8fc0cffeb01d688c
title: "perspective-dev/perspective"
sourceUrl: https://github.com/perspective-dev/perspective
summary: "Perspective는 대용량·실시간 스트리밍 데이터를 위한 오픈소스 데이터 그리드·피벗 테이블·차트 컴포넌트예요. C++ 쿼리 엔진을 WebAssembly로 브라우저에서 돌리거나 Python·Node.js·Rust 서버에서 실행하고, DuckDB·ClickHouse 같은 기존 DB에 쿼리를 맡길 수도 있어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

GitHub 저장소 perspective-dev/perspective의 README 전체를 읽고 정리했어요. OpenJS 재단 소속 프로젝트이고 Apache-2.0 라이선스예요. 읽은 시점 기준 스타 약 1.16만 개, 포크 약 1.4천 개였어요.

### 무엇인가

Perspective는 크고 실시간으로 바뀌는 스트리밍 데이터셋을 위한 데이터 그리드, 피벗 테이블, 차트 컴포넌트예요. 사용자가 직접 구성하는 리포트, 대시보드, 노트북, 임베디드 분석 앱을 만들 수 있어요. 뒤에서는 고성능 스트리밍 쿼리 엔진이 돌아가는데, 브라우저에서 WebAssembly로 실행하거나 서버에서 Python·Node.js·Rust로 실행하고, 이미 쓰는 데이터베이스에 위임할 수도 있어요.

### 주요 기능

- **데이터 반응형 UI**: Custom Element로 패키징돼 드래그 앤 드롭으로 쿼리와 레이아웃을 구성해요. 가상 스크롤·편집 가능한 데이터 그리드, 15종 이상 차트를 지원하는 WebGL 차트 엔진, 타일 기반 지도, 테마, React 바인딩이 들어 있어요.
- **스트리밍 쿼리 엔진**: C++로 작성해 WebAssembly, Python, Rust용으로 컴파일해요. 브라우저에서 4GB가 넘는 데이터를 위한 64비트 memory64 빌드가 있고, 브라우저에선 OPFS로, 네이티브에선 메모리 매핑 파일로 컬럼을 디스크에 페이징할 수 있어요. 테이블은 증분 업데이트되고 뷰는 실시간으로 갱신돼요. 테이블 간 반응형 조인, ExprTK 기반 컬럼 표현식 언어, Apache Arrow·CSV·JSON 읽기/쓰기/스트리밍을 지원해요.
- **대칭형 클라이언트/서버 구조**: 같은 Client API로 같은 프로세스, Web Worker, WebSocket 원격 엔진에 연결해요. Python(aiohttp, Starlette, Tornado), Node.js, Rust 서버 바인딩이 있어요. 데이터를 브라우저에 미러링하거나, 서버에서 가상화해 보이는 부분만 스트리밍할 수 있어요.
- **가상 서버**: DuckDB, ClickHouse, PostgreSQL, Polars 같은 외부 엔진 위에서 Perspective UI를 직접 돌려요. 뷰 설정을 네이티브 쿼리로 번역해서 ETL이나 데이터 복사가 필요 없어요.
- **Jupyter 위젯**: anywidget 기반 위젯과 Python 클라이언트로 JupyterLab 등에서 대화형 분석을 할 수 있어요.

### 문서와 예제

JavaScript API(React 컴포넌트, Web Component, 브라우저·Node.js 클라이언트, ClickHouse·DuckDB 가상 서버), Python API, Rust API 문서가 있고, Superstore, Webcam, Market, NYPD, Movies, Evictions, Fractal 같은 예제가 제공돼요.
