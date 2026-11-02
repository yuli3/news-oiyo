---
id: trend-f917b9e4fca8daf8
title: "aquasecurity/trivy"
sourceUrl: https://github.com/aquasecurity/trivy
summary: "Trivy는 Aqua Security의 오픈소스 보안 스캐너예요. 컨테이너 이미지, 파일시스템, Git 저장소, VM 이미지, Kubernetes에서 취약점(CVE), IaC 설정 오류, 시크릿, 라이선스, SBOM을 찾아요(Apache-2.0, Go)."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> GitHub README(원문 Markdown)를 기준으로 옮겼어요.

### 무엇인가요

**Trivy**(발음: '트리거'의 tri + '엔비'의 vy)는 포괄적이고 다재다능한 **보안 스캐너**예요. 보안 문제를 찾는 *스캐너*와 그 문제를 찾을 *대상*으로 구성돼요.

| 대상(무엇을 검사하나) | 스캐너(무엇을 찾나) |
|---|---|
| 컨테이너 이미지 | 사용 중인 OS 패키지·의존성(SBOM) |
| 파일시스템 | 알려진 취약점(CVE) |
| 원격 Git 저장소 | IaC 문제·설정 오류 |
| 가상 머신 이미지 | 민감 정보·시크릿 |
| Kubernetes | 소프트웨어 라이선스 |

주요 프로그래밍 언어, 운영체제, 플랫폼 대부분을 지원해요.

### 설치

- `brew install trivy`
- `docker run aquasec/trivy`
- GitHub 릴리스에서 바이너리 다운로드

GitHub Actions, Kubernetes operator, VS Code 플러그인 등과 통합돼요. main 브랜치에 push할 때마다 **카나리 빌드**도 나오지만, 치명적 버그가 있을 수 있어 운영 환경엔 권장하지 않아요.

### 사용법

```bash
trivy <target> [--scanners <scanner1,scanner2>] <subject>

trivy image python:3.4-alpine
trivy fs --scanners vuln,secret,misconfig myproject/
trivy k8s --report summary cluster
```

### Aqua와의 관계

Trivy는 **Aqua Security**의 오픈소스 프로젝트예요. Aqua는 Trivy 위에 더 강화된 기능을 얹은 상용 보안 관리 제품을 만들어요. 질문은 GitHub Discussion으로 받아요.
