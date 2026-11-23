---
id: trend-5e4992f6ced4264f
title: "NariQ: BF16-level Qwen3.8-27B in a 10 GB file"
sourceUrl: https://huggingface.co/nari-labs/Qwen3.8-27B-NariQ-GGUF
summary: "Nari Labs가 Qwen3.8-27B를 3·2.5·2비트로 양자화한 NariQ GGUF를 공개했어요. 3비트(10.1GB)와 2.5비트는 에이전트 코딩·수학·이미지 이해에서 BF16과 비슷하다고 하며, 전용 llama.cpp fork가 필요해요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-24
---

### 공개 내용
- 2026년 11월 20일 Qwen3.8-27B의 NariQ v1 GGUF를 3, 2.5, 2비트 버전으로 공개했어요.
- NariQ는 trellis 코드 기반 post-training 양자화(PTQ)예요. 실제 코딩 에이전트 트레이스로 보정했어요.
- 실행하려면 Nari Labs의 llama.cpp fork가 필요해요.

### 성능 비교
- DeepSWE v1.1(평균 pass@1): BF16 39.8, 3비트 41.0, 2.5비트 41.9, 2비트 28.6
- Terminal-Bench 2.1: BF16 62.6, 3비트 63.8, 2.5비트 60.2, 2비트 52.4
- AIME 25+26: BF16 97.7, 3비트 98.3, 2.5비트 96.5, 2비트 86.0
- MGSM(11개 언어): BF16 94.0, 3비트 93.1, 2.5비트 91.8, 2비트 90.6
- RealWorldQA: BF16 82.4, 3비트 82.4, 2.5비트 81.3, 2비트 80.9
- 3비트와 2.5비트는 장기 에이전트 작업, 수학, 이미지 이해에서 BF16과 맞먹고, 2비트는 낮다고 밝혔어요.
- 평가는 Claude Code CLI를 하네스로 써서 262,144 토큰 컨텍스트와 thinking 모드로 진행했어요.

### 파일과 용량
- BF16 원본은 53.8GB이고, NariQ는 3비트 10.1GB, 2.5비트 8.4GB, 2비트 6.8GB예요. 기본 권장은 3.0bpw예요.
- 비전 프로젝터 mmproj-BF16(0.93GB)은 세 버전에 공통으로 써요.

### 실행 방법
- Linux와 NVIDIA GPU, 드라이버 570 이상이면 run.sh로 한 번에 받고 실행할 수 있어요.
- 직접 실행하려면 fork의 llama-server에 -c 131072, -ngl 99, --jinja를 주고 temp 1.0, top-p 0.95, top-k 20으로 설정해요.
- 24GB GPU에서는 131K 정도, 32GB 이상이면 전체 262K 컨텍스트를 쓸 수 있다고 해요.
- RTX PRO 6000에서 4K 컨텍스트 기준 3비트는 약 88.9 tokens/s예요.

### 제한 사항
- 기존 llama.cpp, Ollama, LM Studio는 아직 새 텐서 형식을 불러오지 못해요.
- 현재 fork는 SM120 GPU(RTX PRO 6000) 중심이라 Ampere, Ada, Hopper와 Apple M 시리즈에서는 느리고, GeForce는 아직 테스트하지 않았어요.
- Apple M3 Pro(18GB)에서 3비트는 약 3.8 tok/s이고, Mac은 소스에서 직접 빌드해야 해요.
- 비전 타워와 KV 캐시는 BF16이고, MTP 모듈은 아직 들어 있지 않아요.
- 라이선스는 Apache-2.0이고 기술 보고서는 arXiv 2611.26157이에요.
