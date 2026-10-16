---
id: trend-38dc0cbb6351fe9f
title: "tencent/Hy-Memory-30B-A3B · Hugging Face"
sourceUrl: "https://huggingface.co/tencent/Hy-Memory-30B-A3B"
summary: "Tencent Hunyuan이 외부 메모리 프레임워크의 '쓰기 경로'만 맡는 활성 약 3B의 장기기억 작성 모델 Hy-Memory-30B-A3B를 공개했어요. Mem0·MemOS·Hy-Memory·EverMemOS 네 하네스 평균 55.49점으로 Claude Opus 5(54.62)를 앞섰다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

Hugging Face 모델 카드(README 원문)를 읽고 옮겼어요. Reddit r/LocalLLaMA에서 화제가 된 링크예요.

### 무엇인가
Hy-Memory-30B-A3B는 외부 메모리 프레임워크 안에서 **무엇을 기억할지, 얼마나 정확히 적을지, 새 증거로 기존 기억을 어떻게 고칠지**를 결정하는 작은 장기기억 작성(writer) 모델이에요. 활성 파라미터는 약 3B이고 Apache-2.0 라이선스예요. Mem0, MemOS, Hy-Memory(채팅·작업·코딩 시나리오)의 범용 LLM 자리를 그대로 대신하고, 학습에 쓰지 않은 EverMemOS에도 바로 옮겨 간다고 해요.

### 두 단계 학습
1. **Memory On-Policy Distillation(OPD)**: 학생 모델이 쓴 상태 체인에 교사 모델이 촘촘하게 지도해요.
2. **Attributed Memory RL**: 만들어진 메모리 뱅크를 검사해 청크 단위로 기여도를 매기고, 가장 좋은 뱅크를 다음 구간으로 넘겨요.
두 단계 모두 실제 배포 하네스 설정 안에서 학습했어요.

### 평가 방법
메모리 작성 모델만 바꾸고 하네스 버전·프롬프트·검색 설정·답변 모델·판정기는 고정했어요. 계산 비용 때문에 벤치마크마다 고정 20% 표본을 썼고, 하네스 점수는 LoCoMo, LongMemEval, PersonaMem-v2, Travel, Shopping, Code Memory Bench 6개 지표의 평균이에요.

| 작성 모델 | Mem0 | Hy-Mem. | MemOS | EverMem.(미학습) | 평균 |
|---|---:|---:|---:|---:|---:|
| Hy-Memory-30B-A3B | 54.02 | 60.55 | 50.51 | 56.89 | 55.49 |
| Claude Opus 5 | 53.43 | 60.53 | 50.50 | 54.04 | 54.62 |
| DeepSeek V4.1 Flash | 49.73 | 60.20 | 49.17 | 55.47 | 53.64 |
| Qwen3.6-35B-A3B | 47.51 | 55.87 | 47.36 | 50.75 | 50.37 |
| Qwen3-30B-A3B | 39.81 | 45.67 | 45.44 | 46.57 | 44.37 |

세부 표를 보면 차이가 작은 하네스도 있고(Hy-Memory 60.55 vs 60.53, MemOS 50.51 vs 50.50), LoCoMo처럼 Opus 5가 더 높은 지표도 있어요.

### 쓰는 법
vLLM(v0.31.0에서 시험)으로 `--served-model-name hy-memory`로 띄우고 OpenAI 호환 API를 호출해요. 예시는 `reasoning_effort: no_think`로 대화에서 명시적인 사용자 사실·선호만 뽑아 JSON `memories` 목록으로 돌려받는 프롬프트예요. 프레임워크 코드는 GitHub `Tencent-Hunyuan/Hy-Memory`, 기술 보고서는 arXiv 2610.22196에 있어요.
