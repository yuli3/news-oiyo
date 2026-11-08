---
id: trend-e5b82de114eab2d9
title: "GRFNet, PyTorch model for multichannel time-series classification [P]"
sourceUrl: https://github.com/Joekrry/GRFNet
summary: "GRFNet(GRF-Net)은 다채널 시계열 분류용 소형 PyTorch 모델이에요. 학습 가능한 공간 필터와 대부분 고정된 ROCKET식 합성곱 뱅크를 결합하고, 원래는 EEG 데이터에 맞춰 만들었어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

GitHub README의 앞부분과 저장·배포 절을 읽고 옮겼어요. 작성자는 README를 AI로 생성했다고 README에 직접 적어 두었어요("Yes I AI generate my personal project README's").

### 무엇인가
GRF-Net(Geometry-aware Rocket-Fusion Network)은 다채널 시계열용 소형 PyTorch 모델이에요. 학습 가능한 공간 필터와 대부분 고정된 ROCKET 방식의 합성곱 커널 뱅크를 결합하고, 여러 시간 통계량을 융합해 임베딩을 만든 뒤 작은 학습 가능 헤드로 분류해요. 저장소 설명에 따르면 원래 뇌파(EEG) 데이터에 맞춰 설계됐어요.

### 모델
`GRFNet`은 공간 필터, 고정·학습 가능한 팽창(dilated) 커널, 게이트 융합 풀링으로 이뤄지고 상태가 없으며(stateless) 시퀀스당 벡터 하나를 출력해요.

### 설치와 사용
`pip install -e .`로 설치하고 Python 3.11+, PyTorch 2.2+가 필요해요. 선택 extra로 `eeg`(MNE-Python, 전극 위치 조회), `onnx`(ONNX 내보내기), `viz`(Matplotlib 그림), `dev`(pytest, Ruff)가 있어요. 예시는 `GRFNet(n_channels=22, n_times=1000, n_classes=4, sfreq=250.0)`에 (배치, 채널, 시간) 텐서를 넣으면 클래스별 점수를 돌려주고, `CrossEntropyLoss`와 함께 써요.

### 데이터와 배포
- `grfnet.data`는 PhysioNet의 EEG Motor Movement/Imagery Dataset(EEGMMIDB)을 에포크 배열로 불러오고 데이터셋 보고서를 만들어요. 데이터 자체는 저장소에 없어요.
- `save`/`load`로 설정, 가중치, 메타데이터를 한 파일에 저장하고, 체크포인트는 `torch.load(..., weights_only=True)`로 읽어요. 커스텀 헤드나 통계량은 저장할 수 없어 코드로 다시 만들고 state_dict를 불러와야 해요.
- `torch.export`, ONNX(배치·길이 동적), TorchScript(Python 3.14 이상 미지원), `torch.compile`(단일 그래프)로 내보낼 수 있어요.
