---
id: trend-b00c8c3446d89ca0
title: "A2UI 1.0: Build delightful, fast, reliable, agentic experiences"
sourceUrl: https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences
summary: "구글이 에이전트가 텍스트 대신 앱의 네이티브 화면(카드·폼·선택기)으로 답하게 하는 오픈 프로토콜 A2UI의 첫 안정판 1.0을 냈어요. 양방향 함수 호출, 접근성 지원, React·Angular·Lit·Flutter·SwiftUI 렌더러와 TypeScript·Dart·Python 에이전트 SDK가 들어갔어요."
translationStatus: partial
translatedBy: Claude
translatedAt: 2026-11-24
---

구글 개발자 블로그의 1.0 발표 글(2026-11-11, Vishal Motwani·Google A2UI 팀)과 GitHub 저장소 README를 읽고 옮겼어요. 발표 글은 브라우저로 열어 핵심 문장을 확인했고, 세부 구조는 README를 기준으로 정리했어요.

### A2UI가 뭔가요

A2UI(Agent-to-User Interface)는 에이전트가 사용자에게 **텍스트뿐 아니라 앱의 네이티브 위젯으로** 답하게 하는 오픈소스 생성형 UI 프레임워크예요. 발표 글은 1.0을 "생성형 UI를 위한 오픈 프로토콜의 첫 안정판"이라고 불러요. 에이전트는 무엇을 보여 줄지만 설명하고, 화면은 각 앱이 자기 컴포넌트로 그려요.

핵심은 **UI를 코드가 아니라 데이터로 표현**한다는 점이에요.

- 에이전트와 렌더러가 주고받는 데이터에 스키마가 있고, 에이전트는 앱 개발자가 등록한 컴포넌트(카탈로그)만 배치·설정할 수 있어요.
- 임의 실행 코드를 허용하지 않아서, 원격·제3자 에이전트가 신뢰 경계를 넘나들 때도 앱의 중요한 기능을 환각으로부터 지킬 수 있다고 설명해요.
- 서버 측 데이터 바인딩을 쓰면 민감한 값이 모델에 아예 닿지 않아요.

### 1.0에서 달라진 점

- **안정 프로토콜**: 양방향 함수 호출이 들어가 항공권·예약 선택기 같은 화면이 그 자리에서 빈 좌석을 확인할 수 있어요. 접근성 지원과 부가 메타데이터용 확장도 추가됐어요.
- **렌더러**: 웹은 React·Angular·Lit, 모바일·웹·데스크톱은 Flutter, iOS는 SwiftUI, Android는 Jetpack Compose예요. Compose 렌더러는 아직 0.9.1이고 1.0은 곧 나온다고 해요. 웹·Flutter 렌더러는 MCP Apps 안에서도 돌아가요.
- **에이전트 SDK**: TypeScript·Dart·Python SDK가 새로 나왔어요. 스킬 생성, 메시지 변환, 오류 교정을 돕고, 바꿔 끼울 수 있는 추론 형식(예: A2UI Express)으로 지연을 줄인다고 해요. Python에는 컴포넌트를 프로그램으로 펼치고 데이터를 묶는 A2UI Macros가 있어요.

### 구조 (README 기준)

1. **추론**: 언어 모델이나 결정 모델이 A2UI 스킬의 지시를 받아 UI와 데이터를 기술해요.
2. **전송**: 에이전트 SDK가 모델 출력을 파싱·검증하고 매크로를 펼쳐 고정된 A2UI Transport 메시지로 바꿔요.
3. **렌더링**: 코어 라이브러리(`@a2ui/web_core` 등)가 메시지를 프레임워크 중립 표현으로 만들고, 어댑터(`@a2ui/react` 등)가 실제 위젯으로 그려요. `@a2ui/catalog-mcp`는 MCP 도구 결과에 담긴 A2UI 메시지를 렌더링해요.

### 누가 쓰나요

발표 글은 Atlassian(Jira에서 에이전트가 대화형 카드로 후속 질문), Alation(AIOS 피드를 MCP Apps로 Claude에 표시), ByteDance(Lynx용 렌더러), Bloomberg를 들어요. 구글 안에서는 Gemini Notebook이 A2UI 스타일 카드를 쓰고, Gemini Enterprise 에이전트는 1.0으로 올리는 중이에요.

### 다음 계획

README 로드맵은 프로토콜 1.1 요구사항 수집, 재사용 템플릿, 컴포넌트에 안전하게 로직을 붙이는 샌드박스, 생성 UI 품질 평가 도구, MCP Apps와 서로 끼워 넣기, 검증·코드 생성 CLI를 꼽아요. 라이선스는 Apache 2.0이에요.
