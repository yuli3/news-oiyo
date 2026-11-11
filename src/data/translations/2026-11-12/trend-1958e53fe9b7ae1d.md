---
id: trend-1958e53fe9b7ae1d
title: "Expo의 Exact - React 없이 웹·iOS·macOS·Linux 앱을 만드는 AI 에이전트 중심 런타임"
sourceUrl: https://github.com/expo/exact
summary: "Expo가 공개한 Exact는 선언형 언어 Contract로 UI를, TypeScript나 Rust로 로직을 쓰면 웹·macOS·iOS·Linux에서 웹뷰 없이 네이티브로 돌아가는 런타임이에요. AI 에이전트가 앱을 만들고 실행·관찰·테스트하도록 10개 공통 조작을 제공해요. 아직 1.0 이전이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

GitHub README의 앞부분(소개, 동작 방식, 첫 번째 원칙)을 읽고 옮겼어요. README가 길어 나머지 원칙, 빠른 시작, 지원 현황은 반영하지 못했어요.

### 무엇인가

**Exact**(expo/exact)는 "앱을 한 번 쓰면 웹, macOS, iOS, Linux에서 네이티브로 돌고, AI 에이전트가 각 플랫폼에서 빌드·실행·관찰·테스트할 수 있다"는 크로스플랫폼 애플리케이션 런타임이에요. GeekNews에는 "React 없이" 앱을 만드는 에이전트 중심 런타임으로 소개됐어요.

### 동작 방식

- 화면은 작은 선언형 언어 **Contract**로, 데이터 로직은 **TypeScript 또는 Rust**로 써요.
- Contract 컴파일러가 화면을 압축된 *plan*으로 바꿔요.
- 웹에서는 이 plan이 약 **20KB** 런타임 위의 ES 모듈 하나가 되어 실제 DOM을 움직여요.
- macOS·iOS·Linux에서는 Rust 러너가 같은 plan을 실행하고, Rust 레이아웃 커널이 CSS 규칙으로 모든 상자를 계산하며, 각 플랫폼이 AppKit, UIKit, GPU 페인터로 그려요.
- UI에 웹뷰도 JavaScript 브리지도 없고, 첫 픽셀 전에 앱 JavaScript가 돌지 않아요.

### 원칙 1: 에이전트 네이티브

코드 상당 부분을 AI 에이전트가 쓴다고 가정해요.

- **10개 조작이 모든 호스트에서 같아요.** `tree · screenshot · tap · type · state · layout · logs · clock · prefer · perf`를 `scripts/agent.mjs` 하나로 써요. 이전 세대 API가 80개로 불어난 걸 반성해 일부러 10개로 묶었어요.
- **시계는 에이전트가 쥐어요.** 애니메이션을 기다리지 않고 `clock +60000`처럼 시간을 넘겨 결과를 읽어 타이밍 문제가 없어요.
- 테스트(`app.test.contract`)는 이 조작들의 스크립트라 어느 호스트에서든 그대로 돌아요.
- `contract build --json`이 고정 id와 소스 범위가 있는 진단을 주고, 앱 전체가 컨텍스트 창에 들어가도록 Contract를 작게 유지해요.

### 시험 결과와 주의

README에 따르면 2026-10-04 깨끗한 클론에서 에이전트가 할 일 앱을 만들고 웹·macOS·iOS 시뮬레이터 테스트를 통과하기까지 약 57분이 걸렸고, 그중 약 25분은 첫 macOS·iOS 빌드였어요. Exact는 1.0 이전이라 API 안정성, 하위 호환, 마이그레이션 가이드가 없다고 밝혀요.
