---
id: trend-d5b0a25dd612d836
title: "apache/kafka"
sourceUrl: "https://github.com/apache/kafka"
summary: "Apache Kafka는 수천 개 기업이 고성능 데이터 파이프라인, 스트리밍 분석, 데이터 통합에 쓰는 오픈소스 분산 이벤트 스트리밍 플랫폼이에요. README는 Java 17·25로 빌드·테스트하고 Scala는 2.13만 지원한다고 안내해요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

GitHub README 앞부분(빌드 안내)을 기준으로 옮겼어요. 테스트·배포 세부 명령 뒷부분은 다 읽지 못했어요.

### 무엇인가
**Apache Kafka**는 오픈소스 **분산 이벤트 스트리밍 플랫폼**이에요. README에 따르면 수천 개 기업이 고성능 데이터 파이프라인, 스트리밍 분석, 데이터 통합, 핵심 업무 애플리케이션에 써요. 서비스 사이에 오가는 이벤트를 로그처럼 순서대로 저장하고, 여러 소비자가 각자 속도로 읽어 가게 하는 구조가 핵심이에요.

### 빌드 환경
- Java가 필요해요. Kafka는 **Java 17과 25**로 빌드하고 테스트해요.
- `javac`의 release 값은 clients·streams 모듈은 **11**, 나머지는 **17**이에요. 각 모듈의 최소 Java 버전과 호환되게 하려는 거예요.
- `scalac`도 streams 모듈은 11, 나머지는 17이에요.
- **Scala 2.13**만 지원해요.

### 주요 빌드 명령
- `./gradlew jar`: JAR 빌드. 실행은 kafka.apache.org의 quickstart를 따라요.
- `./gradlew srcJar`: 소스 JAR
- `./gradlew aggregatedJavadoc --no-parallel`: 통합 javadoc
- `./gradlew javadoc`, `scaladoc`, `docsJar`: 모듈별 문서 JAR
- `./gradlew test`: 단위·통합 테스트를 함께 실행

### 왜 트렌딩인가
README 자체는 빌드 안내 위주라 새 기능 소식은 없어요. 오늘 GitHub 트렌딩에 오른 이유는 README로는 알 수 없어요.
