---
id: trend-f917b9e4fca8daf8
title: "aquasecurity/trivy"
sourceUrl: https://github.com/aquasecurity/trivy
summary: "Aqua Security의 오픈소스 보안 스캐너 Trivy예요. 컨테이너 이미지, 파일시스템, 원격 Git 저장소, VM 이미지, 쿠버네티스를 대상으로 취약점(CVE), IaC 설정 오류, 시크릿, 라이선스, SBOM을 찾아줘요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

GitHub README 전문을 읽고 정리했어요.

### Trivy가 뭔가요
Trivy('트리거'의 tri + '엔비'의 vy로 읽어요)는 범용 보안 스캐너예요. '어디를 검사하는지(타깃)'와 '무엇을 찾는지(스캐너)'로 나눠서 설명해요.

**검사 대상(타깃)**
- 컨테이너 이미지
- 파일시스템
- 원격 Git 저장소
- 가상머신 이미지
- 쿠버네티스

**찾아내는 것(스캐너)**
- 사용 중인 OS 패키지와 소프트웨어 의존성(SBOM)
- 알려진 취약점(CVE)
- IaC 문제와 설정 오류
- 민감 정보와 시크릿
- 소프트웨어 라이선스

대부분의 인기 프로그래밍 언어, OS, 플랫폼을 지원하고, 자세한 범위는 Scanning Coverage 문서에 있어요.

### 설치와 연동
Homebrew(`brew install trivy`), Docker 이미지(`aquasec/trivy`), GitHub 릴리스 바이너리 등으로 받을 수 있어요. GitHub Actions, 쿠버네티스 오퍼레이터, VS Code 플러그인 같은 연동도 있어요. main 브랜치에 푸시할 때마다 카나리 빌드가 나오지만 치명적 버그가 있을 수 있어 운영 환경에는 권하지 않는대요.

### 기본 사용법
`trivy <타깃> [--scanners <스캐너들>] <대상>` 형태예요.
- `trivy image python:3.4-alpine`: 이미지 취약점 검사
- `trivy fs --scanners vuln,secret,misconfig myproject/`: 프로젝트 폴더에서 취약점·시크릿·설정 오류 검사
- `trivy k8s --report summary cluster`: 클러스터 요약 리포트

### 기타
Aqua Security 오픈소스 프로젝트이고, Trivy 위에 기능을 더한 상용 제품 Aqua도 소개해요. Apache-2.0 라이선스이고, 수집 시점 기준 스타는 약 3.9만 개예요.
