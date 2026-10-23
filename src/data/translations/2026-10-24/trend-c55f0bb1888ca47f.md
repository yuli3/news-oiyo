---
id: trend-c55f0bb1888ca47f
title: "A 4B model faster than a 395M encoder? 14 ms vs 31 ms (2.2x). Another 4B model: 150 ms (10x slower)"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xdkl55/a_4b_model_faster_than_a_395m_encoder_14_ms_vs_31
summary: "Qwen3.5-4B에 LoRA를 붙인 의사결정 모델 Mica v0.5가 선택지마다 확률을 한 번의 순전파로 내며 결정당 약 14ms를 기록했대요. 다른 4B 모델보다 약 10배, 395M 인코더 기반 모델보다 약 2배 빨랐다고 작성자가 주장해요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 스냅샷 없음) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글과 글에 달린 이미지·영상은 읽지 못했어요.

### Mica v0.5란

작성자 u/Top-Evidence174가 공개한 **의사결정 모델**이에요. Qwen3.5-4B에 LoRA를 붙인 4B 모델로, 글을 쓰지 않아요. 상태, 질문, 선택지 목록을 주면 **한 번의 순전파**로 선택지마다 확률을 돌려줘요("5개 수 중 무엇", "허용/차단/사람에게 넘김" 같은 것). 최근 주목받는 Jev와 같은 종류래요.

### 비교 (RTX 6000 Ada 한 장, 결정당 중앙값)

| 과제 | Mica | PPLX Decider 1.2 Flash(4B) | Laya(395M) |
|---|---|---|---|
| 테트리스 | 14.5ms | 150ms | 32ms |
| 체스 | 14ms | 133ms | 31ms |
| 스네이크 | 18ms | 154ms | 33ms |
| 로그 헌트 | 11ms | 157ms | 31ms |

로그 헌트는 하루치 보안 로그를 150블록으로 나눠 허용/차단/확인을 고르는 과제예요. Mica는 **1.7초**에 끝내고 심어 둔 침입 22개 중 21개를 잡았고, PPLX는 23.5초에 18개, Laya는 0개, 단순 키워드 grep은 6개를 잡았대요.

### 주의 사항 (작성자 설명)

- 시간은 같은 장비에서 각 모델 자체 호출 시간이에요. Laya의 첫 12.9초 워밍업은 영상에서 뺐어요.
- 로그는 이 테스트용 합성 데이터이고, 침입은 뻔한 키워드를 피해 썼어요.
- Jev는 API로 약 498ms 대 Mica 15.6ms라 비교에서 뺐대요(네트워크 시간 포함).
- 공개 벤치마크(JDI 등)가 오염돼 있다며, 자기 사용 사례에서 맞게 고르는지와 속도를 보라고 권해요. Mica는 200개 넘는 실제 사례에서 약 95%를 맞혔대요.
