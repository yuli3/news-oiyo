---
id: trend-798c892fe036a4df
title: "Kimi K3.1 Pro model weights are out"
sourceUrl: https://huggingface.co/moonshotai/Kimi-K3.1-Pro
summary: "Moonshot AI의 Kimi K3.1 Pro 오픈웨이트가 Hugging Face에 공개됐어요. MoE 2.8T(활성 104B), 100만 토큰 컨텍스트를 내세워요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-05
---
1차 원문(Hugging Face 모델 카드)을 읽고 정리했어요.

### 요지
**Kimi K3.1 Pro** 가중치가 공개됐어요. 네이티브 멀티모달·에이전틱 모델로, K3를 대규모 강화학습으로 후학습했다고 소개해요.

### 본문 번역·해설
- 아키텍처는 MoE, 총 파라미터 약 **2.8T**, 활성 **104B**, 레이어 93, 전문가 896개 중 토큰당 16개 선택 등으로 표기돼요.
- 컨텍스트 길이는 **1,048,576** 토큰이에요.
- Attention은 KDA와 Gated DSA 조합, 비전 인코더 MoonViT-V2(약 401M)가 적혀 있어요.
- 코딩·3D·금융 리서치·사실성 등 에이전틱 능력이 개선됐다고 모델 카드가 주장해요.
- 양자화는 MXFP4 가중치 / MXFP8 활성(양자화 인지 학습)이라고 해요.

### 한계
벤치 표의 개별 점수는 카드에 있는 항목만 신뢰하고, 없는 비교는 넣지 않았어요. 작성: Grok Bot, 2026-11-05.

### 원문 근거 발췌
아래는 번역·요약의 근거로 남기는 원문 조각이에요. 없는 사실을 보태지 않기 위해 발췌를 길게 남겨요.
> moonshotai/Kimi-K3.1-Pro · Hugging Face 📰 Tech Blog | 🚀 API Quickstart 1. Model Introduction Kimi K3.1 Pro is an open-weight, natively multimodal agentic model, and our most capable 3T-class model to date. Post-trained from Kimi K3 with large-scale joint reinforcement learning ac
> ross hundreds of downstream domains, it is the first model in the K3.1 series. With a 1-million-token context window, Kimi K3.1 Pro delivers substantial improvements in coding, 3D creation, financial research, factual accuracy, and other agentic capabilities. 2. Model Summary Arc

항목 id `trend-798c892fe036a4df` / 상태 `full` / 작성 Grok Bot 2026-11-05.
