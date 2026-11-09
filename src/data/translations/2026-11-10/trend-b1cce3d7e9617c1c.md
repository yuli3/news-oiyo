---
id: trend-b1cce3d7e9617c1c
title: "Show HN: Recalc – Spreadsheet where cells can be Claude Code or Codex terminals"
sourceUrl: https://github.com/sshah03/recalc
summary: "recalc는 셀마다 값, 수식, 터미널 명령, Claude Code나 Codex 에이전트를 넣을 수 있는 오픈소스 스프레드시트예요. 에이전트가 셀을 채우는 걸 보며 셀을 고쳐 지시하고, 테스트 셀로 \"완료\"를 검증할 수 있어요. 아직 초기 베타예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

GitHub 저장소 `sshah03/recalc` README의 앞부분을 읽고 옮겼어요. 가이드와 예제 전체는 읽지 못해 `partial`이에요.

### 무엇인가요

recalc는 "하네스들의 하네스"로 쓰는 스프레드시트예요. 모든 셀이 각자 터미널이 될 수 있어요. macOS에서 돌고 Linux는 실험적이며, Claude Code·Codex와 pi(실험적)를 지원해요. 무료 오픈소스이고 내 컴퓨터에서 실행돼요.

작성자는 Claude Code나 Codex가 Excel·Google Sheets를 조작하게 할 수도 있지만, 에이전트 시대에 맞춰 스프레드시트를 처음부터 다시 상상해 보고 싶었다고 해요. 아주 초기 베타라 버그와 호환성 깨짐이 있을 수 있으니 중요한 건 사본을 두라고 당부해요.

### 어떻게 동작하나요

사람과 에이전트가 하나의 그리드를 같이 써요. 셀에는 숫자, 수식, 터미널 명령, AI 에이전트가 들어가요. 에이전트는 계획과 결과를 셀에 쓰고, 다른 셀의 명령이 그 결과를 검사해 문제가 있으면 빨갛게 바뀌어요. 바꾸고 싶은 게 있으면 채팅을 끊지 않고 셀을 고치면 돼요. 각 에이전트는 MCP 서버로 recalc 사용법을 알아요.

### 쓰임새

- **에이전트의 "완료" 확인**: 에이전트가 끝났다고 쓰는 셀 옆에 테스트 셀을 두면 코드가 바뀔 때마다 다시 돌아요. 테스트가 실패하는데 완료라고 하면 바로 보이고, 행이 초록이 될 때까지 Claude Code 세션이 끝나지 않게 할 수도 있어요.
- **문서 100개에 같은 질문**: 왼쪽에 파일, 위쪽에 질문을 두고 Run을 누르면 에이전트가 모든 셀에 답하고, 각 답은 근거 문단으로 연결돼요. 확인한 답은 표시해 두면 에이전트가 덮어쓰지 못하고, Excel로 내보낼 수 있어요.
- **여러 에이전트 동시 관리**: 에이전트마다 행을 하나씩 주고 한 화면에서 지켜봐요.
