---
id: trend-eb0ed4129e396ba9
title: "Tyger: open-weights streaming ASR + full-duplex turn-control in one model"
sourceUrl: "https://huggingface.co/nineninesix/tyger"
summary: "NineNineSix의 TYGER는 실시간 전이중 음성 에이전트용 오픈웨이트 음성 결정 모델이에요. NVIDIA Nemotron 3.5 ASR 0.6B에 14M 파라미터 GRU를 붙여, 언제 답하고 계속 듣고 양보하고 '음-음' 맞장구칠지 80ms 프레임마다 판단해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

Hugging Face 모델 카드(README 원문)를 읽고 옮겼어요.

### 무엇인가
TYGER는 "언제 응답하고, 계속 듣고, 양보하고, 맞장구칠지 아는" 음성 결정 모델이에요. 오픈소스 음성 에이전트 **tyger-s2s**(Apache-2.0)의 "귀" 역할을 해요. 사용자의 말을 받아 적고, 말을 끝냈는지, 끼어들었는지, "음-음"을 넣을 때인지 판단하면 LLM이 답을 쓰고 TTS가 복제 음성으로 말해요. Docker 이미지로 제공되고 웹 앱의 음성 백엔드로도 쓸 수 있어요. 이 저장소에는 가중치와 설정만 있고 추론 코드는 tyger-s2s에 있어요.

### 구조
| 항목 | 내용 |
|---|---|
| 음성 인식 | NVIDIA Nemotron 3.5 ASR Streaming 0.6B(변경 없음) |
| 턴 판단기 | 인과적 GRU 3층, 폭 768 |
| 파라미터 | 652M(Nemotron 638M + GRU 14M), FP32 2.61GB |
| 입력 | 사용자 마이크와 에이전트 재생음, 16kHz 모노 두 스트림 |
| 특징 | Nemotron 15층, 80ms당 1프레임, 미리보기 없음 |
| 출력 | 턴 상태(듣기·유지·말하기·맞장구)와 끼어들기·맞장구·종료 점수 |

### 이벤트와 기본 임계값
- **종료(Endpoint)**: 사용자가 말을 마침 → 답변(0.91)
- **끼어들기(Barge-in)**: 에이전트가 말하는 중 사용자가 끼어듦 → 즉시 중단(0.50)
- **맞장구(Backchannel)**: 사용자가 말하는 중 "음-음" → 재생하고 턴은 사용자에게(0.40)
끼어들기·맞장구 기본값은 평가값(0.93, 0.80)보다 느슨하고 따로 측정하지 않았으니 앱에서 조정하라고 해요.

### 학습과 평가
GRU와 헤드는 Nemotron을 고정한 채 Open Yap 1K(대화 1,395개)로 처음부터 학습했고, 라벨은 사람이 아니라 발화 시점에서 자동으로 만들었어요. 학습 시드는 하나예요.
- Open Yap 1K 테스트 종료 지연 중앙값 252.5ms, 너무 이른 끊기 29.90%
- 턴 상태 macro-F1 0.9436, 종료 ROC-AUC 0.9839
- RTX 4090에서 GRU는 프레임당 0.805ms, tyger-s2s 전체는 대화 4개에 GPU 약 4GB

### 한계
실시간 에이전트 벤치마크가 아닌 오프라인 진단뿐이고, 내부 평가셋은 재현할 수 없으며, Full-Duplex-Bench 수치는 공식 점수가 아니라고 밝혀요. 영어 전용이고 라이선스는 OpenMDW-1.1이에요.
