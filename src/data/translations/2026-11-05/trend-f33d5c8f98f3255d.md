---
id: trend-f33d5c8f98f3255d
title: "Progress on provable inference for large language models"
sourceUrl: https://www.anthropic.com/research/provable-inference
summary: "Progress on provable inference for large language models. 원문에 나온 수치로는 4 M, 400B, 100, 110 tokens 등이 있어요. 상세는 본문 번역을 봐 주세요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-05
---

1차 원문을 읽고 한국어로 정리했어요(**full**, via=`direct`).

### 요지
영문 제목: **Progress on provable inference for large language models**

### 확인한 사실
1. 원문: “When you talk to an AI model, you have almost none.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

2. 원문: “A user querying a model today cannot check that the responses came from the specific model that a developer claims is responding, as opposed to one secretly substituted in by a routing service for cost reasons, or even by an attacker who has tampered with the token stream.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

3. 원문: “Judging from the model’s output alone is unreliable, even if it produces high-quality responses.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

4. 원문: “Cryptographic proofs of inference solve this problem: they let a model provider commit to a model and then prove that each response was produced by that model.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

5. 원문: “Such proofs could enable applications ranging from consumer products to internal security, and could contribute to a toolkit for verifying compliance with AI pacing requirements.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

6. 원문: “Specifically, we have made progress on a powerful type of cryptographic proof known as a “zkSNARK”, which is uniquely fit for provable inference (owing to its strong hiding and efficiency properties).”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

7. 원문: “In this post, we share some of that progress, primarily through a system we call FlashProve.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

8. 원문: “A brief technical summary is as follows: Claude has produced improvements on zkSNARKs for inference, building a system that is substantially faster than prior open-source systems.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

9. 원문: “For a large model (Llama 4 Maverick, 400B-parameter mixture of experts), a single H100 GPU generates proofs at around 110 tokens/second, with a proof size of ~19 MB per 1,024-token request, when in 4-bit quantized weights, using integer arithmetic in prefill.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

10. 원문: “This is ~70-95x the GPU time of running the model itself on vLLM, a common open-source library.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

11. 원문: “Prior open-source systems are orders of magnitude slower, as we discuss in section 6 .”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

12. 원문: “Claude found novel ways to apply state-of-the-art tools in the cryptography and security literature, while relying on well-established design principles for cryptographic proof systems.”
   → 위 문장 내용을 기준으로 이해하면 돼요. 숫자는 원문 표기를 그대로 뒀어요.

### 해설
위 인용은 원문에서 고른 문장이에요. 인용 밖의 배경·동기는 추측하지 않았어요.
용어(모델명, 제품명, API, 고유명)는 영어 그대로 유지했어요.

### 한계
긴 원문의 일부 부가 문단은 요약에서 줄였을 수 있어요. 세부 수치는 1차 원문을 다시 확인하세요.
작성: Grok Bot, 2026-11-05.
