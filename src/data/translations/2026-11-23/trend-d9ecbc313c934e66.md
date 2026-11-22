---
id: trend-d9ecbc313c934e66
title: "skypilot-org/skypilot"
sourceUrl: https://github.com/skypilot-org/skypilot
summary: "SkyPilot은 쿠버네티스, Slurm, 예약 GPU, 20개 넘는 클라우드 등 어떤 AI 인프라에서든 AI 작업을 실행·관리·확장하는 시스템이에요. AI 팀에는 단순한 작업 인터페이스를, 인프라 팀에는 통합 제어판을 줘요."
translationStatus: partial
translatedBy: Claude
translatedAt: 2026-11-23
---

저장소 README 앞부분(소식, 개요, 설치)을 바탕으로 옮겼어요. 이후 예제와 문서 링크는 수집 길이 제한으로 읽지 못했어요.

### 무엇인가

SkyPilot은 어떤 AI 인프라에서든 AI 워크로드를 실행·관리·확장하는 시스템이에요. AI 팀은 단순한 인터페이스로 어디서든 작업을 돌리고, 인프라 팀은 고급 스케줄링·확장·오케스트레이션을 갖춘 하나의 제어판으로 모든 AI 컴퓨트를 관리해요.

### 최근 소식(README 기준)

- 2026년 10월: SkyPilot 스케줄러가 NVL72 학습 처리량을 14% 높였고, 4B 모델을 강화학습으로 사후학습해 테슬라 로드스터 비행 과제에서 GPT-6 Astra보다 21% 낫게 만들었다는 블로그를 냈어요.
- 9월: 내 인프라에서 코딩 에이전트를 관리하는 'Agent Sessions'를 발표했어요.
- 7월: 자기 GPU로 Kimi K3 서빙, Hugging Face 저장소와 연동해 이그레스 비용 없이 작업하기.
- 6월: 가진 모든 클러스터에서 운영급 추론을 하는 'Endpoints', LLM이 만든 신뢰할 수 없는 코드를 기존 쿠버네티스에서 돌리는 'Sandboxes'(얼리 액세스).
- 4월: GPU 클라우드 가격 비교 대시보드 'GPU Compass', 논문을 읽고 코딩하는 연구형 에이전트가 약 3시간·29달러로 llama.cpp 커널 융합 5개와 flash attention 15% 가속을 해냈다는 사례.

### 개요

- AI 사용자에게: 내 인프라에서 컴퓨트를 빠르게 띄우고, 환경과 작업을 코드로 정의하고, 많은 작업을 큐에 넣고 자동 복구해요.
- 쿠버네티스를 쉽게: Slurm 같은 편의성과 클라우드 네이티브 안정성, 파드에 SSH 접속·코드 동기화·IDE 연결, 갱 스케줄링과 멀티 클러스터.
- 통합: 예약 GPU, 쿠버네티스, Slurm, 20개 넘는 클라우드를 하나의 인터페이스로 쓰고, GPU·TPU·CPU를 유연하게 확보하며 장애 시 자동 전환해요.
- 활용률 극대화: 유휴 자원 자동 정리(Autostop), 공유 클러스터 빈패킹, 가장 여유 있는 인프라로 자동 배치. 기존 작업은 코드 변경 없이 쓸 수 있어요.

### 설치

`uv pip install "skypilot[kubernetes,aws,gcp,...]"`처럼 쓸 클라우드를 골라 설치해요(pip, nightly, 소스 설치도 지원). Claude Code나 Codex 같은 에이전트에서 직접 쓰도록 SkyPilot Skill도 제공해요.
