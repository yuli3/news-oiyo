---
id: trend-dd2e5024509dc6dd
title: "DeepSeek flash max is the first model to reach &gt;1% on challenging SWE-sweep bug finding benchmark"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xvcgxq/deepseek_flash_max_is_the_first_model_to_reach_1
summary: "수백 개 버그가 숨은 대형 저장소를 힌트 없이 고치는 SWE-sweep 벤치마크에서 DeepSeek v4.1 Flash(max)가 오픈 웨이트 모델 처음으로 1%를 넘었다는 Reddit 글이에요. 독점 모델 최고는 Gemini 4 Hydrogen 13.5%, GPT Astra 6 9.5%예요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-14
---

Reddit API 키가 없어 RSS에 실린 본문을 기준으로 옮겼어요. 원문 글 자체가 짧은 리더보드 업데이트 공지예요. 수치는 작성자와 각 회사가 밝힌 것이에요.

### 무엇이 새로 나왔나

SWE-sweep 리더보드 작성자가 오픈 웨이트 모델을 더 추가했어요. **DeepSeek v4.1 Flash(max)**가 평가한 오픈 웨이트 모델 중 처음으로 **1%를 넘었어요**.

### 벤치마크가 어려운 이유

- 모델은 버그 수백 개가 들어 있는, 아주 클 수도 있는 저장소 스냅샷을 받아요.
- 버그가 무엇인지 **힌트가 전혀 없고**, 전부 고쳐야 해요.
- 그래서 추론 부담이 크고 긴 호흡이 필요한(long-horizon) 과제예요.
- 모델 능력만 보려고 모든 모델을 **같은 하네스**에서 평가했어요. Claude Code와 Codex 하네스로도 비교해 봤지만 크게 도움이 되진 않았대요. 다만 멀티 에이전트로 어느 정도 확장할 수는 있다고 해요.
- 평가 코드는 GitHub에 있어 직접 돌려 볼 수 있어요.

### 독점 모델과의 차이

- 현재 최고 독점 모델은 **Gemini 4 Hydrogen 13.5%**(구글 모델 카드 기준)예요.
- 그다음은 **GPT Astra 6 9.5%**(작성자 평가)예요.

작성자는 오픈 웨이트 모델이 아직 갈 길이 멀다고 보고, 오픈소스 리더보드를 계속 넓히며 추가할 모델을 묻고 있어요.
