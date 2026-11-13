---
id: trend-e49fd1fc5236ecf8
title: "chidiwilliams/buzz"
sourceUrl: https://github.com/chidiwilliams/buzz
summary: "OpenAI Whisper 기반으로 개인 컴퓨터에서 오프라인으로 음성을 받아쓰고 번역하는 데스크톱 앱 Buzz예요. 마이크 실시간 받아쓰기, 화자 구분, 소음 분리, 다양한 Whisper 백엔드와 GPU 가속을 지원해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-14
---

GitHub README를 읽고 정리했어요. 수집 상한에 걸려 설치 방법과 라이선스 부분은 읽지 못했어요.

### 무엇인가

**Buzz**는 개인 컴퓨터에서 **오프라인으로** 오디오를 받아쓰고 번역하는 앱이에요. OpenAI의 **Whisper**를 기반으로 해요. 서드파티로 ctc_forced_aligner, deepmultilingualpunctuation, whisper_diarization을 서브모듈로 포함하고 있어요.

### 기능

- 오디오·동영상 파일이나 **YouTube 링크** 받아쓰기
- 마이크로 **실시간** 받아쓰기
- 행사·발표 때 쓰기 좋은 **프레젠테이션 창**
- 소음이 많은 오디오의 정확도를 높이는 받아쓰기 전 **음성 분리**
- 받아쓴 미디어의 **화자 식별**
- 여러 Whisper 백엔드 지원, 허깅페이스 whisper 타입으로 여러 Transformer 모델 계열 지원
- **가속**: NVIDIA GPU의 CUDA, Mac의 Apple Silicon, 내장 GPU를 포함한 대부분 GPU에서 Whisper.cpp용 Vulkan
- TXT, SRT, VTT로 내보내기
- 검색·재생 제어·속도 조절이 있는 고급 받아쓰기 뷰어, 키보드 단축키
- 새 파일을 자동으로 받아쓰는 **감시 폴더**
- 스크립트·자동화를 위한 **명령줄 인터페이스**

### 참고

모든 처리가 로컬에서 이뤄져 음성 데이터를 외부 서버로 보내지 않아도 된다는 점이 특징이에요. 같은 날 GitHub 트렌딩에 Whisper의 C/C++ 포트인 whisper.cpp도 올라왔어요.
