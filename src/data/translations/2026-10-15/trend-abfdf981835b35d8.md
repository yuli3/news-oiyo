---
id: trend-abfdf981835b35d8
title: "Tessera-27B-B-CJK, Zellige AIs new finetune of Qwen with novel approaches to how we think about token savings"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x5xm28/tessera27bbcjk_zellige_ais_new_finetune_of_qwen"
summary: "ZelligeAI Tessera-27B-B-CJK는 Qwen3.8-27B를 압축 CJK 속말로 '생각'하고 답·툴콜은 영어·코드로 내보내는 코딩 에이전트 파인튜닝(Apache-2.0)이에요. 사고 토큰을 크게 줄인다고 해요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit가 원문 페이지에 403을 돌려줘 **큐레이터(Reddit) 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 아이디어
에이전트 루프는 매 턴 thinking 비용을 내므로, **압축 CJK 속기**(영·중·기호 혼용)로 생각하고, 출력·툴콜은 평문 영어·코드로 분리해요. held-out 한 턴 예: 속기 **27** 토큰 vs 베이스 **137** 토큰(툴콜 직전).

HF `ZelligeAI/Tessera-27B-B-CJK`, 논문 페이지 zellige.ai/research/… Open weights Apache-2.0. ThinkingCap 유사 접근을 더 확장하겠다고 해요.

thinking과 final을 분리해 하네스가 받는 툴콜·코드는 평범하게 유지한다는 점이 배포 친화적이에요. Tessera 라인업의 첫 full drop이며 토큰 효율 연구를 앞으로 더 보여 주겠다고 해요.
