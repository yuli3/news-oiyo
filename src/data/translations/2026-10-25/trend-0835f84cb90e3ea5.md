---
id: trend-0835f84cb90e3ea5
title: "docker/compose"
sourceUrl: https://github.com/docker/compose
summary: "Docker Compose는 여러 컨테이너로 된 앱을 Compose 파일 하나로 정의하고 `docker compose up` 한 번으로 띄우는 도구예요. 윈도·맥은 Docker Desktop에 들어 있고, 리눅스는 바이너리를 CLI 플러그인 폴더에 넣어 써요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-25
---

> GitHub 트렌딩에 오른 저장소예요. README가 짧아서 전체를 옮겼어요. 별 수는 수집 시점 약 3만 8천 개예요.

### 어떤 도구인가요

**Docker Compose**는 **Compose 파일 형식**으로 정의한 여러 컨테이너 애플리케이션을 Docker에서 실행하는 도구예요. Compose 파일에 앱을 이루는 컨테이너들의 설정을 적어 두면, `docker compose up` 명령 하나로 앱 전체를 만들고 시작할 수 있어요. Go로 작성됐고 Apache-2.0 라이선스예요.

### Docker Swarm 관련 안내

Docker Swarm은 예전 compose 파일 형식에 의존했지만 compose 명세를 채택하지 않아서 최근 문법 개선이 빠져 있어요. Mirantis 인수 이후 Swarm은 Docker Inc.가 관리하지 않기 때문에, 일부 Compose 기능은 Swarm 사용자가 쓸 수 없대요.

### 설치

- **윈도·macOS**: Docker Desktop에 포함돼 있어요.
- **리눅스**: 릴리스 페이지에서 OS에 맞는 바이너리를 받아 `docker-compose`로 이름을 바꾸고 `$HOME/.docker/cli-plugins`에 넣어요. 시스템 전체에 설치하려면 `/usr/local/lib/docker/cli-plugins` 같은 폴더에 두면 되고, 실행 권한(`chmod +x`)이 필요할 수 있어요.

### 3단계 빠른 시작

1. 앱 환경을 **Dockerfile**로 정의해 어디서나 재현되게 해요.
2. 앱을 이루는 서비스를 **compose.yaml**에 정의해 격리된 환경에서 함께 돌게 해요.
3. `docker compose up`을 실행하면 Compose가 앱 전체를 띄워요.

README 예시는 현재 폴더를 빌드해 5000번 포트를 여는 `web` 서비스와 `redis` 이미지를 쓰는 `redis` 서비스로 된 compose 파일이에요. 파이썬으로 된 옛 Compose(v1)는 `v1` 브랜치에 남아 있어요.
