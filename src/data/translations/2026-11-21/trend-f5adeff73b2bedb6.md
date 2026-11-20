---
id: trend-f5adeff73b2bedb6
title: "Show HN: OpenComputer – an open source alternative to Devin"
sourceUrl: https://github.com/diggerhq/opencomputer
summary: "OpenComputer는 Slack에서 @Computer로 일을 맡기면 격리된 자기 컴퓨터에서 작업해 PR로 돌려주는 오픈소스·셀프호스팅 Devin 대안이에요. 자체 벤치마크에서 Devin보다 PR을 3.3배 빨리 연다고 해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

diggerhq/opencomputer 깃허브 README 전체를 읽고 옮겼어요. Apache 2.0 라이선스이고, 읽은 시점 기준 별 696개, 포크 78개예요.

### 무엇인가

- "Slack에서 팀과 함께 일하는 코딩 에이전트"를 내세운 오픈소스 Devin 대안이에요. Slack 스레드에서 @Computer를 멘션하고 일을 주면 에이전트가 자기 컴퓨터에서 작업하고, 팀이 진행을 보며 방향을 틀 수 있고, 결과는 풀 리퀘스트로 도착해요.
- 컴퓨트 계층부터 오픈소스라 전부 자기 클라우드 계정에서 돌릴 수도 있고, OpenComputer Cloud로 2분 만에 시작할 수도 있어요.
- 노트북의 Claude Code만큼 빠르게 느껴지도록 만들었다고 해요.

### 구조

- 전체 스택이 VM 하나에서 돌아가고, 아웃바운드만 허용하도록 잠그는 걸 권해요.
- VM에서 게이트웨이 'Calvin'이 Slack 이벤트를 듣고 설정에 따라 Claude Code, Codex, OpenCode 세션을 시작해요. 세션은 rootless Podman으로 격리되고, 상태는 VM 로컬 디스크에 먼저 쓰인 뒤 git 기반 저장소에 영구 저장돼요.
- 나머지는 Cloudflare Workers와 Durable Objects에서 돌아가요. Fly 등 다른 플랫폼 지원은 준비 중이에요.

### 클라우드 버전과 벤치마크 주장

- Devin보다 3.3배 빠르다고 해요. 4개 PR이 CI 통과 상태로 열리기까지 56초 대 185초였다고 해요.
- 인기 클라우드 에이전트 4개 평균보다 2.6배 빠르다고 해요. 첫 push까지 24초 대 평균 62초예요.
- 600분 작업 시간이 포함된 3일 무료 체험을 주고, 자기 ChatGPT/Codex 구독을 연결할 수 있어요.

벤치마크 수치는 프로젝트가 직접 밝힌 것이고 독립 검증 결과는 아니에요. 저장소에는 agent, cli, cloudflare-workers, sdks, web 등의 폴더와 셀프호스팅 문서(SELFHOSTING.md)가 있어요.
