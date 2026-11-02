---
id: trend-675c81a2e961cafe
title: "cli/cli"
sourceUrl: https://github.com/cli/cli
summary: "GitHub CLI(gh)는 풀 리퀘스트, 이슈 등 GitHub 기능을 터미널로 가져오는 공식 명령줄 도구예요. 최근 README엔 코딩 에이전트가 gh를 다루게 하는 '에이전트 스킬'(gh skill install)과 Linux 저장소 PGP 키 교체 안내가 올라와 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> GitHub 저장소 첫 화면과 README 앞부분을 기준으로 정리했어요.

### 무엇인가

**GitHub CLI(gh)**는 명령줄에서 쓰는 GitHub이에요. git과 코드로 작업하는 터미널 바로 옆에 풀 리퀘스트, 이슈 같은 GitHub 개념을 가져와요. GitHub.com, GitHub Enterprise Cloud, 지원되는 Enterprise Server 버전에서 쓸 수 있고 macOS·Windows·Linux를 지원해요.

### 눈에 띄는 최근 안내

- **Linux 패키지 저장소 PGP 서명 키 교체**가 2026년 9월 5일부터 적용됐어요. 설치·업데이트 문제가 있으면 공개 공지를 보래요.
- **에이전트 스킬**: 코딩 에이전트가 gh를 쓰도록 하는 스킬이 있어요.

```bash
gh skill install cli/cli gh --scope user
gh skill update gh
```

- v2.93.0부터 릴리스가 **불변(immutable) 릴리스**로 게시돼 바이너리 검증 방법이 안내돼 있어요.

### 설치

| 플랫폼 | 방법 |
|---|---|
| macOS | Homebrew, 릴리스 페이지 바이너리 |
| Linux·Unix | Debian/Ubuntu/Raspberry Pi, Amazon Linux/CentOS/Fedora/openSUSE/RHEL/SUSE |
| Windows | WinGet, 릴리스 바이너리 |
| Codespaces | devcontainer `github-cli` 기능 |
| GitHub Actions | 호스팅 러너에 기본 설치, 매주 업데이트 |

소스에서 빌드하는 방법과 기여 가이드도 저장소에 있어요.
