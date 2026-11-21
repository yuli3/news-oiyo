---
id: trend-72b4adb909cd1f92
title: "Verification files for the Lean proof of the Riemann Hypothesis"
sourceUrl: https://math.mit.edu/~drew/grh
summary: "MIT의 Andrew Sutherland가 11월 20일 공개된 리만 가설 Lean 증명을 Claude Code로 검사한 결과를 올렸어요. 17만여 모듈이 오류 없이 컴파일됐고 표준 공리 세 개만 쓰며, 독립 커널 nanoda·con-leche도 증명을 받아들였어요. 일부 커널 검사는 아직 진행 중이에요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-22
---

MIT 수학과 Andrew Sutherland의 검증 페이지를 읽고 정리했어요. 페이지는 2026-11-21 12:55 UTC 기준이며, 남은 검사가 끝나면 갱신된다고 해요. 증명 자체는 11월 20일 `alpo.ge/remark.pdf`에서 발표됐고, 검사는 Claude Code로 돌렸다고 밝혔어요.

### 요약

- 공개된 Lean 소스가 오류 없이 컴파일돼요. 175,187개 모듈 전부(Lean v4.33.1, Mathlib v4.33.1).
- 다섯 개 핵심 정리는 표준 공리 세 개(`propext`, `Classical.choice`, `Quot.sound`)에만 의존해요.
- 모든 모듈을 Lean 커널(`leanchecker`)로 다시 돌려 175,187개 모두 통과했어요.
- 독립적으로 작성된 커널 두 개, Rust로 만든 **nanoda**(80스레드 27분 42초)와 **con-leche**(146만 8,418개 선언 수락)가 전체 증명 export를 받아들였어요. `lean4lean`도 모든 컴파일 모듈을 통과시켰어요.
- `con-leche --compare`가 다섯 정리 모두 챌린지 진술과 일치한다고 확인했어요.
- `lake comparator` 전 과정과 Lean 기본·paranoid 커널 재검사는 아직 진행 중이에요.

### 무엇이 검증됐나

1. Mathlib 정의 그대로의 **리만 가설**: 자명한 영점(−2, −4, …)이 아닌 ζ의 모든 영점은 실수부가 1/2이에요.
2. 같은 명제를 제출자 표현으로 쓴 버전.
3. 모든 디리클레 L-함수는 Re s > 1/2에서 0이 아니에요(자명한 지표의 s = 1 극점 제외).
4. 임계 띠 안의 영점은 임계선 위에 있어요.
5. 원시 지표에 대한 같은 명제, 즉 디리클레 L-함수에 대한 일반화 리만 가설(GRH)의 통상 형태예요.

범위를 분명히 해요. 여기서 GRH는 디리클레 L-함수에 한정되고, 데데킨트 제타, 헤케 L-함수, 일반 보형 L-함수는 검사 대상이 아니에요.

### 산술적 결과

제타 함수 정의에 기대지 않는 교차 확인으로, Robin·Lagarias 판정법을 독립 형식화한 `kimihiro64/Robin1984`와 결합해 약수합에 관한 부등식 두 개(`robin_inequality`, `lagarias_inequality`)를 가정 없이 얻었어요. 결합 export(약 61.7GB)도 con-leche와 nanoda가 받아들였어요.

### 직접 확인하려면

Lean v4.36.0이 있으면 빌드 없이 약 100GB RAM, 70GB 디스크로 `lake comparator`를 돌릴 수 있어요. 가장 빠른 독립 검사는 con-leche로, 약 50GB RAM에 64스레드에서 4분이 안 걸렸다고 해요. 증명 export는 압축 7.7GB예요.

### 주의 사항

빌드는 샌드박스 없는 클라우드 머신에서 `lake build`가 아니라 `lean`을 직접 호출해 했어요. `.olean` 해시는 빌드 경로에 따라 달라져 일부만 재현돼요. 통과는 "Lean으로 쓴 진술이 Mathlib 정의 아래에서 세 공리로부터 따라 나온다"는 뜻이고, 커널과 Mathlib 정의가 의도대로라는 전제에 기대요.
