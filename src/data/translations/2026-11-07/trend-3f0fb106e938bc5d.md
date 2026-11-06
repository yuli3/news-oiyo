---
id: trend-3f0fb106e938bc5d
title: "moe-cache : LRFU/MQ-like hybrid cache, ClassLRU by sanmai · Pull Request #31233 · ggml-org/llama.cpp"
sourceUrl: https://github.com/ggml-org/llama.cpp/pull/31233
summary: "llama.cpp PR #31233은 moe-cache로 LRFU/MQ 유사 하이브리드 캐시와 ClassLRU를 더하는 변경이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-07
---

GitHub ggml-org/llama.cpp pull/31233 설명·디프 요지를 읽고 정리했어요.

### 요지
MoE 모델용 캐시 정책으로 LRFU/MQ 계열 하이브리드와 ClassLRU를 도입·실험하는 PR로 보입니다. 이슈 동기·벤치 스니펫·리뷰 코멘트가 스레드에 있어요. 머지 여부와 최종 API는 PR 상태를 확인하세요. 전체 패치를 라인 단위로 옮기진 않아 partial이에요.

### 출처와 한계
위 내용은 수집 시점에 열린 원문·공식 페이지·피드 요약에서 확인한 범위만 담았어요. 읽지 못한 구간이나 페이월 뒤 문장은 단정하지 않았고, 투자·매매·청약 권유도 하지 않아요. 최신 수치는 원문 링크에서 다시 확인해 주세요.


원문 제목은 「moe-cache : LRFU/MQ-like hybrid cache, ClassLRU by sanmai · Pull Request #31233 · ggml-org/llama.cpp」이에요.


수집기가 남긴 발췌: Replace SLRU with a cache that prioritizes frequently used experts in classes, ranked using decaying usage history. With a warm cache, I measured +6% decode on QFN and +7% on GLM versus SLRU, with 8% fewer uploads. Enables the auto mode for llama_moe_cache with promising benchmarks Waiting for 30966 to be merged. submitted by /u/pmttyji
