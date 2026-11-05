---
id: trend-7467bf0dc2d2f3e4
title: "microsoft/onnxruntime"
sourceUrl: https://github.com/microsoft/onnxruntime
summary: "마이크로소프트의 ONNX Runtime은 크로스플랫폼 고성능 머신러닝 추론·학습 가속기예요. PyTorch·TensorFlow 모델과 scikit-learn·LightGBM·XGBoost 같은 고전 ML 모델을 다양한 하드웨어에서 빠르게 돌리게 해줘요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

GitHub README 전문을 읽고 정리했어요.

### 무엇인가요
ONNX Runtime은 여러 플랫폼에서 쓰는 머신러닝 **추론과 학습 가속기**예요.

- **추론**: PyTorch, TensorFlow/Keras 같은 딥러닝 프레임워크 모델과 scikit-learn, LightGBM, XGBoost 같은 고전 ML 라이브러리 모델을 지원해요. 다양한 하드웨어·드라이버·OS와 호환되고, 가능한 곳에서는 하드웨어 가속기와 그래프 최적화·변환을 활용해 성능을 끌어올려요. 덕분에 사용자 경험은 빨라지고 비용은 줄어든다고 해요.
- **학습**: 기존 PyTorch 학습 스크립트에 한 줄만 더하면, 여러 노드의 NVIDIA GPU에서 트랜스포머 모델 학습 시간을 줄일 수 있대요.

### 시작 자료
- 일반 정보: onnxruntime.ai, 사용 문서와 튜토리얼: onnxruntime.ai/docs
- YouTube 튜토리얼 채널(@ONNXRuntime)
- 예제 저장소: onnxruntime-inference-examples, onnxruntime-training-examples
- 플러그인 EP 저장소: ONNX Runtime QNN Plugin EP(onnxruntime/onnxruntime-qnn)
- 릴리스 목록은 GitHub Releases, 다가올 릴리스 일정과 기능 요청 안내는 onnxruntime.ai/roadmap

### 알아둘 점
- **데이터/텔레메트리**: 제품 개선을 위해 사용 데이터를 수집해 마이크로소프트에 보낼 수 있다고 README에 적혀 있어요. 자세한 내용은 개인정보 처리방침을 보라고 해요.
- 기여는 기여 가이드에 따라, 기능 요청·버그는 GitHub Issue, 일반 질문은 GitHub Discussions로 받아요.
- MIT 라이선스이고, 수집 시점 기준 스타 약 2.2만 개, 포크 약 4,400개예요.
