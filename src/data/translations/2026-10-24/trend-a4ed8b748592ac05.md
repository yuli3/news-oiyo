---
id: trend-a4ed8b748592ac05
title: "I ran all the popular Qwen 3.8 FN engines on a single 5090 + 128GB of RAM, here are the numbers"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xdlunp/i_ran_all_the_popular_qwen_38_fn_engines_on_a
summary: "Basalt 개발자가 RTX 5090 한 장과 RAM 128GB로 Qwen 3.8 FN 추론 엔진 7개를 같은 조건에서 비교했어요. 디코드는 Basalt와 Infernix가 앞섰고, 5만 토큰 이상 긴 컨텍스트에서 Basalt가 벌어졌대요. 작성자 본인 엔진이 포함된 비교예요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 스냅샷 없음) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글과 글에 달린 이미지·영상은 읽지 못했어요.

### 먼저 밝힌 것

작성자 u/jesdga95는 비교 대상 중 하나인 **Basalt의 개발자**라고 먼저 밝혀요. 같은 체크포인트, GPU, 요청으로 각 엔진 문서가 권하는 방식대로 공정하게 하려 했고, 글은 자기 문장을 AI로 일부 다듬었대요. 설정에만 약 5시간이 걸렸대요.

### 비교 대상과 조건

Strata, Infernix, capy-flash, ninfer-ext, ninfer, llama.cpp, Basalt 7개예요. 각자 도구로 NVIDIA의 NVFP4를 변환하고, RTX 5090(400W), RAM 128GB, Linux에서 그리디 요청 7개를 요청마다 콜드 스타트로 돌렸어요. thinking 끔, int8 KV 캐시(llama.cpp는 f16)이고, 5% 미만 차이는 동률로 본대요. 깊이 테스트는 약 25K/50K/100K/200K 토큰 wikitext 뒤에 오디세이 에세이를 512토큰 쓰게 했어요.

### 주요 숫자 (토큰/초)

| 엔진 | 디코드(Struct) | 디코드 200K | 프리필 200K |
|---|---|---|---|
| Basalt | 354 | 160 | 8,609 |
| Infernix | 349 | 158 | 6,436 |
| capy-flash | 292 | 135 | 5,458 |
| Strata | 204 | 114 | 4,245 |
| ninfer-ext | 140 | 66 | 4,588 |
| ninfer | 54 | 44 | 2,248 |
| llama.cpp | 39 | 32 | 1,257 |

200K 깊이에서 첫 토큰까지는 Basalt 23.79초, Infernix 31.81초, llama.cpp 162.86초였어요.

### 작성자의 정리

- Infernix와 Basalt가 앞서요. Basalt가 산문·대화 디코드에서 약 10% 빠르고 Struct는 사실상 동률이에요. 25K 프리필도 동률(3.94초)이고 50K부터 Basalt가 벌어진대요.
- capy-flash는 GPU 두 장용이라 이번 단일 GPU 결과가 최선은 아니래요.
- llama.cpp는 MTP를 끄고 돌려 디코드를 다른 엔진과 비교할 수 없고, 참고용이래요.
