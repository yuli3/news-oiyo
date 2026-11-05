---
id: trend-2e96eb0dd629facd
title: "CCORE GLB-3D-Coder 4B final model and full weights are out"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xobe4h/ccore_glb3dcoder_4b_final_model_and_full_weights
summary: "Qwen3.5-4B를 전체 파인튜닝해 Three.js 3D 에셋을 만드는 CCORE GLB-3D-Coder 4B 최종판과 Safetensors 가중치가 공개됐어요. 설명을 넣으면 GLB 내보내기 버튼이 있는 HTML 장면을 써 줘요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

Reddit 자동 수집이 막혀 RSS로 받은 게시글 전문을 기준으로 옮겼어요. 영상 속 예시는 보지 못했어요.

### 본문
작성자는 지난 글에 이어 **CCORE GLB-3D-Coder** 최종판을 Safetensors 전체 가중치와 함께 공개했다고 알렸어요. Qwen3.5-4B를 재사용 가능한 3D 에셋 생성용으로 전체 파인튜닝한 모델이에요.

원하는 것을 설명하면 **Export GLB** 버튼이 달린 완전한 Three.js HTML 장면을 써 줘요. 브라우저에서 HTML을 열어 결과를 확인하고, Godot, Blender, Unity처럼 GLB를 지원하는 도구로 내보낼 수 있어요.

영상에는 최종 모델 예시와 DeepSeek V4.1 Flash와의 일부 비교가 담겨 있대요. 작성자는 4B 파라미터로 이 정도 캐릭터 디자인과 디테일을 낸다는 점이 특히 만족스럽다고 했어요. 판타지 캐릭터뿐 아니라 건물, 환경, 무기, 차량, 실험 장비, 스포츠 소품, 가구 등도 만들고, 애니메이션을 생성해 GLB에 넣을 수도 있어요.

### 지금 받을 수 있는 것
- Q4_K_M GGUF(약 2.7GB)
- Q8_0 GGUF
- Safetensors 전체 가중치
- 학습 데이터셋은 11월 6일 공개 예정이에요.

모델, 다운로드, 시스템 프롬프트, 권장 설정은 Hugging Face에 있어요. 작성자는 아직 일부 생성물은 다시 돌리거나 코드를 조금 고쳐야 하지만, 이전 버전보다 많이 나아졌다고 했어요. 결과나 실패 사례를 공유해 주면 큰 도움이 된다고 해요.

### RIFTWARD
작성자는 이 모델이 로컬에서 만든 캐릭터·지형·소품으로 작은 브라우저 아레나 게임 **RIFTWARD**도 만들었어요. 에셋을 조립·다듬고 게임플레이를 만드는 데는 오케스트레이션·검증 하네스를 썼다고 해요. 게임은 Hugging Face Spaces에서 해 볼 수 있어요.
