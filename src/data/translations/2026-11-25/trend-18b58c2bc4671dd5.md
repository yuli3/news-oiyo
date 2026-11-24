---
id: trend-18b58c2bc4671dd5
title: "Multi-Turn Agentic Reinforcement Learning with Tunix and Gemma 4 on Google TPUs"
sourceUrl: https://developers.googleblog.com/multi-turn-agentic-reinforcement-learning-with-tunix-and-gemma-4-on-google-tpus
summary: "구글이 Tunix와 Gemma 4로 여러 턴에 걸쳐 도구를 쓰는 에이전트를 TPU v6e-8에서 GRPO로 학습시킨 과정을 공개했어요. 100스텝 만에 비행기 격파 게임 승률이 9.4%에서 약 95%로 올랐어요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

### 개요

2026년 11월 19일 Wei Wei가 쓴 글이에요. Tunix의 에이전틱 강화학습 파이프라인으로 여러 턴에 걸쳐 도구를 쓰는 LLM 에이전트를 Cloud TPU v6e-8 호스트 한 대에서 학습시키는 방법을 다뤄요. 앞선 Tunix 글들이 지도 미세조정과 단일 턴 GRPO를 다뤘던 데 비해, 이번 글은 여러 단계에 걸쳐 추론하고 도구를 호출하며 적응해야 하는 에이전트를 대상으로 해요.

### Tunix와 Gemma 4

Tunix는 TPU용으로 만든 구글의 오픈소스 사후 학습 라이브러리예요. 모델은 `google/gemma-4-E2B-it`을 thinking 모드로 돌려요. Gemma 4는 시스템 프롬프트에 도구 스키마를 선언하고 자체 형식으로 도구 호출을 내보내요. `<|tool_response>` 토큰이 정지 토큰 역할을 해서, 모델이 멈춰 도구 결과를 받은 뒤 같은 턴을 계속 이어가요.

### 과제와 환경

게임은 6x6 격자(A1~F6) 위의 '비행기 격파'예요. 8칸짜리 비행기 하나가 네 방향 중 하나로 숨어 있어요. 매 턴 에이전트는 직전 결과와 보이는 보드(미시도·명중·빗나감)를 보고 후보 칸을 추론한 뒤 `strike(cell=...)` 도구를 호출해요. 비행기 8칸을 모두 맞히거나 23번을 다 쓰면 끝나요. 환경은 Tunix의 `BaseTaskEnv`를 상속한 `PlaneStrikeEnv`이고, 시드로 숨은 비행기를 고정해 GRPO 그룹의 롤아웃 8개가 같은 보드를 풀게 해요. 각 스텝은 관측, 보상, 종료 플래그, 정보를 돌려주고 보상은 궤적 단위로 합산돼요. `tunix.rl.agentic` 모듈에는 바로 쓸 수 있는 도구 환경·에이전트·매니저 클래스도 있어요.

코드 구성은 환경 로직 `env.py`, 도구 정의와 채팅 템플릿 파서 `strike_tool.py`, 관측을 메시지로 바꾸고 출력을 파싱하는 `agent.py`, 궤적 수집과 GRPO 학습 설정을 담은 `trajectory_utils.py`·`train_planestrike.py`예요. 에이전트는 추론 블록은 무시하고 최종 답에 유효한 strike 호출이 하나만 있어야 하며, 그 외는 무효 행동으로 표시해요.

### GRPO와 롤아웃 설정

- 롤아웃은 `vllm-tpu` 서버 모드로 비동기 멀티 턴으로 돌리고, 접두사 캐싱으로 길어지는 대화 이력을 재사용해요.
- v6e-8 호스트 하나에서 액터 모델, 참조 모델, 롤아웃 워커가 칩 8개를 함께 써요.
- 손실은 `gspo-token`, 어드밴티지 추정은 RLOO를 썼어요.
- `exact_token_continuity=True`로 턴 사이의 토큰 ID를 정확히 유지해 재토크나이즈 드리프트를 막아요.
- 정지 토큰은 EOS, 턴 종료 토큰, 도구 응답 토큰이에요. 로짓 소프트캡핑은 30.0으로 덮어썼어요.
- 학습은 100스텝, 학습률 2e-6에서 2e-7로 감쇠하고, 스텝마다 보드 8개에 게임 8판씩 돌려요.

### 결과

| 지표 | 학습 전 | 100스텝 후 |
|---|---|---|
| 승률(홀드아웃 보드) | 9.4% | 약 95% |
| 게임당 평균 공격 횟수 | 약 22.44 | 약 16 |
| 승률(학습 롤아웃) | 약 0.20 | 약 0.95 |

도구 호출 준수율은 초반에 약 100%에 도달하고, 무효 행동은 거의 0으로 떨어지며 같은 칸을 다시 때리는 비율은 약 0.55에서 0.15로 줄었어요. 한 게임의 모든 공격이 보상 하나를 공유하기 때문에, 저자는 턴별 크레딧 할당을 개선 방향으로 꼽았어요.

### 자료

코드는 github.com/windmaple/planestrike-gemma4-rl, Tunix는 github.com/google/tunix와 tunix.readthedocs.io에 있어요. 글은 vllm-tpu(github.com/vllm-project/tpu-inference)와 앞선 Tunix 글들, 그리고 이전 TensorFlow/JAX 비행기 격파 글도 함께 가리키고 있어요.
