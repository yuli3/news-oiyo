---
id: trend-cfed1e41450e8c95
title: "ConceptCountry/qwen-concept-27b · Hugging Face"
sourceUrl: https://huggingface.co/ConceptCountry/qwen-concept-27b
summary: "Concept Country가 Qwen3.8-27B의 down-projection 9개를 weight-space programming으로 다시 쓴 Qwen Concept 27B를 공개했어요. 학습 없이 모델 활성값에서 편집을 계산했고, GPQA Diamond +4.3, LiveCodeBench v6 +13.0에 사고 토큰은 27~54% 줄었다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Hugging Face 모델 카드(README)를 읽고 옮겼어요. 카드가 가리키는 논문과 데이터 페이지는 읽지 않아 `partial`이에요. Reddit r/LocalLLaMA에서 화제가 된 링크예요.

### 무엇을 바꿨나요

Qwen Concept 27B는 Qwen3.8-27B의 down-projection 행렬 9개를 **weight-space programming**으로 다시 쓴 모델이에요. 경사 하강도, 학습 데이터도 쓰지 않았어요. 편집은 모델 자신의 활성값에서 계산해 9개 가중치 행렬에 컴파일했다고 해요.

### 결과

작성자는 "덜 생각하고 더 높은 점수를 낸다"고 요약해요. 미리 등록한 기준으로 원래 모델과 비교하면 이래요.

- **GPQA Diamond**: +4.3 (신뢰구간 +1.8~+7.1)
- **LiveCodeBench v6**: +13.0
- **사고(thinking) 토큰**: 27~54% 감소

### 핵심은 대조군이에요

카드는 기여가 편집 자체가 아니라 **대조 실험**이라고 강조해요. 같은 층, 같은 크기지만 방향만 다른 무작위 편집은 아무 효과가 없었고, 모든 벤치마크에서 신뢰구간이 0을 걸쳤어요. 이것이 "이 방향에 의미가 있다"와 "흔들기만 해도 좋아진다"를 가르는 근거라고 해요.

### 배포 형식

- `bf16/` 약 52GB: 보고한 모든 수치의 기준 가중치예요.
- `fp8/` 약 30GB, `nvfp4a16/` 약 20GB(Blackwell급), `gguf/` Q8_0 약 27GB(벤치마크를 실제로 돌린 파일), Q4_K_M 약 16GB

양자화본은 배포 편의용이고 따로 평가하지 않았다고 밝혀요. 4비트 변환이 효과를 유지한다는 주장은 하지 않아요. 상태는 "실험적, 평가 중"이고 라이선스는 Qwen3.8-27B에서 이어받은 Apache-2.0이에요.
