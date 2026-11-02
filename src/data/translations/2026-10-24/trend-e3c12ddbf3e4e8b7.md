---
id: trend-e3c12ddbf3e4e8b7
title: "blacklanternsecurity/bbot"
sourceUrl: https://github.com/blacklanternsecurity/bbot
summary: "BBOT(BEE·bot)는 Spiderfoot에서 영감을 받은 재귀형 인터넷 스캐너로, 정찰·버그바운티·공격표면관리(ASM)를 자동화해요. 서브도메인 찾기, 웹 스파이더, 이메일 수집, 웹 스캔 프리셋이 있고, 3.0은 2.x와 호환되지 않는 변경을 담았어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> GitHub 트렌딩에 오른 저장소예요. README 앞부분을 기준으로 옮겼어요. 보안 점검 도구라 **허가받은 대상**에만 써야 해요.

### 무엇인가

**BBOT(BEE·bot)**은 해커를 위한 **재귀형 인터넷 스캐너**예요. Spiderfoot에서 영감을 받았고, **정찰(Recon), 버그바운티, 공격표면관리(ASM)**를 자동화하려고 만들었어요.

### 설치

- 안정 버전: `pipx install bbot`
- 개발 브랜치: `pipx install --pip-args '\--pre' bbot`
- Docker 등 다른 방법은 Getting Started 문서에 있어요.
- **2.x에서 올리는 경우**: 3.0에는 CLI, 프리셋, 모듈, 이벤트, Python API에 호환되지 않는 변경이 있어 마이그레이션 가이드를 먼저 보라고 해요.
- **속도 팁**: DNS 리졸버(blastdns)가 /etc/resolv.conf의 리졸버마다 여러 스레드를 띄우므로, 필터링 없는 리졸버를 더 넣으면 스캔이 크게 빨라진대요.

### 대표 프리셋

| 프리셋 | 하는 일 |
|---|---|
| subdomain-enum | 패시브 API 소스 + 대상 맞춤 변형을 쓴 재귀 DNS 브루트포스로 서브도메인 찾기(`-rf passive`로 패시브만) |
| spider | 재귀 웹 크롤링으로 이메일 등 추출. 로그아웃 링크는 세션을 깨지 않게 제외 |
| email-enum | 무료 API와 스크래핑으로 이메일 수집 |
| web | 대상 웹에 가벼운/무거운 스캔 |

프로젝트는 BBOT가 다른 도구보다 서브도메인을 **20~50% 더** 찾고, 도메인이 클수록 차이가 커진다고 주장해요(자체 주장이에요). 이후 예시와 모듈 목록은 다 읽지 못했어요.
