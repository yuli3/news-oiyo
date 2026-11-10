---
id: trend-eb54a2e668d6352b
title: "coollabsio/coolify"
sourceUrl: https://github.com/coollabsio/coolify
summary: "Coolify는 Heroku·Netlify·Vercel을 대신하는 오픈소스 셀프호스팅 PaaS예요. SSH만 되면 VPS·베어메탈·라즈베리파이에서 앱, 데이터베이스, 360개 넘는 원클릭 서비스를 배포하고, Coolify를 그만 써도 리소스는 계속 돌아가요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

GitHub 저장소 README의 소개와 기능, 빠른 시작 첫머리까지 읽고 옮겼어요. 나머지는 읽지 않아 partial로 표시했어요. 이번 주 GitHub 트렌딩 수집 항목이에요.

### Coolify

자기 서버에 애플리케이션, 데이터베이스, 서비스를 배포하는 **오픈소스 플랫폼**이에요. "영원히 오픈소스이고 무료"라고 밝혀요. Heroku, Netlify, Vercel의 셀프호스팅 대안으로, 자기 하드웨어에서 서버·앱·DB를 관리하게 해 줘요. **SSH 연결만 있으면** 돼요.

VPS, 베어메탈 서버, 라즈베리파이 등 SSH를 받는 서버면 어디든 쓸 수 있어요. 클라우드 플랫폼의 편리함을 주면서 인프라 통제권은 내가 가져요. 설정은 내 서버에 남고, **Coolify를 그만 써도 실행 중인 리소스는 계속 돌아가고 관리할 수 있어요.**

### 할 수 있는 일

- **앱 배포**: GitHub, GitLab, Bitbucket, Gitea에서 Nixpacks, Railpack, Dockerfile, Docker Compose, 미리 빌드한 이미지로 빌드해요.
- **DB와 서비스**: 관리형 데이터베이스와 **360개 넘는 원클릭 서비스**를 영구 스토리지와 자동 생성 자격 증명과 함께 띄워요.
- **배포 자동화**: Git push마다 배포, PR 미리보기, 배포 웹훅, 보관된 이미지로 롤백.
- **네트워킹**: 사용자 도메인, 자동 HTTPS 인증서, 리버스 프록시, 헬스 체크, 컨테이너 네트워크.
- **인프라 운영**: 여러 서버 관리, 배포·런타임 로그, 컨테이너 터미널, 리소스 상태 모니터링.
- **보호**: DB·스토리지 백업, 예약 작업, 환경 변수, 시크릿, 알림.
- **연동**: 대시보드, API, CLI, **MCP**, 팀 단위 접근 제어.

### 빠른 시작

지원하는 서버에서 명령 하나로 설치해요.

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

원격 스크립트를 바로 실행하는 방식이라, 실행 전에 공식 문서와 스크립트 내용을 확인하는 게 좋아요.
