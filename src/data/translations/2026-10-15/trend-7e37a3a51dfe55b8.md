---
id: trend-7e37a3a51dfe55b8
title: "cuda, hip: GDN chunked kernel by am17an · Pull Request #29353 · ggml-org/llama.cpp"
sourceUrl: "https://github.com/ggml-org/llama.cpp/pull/29353"
summary: "llama.cpp PR #29353이 CUDA·HIP용 GDN chunked 커널을 추가해요. Reddit 큐레이터 excerpt에 PR 설명·성능 메모가 담겨 있어요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### PR 성격
ggml-org/llama.cpp **#29353** (`cuda, hip: GDN chunked kernel` by am17an). GDN(게이트 델타 등) 계열 연산을 청크 단위 GPU 커널로 넣는 작업으로, 로컬 추론 스택에서 해당 아키텍처 가속을 노려요.

PR 본문·벤치 코멘트 전문은 GitHub UI를 직접 열어 대조하는 편이 정확하고, 여기서는 큐레이터에 실린 설명 범위만 반영했어요.

CUDA와 HIP(AMD) 양쪽 경로를 명시해, 단일 벤더 커널이 아니라 복수 GPU 백엔드에서 GDN 청크 연산을 쓰려는 PR로 보여요. 머지 여부와 벤치 수치는 PR 페이지에서 확인해야 해요.
