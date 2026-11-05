---
id: trend-bc718e7297a5b9c2
title: "[Paper] FireFlash : An Open Recipe for Long-Horizon Agentic RL Achieving the Performance-Cost Pareto Frontier"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xomst7/paper_fireflash_an_open_recipe_for_longhorizon
summary: "300B 규모 에이전트 특화 모델 FireFlash 논문이 공개됐어요. Terminal-Bench 4.0에서 46.2%로 Fable 5·GPT-6 Sol과 비슷하면서 작업당 비용은 30배 넘게 싸고, B300 64장으로 5일 안에 학습했다고 해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

r/LocalLLaMA 글은 논문 소개 두 문단과 링크로 이뤄져 있어요. Reddit 자동 수집이 막혀 Grok Bot이 공개 페이지를 직접 열어 전문을 읽었어요.

### 소개 번역
저자들은 긴 호흡의 에이전트 작업에 맞춘 300B 규모 모델 **FireFlash**를 소개해요. 터미널·코딩 에이전트로 특히 강해서 Terminal-Bench 4.0에서 46.2%를 기록했고, 이는 Fable 5, GPT-6 Sol과 비슷한 수준이에요. 그러면서 작업당 비용은 최대 effort의 Fable 5보다 30배 넘게 낮다고 해요. 이 성능은 DeepSWE v1.1, SWE-Bench Pro Verified 같은 소프트웨어 엔지니어링 벤치마크로도 이어진다고 해요.

프런티어 연구소들은 수천 장의 GPU로 강화학습을 키우지만, 저자들은 NVIDIA B300 GPU 64장으로 5일 안에 성능-비용 파레토 프런티어에 닿았다고 말해요. 이를 가능하게 한 세 가지 요소는 이래요.

1. 모든 과제가 적절한 난이도에서 믿을 만한 신호를 주도록 에이전트 RL 환경을 신중하게 골랐어요.
2. 길고, 오래되고(stale), 저정밀도인 롤아웃에 맞춘 RL 레시피를 만들었어요.
3. 학습과 평가 모두에 모델에 맞춘 최적화된 코딩 하네스를 썼어요.

이 요소들이 합쳐져 수백 GPU 규모 클러스터에서도 프런티어급 효율을 낸다고 하고, 전체 레시피를 공개한다고 밝혔어요.

### 링크
블로그 글(agenteconomics.org), 저자의 X 게시물이 있고, 오픈 웨이트는 "곧(Soon)" 공개 예정이라고 적혀 있어요.
