---
id: trend-425df8ebddf71d8e
title: "Qwen 3.8 Flash Next Gyro Coder is out!"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xdhj4z/qwen_38_flash_next_gyro_coder_is_out
summary: "AgentionAI가 125B MoE인 Qwen3.8-Flash-Next에서 코딩에 중요한 전문가 절반만 남기고 약 2.1비트로 압축한 Gyro-Coder GGUF를 냈어요. 24GB 카드 한 장(19.9GiB)에 들어가고 C++에서 원본과 다음 토큰 일치율 94.5%래요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> Reddit이 자동 수집을 막아 RSS 본문(링크 한 줄)을 읽고, 글이 가리키는 Hugging Face 모델 카드 앞부분을 기준으로 옮겼어요. 모델 카드의 뒷부분은 읽지 못했어요.

### Reddit 글

u/soyalemujica가 Hugging Face의 agentionai/Qwen3.8-Flash-Next-Gyro-Coder-GGUF 링크를 올리고, ISTA labs의 코더 버전과 얼마나 다른지 보자고 했어요.

### 모델 카드 요약: 24GB 카드 한 장에 125B 코딩 모델

Qwen3.8-Flash-Next는 보통 GPU 여러 장이 필요한 **125B MoE**예요. Gyro-Coder는 이를 RTX 3090, 4090, 7900 XTX 한 장(**GPU 메모리 19.9GiB**)에 올려요. 32GB 카드용 **Gyro-Coder-L**(약 3.2비트, 27.5GiB)도 새로 나왔어요.

두 가지 덕분이래요.

- **코딩하는 전문가만 남겨요.** 층마다 512개 전문가 중 프로그래밍에 중요한 256개를 진화 탐색으로 골랐어요. GPU에는 65B 파라미터가 남아요.
- **가중치당 2.125비트**로, 자체 트렐리스 인코더를 써서 흔한 품질 손상을 줄였대요.

| 지표 | 값 |
|---|---|
| GPU 가중치 | 19.92GiB(64k 컨텍스트 q8_0 KV 포함 21.1GiB) |
| C++ top-1 일치 | 94.5%(KLD 0.118), Python 93.1% |
| 코딩 과제 | 16개 중 13개 통과(같은 전문가 8비트는 15개) |
| Gyro-Coder-L | C++ top-1 95.5%, 27.54GiB |

명확한 지시(구현, 수정, 리팩터링, 설명)에 강하고, 열린 작업이나 일반 지식에는 Gyro-S·Gyro-M이 낫대요. 자체 llama.cpp 빌드에서 돌고 **일반 llama.cpp는 이 파일을 못 읽어요.** Strata 지원은 준비 중이래요.
