---
id: trend-5c4e34d97a6e010b
title: "Qwen3-0.6B model converted into MoE"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xd87wu/qwen306b_model_converted_into_moe
summary: "dense 모델을 MoE로 바꾸는 개인 프로젝트 작성자가 Qwen3-0.6B를 MoE로 변환한 결과를 공유했어요. 공유 전문가가 없는 Qwen3 구조 탓에 품질이 떨어져 '가짜 공유 전문가'를 썼고, 모든 품질 지표가 원본보다 낮아 원본을 쓰라고 솔직히 밝혔어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 스냅샷 없음) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글과 글에 달린 이미지·영상은 읽지 못했어요.

### 배경

작성자 u/Bayliner1980의 **MoE화(MoE-fication)** 프로젝트 업데이트예요. 지난번 변환 뒤 새 방법을 많이 시도했지만 대부분 별 도움이 안 됐고, **호환성**이 가장 큰 제약이었대요. 최대한 많은 사람이 쓰도록 **GGUF 호환**을 우선해서 일부 개선을 포기했대요.

### 이번 변환: Qwen3-0.6B

첫 채팅형 모델 변환이라 두 가지가 어려웠대요.

- 변환 중 **채팅 능력 보존**
- Qwen 2.5의 `qwen2moe`에서 Qwen3의 `qwen3moe`로 방법 옮기기

Qwen3에는 **공유 전문가(shared expert)**가 없어 품질이 크게 떨어졌어요. 그래서 라우터가 항상 고르는 **가짜 공유 전문가**를 써서 일부를 되찾았대요. 가중치 차이 때문에 진짜만큼은 아니래요. 결과물은 bayliner1980/Qwen3-0.6B-MoE-A0.5B와 GGUF 판이에요.

### 평가

| 모델 | Wiki ppl | C4 ppl | Tasks |
|---|---|---|---|
| Qwen3-0.6B dense | 23.88 | 31.63 | 0.455 |
| Qwen3-0.6B MoE | 26.98 | 36.32 | 0.425 |

속도는 GPU 377→352 t/s, CPU 115→124 t/s로, 0.6B 규모에서는 이득이 없고 1.5B 이상에서만 이득이 있대요.

### 한계와 질문

- 사실을 자신 있게 틀려요(모나리자를 1519년에 그렸다고 답해요. 다빈치가 죽은 해예요).
- 코드는 깨져 있고, thinking은 변환 뒤 학습하지 않아 non-thinking 모드를 써야 해요.
- **모든 품질 지표가 원본보다 나빠서**, 작은 모델이 필요하면 원본을 쓰라고 해요.

뉴런을 복제해 새 전문가 쌍을 만드는 실험은 성능이 크게 좋아졌지만 파라미터가 두 배가 돼 의미가 없을 것 같다며 의견을 구해요.
