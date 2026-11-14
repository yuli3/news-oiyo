---
id: trend-e2da9d4c153768ce
title: "Ai Rig finally done and stable, perfect winter heater"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xwc3m7/ai_rig_finally_done_and_stable_perfect_winter
summary: "r/LocalLLaMA 사용자가 RTX 3090 8장으로 만든 로컬 AI 장비를 공개했어요. GPU당 270W 제한, P2P 드라이버로 실측 22GB/s를 냈고, Qwen Flash Next 양자화 모델로 단일 에이전트 초당 약 60토큰, 10개 병렬 합계 370토큰을 기록했어요. 유휴 전력은 300W예요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

자동 수집 경로(Reddit API 키 없음, Wayback 스냅샷 없음)가 막혀, 데스크톱 브라우저(로그인 없이)로 Reddit 글을 직접 열어 본문을 옮겼어요. 사진 글에 붙은 짧은 설명이에요.

### 구성

- **RTX 3090 8장**. 작성자는 모델이 섞이는 게 싫어서 모두 Gigabyte Gaming OC로 맞췄다고 해요. 2026년 초 가격이 치솟기 전에 장당 평균 600~700파운드쯤에 샀어요.
- 메인보드는 **ROMED8-2T**. 오른쪽 두 장이 슬롯 하나를 나눠 x8씩 쓰는 것 말고는 모두 PCIe 4.0 x16으로 돌아요.
- GPU 아래 공간이 없어 CPU는 수랭으로 하고 라디에이터를 위에 올렸어요.
- 알리익스프레스의 저렴한 PCIe 4.0 라이저를 썼고, 가장 긴 건 60cm와 40cm예요.
- 파워는 **AX1600i와 HX1500i** 두 개예요. 하나가 GPU 5장, 다른 하나가 메인보드와 GPU 3장을 맡아요(GPU마다 메인보드로도 약 50W를 끌어 써요).

### 설정과 성능

- GPU 전력 제한은 **270W**예요.
- GPU 간 P2P를 켜는 수정 NVIDIA 드라이버로 실측 **22GB/s**(x8 두 장 제외)를 냈어요.
- vLLM과 opencode로 Qwen Flash Next 양자화 모델을 돌려 보니 **단일 에이전트 초당 약 60토큰**, **10개 병렬 합계 최대 초당 370토큰**이었어요.

### 소감

작성자는 요즘 시장 제품(192GB짜리 Gorgon Halo 등)을 볼수록 집에 괴물을 만들었다는 걸 느낀다고 해요. 물론 **유휴 전력이 300W**나 될 만큼 전기를 많이 먹지만, 메모리 대역폭이 좋고 작은 모델을 파인튜닝할 때 힘을 낼 거라고 해요. 제목처럼 겨울 난방기로도 딱이라는 농담이에요.
