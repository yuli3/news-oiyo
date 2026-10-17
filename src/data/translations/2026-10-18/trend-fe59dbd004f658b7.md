---
id: trend-fe59dbd004f658b7
title: "Xolotl (Strata based) - DeepSeek-V4.1-Flash (552B) on a single 4090 at ~27 tok/s, Uncensored 1017 quant coming in a couple of days"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x8m0jj/xolotl_strata_based_deepseekv41flash_552b_on_a"
summary: "Strata 기반 추론 엔진 Xolotl로 552B DeepSeek-V4.1-Flash를 RTX 4090 한 장, DDR4 90GB, NVMe로 디코드 초당 27토큰에 돌린다는 r/LocalLLaMA 글이에요. 가중치를 VRAM·RAM·NVMe에 나눠 두고 토큰마다 필요한 전문가만 불러와요. 1017 비검열 양자화는 며칠 뒤 올릴 예정이에요."
translationStatus: partial
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Reddit은 API 키 없이 본문을 직접 읽을 수 없어 RSS 발췌로 옮겼어요. 원문이 짧은 소개 글이라 `sourceShort`로 표시했고, 링크된 GitHub·Hugging Face 페이지는 따로 읽지 않았어요.

### 장비와 방식
| 항목 | 내용 |
|---|---|
| GPU | RTX 4090 24GB 한 장 |
| CPU·RAM | Ryzen 7 5700X, DDR4 90GB |
| 저장 | NVMe |
| 방식 | 가중치를 VRAM, 고정(pinned) RAM, NVMe에 나눠 두고 토큰마다 실제로 필요한 전문가(expert)만 불러옴 |

작성자는 Strata를 바탕으로 **Xolotl**이라는 추론 엔진을 만들었고, DeepSeek-V4.1-Flash 552B 전체를 "평범한 게이밍 PC"에서 돌린다고 해요.

### 작성자가 밝힌 성능
- 디코드 초당 27토큰, 프리필 초당 180~320토큰
- 512K 컨텍스트
- thinking을 켠 실제 서버 경로로 HumanEval 21/21, 도구 호출 10/10, 에이전트 버그 수정 루프 3/3
- 같은 엔진으로 GLM-5.3-Flash, Qwen3.8-Flash-Next, Qwen3.8-27B도 돌려요.

### 1017 계획
- 현재 비검열 V4.1 양자화본(152GiB)을 Hugging Face에 올려 두었어요.
- 새 DeepSeek-V4.1-Flash-1017(510GB)을 내려받는 중인데 인터넷이 느리다고 해요. 받으면 abliterate(거부 성향 제거) 후 Xolotl용으로 양자화할 계획이에요.
- 설정과 토크나이저가 V4.1과 똑같아 처리 속도는 같을 것이지만, 가중치가 전부 달라 보정과 양자화를 처음부터 다시 해야 해서 며칠 걸릴 거라고 해요.

수치는 작성자 개인 측정이고, 소규모 시험(HumanEval 21문항 등)이에요.
