---
id: trend-eb54a2e668d6352b
title: "coollabsio/coolify"
sourceUrl: https://github.com/coollabsio/coolify
summary: "Coolify는 Vercel·Heroku·Netlify를 대신하는 오픈소스 셀프 호스팅 PaaS예요. SSH만 되는 서버면 앱, 데이터베이스, 360개 넘는 원클릭 서비스를 직접 배포하고 관리할 수 있어요(Apache-2.0, 별 약 6만 3천 개)."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> GitHub README를 기준으로 옮겼어요(후원사 목록은 뺐어요). 별 개수는 GitHub API 조회 기준이에요.

### 무엇인가요

**Coolify**는 Heroku, Netlify, Vercel을 대신할 수 있는 **오픈소스·셀프 호스팅 플랫폼**이에요. 내 하드웨어에서 서버, 애플리케이션, 데이터베이스를 관리하게 도와주고, 필요한 건 **SSH 연결 하나**뿐이에요. VPS, 베어메탈 서버, 라즈베리 파이 등 SSH를 받는 서버면 어디든 써요. 클라우드 플랫폼의 편리함을 누리면서 인프라 통제권은 내가 갖는 구조예요.

설정은 내 서버에 남아요. **Coolify 사용을 멈춰도 돌던 리소스는 계속 작동하고 관리할 수 있어요.** "오픈소스이고 영원히 무료"를 내세워요.

### 주요 기능

- **어떤 앱이든 배포**: GitHub, GitLab, Bitbucket, Gitea에서 Nixpacks, Railpack, Dockerfile, Docker Compose, 미리 만든 Docker 이미지로 빌드해요.
- **데이터베이스·서비스 실행**: 관리형 데이터베이스와 360개가 넘는 원클릭 서비스를 영구 스토리지와 자동 생성 자격 증명으로 띄워요.
- **배포 자동화**: Git push마다 배포, PR 미리보기, 배포 웹훅, 보관된 이미지로 롤백
- **네트워킹**: 커스텀 도메인, 자동 HTTPS 인증서, 리버스 프록시, 헬스 체크, 컨테이너 네트워크
- **인프라 운영**: 여러 서버 관리, 배포·런타임 로그 확인, 컨테이너 터미널, 리소스 상태 모니터링
- **워크로드 보호**: DB·스토리지 백업, 예약 작업, 환경 변수, 시크릿, 알림
- **워크플로 연동**: 대시보드, API, CLI, **MCP**, 팀 단위 접근 제어

### 설치

지원되는 서버에서 명령 한 줄로 설치해요. 실행 전에 설치 스크립트를 먼저 검토할 수도 있어요.

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

권장 셀프 호스팅 구성은 Coolify용 서버 하나와 배포 리소스용 서버 한 대 이상이에요. Coolify 서버를 직접 관리하기 싫으면 유료 관리형 서비스 **Coolify Cloud**(이메일 알림·추가 지원 포함)를 쓸 수 있어요. 모든 기능을 유료 장벽 없이 무료로 유지하려고 후원을 받고 있어요.
