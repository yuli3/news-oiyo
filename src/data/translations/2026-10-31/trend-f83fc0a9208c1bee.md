---
id: trend-f83fc0a9208c1bee
title: "Show GN: Shellside - Claude Code가 상주하는 생성형 캔버스, 요청하면 나만의 도구·앱·워크플로우를 즉석에서 생성"
sourceUrl: https://github.com/NAMYUNWOO/Shellside
summary: "Shellside는 터미널 옆에 캔버스 보드를 두고 Claude Code 같은 CLI 에이전트와 사용자가 체크리스트·폼·표·React 앱을 함께 쓰게 하는 개념 증명 프로젝트예요. 모든 도구는 JSON 스펙과 상태로 표현되고, 에이전트는 위험한 단계 전에 멈춰 물어봐요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

GitHub README 앞부분을 읽고 옮겼어요.

### 문제의식

Claude Code 같은 CLI 에이전트는 실제 일을 하지만, 사용자와 소통하는 창구는 터미널 텍스트뿐이에요. 입력은 긴 프롬프트와 y/n 질문이고, 진행 상황은 스크롤 속에 묻히고, 터미널 밖의 것은 복사해 붙여 넣어야 해요.

### Shellside가 주는 것

모든 터미널 에이전트에게 **보드**를 줘요.

- 에이전트가 보드 위에 체크리스트, 폼, 표, 완전한 React 앱을 만들어요.
- 사용자가 바꾼 내용을 에이전트가 읽고, 작업하면서 진행 상황을 보고해요.
- 위험한 단계 전에는 멈추고 사용자에게 물어봐요.
- 모든 도구는 JSON(스펙과 상태)이라 사용자와 에이전트가 같은 대상을 읽고 고쳐요.

### 상태와 데모

- **개념 증명(proof of concept)** 단계예요. 로컬에서 돌고, 보드 하나에 Claude Code 세션 하나예요. 써 보기 전에 README의 보안 항목을 먼저 보라고 해요.
- 데모 영상(37초)에서는 보드 터미널의 Claude Code가 보드 브라우저로 페이지를 열고, 요청에 맞춰 표 앱과 차트 앱을 만들어 서로 연결해요.

### 보드의 터미널

보드마다 wterm으로 그린 실제 셸 터미널이 있어요. "Start Claude Code"를 누르면 이미 이 보드에 연결된 상태로 Claude Code가 시작돼요. README의 나머지 설명은 이 번역에 담지 못했어요.
