---
id: trend-aa1f1cd93c55950f
title: "xiangjuntang/JoVox-64 · Hugging Face - Image-to-3D"
sourceUrl: https://huggingface.co/xiangjuntang/JoVox-64
summary: "JoVox-64는 이미지 한 장으로 4³→16³→64³ 복셀 구조를 한 모델에서 단계적으로 생성하는 이산 플로 매칭 모델이에요. Toys4k 1,000개 객체 평가에서 같은 백본의 TRELLIS.2보다 CD·IoU·FID 등 지표가 조금씩 좋았어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

Hugging Face 모델 카드 전체를 읽고 옮겼어요. r/LocalLLaMA 글은 모델 카드 첫 문단과 논문·코드 링크를 옮긴 것이었어요.

### JoVox-64

논문 *JoVox: Joint Hierarchical Flow Matching for Lightweight Voxel Generation*(arXiv:2611.10690, Xiangjun Tang·Jianqi Chen·Peter Wonka)의 **이미지 조건 64³ 복셀 구조 생성기**예요. JoVox는 복셀의 계층적 결합 분포를 학습하면서 생성을 가볍게 유지하는 **이산 플로 매칭** 프레임워크예요. 모델 하나가 이미지 한 장에서 4³ → 16³ → 64³의 모든 단계를 만들어요. 모델 크기는 2B 파라미터(F32)예요.

### 사용법

README대로 코드를 설치하고 가중치를 내려받아요.

```bash
hf download xiangjuntang/JoVox-64 model.safetensors --local-dir checkpoints/voxelgen64
```

자기 이미지로 구조와 메시를 만드는 단계는 세 가지예요. 준비(prep)와 메시(mesh)는 TRELLIS.2 환경에서, 복셀(voxel) 단계는 JoVox 환경에서 `scripts/img2mesh.py`로 돌려요. 조건 이미지는 별도로 내려받는 DINOv3로 인코딩해요.

### 학습 데이터

TRELLIS-500K의 sketchfab, 3D-FUTURE, HSSD, ABO 부분집합으로 학습했고, Toys4k는 테스트용으로 빼 두었어요.

### 결과 (Toys4k 1,000개, 같은 백본의 TRELLIS.2와 비교)

- CD_V(낮을수록 좋음): 0.01250 → 0.01107
- IoU(높을수록 좋음): 0.4017 → 0.4158
- CD_shell: 0.524e-3 → 0.407e-3
- FID_N: 33.3 → 31.6
- Uni3D: 0.3865 → 0.3868

모든 지표에서 JoVox가 TRELLIS.2보다 조금씩 나았어요.
