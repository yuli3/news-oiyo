---
id: trend-41a7b922bccd4055
title: "Strata for all Qwen models from little to big"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xottw2/strata_for_all_qwen_models_from_little_to_big
summary: "RTX 3060 12GB PC에서 Qwen GGUF 모델 7종을 RustingStrata와 llama.cpp로 비교한 벤치마크예요. 작은 dense 모델은 llama.cpp가 prefill이 빨랐고, VRAM을 넘는 큰 모델은 Strata가 prefill 약 1.5배, 디코드 최대 약 2배였어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

Reddit 자동 수집이 막혀 Grok Bot이 공개 페이지를 직접 열어 전문을 읽었어요.

### 조건
작성자는 디스크에 있는 모든 Qwen GGUF를 같은 PC, 같은 파일로 RustingStrata와 llama.cpp에서 번갈아 돌렸어요. PC는 RTX 3060 12GB, Ryzen 5 7600X, RAM 32GB, CUDA예요. 브라우저와 Discord를 켠 평범한 상태로 튜닝 없이 쟀기 때문에 README보다 숫자가 낮대요.

### 결과(tok/s, 2회 평균)
| 모델 | 양자화 | 크기 | Prefill 4K Strata | Prefill 4K llama.cpp | Decode Strata | Decode llama.cpp |
|---|---|---|---|---|---|---|
| Qwen3.5-2B | Q8_0 | 1.9GB | 3859 | 6080 | 96.1 | 89.8 |
| Qwen3-4B-Instruct-2507 | Q4_K_M | 2.3GB | 1433 | 2482 | 57.4 | 59.7 |
| Qwen3.8-27B (Swift-1.5) | IQ2_XXS | 8.3GB | 283 | 459 | 16.5 | 14.7 |
| Qwen3-30B-A3B-Instruct-2507 | UD-Q2_K_XL | 11GB | 1236 | 1545 | 63.6 | 52.9 |
| Qwen3.6-35B-A3B | UD-Q2_K_XL | 11.7GB | 1539 | 1029 | 71.5 | 39.6 |
| Qwen3-Next-80B-A3B-Instruct | UD-IQ1_S | 21GB | 1154 | 739 | 63.7 | 33.3 |
| Qwen3.8-Flash-Next (177B) | IQ2_XS | 63GB | 305 | 193 | 21.3 | 18.1 |

### 요약
작은 dense 모델은 여전히 llama.cpp가 prefill이 빨라요. 모델이 VRAM보다 커지면(12GB 카드에서 35B, 80B, 177B) Strata가 prefill 약 1.5배, 디코드는 최대 약 2배 빨라요. 3060과 RAM 32GB로 80B를 64 tok/s, 177B를 21 tok/s로 돌렸어요.

### 측정 명령과 참고
- Strata: `strata bench --model X --gpu --mtp 0 --pp 4096 --tg 128 --reps 2`
- llama.cpp(build 12119): `llama-bench -m X -p 4096 -n 128 -d 4096 -fa on -ub 2048 -b 2048 -fitt 512`(VRAM 자동 맞춤)
- 여기서는 MTP를 껐고, 켜면 35B 디코드가 약 160 tok/s까지 올라간대요.
- 조용한 PC에서 손으로 튜닝한 llama.cpp(`-ncmoe 12`)는 35B에서 prefill 약 2236, 디코드 68로 더 좋았고, 그 비교는 README에 있다고 해요.
