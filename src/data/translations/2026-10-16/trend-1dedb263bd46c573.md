---
id: trend-1dedb263bd46c573
title: "I turned a transformer into a game console that runs Pong, Tetris, Space Invaders and 116 more games."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x6uaav/i_turned_a_transformer_into_a_game_console_that"
summary: "CHIP-8 게임기를 디코더 전용 트랜스포머로 바꿔, 다음 토큰 예측으로 명령 실행·메모리 갱신·화면 렌더링을 하게 만든 프로젝트예요. 가중치는 학습이 아니라 회로에서 컴파일했고, ROM만 바꾸면 Pong·Tetris 등 119개 게임이 돌아요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Reddit이 원문 페이지에 403을 돌려줘 **RSS 본문**을 기준으로 옮겼어요. 데모 페이지와 GitHub 코드는 읽지 않아 `partial`로 표시해요.

### 무엇을 만들었나
작성자는 CHIP-8 게임기를 디코더 전용 트랜스포머로 바꿨어요. **트랜스포머 자체가 게임 엔진**이에요.

- 명령을 실행하고, 기계 메모리를 갱신하고, 모든 프레임을 다음 토큰 예측으로 그려요.
- 생성되는 토큰 하나하나가 메모리 쓰기예요.
- 키 입력은 모델의 컨텍스트 창으로 바로 들어가요.
- 별도 에뮬레이터는 없어요.

Pong, Tetris, Space Invaders를 비롯한 CHIP-8 게임이 같은 모델에서 돌아가고, 프롬프트 안의 ROM만 바꾸면 게임이 바뀌어요. 제목에 따르면 3개 외에 116개 게임이 더 돌아요.

### 어떻게 동작하나
- 가중치는 학습으로 얻은 게 아니라 **회로에서 컴파일**했어요.
- 어텐션이 메모리 읽기를 맡아요. 특정 주소에 가장 최근에 쓴 값을 찾아내는 방식이에요.
- ReLU 회로가 opcode 해석, 산술, 비교, 비트 연산을 처리해요.
- 게임마다 다른 호환성 특이점도 초기 프롬프트에 인코딩해서, 게임마다 다른 가중치가 필요 없어요.

### 규모
18층, 어텐션 헤드 42개, 파라미터 3,200만 개(그중 0이 아닌 값은 13만 9천 개)예요. fp64를 쓰고 Hugging Face transformers로 불러올 수 있어요. 가중치는 Hugging Face, 체험 페이지와 코드·데스크톱 앱은 각각 작성자 사이트와 GitHub에 공개돼 있어요.
