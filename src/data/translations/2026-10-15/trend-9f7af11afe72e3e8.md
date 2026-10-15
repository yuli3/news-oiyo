---
id: trend-9f7af11afe72e3e8
title: "Mapping the Post-Transformer Architecture Landscape in 2026 [D]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x5u2wz/mapping_the_posttransformer_architecture"
summary: "2026 포스트-트랜스포머 지형(Mamba·RWKV·BDH·xLSTM·Titans·하이브리드 등)을 표로 정리한 ML 토론 글이에요. 추론·메모리·적응을  pragmatic 예산 안에서 보려는 관심사예요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 다룬 방향(포스트 표)
- **Mamba-2/3**: Selective SSM (+ complex state, MIMO)
- **RWKV-7 Goose**: 병렬화 가능 RNN, 상수 메모리, KV 없음
- **BDH (Dragon Hatchling / Pathway)**: 뉴런 그래프, 로컬 상호작용에서 어텐션 창발
- **xLSTM (NXAI)**: exponential gating + matrix memory
- **Titans (Google)**: neural long-term memory 등
- 기타 랩 하이브리드

관심: 스케일만 아니라 **제한 컴퓨트·에너지에서 지능**을 뽑는 아키텍처. 표는 작성자 정리이며 각 논문 원문과 1:1 대조는 이 번역에서 안 했어요.
