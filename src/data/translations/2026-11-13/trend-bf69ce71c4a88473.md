---
id: trend-bf69ce71c4a88473
title: "microsoft/playwright"
sourceUrl: https://github.com/microsoft/playwright
summary: "Playwright는 Chromium·Firefox·WebKit을 하나의 API로 다루는 웹 자동화·테스트 프레임워크예요. 테스트 러너뿐 아니라 코딩 에이전트용 CLI와 AI 에이전트용 MCP 서버도 제공해, 접근성 스냅샷으로 브라우저를 조작하게 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

GitHub 저장소 README를 읽고 옮겼어요. 가져온 본문이 글자 수 제한에 걸려 Playwright MCP 설정 안내 부분에서 끊겨, 그 뒤 내용(라이브러리 사용법 등)은 반영하지 못했어요.

### 무엇인가

**Playwright**는 웹 자동화와 테스트 프레임워크예요. Chromium, Firefox, WebKit을 하나의 API로 움직이고, 테스트, 스크립트, 그리고 **AI 에이전트의 도구**로 쓸 수 있어요.

### 쓰임새별 경로

- **Playwright Test**: 엔드투엔드 테스트 (`npm init playwright@latest`)
- **Playwright CLI**: Claude Code, Copilot 같은 코딩 에이전트용 (`npm i -g @playwright/cli@latest`)
- **Playwright MCP**: AI 에이전트·LLM 자동화용 (`npx @playwright/mcp@latest`)
- **Playwright Library**: 브라우저 자동화 스크립트 (`npm i playwright`)
- **VS Code 확장**: 테스트 작성과 디버깅

### Playwright Test의 핵심 기능

- **자동 대기와 웹 우선 단언**: 인위적인 타임아웃 없이 요소가 조작 가능해질 때까지 기다리고, 단언은 조건이 맞을 때까지 재시도해요.
- **로케이터**: 사용자가 보는 방식대로 요소를 찾아요(역할, 라벨, placeholder, test id).
- **테스트 격리**: 테스트마다 새 브라우저 컨텍스트를 써요. 로그인 상태를 한 번 저장해 다른 테스트에서 재사용할 수 있어요.
- **트레이싱**: 실패 시 실행 추적, 스크린샷, 영상을 남기고 Trace Viewer에서 모든 동작, DOM 스냅샷, 네트워크 요청, 콘솔 메시지를 볼 수 있어요.
- **병렬 실행**: 기본으로 설정된 모든 브라우저에서 병렬·헤드리스로 돌아요.

### 에이전트용 도구

- **Playwright CLI**: MCP보다 토큰 효율적이라고 소개해요. 큰 도구 스키마나 접근성 트리를 모델 컨텍스트에 싣지 않고 명령으로 처리해요. `playwright-cli show`로 실행 중인 모든 브라우저 세션의 실시간 화면을 대시보드로 보고 원격 조작도 할 수 있어요. 에이전트용 스킬도 설치할 수 있어요.
- **Playwright MCP**: Model Context Protocol로 AI 에이전트에 브라우저 전체 제어를 줘요. 구조화된 접근성 스냅샷으로 페이지를 다뤄서 비전 모델이나 스크린샷이 필요 없대요. VS Code, Cursor, Claude Desktop, Windsurf 등 MCP 클라이언트에 추가해 쓸 수 있어요.
