---
id: trend-a5f94c7cdb7c4d43
title: "Looped Diffusion Transformer: the same blocks run several times inside each denoising step, and loop depth can be changed at sampling time [R]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x49d61/looped_diffusion_transformer_the_same_blocks_run"
summary: "텍스트-이미지 DiT를 키우는 대신 같은 블록 묶음을 디노이징 스텝마다 여러 번 돌리는 Looped Diffusion Transformer 논문을 M5 Pro에서 직접 돌려 본 글이에요. 루프 깊이를 샘플링 때 바꿀 수 있고, 깊이 3과 4의 결과가 거의 같았다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요.

r/MachineLearning [R] 글이에요. 작성자는 논문 **Looped Diffusion Transformer**(arXiv 2609.40305, 9월 30일)를 소개하고 직접 돌려 본 결과를 공유했어요.

### 논문 내용
텍스트-이미지 DiT를 더 크게 만드는 대신, **공유된 트랜스포머 블록 묶음을 각 디노이징 스텝 안에서 여러 번 반복 실행**해요. 저자들은 단순히 루프를 돌리는 것만으로는 안정적으로 도움이 되지 않는다고 보고하고, **모든 루프에 대한 deep supervision**과 **self-modulating attention**으로 이를 해결했어요. 주요 주장은 두 가지예요.
- 260M 루프 모델이 여러 벤치마크에서 **6.5배 큰 모델**을 이기면서 추론 연산은 **4.9배 적게** 써요.
- 추론 예산이 고정돼 있다면, 디노이징 스텝을 늘리는 것보다 **루프 깊이를 늘리는 게** 더 효과적이에요.

### 직접 돌려 본 결과
B/16 코드와 가중치가 MIT 라이선스로 공개돼 있어(가중치는 Hugging Face의 sensenova 아래) **M5 Pro**에서 실행했어요. 설정은 PyTorch MPS fp32, Euler 100스텝, CFG 6.0이고, 프롬프트마다 시드 하나를 루프 깊이 1~4에 재사용했어요. 모델은 깊이 4로 학습됐지만 README에 따르면 다른 깊이도 재학습 없이 동작해요.

결과 그리드는 시도한 프롬프트 중 다섯 개를 보여 줘요. 변화의 대부분은 깊이 3 이전에 일어나고, **깊이 3과 4는 모든 프롬프트에서 거의 같게** 나왔어요.

작성자가 흥미롭게 본 점은 깊이를 **샘플링 시점에** 고른다는 거예요. 루프형·recurrent-depth 언어 모델에서 반복 횟수를 고르듯, 이미지마다 연산과 정제 정도를 맞바꿀 수 있어요. 이 기기에서 이미지 한 장은 깊이 1에서 약 23~24초, 깊이 4에서 43~47초 걸렸어요.
