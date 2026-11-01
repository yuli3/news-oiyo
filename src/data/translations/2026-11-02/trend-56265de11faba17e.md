---
id: trend-56265de11faba17e
title: "DeepSeek: Exploring Super-agent Design: Towards a More Autonomous Agent System"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xl1zn3/deepseek_exploring_superagent_design_towards_a
summary: "DeepSeek Harness 팀이 X 아티클 'Exploring Super-agent Design'을 냈고, 일부 설계를 담은 연구용 프로토타입 dsh-superagent를 GitHub에 공개했어요. 한 저장소를 맡아 요청이 오면 일하고 PR로 답하는 능동형 코딩 에이전트예요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

Reddit 글은 링크 두 개뿐이라, RSS 본문과 링크된 GitHub 저장소 README를 읽고 옮겼어요. X 아티클 본문은 읽지 않았어요.

### Reddit 글

r/LocalLLaMA 글은 DeepSeek Harness의 X 아티클 **"Exploring Super-agent Design: Towards a More Autonomous Agent System"** 링크와, 그 설계 일부를 구현한 `dsh-superagent-prototype` 저장소를 소개해요. 이 플러그인은 기술적 접근을 검증하는 **프로토타입일 뿐 공식 DeepSeek 제품이 아니래요.**

### README가 밝힌 내용

- **참고용 연구 프로토타입**이에요. 팀의 일상 개발에서 자랐고, 엔지니어링의 상당 부분을 **코딩 에이전트가** 했대요. 버그가 있을 수 있고 코드 스타일도 일관되지 않을 수 있으니 검토 후 쓰라고 해요.
- 공개용으로 손봤기 때문에 내부 버전이나 아티클의 구현과 같지 않고, 아티클의 일부 설계는 미래 방향일 뿐 구현돼 있지 않아요.
- **dsh-superagent**는 GitHub 저장소 하나를 맡는 **능동형 코딩 에이전트**로, DeepSeek Harness용 번들이에요. GitHub와 선택적으로 Feishu를 듣고, 허용된 사람이 일을 요청하면 작업 항목을 열어 자기 세션과 디렉터리에서 일한 뒤 원래 대화에 PR 같은 결과로 답해요. 웹 패널이 사람이 처리할 일을 보여 줘요.
- 원칙은 **사람의 주의를 최대한 적게 쓰고 가치는 최대한 주는 것**이에요. 팀 전체를 대신할 수 있는 에이전트는 팀 전체의 주의도 낭비할 수 있어서, 요청받았거나 팀이 쓴 규칙이 허용할 때만 움직이고, 누군가 행동해야 하거나 결과를 쓸 수 있을 때만 말한대요.
- 설치 단계가 많아 "SETUP.md를 읽고 함께 설정해 줘"라고 코딩 에이전트에게 맡기는 방식을 권해요.
