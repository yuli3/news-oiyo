---
id: trend-e699a5e4cbf45c27
title: "simdjson/simdjson"
sourceUrl: https://github.com/simdjson/simdjson
summary: "simdjson은 SIMD 명령과 마이크로 병렬 알고리즘으로 JSON을 초당 기가바이트 단위로 파싱하는 C++ 라이브러리예요. RapidJSON보다 4배 넘게 빠르다고 하고, Node.js·ClickHouse·Elasticsearch·Apache Arrow 등에서 쓰여요. Apache 2.0과 MIT 중 골라 쓸 수 있어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

GitHub README 전체를 읽고 정리했어요. 성능 그래프 이미지와 패키지·바인딩 링크 목록은 옮기지 않았어요.

### 무엇인가

인터넷 어디에나 JSON이 있고 서버는 이를 파싱하는 데 많은 시간을 써요. **simdjson**은 흔한 SIMD 명령과 마이크로 병렬 알고리즘으로 JSON을 RapidJSON보다 4배, JSON for Modern C++보다 25배 빠르게 파싱한다고 소개해요.

- **빠름**: 널리 쓰이는 프로덕션급 파서보다 4배 넘게 빨라요.
- **기록적 기능**: JSON 축소 6GB/s, UTF-8 검증 13GB/s, NDJSON 3.5GB/s.
- **엄격함**: JSON과 UTF-8을 완전히 검증하고 손실 없이 파싱해요.
- **자동**: 실행 시점에 CPU에 맞는 파서를 골라요. 설정이 필요 없어요.
- **동료 검토**: 연구가 VLDB Journal, Software: Practice and Experience 등에 실렸어요.

### 실제 사용처

Node.js, ClickHouse, Meta Velox, milvus, QuestDB, StarRocks, Apache Doris, Ladybird 브라우저, TiFlash, Apache Arrow, Elasticsearch, Wazuh 등 50곳 가까운 프로젝트가 README에 나열돼 있어요. 제품에 쓸 때는 릴리스 버전을 쓰라고 해요.

### 시작하기

헤더 하나(`simdjson.h`)와 소스 하나(`simdjson.cpp`)만 있으면 돼요. g++ 7 이상이나 clang++ 6 이상, 64비트 시스템이 필요해요. 예제는 On-Demand 파서로 twitter.json을 읽어 결과 개수를 출력해요. C++26 전용 컴파일 타임 파싱 문서도 있어요.

### 성능

- 최신 파서 RapidJSON보다 명령어를 4분의 3 적게 써요. 일반 프로세서에서 GB/s로 동작하는 첫 완전 검증 JSON 파서라고 해요. 코어 하나로 초당 수백만 개 문서를 파싱할 수 있어요.
- GCC 16.2와 C++26 정적 리플렉션으로 twitter.json을 C++ 구조체로 바꾸고 다시 직렬화하는 벤치마크(Intel Xeon Gold 6548N)에서 Glaze, Serde 등과 비교했어요. 300바이트 작은 파일부터 3MB 파일까지 빠르고, 멀티스레드로 NDJSON에서 3GB/s를 넘는다고 해요.

### 설계와 배경

SIMD 벡터 명령으로 병렬화하고, 분기 예측 실패와 데이터 의존성을 줄여 여러 실행 유닛을 활용해요. 기본 프런트엔드는 On-Demand예요. 2019년 VLDB 논문 "Parsing Gigabytes of JSON per Second", 2021년 UTF-8 검증 논문, 2024년 On-Demand 논문이 있고, CppCon 2025 발표에서는 C++26 리플렉션으로 `to_json(player)` 한 줄 직렬화를 보여 줬어요. 캐나다 NSERC 지원을 받아요.
