---
id: trend-dc7a9d3c8c76a5ac
title: "Tracing where LLM &quot;slop&quot; style comes from in the model and in training, and cutting it out [R]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x64lbk/tracing_where_llm_slop_style_comes_from_in_the"
summary: "엠대시, 'X가 아니라 Y', 세 개 나열 같은 LLM 특유의 '슬롭' 문체가 모델 안 어디에 있고 어느 학습 단계에서 생기는지 추적한 연구예요. SFT가 수사 구조를 넣고 DPO가 슬롭 점수를 두 배로 올렸고, LoRA로 83% 줄였다고 해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Reddit이 원문 페이지에 403을 돌려줘 **RSS 본문**을 기준으로 옮겼어요. 작성자의 인터랙티브 글(100toolkit.com)은 읽지 않아 `partial`로 표시해요.

### 질문
엠대시, "it's not X, it's Y", 세 개짜리 목록, 유행어 같은 알아보기 쉬운 어시스턴트 문체가 모델 안 어디에 있고, 어느 학습 단계가 이를 심는지 찾고 싶었다고 해요.

### 어디에 있나
- Qwen3-4B-Instruct에서 모델 자신의 과장된 글과 담백한 글의 평균 차이(difference-in-means) 방향이 직접 쓴 최소 쌍 64개를 구분해요.
- 이 방향은 일반 출력에서 트로프 기반 슬롭 점수와 최대 0.82의 상관을 보여요.
- logit lens로 보면 "레지스터 축"이 드러나요. 한쪽은 웅장하고 추상적인 어휘, 반대쪽은 "really", "basically", "stuff" 같은 담백한 표현이에요.
- 트로프별 방향은 언어를 넘나들어요. "not X, but Y" 방향은 중국어 而是("오히려")를 끌어올려요.

### 어디서 오나
- 베이스 모델에도 같은 방향이 있지만(중간 층 코사인 0.90–0.97), 베이스는 담백한 쪽에 가깝게 써요.
- OLMo 2 1B의 공개된 모든 학습 단계를 재 보니, **SFT가 수사 구조를 들여오고 DPO가 유행어와 마크다운 서식으로 슬롭 점수를 두 배로** 만들었어요.
- OLMo 선호 데이터 3,000쌍을 채점하니 57%에서 "chosen" 응답이 더 슬롭했어요.

### 걷어내기
- 방향 제거(directional ablation)는 오히려 슬롭을 최대 89% 늘렸어요. 깨끗한 글이 이 축에 음수로 투영되기 때문이에요.
- 12–23층에서 고정 벡터를 빼는 방식은 좁은 KL 예산(사람 글 기준 토큰당 약 0.4 nats) 안에서 동작하고, 토큰 금지로는 못 건드리는 구조적 트로프를 줄여요.
- 이를 rank-16 LoRA로 증류하면 시스템 프롬프트 없이 슬롭 점수가 83% 줄고, KL은 스티어링보다 낮고, 작은 QA 점검에서 성능 하락이 없었다고 해요.

### 한계
슬롭 채점기는 작성자가 만든 정규식 탐지기이고, 주요 결과는 4B 모델 하나와 OLMo 2 1B에서 나왔으며, 아직 사람 평가가 없다고 밝혀요. 토큰 수준에서 슬롭을 다루는 Antislop(Paech et al., 2025)과는 표현 쪽에서 보완 관계라고 해요.
