---
id: trend-037319e1451abbda
title: "OpenBMB released a 1.3B OCR model and a separate 2B model to check its work"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xgyqbb/openbmb_released_a_13b_ocr_model_and_a_separate
summary: "OpenBMB가 중·영 문서 파싱용 1.3B OCR 모델 MiniCPM-OCR 1.0과, OCR 결과를 0–1 점수로 검사하는 2B 모델 MiniCPM-OCR Jev를 함께 공개했어요. Jev는 다른 파서 결과도 채점할 수 있고, 코드와 두 모델 가중치는 Apache 2.0이에요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> Reddit이 자동 수집을 막아 RSS에 실린 본문을 기준으로 옮겼어요. 원문 자체가 짧은 소개 글이에요.

### 소식

u/BerryBlush_Rogers691은 "PDF가 깔끔한 Markdown이 됐다고 숫자가 다 살아남은 건 아니다"라는 말로 시작해요.

- **MiniCPM-OCR 1.0**: 중국어·영어 문서 파싱용 **1.3B** 모델
- **MiniCPM-OCR Jev**: OCR 출력을 검사하는 **2B** 모델. 이미지 조각과 그에 해당하는 OCR 결과를 받아 **0–1 품질 점수**를 돌려줘요. 텍스트, 수식, 표를 다루고, **다른 OCR 파서의 결과도 채점**할 수 있어 OpenBMB 파서를 쓸 필요가 없어요.

### 작성자가 본 쓰임새

로컬 RAG 파이프라인에서 가장 탐나는 부분이 Jev래요. 숫자가 틀린 표를 넣으면 챗봇이 그 틀린 숫자를 친절하게 인용해 버리니까요. 작성자는 인덱스에 넣기 전에 의심스러운 영역을 표시해 검토하는 데 쓰겠다고 해요.

### 공개 범위

코드와 두 모델 가중치는 모두 **Apache 2.0**이고, GitHub 저장소에 로컬 배포 방법과 양자화 가중치 링크가 있대요.
