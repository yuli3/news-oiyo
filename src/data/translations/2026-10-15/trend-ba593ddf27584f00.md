---
id: trend-ba593ddf27584f00
title: "Sabi-Noema: A capability and efficiency focused fine-tune of Qwen 3.8 27B"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x62zrz/sabinoema_a_capability_and_efficiency_focused"
summary: "Sabi-Noema는 Qwen 3.8 27B 능력·효율 중심 파인튜닝으로, TB2.1에서 응답 토큰을 약 50%·DeepSWE에서 약 25% 줄였다고 해요. MLA 후처리 변환 버전도 있어요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 주장 수치(포스트)
- **Sabi-Noema**: base Qwen 대비 TB2.1 토큰 **~50%↓**, DeepSWE **~25%↓**
- **Sabi-Noema-MLA**: GQA→MLA 사후 변환, 캘리브레이션 데이터만 사용(추가 본학습 최소화 주장)

능력은 유지·효율은 올리는 방향의 파인튜닝이라고 소개해요.

> tl;dr: new qwen finetune that simultaneously pushes the frontiers of small model capability and reasoning efficiency. Hey everyone, We publish two post-trained versions of Qwen 3.8 27B called Sabi-Noema and Sabi-Noema-MLA . These models push the capability frontier on <30B models with 2x reduction in verbosity, and are exclusively trained on open source environments. These models have improved capabilities on coding, agentic and tool calling tasks, as well as hallucinating lesser. Sabi-Noema beats GPT 6 Luna-medium on DeepSWE, placing in between Luna 6 medium and high. It beats Luna-high on agentic and tool calling benchmarks like TB2.1, Tau-3 bench, ClawEval, and BFCL v4. Its hallucination rate is considerably lower than Luna, Qwen and other competing models. https://preview.redd.it/3ls45pejthvh1.png?width=1760&format=png&auto=webp&s=a6f6197e3a800add3aab3ddf00e110316b4476b0 These models are much more reasoning efficient. Sabi-Noema generates 50% fewer tokens per response on TB2.1 and 25% fewer tokens on DeepSWE, compared to base Qwen. Sabi-Noema-MLA goes even further by doing a post-hoc MLA conversion of Qwen's GQA attention. This conversion uses only a calibration dataset and no extra training. With BF16 latents Sabi-Noema-MLA needs 3.6x lower bytes per token. The MLA latents can be further compressed to FP8 with the total KV cache size on TB2.1 to 8.4x smaller with similar p
