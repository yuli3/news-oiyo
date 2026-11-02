---
id: trend-3e252c8ebb53d6ca
title: "Made a rhythm game where 4 small neural nets listen to your song right in the browser tab (open source)"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xeia9o/made_a_rhythm_game_where_4_small_neural_nets
summary: "브라우저 탭 안에서 작은 신경망 4개가 내 MP3를 분석해 레벨을 만드는 오픈소스 리듬 러너 게임 Struna가 공개됐어요. 박자·음표·보컬 분리·음높이 모델이 합쳐 약 22MB이고, 업로드 없이 기기에서 돌아가요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-25
---

> Reddit이 자동 수집을 막아 RSS 피드에 실린 본문을 기준으로 옮겼어요. 글에 붙은 영상은 보지 못했어요.

### 어떤 게임인가요

작성자 u/MrFelliks가 만든 **브라우저 리듬 러너**예요. 노래가 내가 달리는 세계를 만들어요. 자기 MP3를 넣을 수 있고, '듣는' 과정은 전부 **기기 안, 브라우저 탭 안에서** 일어나서 아무것도 업로드되지 않아요. LLM 글은 아니지만 전부 로컬 추론이라 올렸대요.

### 모델 4개

모두 **onnxruntime-web**(wasm)으로, 각자 웹 워커에서 돌아가요.

- **BeatNet**(박자·마디 추적, 약 1.6MB): 모든 박자와 마디 시작을 찾아요. 장애물, 점프, 킥이 다 이 박자 위에 놓이고, 드롭은 마디 선에 떨어져요.
- **Spotify의 Basic Pitch**(음표 전사, 약 0.2MB): 어떤 음이 나오는지 알아내요. 길게 끄는 음은 막대나 매달리는 줄이 되고, 솔로는 음높이에 맞춘 고리 줄이 돼요.
- **Spleeter 보컬 망**(음원 분리, 약 20MB): 목소리를 따로 뽑아 다음 모델이 헷갈리지 않게 해요.
- **SwiftF0**(음높이 추적, 약 0.1MB): 16ms마다 목소리 높이와 음절 시작을 잡아요. 노래 구간에서는 가수 음절을 따라 고리를 날아 지나가요.

네 개를 합쳐 약 **22MB**이고 첫 로딩 뒤 캐시돼요. 기기가 제때 못 돌리면 일반 DSP로 대체돼도 게임은 돌아가요. 그 위에 마디별 음량, 드롭 위치 같은 일반 DSP로 세계와 날씨를 고르고, 같은 노래는 항상 같은 세계를 만들어 외울 수 있어요.

### 공개와 질문

게임 봇 코드는 MIT로 GitHub(Felliks/Struna)에 있고, struna.ai 에서 휴대폰으로도 할 수 있대요. 영어가 모국어가 아니라 글 다듬기에 AI를 썼고, 코드도 상당 부분 Claude Code 도움을 받았다고 밝혔어요. 빠른 노래를 절반 템포로 읽는 문제가 있다며 다른 사람들은 박자 추적에 무엇을 쓰는지 물었어요.
