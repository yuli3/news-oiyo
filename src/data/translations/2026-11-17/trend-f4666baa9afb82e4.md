---
id: trend-f4666baa9afb82e4
title: "Marimba: A System One Model for Speech. [R]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xxsqro/marimba_a_system_one_model_for_speech_r
summary: "Marimba는 고정된 Qwen3-ASR-0.6B 인코더를 8초 창마다 한 번만 돌려, 단어 발화 여부·언어·발화 종료·화자 변화 같은 질문에 보정된 확률로 답하는 음성 모델이에요. 9개 테스트 중 6개에서 Qwen3-Omni와 같거나 앞섰대요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

Reddit 원문이 자동 경로로 막혀 데스크톱 브라우저로 원 게시물을 직접 읽고 옮겼어요. 논문은 arXiv 2611.18330이에요.

### 무엇인가 (u/solanotodesch, r/MachineLearning)

지난주 글의 후속으로 논문이 나왔다는 소개예요. 오디오 창에 대해 예/아니오, 선택, 점수 같은 **형식이 정해진 질문**을 하면 **보정된 확률**을 돌려줘요. 8초 창마다 고정(frozen)된 **Qwen3-ASR-0.6B 인코더를 한 번만** 돌려 모든 질문에 답해요.

### 질문 유형별 방법

- **용어("'satellite'라고 말했나?")**: 학습 없이(zero-shot) 디코더의 greedy 가설과 빔 4개 가설로 점수를 매기고 Platt 보정을 해요.
- **언어**: ASR 모델 자체의 언어 점수를 써요.
- **발화 종료(turn end)**: 고정된 18번째 층 위의 작은 readout.
- **화자 변화·화자 수**: 12번째 층 위의 readout.

### 결과

- 공개 질문 1,000개에서 Qwen3-Omni(30B-A3B)와 **9개 테스트 중 6개에서 같거나 앞섰어요**. Speech Commands는 Qwen3-Omni가 여전히 나아요. 발화 종료 readout은 Smart Turn 데이터로 학습해 그 행은 분포 내 결과라는 단서가 붙어요.
- 언어 식별: FLEURS 300개 클립에서 100%.
- 화자 변화 AUROC는 AMI와 VoxConverse에서 0.966~0.980으로 ECAPA보다 높고, 화자 수는 pyannote 3.1을 앞섰어요.

### 지는 부분

- 발화 종료: Smart Turn 자체 테스트셋에서 AUROC 0.930으로 Smart Turn v3.2(0.982)에 뒤져요. ICSI 회의 데이터에선 0.716 대 0.712로 비겼어요.
- 처음 보는 과제로는 일반화하지 못해요. CochlScene 장면 분류에서는 모든 head가 우연 수준이었어요.

글쓴이는 ASR 가설 점수+보정이 용어 탐지의 공정한 기준선인지, Smart Turn 데이터 밖에서 발화 종료를 어떻게 평가할지 물어요. 코드는 GitHub, 가중치는 Apache-2.0으로 Hugging Face에 있어요.
