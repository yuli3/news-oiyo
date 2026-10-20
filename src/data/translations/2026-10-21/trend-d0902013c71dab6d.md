---
id: trend-d0902013c71dab6d
title: "astroautomata/PySR"
sourceUrl: "https://github.com/astroautomata/PySR"
summary: "PySR은 데이터에서 해석 가능한 수식을 찾는 기호 회귀(symbolic regression) 오픈소스 도구예요. Julia 라이브러리 SymbolicRegression.jl을 검색 엔진으로 쓰고, 신경망을 수식으로 바꾸는 기호 증류에도 쓸 수 있어요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

GitHub README 앞부분을 기준으로 옮겼어요. 빠른 시작 코드와 옵션 설명은 다 읽지 못했어요.

### 무엇인가
**PySR**은 Python과 Julia로 쓰는 **기호 회귀** 도구예요. 기호 회귀는 어떤 목적 함수를 최적화하는 **해석 가능한 수식**을 찾는 머신러닝 작업이에요. 신경망처럼 블랙박스 모델을 맞추는 대신, 사람이 읽을 수 있는 식(예: 변수들의 곱과 합, 함수 조합)을 찾아 줘요.

### 설계 목표
여러 해에 걸쳐 처음부터 다음 세 가지를 목표로 만들었대요.
1. 가능한 한 **높은 성능**
2. 가능한 한 **많은 설정 가능성**
3. **쉬운 사용**

PySR은 Julia 라이브러리 **SymbolicRegression.jl**과 함께 개발되고, 이 라이브러리가 PySR의 검색 엔진 역할을 해요. 알고리즘 세부는 PySR 논문(arXiv:2305.01582)에 있어요.

### 고차원 데이터와 신경망 해석
기호 회귀는 저차원 데이터에서 가장 잘 동작해요. 하지만 신경망의 **"기호 증류(Symbolic Distillation)"**로 고차원 문제에도 넓힐 수 있어요(arXiv:2006.11287, N체 문제 적용). 신경망을 학습한 뒤 그 동작을 기호 회귀로 해석적 수식으로 바꾸는 거예요. 그래서 이 도구는 딥러닝 모델을 해석하는 명시적이고 강력한 방법이기도 하다고 해요.

### 설치
`pip install pysr` 또는 `conda install -c conda-forge pysr`로 설치하고, Julia 의존성은 처음 쓸 때 자동으로 설치돼요. PySR로 프로젝트를 마쳤다면 연구 쇼케이스 페이지에 PR로 올려 달라고 안내해요.
