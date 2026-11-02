---
id: trend-61b39ba966cbc32d
title: "Using thousands of AI agents to uncover new leads in biological data"
sourceUrl: https://openai.com/index/scaling-ai-research-for-complex-biological-data
summary: "OpenAI·PerturbAI·Scripps Research가 GPT-Rosalind 기반 AI 에이전트 수천 개를 병렬로 돌려, 수백만 개 생쥐 뇌세포 CRISPR 데이터를 32분 만에 분석하고 알츠하이머·파킨슨 연구 단서를 찾았어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> 원문 앞부분(배경과 '분산 생물학적 추론' 방식)을 기준으로 옮겼어요. 구체적 발견 사례와 논문은 다 읽지 못했어요.

### 무엇을 했나

과학자들이 알츠하이머와 파킨슨병의 새 단서를 몇 달이 아니라 몇 분 만에 찾을 수 있다면 어떨까요? OpenAI, PerturbAI, Scripps Research는 **GPT-Rosalind** 기반 AI 에이전트 **수천 개**로 수백만 개 생쥐 뇌세포의 기존 실험 데이터를 **32분** 만에 분석하고 해석했어요. 에이전트들은 유전자 교란의 효과를 과학 문헌의 발견과 연결해, 질병 이해와 새 치료 연구 방향에 도움이 될 **예상치 못한 생물학적 연결**을 찾아냈어요.

### 왜 필요한가

현대 실험은 과학자가 다 들여다볼 수 없을 만큼 많은 데이터를 만들어요. 이제 수천 개 유전자를 바꾸고 수백만 개 세포에서 그 효과를 잴 수 있어요. 하지만 그 결과가 사람 질병에 무슨 의미인지 알려면 복잡한 실험 결과를 수십 년간 흩어진 과학 지식과 연결해야 해요. AI가 놓칠 수 있는 유망한 단서를 찾도록 도울 수 있는 지점이에요.

> 우리가 세포 아틀라스를 만드는 건 다른 과학자들이 우리가 상상하지 못한 발견을 하도록 하기 위해서예요. AI는 더 많은 연구자가 이 자원을 탐색하고 예상 밖 관찰을 시험할 새 질문으로 바꾸도록 도울 수 있어요. — Sarah Teichmann, 케임브리지대 줄기세포의학 석좌, Human Cell Atlas 공동 창립 의장

### 방법: 분산 생물학적 추론

팀은 분석을 GPT-Rosalind 기반 에이전트 수천 개에 나눴고, 이 방식을 **분산 생물학적 추론(distributed biological reasoning)**이라고 불러요.

- 대상 데이터는 **생쥐 전뇌 CRISPR 아틀라스**예요. 유전자 교란이 생쥐 뇌의 여러 세포 유형에 어떤 영향을 주는지 보여 줘요.
- 각 에이전트는 유전자 교란 하나를 맡아 세포 반응을 분석하고, 과학 문헌을 검색하고, 결과에 대한 설명을 제안했어요.
- 에이전트 보고서를 합쳐 유전자와 세포 반응, 문헌을 잇는 **추론 아틀라스(reasoning atlas)**를 만들었어요.

결과는 과학자가 검증할 연구 단서이고, 그 자체로 치료법 발견을 뜻하지는 않아요.
