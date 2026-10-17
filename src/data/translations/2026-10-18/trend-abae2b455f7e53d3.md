---
id: trend-abae2b455f7e53d3
title: "Why not run Qwen 3.8 Flash Next with the full n-gram-table?"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x8am0i/why_not_run_qwen_38_flash_next_with_the_full"
summary: "Qwen 3.8 Flash Next의 SSD에 두는 n-gram 테이블(PLE)이 흔한 GGUF에서 강하게 양자화돼 품질을 떨어뜨린다며, 공식 FP8 PLE를 직접 묶어 Strata에 물리니 IQ3_S 모델의 실수가 줄고 속도는 그대로였다는 r/LocalLLaMA 경험담이에요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Reddit은 API 키 없이 본문을 직접 읽을 수 없어 RSS 발췌로 옮겼어요. 발췌는 본문 전체로 보이지만, 링크된 비교 장면(jsbin)은 열어 보지 않았어요.

### 무슨 이야기인가
작성자는 Qwen 3.8 Flash Next에서 **SSD에 올려 두는 n-gram 테이블(PLE)**이 흔히 쓰는 GGUF에서 강하게 양자화돼 있고, 이게 성능에 측정 가능한 영향을 준다는 다른 사용자(/u/MarkoMarjamaa)의 실험을 보고 직접 시도했어요. 댓글에서 bf16 n-gram 테이블 전체를 쓴다는 사람도 있었는데, llama.cpp 계열에서는 "bf16 sidecar"라고 부르고 Strata는 FP8이 필요하다고 해요.

### 한 일
1. Hugging Face의 `Qwen/Qwen3.8-Flash-Next-FP8`에서 `model-00005`~`model-00037.safetensors`와 `model.safetensors.index.json`을 받아요.
2. `tools/ple_fp8_pack.py --model <다운로드 폴더> --out <ple-fp8.gguf>`로 GGUF 하나로 묶어요(약 47GB).
3. Strata 설정 json에 `"--ple-gguf", "<경로>"`를 넣어 불러와요.

### 결과
- IQ3_S 모델을 쓰는데, 바꾸기 전에는 "바보 같은 실수"가 훨씬 많았다고 해요.
- **속도 영향은 없고** 디스크만 조금 더 써요.
- 같은 프롬프트(사이버펑크 도시를 달리는 기차 3D 장면, 카메라·날씨 조작 포함)로 IQ4_NL로 양자화된 기본 PLE와 FP8 PLE를 비교했고, 작성자는 3D 모델의 면 누락 같은 오류가 줄어 "확실히 나아졌다"고 봤어요.
- Hermes agent로 KDE 앱(haruna)에 기능 여러 개를 추가할 때도 차이를 느꼈다고 해요.

작성자는 성능을 제대로 시험하는 법은 잘 모른다고 밝혔고, 근거는 주관적 비교 두 장면이에요.
