---
id: trend-260e25e0dcc2a9fe
title: "I have trained a model to predict my blood sugar [P]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xvja5n/i_have_trained_a_model_to_predict_my_blood_sugar_p
summary: "1형 당뇨 환자가 100만 명분 합성 연속혈당(CGM) 데이터로 3만 파라미터 트랜스포머를 사전학습하고 자기 115일치 데이터로 LoRA 미세조정해, 2시간 뒤 혈당을 예측하는 모델을 만들었다는 Reddit 글이에요. 의료 조언이 아니에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-14
---

Reddit API 키가 없어 RSS에 실린 본문을 기준으로 옮겼어요. 본문의 그림은 보지 못했어요. 개인 프로젝트 소개이고 의료 조언이 아니에요. 혈당 관리는 의료진과 상의하세요.

### 모델 구성

- 파라미터 **31,253개**짜리 인코더 전용 트랜스포머예요.
- 미리 만든 **합성 CGM 데이터**로 사전학습했어요. 가상의 1형 당뇨 환자 100만 명을 7일씩, 약 **19,200 CGM-년** 분량이에요. 시뮬레이터는 반사실적 추론을 돕도록 설계됐지만, 그 능력을 재는 벤치마크는 아직 없대요.
- 작성자 본인의 데이터 **115일치**로 LoRA 어댑터를 맞췄어요(학습 80일, 테스트 35일). 다른 공개 모델과 견줄 만하다고 해요.

### 입력과 출력

- 혈당 시계열 외에 **인슐린(U)**과 **탄수화물(G, 혈당지수 GI)**을 행동 곡선으로 넣어요. U는 정확하고 G와 GI는 본인 추정치예요.
- 출력은 Kovatchev 위험 공간의 혈당이고, DILATE/MSE와 핀볼 손실을 학습된 Kendall-Gal 가중치로 합쳐 학습했어요.
- **2시간 뒤**까지 예측하고, 빠진 구간을 채우고, 과거 방향 예측(backcast)도 해요.
- 다른 모델과 달리 시각을 입력으로 받지 않고 과거 혈당으로 **시각을 예측**하도록 학습했는데, 이 능력은 48시간 이상 문맥에서 나타났대요. 문맥 창은 3.5~7일이에요.

### 한계

작성자는 휴대폰에서 써 보면 앞으로의 인슐린과 탄수화물을 넣었을 때 적절히 반응하는 것 같다고 했지만, 다음 30분 안의 **저혈당 예측은 아직 본인보다 못하다**고 밝혔어요. 소스 코드는 GitHub(0xdeadf1sh/T1DMAI)에 있어요.
