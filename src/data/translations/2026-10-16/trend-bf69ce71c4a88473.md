---
id: trend-bf69ce71c4a88473
title: "microsoft/playwright"
sourceUrl: "https://github.com/microsoft/playwright"
summary: "Playwright는 Chromium·Firefox·WebKit을 하나의 API로 다루는 웹 자동화·테스트 프레임워크예요. 테스트 러너뿐 아니라 코딩 에이전트용 CLI, AI 에이전트용 MCP 서버, 라이브러리, VS Code 확장을 함께 제공해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

GitHub README 원문 앞부분(소개, Playwright Test, Playwright CLI 일부)만 읽고 옮겼어요. MCP와 라이브러리 설명 등 뒷부분은 읽지 않아 `partial`로 표시해요.

### 무엇인가
Playwright는 웹 자동화와 테스트용 프레임워크예요. Chromium, Firefox, WebKit을 하나의 API로 움직이고, 테스트, 스크립트, 그리고 **AI 에이전트용 도구**로 쓸 수 있어요.

### 용도별 시작 방법
- **Playwright Test**(E2E 테스트): `npm init playwright@latest`
- **Playwright CLI**(Claude Code, Copilot 같은 코딩 에이전트): `npm i -g @playwright/cli@latest`
- **Playwright MCP**(AI 에이전트·LLM 기반 자동화): `npx @playwright/mcp@latest`
- **Playwright Library**(브라우저 자동화 스크립트): `npm i playwright`
- **VS Code 확장**(테스트 작성·디버깅)

### Playwright Test
E2E 테스트용 전체 기능 테스트 러너예요. 세 브라우저에서 완전한 격리, 자동 대기, 웹 우선 단언으로 테스트를 돌려요. `npx playwright test`를 실행하면 설정된 모든 브라우저에서 기본 headless로 병렬 실행되고, 테스트마다 새 브라우저 컨텍스트를 거의 오버헤드 없이 받아요.

핵심 기능은 이래요.

- **자동 대기와 웹 우선 단언**: 인위적인 타임아웃 없이 요소가 조작 가능해질 때까지 기다리고, 단언은 조건이 맞을 때까지 자동으로 재시도해요.
- **Locator**: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`처럼 사용자가 페이지를 보는 방식을 닮은 견고한 선택자를 써요.
- **테스트 격리**: 테스트마다 새 브라우저 프로필에 해당하는 컨텍스트에서 돌아요. 로그인 상태를 `storageState`로 한 번 저장해 다른 테스트에서 재사용할 수 있어요.
- **트레이싱**: 실패 시 실행 트레이스, 스크린샷, 영상을 남기고 Trace Viewer에서 모든 동작, DOM 스냅샷, 네트워크 요청, 콘솔 메시지를 볼 수 있어요.
- **병렬 실행**이 기본이에요.

### Playwright CLI
코딩 에이전트를 위해 만든 브라우저 자동화 CLI예요. 큰 도구 스키마와 접근성 트리를 모델 컨텍스트에 올리지 않아서 **MCP보다 토큰 효율이 좋다**고 해요. `playwright-cli install --skills`로 에이전트 연동용 스킬을 설치할 수 있고, 에이전트에게 "playwright-cli로 todomvc 데모의 할 일 추가 흐름을 테스트하고 성공·실패 시나리오마다 스크린샷을 찍어 줘"처럼 작업을 맡기는 예시를 보여 줘요.
