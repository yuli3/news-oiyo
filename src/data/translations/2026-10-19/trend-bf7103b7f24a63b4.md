---
id: trend-bf7103b7f24a63b4
title: "Ling 3.1 Flash (560B MoE) loaded across 4 DGX Sparks using llama.cpp RPC"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x8v7cp/ling_31_flash_560b_moe_loaded_across_4_dgx_sparks"
summary: "토큰당 활성 25B인 560B MoE 모델 Ling 3.1 Flash를 DGX Spark 4대에 llama.cpp RPC로 나눠 올렸다는 소식을 전하는 r/LocalLLaMA 글이에요. Atomic Chat의 출시 당일 Q4 GGUF를 썼고, vLLM용 공식 FP4 빌드가 없어서 택한 방법이에요. 아직 속도 수치는 없어요."
translationStatus: partial
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

Reddit API 키가 없고 Wayback 스냅샷도 없어서, 수집 때 받은 **RSS 본문**만 기준으로 옮겼어요. 원 게시자(sudoing)의 글이나 스크린샷, 댓글은 직접 보지 못했어요.

### 글 내용
작성자는 다른 사용자 **sudoing**이 Ling 3.1 Flash를 DGX Spark 네 대에 올렸다는 소식을 전해요.

| 항목 | 내용 |
|---|---|
| 모델 | Ling 3.1 Flash, 560B MoE, 토큰당 활성 파라미터 25B |
| 하드웨어 | NVIDIA DGX Spark 4대(독일의 한 사용자가 접근 권한 제공) |
| 가중치 | Atomic Chat이 출시 당일 낸 Q4 GGUF |
| 분산 방식 | llama.cpp RPC로 네 대에 나눠 실행 |
| 이 방식을 고른 이유 | 당시 vLLM용 공식 FP4 빌드가 없었음 |
| 성능 | 스크린샷엔 아직 수치 없음 |

### 배경과 관심사
- sudoing은 이전 Ling 모델들을 좋게 써서 이번 모델도 시험하고 싶었지만, 자신의 Spark 두 대로는 시도한 구성에 맞지 않았다고 해요.
- 대역폭과 속도는 고통스러울 거라 예상하면서도, 124B인 **Ling 3.0 Flash**와 비교해 보고 싶어 한대요.
- 글쓴이도 같은 비교, 곧 큰 모델이 답변 품질을 얼마나 바꾸는지와 실제 사용 때 대기 시간이 어떤지가 궁금하다고 해요.

글 끝에는 Atomic Chat의 GGUF 저장소, llama.cpp, 공식 Ling 3.1 Flash 모델 링크가 달려 있어요.
