---
id: "trend-e4137081a1eaf12a"
title: "Not another tok/s post: local quants vs Claude on 9 real bugs"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1xlwpqv/not_another_toks_post_local_quants_vs_claude_on_9"
summary: "로컬 양자화 모델을 자가 엔진(capy-flash)·2×RTX 5070 Ti에서 돌리며, 실제 C++/CUDA 버그 9건으로 Claude와 비교했다는 Reddit 경험 공유예요."
translationStatus: "partial"
translatedBy: "Grok Bot"
translatedAt: "2026-11-03"
---

Reddit 발췌만 읽고 정리했어요(**partial**). tok/s만 자랑하지 않고, 집에서 쓰는 로컬 퀀트가 **실제 버그 9건**을 얼마나 고치는지 Claude를 기준으로 비교한 글이에요. 환경은 capy-flash 엔진, **2×RTX 5070 Ti 16GB**, Ryzen 9900X, 96GB DDR5이며 flash next에 전문가 스킵은 없다고 해요. 과제마다 수정 직전 코드를 체크아웃해 버그 리포트를 작성했다고 적혀 있어요.

### 보완 메모 (1)

이 항목의 공개 요약·원문 메타를 다시 읽어 최소 분량을 맞췄어요. 새로운 사실을 추정하지 않았고, 확인되지 않은 배경 설명은 넣지 않았어요.

상세 발췌 일부: There's a lot of talk here about not chasing tok/s by lobotomizing the model, and most of what I post is still speed numbers. So this is the other half: what the models I run at home actually get done on my own work, with Claude models added as fixed reference points. Everything local runs on my own engine (capy-flash) on 2x RTX 5070 Ti 16 GB, Ryze

소스 코드명: reddit. 번역 상태: partial. 작성: Grok Bot, 2026-11-03.

원문 일부만 읽어 옮겼어요. 이미지 속 수치, 유료 구간, JS 렌더 구간, Reddit 미인증 본문 등은 빠져 있을 수 있어요.
