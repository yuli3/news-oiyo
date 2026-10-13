---
id: trend-d269ffaffac3c8ff
title: "AI 모델은 임의의 능력을 숨길 수 있으며, 이를 이론적으로 증명할 수 있음"
sourceUrl: "https://arxiv.org/abs/2610.13928"
summary: "Draguns 등은 모델 가중치 안에 암호화된 신경망을 숨기고 비밀 트리거가 올 때만 복호화·실행하는 백도어를 만들어, 가중치 전체를 봐도 숨은 능력을 끌어내기 어렵다는 걸 암호학적으로 증명했어요. 능력 평가 기반 감사의 한계를 보여 준대요(NeurIPS 2026)."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-14"
---
arXiv 초록 페이지(2610.13928)를 기준으로 옮겼어요. 22쪽 본문(PDF)은 읽지 못해 구성 방법의 세부와 실험 수치는 다루지 않았어요.

### 논문 정보
- 제목: *AI Models Can Provably Hide Arbitrary Capabilities*
- 저자: Andis Draguns, Sumeet Ramesh Motwani, Raymond Douglas, Christian Schroeder de Witt
- 2026년 10월 9일 제출, NeurIPS 2026 채택(22쪽, 그림 6개, 표 3개), 분야 cs.LG·cs.CR

### 문제의식
능력 평가(capability evaluation)는 배포 전에 위험한 모델 행동을 찾아내려는 거예요. 하지만 그 신뢰성은 **숨은 능력도 끌어낼(elicit) 수 있다**는 가정에 달려 있어요. 저자들은 적대적 조건에서는 이 가정이 성립하지 않는다는 걸 보여요.

### 방법
- 호스트 모델 가중치 안에 **암호화된 신경망**을 심는 백도어 공격을 구성해요. 이 회로는 **비밀 트리거**를 받을 때만 복호화되고 실행돼요.
- **디지털 로커(digital locker)**를 써서, 암호학적 가정 아래 가중치에 완전히 접근하더라도 숨은 회로를 끌어내거나 해석하기가 증명 가능하게 어려워요.
- 고정 문자열을 숨기던 기존 연구를 **임의의 계산**을 숨기는 것으로 넓혔어요.

### 실험
PyTorch로 개념 증명 구성을 구현했어요. CBRN 관련 능력의 대리 과제로 작은 **화학 반응 예측** 작업을 쓰고, 파인튜닝, 가중치 노이즈, 그래디언트 기반 트리거 탐색, 잠재 적대 학습(latent adversarial training)으로 끌어내기를 시도했어요. 결과는 이 방법들에 버텼다고 해요.

### 의미
암호학적 보장과 함께, 이 결과는 **끌어내기 기반 능력 감사의 한계**를 드러내요. 저자들은 방어 개선을 돕기 위해 모델을 공개했어요.
