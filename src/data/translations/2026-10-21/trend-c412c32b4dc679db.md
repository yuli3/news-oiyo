---
id: trend-c412c32b4dc679db
title: "Qwen3.8-Flash-Next vs Opus 5.5: Six-way benchmark on a real Rust feature with Claude Code and Pi"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1xatxqk/qwen38flashnext_vs_opus_55_sixway_benchmark_on_a"
summary: "r/LocalLLaMA 사용자가 실제 Rust 기능 구현 과제로 Opus 5.5와 노트북에서 돌린 Qwen3.8-Flash-Next를 Claude Code·Pi 하네스별로 12번 비교했어요. 12개 PR 모두 테스트를 통과했고, Opus가 87%로 앞섰지만 Flash-Next도 67~69%였어요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

Reddit API 키가 없고 Wayback 스냅샷도 없어 글 페이지와 댓글은 읽지 못했어요. 수집 때 받은 RSS 본문(글 본문)을 기준으로 옮겼어요.

### 실험 설정
지난 글에서 하네스와 effort 수준이 달라 비교가 불공정하다는 지적을 받고 더 통제된 비교를 했대요. 모든 실행의 과제는 **LlamaStash 로드맵의 실제 기능**(모델을 내리기 전에 llama-server의 KV 캐시를 저장하고, 다시 올릴 때 복원하기)이에요. 조합 6개를 두 번씩 돌려 PR 12개를 만들었어요. Flash-Next는 Strix Halo 노트북(Flow Z13)에서 Halogen으로 약 Q4 양자화로 돌렸고, 채점은 Opus 5.5, Flash-Next, Kimi K3가 리뷰 질문 7개와 CI로 했어요.

### 결과(8점 만점, 두 번 평균)
- Claude Code + Opus 5.5 xhigh: 6.94(87%), 43.5분, $17.78
- Claude Code + Opus 5.5 medium: 6.25(78%), 23.4분, $6.52
- Claude Code + Flash-Next medium: 5.5(69%), 45.3분, $0.32
- Pi + Flash-Next xhigh: 5.44(68%), 63.8분, $0.67
- Claude Code + Flash-Next xhigh: 5.38(67%), 49.5분, $0.39
- Pi + Flash-Next medium: 5.06(63%), 48.1분, $0.56

Flash-Next 비용은 QwenCloud 가격 기준이고, 실제로는 로컬이라 전기료만 들었대요.

### 요약
- 12번 모두 끝났고 12개 PR 모두 종단 테스트를 통과했어요.
- Opus 평균 82%, Claude Code + Flash-Next 68%, Pi + Flash-Next 66%였고, 차이는 에지 케이스, 테스트, 문서에서 났어요.
- Flash-Next는 같은 effort에서 Opus보다 1.1~2.1배 오래 걸렸어요.
- CI는 Claude Code PR 4개 중 4개, Pi PR 4개 중 1개가 통과했어요.
- Opus는 xhigh로 조금 나아졌지만 비용이 2.7배였고, Flash-Next는 medium과 xhigh 점수가 비슷했어요.
- 작성자는 Opus가 FP16이나 최소 FP8로 도는 프런티어 모델이고 Flash-Next는 4.16bpw였다는 점을 함께 밝혀요.
