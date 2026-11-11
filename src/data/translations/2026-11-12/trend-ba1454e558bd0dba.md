---
id: trend-ba1454e558bd0dba
title: "Show HN: Yogurt – Free, private, open-source alternative to Granola"
sourceUrl: https://github.com/FrigadeHQ/yogurt
summary: "Frigade가 만든 Yogurt는 Granola를 대신할 무료·오픈소스(MIT) AI 회의록 앱이에요. 회의에 봇을 넣지 않고 내 마이크와 컴퓨터 소리를 녹음하며, 전사와 요약을 모두 내 컴퓨터에서 돌려 녹음·노트를 올리지 않아요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-12
---

GitHub README는 몇 줄짜리라, README와 공식 사이트(yogurt.so) 소개·FAQ를 함께 끝까지 읽고 옮겼어요.

### 무엇인가

**Yogurt**는 "비공개 AI 회의록, 무료·오픈소스"를 내건 앱이에요. 만든 곳은 Frigade이고 사이트에는 Y Combinator 투자를 받았다고 적혀 있어요. Hacker News에는 Granola의 무료·비공개·오픈소스 대안으로 올라왔어요. 저장소 주제 태그에는 electron, llama-cpp, whisper, mcp, local-ai가 있어요.

### 작동 방식

- **회의에 참여하지 않아요.** 내 마이크와 컴퓨터에서 재생되는 소리를 녹음해서, 다른 참석자는 아무것도 설치할 필요가 없어요. 봇이 들어오지 않으니 녹음 사실은 직접 알리라고 FAQ가 당부해요.
- 통화를 전사하고, 중요한 순간에 직접 메모를 더할 수 있어요.
- 통화가 끝나면 내 메모와 대화가 하나의 노트(할 일·다음 단계 포함)로 합쳐져요.
- 놓친 내용을 물으면 원본 전사를 옆에 둔 채로 회의 내용에서 답을 줘요.

### 로컬 실행

AI가 내 컴퓨터에서 돌아 녹음, 전사, 노트가 업로드되지 않는다고 해요. AI 모델을 한 번 내려받은 뒤에는 전사와 요약이 오프라인에서도 돼요.

### 요구 사항

- macOS 14.4+(Apple Silicon), Windows 10 2004+(x64), Ubuntu 22.04+ 또는 비슷한 리눅스(x64 AppImage)
- 메모리 8GB 이상. 너무 느리면 설치 중에 알려 줘요.
- 캘린더 연동과 통화 화자 이름은 아직 Mac 전용이에요.
- Windows가 "PC를 보호했습니다"를 띄우면 아직 Microsoft 인증서로 서명되지 않은 새 앱이라서이고, 오픈소스라 누구나 동작을 확인할 수 있다고 설명해요.
