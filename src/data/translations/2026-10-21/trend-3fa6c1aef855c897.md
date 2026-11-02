---
id: trend-3fa6c1aef855c897
title: "Show GN: Review Inbox - 리뷰 기다리는 PR을 Claude Code 입력창 위에 띄워 주는 mod"
sourceUrl: "https://github.com/SummerRiversound/review-inbox"
summary: "Review Inbox는 리뷰를 기다리는 PR, 내 PR, 나와 관련된 이슈를 Claude Code 입력창 위 한 줄과 서랍 화면으로 보여 주는 Claude Code 모드예요. PR마다 열기 전에 쉬운 말 요약을 붙여 줘요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

GitHub README 앞부분을 기준으로 옮겼어요. 설치·설정 부분은 다 읽지 않았어요.

### 무엇인가
코딩하는 동안 GitHub 일을 눈앞에 두게 해 주는 **Claude Code 모드(mod)**예요. 리뷰를 기다리는 PR(열기 전에 쉬운 말로 요약), 내 열린 PR과 받은 리뷰, 나를 끌어들이는 이슈를 보여 줘요. 인터페이스와 요약은 9개 언어로 나와요.

### 화면 구성
- **입력창 위 띠**: 나에게 필요한 것만 세는 한 줄이에요. 리뷰 대기 PR, 할 일이 있는 내 PR, 나에게 배정되거나 나를 언급한 이슈를 세요. 색은 가장 오래된 리뷰 요청이 기다린 시간이에요(3일부터 노랑, 14일부터 빨강).
- **서랍**: `/review-inbox`로 열고, To review, My PRs, My issues 세 탭이 있어요.
- **토스트**: 작업 중 새 일이 오면 짧게 알려 줘요.

### 카드 다루기
- 카드마다 **메모**를 한 줄 남길 수 있어요(확인한 것, 약속한 일과 시점).
- **내일까지·다음 주까지 미루기**를 하면 오전 9시나 다음 월요일까지 치워 두되, 새 커밋이나 새 리뷰처럼 소식이 생기면 더 일찍 돌아와요.
- 위쪽 검색창은 모든 탭을 한 번에 찾아요. 저장소, 번호, 제목, 작성자, 설명 앞 2,000자, 요약, 메모까지 검색해요.
- 세션이 작업 중인 카드는 탭 맨 위 "In progress in a session"에 모여요. 세션이 닫히거나 10분 동안 응답이 없으면 카드를 놓아줘요.
- Claude 모바일 앱은 아직 텍스트 입력란을 그리지 않아서, 거기서는 메모는 보이지만 검색과 메모 작성은 안 돼요.
