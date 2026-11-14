---
id: trend-117fbcf6d8aad79d
title: "ARC 1.0: A decision model for routing AI agents across cloud and local models"
sourceUrl: https://huggingface.co/rayline-ai/ARC-1.0
summary: "Rayline이 에이전트 대화를 읽고 어떤 모델과 추론 강도를 쓸지 판단 신호를 내는 라우팅 모델 ARC 1.0(Qwen3.5-0.8B 기반)을 공개했어요. 하이브리드 구성에서 Opus 5.5 품질의 97.5%를 비용 92.9% 절감으로 유지했다고 주장해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

Hugging Face 모델 카드의 앞부분(기능, 정책, 평가 중 라우팅 비교)을 옮겼어요. PII·분류 평가 이후와 사용법은 읽지 못했어요. 수치는 모두 Rayline 기술 보고서 기준 자체 평가예요.

### 무엇인가

**ARC(Adaptive Routing Controller) 1.0**은 클라우드와 로컬 모델 사이에서 AI 에이전트 요청을 나누는 **판단 모델**이에요. 에이전트 대화를 읽고 모델과 추론 강도를 고르는 데 쓸 신호를 내면, 애플리케이션이 그 신호를 자기 모델 목록, 가격, 정책과 합쳐 다음 요청을 어떻게 처리할지 정해요. 기반은 **Qwen3.5-0.8B** 파인튜닝이고 Apache-2.0이에요.

### 예측과 정책을 나눠요

ARC는 성공 확률과 토큰 사용량을 **예측**하고, 가격과 품질·비용·로컬 실행 사이 균형은 애플리케이션이 **정책**으로 정해요. 모델과 서빙 설정이 그대로면 가격이 바뀌어도 예측기를 다시 학습할 필요가 없어요.

내는 신호는 이래요.

- **모델 성공 확률**: 후보 모델별로 작업을 끝낼 확률
- **토큰 사용량**: 캐시 안 된 입력, 캐시 읽기·쓰기, 출력 추정
- **추론 품질과 사용량**: 한 모델 안에서 추론 설정별 이득과 비용
- **PII 탐지**: 민감 정보 유무와 종류
- **요청 분류**: 작업과 도메인 다중 라벨
- **개발자 정의 신호**: 질문과 보기를 주면 답별 확률을 내는 범용 질문 헤드

### 정책 프리셋

같은 라우팅 모델에 **효용 = V × 예측 성공 − 예상 비용** 식을 써요.

- **ARC Sage**(V = 4.5): 성공에 더 큰 가치를 둬요.
- **ARC Swift**(V = 0.1): 비용 절감에 더 무게를 둬요.
- **Prefer-local**: 로컬 모델의 예측 성공이 임계값을 넘으면 로컬을 쓰고, 아니면 대체 정책을 따라요.

### 평가 (자체 보고)

- **하이브리드 엣지-클라우드**: 6개 벤치마크에서 Opus 5.5 품질의 **97.5%** 를 **비용 92.9% 절감**으로 유지했다고 해요. DeepSeek V4.1 Flash를 여러 DGX Spark에 올리고 prefer-local 임계값 0.85를 쓴 구성이에요.
- **ARC Sage 대 Opus 5.5**: DeepSWE 68.7% 대 69.9%(비용 7%), Terminal-Bench 2.1 92.4% 대 91.0%(58%), GPQA Diamond 94.1% 대 89.9%(21%)였어요. 반면 Tau3 Banking은 33.2% 대 42.8%로 낮았어요.
- **다른 라우터와 비교**(RouteBench 0~10점): ARC Sage 평균 9.3, ARC Swift 9.1, Pareto 9.2, Fugu Max 7.1이었고, OpenRouter Auto 계열은 Terminal-Bench 결과가 없어 평균이 없어요.
- **Prefer-local 대 Opus 5.5**: DeepSWE 72.3% 대 69.9%를 비용 1.1%로, Tau3 Banking은 35.3% 대 42.8%였어요.

카드는 프리셋은 선호를 나타낼 뿐이고 실제 품질과 비용은 요청, 모델 구성, 실행 환경에 달려 있다고 덧붙여요.
