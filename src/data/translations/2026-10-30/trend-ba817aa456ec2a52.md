---
id: trend-ba817aa456ec2a52
title: "AAII v5 공개 - 비공개 평가 비중을 60%로 높인 AI 모델 역량 지수"
sourceUrl: https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5
summary: Artificial Analysis가 Intelligence Index v5를 공개했어요. 비공개 테스트셋 비중을 60%로 높이고 FrontierCode 2.0, Terminal-Bench-Science를 새로 넣었어요. 발표 시점 1위는 Claude Opus 5.5(58점)였고, 오픈 가중치와의 격차는 12점으로 벌어졌어요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

Artificial Analysis 발표 글(2026-10-27)의 앞부분(구성 변경, 가중치, 주요 결과)을 읽고 옮겼어요. 벤치마크별 상세 설명은 다 읽지 못했어요. 다음 날 Gemini 4 Carbon이 59점으로 1위에 올랐다는 별도 글이 나왔어요.

### 무엇이 바뀌었나요

Intelligence Index는 실제 사용을 반영한 과제들로 모델 역량을 재는 종합 지수예요. v5는 1월 v4 이후 가장 큰 개편이고, 처음으로 **지수의 60%가 비공개 테스트셋이나 정답 비공개 평가**로 구성돼요. 시간에 따른 모델 역량을 하나의 연속 척도로 추적하는 **Progress Index v1**도 함께 내놓았어요.

- **새로 추가**: FrontierCode 2.0(Cognition의 비공개 실전 코딩 벤치마크, 메인테이너가 머지할지로 채점), Terminal-Bench-Science(터미널 환경의 과학 연구 과제 70개)
- **업그레이드**: HLE-Diamond(Humanity's Last Exam을 1,000문항으로 다듬은 버전), AA-Omniscience v1.1, CritPt v2 어려운 부분집합(40문항, 코드 실행 도구 사용)
- **유지**: AA-Briefcase, AutomationBench-AA, GDP.pdf, Terminal-Bench 4.0
- **제외**: GDPval-AA v2.1, SciCode, AA-LCR v1.1

### 가중치

지식 업무, 코딩, 과학, 일반이 각각 25%예요. 예를 들어 코딩은 FrontierCode 2.0 15%와 Terminal-Bench 4.0 10%, 일반은 AA-Omniscience v1.1 15%(정확도 10%, 비환각 5%)와 HLE-Diamond 10%로 짜였어요.

### 주요 결과 (발표 시점)

- **Claude Opus 5.5(max)가 58점**으로 1위, GPT-6 Astra(max, 57)와 GPT-6.1 Sol(max, 55)이 뒤를 이었어요. 상위 5개를 Anthropic과 OpenAI가 차지했고, Gemini 4 Argon(high)이 50점으로 다음이에요.
- **오픈 가중치 격차가 3점에서 12점으로** 벌어졌어요. 가중치 미공개인 Kimi K3.1 Pro가 46점으로 오픈 가중치 모델 1위이고, 이미 공개된 가중치 중에선 DeepSeek V4.1 Flash 1017과 GLM-5.3이 32점으로 선두예요.
- 상위 10개 모델의 과제당 비용 차이는 13배가 넘어요. GPT-6.1 Terra(max)가 $0.96로 가장 싸고, Claude Fable 5.1(max)이 $13.04로 가장 비싸요.
