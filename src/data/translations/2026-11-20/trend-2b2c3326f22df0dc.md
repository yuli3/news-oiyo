---
id: trend-2b2c3326f22df0dc
title: "Show HN: 1.499x speedup and 28.5% dynamic energy drop on A40 via BF16 tiling"
sourceUrl: https://cwtractors.com/
summary: "Coldwater Tractors가 NVIDIA A40에서 2D 육각 Ising 격자 커널을 BF16 skew tiling으로 돌려 L=4608 기준 1.499배 빠르고 동적 에너지를 28.5% 줄였다는 벤치마크 기록을 공개했어요. DRAM 트래픽 감소는 직접 측정하지 못해 추정치라고 밝혀요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

Coldwater Tractors Inc.의 "SKEW_TILED_BF16 — NVIDIA A40 Receipts & Unified Logic Protocol" 페이지 전체를 읽고 정리했어요. 작성자는 Kristian Lindholm과 "AI Orchestra"이고 날짜는 2026년 11월 16일이에요. 아래 수치는 모두 이 페이지가 스스로 공개한 측정값이며, 제3자 검증 결과는 아니에요.

### 무엇을 쟀나

- 대상: 2D 7-point 육각 Ising 격자(J = +1, T = 3.0, stateless PCG32 난수), NVIDIA A40(Ampere sm_86, 48GB GDDR6, 300W TDP)
- 비교: `skew_tiled_phase`를 bf16, float(fp32), int8 버전으로 컴파일해 비교

### 핵심 결과

| 격자 | bf16 중앙값 | fp32 중앙값 | 속도 향상 |
|---|---|---|---|
| 4608×4608 (2,123만 사이트) | 10.204ms | 15.291ms | 1.499배 |
| 9216×9216 (8,493만 사이트) | 40.679ms | 60.064ms | 1.477배 |

- NVML로 잰 동적 에너지(유휴 전력 73.02W 기준): L=4608에서 스윕당 261.164mJ → 186.735mJ로 28.5% 감소(보드 전체 약 29.9%), L=9216에서 1083.034mJ → 788.288mJ로 27.1% 감소
- 레지스터: bf16 버전은 스레드당 15개, fp32·int8 버전은 36개이고 스필은 모두 0바이트
- 정확성: 6개 부분 격자 위상 전체에서 사이트 불일치 0, FP32 동등성 트랙과 FP64 참조 트랙 모두 통과

### 방법론으로 내세우는 것

실행 전에 격자 크기·물리 파라미터·통과 기준을 고정한 "사전 명세", 여러 모델 창이 서로의 설계를 공격하는 "Red-Team Audit"(실행 전 15개 이상의 구조·검증 문제를 잡았다고 해요), 무작위·균일 초기 상태에서 FP32와 FP64를 동시에 대조하는 "이중 트랙 검증"을 들어요.

### 스스로 밝힌 한계

컨테이너 권한 문제(ERR_NVGPUCTRPERM)로 `ncu` 하드웨어 성능 카운터를 쓸 수 없었다고 해요. 그래서 42% 이상의 DRAM 트래픽 감소는 2바이트 bf16 대 4바이트 float 표현에서 구조적으로 추론한 값이고, 실측 속도·에너지로 뒷받침했을 뿐 직접 계측하지는 않았다고 적었어요.

이 밖에 float32 기준 1.10배(L=4096/8192), D4GEMV 타일 커널 12.2% 향상 등 이전 기록 파일 목록도 있어요. 사용 제한으로 군사·무기·표적 용도를 금지한다고 밝혀요.
