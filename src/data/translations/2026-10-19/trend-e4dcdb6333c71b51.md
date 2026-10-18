---
id: trend-e4dcdb6333c71b51
title: "GPT-2 KV cache from scratch: correctness, latency, and memory measurements [P]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x8xxmv/gpt2_kv_cache_from_scratch_correctness_latency"
summary: "PyTorch로 GPT-2 small과 KV 캐시를 직접 짜서 이론상 절감과 실측을 비교한 학습 프로젝트예요. 문맥 1,000에서 FLOP은 약 1,000분의 1인데 토큰당 시간은 29.69ms→4.95ms(약 6배)였고, 메모리는 토큰당 72KiB 공식과 보정 후 0B 차이로 맞았어요."
translationStatus: partial
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

Reddit API 키가 없고 Wayback 스냅샷도 없어서, 수집 때 받은 **RSS 본문**(작성자 글 전체)만 기준으로 옮겼어요. 글에 링크된 코드와 상세 글, 댓글은 읽지 않았어요.

### 무엇을 했나
학습용으로 GPT-2 small과 KV 캐시를 PyTorch로 직접 만들고, 수학적 절감 효과를 실제 지연 시간·메모리와 비교했어요. 작성자는 새 알고리즘이나 보편적 속도 향상 주장이 아니라 **교육용 구현**이라고 밝혀요.

### 실험 조건
사전학습 GPT-2 small(124M), NVIDIA A40, fp32(TF32 끔), 배치 1, greedy 디코딩. 워밍업 뒤 `torch.cuda.synchronize()`로 감싸 재고, 문맥 길이마다 5회 중앙값을 썼어요.

### 결과
| 항목 | 결과 |
|---|---|
| 정확성 | Hugging Face 대비 최대 로짓 차이 약 6.1e-5, 캐시 유무 greedy 생성 200토큰 일치 |
| 토큰당 시간(문맥 1,000) | 29.69ms → 4.95ms, 약 6배(FLOP 추정은 약 1,000배 감소) |
| 1,016토큰 생성 | 14.66초 → 5.03초, 약 2.9배 |
| 메모리 공식 | 토큰당 72KiB |

### 흥미로운 발견
- **놓치기 쉬운 버그**: 캐시 이어붙이기 순서를 뒤집어도 단일 토큰 어텐션 테스트는 통과했지만, 새 토큰 여러 개를 한꺼번에 디코딩하면 실패했어요.
- **평평한 곡선**: 캐시 쪽 지연 곡선이 거의 평평했어요. CPU·커널 실행 오버헤드 때문이라는 건 아직 프로파일러로 확인 안 된 가설이라고 해요.
- **메모리 오프셋**: 처음 측정에서 8,519,688바이트가 늘 더 잡혔는데, 지연 할당되는 8,519,680바이트 cuBLAS 작업공간과 8바이트 다음 토큰 텐서였어요. 기준선 전에 워밍업하고 캐시가 아닌 텐서를 빼자 16개 측정 지점 모두 공식과 0B 차이가 났어요. 할당기의 블록 크기 오버헤드는 따로 보여요.

### 작성자의 질문과 공개
남은 지연 하한을 파기 전에 어떤 정확성 사례나 프로파일링 통제를 더 넣을지 묻고 있어요. 작성자 본인 글이고, 코드와 글은 무료 공개이며 편집·도구에 AI 도움을 받았다고 밝혔어요.
