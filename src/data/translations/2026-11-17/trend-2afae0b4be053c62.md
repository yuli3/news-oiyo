---
id: trend-2afae0b4be053c62
title: "AMD Loom Fun: Added Radeon 9700 support over the weekend. Benchmarked 48 models with an average 42% speedup over llama.cpp."
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xxuzgg/amd_loom_fun_added_radeon_9700_support_over_the
summary: "AMD의 실험적 추론 스택 Loom이 주말 동안 Radeon 9700을 지원하게 됐어요. 32GB VRAM에 들어가는 48개 모델에서 llama.cpp 대비 평균 42% 빨랐고, 커널은 모두 에이전트 스킬로 생성했다고 해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

Reddit 원문이 자동 경로로 막혀 데스크톱 브라우저로 원 게시물을 직접 읽고 옮겼어요. 결과 표는 일부 모델만 골라 옮겼어요.

### AMD Loom이 뭔가요 (u/jfowers_amd)

지난 금요일 소개한 **AMD Loom**은 런타임, 커널 컴파일러, 추론 서버를 묶은 새 실험적 추론 스택이에요. 전체를 수직 스택으로 써도 되고, 컴파일러·런타임만 다른 추론 프로젝트에 붙여도 돼요. 글쓴이는 Gufo 통합을 작업 중이고, 팀은 llama.cpp 백엔드도 만들고 있어요.

### 결과

- 먼저 Strix Halo에서 Hugging Face 인기 Q4_K_M LLM 상위 51개를 이식해 디코드·프리필 지표에서 llama.cpp 대비 평균 **40%** 빨랐어요(ROCm·Vulkan 중 좋은 쪽과 비교).
- 이번엔 **Radeon 9700**에서 같은 51개 중 32GB VRAM에 들어가는 48개를 돌려 평균 **42%** 빨랐어요. 전체 데이터는 loom-fun.github.io에서 볼 수 있어요.
- **모든 커널은 에이전트 스킬로 생성**했어요(loom-skills 저장소). 결정적 SDK(런타임·컴파일러·서버)는 ROCm/hrx-system에 있어요.

### 일부 수치 (Loom vs llama.cpp)

| 모델 | pp32k tok/s | 짧은 디코드 tok/s |
|---|---|---|
| gemma-4-12B-it | 2,811 vs 1,537 | 127 vs 67.3 |
| gpt-oss-20b | 5,319 vs 4,368 | 195 vs 182 |
| Qwen3.5-35B-A3B | 5,652 vs 3,410 | 190 vs 112 |
| Qwen3-Coder-30B-A3B-Instruct | 2,921 vs 2,107 | 157 vs 54.8 |
| Qwen3.6-27B | 1,503 vs 1,164 | 60.1 vs 38.9 |
| gemma-4-E2B-it | 14,289 vs 14,519 | 272 vs 234 |
| HyperCLOVAX-SEED-Text-Instruct-1.5B | 11,653 vs 8,078 | 362 vs 344 |

gemma-4-E2B-it처럼 프리필에서 llama.cpp가 약간 빠른 경우도 있고, gemma-4-26B-A4B나 Qwen2.5-32B처럼 32GB에 프리필 측정이 들어가지 않는 모델은 디코드만 비교했어요.
