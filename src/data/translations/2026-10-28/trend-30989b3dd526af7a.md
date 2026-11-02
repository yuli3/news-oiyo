---
id: trend-30989b3dd526af7a
title: "Roblox가 허락 없이 Open3DLab 등에서 성인 콘텐츠를 포함한 모델 145GB를 다운로드함"
sourceUrl: https://open3dlab.com/news/roblox-downloaded-145-gb-of-models-from-our-sites
summary: "Open3DLab 운영진이 Roblox라고 밝힌 크롤러가 10월 15–16일 Open3DLab·SFMLab·SmutBase에서 712개 프로젝트의 파일 1,027개(145.5GB)를 허락 없이 내려받았다고 공개했어요. 절반가량이 성인 콘텐츠였고, robots.txt와 이용약관, 비상업 라이선스를 무시했대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 무슨 일이 있었나

Open3DLab의 Salaryman이 2026년 10월 26일 쓴 글이에요. 10월 15–16일, **Roblox 소속이라고 밝힌 크롤러**가 Open3DLab, SFMLab, SmutBase의 거의 모든 프로젝트를 훑고 **712개 프로젝트의 파일 1,027개, 145.5GB**를 통째로 내려받았대요. 운영진은 AI 학습 목적으로 추정해요.

- 운영진은 10월 18일(일) 대량 요청을 발견했어요.
- 모든 요청의 User-Agent가 같았어요: `trellis2-data-sourcing/1.0 (3D foundation model research; [redacted]@roblox.com)`
- AWS 주소 하나에서 왔고, 34시간 동안 26,429번 요청으로 **18,926개 프로젝트** 메인 페이지, 사실상 카탈로그 전체를 읽었어요.

### 성인 콘텐츠 포함

- 성인 전용 사이트 SmutBase에서 224개 프로젝트의 파일 364개(54.8GB)를 받았어요.
- 성인 표시된 SFMLab 프로젝트까지 합치면 712개 중 **345개(62.6GB)**가 성인 콘텐츠예요.
- 성인 프로젝트도 다른 프로젝트와 같은 비율로 가져갔대요.

### 무시된 규칙

- robots.txt를 **받아 가고도 따르지 않았어요.**
- 스크래핑을 금지한 이용약관을 무시했어요.
- 712개 중 **423개가 비상업 전용 라이선스**인데 이를 어겼어요.
- 다운로드 양을 제한한 건 크롤러가 쓴 무료 다운로드 서버의 속도·동시 접속 제한뿐이었대요.

### 대응

- 10월 18일 아침 추가 시도를 차단했어요. User-Agent의 주소로 메일을 보내 Roblox에 입장을 물었지만 답이 없대요.
- 크롤러는 19일 다시 왔고 모두 차단됐지만 시도를 줄이지 않았어요. 요청이 중부유럽 업무 시간에 맞춰 움직이고 점심 무렵 한 시간 쉬었다고 해요. 20일 8시에 마지막으로 돌아왔어요.

로그 세부를 담은 상세 글은 나중에 올린대요.

> 원문 앞부분(경위와 대응)을 기준으로 옮겼어요. 커뮤니티에 주는 의미를 다룬 뒷부분은 다 읽지 못했어요.
