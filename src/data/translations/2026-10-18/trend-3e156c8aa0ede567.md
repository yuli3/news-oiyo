---
id: trend-3e156c8aa0ede567
title: "NVIDIA/cutlass"
sourceUrl: "https://github.com/NVIDIA/cutlass"
summary: "CUTLASS는 CUDA에서 고성능 행렬곱(GEMM)과 관련 연산을 만드는 템플릿·추상화 모음이에요. 4.x부터 Python 네이티브 CuTe DSL을 더했고, 2026년 9월 4.8.0에서 Rubin 초기 지원, 고처리량 FP8·FP4 Tensor Core 명령, cute_ext 컴파일러 파이프라인 프리뷰 등을 추가했어요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

GitHub 저장소 README의 **개요와 4.8 변경 사항 앞부분**까지 읽고 옮겼어요. README가 길어(약 1만 3천 자) 뒤쪽 예제 목록·문서 안내는 읽지 않아 `partial`로 표시했어요.

### 무엇인가
CUTLASS는 CUDA 안에서 모든 수준과 규모의 고성능 행렬-행렬 곱(GEMM)과 관련 연산을 구현하기 위한 추상화 모음이에요. 계층적 분해와 데이터 이동 전략을 재사용 가능한 모듈 부품으로 나누고, 타일 크기·데이터 타입·알고리즘 정책으로 각 병렬 계층의 기본 요소를 특화·튜닝할 수 있어요. 2017년부터 CUDA C++ 템플릿을 제공해 왔어요.

### 지원 범위
| 항목 | 내용 |
|---|---|
| 데이터 타입 | FP64, FP32, TF32, FP16, BF16, Tensor Core 기반 FP32 에뮬레이션, FP8(e5m2·e4m3), 블록 스케일(NVFP4, MXFP4·6·8), 4·8비트 정수, 1비트 |
| 아키텍처 | Volta, Turing, Ampere, Ada, Hopper, Blackwell (+ 4.8에서 Rubin 초기 지원) |

### CUTLASS 4와 CuTe DSL
4.0에서 첫 Python DSL인 **CuTe DSL**을 냈어요. CuTe C++ 추상화와 완전히 일치하는 저수준 모델로 레이아웃, 텐서, 하드웨어 아톰, 스레드·데이터 계층을 그대로 다뤄요. README는 성능 손해 없이 학습 곡선이 완만하고, 컴파일이 수십~수백 배 빠르고, 딥러닝 프레임워크와 접착 코드 없이 통합되고, C++ 전문 지식 없이 메타프로그래밍을 할 수 있다고 설명해요. README에는 2026년 여름 말까지 베타를 졸업할 예정이라고 적혀 있어요.

### 4.8.0 (2026년 9월)에서 읽은 변경 사항
- **Rubin 초기 지원**으로 dense GEMM 가속.
- 더 높은 처리량의 FP8(MMA_K=64)·FP4(MMA_K=128) Tensor Core MMA 명령, B collector 재사용, TMEM 512열 → 576열, 공유 메모리 할당 328KB, FP4 2:4 희소성.
- **cute_ext 확장**: TMA load/store/multicast/reduce-store용 CTA-V 맵 자동 추론, 비동기 원자 TMA reduce-store와 희소 MMA, 재사용 가능한 GEMM 메인루프·에필로그 헬퍼, TMEM 누산 버퍼 계획 옵션.
- 일반 CuTe DSL 커널에 cute_ext를 섞는 **컴파일러 파이프라인 옵트인 프리뷰**(`CUTE_DSL_USE_EXTENSION_COMPILER=1`). 동작·성능은 유지되지만 생성된 PTX/SASS는 다를 수 있고, 빨라야 4.10부터 기본값이 돼요.
- IKET 프로파일러로 Rubin(sm107) 커널 프로파일링, 특정 클러스터만 타이밍 덤프.
- Rubin·Blackwell용 dense·grouped·blockscaled GEMM과 합성곱 예제 다수 추가.
