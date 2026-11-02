---
id: trend-451da17e1dc252ed
title: "ServiceNow-AI/Apriel-Voice-27B-preview · Hugging Face"
sourceUrl: https://huggingface.co/ServiceNow-AI/Apriel-Voice-27B-preview
summary: ServiceNow가 말로 한 요청을 이해하고 추론해 텍스트 답과 도구 호출을 만드는 오픈 모델 Apriel Voice 27B Preview를 MIT 라이선스로 공개했어요. Gemma 4 백본에 Whisper 음성 인코더를 붙인 구조예요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

Hugging Face 모델 카드(README)의 앞부분(소개, 기능, 구조)을 읽고 옮겼어요. 긴 오디오 처리, 사용법, 평가 결과는 다 읽지 못했어요.

### 어떤 모델인가요

**Apriel Voice 27B Preview**는 ServiceNow가 만든 음성·추론·도구 사용용 오픈 모델이에요. 말로 한 요청을 이해하고, 대화 맥락을 추론해, **텍스트 답변과 도구 호출**을 만들어요. 기존 텍스트·이미지 입력 능력은 그대로 두고 음성 인터페이스를 더했어요. 외부 음성 합성기와 짝지으면 대화형 음성 비서, 고객 지원 흐름, 음성 도구 사용을 만들 수 있다고 해요. 라이선스는 MIT예요.

### 기능

| 기능 | 지원 내용 |
|---|---|
| 음성 이해 | 전사, 번역, 음성 질의응답 |
| 추론과 도구 사용 | 지시 따르기, 여러 단계 요청 처리, 구조화된 도구 호출 생성 |
| 멀티모달 맥락 | 오디오, 텍스트, 이미지, 도구 결과를 한 대화에서 다뤄요 |
| 음성 애플리케이션 | 텍스트 답변 + 외부 음성 합성, 차례 주고받기는 앱이 관리 |

도구는 애플리케이션이 실행하고 결과를 대화에 돌려줘요. 실시간 음성 대화는 앱과 서빙 스택이 지원하는 것이고, **체크포인트 자체는 네이티브 전이중 음성이 아니라 텍스트와 도구 호출을 만든다**고 분명히 해요.

### 구조

Whisper large-v3-turbo 음성 인코더를 학습된 프로젝터로 **Gemma 4 26B-A4B 백본**에 연결했어요. 먼저 음성 인터페이스를 정렬하고, 음성 과제와 텍스트 재학습으로 백본과 함께 적응시켰다고 해요. 전체 학습 방법은 기술 보고서에 있어요.
