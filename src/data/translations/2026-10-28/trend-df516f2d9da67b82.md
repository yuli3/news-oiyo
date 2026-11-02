---
id: trend-df516f2d9da67b82
title: "A 1.3B OCR model just hit 93.68 on real-world document parsing and there's now an AI judge for OCR errors"
sourceUrl: https://huggingface.co/openbmb/MiniCPM-OCR-Jev
summary: "OpenBMB의 MiniCPM-OCR Jev는 OCR 결과가 맞는지 0–1 점수로 판정하는 2B 품질 평가 모델이에요. Qwen3.5-2B의 출력 헤드를 이진 분류 헤드로 바꿨고, JevOCRBench AUROC 93.6으로 JEV-35B-A3B(90.1)를 앞섰대요. 신뢰 구간은 자동 통과, 나머지는 사람 검토로 보내요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> r/LocalLLaMA 글이 가리키는 Hugging Face 모델 카드를 직접 읽어 옮겼어요. 제목의 '1.3B OCR 모델 93.68점'은 함께 나온 MiniCPM-OCR 1.0 이야기로 보이지만, 읽은 모델 카드 범위에서는 그 수치를 확인하지 못했어요.

### 무엇인가

**MiniCPM-OCR Jev**(2B)는 텍스트·수식·표 영역의 **OCR 품질 평가 모델**이에요. 영역 이미지와 후보 OCR 결과를 주면 **0–1 점수**를 돌려주고, 높을수록 맞을 가능성이 커요. 쓰임새는 세 가지예요.

- 믿을 만한 영역은 **자동 승인**
- 나머지는 **사람 검토**로 보내기
- 여러 OCR 모델 결과 중 **가장 좋은 것 고르기**

### 성능

- JevOCRBench 판정 AUROC(×100) **93.6**: JEV-35B-A3B(90.1)보다 높고 Qwen3.5-397B-A17B(93.8)에 가까워요.
- 다른 OCR의 결과에도 안정적이에요.

| OCR 모델 | AUROC(×100) |
|---|---|
| MiniCPM-OCR 1.0 | 92.7 |
| GLM-OCR | 91.9 |
| PaddleOCR-VL-1.6 | 93.4 |
| Xiaomi-OCR-0 | 93.1 |

JevOCRBench에서 무작위로 뽑은 같은 200개 샘플을 네 모델이 각각 파싱하고, 모든 후보를 사람이 라벨링한 뒤 Jev로 점수를 매겼대요. 최대 차이는 1.5점이에요.

### 구조

**Qwen3.5-2B**에서 학습했어요. 비전 인코더와 언어 백본은 그대로 두고, 출력 헤드 `lm_head`를 후보가 맞는지 배우는 **이진 분류 헤드**로 바꿨어요. 입력은 문서에서 자른 원본 영역 이미지, 후보 OCR 텍스트, 그 텍스트를 렌더링한 이미지예요. 렌더러가 내장된 클라우드 API·Docker·SDK를 쓰면 영역 이미지, 후보 텍스트, 영역 종류(`text`/`formula`/`table`)만 주면 돼요.

### 운영 팁

앱의 샘플로 임곗값을 정하고, 넘으면 자동 통과, 아니면 사람 검토로 보내요. 임곗값을 높이면 자동 통과가 줄어드니 자동 승인 정확도와 검토량을 함께 보라고 해요.
