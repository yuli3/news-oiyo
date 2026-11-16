---
id: trend-33a86f1fabcf742e
title: "kubescape/kubescape"
sourceUrl: https://github.com/kubescape/kubescape
summary: "ARMO가 만든 CNCF 인큐베이팅 프로젝트 Kubescape 저장소예요. 쿠버네티스 클러스터·YAML·Helm 차트를 NSA-CISA, MITRE ATT&CK, CIS 기준으로 점검하고, 이미지 취약점 스캔과 자동 수정, eBPF 런타임 감시, AI 어시스턴트용 MCP 서버까지 제공해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

GitHub 저장소 README를 읽고 정리했어요. README가 길어 개요, 기능, 주요 명령을 중심으로 옮겼어요.

### 무엇인가

**Kubescape**는 개발부터 배포·런타임까지 쿠버네티스 환경 전반을 다루는 **오픈소스 쿠버네티스 보안 플랫폼**이에요. 하드닝, 보안 상태(posture) 관리, 런타임 보안을 제공해요. **ARMO**가 만들었고 CNCF 인큐베이팅 프로젝트예요.

### 주요 기능

- **설정 오류 스캔**: 클러스터, YAML 파일, Helm 차트를 NSA-CISA, MITRE ATT&CK®, CIS 벤치마크 기준으로 점검해요.
- **이미지 취약점 스캔**: Grype로 컨테이너 이미지의 CVE를 찾고, Copacetic으로 취약 이미지를 자동 패치해요.
- **자동 수정**: 매니페스트의 설정 오류를 자동으로 고쳐요.
- **정책 강제**: Validating Admission Policy(VAP)로 보안 정책을 적용해요.
- **런타임 감시**: Inspektor Gadget 기반 eBPF 모니터링이에요.
- **MCP 서버**: AI 어시스턴트와 연동할 수 있어요.

### 설치와 사용

- 한 줄 설치 스크립트(Linux/macOS), `kubectl krew install kubescape`, Windows PowerShell, Homebrew 등을 지원해요.
- `kubescape scan`(현재 클러스터), `kubescape scan /path/to/manifests/`, `kubescape scan image nginx:latest`처럼 써요.
- 결과로 컨트롤 플레인 보안 상태, 워크로드 설정 오류, MITRE·NSA 준수 점수를 보여 줘요.

### 눈에 띄는 옵션

- `scan framework nsa|mitre|cis-v1.23-t1.0.1`, `scan control C-0005`로 특정 기준만 점검해요.
- 네임스페이스 포함·제외, `--compliance-threshold 80`, `--severity-threshold high`로 CI에서 실패 조건을 걸 수 있어요.
- Helm 스캔은 `charts/`에 이미 포함된 의존성만 쓰고 외부에서 받아오거나 차트를 바꾸지 않아요.
- `KUBESCAPE_MASTER_KEY`를 설정하고 `--encrypt`를 쓰면 리포트의 민감한 메타데이터를 결정론적 가명화로 숨길 수 있어요.
- JSON, JUnit, SARIF(GitHub 코드 스캐닝), HTML, PDF, CSV로 내보낼 수 있어요.
- 사설 레지스트리 이미지, 멀티 아키텍처 이미지의 특정 플랫폼, 오프라인 Grype DB 스캔도 지원해요.
- `kubescape fix results.json`으로 수정하며 `--dry-run`, `--interactive` 등으로 변경을 미리 보거나 하나씩 승인할 수 있어요.
