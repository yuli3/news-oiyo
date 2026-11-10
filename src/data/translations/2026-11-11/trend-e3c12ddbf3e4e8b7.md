---
id: trend-e3c12ddbf3e4e8b7
title: "blacklanternsecurity/bbot"
sourceUrl: https://github.com/blacklanternsecurity/bbot
summary: "BBOT(BEE·bot)는 Spiderfoot에서 영감을 받은 다목적 스캐너로, 정찰·버그 바운티·공격 표면 관리(ASM)를 자동화해요. 서브도메인 찾기에서 다른 도구보다 20~50% 더 찾는다고 하고, 3.0은 CLI·프리셋·API에 큰 변경이 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

GitHub 저장소 README 앞부분(설치와 예제 명령 두 가지)을 읽고 옮겼어요. 나머지는 읽지 않아 partial로 표시했어요. 이번 주 GitHub 트렌딩 수집 항목이에요. 스캐너는 허가받은 대상에만 써야 해요.

### BBOT

**BEE·bot**은 Spiderfoot에서 영감을 받은 **다목적 스캐너**로, 정찰(Recon), 버그 바운티, 공격 표면 관리(ASM)를 자동화하려고 만들었어요. README에는 실시간 스캔을 VivaGraphJS로 시각화한 영상이 있어요.

### 설치

```bash
# 안정 버전
pipx install bbot
# 개발 브랜치
pipx install --pip-args '\--pre' bbot
```

Docker 등 다른 방법은 Getting Started 문서에 있어요.

- **2.x에서 올리는 경우**: BBOT 3.0은 CLI, 프리셋, 모듈, 이벤트, Python API에 호환되지 않는 변경이 있어서, 올리기 전에 2.x → 3.0 마이그레이션 가이드를 보라고 해요.
- **속도 팁**: DNS 리졸버(blastdns)는 `/etc/resolv.conf`의 리졸버마다 여러 스레드를 띄워요. 필터링 없는 리졸버를 더 넣으면 스캔이 크게 빨라진다고 해요.

### 예제

**1) 서브도메인 찾기**: 패시브 API 소스와 재귀 DNS 브루트포스, 대상별 서브도메인 변형을 함께 써요.

```bash
bbot -t evilcorp.com -p subdomain-enum
# 패시브 소스만
bbot -t evilcorp.com -p subdomain-enum -rf passive
```

`subdomain-enum.yml` 프리셋은 `subdomain-enum` 플래그가 붙은 모든 모듈을 켜고, 결과를 TXT로 내보내며, DNS 스레드 25·브루트 스레드 1,000을 써요. API 키는 프리셋에 넣어요. README는 BBOT가 다른 도구보다 **20–50% 더 많은 서브도메인**을 찾고, 도메인이 클수록 차이가 커진다고 주장해요.

**2) 웹 스파이더**: `bbot -t evilcorp.com -p spider`로 사이트를 재귀적으로 크롤링하며 이메일 등을 뽑아요.
