---
id: trend-48d638fd98ef70d4
title: "SenseNova 6.8 Code2Video: an open-sourced model that writes and revises code to make videos"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xgvcnu/sensenova_68_code2video_an_opensourced_model_that
summary: "SenseNova 6.8 Code2Video는 코드를 써서 영상을 만들고 자연어 요청으로 고치는 오픈소스 모델이에요. 모션 그래픽처럼 코드로 표현되는 영상에 집중하고, 참고 영상의 시각 처리를 편집 가능한 코드로 재구성하며, 창작 Skill과 함께 가중치를 공개할 계획이래요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> Reddit이 자동 수집을 막아 RSS에 실린 본문을 기준으로 옮겼어요.

### 무엇인가

u/Negative-Whereas3307이 소개한 **SenseNova 6.8 Code2Video**는 코드를 써서 영상을 만드는 모델이에요. Claude Opus 5.5로 하는 애니메이션 워크플로처럼, 모델이 코드를 쓰고 렌더링 도구가 영상으로 바꾸고, 추가 지시로 결과를 고치는 방식을 따라요. 차이는 **영상 제작에 특화한 모델과 창작 Skill**을 함께 낸다는 점이에요.

### 주요 특징

- 코드로 영상을 생성해요. **모션 그래픽**처럼 프로그램으로 표현할 수 있는 시각물에 집중해요.
- 스타일, 타이밍, 장면 요소 변경 같은 **자연어 요청으로 기존 결과를 수정**해요.
- **참고 영상의 시각 처리를 편집 가능한 코드로 재구성**할 수 있어요.
- 기획안 작성, 미리보기, 수정을 안내하는 **창작 Skill**과 짝을 이뤄요.
- 전체 모델 가중치와 Skill을 공개할 계획이고, INT4·INT8 가중치는 나중에 나와요.

### 작성자의 질문

범용 코딩 모델도 이미 애니메이션을 쓸 수 있어요. 그래서 궁금한 건 전용 Code2Video 모델이 무엇을 개선하느냐래요. 수리 시도가 줄어드는지, 움직임이 좋아지는지, 관련 없는 요소를 건드리지 않고 더 믿을 만하게 고치는지요.

GitHub(OpenSenseNova/SenseNova-6.8-Code2Video)와 Hugging Face(sensenova/SenseNova-6.8-Code2Video) 링크가 있어요.
