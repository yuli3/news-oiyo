---
id: trend-4c6bd26b0a01ca90
title: "jesseduffield/lazygit"
sourceUrl: https://github.com/jesseduffield/lazygit
summary: "lazygit은 git 명령을 터미널 화면에서 쉽게 쓰게 해 주는 TUI 도구예요. 줄 단위 스테이징, 인터랙티브 리베이스, 체리픽, bisect 등을 단축키로 처리해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

### 어떤 도구인가

**lazygit**은 git 명령을 위한 **간단한 터미널 UI**예요. 만든 사람은 git이 강력하지만 일상에서 쓰기 너무 번거롭다고 말해요. TODO 파일을 고쳐야 하는 인터랙티브 리베이스나, 파일 일부만 스테이징하려고 패치 파일을 손으로 편집하는 일 같은 거예요.

### 주요 기능

- **부분 스테이징**: 변경 파일에서 0을 누르면 diff로 이동하고, 덩어리(hunk)나 줄 단위로 골라 스테이징해요. c로 바로 커밋해요.
- **인터랙티브 리베이스**: i로 시작해 squash(s), fixup(f), drop(d), edit(e), 순서 이동을 단축키로 처리해요.
- **체리픽**: shift+c로 복사하고 shift+v로 붙여 넣어요.
- **bisect**: b로 좋은/나쁜 커밋을 표시해요.
- **작업 트리 초기화**: shift+d로 리셋 메뉴를 열어요.
- 오래된 커밋 수정, 필터, 사용자 명령, 워크트리, 실행 취소, 커밋 그래프, 두 커밋 비교도 지원해요.

### 설치

Homebrew, Scoop, Winget, 여러 Linux 배포판 패키지, Go 등으로 설치할 수 있어요.

> README 앞부분만 읽었어요.
