---
id: trend-1531afb66dde3336
title: "graphsignal-top: a `top` for inference GPUs in the open-source Graphsignal profiler, kernels ranked by time, live, with readable names"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x421ow/graphsignaltop_a_top_for_inference_gpus_in_the"
summary: "오픈소스 Graphsignal 프로파일러에 추론 GPU용 `top`인 graphsignal-top이 추가됐어요. GPU 사용률·전력·쓰로틀링, 요청 대기열과 TTFT/TPOT, 최근 5초 커널 순위를 읽기 쉬운 이름으로 실시간 보여 줘요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요.

Graphsignal 개발자의 r/LocalLLaMA 글이에요. 몇 주 전 이 커뮤니티에 오픈소스 **Graphsignal 프로파일러**를 소개했는데, `vllm serve`나 `sglang serve` 등을 `graphsignal-run`으로 감싸면 측정한 모든 것을 JSON으로 내보내는 도구예요. 주로 에이전트가 루프에서 읽게 하려는 목적이었죠. 그런데 정작 개발자들이 GPU가 뭘 하는지 보려고 JSON을 직접 계속 열어 보게 돼서, **graphsignal-top**을 만들었대요.

```sh
graphsignal-run vllm serve --port 8000   # 터미널 하나
graphsignal-top                          # 다른 터미널
```

### 보여 주는 것
- GPU별 시간에 따른 사용률, 메모리, 전력, 쓰로틀링
- 엔진의 실행 중·대기 중 요청 수, tok/s, TTFT/TPOT p50/p95
- GPU 시간 분할: 커널 / 그래프 / memcpy / 동기화
- 최근 5초간 시간 순으로 정렬한 **모든 커널** — 맹글링된 심볼이 아니라 읽기 쉬운 이름과 분류로 보여 줘요.
- CUDA graph 재생, 전송, 동기화 탭

### 예시
스크린샷은 RTX PRO 6000 두 장에서 PCIe로 텐서 병렬(tp 2) Qwen3-32B를 돌린 장면이에요. NCCL all-reduce가 GPU 시간의 4분의 1을 차지하고, 벽시계 시간의 절반은 호스트가 그걸 기다리는 동기화라는 게 한눈에 보인대요.

### 원격 사용
`--listen-host`로 띄운 프로파일러에 `graphsignal-top --host gpu-box`로 붙거나 ssh 포트 포워딩으로 쓸 수 있어요. 로그에 한 화면만 남기고 싶으면 `--once`로 한 프레임만 출력해요. 저장소는 GitHub의 graphsignal/graphsignal이에요.
