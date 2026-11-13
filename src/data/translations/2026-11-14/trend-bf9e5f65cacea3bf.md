---
id: trend-bf9e5f65cacea3bf
title: "ggml-org/whisper.cpp"
sourceUrl: https://github.com/ggml-org/whisper.cpp
summary: "OpenAI의 음성 인식 모델 Whisper를 의존성 없는 순수 C/C++로 옮긴 whisper.cpp예요. Apple Silicon 최적화, 정수 양자화, 런타임 메모리 할당 0, CPU 전용 추론을 지원해 아이폰에서도 완전히 오프라인으로 돌아가요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-14
---

GitHub README를 읽고 정리했어요. 수집 상한에 걸려 빠른 시작 안내 중간까지 읽었고, 지원 플랫폼 전체 목록과 벤치마크 등은 읽지 못했어요.

### 무엇인가

OpenAI의 **Whisper** 자동 음성 인식(ASR) 모델을 고성능으로 추론하는 C/C++ 구현이에요. ggml-org가 관리해요(같은 날 v1.0.0을 낸 llama.cpp와 같은 조직이에요).

### 특징

- 의존성 없는 **순수 C/C++** 구현
- **Apple Silicon 우선 지원**: ARM NEON, Accelerate 프레임워크, Metal, Core ML로 최적화
- x86의 AVX, POWER의 VSX intrinsics 지원
- **정수 양자화** 지원
- 런타임 **메모리 할당 0**
- **CPU 전용 추론** 지원, NVIDIA GPU 효율적 지원
- **음성 활동 감지(VAD)**
- Windows(MSVC, MinGW) 등 여러 플랫폼

### 구조

모델의 고수준 구현 전체가 `whisper.h`와 `whisper.cpp`에 들어 있고, 나머지는 **ggml** 머신러닝 라이브러리예요. 이렇게 가벼워서 여러 플랫폼과 앱에 쉽게 넣을 수 있어요.

- 예: **iPhone 13**에서 완전히 오프라인, 온디바이스로 모델을 돌리는 데모(whisper.objc)
- 오프라인 음성 비서 앱 예제(command)도 있어요.
- Apple Silicon에서는 Metal로 추론이 GPU에서 완전히 돌아가요.

### 시작하기

저장소를 클론하고 디렉터리로 이동한 뒤, ggml 형식으로 변환된 Whisper 모델을 내려받아 빌드해 쓰는 순서예요.
