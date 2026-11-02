---
id: trend-86398f2cfd691c9a
title: "HemmingwayAI/Hemmingway-1.5 (Qwen finetune)"
sourceUrl: https://huggingface.co/HemmingwayAI/Hemmingway-1.5
summary: HemmingwayAI가 "탐지되지 않는 AI"를 내세운 27B 오픈 가중치 글쓰기 모델 Hemmingway-1.5를 비상업 라이선스로 공개했어요. 자체 실험에서 AI 탐지기를 90% 통과했다고 주장해요. 수치는 모두 개발사 자체 측정이에요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

Hugging Face 모델 카드(README)의 앞부분(소개, 탐지기 통과율, 모델 비교)을 읽고 옮겼어요. 글 종류별 결과와 사용법은 다 읽지 못했어요. 아래 수치는 모두 개발사가 직접 잰 값이고 외부 검증은 확인하지 못했어요.

### 어떤 모델인가요

**Hemmingway-1.5**는 "사람이 쓴 것과 구분되지 않는 글"을 내세운 27B 파라미터 글쓰기 모델이에요. qwen3.8 계열 태그가 붙어 있고 Hemmingway-1을 기반으로 했어요. 가중치는 공개돼 있지만 라이선스는 **CC BY-NC 4.0**이라 비상업 용도로만 무료예요. 웹 앱, API, 데스크톱·모바일 앱도 함께 운영해요.

### 개발사가 밝힌 결과

- 13가지 글 종류, 네 가지 생각 강도(끔·낮음·중간·매우 높음)에서 1,848개 글을 쓰게 하고 각 글을 탐지기에 한 번씩 돌렸더니 **90%가 사람 글로 판정**됐대요. 골라내거나 재시도하지 않았다고 해요.
- 사람이 쓴 글 1,670개를 같은 탐지기에 돌리면 **86%**가 통과했대요. 기반 모델 Hemmingway-1은 7%였어요.
- GPTZero에서는 생각 강도와 관계없이 10번 중 9번 통과했다고 해요.

### 다른 모델과 비교

CommunicationBench의 일상 요청 80개로 같은 탐지기를 돌린 결과, Hemmingway-1.5는 92%, Fable 5.1은 26%, GLM-5.3은 21%, GPT-6 Astra는 20%, Kimi K3와 Qwen3.8 Max는 18%, Gemini 3.8 Flash는 15%, DeepSeek V4 Pro는 13%였다고 해요. 예시로 낮은 연봉의 시니어 PM 제안을 정중히 거절하는 답장을 들며, 다른 모델의 답은 AI로 걸렸지만 Hemmingway-1.5의 답은 사람 글로 판정됐다고 보여 줘요.
