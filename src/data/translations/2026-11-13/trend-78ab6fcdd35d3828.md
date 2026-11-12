---
id: trend-78ab6fcdd35d3828
title: "huawei-csl/Qwen3.6-35B-A3B-MACaQ-R-GGUF · Hugging Face"
sourceUrl: https://huggingface.co/huawei-csl/Qwen3.6-35B-A3B-MACaQ-R-GGUF
summary: "화웨이 연구팀이 MACaQ-R 방식으로 다듬은 Qwen3.6-35B-A3B GGUF(Q4_K_XL, 22.36GB)를 공개했어요. 같은 크기의 Unsloth UD-Q4_K_XL보다 FP16 대비 KL 발산이 낮고(0.013367 대 0.015731), 일반 llama.cpp로 바로 불러올 수 있어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

허깅페이스 모델 페이지가 템플릿 코드만 돌려줘서, 같은 저장소의 README 원문을 받아 끝까지 읽었어요. README 자체가 짧아요.

### 무엇인가

화웨이 CSL(huawei-csl)이 공개한 **Qwen3.6-35B-A3B**의 GGUF 양자화 파일이에요. **MACaQ-R**이라는 방법으로 다듬었고, 표준 llama.cpp로 그대로 불러올 수 있어요. 라이선스는 Apache 2.0이에요.

### 파일

- 팩: **Q4_K_XL**, 22.36GB 한 개
- 텍스트 모델만 들어 있고 MTP 예측 블록은 없어요.
- `hf download`로 받아 `llama cli` 또는 HTTP API용 `llama serve`로 실행하라고 안내해요.

### 품질(FP16 대비 KL 발산, 낮을수록 좋음)

- Unsloth UD-Q4_K_XL(22.36GB): 0.015731
- **MACaQ-R Q4_K_XL**(22.36GB): **0.013367**

같은 파일 크기에서 원본과 더 가깝다는 비교예요. 과제 정확도 비교는 README에 없어요.

### 출처

원본 가중치는 Qwen/Qwen3.6-35B-A3B이고, 방법은 arXiv의 MACaQ 논문, 직접 만드는 법은 GitHub의 MACaQ-R 가이드에 있다고 연결해 둬요.
