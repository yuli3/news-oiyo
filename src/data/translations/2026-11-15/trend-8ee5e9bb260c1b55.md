---
id: trend-8ee5e9bb260c1b55
title: "salesforce-sovereign-intelligence/SOV-Transcribe-1 · Hugging Face"
sourceUrl: https://huggingface.co/salesforce-sovereign-intelligence/SOV-Transcribe-1
summary: "세일즈포스가 Whisper large-v3 인코더와 Gemma 4 26B A4B MoE를 합친 오픈 가중치 음성 인식 모델 SOV-Transcribe-1을 Apache 2.0으로 공개했어요. 자연어 지시로 전사 스타일을 바꿀 수 있고, 7개 언어와 최대 30분 오디오를 지원해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

Hugging Face 모델 카드의 앞부분(소개, 기능, 모델 요약, 설치와 Transformers 사용법)을 옮겼어요. 벤치마크 표는 이미지라 읽지 못했고, 프롬프트 가이드와 vLLM 사용법 이후는 읽지 않았어요.

### 무엇인가

**SOV-Transcribe-1**은 세일즈포스의 **오픈 가중치 음성 증강 언어 모델**로, 비스트리밍 **자동 음성 인식(ASR)** 용이에요. 영어 전사 정확도와 다국어 지원, 그리고 **어떻게 전사할지 자연어로 지시하는 기능**을 함께 갖췄다고 해요.

카드에 따르면 2026년 11월 12일 기준 Artificial Analysis의 비스트리밍 음성-텍스트 부문에서 **오픈 가중치 모델 1위(전체 7위)**, besimple AI의 **VoiceCodeBench**에서 개체 정확도와 작업 성공 기준 **23개 시스템 중 2위**예요. 기업이 자기 인프라에 배포하고 고쳐 써서 오디오 데이터와 전사 방식을 직접 통제할 수 있다는 점을 강조해요.

### 주요 기능

- **개체 인식**: 받아쓰기와 음성 앱에서 중요한 이름, 전화번호, 이메일 주소 같은 세부를 잡아요.
- **억양·소음에 강함**: 다양한 영어 억양과 배경 소음 같은 어려운 오디오를 처리해요.
- **전사 스타일 제어**: 자연어 지시로 말 그대로 받아쓸지, 다듬은 글로 쓸지 고르고 문장부호, 대소문자, 숫자 표기를 정해요.
- **문맥 편향**: 이름, 분야 용어, 주제 설명을 주면 어려운 단어와 전문 용어를 더 잘 알아들어요.

### 모델 요약

| 항목 | 내용 |
|---|---|
| 파라미터 | 오디오 인코더 포함 총 266억(활성 46억) |
| 구조 | Whisper large-v3 오디오 인코더 + 오디오 프로젝터 + Gemma 4 26B A4B MoE |
| 정밀도 | BF16(MoE 라우터는 FP32) |
| 최대 입력 | 30분까지 시험 |
| 입출력 | 16kHz 오디오(+선택적 지시·문맥) → 전사 텍스트 |
| 언어 | 영어, 프랑스어, 독일어, 스페인어, 이탈리아어, 포르투갈어, 네덜란드어 |
| 추론 | vLLM, Hugging Face Transformers |
| 투기적 디코딩 | 별도 저장소의 DFlash 초안 모델 |

### 사용법

vLLM과 Transformers 정식 지원은 반영 중이에요. 그 전까지는 저장소의 vLLM 플러그인이 vLLM 0.32.0에 지원을 더하고, Transformers용 모델 코드는 저장소에 들어 있어요(`transformers>=5.19,<5.23`). Transformers에서는 `AutoProcessor`의 `apply_transcription_request(audio)`로 여러 녹음을 한 번에 전사하고, `prompt=`로 지시를 줄 수 있어요. DFlash 초안 모델을 assistant로 붙이면 투기적 디코딩을 쓸 수 있는데, 이때는 녹음을 하나씩 처리해요. 원격 코드를 허용하지 않는 환경을 위한 독립 함수도 제공해요.
