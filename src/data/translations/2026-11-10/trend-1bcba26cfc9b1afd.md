---
id: trend-1bcba26cfc9b1afd
title: "ChatGPT Desktop이 사용자의 SSH 에이전트를 원격 머신으로 전달함"
sourceUrl: https://news.ycombinator.com/item?id=50422628
summary: "Hacker News에 ChatGPT Desktop이 사용자의 SSH 에이전트를 원격 머신으로 전달한다는 글이 올라왔어요. 원격에서 도는 에이전트가 내 로컬 SSH 자격 증명으로 인증해 GitHub 비공개 저장소에 푸시할 수도 있다는 지적이고, 근거로 Codex PR #28131의 댓글을 들었어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

원문은 Hacker News의 짧은 텍스트 글이에요. 수집 머신에서는 HN이 막혀(419) HN 공식 Algolia API로 글과 상위 댓글을 읽었어요. 글이 근거로 든 GitHub PR 댓글 자체는 열어 보지 않아 `partial`이에요.

### 원글 내용

> 원격 머신에서 실행되는 에이전트가 사용자의 로컬 SSH 자격 증명으로 인증할 수 있어요. 예를 들어 GitHub의 비공개 저장소에 푸시할 수 있다는 뜻이에요.

작성자는 근거로 OpenAI `openai/codex` 저장소 PR #28131의 특정 리뷰 댓글(`discussion_r3410013180`)을 링크했어요. 글은 197점을 받았어요.

### 상위 댓글 반응

- macOS Secure Enclave 안의 SSH 키를 쓰고, 새 세션마다 지문 인증을 요구하게 하라는 제안이 있었어요. 그러면 에이전트가 스스로 연결을 시작할 수 없고 새 SSH 연결을 항상 알 수 있다는 이유예요.
- "마찰을 없애기" 위한 제품 결정이 자주 이렇게 흘러가는데, 보안에서는 마찰이 오히려 좋다는 의견이 있었어요.
- 로컬 에이전트 보안 가드레일이 대부분 블랙리스트 방식이라 늘 새고, 제대로 된 샌드박스는 사용자 몫으로 남는다는 지적도 있었어요.
- Docker Desktop이나 devpod도 비슷하게 SSH 에이전트를 넘기던 적이 있다는 경험담이 나왔어요.

OpenAI의 공식 입장은 이 글과 댓글에서 확인되지 않았어요.
