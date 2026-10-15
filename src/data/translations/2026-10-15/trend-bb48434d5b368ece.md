---
id: trend-bb48434d5b368ece
title: "common : add --spec-draft-n-ubatch by ggerganov · Pull Request #30459 · ggml-org/llama.cpp"
sourceUrl: "https://github.com/ggml-org/llama.cpp/pull/30459"
summary: "llama.cpp PR #30459가 --spec-draft-n-ubatch 옵션을 추가해 VRAM 최적화를 돕는다고 짧은 Reddit 소개가 전해요."
translationStatus: blocked
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 확인된 것
ggerganov의 PR **#30459** (`common : add --spec-draft-n-ubatch`). 큐레이터 한 줄: "a new option to optimize your VRAM".

옵션 의미·벤치는 PR 본문을 봐야 하고, excerpt가  Extremely short라 `sourceShort`로 최소 분량만 채웠어요.

### 추가
speculative decoding 계열에서 draft 쪽 마이크로배치(`n_ubatch`)를 조절해 VRAM을 아끼려는 옵션으로 읽는 사용자가 많아요. 정확한 플래그 의미·기본값은 PR diff를 봐야 하며, 이 항목은 한 줄 소개라 blocked+sourceShort를 유지해요.
