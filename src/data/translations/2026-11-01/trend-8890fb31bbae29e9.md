---
id: trend-8890fb31bbae29e9
title: "An LLM inside an LLM - Same guy who put a RISK-V CPU inside Qwen has now made Karpathy's stories260k run on an NPU compiled inside Qwen 3.5-4B's weights"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xkiuut/an_llm_inside_an_llm_same_guy_who_put_a_riskv_cpu
summary: "Qwen 안에 RISC-V CPU를 넣었던 개발자가 이번엔 Qwen 3.5-4B 가중치 안에 NPU를 컴파일해 Karpathy의 stories260K를 돌리는 'QwenPU'를 공개했어요. 행렬곱·softmax·어텐션을 비트 단위로 정확히 계산한대요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

Reddit이 API 키 없이 막혀 있어 r/LocalLLaMA RSS 본문을 기준으로 옮겼어요. 글은 원작자의 X 스레드를 옮겨 온 거예요.

### 무엇인가

r/LocalLLaMA 글쓴이는 Qwen 안에 RISC-V CPU를 넣었던 같은 개발자의 새 작업이라며 원 트윗을 소개했어요. 코드는 GitHub `divagr18/QwenPU`, 가중치는 Hugging Face `divagr1925/QwenPU`에 있어요.

### 원 트윗 내용

1. LLM 안의 CPU도 대단한데, **LLM 안에서 또 다른 LLM**을 돌리는 건 너무 나간 것 아니냐며, 그래서 만들었다고 해요. **QwenPU**는 Karpathy의 **stories260K**를 Qwen 3.5-4B 가중치 안에 컴파일한 NPU에서 돌려요.
2. stories260K는 그냥 C 프로그램이에요. 이를 Qwen 안에서 돌리려고 행렬곱, softmax, 어텐션을 **비트 단위로 정확하게** 하는 NPU를 Qwen 가중치 안에 컴파일했어요. stories260K의 가중치는 Qwen 자신의 메모리에 있고, **외부 도구는 쓰지 않아요.** 속도를 높이는 데 많은 공을 들였고 곧 더 설명하겠대요.
3. 지금 많이 아파서 전체 글은 아직 쓰는 중이고, 최적화와 크기 줄이기도 하고 있대요. 블로그 글을 마무리해 곧 올리겠다고 했어요.

자세한 구현 방식과 성능 수치는 아직 공개되지 않았어요.
