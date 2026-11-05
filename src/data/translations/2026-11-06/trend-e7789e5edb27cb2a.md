---
id: trend-e7789e5edb27cb2a
title: "DevRev delivers autonomous self-service with GPT-6.1 Sol"
sourceUrl: https://openai.com/index/devrev-enterprise-self-service
summary: "DevRev가 GPT-6.1 Sol로 기업 서비스용 에이전트 Computer와 Operator를 운영하는 사례를 OpenAI가 소개했어요. CTO는 추론 능력·신뢰성·정렬과 함께 응답 지연과 비용의 균형이 핵심이라고 말했어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

OpenAI 고객 사례 글(2026-11-04)을 대부분 읽고 옮겼어요. 마지막 문단 일부를 읽지 못해 **partial**로 표시했어요.

### 개요
DevRev는 서비스·운영팀이 가장 어려운 고객·직원 요청까지 끝까지 처리하도록 돕는 **Computer**와 **Operator**를 만들었어요. CTO Ahmed Bashir는 두 제품이 실시간 데이터를 가로질러 추론하고, 행동은 되돌릴 수 있으며, 답은 출처를 가리키도록 설계했다고 설명해요.

- 회사 규모: 스타트업 / 지역: 북미 / 산업: 기술
- 사용 제품: API, Codex

### 모델과 하네스
DevRev는 GPT-6 Astra와 GPT-6.1 Sol 같은 OpenAI 모델을, 회사 지식을 연결하고 에이전트가 할 수 있는 행동을 팀이 통제하게 하는 자체 하네스와 결합해요. DevRev는 OpenAI 모델이 고객과 직원을 응대하는 데 필요한 속도와 비용 안에서 추론력과 신뢰성을 준다고 봐요.

> "올바른 추론 능력, 신뢰할 수 있고 높은 정렬, 그리고 무엇보다 지연 시간 측면에서 실제로 동작해야 한다는 것의 조합이에요." — Ahmed Bashir, DevRev CTO

### 회사 맥락과 함께 쓰기
OpenAI 모델은 Computer와 Operator의 추론, 계획, 도구 선택을 맡아요. DevRev의 Agent Studio에서는 사용자가 AI와 대화로 도구가 어떻게 동작할지 설명하고, 일부 동작은 고정 규칙으로 정할 수 있어요.

DevRev는 회사 맥락을 공급하고 권한을 적용하며 행동을 통제하는 소프트웨어와 모델을 함께 시험해요. 자체 **Enterprise-Bench**는 데이터에 여러 버전이 있거나, 정보가 여러 시스템에 흩어져 있거나, 접근 권한이 역할에 따라 다를 때 얼마나 잘 동작하는지 평가해요. Ahmed는 GPT-6.1 Sol이 이 평가에서 좋은 성과를 냈고, 고객이나 직원이 에이전트와 대화할 때 요청의 뉘앙스를 이해하고 빠르게, 감당할 수 있는 비용으로 답해야 하는데 "그 균형을 완벽하게 맞춘다"고 말했어요.
