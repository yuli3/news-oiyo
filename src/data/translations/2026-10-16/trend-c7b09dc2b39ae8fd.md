---
id: trend-c7b09dc2b39ae8fd
title: "LLM이 그린 펠리컨은 왜 이렇게 생겼을까?"
sourceUrl: "https://arcfu.com/post/the-emperor-pelican-has-no-clothes"
summary: "'자전거 타는 펠리컨 SVG' 프롬프트에 LLM들이 거의 똑같은 그림을 내는 현상을 '다양성 붕괴'로 짚는 짧은 글이에요. UI 디자인 창의성 벤치마크에서 최고 모델 GPT-6 Astra는 65.5점, 사람 기준은 92.3점이었어요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

arcfu.com 원문을 직접 읽었어요. 원문은 그림 위주의 짧은 글이라 텍스트로 옮길 수 있는 내용이 많지 않아요.

### 왜 LLM 펠리컨은 다 이렇게 생겼을까
Simon Willison이 여러 모델에 "Generate an SVG of a pelican riding a bicycle"을 돌린 결과(SVG를 낸 가장 높은 추론 설정 기준)를 모아 보면, 모델마다 펠리컨이 놀라울 만큼 비슷하게 생겼어요. 글은 이 그림들 옆에 훨씬 다양할 수 있었던 펠리컨 그림을 나란히 보여 줘요.

> This is the LLM diversity collapse problem no one is talking about.

### UI 디자인에서도 같은 문제
작성자 쪽은 LLM 창의성 연구의 일부로 UI 디자인의 다양성 붕괴를 벤치마크했다고 해요. Design Creativity Bench 점수는 이래요.

- 사람 기준: 92.3
- GPT-6 Astra: 65.5
- GPT-6.1 Sol: 63.7
- Grok 4.7: 62.2
- Gemini 3.8 Flash: 60.6

### 벤치마크 소개(Dipanjan Dey의 X 글 인용)
- 16개 프런티어 모델을 80개 열린 UI 과제로 평가했고, 과제마다 두 개 제품 영역에 맞춰 바꾸고 사람 디자이너 결과와 비교했어요.
- 기존 UI 벤치마크가 품질 하나만 보는 것과 달리 세 가지를 재요.
  - **Originality**: 같은 브리프에서 다른 모델과 얼마나 다른가
  - **Creative Range**: 제품 영역이 바뀔 때 디자인 결정을 얼마나 바꾸나
  - **Appropriateness**: 브리프의 기능 요구를 얼마나 충족하나
- 기능하는 웹사이트와 UI는 잘 만들지만 창의적인 디자인 결정은 여전히 어렵다는 결론이에요. 리더보드, 논문(arXiv), Hugging Face 데이터셋, GitHub 평가 프레임워크를 공개했어요.
