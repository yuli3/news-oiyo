---
id: trend-f917b9e4fca8daf8
title: "aquasecurity/trivy"
sourceUrl: https://github.com/aquasecurity/trivy
summary: "Trivy는 컨테이너, 쿠버네티스, 코드 저장소, 클라우드 등에서 취약점, 설정 오류, 시크릿, SBOM을 찾는 오픈소스 보안 스캐너예요. Aqua Security가 만들었고, 한 줄 명령으로 파일시스템이나 클러스터를 검사할 수 있어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-22
---

aquasecurity/trivy 깃허브 README 전체를 읽고 옮겼어요. README가 짧고 대부분 외부 문서로 안내해요.

### 무엇인가

Trivy는 포괄적이고 다재다능한 보안 스캐너예요. '무엇을 찾는지(스캐너)'와 '어디서 찾는지(대상)'로 나눠 설명해요.

- **찾는 것**: 사용 중인 OS 패키지와 소프트웨어 의존성(SBOM), 알려진 취약점(CVE), IaC 문제와 설정 오류, 민감 정보와 시크릿, 소프트웨어 라이선스
- **찾는 곳**: 컨테이너 이미지, 파일시스템, 원격 Git 저장소, 가상 머신 이미지, 쿠버네티스 등. 저장소 소개 문구에는 클라우드도 검사 대상으로 적혀 있어요

대부분의 인기 프로그래밍 언어, 운영체제, 플랫폼을 지원하고 전체 목록은 Scanning Coverage 문서에 있어요.

### 설치와 사용

- 주요 배포 채널에서 받을 수 있고, 깃허브 릴리스 페이지에서 바이너리를 직접 내려받을 수도 있어요.
- 사용법은 `trivy <대상> [--scanners <스캐너>] <검사 대상>` 형식이에요. 예를 들어 `trivy fs --scanners vuln,secret,misconfig myproject/`는 프로젝트 폴더의 취약점·시크릿·설정 오류를 함께 보고, `trivy k8s --report summary cluster`는 클러스터 요약 보고서를 내요.
- main 브랜치에 푸시할 때마다 canary 빌드가 나오지만, 치명적 버그가 있을 수 있어 운영 환경에는 권하지 않아요.
- 여러 플랫폼·앱과 통합돼 있고 전체 목록은 Ecosystem 문서에 있어요.

### 그 밖에

- 이름은 'tri'는 trigger처럼, 'vy'는 envy처럼 읽어요.
- Aqua Security의 오픈소스 프로젝트이고, 회사는 Trivy 위에 더 많은 기능을 얹은 상용 보안 관리 제품을 소개해요.
