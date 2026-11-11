---
id: trend-13fe77e17b12a2f8
title: "Gemini Decisions API"
sourceUrl: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api
summary: "Google이 Gemini Decision 1 모델 기반 Decisions API를 내놨어요. 한 입력(최대 256K 토큰)에 예/아니오·객관식·루브릭 질문을 최대 1,000개 붙여 한 번의 순전파로 확률과 신뢰도를 돌려주며, 150–250ms 지연에 입력 100만 토큰당 0.10달러, 출력 토큰은 과금하지 않아요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

Google 공식 블로그 글을 약 7,000자 분량까지 읽고 옮겼어요. 뒤쪽 팀별 활용 사례 일부는 반영하지 못했어요.

### 무엇인가

Gemini Decisions API는 **닫힌 선택지 결정**을 빠르게 내리는 새 엔드포인트예요. 새 모델 **Gemini Decision 1**(`gemini-decision-1`)이 Google AI Studio의 Gemini API로 제공돼요. 도구 선택, 정책 검사, 모델 라우팅, 컨텍스트 채점 같은 제한된 선택을 위한 전용 기본 단위를 준다는 설명이에요.

- 텍스트·이미지·오디오·비디오·PDF 중 하나의 멀티모달 입력(최대 256K 토큰)과 독립 질문 최대 **1,000개**를 함께 보내요.
- 답을 토큰 단위로 생성하지 않고 후보를 **한 번의 순전파**로 채점해 확률과 신뢰도를 돌려줘요.
- 종단 지연 **150–250ms**, 입력 100만 토큰당 **0.10달러**, 출력 토큰 과금 없음.

### 성능

에이전트 라우팅, 추론, 순위, 멀티모달 이해 벤치마크 묶음에서 가장 앞서고 보정 오차가 가장 낮다고 해요. 16K 토큰까지의 컨텍스트에서 모델 연산 중앙값 50–100ms를 유지하고, 요청당 질문 수가 1개에서 100개로 늘어도 거의 일정해요. 같은 벤치마크 묶음 기준 Interactions API의 Gemini 3.5 Flash-Lite보다 약 5배 저렴하다고 해요.

### 세 가지 질문 유형

- **noul(예/아니오)**: 조건이 참일 확률을 추정해요.
- **choice(객관식)**: 2–255개 선택지에서 승자와 각 후보의 정규화 확률을 돌려줘요.
- **score(순서 루브릭)**: 0부터 시작하는 루브릭으로 연속 가중 점수와 단계별 확률을 줘요.

모든 답에 0–1 신뢰도가 붙어 애매한 경우를 폴백이나 사람 검토로 넘길 수 있어요. 글에는 휴게실 카운터 사진과 메모를 넣고 "흘린 액체가 있나", "어떤 정리 조치가 맞나", "얼마나 심한가"를 한 요청에 묻는 Python 예제가 실려 있어요. 입력 형식은 Interactions API의 Content 블록과 같고, 이미지·비디오 해상도로 디테일과 토큰 비용을 조절할 수 있어요.
