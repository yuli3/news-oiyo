---
id: trend-b71cc8b2d44c8cde
title: "I added local TTS and STT to apple-llm using what's already on your Mac. 30 minutes of narration renders in under 20 seconds on an M4 Air"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xoowb4/i_added_local_tts_and_stt_to_applellm_using_whats
summary: "macOS 내장 LLM을 API 키 없이 부르는 apple-llm 0.3이 시스템 음성(TTS)과 음성 인식(STT)을 더했어요. M4 MacBook Air에서 30분 분량 낭독을 18–20초에 만들고, 오디오는 기기 밖으로 나가지 않아요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

Reddit 자동 수집이 막혀 RSS로 받은 게시글 전문을 기준으로 옮겼어요. 영상은 보지 못했어요.

### 소개
작성자는 예전에 **apple-llm**을 소개한 적이 있어요. macOS에 들어 있는 Apple LLM을 API 키 없이 부르는 Node·Python 패키지예요. 0.3 버전은 Mac에 이미 있는 나머지 기능, 즉 시스템 음성과 Apple 음성 인식을 더했어요. 가입할 것도 없고 오디오는 기기에만 머물러요. 영상 속 내레이터와 데모 음성은 모두 이 패키지로 Mac에서 만들었고 아무도 녹음하지 않았대요.

### 사용법
```
npm install -g apple-llm   # 또는 pip install apple-llm
apple-llm speak "Hello there" --voice Samantha
apple-llm speak --file book.txt -o book.m4a
apple-llm transcribe meeting.mp4 -o meeting.srt
apple-llm listen
```
Python 코드에서는 `speak()`, `transcribe()`로 불러요. npm 패키지의 로컬 서버는 `/v1/audio/speech`, `/v1/audio/transcriptions`에도 응답해서 base URL만 바꾸면 OpenAI 클라이언트를 그대로 쓸 수 있어요. 마이크→텍스트→온디바이스 모델→음성 응답으로 이어지는 약 20줄짜리 음성 비서 예제도 있고, 설정·API·문제 해결을 담은 `llms.txt`를 코딩 에이전트에 넘겨 연동을 맡길 수도 있어요.

### 측정값(M4 MacBook Air, macOS 27.2)
- 30분 낭독 파일 생성: 18–20초, 11.3MB M4A, 메모리 약 50MB
- 60분: 40초, 22.5MB
- 30분 전사: 약 28초, 요청하면 단어마다 타임스탬프
- 작성자 Mac 기준 음성 184개, 인식 언어 68개(처음 쓸 때 내려받음)

### 못 하는 것
- Siri 음성은 이름으로 고를 수 없어요(Apple이 막아 둠).
- 기본 음성은 품질이 낮고, 더 좋은 음성은 시스템 설정에서 무료로 받아야 해요.
- 오디오에서 언어를 자동 감지하지 않아요.
- MP3·Opus 출력, WebM·Ogg·MKV 입력은 안 돼요.
- 깨끗한 합성 음성에서 단어 오류율 3–4%라 실제 녹음은 더 나쁠 수 있어요.

Apple Silicon의 macOS 26 이상과 Xcode Command Line Tools가 필요하고 MIT 라이선스예요. 작성자는 macOS 27.2에서만 돌려 봤고, 마이크는 사람 목소리 대신 스피커 재생음으로만 시험했다며 macOS 26이나 시끄러운 환경에서 써 본 결과를 알려 달라고 했어요.
