---
id: trend-9cb1a90b6cfda76d
title: "Ternary Bonsai 2.5 27B"
sourceUrl: https://prismml.com/news/bonsai-2-5-27b
summary: "PrismML이 Qwen3.8 27B 기반 3진 양자화 모델 Ternary Bonsai 2.5 27B를 공개했어요. 5.9GB 크기는 그대로 두고 에이전트 코딩과 다단계 도구 사용을 강화해 SWE-bench Verified 75.6점을 기록했다고 해요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

### 개요
PrismML은 2026년 11월 24일 Ternary Bonsai 2 27B의 업그레이드인 Ternary Bonsai 2.5 27B를 발표했어요. Qwen3.8 27B를 기반으로 하며, 이전 버전과 같은 5.9GB 용량에서 에이전트 코딩, 여러 턴에 걸친 도구 사용, 다단계 작업 실행 능력을 크게 끌어올렸다고 설명해요.

### 달라진 점
- 긴 도구 호출 흐름을 더 잘 처리해요. 결과를 해석하고, 단계가 실패하면 방향을 바꾸고, 작업 목표에서 벗어나지 않는다고 해요.
- Bonsai 2보다 더 적은 턴과 토큰으로 작업을 끝내고, 과도한 생각과 반복 루프가 줄었다고 해요.
- 원본 정밀도의 Qwen3.8 27B와의 성능 격차를 좁혔다고 밝혀요.

### 벤치마크 (Qwen3.8 27B / Bonsai 2 27B / Bonsai 2.5 27B)
- SWE-bench Verified: 80.6 / 60.8 / 75.6
- DeepSWE v1.1(mini-swe-agent): 30.1 / 0 / 27
- Terminal-Bench 2.1: 70.8 / 52.8 / 60.1
- AppWorld: 93.2 / 51.2 / 90.5
- τ³-Bench: 72.8 / 69.1 / 73.9
- BigCodeBench: 61.5 / 57.2 / 60.3
- LiveCodeBench v6: 87.6 / 83.8 / 83.0

τ³-Bench에서는 원본 모델보다 높은 점수를 냈고, LiveCodeBench v6에서는 Bonsai 2보다 소폭 낮아요.

### 속도와 플랫폼
- NVIDIA H100에서 MTP를 켜면 초당 291토큰을 생성하고, 2,000토큰 프롬프트 처리 속도는 초당 3,200토큰이에요.
- RTX 4090에서는 MTP로 초당 204토큰 생성, 프롬프트 처리는 초당 약 3,060토큰이에요.
- llama.cpp로 NVIDIA·Intel GPU에서, MLX로 Mac·iPhone·iPad 같은 Apple 기기에서 돌릴 수 있어요.
- 가중치는 Apache 2.0 라이선스로 공개돼요.

### 기타
PrismML은 팀 단위 맞춤 후속 학습과 추론 최적화도 제공한다며 sales@prismml.com을 문의처로 안내해요. 전체 백서와 데모는 원문 페이지에 링크돼 있어요.
