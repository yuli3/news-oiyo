---
id: trend-b152ccc0e0b50441
title: "Show HN: DOOM을 트랜스포머로 바꿨습니다"
sourceUrl: https://github.com/mottopanikeiku/doomformer
summary: "Doomformer는 신경망을 DOOM 맵으로 컴파일하는 도구예요. 부두 인형이 산술을 하고 가중치는 바닥의 선, 합은 조명 밝기, 활성화는 계단으로 표현해, DOOM이 MNIST 손글씨 숫자를 97% 정확도로 읽는대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

GitHub README의 앞부분(약 3,000자, MNIST 시험 결과 표 초반까지)을 읽고 옮겼어요. 동작 원리와 나머지 문서는 반영하지 않았어요.

### 무엇인가

> 신경망을 DOOM 맵으로 바꾸는 컴파일러를 만들었어요. 부두 인형(voodoo doll)이 산술을 해요. 가중치는 바닥의 선, 합은 조명 밝기, 활성화는 계단이에요.

DOOM이 **MNIST 손글씨 숫자를 97% 정확도**로 읽는대요. 테스트 숫자 1만 개 전부에서 맵이 돌려준 모든 값이 NumPy 정수 신경망 결과와 **정확히 일치**했다고 해요.

### 빠른 시작

Linux나 macOS의 Python 3.11+ 가상환경에서 이렇게 해요.

```
pip install git+https://github.com/mottopanikeiku/doomformer
doomformer doctor
doomformer hello
```

`hello`는 작은 MLP를 맵으로 컴파일해 입력 5개를 돌리고 `5/5 EXACT`를 출력해요. ViZDoom에 무료 Freedoom 에셋이 들어 있어 게임 창이나 DOOM 구매가 필요 없어요. 첫 실행 때 레벨 스크립트 컴파일러 ACC를 빌드하니 git, cmake, make, C/C++ 컴파일러가 있어야 해요. Colab 노트북에서 브라우저로 숫자를 그려 볼 수도 있어요.

### 박물관 맵

`museum.wad`와 Freedoom을 받아 GZDoom으로 열어요. 바닥 패드 일곱 개를 밟아 숫자를 그리고 READ를 누르면 **부두 인형 136개**로 손수 만든 신경망이 답을 밝혀요. MUTATE를 누르면 연결 하나가 +1에서 −1로 바뀌어 같은 7이 1로 읽히고, RESTORE로 되돌려요. 맵은 Python 없이 돌고, 자체 테스트가 GZDoom, LZDoom, UZDoom, ZDoom 2.8.1에서 통과한대요.

### 숫자 그리기와 MNIST 시험

`doomformer draw --digit 7`을 쓰면 해병이 FIRE를 눌러 28×28 바닥 캔버스에 잉크를 칠하고 READ를 눌러요. 같은 맵에서 **부두 인형 1,355개**가 MNIST 신경망을 돌리고, 이긴 숫자의 인형이 선을 넘어 표시등을 켜요. 맵 하나로 첫 100개 숫자는 99/100 정답(계산 일치 100/100), 무작위 1,000개는 966/1,000 정답(계산 일치 1,000/1,000)이었어요.
