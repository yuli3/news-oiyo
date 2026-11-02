---
id: trend-97d2b54f5a07a36e
title: "qwen: merge tensors on convert by am17an · Pull Request #31028 · ggml-org/llama.cpp"
sourceUrl: https://github.com/ggml-org/llama.cpp/pull/31028
summary: "llama.cpp PR #31028은 Qwen 그래프에서 같은 활성값을 읽는 작은 텐서들의 가중치를 GGUF 변환 때 하나로 합쳐요. 작성자 환경에서 새 GGUF로 생성 7%, 프리필 5%가 빨라졌고, r/LocalLLaMA는 'GGUF 다시 변환할 때'라고 반응했어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> GitHub PR 페이지의 설명과 리뷰 대화 일부를 읽고 옮겼어요. 변경 파일 전체와 접힌 대화는 읽지 못했어요.

### 무엇을 바꾸나요

작성자 **am17an**의 설명이에요.

- Qwen 그래프에는 **같은 활성값(activation)을 공유하는 텐서**가 몇 개 있어요.
- 이 PR은 이런 작은 텐서들의 가중치를 **변환(convert) 단계에서 합쳐요.** 기존 `--fuse-gate-up-exps`와 비슷하지만 더 작은 텐서가 대상이에요.
- 새 GGUF를 쓰면 작성자 환경에서 **토큰 생성 +7%, 프리필 +5%**였대요.
- AI 사용 공개: 예, Claude Code와 짝 작업(paired with CC).

코드에는 "같은 입력을 읽는 행렬곱은 변환기가 쓴 합친 `[a | b]` 가중치를 먼저 시도하고, 없으면 따로 된 가중치를 쓴다"는 로더 로직이 들어 있어요. 그래서 옛 GGUF도 계속 읽혀요.

### 리뷰 대화

- 한 리뷰어가 "이참에 로딩 시점(OTF) 병합을 도입하면 어떠냐"고 묻자, 작성자는 OTF는 `llama-model-loader`를 바꿔야 해서 더 어렵고, 지난번에 시도했을 때 mmap 등 여러 기능이 깨졌다고 답했어요.
- 병합이 무조건 되는지, 변환 스크립트에 플래그가 필요한지 묻자 **무조건 한다**며 합치지 않을 이유가 없다고 했어요.
- 메인테이너 CISC가 승인했고 ggerganov도 리뷰 의견을 남겼어요.

### Reddit 반응

u/jacek2023는 r/LocalLLaMA에 이 PR을 올리며 "GGUF를 다시 변환할 때인가?"라고만 적었어요. 성능 향상을 얻으려면 Qwen 모델 GGUF를 새로 변환해야 한다는 뜻이에요.
