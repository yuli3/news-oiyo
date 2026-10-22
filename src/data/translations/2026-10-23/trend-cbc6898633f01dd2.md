---
id: trend-cbc6898633f01dd2
title: "Ling-3.0-tiny-UBTree DFlash draft for stock mainline llama.cpp (+8% prose, +61% code speedup)"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xcnsrj/ling30tinyubtree_dflash_draft_for_stock_mainline
summary: "r/LocalLLaMA 사용자가 Ling-3.0-tiny용 UBTree DFlash에서 DFlash 부분만 떼어 llama.cpp 기본판으로 돌린 결과, 산문 생성은 8%, 파이썬 코드 생성은 61% 빨라졌다고 공유했어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> Reddit이 자동 수집을 막아(OAuth 키 없음, Wayback 스냅샷 없음) RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글과 글에 달린 링크·이미지는 읽지 못했어요.

### 배경

작성자 u/Barni275는 LLM 서버에서 **Ling-3.0-tiny**로 텍스트 처리를 해요. PDF 문서를 마크다운으로 많이 바꾸는데, ONNX 모델로 레이아웃을 파싱해 텍스트를 뽑고 LLM 단계에서 불필요한 공백 제거, 줄 합치기 등을 하는 자체 하네스를 만들었대요. 이 작은 모델은 이 일에 꽤 유능하지만 크기에 비해 느렸다고 해요.

### 한 일

새로 공개된 Ling-3.0-tiny용 **UBTree DFlash** 소식을 보고 기뻤지만, 지원하는 추론 엔진이 없었대요. 기다리지 못하고 UBTree에서 순수 **DFlash 부분만 추출**했어요(`ubtree_selector.*` 텐서 7개 제거). 이 부분은 llama.cpp 메인라인의 dflash 드래프터로 돌릴 수 있어요.

```sh
llama-server \
  -m Ling-3.0-tiny-Q4_K_M.gguf \
  -md Ling-3.0-tiny-UBTree-dflash-bf16.gguf \
  --spec-type draft-dflash --spec-draft-n-max 6 \
  -fa on -c 32768
```

### 결과 (작은 테스트 기준)

| 작업 | 기준(드래프트 없음) | + DFlash 드래프트 | 향상 | 수락률 / 평균 길이 |
|---|---|---|---|---|
| 산문 생성 | 78.8 tok/s | 84.8 tok/s | +8% | 0.28 / 2.7 |
| 코드 생성(Python) | 79.0 tok/s | 127.2 tok/s | +61% | 0.53 / 4.2 |

작성자는 결과가 "보통"이라고 평가해요. 변환을 위해 llama.cpp GGUF 변환기에 작은 패치를 했고(HF 모델 카드에 설명), 나머지는 기본 그대로래요. llama.cpp가 진짜 UBTree를 지원하면 속도가 더 오를 거라고 봐요. 변환된 모델과 절차는 Hugging Face의 yury-kapoyko/Ling-3.0-tiny-UBTree-dflash-GGUF에 있어요.
