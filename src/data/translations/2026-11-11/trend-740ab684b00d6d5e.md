---
id: trend-740ab684b00d6d5e
title: "I built Lokey, an open-source Android keyboard with on-device AI"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xsn0hz/i_built_lokey_an_opensource_android_keyboard_with
summary: "Lokey는 단어 예측·자동 수정·받아쓰기·번역을 휴대폰 안에서 돌리는 오픈소스(MIT) Android 키보드예요. llama.cpp 포크와 Snapdragon Hexagon NPU를 쓰고, 입력 텍스트와 마이크 음성은 기기 밖으로 나가지 않아요. 아직 초기 베타예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

Reddit API 키가 없고(승인 전이라 넣지 않아요) Wayback 스냅샷도 없어, RSS에 실린 본문을 기준으로 옮기고 partial로 표시했어요. 소스 코드와 데모 영상은 보지 않았어요.

### Lokey

작성자(/u/Nicolodeva)가 만든 **오픈소스 Android 키보드**로, 단어 예측, 자동 수정, 받아쓰기, 번역을 휴대폰에서 직접 돌려요. Enter를 길게 누르면 받아쓰기가 되고, 입력 중인 앱 안으로 바로 번역할 수 있어요.

### 동작 방식

- 텍스트 추론은 **llama.cpp 포크**를 쓰고, 지원하는 Snapdragon 폰에서는 **Hexagon NPU** 백엔드를 활용해요. CPU 스레드 2개로도 돌 수 있어요.
- 테스트한 폰에서 키보드는 계속 반응이 빨랐고, 두 설정 모두 배터리 소모가 특별히 크지 않았다고 해요.
- 추천은 모델의 토큰 로짓을 확률로 바꿔, 지금까지 친 글자와 맞는 완성 단어를 최대 3개까지 순위로 보여 줘요.
- 텍스트 모델 하나가 추천·자동 수정·번역을 맡고, 받아쓰기는 별도 음성 모델이 맡아요.

### 모델

- 텍스트: LFM 2.5 350M(약 230MB) 또는 Qwen 3.5 0.8B(약 533MB)
- 음성: Parakeet v3 0.6B 또는 Qwen3 ASR 0.6B

모델을 안 받아도 타자는 칠 수 있고, 받은 뒤에는 오프라인으로 추론해요. 입력한 텍스트와 마이크 음성은 기기에 머물고, 계정이나 분석 SDK가 없어요.

### 키보드 자체

실제 기계식 스위치 녹음을 키 소리로 쓸 수 있고, 햅틱·레이아웃·색을 바꿀 수 있어요. 스와이프 입력, 적응형 글자, 자동 수정은 선택 사항이에요. 아직 초기 베타이고 OnePlus 15와 POCO F3에서 테스트했어요. 소스 코드는 MIT, 서명된 APK는 Android 9+ ARM64용이에요.
