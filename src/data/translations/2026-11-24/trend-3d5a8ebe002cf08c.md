---
id: trend-3d5a8ebe002cf08c
title: "A Beginner's Guide to Local AI with Inkling, Qwen, and Unsloth"
sourceUrl: https://www.gpupartner.com/blog/beginners-guide-local-ai-inkling-qwen-unsloth
summary: "Windows PC에서 무료 앱 Unsloth Desktop과 Qwen3.8-27B 4비트 모델로 집 네트워크용 개인 AI를 만드는 과정을 초보자 눈높이로 정리한 글이에요. VRAM별 모델 고르기와 LAN 공유 설정까지 다뤄요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-24
---

### 글의 배경
- 저자는 클라우드 LLM의 비용, 사용량 제한, 개인정보 우려 때문에 집에서 직접 돌리는 로컬 AI를 시도했어요.
- 목표는 Claude나 ChatGPT를 대신할 개인 AI를 집 네트워크에서 쓰는 것이에요.
- 터미널이나 Python 환경 없이 Windows에서 따라 할 수 있게 구성했어요.

### 준비물
- VRAM이 충분한 GPU가 달린 Windows PC예요. 저자는 32GB VRAM의 RTX 5090을 썼어요.
- 무료 앱 Unsloth Desktop
- GPU VRAM에 맞는 양자화 모델

### 모델 고르기
- VRAM 8~12GB면 9B~12B 모델이, 32GB면 27B~35B 모델이 여유 있게 돌아간다고 설명해요.
- 원본 Qwen 모델은 약 56GB라 소비자용 GPU에는 맞지 않아서 양자화가 필요해요.
- 저자는 더 큰 컨텍스트를 확보하려고 Qwen3.8-27B의 4비트 UD-Q4_K_XL(약 18GB)을 골랐어요.
- MoE 모델은 일부 메모리를 시스템 RAM에 둬서 작은 카드에서도 돌릴 수 있어요. 계산기에 따르면 RTX 5060 Ti 16GB에서 Qwen3.6-35B가 약 47 tokens/s예요.
- Inkling 2 Mini는 Thinking Machines Lab이 2026년 11월 17일 공개한 모델로, 26.4B 파라미터, Apache 2.0, 비전 지원, 1M 토큰 컨텍스트를 갖췄어요. 권장 4비트 파일은 17.6GB예요.
- Inkling 2 Small(594B)은 가장 작은 파일도 171.7GB라 RTX 5090에서 돌릴 수 없어요.

### 설치와 실행 순서
- Unsloth Desktop을 설치하고 실행해요.
- 상단 드롭다운에서 모델을 고르고 다운로드해요.
- 톱니바퀴 아이콘에서 컨텍스트 크기를 정해요. 저자는 128K로 설정했어요.
- 여기서 바로 채팅을 시작할 수 있어요.

### 집 네트워크 공유
- 설정의 Remote & LAN 탭에서 먼저 Remote password를 정해요.
- LAN access의 Start를 누르면 같은 네트워크의 기기가 브라우저로 접속할 주소가 나와요. 로그인 계정은 unsloth예요.
- 접속하려면 PC가 켜져 있고 Unsloth가 실행 중이어야 해요.
- 인터넷 외부 접속은 이 설정만으로는 안 돼요. 저자는 다음 편에서 터널링과 로컬 에이전트를 다루겠다고 예고했어요.
