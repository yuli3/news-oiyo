---
id: trend-d9a63ffdf1c7619a
title: "datalab-to/surya-ocr-2.5 · Hugging Face"
sourceUrl: https://huggingface.co/datalab-to/surya-ocr-2.5
summary: "Datalab이 689M 파라미터 OCR 모델 Surya 2.5를 공개했어요. OmniParseBench 85.9점으로 자신들이 측정한 1B 미만 오픈 모델 중 최고이고, H100 한 장에서 초당 4.5페이지를 처리해요. 91개 언어 내부 벤치마크에서 74.9%를 기록했어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

Hugging Face 모델 카드(README) 앞부분을 읽고 옮겼어요.

### Surya

Datalab의 **Surya**는 6억 8900만(689M) 파라미터 OCR 모델이에요.

- **정확도**: OmniParseBench 85.9점으로, 자신들이 점수를 매긴 1B 미만 오픈 모델 중 가장 높다고 해요. olmOCR-bench에서는 83.7%예요.
- **속도**: 192 DPI 기준 H100 한 장에서 초당 4.5페이지를 처리해요. MTP를 쓴 Surya 2보다 1.7배 빨라요.
- **다국어**: 91개 언어 내부 벤치마크에서 74.9%를 기록했어요.
- **레이아웃 분석**: 표, 이미지, 머리글 등을 읽기 순서와 함께 잡아요.
- **표**: HTML로 내보내고 병합 셀은 colspan/rowspan으로 표현해요. 행·열 기하 정보는 Surya 2 체크포인트가 필요하다고 한계에 적혀 있어요.

줄 단위 텍스트 검출과 OCR 오류 검출용 더 작은 모델도 함께 제공해요.

### 라이선스와 관리형 플랫폼

코드는 Apache-2.0, 모델은 OpenRAIL-M 라이선스예요. Datalab의 관리형 플랫폼에서는 Surya와 더 정확한 모델 Chandra의 변형을 쓸 수 있고, 5달러 무료 크레딧과 공개 플레이그라운드를 제공한다고 해요. README의 벤치마크 표와 사용법은 이 번역에 담지 못했어요.
