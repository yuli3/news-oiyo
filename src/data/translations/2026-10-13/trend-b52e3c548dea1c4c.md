---
id: trend-b52e3c548dea1c4c
title: "Boole-1.7B: A 1-bit Qwen3-1.7B model that outperforms Bonsai-1.7B"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x452zj/boole17b_a_1bit_qwen317b_model_that_outperforms"
summary: "Precision Numerics가 Qwen3-1.7B를 1비트로 줄인 Boole-1.7B를 공개했어요. 가중치는 247MB로 BF16보다 13.9배 작고, 10개 과제 평균에서 BF16 점수의 85.9%를 유지하며 1비트 Bonsai-1.7B를 앞섰다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요. 자세한 평가는 회사 블로그(precisionnumerics.ai/blog/boole-1p7b)에 있어요.

r/LocalLLaMA에 올라온 출시 글이에요. 작성자는 **Precision Numerics**라는 이름을 처음 알리면서, 첫 결과물로 Qwen3-1.7B의 1비트 버전인 **Boole-1.7B**를 공개했어요.

### 주요 수치
- 패킹된 가중치 **247MB** — BF16 대비 **13.9배** 작아요.
- 자체 10개 과제 평가 평균에서 BF16 원본 점수의 **85.9%**를 유지해요.
- 같은 크기의 1비트 **Bonsai-1.7B**를 앞서고, 1.58비트 Bonsai-1.7B와는 거의 비슷한 수준이래요.

### 써 보는 방법
- 브라우저에서 로컬로 바로 돌려 볼 수 있어요(precisionnumerics.ai/chat). 영어, 비사고(non-thinking) 모드의 저지연 작업용이라고 밝혔어요.
- vLLM이나 llama.cpp에서도 쓸 수 있고, 데모 코드는 GitHub(PrecisionNumerics/boole-demo)에 있어요.
- 가중치는 Hugging Face(precision-numerics/Boole-1.7B)에 올라가 있어요.

앞으로 오픈소스 커뮤니티를 위해 더 유능한 모델을 내놓겠다며, 다음에 보고 싶은 모델이나 기능을 알려 달라고 요청했어요.
