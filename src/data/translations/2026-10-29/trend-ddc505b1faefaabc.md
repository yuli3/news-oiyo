---
id: trend-ddc505b1faefaabc
title: "Diffuspace/Clover-35B-A3B-Preview - 오픈소스 확산 언어 모델 Clover"
sourceUrl: https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview
summary: "DiffuSpace가 첫 모델 Clover-35B-A3B-Preview를 공개했어요. Qwen3.6-35B-A3B에서 파생한 MoE 백본에 블록 확산 생성을 얹었고, 활성 파라미터는 약 3B, 컨텍스트는 128K예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

### 무엇인가

**Clover-35B-A3B-Preview**는 DiffuSpace의 첫 모델이에요. 회사는 출시 시점 기준 오픈소스 **확산 언어 모델(diffusion LM)** 가운데 최고 성능이라고 주장해요. 35B MoE 백본에 토큰당 약 3B만 활성화되고, 블록 확산으로 생성하며, 컨텍스트는 128K예요.

### 구조

텍스트 전용이고 **Qwen3.6-35B-A3B**에서 파생했어요. Gated DeltaNet(GDN)과 풀 어텐션을 섞은 MoE 백본(40층, 라우팅 전문가 256개, 상위 8개 라우팅, 층마다 공유 전문가 1개)을 그대로 써요.

- **양방향 블록 어텐션**: 추가로 학습한 GDN 파라미터로 노이즈 블록 안에서는 서로 참조하면서 앞쪽 접두부는 인과적으로 유지해요.
- **블록 확산 + LowConfidence 디코딩**: 블록을 마스크 토큰으로 시작해, 확신도가 임계값(기본 0.95)을 넘는 자리를 병렬로 채워요. 아무 자리도 넘지 않으면 가장 확신 높은 자리 하나를 채워요. 기본 블록 크기는 32예요.

### 쓰는 법

Transformers 5.19.0과 PyTorch 2.10 이상을 쓰고, BF16 가중치만 약 69GB라 큰 GPU가 필요해요. 긴 생성에서 반복이 생길 수 있어 반복 억제와 종료 유도 설정을 기본값으로 넣었어요. 서빙과 평가는 자체 SGLang 구현을 권해요.

> 모델 카드를 읽었어요. 벤치마크 수치는 별도 블로그에 있어 확인하지 못했어요.
