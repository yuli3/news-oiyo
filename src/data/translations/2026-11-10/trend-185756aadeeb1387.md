---
id: trend-185756aadeeb1387
title: "GPUI 비판"
sourceUrl: https://blog.zortax.de/posts/a-critique-of-gpui
summary: "zgui 개발자가 GPUI와 egui의 상태 모델이 복잡한 데스크톱 앱에는 막다른 길이라고 비판했어요. 모든 UI는 결국 무엇이 바뀌고 누가 의존하는지 알아야 하는데, 이를 앱이 손으로 알려야 하는 구조라면 장점이 사라지고 한 번만 실행되는 컴포넌트와 시그널이 가장 단순한 답이라는 주장이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

블로그 글 "A Critique of GPUI"의 앞부분(문제 제기, 비교 표)을 읽고 옮겼어요. 벤치마크와 뒤쪽 절은 읽지 못해 `partial`이에요. 작성자는 GPUI의 Linux 렌더러를 wgpu로 옮겼고, 아래 벤치마크 도구를 만들었으며, 시그널 기반 Rust 프레임워크 zgui를 만든다고 밝혀요.

### 배경

요즘 Rust 네이티브 GUI 프레임워크로 데스크톱 앱을 만드는 흐름이 있어요. Discord는 앱을 GPUI로 다시 쓴다고 발표했고, LLM으로 만든 복제 앱들은 egui를 많이 고른대요. 작성자는 GPUI와 egui가 인상적인 프로젝트이고 Zed는 실제로 빠르고 egui는 자신도 bevy 게임 디버그 화면에 쓴다면서도, 복잡한 데스크톱 앱의 기본 선택이 돼서는 안 된다고 봐요.

### 두 가지 주장

1. 모든 UI 구조는 결국 **무엇이 바뀌었고 누가 그것에 의존하는지** 알아야 성능이 확장돼요. 프레임워크가 이를 말해 주지 못하면 앱이 손으로 말해야 하고, 그러면 그 프레임워크 API의 매력이 사라져요.
2. 그 정밀함이 필요하다고 인정하면, **한 번만 실행되는 컴포넌트 + 시그널**이 가장 단순한 API예요.

### 무엇이 다시 실행되나요

Ron Minsky의 말처럼 "모든 UI 프레임워크 안에는 일종의 증분 계산 프레임워크가 숨어 있다"고 해요. 값 하나가 바뀔 때 무엇이 도는지로 나눈 표를 옮기면 이래요.

| 모델 | 쓰기가 실행시키는 것 | 변화를 찾는 주체 |
|---|---|---|
| Immediate(egui) | 다음 프레임의 UI 코드 전체 | 없음 |
| Elm(Iced) | view 전체 후 diff | diff |
| Views(GPUI) | 캐시 없는 모든 view | 개발자(notify) |
| Signals 재실행(Freya, Compose) | 그 값을 읽는 컴포넌트 | 프레임워크 |
| Signals 1회 실행(Floem, Solid, zgui) | 그 값을 읽는 클로저 | 프레임워크 |

글의 소제목은 GPUI의 notify가 Angular의 zone.js와 닮았다는 점, GPUI를 정밀하게 만들면 GPUI다움이 사라진다는 점, 시그널이 앱을 저절로 빠르게 하지는 않는다는 점 등으로 이어져요.
