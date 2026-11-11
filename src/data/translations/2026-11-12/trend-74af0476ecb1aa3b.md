---
id: trend-74af0476ecb1aa3b
title: "KRAFTON/Raon-1-nano · Hugging Face"
sourceUrl: https://huggingface.co/KRAFTON/Raon-1-nano
summary: "크래프톤 AI가 한국어·영어 지시 수행과 도구 호출에 맞춘 소형 언어 모델 Raon-1 nano를 Apache 2.0으로 공개했어요. 유효 파라미터 15억(전체 31억), 26만 토큰 컨텍스트, GGUF·MLX·LiteRT-LM 형식으로 온디바이스 실행을 지원해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

r/LocalLLaMA에 올라온 Hugging Face 모델 페이지(KRAFTON/Raon-1-nano)의 README를 개요·구조·학습 절까지 읽고 옮겼어요. 벤치마크 표의 수치는 반영하지 못했어요.

### 무엇인가

**Raon-1 nano**는 크래프톤 AI(KRAFTON AI)가 만든 dense 언어 모델이에요. 유효 파라미터 **1.5B**(층별 임베딩 테이블 1.5B를 포함하면 전체 **3.1B**)이고, 한국어와 영어 모두에서 **지시를 따르고 대화 맥락을 유지하며 알맞은 도구를 호출**하도록 설계됐어요. Raon 오픈 모델 계열의 하나로 **Apache 2.0** 라이선스예요.

### 특징

- 비교 모델 대비 지시 수행, 맥락 따르기, 한국어 대화 벤치마크에서 앞선다고 밝혀요.
- 한국어와 영어로 학습했어요.
- 사무 작업, 모바일 제어 같은 일상 작업을 위한 대화 중 도구 호출을 지원해요.
- GGUF, MLX, LiteRT-LM 형식으로 Apple Silicon 등에서 로컬 추론할 수 있어요.
- 기본 컨텍스트는 **262,144토큰**이에요.

### 구조

- 24개 층 중 18개가 **Raon Delta Attention(RDA)**(지우기·쓰기 게이트가 분리된 게이티드 델타 규칙 선형 어텐션, 고정 크기 상태), 6개가 Gated MLA 층이에요. KV 캐시는 MLA 층에만 있어 BF16 기준 토큰당 약 7KiB예요.
- **Raon-mHC**는 DeepSeek의 manifold-constrained hyper-connections(mHC) 연산 비용을 줄여 학습을 빠르게 해요.
- 층마다 토큰별 256차원 **층별 임베딩**을 두고, 위치 인코딩은 쓰지 않아요(NoPE). 어휘 259,840개, 다중 토큰 예측(MTP) 모듈 55M이 붙어 있어요.

### 학습

Raon-1 mini preview(30B-A4B)에서 **MoE-to-Dense** 가지치기와 지식 증류로 만들었고, 3T 토큰 추가 사전학습 뒤 SFT, mini preview로부터의 on-policy distillation, 강화학습을 거쳤어요.
