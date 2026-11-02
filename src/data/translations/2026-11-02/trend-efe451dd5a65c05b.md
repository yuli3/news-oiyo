---
id: trend-efe451dd5a65c05b
title: "An easy way to try local AI with braindead-local-intelligence"
sourceUrl: https://dataswamp.org/~solene/2026-11-01-braindead-local-intelligence.html
summary: "Solène이 podman 컨테이너 몇 개로 LLM, 이미지 생성, SearXNG 웹 검색, Open WebUI를 한 주소 뒤에 묶어 로컬 AI를 쉽게 써 보게 한 braindead-local-intelligence를 소개해요. 요청이 오면 필요한 모델만 올려요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

dataswamp.org의 Solène 블로그 글 전체를 읽고 옮겼어요.

### 왜 만들었나

필자는 로컬 AI를 가끔 실험할 때 웹 검색·이미지 인식이 되는 채팅 LLM과, 이미지를 만들고 고치는 모델을 간단히 써 보고 싶었대요. 대부분의 가이드는 설치할 게 많고 수천 개 파일 중 모델을 골라야 해서 직접 작은 프로젝트를 만들었어요. 이름은 말장난이에요. 별생각 없이(braindead) 켜서 써 보고, 내 컴퓨터에서 "지능"을 돌린다는 뜻이에요.

### 무엇을 하나

podman으로 컨테이너 몇 개를 띄워요.

- OpenAI API 호환 LLM 서버
- 이미지 생성 서버
- 웹 검색용 SearXNG
- 웹 UI인 Open WebUI

모두 **주소 하나 뒤에** 있고, 외부 서비스에 열어야 하면 토큰으로 보호해요. 필자가 좋아하는 기능은 LLM과 이미지 모델 중 하나를 고르거나 전환할 필요가 없다는 점이에요. **메모리에는 모델 하나만** 올라가고, 요청이 오면 맞는 모델을 올렸다가 몇 분 동안 요청이 없으면 내려 GPU 메모리를 비워요. 문서에는 가정용 하드웨어에 맞춰 고른 모델 목록(작은 텍스트 모델, 이미지 이해 모델, 이미지 생성 모델, 이미지 편집 모델 2개)이 있고, 설정 블록을 복사해 재시작하면 모델을 바꿀 수 있어요.

### 요구 사항과 시작

- podman 5.0 이상 rootless 모드의 Linux. 현재 **AMD 그래픽카드** 대상이고 NVIDIA는 시험하지 않았대요.
- VRAM 12GB까지 시험했고, 가장 작은 모델은 VRAM 4GB와 RAM 8GB쯤 필요해요. 필자는 2021년에 맞춘 32GB RAM, Radeon RX 6700 XT 컴퓨터를 써요.

```
sudo usermod -aG render,video $USER
bin/ia install
ia doctor
ia start
ia info
```

기본 모델은 약 8GB이고 `~/.local/share/ia-locale/models`에 받아요.

### 써 본 소감

Open WebUI(http://127.0.0.1:3000)에서 채팅, 사진 보내기, 웹 검색·이미지 생성을 켤 수 있어요. 필자는 **Qwen3.6 35B-A3B + 웹 검색** 조합이 꽤 좋았대요. 다만 생각하는 시간이 있고 모델 절반이 RAM에서 돌아 답에 몇 분이 걸릴 수 있어요. 친구들 Mattermost 봇 Camille에도 붙여 쓰고 있어요.

결론은 "기적을 기대하지 말라"예요. 느리고 컴퓨터가 뜨겁고 시끄러워지며, 수만 달러를 써도 클라우드 LLM에는 못 미친대요. 그래도 웹 검색 말고는 아무것도 컴퓨터 밖으로 나가지 않고, 작은 모델도 CI에서 예/아니오 판단이나 로컬 스팸 거르기에는 쓸 수 있다고 해요.
