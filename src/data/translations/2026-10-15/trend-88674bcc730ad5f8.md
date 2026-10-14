---
id: trend-88674bcc730ad5f8
title: "I trained a 15M \"decision-only\" model two ways — linear recurrence vs Transformer attention. Accuracy was a coin flip; latency and training cost weren't.[R]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x5yhr6/i_trained_a_15m_decisiononly_model_two_ways"
summary: "TypeSafe Jev에 영감받아 15M decision-only 모델을 선형 회귀(SSM식) vs Transformer로 동일 예산 학습한 실험이에요. 정확도는 둘 다 chance 근처, 긴 컨텍스트 지연은 선형이 유리했어요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 설정
- 각 ~**15.09M** params, ±0.02% 예산 매칭
- **jev-v8a**: Gated Segmented State Space + decision head
- **jev-transformer**: 표준 어텐션 + 동일 head
- 과제: 2k–8k자 지문에서 4문장 중 등장 문장 고르기
- Colab T4, 노트북 재현

### 결과(포스트)
- 정확도: v8a 26.8% vs TF 28.2%(chance 25%) — 이 스케일에서 거의 학습 실패, 로스 보고
- 지연: ~1550 토큰 아래는 TF가 빠르고, **T=8192**에서 선형이 **2.37×** 빠름(108.6 vs 257.7 ms)
- 학습 속도 격차가 크다고 함

Repo: stube123890-hue/jev-decision-lab
