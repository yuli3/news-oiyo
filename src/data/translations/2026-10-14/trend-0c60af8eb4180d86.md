---
id: trend-0c60af8eb4180d86
title: "Janas - SSD를 활용해 RAM보다 큰 MoE 언어 모델을 실행하는 추론 엔진"
sourceUrl: "https://github.com/prabanta-dev/janas"
summary: "Janas-LLM은 MoE 모델 가중치를 디스크에 두고 토큰마다 필요한 전문가만 NVMe SSD에서 스트리밍하는 C 추론 엔진이에요. 32GB 노트북에서 48GB Qwen3-Next-80B를 초당 24토큰(드래프트 사용 시 37)으로 돌려 llama.cpp(2.8)를 크게 앞섰대요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-14"
---
GitHub README(prabanta-dev/janas)의 앞부분(벤치마크 표, 소개, 경고)을 옮겼어요. 측정 방법 상세와 하드웨어 설명 등 뒷부분은 읽지 않았어요.

### 핵심 수치
> 37 tok/s from Qwen3-Next-80B (a 48 GB model) on a laptop with 32 GB of memory, 24 without drafts, where llama.cpp manages 2.8; reading a prompt, 62 tok/s against 16.

메모리 32GB 노트북에서 48GB짜리 Qwen3-Next-80B를 드래프트(추측 디코딩) 사용 시 **37 tok/s**, 없이 **24 tok/s**로 생성했고, 같은 조건 llama.cpp는 2.8 tok/s였어요. 프롬프트 읽기는 62 대 16이에요. 측정 기기는 Debian 13, Intel Core Ultra 9 185H(내장 Arc GPU), 32GB, NVMe SSD이고 2026년 10월 9–12일에 쟀어요. 비교한 모든 모델에서 Janas-LLM이 더 빨랐대요.

| 모델 | 읽기(Janas / llama.cpp) | 쓰기(Janas / llama.cpp) |
|---|---|---|
| Qwen3-Next-80B-A3B(48.4GB, 메모리 초과) | 62 / 16 | 24 / 2.8 |
| Qwen3-Coder-Next(48.4GB, 메모리 초과) | 66 / 14 | 22 / 2.2 |
| Qwen3.6-35B-A3B | 104 / 79 | 19 / 12 |
| Qwen3-30B-A3B | 135 / 122 | 32 / 15 |
| Qwen3.8-27B(dense) | 30.6 / 25.6 | 4.4 / 2.1 |
| Qwen3-4B | 193 / 164 | 27 / 18 |
| Qwen3-0.6B | 939 / 670 | 130 / 45 |

예외로 3비트 Qwen3-30B(unsloth UD-Q3_K_XL)는 Q3_K 가중치가 아직 GPU 프롬프트 경로로 가지 않아 프롬프트 읽기가 llama.cpp보다 느리지만(100 대 112), 쓰기는 세 배 빨라요. 다른 기기에서는 수치가 다를 거라며 `janas-bench`로 직접 재 보라고 해요. Windows 11에서도 쓰기 속도는 Linux와 비슷했고, dense Qwen3-4B 프롬프트 읽기는 Intel Windows 드라이버 덕에 1.8배 빨랐대요.

### 어떻게 동작하나
Janas는 C 라이브러리 외 의존성이 없는 C로 쓴 AI 도구 모음이고, 첫 구성 요소 **Janas-LLM**은 큰 MoE 모델을 GPU가 있든 없든 일반 컴퓨터에서 돌려요.
- 가중치는 **디스크에** 둬요.
- 토큰마다 필요한 전문가(expert)를 **NVMe SSD에서 스트리밍**해요.
- 자주 다시 쓰이는 전문가는 메모리에 남겨요.

그래서 800억 파라미터 모델이 RAM 32GB 노트북에서 돌아가요. 모델은 Hugging Face에 변환된 `.jns` 파일로 올라와 있어요. 만든 사람은 Maurizio "camauri" Cammalleri예요.

### 먼저 읽을 것
제품이 아니라 **실험**이라고 못 박아요. 초기 개발 단계라 공개 API와 명령줄이 예고 없이(주에 여러 번) 바뀌어 왔고, 다만 Hugging Face에 올린 `.jns` 파일(포맷 버전 2)은 이후 모든 버전이 읽을 수 있대요. 안정성은 검증되지 않았고, 엔진이 일부러 남은 메모리를 가득 채우는 등 기기를 세게 쓴다고 경고해요.
