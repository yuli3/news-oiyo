---
id: trend-d6168a5edbff3da2
title: "A training engine for your local model, using your idle compute"
sourceUrl: https://github.com/sous-labs/songe
summary: "Songe는 로컬 모델을 쓰는 동안 도구 결과·오류·사용자 교정을 기록했다가 에이전트가 쉴 때 모델을 학습시키는 오픈소스 엔진이에요. 새 버전은 검사를 통과할 때만 쓰이고, 데이터는 기기 밖으로 나가지 않아요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

opencode, pi 또는 OpenAI 호환 도구로 로컬 모델을 평소처럼 쓰면, Songe가 모델의 각 행동 뒤에 무슨 일이 일어났는지(도구 결과, 오류, 사용자의 다음 메시지)를 지켜봐요. 에이전트가 조용할 때 모델이 그런 결과를 미리 내다보도록 가르치고, 새 버전은 검사를 통과해야만 쓰여요. 아무것도 기기 밖으로 나가지 않아요.

### 주요 특징
- **일하는 방식에서 배워요.** 사용자의 교정, 밝힌 선호, 도구 오류가 모델의 교훈이 돼요.
- **두 가지 Dream.** Quick Dream은 몇 분 만에 선호를 모델 지시문에 더하고, Deep Dream은 자리를 비운 사이 모델 자체를 학습시켜요.
- **기본적으로 안전해요.** 사용자 자신의 대화에서 더 나을 때만 새 버전을 쓰고, 클릭 한 번으로 이전 버전으로 돌아가요.
- **방해하지 않아요.** 에이전트가 쉬고 메모리가 여유 있고 배터리가 괜찮을 때만 돌고, 사용자가 돌아오면 바로 멈춰요.
- **비공개.** 계정, 텔레메트리, 클라우드가 없어요. Songe는 사용자의 도구를 실행하지 않아요.

### 설치
- Python 3.11 이상에서 `uv tool install songe` 또는 `pipx install songe` 후 `songe init`을 실행해요. macOS에서는 Homebrew tap으로도 설치할 수 있어요.
- `songe init`은 모델 서버와 에이전트를 찾아 무엇을 바꿀지 보여 주고 한 번 확인을 받아요.
- 지원 모델 서버는 LM Studio, vLLM, Ollama, llama.cpp, mlx-lm이고, 학습은 Apple Silicon(MLX)과 NVIDIA·AMD(PyTorch)에서 돼요. 끝까지 검증된 조합은 LM Studio(macOS), vLLM(Linux), Apple Silicon, NVIDIA예요. GPU가 없는 기기는 서빙과 기록만 하고 학습은 하지 않아요.

### 동작 방식
- 에이전트와 모델 서버 사이에 Songe(127.0.0.1:7613)가 끼어 기록하고, 자리를 비우면 교훈 읽기 → 연습 → 학습 → 검사 → 더 나을 때만 사용 순서로 Dream이 돌아요.
- Quick Dream은 몇 분, Deep Dream은 한 시간 이상 걸려요. Deep Dream은 교훈으로 연습 데이터를 만들어 작은 어댑터를 학습시켜요.
- 각 교훈마다 모델이 에이전트 도구를 쓰는 짧은 연습 장면을 만들고, 실제 대화는 학습에 쓰지 않아요. 교훈을 본 원래 모델이 교사, 장면만 본 어댑터 모델이 학생인 온폴리시 증류 방식이에요.
- 검사 단계에서는 판정 모델이 기존 버전과 새 버전의 답을 비교하고, 확실히 더 낫고 기존에 잘 되던 것을 바꾸지 않을 때만 채택해요.

### 명령과 제거
- `songe open`(대시보드), `songe sleep`(Deep Dream 시작), `songe undo MODEL`, `songe pause`/`resume`, `songe doctor`, `songe forget` 등을 제공해요.
- `songe uninstall`은 서비스를 멈추고 에이전트 설정을 되돌리며, `--purge`를 붙이면 데이터와 학습된 버전도 지워요. 라이선스는 Apache-2.0이에요.
