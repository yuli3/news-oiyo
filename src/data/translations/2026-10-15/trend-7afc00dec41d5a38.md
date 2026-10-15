---
id: trend-7afc00dec41d5a38
title: "Neckbeard – A DevOps/platform/SRE plugin for your agent"
sourceUrl: "https://github.com/bealesh/neckbeard"
summary: "Neckbeard는 코딩 에이전트용 DevOps/SRE 플러그인으로, 앱을 읽어 검토 가능한 클라우드 인프라와 월 비용 추정치를 만들어요. 에이전트는 설명만 하고 OpenTofu 모듈 렌더·검증은 결정적 코드가 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

GitHub 저장소 README를 바탕으로 옮겼어요.

### 무엇을 하나
**neckbeard**는 코딩 에이전트용 플러그인이에요. 앱을 읽어 **검토 가능한 클라우드 인프라**와 **월 비용 추정**을 만들어요. AWS·GCP·Azure, GitHub Actions·GitLab CI, 서버리스 컨테이너·쿠버네티스 등을 번들된 **OpenTofu** 모듈 카탈로그로 렌더해요.

### 설계 원칙
에이전트는 앱을 읽고 **설명**해요. 계획·렌더·검증은 **결정적 코드**가 담당하고, 에이전트가 인프라를 지어내지는 않아요. ponytail에서 영감을 받았다고 해요.

### 명령 흐름
- `/neckbeard:analyze` — 근거(파일:줄)·신뢰도·가정을 담은 `app-profile.yaml`을 만들고 질문을 던진 뒤 `neckbeard.yaml`을 제안
- `/neckbeard:estimate` — 비용 비교
- `/neckbeard:doctor` — Infracost·OpenTofu·Checkov 등 빠진 도구를 안내

첫 `/neckbeard:` 명령이 sha256 검증 바이너리(또는 `go install`)로 작은 CLI를 설치해요. Claude Code뿐 아니라 Codex·Cursor 등 `SKILL.md`를 쓰는 에이전트도 INSTALL.md를 보면 돼요.


### 에이전트와의 역할 분담
에이전트가 YAML을 "창작"하지 않게 막아, 환각 인프라(존재하지 않는 리소스·잘못된 IAM)를 줄이려는 설계예요. 사람은 리뷰 가능한 모듈 출력과 비용 추정치를 보고 승인하는 흐름을 기대해요.

### 운영 전제
정적 검증(OpenTofu/Checkov)과 비용(Infracost)이 있을수록 doctor·estimate가 풍부해져요. 없으면 설치 안내만 하고, 있는 도구로만 검증을 확장하는 식이에요.
