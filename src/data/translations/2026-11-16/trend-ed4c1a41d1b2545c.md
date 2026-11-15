---
id: trend-ed4c1a41d1b2545c
title: "BigMoeOnEdge outperforms Strata and colibri on 8-16 GB cards and Mac and you can run any model"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xx5fng/bigmoeonedge_outperforms_strata_and_colibri_on
summary: "BigMoeOnEdge(bmoe)는 llama.cpp가 읽는 MoE GGUF라면 양자화와 상관없이 재패킹 없이 돌리는 엔진이라고 개발자가 소개했어요. 8GB 카드에서 Qwen3.6-35B를 초당 약 35토큰으로 돌려 colibri(약 23)보다 빨랐다는 자체 벤치마크를 공유했어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

Reddit 스레드는 자동 수집과 브라우저 열기 모두 실패해서(서버 500·시간 초과), **수집기가 RSS로 받은 글 본문**을 기준으로 옮겼어요. 이 글은 원문 자체가 Reddit 본문이지만 댓글과 이미지는 읽지 못했어요. 수치는 모두 개발자 본인의 측정이에요.

### 무엇인가

개발자(/u/dai_app)는 BigMoeOnEdge(bmoe)를 이렇게 소개해요.

- llama.cpp가 불러올 수 있는 **MoE GGUF라면 어떤 양자화든** 받아요. 재패킹도 특수 형식도 필요 없어요.
- NVIDIA, AMD, Intel, Mac, 휴대폰, CPU만 있는 환경까지, Windows·Linux·macOS·Android·iOS에서 돌아가요.
- 출력은 llama.cpp와 같고 품질에서 타협하지 않는다고 해요.
- `--auto`로 시작하면 기기에 맞는 설정을 알아서 찾아요.

### 벤치마크 요약

| 환경 | 모델 | bmoe | 비교 대상 |
|---|---|---|---|
| 8GB 카드 | Qwen3.6-35B | 약 35 tok/s | colibri 약 23, Strata는 16k 컨텍스트에서 시작 안 됨 |
| 12GB 카드 | Qwen3.6-35B | 약 45 tok/s | Strata 약 30 |
| 8GB 카드 긴 프롬프트 | — | 첫 토큰 5초 | Strata 14초, colibri 약 2분 |
| 16GB MacBook | Qwen3.6-35B | 약 20 tok/s | colibri 릴리스 3.5 |
| 같은 Mac | Qwen3.8-Flash-Next 125B | 10 tok/s | Strata 약 7 |

- Basalt는 RTX 50 계열이 필요해 이 기기들에선 돌리지 못했다고 해요.
- Strata가 튜닝된 카드에선 Strata가 여전히 조금 앞서요. RTX 5060 Ti 두 장에서 Qwen3.8-Flash-Next로는 Strata가 bmoe보다 1.3배 빨랐어요. 개발자는 Strata가 소수 모델용 커널을 직접 쓰지만 bmoe는 그렇지 않다고 차이를 설명해요.

### 저장소

로그가 담긴 GitHub 저장소 `Helldez/BigMoeOnEdge`와 벤치마크 데이터 폴더를 공개했고, 8~32GB 카드 사용자에게 결과를 공유해 달라고 요청해요.
