---
id: trend-4f3ff4db251ee608
title: "inclusionAI/Ling-3.1-flash-1019 · Hugging Face"
sourceUrl: https://huggingface.co/inclusionAI/Ling-3.1-flash-1019
summary: "inclusionAI의 Ling-3.1-flash-1019 모델 카드예요. 총 560B·활성 25B 하이브리드 선형 MoE, 1M 컨텍스트이고, 후학습으로 AA-Briefcase 약 1400→1524 Elo, AutomationBench-AA 62→68%, AA Intelligence Index 41→44로 올랐대요. SGLang 실행을 권해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> r/LocalLLaMA에 공유된 Hugging Face 모델 카드(README)를 직접 읽어 옮겼어요.

### 소개

**Ling-3.1-flash-1019**는 Ling-3.1-flash의 업그레이드판이에요. 총 **560B**, 토큰당 활성 **25B**, **1M 토큰 컨텍스트**이고, 추가 후학습으로 추론과 실제 에이전트 역량이 크게 좋아졌대요.

| 지표 | 이전 | 1019 |
|---|---|---|
| AA-Briefcase | 약 1400 | 1524 Elo |
| AutomationBench-AA | 62% | 68% |
| CritPt | 18% | 26% |
| SciCode | 54% | 57% |
| AA Intelligence Index v4.3.2 | 41 | 44 |

### 모델 구조

| 항목 | 값 |
|---|---|
| 아키텍처 | 하이브리드 선형 MoE |
| 레이어 | KDA 63 + Gated MLA 9 (7:1) |
| 덴스 레이어 | 4 |
| 라우팅 전문가 / 공유 전문가 / 활성 전문가 | 512 / 1 / 8 |
| 어텐션 헤드 | 64 |
| 히든 크기 | 4096 |
| 어휘 | 157,184 |

### 실행

- **SGLang 권장**: day-0 이미지 `lmsysorg/sglang:dev-ling-3.1-flash`가 Ling-3.1-flash, MTP(NEXTN) 추측 디코딩, Hopper 디코드 최적화를 지원해요.
- 서버 예시는 H200 8장(TP8 + EP8), GB300 4장이면 `--tp 4 --ep 4`예요. 선택적 Hopper 최적화로 배치 1 디코드가 약 10% 빨라진대요.
- OpenAI 호환 `/v1/chat/completions`로 호출하고 `enable_thinking`으로 추론을 켜요.
- H200, GB300, H800, H100, B200 레시피와 측정치는 SGLang 쿡북에 있대요.

참고로 README의 서버 예시 경로는 아직 `inclusionAI/Ling-3.1-flash`로 적혀 있어요.

> 모델 카드 앞부분(소개, 구조, 빠른 시작)을 기준으로 옮겼어요.
