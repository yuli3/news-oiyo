---
id: trend-a610aa236ecd2356
title: "NVIDIA/Megatron-LM"
sourceUrl: https://github.com/NVIDIA/Megatron-LM
summary: "NVIDIA의 Megatron-LM은 대규모 트랜스포머 학습용 GPU 최적화 라이브러리예요. 참조 스크립트인 Megatron-LM과, TP·PP·DP·EP·CP 병렬화와 FP16~FP4 혼합 정밀도를 갖춘 조합형 라이브러리 Megatron Core로 나뉘어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> GitHub 트렌딩에 오른 저장소예요. README 앞부분을 기준으로 옮겼어요.

### 구성

이 저장소에는 두 구성 요소가 있어요.

- **Megatron-LM**: Megatron Core에 미리 설정된 학습 스크립트를 더한 **참조 예제**예요. 연구팀, 분산 학습 공부, 빠른 실험에 맞아요.
- **Megatron Core**: 맞춤 학습 프레임워크를 만들 때 쓰는 **조합형(composable) 라이브러리**예요. GPU 최적화 빌딩 블록을 제공해요.

### Megatron Core가 제공하는 것

- 트랜스포머 빌딩 블록
- 고급 병렬화 전략
  - **TP**(텐서 병렬)
  - **PP**(파이프라인 병렬)
  - **DP**(데이터 병렬)
  - **EP**(전문가 병렬)
  - **CP**(컨텍스트 병렬)
- 혼합 정밀도: **FP16, BF16, FP8, FP4**
- 여러 모델 아키텍처

프레임워크 개발자와 맞춤 학습 파이프라인을 만드는 ML 엔지니어에게 맞는다고 해요.

### Megatron Bridge

**Hugging Face ↔ Megatron 체크포인트 양방향 변환**을 제공하고, 실서비스용 레시피도 함께 줘요. 허깅페이스에서 받은 모델을 Megatron으로 학습하고 다시 허깅페이스 형식으로 내보내는 흐름에 쓰여요.

### 시작하기

README는 PyPI 설치부터 안내해요. 세부 설치 옵션과 컨테이너 사용법은 다 읽지 못했어요.
