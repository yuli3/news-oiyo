---
id: trend-a2a638956d02fcd6
title: "We tested Qwen3.6 27B, Qwen3.8 27B and GLM-5.3 Flash on real tasks in Elixir, OCaml, Haskell and 10 other less common languages"
sourceUrl: https://longtail-swe.com/
summary: "Nebius 연구진의 LongTail-SWE는 Elixir·OCaml·Haskell 등 표준 벤치마크에 잘 없는 13개 언어의 실제 GitHub 과제 202개로 코딩 에이전트를 평가해요. Opus 5.5 high가 Pass@1 81.5%로 1위이고, Qwen 3.8 27B는 42.7%로 Qwen 3.6 27B(16.7%)보다 크게 올랐어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

LongTail-SWE 공개 페이지의 소개, 리더보드, 언어별 표 앞부분을 읽고 옮겼어요. 논문은 읽지 않아 partial로 표시했어요. r/LocalLLaMA 글(제작진 게시)의 설명도 함께 참고했어요.

### 무엇을 재나

"코딩 에이전트가 표준 벤치마크에 없는 언어의 실제 이슈를 고칠 수 있을까?"라는 질문이에요. Nebius의 Vladimir Dobrovolskii, Ibragim Badertdinov, Alexander Golubev가 만들었고 2026년 11월 공개됐어요.

- **202개 과제, 13개 언어, 129개 저장소**: Clojure, Dart, Elixir, Erlang, F#, Haskell, Julia, Kotlin, Lua, OCaml, R, Scala, Swift
- 각 과제는 GitHub 이슈와 그에 대응하는 PR에서 왔고, 실행 가능한 환경과 테스트가 있어요. 평가 신뢰도를 위해 과제 설명과 테스트를 검토·수정했어요.

### 리더보드 (Pass@1)

모든 모델은 같은 SWE-agent 계열 스캐폴드에서 과제당 세 번 시도했어요.

1. Opus 5.5 high: 81.5
2. GPT 6.1 Sol high: 78.4
3. GPT 5.6 Sol high: 75.7
4. GPT 5.6 Luna xhigh: 71.5
5. Kimi K3 max: 63.7
6. DeepSeek V4 Flash high: 56.1
7. GLM-5.3-Flash max: 48.2
8. Qwen 3.8 27B xhigh: 42.7
9. Qwen 3.6 27B thinking: 16.7

시도당 평균 토큰은 GPT 6.1 Sol이 1.8M으로 가장 적었고, GLM-5.3-Flash가 38.3M으로 가장 많았어요.

### 주의할 점

Qwen 3.8 27B는 어려운 과제를 고르는 데도 쓰였어서 점수가 약간 낮게 치우쳤을 수 있다고 제작진이 밝혀요. 언어별로는 차이가 커서, 예를 들어 Erlang에서는 Opus 5.5와 GPT 6.1 Sol이 100.0이었고 Qwen 3.6 27B는 OCaml에서 5.1이었어요.
