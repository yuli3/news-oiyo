---
id: trend-675c81a2e961cafe
title: "cli/cli"
sourceUrl: https://github.com/cli/cli
summary: "GitHub 공식 명령줄 도구 gh의 저장소예요. 풀 리퀘스트와 이슈 같은 GitHub 기능을 터미널로 가져오고, 코딩 에이전트가 gh를 다룰 수 있도록 'gh skill' 에이전트 스킬도 제공해요. v2.93.0부터 릴리스는 불변 릴리스로 배포돼요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-22
---

cli/cli 깃허브 README 전체를 읽고 옮겼어요.

### 무엇인가

GitHub CLI(`gh`)는 명령줄에서 쓰는 GitHub예요. 풀 리퀘스트, 이슈 같은 GitHub 개념을 git과 코드 작업을 하는 터미널 바로 옆으로 가져와요. GitHub.com, GitHub Enterprise Cloud, 지원되는 GitHub Enterprise Server 버전에서 쓸 수 있고 macOS, Windows, Linux를 지원해요.

### 공지와 새 기능

- Linux 패키지 저장소용 PGP 서명 키 교체가 2026년 9월 5일부터 적용됐어요. 설치나 업데이트에 문제가 있으면 공개 공지에서 해결책을 찾으라고 해요.
- 코딩 에이전트가 `gh`를 다룰 수 있는 에이전트 스킬이 있어요. `gh skill install cli/cli gh --scope user`로 설치하고(사용자 범위 권장), `gh` 릴리스 후 업데이트할 수 있어요.

### 설치

- macOS, Linux·Unix(Amazon Linux, CentOS, Fedora, openSUSE, RHEL, SUSE 등), Windows용 사전 컴파일 바이너리를 릴리스 페이지에서 받을 수 있고, 플랫폼별 패키지는 커뮤니티 지원 문서로 안내해요. 소스 빌드 방법도 있어요.
- Codespaces에서는 devcontainer 파일에 `ghcr.io/devcontainers/features/github-cli:1`을 추가해요.
- GitHub 호스팅 러너에는 gh가 미리 설치돼 매주 업데이트돼요. 특정 버전이 필요하면 워크플로에서 직접 설치해야 해요.

### 릴리스 검증

- v2.93.0부터 gh 릴리스는 불변(immutable) 릴리스로 배포돼요.
- v2.50.0부터는 빌드 출처 증명(Build Provenance Attestation)을 만들어, 원본 저장소, git 리비전, 빌드 지시까지 암호학적으로 추적할 수 있어요. 서명은 Public Good Sigstore를 써요.
- 검증은 gh가 있으면 `gh at verify -R cli/cli <파일>`로, 없으면 Sigstore `cosign verify-blob-attestation`으로 해요.

### hub와의 차이

오랫동안 비공식 GitHub CLI는 `hub`였어요. `hub`는 git의 프록시처럼 동작하지만 `gh`는 독립 도구로, 공식 GitHub CLI가 어떤 모습일 수 있는지 근본적으로 다른 설계로 탐색하는 프로젝트라고 설명해요.
