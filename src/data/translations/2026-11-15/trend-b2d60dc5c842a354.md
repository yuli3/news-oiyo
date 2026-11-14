---
id: trend-b2d60dc5c842a354
title: "Show HN: A terminal-native idle factory game, written in Rust with ratatui"
sourceUrl: https://gitlab.com/snipedbywifi/terminactory
summary: "터미널에서 돌아가는 방치형 공장 게임 terminactory가 Show HN에 올라왔어요. 긴 에이전트 작업을 기다리며 하라는 취지이고, Claude Code 훅으로 에이전트 응답을 게임 속 '전보'로 받아 볼 수 있어요. 작성자는 AI 도움을 많이 받았다고 밝혔어요."
translationStatus: blocked
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

GitLab 저장소 페이지는 자동 수집으로 프로젝트 메타 정보(커밋 212개, Apache License 2.0, 2026-11-12 생성)만 읽혔고 README 본문은 읽지 못했어요. 그래서 **작성자가 Hacker News에 직접 쓴 Show HN 소개글**을 기준으로 옮겼어요.

### 어떤 게임인가

- 이름은 **terminactory**, Rust와 ratatui로 만든 **터미널 네이티브 공장 게임**이에요.
- 작성자(snipedbywifi)는 "긴 에이전트 작업이 끝나길 기다리는 동안 편하게 할 공장 게임"으로 소개해요. 에이전트를 돌려 두고 둠스크롤링하는 대신 하라는 거예요.
- 공장 게임이 흔한 장르라는 건 본인도 인정하지만, 터미널에서 돌아가는 공장 게임을 원해서 시작했다고 해요.

### 만든 방식

작성자는 "최신 5.5 Claude 모델"과 함께 마음에 드는 기본 틀을 만든 뒤 기능을 계속 붙이고 작은 결함을 고쳤다고 해요. **AI 도움을 많이 받았다**는 점을 따로 밝혔어요.

### 기능

- 건설, 삭제, 수익 측정, 기본 선택 도구 같은 공장 게임 기본 기능이 있어요.
- **Claude Code 훅**을 붙여 에이전트의 응답을 게임 속 "전보(telegram)"로 받아서, 게임 안에서 작업 진행 상황을 검토할 수 있어요.
- 게임 속 가짜 브라우저가 있고, 그 안에 위키와 가짜 포럼, 그리고 아주 많은 설정(lore)이 숨어 있어요.
- 아이템이나 연구 포인트(RP)가 얼마나 있어야 무엇을 해금하는지 보여 주는 연구 그래프와 편의 기능도 있어요.

작성자는 이런 게임이 필요한 사람에게 추가 아이디어를 묻고 있어요. 첫 HN 글이라고 해요.
