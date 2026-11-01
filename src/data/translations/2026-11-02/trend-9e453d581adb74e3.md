---
id: trend-9e453d581adb74e3
title: "FineDNA: the largest dataset to teach any LLM DNA (midtraining, SFT, RL)"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xkwvwg/finedna_the_largest_dataset_to_teach_any_llm_dna
summary: "Hugging Face 팀이 Qwen3-14B를 DNA 특화 공개 모델 Carbon-X로 만드는 데 쓴 데이터 전부인 FineDNA를 공개했어요. 미드트레이닝용 3,000억+ 토큰, SFT 대화 약 20만 개, 검증 가능한 RL 프롬프트 약 9만8천 개가 들어 있어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

Reddit이 API 키 없이 막혀 있어 r/LocalLLaMA RSS 본문을 기준으로 옮겼어요. 원글이 짧은 공개 안내이고, 데이터셋 카드와 코드 저장소는 읽지 않았어요.

### 무엇을 공개했나

작성자(u/loubnabnl)는 **FineDNA**를 공개한다고 밝혔어요. Qwen3-14B를 **Carbon-X**로 바꾸는 데 쓴 데이터 전부이고, Carbon-X는 작성자 말로 **DNA 분야에서 가장 강한 공개 언어 모델**이에요.

### 구성

| 단계 | 내용 |
|---|---|
| 미드트레이닝 | 유전체와 DNA가 많이 담긴 텍스트 **3,000억+ 토큰** |
| SFT | 대화 **약 20만 개** |
| RL | 검증 가능한 프롬프트 **약 9만8천 개** |

### 다른 모델에도

코드와 레시피도 공개해서 **다른 LLM에도 적용**할 수 있대요. 데이터셋은 Hugging Face의 `HuggingFaceBio/FineDNA`, 코드는 GitHub의 `huggingface/carbon`에 있어요.

미드트레이닝, SFT, RL 세 단계 데이터를 한 번에 공개해, 범용 LLM에 DNA 서열과 관련 지식을 가르치는 전 과정을 재현할 수 있게 한 점이 핵심이에요. Carbon-X의 구체적인 벤치마크 수치는 원글에 없어요.
