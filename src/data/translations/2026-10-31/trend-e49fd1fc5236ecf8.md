---
id: trend-e49fd1fc5236ecf8
title: "chidiwilliams/buzz"
sourceUrl: https://github.com/chidiwilliams/buzz
summary: "Buzz는 OpenAI Whisper로 내 컴퓨터에서 오프라인으로 음성을 받아쓰고 번역하는 앱이에요. 파일·유튜브 링크·마이크 실시간 받아쓰기, 화자 구분, 여러 Whisper 백엔드와 GPU 가속, CLI와 플러그인을 지원해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

GitHub 저장소 README 앞부분(기능과 설치)을 읽고 정리했어요. 뒷부분은 담지 못했어요.

### 무엇인가요

**Buzz** 는 개인 컴퓨터에서 **오프라인**으로 오디오를 받아쓰고 번역하는 앱이에요. OpenAI의 **Whisper** 를 기반으로 해요.

### 주요 기능

- 오디오·비디오 파일과 유튜브 링크 받아쓰기
- 마이크 실시간 받아쓰기, 행사·발표용 프레젠테이션 창
- 잡음이 많은 오디오를 위한 받아쓰기 전 음성 분리, 화자 식별
- 여러 Whisper 백엔드, NVIDIA CUDA 가속, Apple Silicon 지원, 대부분 GPU에서 Whisper.cpp Vulkan 가속
- Hugging Face의 Whisper 계열 Transformer 모델 지원
- TXT, SRT, VTT 내보내기
- 검색·재생·속도 조절이 되는 받아쓰기 뷰어, 키보드 단축키
- 새 파일을 자동으로 받아쓰는 감시 폴더
- 스크립트용 CLI, AI 요약 생성 등을 붙이는 플러그인 시스템

### 설치

- **macOS**: SourceForge에서 .dmg를 받아요. 이제 Apple Silicon이 필요하고, Intel Mac을 지원하는 마지막 버전은 1.4.5예요.
- **Windows**: SourceForge에서 설치 파일을 받아요. 서명되지 않은 앱이라 경고가 뜨면 '추가 정보 → 실행'을 고르면 돼요.
- **Linux**: Flatpak, Snap, AppImage로 제공돼요.
- **PyPI**: ffmpeg를 설치하고 Python 3.12 환경에서 `pip install buzz-captions` 후 `python -m buzz`로 실행해요.
