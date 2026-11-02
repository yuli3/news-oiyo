---
id: trend-1b262fcad8c5392f
title: "nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B - NVIDIA의 40개 언어 오프라인 음성 인식 모델"
sourceUrl: https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B
summary: "NVIDIA가 40개 언어 전사, 최대 1시간 녹음, 6만 5,536토큰 컨텍스트를 지원하는 오픈 웨이트 음성 모델 Nemotron 3.5 Transcribe를 공개했어요. 전체 34B 중 약 4.3B만 활성화되는 하이브리드 MoE 구조예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

### 무엇인가

**Nemotron 3.5 Transcribe**는 NVIDIA가 10월 28일 공개한 오픈 웨이트 오프라인 음성·오디오 모델이에요. 녹음과 텍스트 지시를 받아 텍스트로 답해요. 상업·비상업 용도 모두 쓸 수 있고 라이선스는 OpenMDW-1.1이에요.

### 주요 사양

- 전체 34B, 활성 약 4.3B(오디오 인코더 포함)
- Mamba-2–Transformer 하이브리드 MoE 언어 모델 + 병렬 전문가 인코더(ASR 인코더, 화자 인코더)
- 6만 5,536토큰 컨텍스트, 녹음 최대 1시간
- 40개 언어 지원, 한국어는 'Leading' 등급
- BF16, FP8, NVFP4 버전, H100 80GB 한 장으로 배포 가능

### 할 수 있는 일

다국어 전사, 음성 번역, 문맥 기반 전사, 화자별 전사, 단어 타임스탬프, 언어 식별, 오디오 질의응답을 지원해요.

### 성능 주장

- 영어 Open ASR 리더보드 9개 평균 WER 4.71%로 오픈 웨이트 중 최고라고 해요(차점 Qwen3-ASR-1.7B 4.94%).
- 다국어 7개 언어 평균 WER 4.62%, 장문 10.98%예요.
- NIM 최적화 vLLM으로 RTX PRO 6000 한 장에서 초당 최대 2,238초 분량을 처리한다고 해요. 이 최적화는 아직 오픈소스에 들어가지 않았어요.

> 모델 카드의 앞부분과 주요 표를 읽었어요.
