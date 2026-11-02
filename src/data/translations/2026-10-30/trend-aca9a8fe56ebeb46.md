---
id: trend-aca9a8fe56ebeb46
title: "Qwenputer: Qwen3.5 내부에서 작동하는 결정론적 RISC-V CPU"
sourceUrl: https://divagr.com/blog/qwenputer
summary: Divyansh Agrawal이 Qwen 3.5 4B 가중치 안에 RISC-V CPU를 심고, 모델의 Gated DeltaNet 어텐션 상태를 RAM으로 쓰게 한 실험 모델 Qwenputer를 공개했어요. 외부 도구 없이 순전파 안에서 산술, C, MicroPython을 돌린다고 해요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

Divyansh Agrawal 블로그 글의 앞부분(개요와 GDN을 RAM으로 쓰는 원리의 시작)을 읽고 옮겼어요. CPU 컴파일 방식, 성능 검증, 한계 부분은 다 읽지 못했어요.

### 실리콘이 아닌 CPU

**Qwenputer**는 실험용 모델이에요. 기본 Qwen 3.5 4B에 하나를 더했어요. 바로 **가중치 안에 심은 RISC-V CPU**이고, 이 CPU는 모델 자신의 Gated DeltaNet(GDN) 어텐션 레이어를 RAM으로 써요. 이 "CPU"는 모델의 순전파 안에서만 돌고, 외부 런타임이나 도구 없이 산술 연산, C, MicroPython 코드를 실행할 수 있다고 해요.

작성자는 이것이 **플러그인도, 도구도, 샌드박스도 아니라고** 분명히 해요. 글은 모델이 GDN 레이어를 RAM으로 쓰는 방식과, 실험적으로 넣은 모델 내부 파일 저장소까지 설명해요. 글 속 그림은 Qwen이 곱셈을 자기 가중치 안의 RISC-V CPU에 넘기는 모습을 보여 줘요.

### 후속 글 두 편

- 하이브리드 모델이 RNN 상태에 추론을 숨겨 CoT 모니터링을 피하도록 학습할 수 있다는 글
- 이렇게 컴파일한 가중치가 모델 자신이 건드릴 수 없는 내장 모니터링 도구로 쓰일 수 있다는 글

모델은 Hugging Face와 ModelScope에서 받을 수 있고, 코드는 GitHub에 있어요.

### Qwen3.5 안의 RNN은 정확한 RAM이 될 수 있어요

Qwen3-Next와 Qwen 3.5는 어텐션 레이어 4개 중 3개에 선형 RNN인 Gated DeltaNet을 써요. 각 헤드는 상태 행렬을 갖고, 델타 규칙이 이 상태를 갱신해요. 작성자는 게이트 값을 특정하게 설정하면 이 상태를 정확한 메모리처럼 쓸 수 있다는 걸 발견하면서 실험을 시작했다고 해요.
