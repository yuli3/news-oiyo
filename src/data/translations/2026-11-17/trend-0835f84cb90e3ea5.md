---
id: trend-0835f84cb90e3ea5
title: "docker/compose"
sourceUrl: https://github.com/docker/compose
summary: "Docker로 여러 컨테이너로 이뤄진 애플리케이션을 정의하고 실행하는 도구 Docker Compose 저장소예요. compose.yaml에 서비스를 정의하고 docker compose up 한 번으로 앱 전체를 띄워요. Windows·macOS는 Docker Desktop에 포함돼 있어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

GitHub 저장소 README를 끝까지 읽고 정리했어요. README가 짧아 핵심을 모두 옮겼어요.

### 무엇인가

**Docker Compose**는 Compose 파일 형식으로 정의한 **여러 컨테이너 애플리케이션을 Docker에서 실행**하는 도구예요. Compose 파일에 앱을 이루는 컨테이너 설정을 적어 두면 `docker compose up` 명령 하나로 앱을 만들고 시작할 수 있어요.

> Docker Swarm 참고: Swarm은 예전 compose 파일 형식에 의존했지만 Compose 사양을 채택하지 않아 최근 문법 개선이 빠져 있어요. Mirantis 인수 뒤 Docker Inc.가 관리하지 않아 일부 기능은 Swarm 사용자가 쓸 수 없어요.

### 설치

- **Windows·macOS**: Docker Desktop에 포함돼 있어요.
- **Linux**: 릴리스 페이지에서 바이너리를 받아 `docker-compose`로 이름을 바꾸고 `$HOME/.docker/cli-plugins`에 복사하거나, `/usr/local/lib/docker/cli-plugins` 등 시스템 폴더에 넣어요(실행 권한이 필요할 수 있어요).

### 빠른 시작 3단계

1. Dockerfile로 앱 환경을 정의해 어디서든 재현할 수 있게 해요.
2. `compose.yaml`에 앱을 이루는 서비스들을 정의해 격리된 환경에서 함께 돌게 해요.
3. `docker compose up`을 실행하면 앱 전체가 시작돼요.

예시에서는 현재 폴더를 빌드해 5000번 포트를 여는 `web` 서비스와 `redis` 이미지를 쓰는 서비스를 함께 정의해요.

### 기타

기여 문서와 이슈 트래커를 안내하고, 파이썬으로 된 예전 Compose(v1)는 v1 브랜치에 남아 있어요. Go로 작성됐고 Apache-2.0 라이선스이며 스타는 약 3.9만 개예요.
