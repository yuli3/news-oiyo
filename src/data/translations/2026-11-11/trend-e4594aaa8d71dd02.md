---
id: trend-e4594aaa8d71dd02
title: "adventists-ai/Sophon-Realtime-v1 · Hugging Face"
sourceUrl: https://huggingface.co/adventists-ai/Sophon-Realtime-v1
summary: "Adventists AI가 사용자의 말투를 듣고 웃음·한숨까지 섞어 답하는 오픈 전이중(full-duplex) 음성 모델 Sophon-Realtime v1을 Apache-2.0으로 공개했어요. 32B 모델 하나를 공유하는 Tag·Flash·E2E 세 빌드가 있고 Flash는 첫 음성까지 0.31초예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

Hugging Face 모델 카드 앞부분(빌드 비교와 하이라이트 일부)을 읽고 옮겼어요. 나머지는 읽지 못해 partial로 표시했어요.

### Sophon-Realtime v1

사용자의 **어조를 듣고, 어조를 담아 말하는** 오픈 전이중(full-duplex) 음성 모델 계열이에요. 사람과 통화하는 느낌을 목표로 해요. 말하는 내내 듣고, 말이 끝나면 바로 이어받고, 끼어들면 곧바로 멈춰요. 망설임, 강조, 비꼼, 웃음, 한숨 같은 말하는 방식을 알아듣고, 대화에 맞으면 스스로 웃거나 한숨 쉬거나 헛기침을 해요. 라이선스는 Apache-2.0이에요.

### 세 가지 빌드

세 빌드는 같은 **32B 두뇌**(듣고, 차례를 정하고, 답을 쓰는 모델)를 공유하고, 답을 소리로 바꾸는 방식만 달라요.

- **Tag(추천)**: 두뇌가 사운드 태그를 넣어 답을 쓰고 표현력 있는 음성 모델이 연기해요. 컴패니언·캐릭터·데모용. 비언어음 점수 0.86/0.80(중/영), 첫 음성 약 0.6초, 80GB GPU당 16명.
- **Flash**: 같은 태그 답을 더 가볍고 빠른 음성 모델이 말해요. 고객 상담·차량용. 0.77/0.63, 첫 음성 0.31초, GPU당 40명.
- **E2E(연구 미리보기)**: 별도 음성 모델 없이 32B 안의 talker가 말해요. 0.77/0.60, 약 1초, GPU 2장에 4–5명, 자체 엔진.

Tag와 Flash는 vLLM-Omni 명령 하나로 띄울 수 있고 API가 같아 나중에 바꿀 수 있어요.

### 하이라이트 (모델 카드 주장)

- VoiceBench 82.8, Big Bench Audio 81.8%로 오픈 전이중 모델 중 1위, VoiceBench에서 GPT-4o-mini-Audio와 같은 수준이라고 해요.
- 준언어 이해 48.6으로 전체 1위, Gemini 3.8 Flash(46.9)와 Qwen3-Omni(44.6)보다 앞선다고 해요. 귀 역할은 자체 공개 음성 결정 모델 DuplexJev가 맡아요.
- Full-Duplex-Bench v3 도구 호출 Pass@1 48%(Grok 43%), 응답률 100%라고 해요.
- Live 모드는 OpenAI GPT-Live 인터페이스와 호환되고, 모든 답에 감사 가능한 대화록이 붙어요.
