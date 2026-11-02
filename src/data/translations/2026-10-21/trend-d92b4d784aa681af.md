---
id: trend-d92b4d784aa681af
title: "DeepInfer: High-performance inference framework for DeepSeek models"
sourceUrl: "https://github.com/deepseek-ai/DeepInfer"
summary: "DeepSeek이 자사 대규모 서비스에 쓰는 추론 프레임워크 DeepInfer를 Apache 2.0으로 공개했어요. 지원 모델은 DeepSeek-V4.1-Flash 하나이고, NVIDIA SM100 GPU와 Huawei Ascend 950 NPU에서 오프라인 추론을 할 수 있어요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

GitHub README를 기준으로 옮겼어요. 성능 그래프는 이미지라 수치는 옮기지 못했어요.

### 무엇인가
DeepInfer는 DeepSeek의 대규모 프로덕션 서비스를 돌리는 고성능 추론 프레임워크예요. 이번 공개판은 대규모 서빙에 필요한 핵심 기능을 갖춘 **오프라인 추론**을 제공해요. 지원 모델은 **DeepSeek-V4.1-Flash**예요.

### 주요 기능
- **최적화 커널**: FlashMLA, DeepGEMM, DeepEP, TileKernels, DeepSelect와 TileLang으로 쓴 자체 커널을 써요.
- **병렬화**: Attention DP·balanced CP, MoE EP와 EPLB를 지원해요.
- **DSpark와 신뢰도 기반 검증**: 초안 토큰으로 디코딩을 빠르게 하고, 신뢰도 추정으로 검증 시점을 정해요. `DEEPINFER_USE_NEXTN_DECODE`로 최대 초안 길이(기본 5)를 정해요.
- **SWA bounded replay**: 디코더 prefill에서 제한된 뒷부분만 다시 돌려 작업량을 줄여요. V4.1 기본값은 140 토큰 유지예요.
- **비동기 스케줄링**: CPU 배치 스케줄링을 장치 실행과 겹쳐 돌려요(기본 켜짐).
- **배치 불변 추론·결정적 샘플링**: 배치 구성이 달라도 결과가 같고, 같은 입력과 시드면 같은 출력을 내요(NVIDIA 전용).
- **구조화 출력**: 정규식, JSON 스키마, EBNF 문법으로 생성을 제한해요.

### 빠진 것
완전한 추론 서비스에 필요한 KV 캐시 시스템, Prefill/Decode 분리 운영, 데이터 병렬 복제본 간 부하 분산은 이번 공개에 들어 있지 않아요.

### 요구 사항
Linux, GCC 13 이상, Python 3.12, CUDA 13(NVIDIA) 또는 CANN 9.2(Ascend)가 필요해요. 기본 체크포인트는 `deepseek-ai/DeepSeek-V4.1-Flash-1017`이에요. README는 처음에 vLLM을 바탕으로 만들었고 SGLang, TensorRT-LLM에서도 영감을 받았다고 밝혀요.
