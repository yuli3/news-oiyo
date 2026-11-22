---
id: trend-8313a8e83ab7bbb8
title: "Muru – AI-assisted Rust server for Python apps by mod_WSGI's creator"
sourceUrl: https://simonwillison.net/2026/Nov/21/muru
summary: "mod_wsgi를 만든 그레이엄 덤플턴이 AI 도움을 받아 만든 Rust 기반 Python 앱 서버 Muru를 사이먼 윌리슨이 소개했어요. ASGI·WSGI 앱을 개발과 운영 모두에서 돌리는 걸 목표로 하고, 3주 동안 개발기를 매일 공개했어요."
translationStatus: full
sourceShort: true
translatedBy: Claude
translatedAt: 2026-11-23
---

사이먼 윌리슨 블로그의 짧은 링크 글 전문을 읽고 옮겼어요.

### Muru란

그레이엄 덤플턴은 20년 전 mod_wsgi를 시작했고, 그 뒤로 Python 웹 앱을 운영 환경에서 서빙하는 이상적인 방법을 계속 고민해 왔어요. Muru는 그의 새 프로젝트로, AI의 도움을 받아 만든 Rust 서버예요. ASGI와 WSGI Python 앱을 개발과 운영 양쪽에서 돌리는 최선의 도구를 목표로 해요.

### 매일 쓴 개발기

덤플턴은 이전 프로젝트 wrapture 때처럼 개발 과정의 일부로 아주 자세한 기록을 공개하고 있어요. 최근 3주 동안 올린 글 제목만 봐도 범위가 보여요.

- mod_wsgi 20년과 그다음(11/4), Muru 첫인상(11/5)
- 워커 내부, 전체 구조, "한 번 import하고 여러 번 fork"
- 개발 환경 HTTPS, WSGI와 ASGI 함께 쓰기
- 재시작이 아닌 릴리스, 서비스 메시 없는 카나리 배포
- 컨테이너 속 더 나은 세입자, Kubernetes와 맞서지 않고 함께 일하기
- 워커 보고 기반 스케일링, 0까지 줄이기, 일정에 따른 오버레이
- 감지와 대응, 모든 페이지의 툴바, 툴바 속 트레이싱, 지연 import가 도움이 될 때(11/22)

### 'AI는 생활 방식의 선택'

윌리슨은 이 중 「AI as a lifestyle choice」를 특히 읽어 볼 만하다고 추천해요. 덤플턴은 AI가 겉으로는 많은 일을 하더라도 무엇이 아직 충분하지 않은지 판단하는 건 여전히 자기 몫이고, mod_wsgi로 20년간 틀려 본 경험이 그 판단에 쓸모 있다고 말해요. 자신도 믿고 다른 사람도 믿을 수 있는 수준이 될 때까지 Muru를 다듬겠다고 했어요.
