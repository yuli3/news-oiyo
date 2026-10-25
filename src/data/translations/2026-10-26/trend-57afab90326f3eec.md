---
id: trend-57afab90326f3eec
title: "Nanbeige releases Nanbeige4.3-33B, an Apache 2.0 teacher model for smaller agents [N]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xf6x35/nanbeige_releases_nanbeige4333b_an_apache_20
summary: "r/MachineLearning 글이 Nanbeige4.3-33B 공개를 전하며, Terminal-Bench 2.1에서 Qwen3.8-27B를 앞섰지만 SWE-Bench Pro에선 졌다고 짚었어요. 모두 공개 팀의 자체 평가이고 preserve_thinking 설정을 고정해 비교해야 한다고 했어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> Reddit이 자동 수집을 막아 RSS 피드에 실린 본문을 기준으로 옮겼어요. 댓글은 읽지 못했어요. 모델 카드 자체는 같은 날 실린 Hugging Face 항목에 옮겨 두었어요.

### 무엇이 나왔나

작성자 u/jatingargiitk의 정리예요.

- Nanbeige가 **Nanbeige4.3-33B**를 공개했어요. 앞으로 나올 **3B 모델**을 포함한 작은 에이전트들의 **교사 모델**이에요.
- 가중치는 **Apache 2.0**이고, 모델 카드에 **512K 컨텍스트**가 적혀 있어요.

### 벤치마크를 어떻게 읽을까

- 팀은 **Terminal-Bench 2.1에서 80.9점**, Qwen3.8-27B는 73.0점이라고 보고했어요. 벤치마크마다 같은 하네스와 추론 설정을 썼대요.
- 하지만 **모든 곳에서 이기진 않아요.** SWE-Bench Pro는 **60.3 대 61.7**로 Qwen3.8-27B가 앞서요.
- 이 수치는 **공개 팀의 평가**이고, 독립적으로 재현된 결과가 아니에요.

### 재현할 때 알아 둘 점

- 에이전트 평가는 `preserve_thinking=true`로 **이전 추론을 유지한 채** 진행됐어요.
- 모델 카드는 여러 턴 도구 사용에는 이 설정을 권하지만 일반 채팅에는 권하지 않아요.
- 그래서 작성자는 헤드라인 점수를 배포 순위처럼 보기보다, **이 설정을 고정한 채 과제 성공률과 총 생성 토큰 수를 함께 비교**하는 게 더 쓸모 있다고 제안해요.

출처로 Hugging Face 모델 페이지를 달았어요.
