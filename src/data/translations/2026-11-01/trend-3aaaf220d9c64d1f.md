---
id: trend-3aaaf220d9c64d1f
title: "Betelgeuse running Qwen 3.8 Flash Next IQ4_XS at 24 tok/s on 2x8GB DDR4 (14 tok/s on a single 16GB stick) + RTX 3060 12GB — 0 dropped experts, 100% byte-exact"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xkh2ns/betelgeuse_running_qwen_38_flash_next_iq4_xs_at
summary: "Betelgeuse 작성자가 후속 글에서 4비트 IQ4_XS Qwen 3.8 Flash Next를 RTX 3060 12GB와 16GB RAM에서 단일 채널 14 tok/s, 듀얼 채널 2×8GB 24 tok/s로 돌렸다고 밝혔어요. 기본 llama.cpp는 약 0.5 tok/s였대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

Reddit이 API 키 없이 막혀 있어 r/LocalLLaMA RSS 본문(앞 4,000자)을 기준으로 옮겼어요. 수치는 작성자 측정이에요.

### 왜 다시 시험했나

이전 Betelgeuse 글의 반론은 두 가지였대요. "IQ2_XS에서 22 tok/s는 좋지만 2비트는 너무 낮다. 전문가가 거의 두 배 큰 4비트 IQ4_XS에선?"과 "왜 단일 16GB 램으로 시험했나, 보통은 8GB 두 개 듀얼 채널이다"였어요. 그래서 오라클과 희생 캐시 DMA 경로를 개선하고 IQ4_XS(100GB+급, 4비트 전문가 전체)를 패킹해 같은 RTX 3060 12GB에서 두 RAM 구성(둘 다 총 16GB)으로 시험했어요.

### 결과 (RTX 3060 12GB + 총 16GB RAM)

| 양자화 / RAM | 기본 llama.cpp | Strata `--low-ram` | Betelgeuse |
|---|---|---|---|
| IQ4_XS / 1×16GB | 약 0.5 tok/s | 약 4~5 tok/s | 14.0 tok/s |
| IQ4_XS / 2×8GB | 약 0.6 tok/s | 약 5~6 tok/s | 24.0 tok/s |
| IQ2_XS / 1×16GB | 1.47 tok/s | 8.11 tok/s | 22.03 tok/s (순간 48) |
| Q8_K_XL / 1×16GB | OOM / 0.1 미만 | 안 들어감 | 콜드 8.0 / 웜 12.0 tok/s |

모든 Betelgeuse 결과는 기본 출력과 **100% 바이트 단위로 같다**고 해요.

### 듀얼 채널에서 빨라진 이유

Betelgeuse는 VRAM 슬롯 풀과 NVMe 사이에 **전용 호스트 RAM 희생 캐시**와 비동기 하드웨어 DMA(`MOE_DMA=1`)를 둬요. VRAM에서 밀려난 전문가는 RAM 캐시로 가고, `MOE_DROP_MMAP`이 OS 페이지 캐시의 중복 GGUF 페이지를 버려 VRAM과 RAM이 같은 데이터를 겹쳐 갖지 않게 해요.

단일 채널 DDR4는 약 17~19GB/s에서 막혀 CPU와 PCIe DMA 엔진이 64비트 메모리 채널 하나를 두고 다퉈요(14 tok/s). 듀얼 채널(약 38GB/s)은 대역폭이 두 배라 GPU DMA가 캐시 적중분을 제속도로 끌어오고, 오라클이 뒤에서 NVMe 미스를 미리 준비해 24 tok/s까지 올랐다고 설명해요. 작성자는 일반 16GB 게이밍 PC의 95%가 듀얼 채널이라고 덧붙였어요.

### 링크

GitHub `Betelgeuse-AI/Betelgeuse`, Hugging Face `Betelgeuse-AI/Alpha-Orionis-XS`(3.2GB 밀집 + 전문가 묶음)을 공개했고, llama.cpp 업스트림 PR도 언급했어요. RSS 본문이 여기서 끊겼어요.
