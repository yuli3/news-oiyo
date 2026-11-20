---
id: trend-4e0536def7d6fe95
title: "Explore the Codex Security Plugin"
sourceUrl: https://openai.com/business/learn/codex-security-plugin-demo
summary: "OpenAI가 Codex Security 플러그인 데모 영상을 공개했어요. 공식 문서 기준으로 이 플러그인은 ChatGPT 데스크톱 앱이나 Codex CLI에서 로컬 저장소를 소스 변경 없이 스캔하고, 근거와 수정 안내를 담은 보고서를 남겨요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

OpenAI의 'Explore the Codex Security Plugin' 페이지는 데모 영상과 한 문장 설명("시작부터 결과 검토까지 워크플로를 녹화로 보여 준다")뿐이고, 영상 내용은 텍스트로 읽을 수 없었어요. 아래는 같은 제품에 대한 OpenAI 공식 문서 'Codex Security plugin quickstart'(learn.chatgpt.com)를 읽고 정리한 거예요. 영상에 실제로 무엇이 나오는지는 담지 않았어요.

### 무엇인가

- Codex Security 플러그인은 로컬 저장소에 표준 스캔을 돌려 보안 문제를 찾고, 결과를 검토하게 해 줘요. 스캔은 **읽기 전용**이라 소스를 바꾸지 않고, 근거와 수정 안내가 담긴 보고서를 저장해요.
- ChatGPT 데스크톱 앱의 Codex나 Codex CLI에서 써요. Codex cloud에서 연결된 깃허브 저장소를 스캔하려면 별도 플러그인인 Daybreak Defense Factory(Preview)를 설치해야 해요.

### 설치와 버전

- 데스크톱 앱: Codex를 열고 Plugins에서 Codex Security를 찾아 설치·활성화한 뒤 사이드바의 Security를 열어요. 관리형 워크스페이스에서 "Disabled by admin"이 뜨면 소유자에게 권한을 확인해야 해요.
- CLI: 저장소에서 `codex`를 실행하고 `/plugins`로 설치한 뒤 `/new`로 새 대화를 시작해요.
- Codex와 플러그인은 버전이 따로 있어 `codex --version`, `codex plugin list --json`으로 확인하고 기록해 두라고 해요. 독립 패키지 `@openai/codex-security`는 자체 번들 플러그인을 가져 마켓플레이스 플러그인과 따로 업데이트돼요.

### 첫 스캔

- 최고 품질을 위해 `gpt-5.6-sol`과 `xhigh` 추론 설정을 권해요.
- 앱에서는 Security → Scans → + Scan으로 저장소와 범위(전체 또는 폴더)를 고르고, 필요할 때만 '추가 맥락'에 공격 벡터나 민감 영역을 적은 뒤 시작해요. CLI에서는 "Run a Codex Security scan on this repository."라고 요청하면 돼요.

### 결과 해석

- 먼저 대상과 리비전을 확인하고, 어떤 영역을 검토했고 어떤 영역을 미뤘는지 읽으라고 해요. 완료된 스캔에도 커버리지 공백이 있을 수 있고, 발견이 없다고 모든 취약점이 배제된 건 아니에요.
- 각 발견에는 소스 근거, 공격 전제 조건, 검증, 남은 불확실성이 담겨요.
- 결과 폴더에는 읽기용 `report.md`와 자동화용 `scan-manifest.json`, `findings.json`, `coverage.json`이 생기고, 요청하면 `findings/`(상세 취약점 보고서)와 `hardening/`(설계 제안)도 만들어요.
