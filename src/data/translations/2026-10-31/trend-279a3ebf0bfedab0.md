---
id: trend-279a3ebf0bfedab0
title: "Show GN: Vicem - 로컬 AI 코딩 에이전트 간 작업 컨텍스트를 전달하는 CLI/GUI 도구"
sourceUrl: https://github.com/RAKKUNN/vicem
summary: "Vicem은 Claude Code, Cursor, Codex CLI, Gemini CLI 등 로컬 코딩 에이전트 사이에서 작업 맥락을 넘겨 주는 CLI·GUI 도구예요. AST 기반 코드 골격화로 세션을 80–99% 줄인 .vicem/BATON.md를 만들고, 필요할 때 MCP로 원문 코드를 되살려요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

GitHub README 앞부분을 읽고 옮겼어요.

### 해결하려는 문제

기능을 만들다가 Claude Code의 5시간 한도에 걸리거나, 컨텍스트가 15만 토큰을 넘으면서 Cursor나 Codex가 느려지는 상황을 겨냥해요. 부제는 "맥락은 다이어트하고, 바통은 넘겨라(Diet the Context, Pass the Baton)"예요.

### 무엇을 하나

- 진행 중인 코딩 세션을 **80–99%** 압축해요. 결정론적인 AST 코드 골격화와 MCP 온디맨드 복원(rehydration)을 써요.
- 정리된 `.vicem/BATON.md`를 Claude Code, Cursor, Codex CLI, Gemini CLI, Windsurf, Antigravity IDE, 웹 AI로 3초 안에 넘겨요.
- npm 의존성 0개, 네트워크 호출 0회를 내세워요.

### 쓰는 법

- `npx`로 설치 없이 GUI를 띄우거나 바로 바통을 넘길 수 있어요.
- Claude Code, Codex, Cursor에 에이전트 스킬과 MCP 서버로 한 줄에 추가할 수 있어요.
- GUI는 3단계예요. ① 원본 대화와 추출된 목표 확인·수정 ② 받을 에이전트와 전달 방식(앱 열기, 터미널 열기, 준비만) 선택 ③ 쓰거나 실행하기 전에 BATON.md 요약 검토. 자동 실행이 안 되면 경로와 이어 갈 명령, 시작 프롬프트를 복사할 수 있어요.

### 손실 없는 골격화

LLM 요약은 정확한 타입 계약을 잊어버리기 쉬워요. Vicem은 import, 타입, 시그니처를 BATON.md에 100% 남기고, 바뀌지 않은 12줄 이상의 함수 본문만 `.vicem/ledger.json`으로 접어 둬요. 받는 에이전트가 실제로 그 함수를 고쳐야 할 때 `vicem_rehydrate("src/auth.ts", "verifySessionToken")` 같은 MCP 도구로 원래 줄을 그대로 불러와요. README의 나머지 부분은 이 번역에 담지 못했어요.
