---
id: trend-37306f99bedfcd30
title: "Java4Shell은 Java를 사용해야 할 이유다"
sourceUrl: https://mccue.dev/pages/11-18-26-java4shell
summary: "Ethan McCue는 JVM의 Base64 인트린식에서 나온 Java4Shell 사태를 계기로, 일반 Java 코드는 메모리 안전하고 네이티브 접근을 명시적으로 허용해야 하므로 AI가 보안 버그를 쏟아내는 시대에 오히려 Java를 쓸 이유가 된다고 주장해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

Ethan McCue가 mccue.dev에 쓴 글 전체를 읽고 옮겼어요.

### Java4Shell과 당장 할 일

"Java4Shell" 대응이 시작된 지 하루도 안 된 시점에 쓴 글이에요. 문제는 Java 가상 머신이 Base64 인코딩 코드를 인트린식(intrinsify)으로 처리하는 방식에서 나왔어요. 아직 업데이트하지 않은 Java 배포가 있다면 VM 플래그에 `-XX:-UseBASE64Intrinsics`를 넣고, 가능할 때 패치된 VM 버전으로 올리라고 해요.

### 왜 걱정이 큰가

연이은 대형 장애와 취약점 중 하나라는 거예요. AI가 좋은 퍼저라서 과거보다 훨씬 적은 노력으로 숨은 문제를 찾고 있고, 다들 더 찾을 게 남았다고 확신하고 있어요. 취약점은 네이티브 코드에서 나올 때 더 심각하고, 많은 사람이 공유하는 의존성에서 나올 때 더 넓게 퍼지는데, Java4Shell은 둘 다예요. 많은 사람이 Java를 쓰고, 원인이 손으로 쓴 어셈블리 인트린식이거든요.

### 그래도 Java인 이유

- **메모리 안전**: VM을 믿는다면 큰 의존성이긴 해도 하나뿐이고, 더 꼼꼼히 감사하고 네이티브 코드를 줄이고 AI를 미리 돌려 볼 수 있어요. 일반 Java 프로그램은 메모리 안전해요. 네이티브 코드를 부르려는 라이브러리는 경고가 뜨고(나중엔 오류), 사용자가 `--enable-native-access=the.specific.library`를 직접 넣어야 해요. 의존성 트리가 커도 네이티브 노출과 더 감사할 의존성을 정확히 알 수 있다는 거예요.
- **다른 언어와 비교**: C#은 어떤 의존성이든 인라인 어셈블리를 쓸 수 있고, Python·JavaScript·Go는 모두 C와 통해 어느 의존성이든 네이티브 코드를 들여올 수 있다고 지적해요.
- **빠름**: Java4Shell을 낳은 바로 그 메커니즘(일반 Java 코드를 네이티브 코드로 바꿔 끼우는 능력)과 JIT 덕분에 C와 겨룰 만큼 빠르고, 실제 실행 경로를 알고 워크로드가 바뀌면 최적화 대상을 바꿀 수도 있어요.

"Ray Tracing in One Weekend"를 구현해 잰 결과는 이래요.

| 구현 | 평균 ± σ | C++ 대비 |
|---|---|---|
| C++ clang 21 -O3 | 7.00 ±0.01 | 1.00x |
| Java 28, value classes | 11.95 ±0.25 | 1.71x |
| C# .NET 11 preview 6 | 11.95 ±0.22 | 1.71x |
| C# .NET 10 | 11.98 ±0.11 | 1.71x |
| Java 26 | 17.53 ±0.21 | 2.50x |

벤치마크에 문제가 있을 수 있다는 걸 인정하면서도, JVM이 대부분의 사람에게 네이티브 코드가 필요 없을 만큼 빠르다는 게 요점이라고 해요. 네이티브 확장 없이는 느린 CPython과 대조하고요. 결론은 "AI가 내 코드의 보안 문제를 찾을까 걱정되면 Java를 써라, 문제가 덜 심각할 가능성이 높다"예요. Kotlin, Clojure, JRuby 등에도 대부분 해당하고, 모듈 시스템만 Java 고유라고 덧붙여요.
