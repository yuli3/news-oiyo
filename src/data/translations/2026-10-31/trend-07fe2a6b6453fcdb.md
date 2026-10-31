---
id: trend-07fe2a6b6453fcdb
title: "Show GN: 컷팩(Cutfac) - Claude Code/Codex로 숏폼 만들 때 쓰는 오픈소스 비디오 에디터"
sourceUrl: https://github.com/cutfac/cutfac
summary: "컷팩(Cutfac)은 내 코딩 에이전트(Claude Code·Codex 등)가 숏폼 영상을 만들고, 사용자는 바꿀 부분을 가리키기만 하는 로컬 우선 영상 스튜디오예요. MCP 서버, 로컬 API, 데스크톱 보드로 구성되고 서명된 Mac 앱도 받을 수 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

GitHub README 앞부분을 읽고 옮겼어요.

### 무엇인가

**Cutfac**은 숏폼 영상을 위한 로컬 우선 스튜디오예요. 저장소 설명은 "MCP 서버, 로컬 API, 채팅으로 영상을 편집하는 데스크톱 보드"예요. 영상은 사용자의 코딩 에이전트가 만들고, 사용자는 바꿀 곳을 가리켜요. 서명된 Mac 앱을 받거나 저장소에서 직접 빌드할 수 있고, 둘 다 모든 기능을 갖춰요.

### 기능

- **가리켜서 고치기**: 타임라인 일부를 고르거나 영상 위에 상자를 그린 뒤 무엇을 바꿀지 말해요. 전후를 비교하고 유지하거나 되돌려요.
- **버전 요청**: 한 가지 변경에 대해 여러 테이크를 받아 가장 좋은 걸 골라요.
- **보드 하나**: 초안부터 검토, 완료까지 모든 영상을 한 보드에서 관리해요.
- **링크로 템플릿 만들기**: 게시물, 저장소, Agent Skill을 재사용 가능한 템플릿으로 바꿔요.
- **제품 가르치기**: 링크를 붙여 넣어 내 제품을 알려 줄 수 있어요(README에서 이어지는 설명은 읽지 못했어요).

### 저장소 구성

커밋이 700개가 넘고 Electron 앱, 웹, `skills/cutfac` 에이전트 스킬, MCP 등록용 `glama.json`, 한국어 기여 동의서(ICLA·CCLA) 등이 들어 있어요. README의 설치와 아키텍처 설명은 이 번역에 담지 못했어요.
