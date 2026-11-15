---
id: trend-e8b0ed32c2e69d7d
title: "Probable GLM model"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xwy3ka/probable_glm_model
summary: "r/LocalLLaMA 사용자가 흐리게 가려진 리더보드 속 모델 3개(59.4%·57.1%·54.0%)가 Z.ai의 새 GLM 계열일 가능성을 추측한 글이에요. 블러 재구성 실험, 유튜버 AICodeKing의 과거 적중 기록, HF 활동을 근거로 들지만 작성자 스스로 추측이라고 밝혀요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

Mac mini 자동 수집은 Reddit API 키가 없어 막혔고, 공개 Reddit 글을 로그인 없이 직접 열어 옮겼어요. 원문 작성자도 **확인되지 않은 추측**이라고 밝힌 글이에요. 첨부 이미지는 보지 못했어요.

### 배경

작성자는 Theo(t3.gg)의 트윗을 계기로 자신의 "QFN DeepResearch 스웜 에이전트"를 돌려 관련 정보를 찾았다고 해요. 리더보드에 이름이 흐리게 가려진 **모델 3개가 59.4%, 57.1%, 54.0%** 로 올라 있었어요.

### 근거로 든 것

1. **블러 재구성**: 가려진 이름은 GLM-Nano(또는 GLM-Name, GLM-Next라는 댓글 제안)의 Pro, Med, Small일 가능성이 높다고 봐요. 한 커뮤니티 실험이 의심되는 글자를 재구성해 가우시안 블러(σx ≈ 6.9px)를 적용했더니 원본과의 RMSE가 1.254/255에 불과했다고 해요.
2. **AICodeKing의 적중 기록**: 그가 과거 GLM에 대해 한 말을 공식 출시일과 비교하면 GLM-4.6(당일), GLM-5(1일), GLM-5.1(11일), GLM-5.2(3일), GLM-5.3(4일)이었다고 해요.
3. **Anthropic 일정과의 타이밍**: 리더보드는 11월 12일에 나타났고 Anthropic IPO는 11월 18일이라, Z.ai가 이번 주 GLM-Nano를 내면 꽤 공교로운 타이밍이 될 거라고 해요.
4. **Hugging Face 활동**: 최근 3~4일 HF 활동이 지난 27일과 비교해 늘었다는 점을 또 하나의 신호로 들지만, 확실한 근거는 아니라고 인정해요.

작성자는 LLM으로 문법을 다듬었다고 밝히고, 실제 공개 모델이 아닌 추측이라 글이 삭제될 수 있다고 덧붙여요. 출처로 linux.do 토론 링크도 걸었어요.
