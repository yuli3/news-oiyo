---
id: trend-3f5f16f24d28b42b
title: "Too good to be true? ISTA's GSQ-RCO 2-bit DeepSeek-V4.1-Flash scoring the same as the base model"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xes5x0/too_good_to_be_true_istas_gsqrco_2bit
summary: "r/LocalLLaMA 사용자가 ISTA의 GSQ-RCO 2비트 DeepSeek-V4.1-Flash GGUF가 원본과 같은 점수를 낸다는 벤치마크를 믿어도 되는지 물었어요. 벤치마크가 포화돼 열화가 안 보일 수 있다며 KLD·PPL 측정을 찾았어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> Reddit이 자동 수집을 막아 RSS 피드에 실린 본문을 기준으로 옮겼어요. 원문은 짧은 질문이고, 댓글과 링크된 Hugging Face 페이지의 수치는 읽지 못했어요.

### 질문 내용

작성자 u/Queasy_Back2588은 **ISTA(ISTA-DASLab)**가 올린 **GSQ-RCO** 방식의 **DeepSeek-V4.1-Flash** GGUF를 써 본 사람이 있는지 물었어요.

- 이들의 벤치마크로는 **IQ2_XXS(약 2비트)**가 **원본 모델과 같은 점수**를 낸대요.
- 실제로 써 보면 품질이 벤치마크만큼 좋은지 궁금하대요.

### 의심하는 이유

- 그들의 벤치마크는 이미 **포화**돼 있어요. 점수가 90% 이상이고, **AIME25는 모든 버전이 100점**이래요.
- 그래서 양자화로 생긴 **열화를 보여 줄 수 없을** 가능성이 있대요.
- GSQ-RCO 모델의 **KLD(쿨백–라이블러 발산)** 측정은 찾지 못했대요.

### 묻는 것

1. 누가 **KLD나 PPL(퍼플렉서티)**을 재 봤는지
2. 약 **2 bpw(가중치당 비트)**에서 어느 정도 KLD를 예상해야 하는지

링크된 저장소는 `ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF`예요. 작성자는 영어가 모국어가 아니라 이 글을 번역할 때 LLM의 도움을 받았다고 밝혔어요.

### 읽을 거리

포화된 벤치마크 점수만으로는 저비트 양자화의 품질 손실을 판단하기 어렵다는 지적이 핵심이에요. 원본 분포와의 차이를 직접 재는 KLD 같은 지표를 함께 봐야 한다는 문제 제기예요.
