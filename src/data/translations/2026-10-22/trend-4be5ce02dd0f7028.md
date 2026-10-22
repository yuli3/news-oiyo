---
id: trend-4be5ce02dd0f7028
title: "[New Model] Sage-A1.5 released based on Qwen3.6-35B MoE with marketed benchmarks: &quot;highly competitive performance against frontier-scale systems such as Kimi-K3, GLM-5.3, and GPT-5.6-sol&quot;"
sourceUrl: https://huggingface.co/InternScience/Sage-A1.5
summary: "상하이 AI 연구소 계열 InternScience가 Qwen3.6 기반 35B MoE 과학 에이전트 모델 Sage-A1.5를 공개했어요. 작업 조직(오케스트레이션), 검증, 개방형 과학 발견을 강조하지만 커뮤니티는 홍보성 벤치마크에 의문을 제기해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> 허깅페이스 모델 카드 소개 부분을 기준으로 옮겼어요. 페이지 대부분이 채팅 템플릿 코드라 벤치마크 표는 읽지 못했어요. r/LocalLLaMA 글 제목은 "홍보성 벤치마크"라는 비판조예요.

### 무엇인가

**Sage-A1.5**는 **Qwen3.6**과 상하이 AI 연구소의 **Agents-A1**을 바탕으로 한 **35B 전문가 혼합(MoE) 에이전트 모델**이에요. 장기적인 과학 문제 해결을 "적응적 능력 조합"으로 발전시키는 걸 목표로 해요.

### A1에서 달라진 점

A1을 기반으로, 개별 과제를 푸는 것뿐 아니라 **일을 조직하고 실행 중에 접근 방식을 고치는 법**까지 배운다고 해요. 강조하는 능력은 세 가지예요.

- **에이전트 오케스트레이션(Agentic Orchestration)**
- **검증(Verification)**: 채팅 템플릿에 `chat_template_kwargs={"verification": true}`로 켜는 검증 프로토콜 스위치가 있어요. 켜면 시스템 메시지 끝에 학습 때와 똑같은 트리거 문구가 붙고, 시스템 메시지가 비어 있으면 오류를 내요.
- **개방형 과학 발견(Open Scientific Discovery)**

### 배포

Transformers 형식의 가중치와 설정 파일이 있고 vLLM, SGLang, Docker Model Runner와 호환돼요. 템플릿은 이미지·영상 입력도 처리해요.

### 커뮤니티 반응

r/LocalLLaMA에는 "마케팅용 벤치마크와 함께 나왔다"는 제목으로 공유됐어요. 성능 주장은 독립 평가를 기다려 보는 게 좋겠어요.
