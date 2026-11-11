---
id: trend-645da98c05fd02c7
title: "llama.cpp: Add FP8 KV-cache"
sourceUrl: https://github.com/ggml-org/llama.cpp/pull/28392
summary: "llama.cpp에 OCP FP8 기반 KV 캐시 지원 PR(#28392)이 11월 11일(KST) 병합됐어요. 텐서별 정적 스케일을 선택적으로 지원하고, flash attention 커널을 고치는 대신 그래프 단계에서 스케일을 곱하는 방식으로 구현했어요. 작성자는 Codex와 함께 작업했다고 밝혔어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

GitHub PR 페이지의 설명과 공개된 타임라인 일부, GitHub API의 병합 정보를 읽고 옮겼어요. 숨겨진 리뷰 85건과 코드 변경 내용은 읽지 못했어요.

### 무엇이 바뀌었나

ggml-org/llama.cpp의 PR **#28392 "Add FP8 KV-cache support"**(작성 ORippler)는 **OCP-FP8 기반 KV 캐시**를 지원해요. 실행 시점의 텐서별 정적 스케일을 지원하지만 필수는 아니에요.

- 스케일이 1이 아닌 FP8 KV 캐시를 쓰는 모델 예로 `nvidia/Mistral-Medium-3.5-128B-NVFP4`를 들었어요.
- `ggml_flash_attn_ext`를 고치지 않고 **그래프 수준에서 스케일 곱셈**을 넣었어요. NVFP4/FP8에 이미 쓰는 소유권 모델과 맞고, FP8 로직을 flash attention과 일반 어텐션 층이 함께 쓰기 쉬워진다는 이유예요.
- 변환·로딩, 컨텍스트 이동, FP8 스케일 KV 캐시의 전반적 정확성에 대한 E2E 테스트를 더했어요. 뒤 커밋에서 이 테스트를 `test-llama-archs`로 옮겼어요.
- AI 사용 공개 항목에 "예, Codex와 짝을 이뤄 작업"이라고 적었어요.

### 진행 경과

- 9월 4일 초안으로 올라왔고, 10월 13일 리뷰 준비 완료로 바뀌어 ggerganov 등 코드 소유자에게 리뷰를 요청했어요. 앞서 OCP FP8 E4M3 양자화 지원(#27512)이 병합돼 있었어요.
- 11월 10일 커밋 24개로 정리했고, 커밋에는 rope 이동 전 FP8 역양자화 수정, 투영 구조와 무관한 캐시 스케일 이름 정규화, 스케일 포인터 저장으로 **Gemma 4 Assistant의 FP8 사용** 활성화 등이 있어요.
- GitHub API 기준 2026년 11월 11일 01:08(KST)에 병합됐고, 파일 16개, 추가 710줄·삭제 25줄이에요.
