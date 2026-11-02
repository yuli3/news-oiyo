---
id: trend-691380eb8befc3f7
title: "Getting incredible results with a single RTX 3090ti and 128gb of ram. Deepseek-V4.1-Flash-1017 (35 tok/s decode) and Qwen3.8-Flash-Next (130 tok/s decode)"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xlec67/getting_incredible_results_with_a_single_rtx
summary: "RTX 3090 Ti 한 장과 RAM 128GB의 6년 된 PC로 DeepSeek-V4.1-Flash-1017을 약 35 tok/s, Qwen3.8-Flash-Next를 약 138~140 tok/s로 디코딩했다는 r/LocalLLaMA 후기예요. 설정은 gemini-flash 도움을 받아 정리했대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

Reddit이 API 키 없이 막혀 있어 r/LocalLLaMA RSS 본문(앞 4,000자)을 기준으로 옮겼어요. 속도는 작성자 측정이고, 이후 설정 단계는 RSS가 끊겨 옮기지 못했어요.

### 하드웨어

작성자는 몇 달 전 예전 모델보다 훨씬 잘 돌아서 공유한다고 해요. 더 좋은 하드웨어로 더 느린 속도를 올리는 사람들에게 도움이 되길 바란대요. 설정은 gemini-flash의 도움을 받았고, 그 단계를 정리해 달라고 해서 썼대요.

- OS·CPU: Gentoo Linux, AMD Ryzen Threadripper 3990X(64코어 128스레드)
- 메모리: DDR4 128GB
- GPU: NVIDIA GeForce RTX 3090 Ti 한 장(24GB, PCIe Gen4 x16)
- 저장장치: 4TB NVMe SSD

### 모델과 측정 속도

| 모델 | 구조 | 측정 속도 |
|---|---|---|
| DeepSeek-V4.1-Flash-1017 | 552B MoE(40층, 층당 전문가 384개, 활성 약 39B) | 약 35 tok/s 디코드(MTP/DSpark 사용) |
| Qwen3.8-Flash-Next | 125B MoE + 51B N-gram(활성 약 3.5B) | 약 138~140 tok/s 디코드 |

DeepSeek은 XQ/GSQ V2 양자화와 FP4 KV, NVMe Engram 테이블을, Qwen은 4비트 중간 표현 팩을 썼고, 둘 다 IndrasMirror의 "Uncensored" Hugging Face 저장소에서 받았대요.

### NVIDIA GPU 잠금 해제

작성자는 RTX 3000 시리즈(GA102, GA104) 소비자용 Ampere 카드가 워크스테이션용에 비해 FP16/BF16 행렬 명령 발행률에 **펌웨어 제한**이 걸려 있고, 오픈소스 `gpu-unlock` 커널 모듈이 드라이버가 붙기 전에 이 제한을 푼다고 주장해요. 루트로 모듈을 빌드·설치하고 커널 파라미터에 `gpu_unlock.targets=all`을 넣은 뒤 부트 설정과 initramfs를 다시 만드는 단계를 적었어요. 커널 모듈과 펌웨어 관련 작업이라 따라 하기 전에 위험을 직접 확인해야 해요.
