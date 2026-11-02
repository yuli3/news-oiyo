---
id: trend-e26623af8cdb5e8a
title: "CUDA: fuse FFN gate/up matmuls and GLU in MMQ with interleaved gate/up rows by anujj · Pull Request #29948 · ggml-org/llama.cpp"
sourceUrl: https://github.com/ggml-org/llama.cpp/pull/29948
summary: "llama.cpp PR #29948은 덴스 FFN의 gate·up 행렬곱과 GLU를 프롬프트 처리용 MMQ 커널 한 번으로 합쳐요. DGX Spark에서 Qwen3.8-27B 프리필이 약 5–7%, RTX 5090에서 약 2–4% 빨라졌고 퍼플렉서티는 비트 단위로 같았대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> GitHub PR 설명과 리뷰 대화 앞부분을 읽고, 벤치마크 표 숫자는 Reddit 글(RSS 본문)에 옮겨진 값을 썼어요. 리뷰 대화 뒷부분은 읽지 못했어요.

### 무엇을 바꾸나요

작성자 **anujj**의 PR이에요.

- 지금은 작은 배치(MMVQ/MMVF)에만 있는 **gate/up + GLU 융합**을 **프롬프트 처리 배치**까지 넓혀요.
- 이전 PR #28702의 대안으로, am17an의 제안대로 **누산기를 하나만 두고 GLU를 결과 쓰기(write-back) 단계에서 적용**해요. gate용 누산 타일을 따로 들고 다니지 않아요.
- 프롬프트 처리에서 덴스 FFN의 gate·up `MUL_MAT`과 뒤따르는 GLU가 **`mul_mat_q` 한 번의 실행**으로 돌아요. 작은 배치 융합, 다른 백엔드, 가중치 배치는 그대로예요.
- 로더가 up과 gate 행을 **8개 단위로 교차 배치**해서, 각 스레드가 같은 출력 원소의 up·gate 값을 함께 들고 있어요.
- 대상: NVIDIA Turing 이상의 Q4_K, Q5_K, Q6_K, Q8_0, IQ4_XS, 그리고 SWIGLU, GEGLU, SWIGLU_OAI, SWIGLU_CLAMP.
- AI 사용 공개: 예, Claude와 짝 작업.

### 성능(llama-bench, 프롬프트 16,384토큰, tok/s)

**DGX Spark(GB10)**

| 모델 | 양자화 | master | PR | 향상 |
|---|---|---|---|---|
| Qwen3.8-27B | Q4_K_M | 840.1 | 899.9 | +7.1% |
| Qwen3.8-27B | Q8_0 | 876.2 | 940.1 | +7.3% |
| Qwen3.8-27B | IQ4_XS | 882.4 | 948.0 | +7.4% |
| Llama-3.1-8B | Q4_K_M | 2,749.3 | 3,000.6 | +9.1% |
| Llama-3.1-8B | IQ4_XS | 2,933.9 | 3,249.0 | +10.7% |

**RTX 5090**

| 모델 | 양자화 | master | PR | 향상 |
|---|---|---|---|---|
| Qwen3.8-27B | Q4_K_M | 3,688.4 | 3,790.9 | +2.8% |
| Qwen3.8-27B | Q8_0 | 3,617.3 | 3,766.9 | +4.1% |
| Llama-3.1-8B | IQ4_XS | 12,997.6 | 13,603.3 | +4.7% |

DGX Spark에서는 대략 5–11%, RTX 5090에서는 2–5% 사이였어요.

### 검증

- `test-backend-ops`에서 새 `MUL_MAT_VEC_FUSION` 사례 19개가 MMQ 경로를 타고, 전체 테스트가 GB10에서, MUL_MAT 테스트가 RTX 5090에서 통과했대요.
- 퍼플렉서티(wiki.test, 8청크)는 `GGML_CUDA_DISABLE_FUSION=1`과 비교해 다섯 양자화 타입 모두 **비트 단위로 같았대요.**

### 리뷰

리뷰어 JohannesGaessler는 Hadamard 힌트 검사를 융합 '가능' 판단이 아니라 '해야 하는지' 판단 함수(`ggml_cuda_should_fuse_mul_mat_q`)에 두는 게 맞다고 지적했고, 작성자가 옮겼어요. Reddit에서 u/jacek2023는 "속도 향상을 받을 시간"이라며 이 PR을 공유했어요.
