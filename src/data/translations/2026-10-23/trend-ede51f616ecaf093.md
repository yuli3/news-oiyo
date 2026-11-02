---
id: trend-ede51f616ecaf093
title: "Show HN: Turn regular JavaScript into a neural net"
sourceUrl: https://chenglou.me/handwired
summary: "Cheng Lou의 Handwired는 일반 JavaScript 코드를 학습 없이 정확하면서도 미분 가능한 신경망으로 바꿔 GPU 없이 브라우저에서 돌리는 프로젝트예요. 조건문을 ReLU 조합으로 옮기는 원리를 보여 줘요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

### Handwired가 뭔가요

**Handwired**는 "평범한 JavaScript 코드를 신경망으로 바꿔 준다"는 프로젝트예요. 소개 문구는 세 가지예요.

- **학습이 필요 없어요.**
- **정확하면서도 완전히 미분 가능해요.**
- **GPU 없이 브라우저에서 돌아가요.**

### 예시: 삼항 연산자를 ReLU로

페이지는 이런 코드로 원리를 보여 줘요.

```js
const result = a > 4 ? 10 : 12
```

이걸 이렇게 바꿔요.

```js
const above4 = relu(a - 4) - relu(a - 5)
// relu(x) is Math.max(0, x)
const result = above4 * 10 + (1 - above4) * 12
```

`above4`는 "a > 4"를 숫자 1 또는 0으로 나타낸 값이에요. 두 번째 줄은 두 분기를 모두 계산한 뒤 하나만 남겨요. 예를 들어 a = 5면 above4 = 1 − 0 = 1이라 결과가 10이고, a = 4면 above4 = 0이라 결과가 12예요. 회로 그림은 ReLU 두 개와 그 값의 가중합, 즉 제목에 나온 "신경망" 그 자체예요.

### 정확성의 경계

페이지 주석은 정확한 범위를 꼼꼼히 밝혀요.

- above4는 **모든 정수 a**에서 정확히 1이나 0이에요.
- 4와 5 사이에서는 a − 4가 돼요. a = 4.5면 0.5, 결과는 11이에요.
- 아주 큰 정수에서도 틀어져요. 런타임 숫자형인 FP32에서는 2^24 + 6 = 16,777,222에서 a − 5가 2^24로 반올림돼 above4가 2, 결과가 8이 돼요.

실제 런타임은 비교를 다르게 만들어요(`emitCompare`). 정수처럼 격자 위에 선언된 피연산자는 `relu(1 - relu(1 - D))`로 비교 비트를 만들고, 격자가 없는 값은 차이에 2의 거듭제곱을 곱하고 자르는 "부호 캐스케이드"로 선언된 범위 안의 모든 FP32 쌍에서 JavaScript 비교와 같은 결과를 내요.

### 데모

- Handwired로 변환한 **작은 데스크톱**: 거대한 목록, 애니메이션, 스크롤, 드래그, 입력, 그림이 일반 DOM으로 렌더링돼요.
- 컴파일된 프로그램의 **가중치를 풀어 실시간으로 학습**시키기.
- **JSON 문서 10만 개 검색**: 정규식 매칭, JSON 파싱, 하이라이트를 JS로 쓴 뒤 WebGPU 커널로 바꿔 대규모 병렬로 돌려요.
