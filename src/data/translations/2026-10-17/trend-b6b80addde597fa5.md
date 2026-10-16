---
id: trend-b6b80addde597fa5
title: "n8n-io/n8n"
sourceUrl: "https://github.com/n8n-io/n8n"
summary: "n8n은 시각적 캔버스와 직접 짠 코드를 섞어 AI 에이전트와 워크플로를 만들고 배포하는 페어코드 자동화 플랫폼이에요. 자체 호스팅이나 클라우드로 돌리고 1500개 넘는 연동과 9000개 넘는 템플릿을 제공해요. GitHub 스타는 약 20만7700개예요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

GitHub 저장소 README 원문을 읽고 옮겼어요. 스타·포크 수는 수집 시점 페이지 표시값이에요.

### 무엇인가
n8n은 "AI 에이전트와 워크플로 자동화 플랫폼"을 내세우는 페어코드(fair-code) 프로젝트예요. 시각적 캔버스와 사용자 코드를 합쳐 프로토타입부터 실제 업무까지 믿고 맡길 수 있는 AI 자동화를 만든다는 게 목표예요.

### 핵심 기능
| 기능 | 설명 |
|---|---|
| AI 네이티브 | 내 데이터·모델·도구로 AI 워크플로와 다단계 에이전트 구축·운영 |
| 모델 선택 자유 | OpenAI, Anthropic, Google, 오픈소스 모델 연결, 구조 변경 없이 제공자 교체 |
| 프로토타입→운영 | 로직, 도구 사용, 사람 승인, 전체 관측성을 갖춘 다단계 워크플로 |
| 필요할 때 코드 | JavaScript, Python, npm 패키지를 시각 빌더와 함께 사용 |
| 기업용 | 자체 호스팅, 역할 기반 접근, 감사 로그, 민감 데이터 지원 |
| 기존 자산 활용 | 1500개 이상 연동, 9000개 이상 워크플로 템플릿 |

### 빠른 시작
Docker가 있으면 설치 스크립트 `curl -fsSL https://get.n8n.io | sh` 한 줄로 시작하거나, `docker volume create n8n_data` 뒤 공식 이미지를 5678 포트로 띄우고 `http://localhost:5678`에서 편집기를 열면 돼요.

### 라이선스
n8n은 Sustainable Use License와 n8n Enterprise License로 배포되는 페어코드예요. 소스는 공개돼 있지만 일반적인 OSI 오픈소스 라이선스와는 사용 조건이 달라서, 상업적으로 쓸 때는 라이선스를 확인해야 해요.

### 저장소 지표(수집 시점)
스타 약 20만7700개, 포크 약 6만1200개, 커밋 2만5878개예요. 저장소 루트에 `AGENTS.md`, `CLAUDE.md`, `.claude`, `.agents` 폴더가 있어 AI 코딩 에이전트와 함께 개발하는 흔적도 보여요.
