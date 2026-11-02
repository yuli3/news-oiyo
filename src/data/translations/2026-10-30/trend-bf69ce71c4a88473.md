---
id: trend-bf69ce71c4a88473
title: "microsoft/playwright"
sourceUrl: https://github.com/microsoft/playwright
summary: 마이크로소프트의 웹 자동화·테스트 프레임워크 플레이라이트예요. 크로미움·파이어폭스·웹킷을 API 하나로 다루고, 테스트 러너 외에 코딩 에이전트용 CLI와 AI 에이전트용 MCP 서버도 제공해요. CLI는 MCP보다 토큰을 덜 쓴다고 소개해요.
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

GitHub 트렌딩에 오른 **플레이라이트(Playwright)** 저장소의 README를 우리말로 옮겼어요.

### 플레이라이트는 무엇인가요

웹 자동화와 테스트를 위한 프레임워크예요. **크로미움, 파이어폭스, 웹킷**을 API 하나로 움직이고, 테스트 코드와 스크립트는 물론 **AI 에이전트의 도구**로도 쓸 수 있다고 소개해요.

### 쓰는 방식 고르기

| 방식 | 잘 맞는 곳 | 설치 |
|---|---|---|
| Playwright Test | 엔드투엔드 테스트 | `npm init playwright@latest` |
| Playwright CLI | 코딩 에이전트(Claude Code, Copilot) | `npm i -g @playwright/cli@latest` |
| Playwright MCP | AI 에이전트, LLM 기반 자동화 | `npx @playwright/mcp@latest` |
| Playwright Library | 브라우저 자동화 스크립트 | `npm i playwright` |
| VS Code 확장 | VS Code에서 테스트 작성·디버깅 | 마켓플레이스 |

### Playwright Test

엔드투엔드 테스트용 테스트 러너예요. 세 브라우저에서 **완전한 격리, 자동 대기, 웹 우선 단언(assertion)**으로 테스트를 돌려요. 기본은 헤드리스 모드로 병렬 실행하고, 테스트마다 새 브라우저 컨텍스트를 줘서 오버헤드는 거의 없이 격리해요.

- **자동 대기**: 임의의 타임아웃 없이 요소가 조작 가능해질 때까지 기다리고, 단언은 조건이 맞을 때까지 자동으로 다시 시도해요.
- **로케이터**: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`처럼 사용자가 화면을 보는 방식에 가까운 선택자를 써요.
- **테스트 격리**: 로그인 상태를 한 번 저장(`storageState`)해서 다른 테스트에 재사용할 수 있어요.
- **트레이싱**: 실패할 때 실행 기록, 스크린샷, 영상을 남기고, Trace Viewer에서 동작·DOM 스냅샷·네트워크 요청·콘솔 메시지를 하나하나 볼 수 있어요.

### Playwright CLI

**코딩 에이전트용** 브라우저 자동화 명령줄 도구예요. 큰 도구 스키마나 접근성 트리를 모델 컨텍스트에 싣지 않아서 **MCP보다 토큰 효율이 좋다**고 설명해요. `playwright-cli install --skills`로 에이전트용 스킬을 깔 수 있고, 에이전트에게 "이 흐름을 playwright-cli로 테스트하고 스크린샷을 남겨"처럼 맡기거나 `open`, `type`, `press`, `screenshot` 명령을 직접 쓸 수 있어요. `playwright-cli show`는 실행 중인 브라우저 세션을 실시간 화면으로 보여 주고, 클릭하면 원격으로 조작할 수도 있어요.

### Playwright MCP

모델 컨텍스트 프로토콜(MCP)로 **AI 에이전트에게 브라우저 제어권 전체**를 주는 서버예요. 에이전트는 구조화된 **접근성 스냅샷**으로 페이지와 상호작용해서, 비전 모델이나 스크린샷이 필요 없어요. VS Code, Cursor, Claude Desktop, Windsurf 같은 MCP 클라이언트 설정에 `npx @playwright/mcp@latest`를 등록하면 돼요.
