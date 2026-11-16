---
id: trend-50e16d7eaf590e3a
title: "openai/whisper"
sourceUrl: https://github.com/openai/whisper
summary: "OpenAI의 범용 음성 인식 모델 Whisper 저장소예요. 다양한 오디오로 학습해 다국어 음성 인식, 영어로의 음성 번역, 언어 식별을 한 모델로 처리해요. tiny부터 large, turbo까지 6가지 크기가 있고 코드와 가중치는 MIT 라이선스예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

GitHub 저장소 README를 끝까지 읽고 정리했어요.

### 무엇인가

**Whisper**는 OpenAI가 공개한 **범용 음성 인식 모델**이에요. 다양한 오디오로 이뤄진 대규모 데이터로 학습했고, **다국어 음성 인식, 음성 번역, 언어 식별**을 함께 하는 멀티태스크 모델이에요.

### 접근 방식

Transformer 시퀀스-투-시퀀스 모델을 다국어 음성 인식, 음성 번역, 언어 식별, 음성 구간 검출(VAD) 같은 여러 작업으로 학습시켰어요. 이 작업들을 디코더가 예측할 토큰 시퀀스로 함께 표현해서, 기존 음성 처리 파이프라인의 여러 단계를 **모델 하나로 대체**할 수 있게 했어요. 특수 토큰이 작업 지정자나 분류 대상 역할을 해요.

### 설치

- 학습·테스트는 Python 3.9.9, PyTorch 1.10.1로 했지만 Python 3.8~3.11과 최신 PyTorch와 호환될 것으로 봐요. 빠른 토크나이저로 OpenAI의 tiktoken을 써요.
- `pip install -U openai-whisper`로 설치하고, 시스템에 **ffmpeg**가 있어야 해요(apt, pacman, Homebrew, Chocolatey, Scoop 등으로 설치).
- tiktoken 휠이 없는 플랫폼에선 Rust가 필요할 수 있어요.

### 모델 크기

| 크기 | 파라미터 | 영어 전용 | 필요 VRAM | 상대 속도 |
| --- | --- | --- | --- | --- |
| tiny | 39M | tiny.en | ~1GB | ~10x |
| base | 74M | base.en | ~1GB | ~7x |
| small | 244M | small.en | ~2GB | ~4x |
| medium | 769M | medium.en | ~5GB | ~2x |
| large | 1550M | 없음 | ~10GB | 1x |
| turbo | 809M | 없음 | ~6GB | ~8x |

영어 전용 `.en` 모델은 특히 tiny·base에서 더 좋은 성능을 내요. **turbo**는 large-v3를 최적화해 정확도 손실을 최소화하면서 더 빠르게 만든 버전이에요. 성능은 언어마다 크게 달라요.

### 사용법

- 명령줄: `whisper audio.flac audio.mp3 --model turbo`. 비영어 음성은 `--language Japanese`처럼 언어를 지정해요.
- 영어로 번역하려면 `--task translate`를 쓰되, **turbo는 번역 학습이 안 돼 있어** 원어를 그대로 돌려줘요. medium이나 large를 쓰라고 안내해요.
- 파이썬에선 `whisper.load_model("turbo")` 후 `model.transcribe("audio.mp3")`로 쓰고, 내부적으로 30초 슬라이딩 윈도로 처리해요. `detect_language()`, `decode()` 같은 저수준 API도 있어요.

### 라이선스

코드와 모델 가중치 모두 **MIT 라이선스**예요. 스타는 약 11.3만 개예요.
