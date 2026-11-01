---
id: trend-862cdb94abae0fb1
title: "Show HN: HackerBooks – HackerTube, but for books mentioned on HN"
sourceUrl: https://hackerbooks.org/
summary: "HN 댓글에서 서로 다른 두 사람 이상이 언급한 책 약 1만6,500권을 모아 각 책이 언급된 댓글로 연결해 주는 사이트예요. 작성자는 데이터 파이프라인과 사이트를 거의 다 Claude(Opus 5.5)가 만들었다고 밝혔어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

사이트 본문은 자바스크립트로 그려져 자동 읽기에서 단축키 안내 정도만 보였어요. 그래서 작성자가 Hacker News에 올린 Show HN 소개글을 기준으로 옮겼어요.

### 무엇을 만들었나

작성자는 Karpathy의 HackerTube를 보고 **책 버전**도 갖고 싶어서 만들었다고 해요. Hacker Books는 2007년부터 지금까지 **서로 다른 HN 댓글 작성자 최소 두 명이 언급한 책 약 1만6,500권**을 모은 책장이에요. 각 책은 그 책을 언급한 댓글로 다시 연결돼요. 데이터는 about 페이지에서 내려받을 수 있대요.

사이트에는 전체 순위(Top all-time), 가장 많이 추천된 책(Most recommended), 떠오르는 책(Rising), For You 같은 메뉴와 `j`/`k`로 책을 넘기는 키보드 단축키가 있어요.

### Claude가 거의 다 만들었다는 점

> 분명히 하자면 데이터 파이프라인과 사이트를 포함해 거의 전부를 Claude가 썼어요. 저는 주로 방향을 잡고 결정을 내리고, 도메인을 샀어요.

### 한계

언급 횟수를 세는 방식이라 완벽하지 않대요. 책을 칭찬한 댓글과 혹평한 댓글이 똑같이 한 번으로 세져요. 좋아하는 책이 빠졌거나 엉뚱한 책과 연결됐으면 알려 달라고 했어요. HN에서는 661점을 받았어요.
