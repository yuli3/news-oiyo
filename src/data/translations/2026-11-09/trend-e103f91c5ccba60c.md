---
id: trend-e103f91c5ccba60c
title: "Huggingface - WOW.. 2 ZeroGPU Spaces for all free accounts?"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xqvhua/huggingface_wow_2_zerogpu_spaces_for_all_free
summary: "r/LocalLLaMA 사용자가 Hugging Face 무료 계정도 ZeroGPU Space 2개를 쓸 수 있다는 걸 발견했다고 공유해요. Gradio 전용이고 하루 약 5분 GPU 할당이며, 조직 계정에는 안 된다고 해요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

Reddit이 자동 경로로 열리지 않아 RSS 피드 본문을 기준으로 옮겼어요. 내용은 작성자 개인 경험이에요.

### 발견 과정
작성자는 오래된 스크립트 하나가 막혀 Hugging Face에 로그인했더니 Space가 "콘텐츠 정책" 메시지와 함께 일시 정지돼 있었다고 해요. 새 Space를 만들려 보니 Docker는 유료였고, 기존 Space는 돌아가지만 새로 만드는 건 막힌 듯했어요. 그런데 생성 페이지를 자세히 보니 Gradio를 고를 수 있고 ZeroGPU가 "Free"로 표시돼 있었어요. 지난달 PRO를 해지했는데도요. HF 문서를 찾아보니 이메일 인증을 마치고 30일 넘은 정상 무료 개인 계정은 ZeroGPU Space를 최대 2개까지 무료로 호스팅할 수 있다고 해요.

### 정리한 조건
- ZeroGPU는 Gradio 전용이에요. Docker, Streamlit, 자체 서버는 안 돼요.
- 할당량은 하루 약 5분 GPU예요(옛 페이지는 3.5분, 지금 문서는 5분). 처음 사용 후 24시간이 지나면 초기화돼요.
- GPU는 RTX Pro 6000 Blackwell이라 테스트와 작은 데모에는 5분이면 괜찮다고 해요.
- 조직(org)은 안 되고 Team/Enterprise 플랜이 필요해요.
- 모든 무료 계정에 보이는 건 아니어서, 정상 계정인데도 "Paid"로 뜬다는 포럼 글이 있어 단계적 배포일 수 있다고 해요.
- 새 Space에서 CPU Basic은 사라진 듯하고 Static만 무료·무제한이에요.
작성자는 Nvidia가 Hugging Face를 인수한다고 발표했다는 소식도 언급하지만, 이번 변경과 관련 있다는 근거는 찾지 못했고 CPU 변경은 발표 전에 있었다고 해요. 지금은 ZeroGPU로 SDXL 이미지를 만드는 작은 릴스 메이커를 만들고 있대요.
