---
id: trend-0f2810d94aae3d06
title: "Using latent-agent swarms for math discovery and optimization [R]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xrunu7/using_latentagent_swarms_for_math_discovery_and
summary: "연구진이 AlphaEvolve 같은 'evolve' 방식을 빠르고 싸게 만든 SwarmEvolve 논문을 소개했어요. Qwen3 8B~32B 위에서 잠재 공간으로 추론하며 KV 캐시를 주고받는 에이전트 수백 개를 군집으로 돌려, 다른 오픈소스 구현이 1시간 넘게 걸린 점수에 약 5분 만에 도달했다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Reddit은 수집 환경에서 막혔고(API 키 없음, Wayback 스냅샷 없음) RSS에 실린 게시글 본문을 기준으로 옮겼어요. 논문 본문은 읽지 않았고 코드는 "곧 공개" 상태라 `partial`이에요.

### 배경

작년 Google DeepMind의 AlphaEvolve가 1969년 이후 깨지지 않던 4x4 복소 행렬 곱셈 기록을 앞섰다고 작성자는 소개해요. LLM이 프로그램을 쓰고, 점수를 매기고, 반복해서 고치는 방식이라 "evolve"라고 불러요. 하지만 AlphaEvolve는 Gemini 모델 위에서 돌고, 비슷한 오픈소스 구현은 대개 느리고 비싸다고 해요.

### SwarmEvolve

작성자 /u/QileHQ 팀은 이를 더 빠르고, 싸고, 좋게 만들려고 했어요.

- Qwen3 8B, 14B, 32B 위에서 **잠재 추론 에이전트 수백 개**를 군집(swarm)으로 돌려요.
- 약 5분 만에 OpenEvolve, ShinkaEvolve, CodeEvolve가 1시간 넘게 걸려 도달한 점수에 닿았다고 해요.

### 어떻게 빨라졌나요

LatentMAS 연구에서 영감을 받아, 에이전트들은 생각을 글로 쓰지 않아요. 잠재 공간에서 추론하고 **KV 캐시를 서로 넘겨**, 여러 에이전트의 아이디어가 모델 안에서 바로 섞여요. 이게 처리량을 크게 높였다고 해요. 작은 에이전트는 싸서 많이 돌릴 수 있고, 각자 다른 초점을 갖게 해 군집으로 묶어요. 에이전트가 많을수록 매 라운드 아이디어가 다양해지고 해 공간을 더 넓게 탐색해 좋은 프로그램을 빨리 찾는다고 설명해요.

### 결과

시도한 모든 모델 크기에서 효과가 있었고, 8B 모델만으로도 알려진 최고 원 채우기(circle packing) 결과와 같아졌다고 해요. Qwen3.5와 Muse 모델로도 넓혀 더 좋은 성능을 봤다고 밝혀요. 작성자는 재료과학, 생물학 같은 실제 과학 문제에 적용할 아이디어와 협업을 찾고 있어요.
