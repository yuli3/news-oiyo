---
id: trend-e16a2ec77eaa01fc
title: "MiniMax H3-Image Released, an Open-Weight Image Model built on H3"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xso1ie/minimax_h3image_released_an_openweight_image
summary: "MiniMax가 H3 계열의 오픈 웨이트 이미지 생성·편집 모델 MiniMax-H3-Image를 공개했다는 r/LocalLLaMA 글이에요. 업스케일러 없이 약 16메가픽셀 이미지를 만들고, 6스텝으로 증류됐으며 생성과 편집을 한 체크포인트에서 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

r/LocalLLaMA 글은 RSS에 작성자 표시("submitted by /u/MagicZhang")만 있고, Reddit API 키가 없고 Wayback 스냅샷도 비어 있어 본문을 읽지 못했어요. 그래서 같은 모델의 Hugging Face 모델 카드(오늘 함께 실린 항목의 원문) 앞부분을 기준으로 옮기고 partial로 표시했어요.

### MiniMax-H3-Image

MiniMax H3 계열의 오픈소스 이미지 **생성·편집** 모델이에요. 창작 의도를 이해하고 지시를 정확히 따라, 하나의 콘셉트를 구체적인 캐릭터·장면·분위기로 발전시킨다고 소개해요. 생성과 편집이 한 체크포인트에 합쳐져 있어 텍스트로 이미지를 만들고(text-to-image), 참조 이미지 하나 이상을 편집할 수도 있어요.

### 스펙

- 모든 화면비에서 약 **16메가픽셀**을 업스케일러 없이 바로 만들어요. 4096x4096(1:1)부터 6272x2688(21:9)까지예요.
- **6 샘플링 스텝**(6 NFE)으로 증류됐고 classifier-free guidance를 쓰지 않아요.
- 확산 트랜스포머(DiT)는 오디오 레이어를 뺀 H3 구조이고, 텍스트 인코더는 MiniMax-H3 것을 그대로 써요.

### 강조점

모델 카드는 속도, 화질, 지시 따르기를 세 가지 강점으로 꼽아요. 흔한 1–4MP보다 디테일이 훨씬 많은 16MP 이미지를 감당할 만한 연산 비용으로 만든다고 하고, 익숙한 "AI 느낌"을 넘는 사실감과 오픈소스 모델 중 가장 강한 지시 따르기를 주장해요. API(platform.minimax.io)와 웹앱(hailuoai.video), 데스크톱 에이전트로도 쓸 수 있어요.
