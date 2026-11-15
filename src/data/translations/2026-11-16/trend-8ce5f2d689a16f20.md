---
id: trend-8ce5f2d689a16f20
title: "Show GN: agent-otel-kit - Claude Code·Codex·Gemini CLI 사용량, 비용, 도구 호출을 한 대시보드로"
sourceUrl: https://github.com/s3onghyun/agent-otel-kit
summary: "agent-otel-kit은 Claude Code·Codex·Gemini CLI의 비용, 토큰, 도구 호출, 트레이스를 docker compose 한 번으로 내 컴퓨터에서 보는 OpenTelemetry 스택이에요. 프롬프트·응답·파일 경로 등은 기본으로 수집하지 않고, 모든 포트는 127.0.0.1에만 열려요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

GitHub 저장소 `s3onghyun/agent-otel-kit`의 README를 끝까지 읽고 옮겼어요.

### 무엇인가

AI 코딩 에이전트용 **로컬 OpenTelemetry 스택**이에요. 에이전트의 OTLP 텔레메트리를 받는 OpenTelemetry Collector, 메트릭용 Prometheus, 이벤트용 Loki, 트레이스용 Tempo, 그리고 Grafana와 Perses에 같은 대시보드 3개가 들어 있어요. 작은 Go CLI가 각 에이전트를 collector에 연결하고 데이터가 들어오는지 확인해요.

### 30초 시작

```sh
git clone https://github.com/s3onghyun/agent-otel-kit && cd agent-otel-kit
docker compose up -d
brew install s3onghyun/tap/agent-otel-kit
agent-otel-kit setup claude   # 또는 codex, gemini, all
agent-otel-kit doctor
```

Grafana는 `http://localhost:3000`, Perses는 프로필을 켜고 `http://localhost:8080`에서 봐요. 모든 포트는 127.0.0.1에만 바인딩돼요.

### 수집하는 것과 안 하는 것

- **수집**: 비용(Claude Code만), 유형별 토큰 수, 세션, 활성 시간, 도구 호출(이름·성공·소요 시간·권한 결정), 모델 요청 시간, 프롬프트·모델 요청·도구 호출별 트레이스 스팬.
- **기본 미수집**: 프롬프트 텍스트, 모델 응답, 도구 인자와 출력, 파일 경로, 셸 명령, 오류 메시지. 에이전트 쪽 스위치를 실수로 켜도 collector가 `transform/redact`에서 다시 지워요.
- Gemini CLI가 보내는 프로세스 명령줄(`gemini -p "..."`면 프롬프트 포함)과 Claude Code·Gemini가 붙이는 `user.email`도 기본으로 버려요. Gemini CLI는 기본으로 프롬프트를 기록하므로 `setup gemini`가 `logPrompts: false`를 넣어요.
- 세션 ID, 계정 UUID, 호스트 이름 같은 식별자는 남지만 모든 데이터는 내 컴퓨터에만 있고, Grafana와 Loki 사용 통계 전송도 꺼 두었어요.

### 에이전트별 설정

`setup`은 각 에이전트의 사용자 설정 파일(`~/.claude/settings.json`, `~/.codex/config.toml`, `~/.gemini/settings.json`)만 고쳐요. 처음 실행할 때 원본을 백업하고 `setup --undo`로 원래 바이트와 권한을 되돌리며, `--dry-run`도 있어요. 주석이 있는 설정 파일은 고치지 않고 오류로 멈춰요.

검증한 버전은 Claude Code 2.1.325(메트릭·이벤트·트레이스, 트레이스는 베타 플래그 필요), Codex 0.169.0(비용 메트릭 없음, 메트릭에 세션 ID가 없어 세션별 표에서 빠짐), Gemini CLI 0.68.0(API 키 기준, 비용 메트릭 없음)이에요. 개인 Google 로그인 Gemini CLI는 Google이 이 클라이언트를 거부해 AI Studio API 키로 테스트했어요.

### delta temporality 함정

세 에이전트 모두 카운터를 기본으로 **delta**(직전 대비 증가분)로 내보내는데 Prometheus는 누적 카운터만 저장해서, 그냥 연결하면 값이 빠지거나 잘못 읽혀요. collector의 `delta_to_cumulative` 프로세서가 시리즈별 누적값을 유지해 해결해요. 짧은 세션의 첫 값도 세도록 Prometheus 설정 두 가지를 함께 켰어요.

### 대시보드 3개

- **비용과 토큰**: 범위 내 비용·토큰·세션·활성 시간, 모델별 비용, 가장 비싼 세션.
- **도구 호출**: 호출 수, 실패, 성공률, p95 시간, 권한 결정, Loki의 실패 호출.
- **세션과 트레이스**: 세션별 비용·토큰, Tempo 트레이스, 워터폴, 이벤트 흐름.

라벨은 `agent_name`(claude-code, codex, gemini-cli)으로 통일하고, 토큰 합계는 겹치는 유형(Codex의 캐시 입력, 추론 토큰 등)을 두 번 더하지 않아요. Codex는 0이 아닌 종료 코드로 끝난 셸 명령도 성공으로 표시하는 등 에이전트별 차이가 대시보드에 드러난다고 적어요.

### 문제 해결

`agent-otel-kit doctor`가 스택 상태, 수신 여부, 에이전트 설정을 한 줄씩 점검해요. 텔레메트리 설정은 에이전트 시작 시 읽히니 `setup` 뒤엔 새 세션을 열어야 해요. 컨테이너 메모리 제한은 collector·Prometheus·Loki·Tempo 각 512MiB, Grafana 384MiB, Perses 256MiB예요.
