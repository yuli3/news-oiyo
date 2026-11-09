---
id: trend-9ea619f7c2dc3566
title: "LoRA-conditioned model skips the first line of its output when the caption is short. Any idea why? [D]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xrdn7p/loraconditioned_model_skips_the_first_line_of_its
summary: "석사생이 BrickNet(CVPR 2026)으로 Qwen3 0.6B에 LoRA를 붙여 LEGO 모델을 텍스트로 생성하는데, 캡션이 짧으면(약 4토큰) 첫 루트 줄을 늘 건너뛰고 18토큰 이상이면 정상이라며 원인을 물었어요. 짧은 캡션을 길게 늘리면 해결되지만 이유를 알고 싶대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Reddit은 수집 환경에서 막혔고(API 키 없음, Wayback 스냅샷 429) RSS에 실린 게시글 본문을 기준으로 옮겼어요. 본문 끝부분이 잘려 있고 댓글은 보지 못해 `partial`이에요.

### 설정

작성자는 석사 프로젝트로 BrickNet(GitHub `kulits/BrickNet`, CVPR 2026)을 다뤄요. LEGO 모델을 평범한 텍스트로 쓰고, Qwen3(작성자는 0.6B 사용)를 LoRA로 미세조정해요.

- **PT 어댑터**: 텍스트 형식을 배워요.
- **SFT 어댑터**: 캡션을 조건으로 받아요.
- 텍스트는 루트 줄 하나("a | ")로 시작하고, 이어서 노드 줄과 엣지 줄 쌍이 반복돼요.

PT를 먼저, 이어서 SFT를 병합(peft `merge_and_unload`, bf16)하고, 캡션 토큰에 줄바꿈 토큰을 붙여 프롬프트로 넣어요. 학습 코드가 캡션 + "\n" + 경로 + EOS로 학습하고 손실은 경로에만 거는 것과 맞췄어요.

### 문제

"A red car." 같은 짧은 캡션(약 4토큰)이면 모델이 루트 줄을 절대 쓰지 않아요. 첫 생성 토큰이 매번 "b"라 문법이 깨져요. 물체 다섯 개에서 각각 12번 중 0번 성공했어요. 약 18토큰 이상 캡션이면 매번 "a"를 써요(새 물체 셋, 36번 중 36번).

### 배제한 원인

- 저장·디코딩 버그: 원시 토큰을 확인했고 첫 토큰이 정말 "b"예요.
- 토큰화 불일치: 학습과 생성 코드가 같은 방식으로 캡션을 인코딩해요.
- "a"를 접두사로 강제해도 소용없어요. 루트를 이미 쓴 것처럼 노드 다음 바로 엣지를 써요.
- 정보량 문제만도 아니에요. 대부분 군더더기인 31단어 캡션도 통했어요. 다만 15토큰 근처에서는 불안정했어요.

### 질문

조건 텍스트가 SFT 데이터보다 훨씬 짧을 때 LoRA 조건 모델이 이렇게 실패하는 걸 본 적 있는지 물어요. 작성자는 학습 캡션을 아직 보지 못했지만 모두 긴 설명일 거라고 추측해요. bf16 관련 질문도 이어지지만 본문이 거기서 잘렸어요.
