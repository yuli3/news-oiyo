---
id: trend-6adc0406864bd0de
title: "Show GN: knock - 클로드 코드로 일하는 척하면서 친구랑 점심 메뉴 정하기"
sourceUrl: https://github.com/Henry-Hong/knock
summary: knock은 Claude Code를 떠나지 않고 친구와 채팅하게 해 주는 플러그인이에요. 내가 입력한 말은 친구에게 가고, 친구 답은 Claude 답변 자리에 떠요. 모델을 부르지 않아 토큰을 쓰지 않아요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

저장소 README 앞부분(소개, 빠른 시작, 명령 목록 일부)을 읽고 옮겼어요. 서버 구조와 개인정보 관련 뒷부분은 다 읽지 못했어요.

### 어떤 플러그인인가요

**knock**은 Claude Code 안에서 친구와 대화하는 플러그인이에요. 내가 친 글은 친구에게 가고, 친구의 답은 평소 Claude 답이 나오는 자리(⏺)에 표시돼요. README 예시에선 alice가 12:01에 "lunch?"를 보내고 bob이 12:03에 "ramen, lobby in 5"라고 답하는 장면을 보여 줘요. **모델 호출이 없어서 토큰도 쓰지 않아요.**

### 빠른 시작

1. Claude Code에서 `/plugin install knock --marketplace Henry-Hong/knock`로 설치하고, 마켓플레이스 추가 질문에 y로 답해요.
2. `/knock`을 치면 메뉴가 열리고 이름 고르기를 안내해요.
3. "Knock on a friend"를 골라 친구 이름을 입력해요. 친구도 나에게 노크하면 연결돼요.

### 명령

외워야 할 명령은 `/knock` 하나예요. 혼자 치면 메뉴, 뒤에 단어를 붙이면 바로 실행해요.

- `/knock <이름>`: 친구에게 노크해요. 서로 노크해야 연결돼요.
- `/knock random [코드]`: 무작위로 사람을 만나요. 코드를 주면 같은 코드를 쓴 사람끼리만 만나요. `/knock next`는 다음 상대를 찾아요.
- `/knock room [방]`: 최대 8명 그룹 방에 들어가요.
- `/knock block [이름]`: 대화 상대나 특정 이름을 차단해요.
- `/knock me`: 이름 색, 이름, 언어 설정이에요.
- `/knock pic paste`: macOS에서 복사한 그림을 보내요. PNG 파일도 보낼 수 있어요.
