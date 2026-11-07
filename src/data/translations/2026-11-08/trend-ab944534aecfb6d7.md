---
id: trend-ab944534aecfb6d7
title: "요즘은 이런 걸 만들지 않는다: Borland Turbo Pascal 7"
sourceUrl: https://kevinboone.me/tpwin.html
summary: "케빈 분이 Turbo Pascal for Windows 1.5로도 불린 Borland Turbo Pascal 7을 회고했어요. 통합 소스 수준 디버깅, 책 라이선스, OWL 객체지향 라이브러리 덕에 Windows 3.1 개발을 쉽게 만든 도구였다고 평가해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-08
---

Kevin Boone의 글 앞부분(Turbo Pascal 7과 Windows 3.1 개발 환경 회고)을 읽고 옮겼어요.

### 역대 가장 성공한 개발 도구 중 하나

Borland의 Turbo Pascal은 통합 소스 수준 디버깅처럼 지금은 당연하지만 당시엔 급진적이었던 개발 기법을 들여왔어요. Turbo Pascal for Windows 1.5라고도 불린 TP 7은 Turbo Pascal 계열의 정점이자 마지막이었어요.

- "Turbo"라는 이름은 취미용 제품으로 여겨졌고, 훨씬 비싼 "Borland Pascal"은 별개 제품이었어요. 그래도 TP로 상당한 규모의 애플리케이션을 만들 수 있었고 가격도 저렴했어요.
- **책 라이선스(book licensed)**: 한 카피를 사면 여러 사람이 쓸 수 있지만 동시에는 한 명만 쓰는 방식이었어요. 플로피 디스크 시절에도 복제 방지가 없었어요.
- Turbo Pascal은 결국 Delphi로 넘어갔는데, Delphi는 기술적 장점에도 같은 영향력을 갖지 못했다고 해요.

### Windows 3.1이라는 무대

글쓴이는 90년대에 TP 7로 Windows 3.1용 의료 영상 소프트웨어를 만들었어요. Windows 3.1은 본질적으로 MS-DOS의 확장이었지만, 영리한 기법으로 (나름대로) 멀티태스킹을 하고 더 많은 메모리를 다뤘어요. 사용자와 프로그래머 모두에게 단순하고 일관된 UI 모델을 줬고, 지금의 Windows를 우울하게 만드는 낭비적인 "안티 기능"이 없었다고 회고해요.

### 왜 Pascal을 배웠나

글쓴이는 원래 C 프로그래머였지만 TP 7을 쓰려고 Pascal을 배웠어요. C로 Windows 프로그래밍을 하려면 알아보기 힘든 텍스트 파일을 입력으로 받는 명령줄 도구 더미를 엮어야 했는데, TP 7은 그 지저분함을 자동화하고 감춰 줬어요.

UI 모델도 본질적으로 객체지향이었는데 C는 객체지향으로 짜기 어려웠어요. TP 5가 Pascal에 기본적인 객체지향 개념을 들여왔고, Windows 기능은 Windows C API를 감싼 두꺼운 객체지향 래퍼 **Object Windows Library(OWL)**가 제공했어요. 글쓴이는 Borland가 Microsoft보다 먼저 Windows용 객체지향 라이브러리를 냈고, 더 나았다고 기억해요. 익숙한 "초록 체크 버튼"도 OWL이 더한 것이었어요.

> 원문 뒷부분(IDE 사용기와 결론)은 이 정리에 포함하지 않았어요.
