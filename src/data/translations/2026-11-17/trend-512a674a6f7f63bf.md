---
id: trend-512a674a6f7f63bf
title: "I have created a tool to observe what happens inside an LLM. Also allows for the comparison of two quantizations of the same model to see at what point they diverge, token by token"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xx7qbf/i_have_created_a_tool_to_observe_what_happens
summary: "inside-llm은 llama.cpp로 GGUF 모델 한두 개를 띄워 생성 과정을 브라우저에서 보여 주는 오픈소스 도구예요. 같은 모델의 두 양자화가 어느 토큰에서 갈라지는지, 후보 분포·샘플러 단계·logit lens까지 시각화해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

Reddit 원문이 자동 경로로 막혀 데스크톱 브라우저로 원 게시물을 직접 읽고 옮겼어요.

### 왜 만들었나 (u/AlternativeEnough352)

같은 모델의 양자화가 다르면 무엇이 바뀌는지 직접 **보고** 싶어서 만든 MIT 라이선스 오픈소스 도구 **inside-llm**이에요. llama.cpp로 GGUF 모델 한두 개를 불러와 텍스트를 생성하는 동안 모델이 하는 일을 브라우저에 보여 줘요.

### 보여 주는 것

- **Stream**: 모델별 한 열씩 텍스트를 보여 주고 밝기로 토큰 확률을 표시해요. A와 B의 선택이 다를 때 자홍색 표시가 붙어요. 같은 텍스트를 읽는 lockstep 모드와 각자 갈 길을 가는 free 모드가 있어요.
- **Candidates**: 각 선택 뒤의 전체 분포, 엔트로피, 유효 선택지 수, Jensen-Shannon 발산, 양방향 KL.
- **Gates**: penalties, top-k, top-p, min-p, temperature, GBNF 문법까지 샘플러 체인을 단계별로 추적해요.
- **Timeline**과 **Branching**: 엔트로피·발산 흐름, 아무 후보나 눌러 거기서 이어 생성하는 분기 트리. KV 상태 스냅샷을 둬서 다시 생성하지 않고 정확히 돌아가요.
- **Logit lens**(`--lens`): 층별 예측을 2D 지도와 3D 지형으로 보여 줘요.
- **모델 선택기**: 폴더나 Hugging Face에서 같은 토크나이저인 두 양자화를 골라 받고, VRAM에 들어갈지 추정해요.

### 구조

C++17 프로세스 하나가 llama.cpp를 직접 링크하고, 매 단계 전체 logits를 읽어 지표와 샘플러를 계산한 뒤 시드 고정 샘플러로 토큰을 뽑아 재현 가능해요. WebSocket 바이너리 프레임으로 Svelte 5 + Canvas 2D 페이지에 보내고(3D는 three.js), 기록한 세션은 엔진·모델·GPU 없이 정적 페이지에서 재생할 수 있어요.

### 실행과 한계

Linux(glibc 2.35+)·Windows용 CUDA/Vulkan 패키지가 있고, 127.0.0.1에서만 듣고 계정·텔레메트리가 없어요. 한계는 A·B가 토크나이저를 공유해야 하고, 두 모델이 동시에 VRAM에 들어가야 하며(내장 GPU는 안 쓰고 없으면 CPU로 느리게 동작), 텍스트 전용이고 분할 GGUF·임베딩 모델은 안 된다는 점이에요.
