---
id: trend-25cf2aac259bc83b
title: "I made Transformer Architecture from scratch [P]"
sourceUrl: https://github.com/Rishikesh-2006/NNs/blob/main/Pytorch%2FTransformer.ipynb
summary: "r/MachineLearning 사용자가 2017년 Transformer를 PyTorch로 처음부터 구현한 노트북을 공유했어요. 인코더·디코더 2층과 1,000개 문장 정도로만 학습해 예측이 아직 나쁘다며, 학습 시간을 줄이거나 결과를 높일 방법을 물었어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> GitHub 노트북 페이지는 자동 수집에서 내용이 그려지지 않아, 같은 노트북의 원본 파일 코드 셀 앞부분과 Reddit RSS 본문을 기준으로 옮겼어요. 노트북 출력과 댓글은 읽지 못했어요.

### Reddit 글

작성자 u/Jumbledsaturn52는 **2017년 Transformer 아키텍처**를 PyTorch로 구현했대요. 다만 지금은 예측을 잘 못하는데, 학습에 시간이 많이 걸려서 **인코더와 디코더를 2층씩**만 쓰고 **1,000개 정도**로만 학습했기 때문이래요. 코드를 보고 학습 시간을 줄이거나 결과를 개선할 방법이 있는지 물어요.

### 노트북에서 보이는 것

- `torch`, `torch.nn`, `DataLoader`와 `math`의 `cos`, `sin`(위치 인코딩용으로 보여요)을 불러와요.
- 직접 만든 `Encoder` 클래스는 헤드 수를 4로 두고, `Tmr` 클래스가 인코더와 디코더를 묶은 전체 모델이에요.
- 직접 만든 `tokenize` 클래스가 CSV의 `English` 열과 짝을 이루는 열(코드의 `mar`)로 단어-번호 사전을 만들어요. 영어에서 다른 언어로 옮기는 번역 과제예요.
- `tokenize(data, 1000)`으로 1,000개만 쓰고, scikit-learn `train_test_split`으로 나눠요.
- 임베딩 차원 64로 `Tmr(64, vocab)` 모델을 만들고 GPU가 있으면 CUDA로 학습해요.
- 학습한 가중치를 저장·불러오고, `<sos>` 토큰부터 "hello" 같은 입력을 넣어 한 토큰씩 생성하는 추론 셀이 있어요.

처음부터 직접 짠 학습용 구현이라 실사용 성능보다는 구조 이해에 의미가 있는 프로젝트예요.
