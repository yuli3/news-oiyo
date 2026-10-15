---
id: trend-f65923b9d7cc1a47
title: "Mecatl - 자체 인프라에서 AI 에이전트를 실행하는 클라우드 네이티브 런타임"
sourceUrl: "https://github.com/stacklok/mecatl"
summary: "Stacklok의 Mecatl은 직접 운영하는 인프라에서 AI 에이전트를 프로덕션 워크로드로 돌리기 위한 오픈소스 클라우드 네이티브 에이전트 하네스예요. 같은 루프를 로컬에서 시작해 원격·Kubernetes로 확장할 수 있다고 해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

GitHub README를 읽었지만 수집 상한 때문에 "Run agents as production workloads" 섹션 앞부분까지만 읽어 `partial`로 표시해요.

### 무엇인가
Mecatl은 에이전트 루프, 도구, 권한, 훅, 위임, 서비스 경계를 제공해 내가 운영하는 인프라에서 AI 에이전트를 프로덕션 워크로드로 돌리게 해 주는 오픈소스 에이전트 하네스예요.

핵심은 에이전트 루프를 클라이언트와 실행 환경에서 분리한 거예요. 그래서 같은 런타임이 로컬에서 시작해, 외부에 영속 상태와 이벤트 기록을 두고 원격으로 돌다가, 루프를 바꾸지 않고 Kubernetes 레플리카로 확장할 수 있다고 해요. 모델 제공자, 상태 저장소, 파일시스템, UI는 명시적 인터페이스로 연결돼 하나를 바꿔도 루프는 그대로예요.

### 제공하는 것
- 도구 디스패치, 권한, 컴팩션, 훅, 서브에이전트, 팀을 갖춘 스트리밍 에이전트 루프
- 제공자에 묶이지 않는 모델 연동(참조 어댑터와 선택형 모듈)
- 플러그형 저장소 기반의 영속 세션과 추가 전용(append-only) 이벤트 로그. 프로세스가 바뀌어도 저장된 작업을 복구해요.
- gRPC, HTTP/SSE, TypeScript SDK, 그리고 로컬 서버를 띄우거나 원격에 붙는 터미널 클라이언트 `mecatui`
- Redis 상태, Kubernetes 세션 리스, drain 처리, 일회용 레플리카를 묶은 Kubernetes 네이티브 참조 런타임
- 세션별 실행 환경. 선택형 로컬 microVM 백엔드는 모델 제공자와 자격 증명은 호스트에 두고, 파일시스템 도구와 Bash만 VM 안에서 돌려요.

### 무엇부터 쓰나
- 에이전트 서비스 실행: `mecated`
- Kubernetes에서 실행: `mecak8s`
- 로컬 사용: `mecatui` 또는 오프라인 데모
- 로컬 파일·셸 격리: microVM 실행(Linux amd64에서 검증)
- 무인 자동화: 프롬프트 하나를 받아 패치와 기계가 읽는 결과를 내는 `mecatequi`
- 런타임 임베드: engine과 임베딩 가이드

설치는 Homebrew로 할 수 있어요.

```bash
brew install stacklok/tap/mecatl
```

### 왜 하네스가 필요한가
README는 에이전트 런타임이 워크로드로 운영되려면 모델 호출 이상이 필요하다고 말해요. 교체 가능한 프로세스에는 프로세스 밖의 영속 상태, 재시작해도 남는 작업 기록, 레플리카가 나뉠 때 접근을 조율하는 방법이 있어야 한다는 거예요.
