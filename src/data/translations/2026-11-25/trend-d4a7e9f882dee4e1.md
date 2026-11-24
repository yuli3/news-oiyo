---
id: trend-d4a7e9f882dee4e1
title: "Show HN: KradleBench – Multi-agent AI evals in Minecraft"
sourceUrl: https://www.kradle.ai/?1=
summary: "Kradle이 실시간 마인크래프트 세계에서 프런티어 AI 모델을 협업·경제·갈등·논리·창의성으로 평가하는 KradleBench를 공개했어요. 종합 1위는 GPT-6.2 Astra(78.3점)이고, 숙련된 인간 SethBling이 77.2점으로 뒤를 이었어요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

### KradleBench란
Kradle(Kradle PBC)은 "AI를 더 나은 미래로 이끈다"는 문구를 내건 회사로, 살아 있는 멀티에이전트 마인크래프트 세계에서 프런티어 AI 모델을 평가하는 KradleBench를 운영해요. "똑똑한 것만으로는 부족하다. AI는 반응하고 환경에 적응해야 한다"고 말해요. 정적 벤치마크와 다른 점은 다섯 가지예요.
- **동적:** 모델이 생각하는 동안에도 세계가 바뀌어요.
- **장기:** 한 번에 2~15분씩 돌고, 초반 선택이 나중 결과에 영향을 줘요.
- **멀티에이전트:** 공동 목표를 위해 협력하거나 자원을 두고 경쟁해요.
- **실시간:** 에이전트가 결정하는 사이에도 세계가 진행돼요.
- **3D 체화:** 구조화된 관찰을 받고 코드로 캐릭터를 움직여요.

### 평가 항목
협업(누가 다른 이와 가장 잘 일하나), 경제(누가 가장 많은 부를 모으나), 갈등(누가 싸움에서 이기나), 논리(누가 3D 퍼즐을 가장 잘 푸나), 창의성(누가 알아볼 수 있는 물체를 만드나)이에요. 실행 결과는 인터랙티브 3D 리플레이로 볼 수 있어요.

### 종합 순위 (100점 만점, 11월 20일 갱신, 총 28개 모델)
1. GPT-6.2 Astra(OpenAI) 78.3
2. 숙련된 인간 SethBling 77.2
3. GPT-6.2 Sol(OpenAI) 67.9
4. GPT-6 Astra 56.1, 5. GPT-6.1 Sol 54.6, 6. GPT-6.1 Terra 48.6
7. Gemini 4 Hydrogen(Google) 43.9, 8. Gemini 4 Neon 39.9
9. Claude Opus 5.5(Anthropic) 39.1, 10. Claude Fable 5.2 37.8, 11. Claude Sonnet 5.5 33.8
12. Gemini 4 Argon 28.6, 13. Muse Wonder(Meta) 27.6, 14. Muse Ember 25.7, 15. Gemini 3.8 Flash 24.3, 16. Grok 4.7 23.0

항목별로는 경제(100.0)와 갈등(90.0)에서 SethBling이 1위였고, 논리와 창의성은 GPT-6.2 Astra가 100.0점이었어요. 실행당 LLM 비용은 GPT-6.2 Astra 1.26달러, GPT-6.2 Sol 0.35달러였어요.

### 눈에 띈 발견
- **협업:** 10배속 피라미드 건축에서 GPT-6.1 Sol은 효율적으로, Claude Haiku 5.5는 비효율적으로 협업했어요.
- **알아볼 수 있는 건축:** 고질라 만들기에서 GPT-6.2 Astra와 Gemini 4 Carbon은 100.00점, SethBling은 18.42점이었어요.
- **사람 대 모델:** SethBling은 빠른 판단과 적응으로 경제·갈등에서 모델을 이기지만, 혼자 하는 논리·창의성 과제에서는 상위 모델에 못 미쳐요.
- **의외의 전략:** 경제 과제 Harvest Hustle에서 GPT-6.1 Sol은 다이아몬드로 검과 흉갑을 만들어 경쟁자를 모두 제거하고 유일한 생존자로 이겼어요. 무기를 주지 않는 과제라 모델이 폭력을 쓰는 일은 드물다고 해요.

성능 대비 비용 효율 경계에는 GPT-6 Luna, DeepSeek V4.1 Flash, Muse Ember, GPT-6.1 Terra, GPT-6.1 Sol, GPT-6.2 Sol, GPT-6.2 Astra가 올랐어요.
