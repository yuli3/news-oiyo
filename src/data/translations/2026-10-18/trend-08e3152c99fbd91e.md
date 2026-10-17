---
id: trend-08e3152c99fbd91e
title: "Show HN: Llmspeed – feel how fast a local LLM runs before you buy the hardware"
sourceUrl: "https://llmspeed.dev/"
summary: "llmspeed는 하드웨어를 사기 전에 로컬 LLM이 얼마나 빠르게 느껴질지 체험해 보는 사이트예요. RTX 3090·5090, Mac Studio M5 Ultra, DGX Spark 등 장비와 Qwen·Gemma·DeepSeek 등 모델별로 고를 수 있고, 커뮤니티 벤치마크 실측값과 추정값을 구분해 보여 줘요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

llmspeed.dev 첫 화면 전체를 읽고 옮겼어요. 원문은 장비·모델 목록과 짧은 설명이 전부라 `sourceShort`로 표시했어요.

### 무엇을 하는 사이트인가
질문은 하나예요. "내 로컬 모델은 얼마나 빠르게 느껴질까?" 그래픽카드나 Mac을 사기 전에, 그 장비에서 특정 모델이 토큰을 뱉는 속도를 화면에서 미리 체감해 볼 수 있게 했어요.

### 고를 수 있는 것
| 기준 | 예시 |
|---|---|
| 하드웨어 | NVIDIA RTX 3060·3090·4090·5060 Ti·5070 Ti·5080·5090, RTX PRO 6000 96GB, DGX Spark 128GB, AMD Ryzen AI Max+ 395(Strix Halo), RX 7900 XTX·9070 XT, Mac Studio M3/M5 Ultra 512GB, MacBook Pro M5 Max, Mac mini M5 Pro, CPU 전용(Ryzen 9 9950X), 클라우드 H100·H200 등 |
| 모델 | Qwen 3.6/3.8 27B, Qwen 3.8 Flash-Next, GLM-5.3(Flash 포함), Gemma 4 26B A4B·31B·12B, GPT-OSS 20B·120B, DeepSeek V4 Flash·V4.1 Flash, Llama 3.1 8B, Nemotron 3.5 Lightning 30B A3B 등 |

### 수치는 어디서 오나
- 기준은 **단일 장비에서 짧은 프롬프트**를 넣었을 때의 추정치예요.
- **실측값**은 r/LocalLLaMA, localscore.ai 같은 커뮤니티 벤치마크에서 가져와요.
- 나머지는 비슷한 구성에서 끌어오거나 사양으로 추정한 값이에요.
- 사이트는 GitHub에 오픈소스로 공개돼 있어요.

긴 프롬프트나 동시 요청에서는 체감이 달라질 수 있다는 점을 염두에 두고 보는 게 좋아요.
