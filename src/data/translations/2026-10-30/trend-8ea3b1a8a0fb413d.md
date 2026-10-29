---
id: trend-8ea3b1a8a0fb413d
title: "Grace Blackwell needs a new scheduler: 27% more usable GPUs from the same racks"
sourceUrl: https://skypilot.ai/blog/grace-blackwell-needs-a-new-scheduler
summary: SkyPilot이 NVL72 랙에서는 작업을 같은 랙 안에 묶어 배치하는 게 성능을 좌우한다며, 토폴로지 인식 배치·제자리 복구·자동 조각 모음을 갖춘 스케줄러를 소개해요. 같은 작업을 NVLink 대신 InfiniBand로 돌리면 성능이 43% 떨어질 수 있다고 해요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

SkyPilot 블로그 글의 앞부분(문제 정의와 병렬화 배경)을 읽고 옮겼어요. 스케줄러 구현과 벤치마크 세부는 다 읽지 못했어요.

### 문제: 연결망이 다 같지 않아요

글은 "고속 인터커넥트가 다 같지 않다"는 말로 시작해요. 같은 분산 학습 작업을 NVLink 대신 InfiniBand로 돌리면 **성능이 43%까지 떨어질 수 있다**고 해요. 상단 안내에는 SkyPilot 스케줄러가 NVL72 학습 처리량을 14% 높였다는 새 연구도 소개돼 있어요.

예전에는 NVLink가 노드 하나 안에서만 쓰였기 때문에, 여러 노드에 걸친 AI 작업은 InfiniBand나 클라우드의 대체 기술(AWS EFA, GCP GPUDirect-TCPX)로 통신해야 했어요. NVIDIA **NVL72**는 랙 안의 GPU 72개를 하나의 NVLink 패브릭으로 묶어, 서로 다른 노드의 GPU끼리도 한 자릿수 더 큰 대역폭으로 데이터를 주고받게 해요.

### 하지만 배치가 관건이에요

여러 랙에 흩어진 작업은 여전히 InfiniBand에 발이 묶여요. 하드웨어 고장으로 노드가 빠지고 작업마다 끝나는 시간이 달라 빈 자원이 랙 여기저기로 흩어지면, **랙 단위로 묶어 두기(rack-locality)**가 점점 어려워져요. SkyPilot 플랫폼은 토폴로지 인식 배치, 하드웨어 고장 시 제자리 복구, 공유 클러스터의 자동 조각 모음으로 이 문제를 푼다고 해요.

### 대규모 학습은 통신 문제예요

수천 개 GPU에 걸친 학습은 두 가지를 정해야 해요. 모델을 GPU에 어떻게 쪼갤지, 그리고 예산 안에서 쪼갠 모델 사본을 몇 개 돌릴지예요.

- **텐서 병렬화(TP)**: 한 레이어의 가중치 행렬을 GPU에 나눠요.
- **전문가 병렬화(EP)**: MoE 레이어의 전문가들을 서로 다른 GPU에 둬요.
- **파이프라인 병렬화(PP)**: 레이어 단위로 모델을 나눠요.
- **데이터 병렬화(DP)**: 쪼갠 모델 사본을 여러 개 돌려 각자 다른 데이터를 학습해요.

이 중 TP의 all-reduce와 EP의 all-to-all 통신이 학습의 임계 경로에 있어서, NVLink 위에 두는 게 가장 중요하다고 해요. Megatron-LM 방식대로 블록의 첫 GEMM은 열 방향, 두 번째 GEMM은 행 방향으로 나누면 블록당 all-reduce가 한 번으로 줄지만, 그래도 순전파에서 트랜스포머 레이어마다 두 번의 all-reduce가 필요하다고 설명해요.
