---
id: trend-0c9159f62efd209b
title: "I made an open-source AI leaderboard that shows the best models your machine can run"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x3wp8c/i_made_an_opensource_ai_leaderboard_that_shows"
summary: "RAM과 GPU를 입력하면 내 컴퓨터에서 돌릴 수 있는 최고 로컬 모델과 실행 명령을 보여 주는 오픈소스 리더보드 whatmodel.sh가 공개됐어요. 1만 9,731개 공개 벤치마크 결과를 하나의 점수로 맞춰 API 모델과도 비교해요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요.

r/LocalLLaMA에 올라온 자작 도구 소개 글이에요. 작성자가 만든 **whatmodel.sh**는 이렇게 써요.

1. 내 RAM과 GPU를 입력해요.
2. 로컬에서 돌릴 수 있는 모델을 순위와 실행 명령과 함께 보여 줘요.
3. 같은 점수 체계로 API 모델과 비교할 수 있어요.

### 만들면서 깨달은 점
작성자는 이걸 만들면서 **32GB Mac**으로 이제 GPT-5와 대등한 점수의 모델을 완전히 로컬에서 무료로 돌릴 수 있다는 걸 알게 됐대요. 예로 4비트 **Qwen3.8 27B**를 들었어요.

### 점수 산정
모델마다 **1만 9,731개**의 공개 벤치마크 결과에 맞춰 하나의 점수를 매기고, 모든 결과는 출처로 링크돼요. 방법론은 whatmodel.sh/method에 있고, 데이터·점수 계산 코드·벤치 스크립트는 GitHub(jakemanger/whatmodel)에 오픈소스로 공개돼 있어요.

### 기타
- 터미널에서도 `curl whatmodel.sh`로 쓸 수 있어요.
- 기여하고 싶다면 실제 tok/s를 모으는 벤치 스크립트를 돌리거나, 새 모델과 벤치마크 점수를 출처와 함께 GitHub로 제출하면 돼요.
