---
id: trend-cad29e3cc1177331
title: "GPT-5.6 Sol can beat Factorio on peaceful mode"
sourceUrl: https://ryanmadden.net/gpt-56-beats-factorio
summary: "Ryan Madden이 Codex에서 낮은 사고 수준으로 돌린 GPT-5.6 Sol이 적 없는 평화 모드 Factorio를 게임 시간 13.5시간 만에 끝냈다고 밝혔어요. 후반엔 생산 라인 연결에 실패해 물자를 손으로 나르며 로켓을 쐈어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

Ryan Madden의 블로그 글 전체를 읽고 옮겼어요. 원문 자체가 짧은 글이에요.

### 무엇을 했나

필자는 Codex에서 **낮은 사고 수준(low thinking)**으로 돌린 GPT-5.6 Sol에게 평화 모드(바이터 없음) Factorio를 맡겼고, 게임 시간 **13.5시간** 만에 클리어했어요. 전체 타임랩스는 YouTube에 있어요.

이전 글(Claude Code로 Factorio 하기, Faketorio 에이전트 테스트베드 등)처럼 게임 매니저가 작은 라이브러리로 모델과 게임을 이어 줬어요. 이번엔 Bash가 아니라 **Python** 라이브러리였고, 플레이어의 손이 닿는 거리나 전장의 안개처럼 사람이 GUI로 겪는 제약을 똑같이 걸었어요.

### 관찰

- Sol은 어떤 면에서는 기대 이상이었고, 다른 면에서는 약점이 뚜렷했어요.
- 원래 청색 과학 연구까지만 돌릴 계획이었지만 예상보다 잘해서 계속 돌렸어요. 청색 과학 단계에서 날 거라 생각한 확장 문제는 더 뒤에 나타나 진행을 크게 늦췄어요.
- 로켓 발사는 후반에 일부 생산 시스템을 잇지 못한 실패를 Sol이 **공장 구역 사이로 물자를 반복해서 나르는 '수작업'**으로 메워서 이뤘어요.
- 그래도 **운송 벨트를 아예 못 쓰던 GPT-5.5** 때보다 나아져 만족한다고 해요.

### 필자의 생각

필자는 자율 Factorio 플레이가 모델 능력에 대한 직관을 쌓는 좋은 매체라고 봐요. Factorio는 여러모로 프로그래밍과 닮았지만 일반 관찰자도 훨씬 알아보기 쉬워서 모델 행동을 이야기할 공통 기반이 돼요. 실행 매니저가 모은 자원 생산 통계 차트(과학 연구 이정표 표시)도 공개했고, 해설 영상과 다른 모델·사고 수준, 적이 있는 모드 실험을 이어 갈 계획이에요.
