---
id: trend-a5b39b99bac86e38
title: "projectdiscovery/nuclei"
sourceUrl: https://github.com/projectdiscovery/nuclei
summary: "Nuclei는 ProjectDiscovery의 오픈소스 취약점 스캐너예요. 간단한 YAML 템플릿으로 실제 공격 단계를 흉내 내 검증해 오탐을 줄이고, HTTP·DNS·TCP·SSL 등 여러 프로토콜과 CI/CD 연동을 지원해요. 서비스 형태로 돌리면 보안 위험이 있을 수 있다고 경고해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

GitHub README 전체를 읽고 정리했어요. 300줄 가까운 명령줄 플래그 목록은 옮기지 않았어요. 허가받은 대상에만 스캔해야 한다는 점은 덧붙여요.

### 무엇인가

**Nuclei**는 간단한 YAML 기반 템플릿을 쓰는 현대적 고성능 취약점 스캐너예요. 실제 조건을 흉내 내는 탐지 시나리오를 직접 설계할 수 있고, 이를 통해 오탐을 없앤다고 소개해요(README 표현은 'zero false positives'예요).

- YAML로 템플릿을 만들고 고쳐요.
- 수천 명의 보안 전문가가 최신 취약점용 템플릿을 기여해요.
- 병렬 스캔과 요청 클러스터링으로 빠르게 처리해요.
- CI/CD에 넣어 취약점 탐지와 회귀 테스트에 쓸 수 있어요.
- TCP, DNS, HTTP, SSL, WHOIS, JavaScript, Code 등 여러 프로토콜을 지원하고 Jira, Splunk, GitHub, Elastic, GitLab과 연동돼요.

### 주의 사항

README는 활발히 개발 중이라 릴리스마다 호환성 깨짐이 있을 수 있으니 변경 로그를 보고 업데이트하라고 해요. 또 독립 CLI로 쓰도록 만든 도구라 **서비스로 돌리면 보안 위험**이 있을 수 있다며 추가 보안 조치를 권해요.

### 사용 예

단일 대상(`nuclei -target https://example.com`), URL 목록 파일(`-list urls.txt`), 서브넷 네트워크 스캔(`-target 192.168.1.0/24`), 직접 만든 템플릿(`-t your-template.yaml`), 결과를 ProjectDiscovery 클라우드에 올리는 `-dashboard` 옵션(무료)이 나와 있어요.

### 템플릿과 커뮤니티

별도 저장소 nuclei-templates에 요청 전송과 처리 방법을 정의한 YAML 템플릿이 모여 있어요. 예시로 Log4Shell 같은 알려진 CVE, OOB 블라인드 SQL 인젝션, XSS, 기본 비밀번호, 민감 파일 노출, 보호되지 않은 Jenkins 콘솔, 만료된 SSL 인증서, 공개 S3 버킷, 원격 코드 실행, 경로 탐색 탐지 등이 있어요. 기여자 프로그램(Pioneers)과 바운티도 운영해요.

### 미션과 상용판

ProjectDiscovery는 기존 스캐너가 폐쇄적이고 느리며 벤더 중심이라고 보고, 공격자가 새 CVE를 며칠 만에 대량 악용하는 환경에 맞춰 엔진 전체를 공개했다고 해요. 무료 클라우드 티어가 있고, Pro·Enterprise판은 50배 빠른 스캔, 클라우드 연동, 컴플라이언스 보고 등을 내세워요. MIT 라이선스예요.
