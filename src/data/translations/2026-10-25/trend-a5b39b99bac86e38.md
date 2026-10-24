---
id: trend-a5b39b99bac86e38
title: "projectdiscovery/nuclei"
sourceUrl: https://github.com/projectdiscovery/nuclei
summary: "Nuclei는 YAML 템플릿 기반의 빠른 취약점 스캐너예요. 커뮤니티가 만든 템플릿으로 실제 공격 단계를 흉내 내 오탐을 줄이고, TCP·DNS·HTTP·SSL 등 여러 프로토콜과 CI/CD 연동을 지원해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-25
---

> GitHub 트렌딩에 오른 저장소예요. README 앞부분을 기준으로 옮겼어요. 별 수는 수집 시점 약 3만 2천 개예요. 허가받은 대상에만 써야 하는 보안 도구예요.

### 어떤 프로젝트인가요

**Nuclei**는 ProjectDiscovery가 만든 **YAML 템플릿 기반 취약점 스캐너**예요. 실제 환경을 흉내 내는 탐지 시나리오를 직접 설계할 수 있어서 오탐을 줄인다고 소개해요. Go로 작성됐고 MIT 라이선스예요.

### 특징

- 취약점 템플릿을 만들고 고치기 쉬운 **단순한 YAML 형식**
- 수천 명의 보안 전문가가 기여한 템플릿으로 **최근 유행하는 취약점**에 대응
- 실제 확인 단계를 재현해 **오탐 감소**
- 병렬 스캔과 요청 클러스터링으로 빠른 처리
- **CI/CD 파이프라인**에 넣어 취약점 탐지·회귀 테스트
- TCP, DNS, HTTP, SSL, WHOIS, JavaScript, Code 등 여러 프로토콜
- Jira, Splunk, GitHub, Elastic, GitLab 연동

### 주의 사항

README는 프로젝트가 **활발히 개발 중**이라 릴리스마다 호환성이 깨질 수 있으니 업데이트 전에 변경 기록을 보라고 해요. 또 주로 **독립 CLI 도구**로 쓰도록 만들어서, 서비스 형태로 돌리면 보안 위험이 있을 수 있다고 경고해요.

### 무료·유료 구성

- 무료 클라우드 티어에서 결과 저장·시각화, 템플릿 관리, 최신 템플릿, 대상 관리를 쓸 수 있어요.
- Pro·Enterprise는 대규모 스캔, 클라우드(AWS·GCP·Azure·Cloudflare 등) 연동, 컴플라이언스 리포트, SAML SSO 등을 제공한대요.
- 설치에는 go 1.27.3 이상이 필요하다고 적혀 있어요.
