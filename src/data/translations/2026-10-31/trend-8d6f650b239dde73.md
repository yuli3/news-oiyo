---
id: trend-8d6f650b239dde73
title: "공식 Claude Code 확장 프로그램의 백도어"
sourceUrl: https://cyberplace.social/@GossiTheDog/117528831681803563
summary: "보안 연구자 Kevin Beaumont가 Mastodon에 Cursor의 Anthropic Claude Code 확장에 원격 접근 트로이목마를 심는 악성 코드가 들어 있다고 알렸어요. 이어진 글에서 2.1.314가 기존 백도어를 지우지 않는다며 수동 조치를 당부했어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

Mastodon 게시물과 같은 작성자의 이어진 스레드를 Mastodon 공개 API로 읽고 옮겼어요. 원문은 짧은 게시물 묶음이에요.

### 첫 게시물 (2026-10-30 08:07 UTC)

> Cursor의 Anthropic Visual Studio Claude Code 확장에 데스크톱에 원격 접근 트로이목마를 만드는 악성 코드가 들어 있어요.

Phorion의 보안 권고 글을 링크했어요. 수집 시점에 부스트 1,440회, 좋아요 982회, 답글 73개였어요.

### 이어진 스레드 요지

- 이 확장은 설치 수가 수백만이고 DevOps에서 가장 인기 있는 확장 중 하나이며, 역방향 SSH 백도어를 만든다고 했어요.
- 플러그인이 자동 업데이트되니 모든 조직이 영향을 받았을 거라고 봤어요.
- 문제 버전 2.1.313은 저장소에서 빠졌고 2.1.314가 '수정' 버전이에요.
- Cursor의 보안 공지 링크를 공유하고, 블로그 글(DoublePulsar)을 따로 썼어요.
- 공격자의 C2 서버는 이후 오프라인이 됐어요. C2는 피해 기기마다 호스트명, 사용자명, OS, 아키텍처, 홈 경로, 환경 변수 이름, 작업 디렉터리, Git 이메일을 수집했어요.
- 밤사이 나온 교체 버전은 이전 백도어와 정찰 흔적을 지우지 않는다고 확인했어요. 그래서 영향받은 VS Code와 Cursor 시스템을 모두 수동으로 조치해야 한다고 했어요.
- 바이낸스가 이 확장으로 Cursor에서 Claude Code를 쓴다는 걸 확인했다고 했고, Anthropic은 논평하지 않는다고 적었어요.
