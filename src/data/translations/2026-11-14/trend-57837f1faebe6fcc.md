---
id: trend-57837f1faebe6fcc
title: "llama.cpp v1.0 is here 🦙"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xv8t2e/llamacpp_v10_is_here
summary: "llama.cpp와 ggml이 3.5년 만에 v1.0.0을 냈어요. 앞으로 API·ABI 호환성이 깨지면 메이저 버전을 올리는 시맨틱 버저닝을 지키고, Homebrew·Winget 등으로 배포를 넓히며, 150개 이상의 아키텍처를 지원한다는 허깅페이스 블로그 발표예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-14
---

Reddit 글(허깅페이스 Merve의 공지)은 API 키가 없어 RSS 본문만 읽었고, 글이 가리키는 허깅페이스 공식 블로그 글을 원문으로 읽어 옮겼어요.

### Reddit 공지

허깅페이스의 Merve가 r/LocalLLaMA에 llama.cpp **v1** 출시를 알렸어요. 앞으로도 모든 플랫폼과 모델 유형을 다루면서 하위 애플리케이션을 위해 llama.cpp를 튼튼하고 가볍게 유지하겠다고 했어요. llama.cpp 기반으로 몇 번의 클릭만으로 로컬 AI를 쓸 수 있는 **Llama 데스크톱 앱**(macOS·Windows)도 내놓고 있다고 알렸어요.

### 왜 v1.0.0인가

llama.cpp는 양자화, 최적화된 백엔드, 이식성 있는 C/C++ 구현으로 소비자용 PC부터 기업용 서버까지 멀티모달 LLM을 돌릴 수 있게 해 줘요. 3.5년 동안 많은 하위 앱이 이 라이브러리에 의존하게 됐고, 로컬 AI와 프라이버시가 중요해질수록 더 늘 거라고 봐요. 그래서 **유연하지만 안정적인 API**가 가장 중요하다며 라이브러리 v1.0.0을 냈어요.

- `libllama`(llama.cpp v1.0.0, LLM 추론)와 `libggml`(ggml v1.0.0, 텐서 라이브러리)
- 앞으로 API와 ABI 비호환은 **메이저 버전 상승**으로 표시해요.

### 버전 규칙

| 변경 | 올리는 자리 |
|---|---|
| `./include` 공개 C API의 호환성 깨짐 | MAJOR |
| 호환되는 기능, 백엔드 업데이트, 모델 지원, API 추가 | MINOR |
| API 변경 없는 버그 수정 | PATCH |

### 배포와 개발

- 배포 채널: 사전 릴리스 아티팩트(Linux·macOS·Windows·Android·iOS), Docker, Debian, Homebrew, conda-forge, MacPorts, Winget, XCFramework.
- 개발 과정에 LLM을 신중하고 합리적으로 통합하되, 코드 품질·아키텍처 통제·구현 이해를 최우선으로 둔대요.
- HF Buckets와 HF Jobs로 CI를 늘리고, NVIDIA·AMD·Qualcomm·Arm·IBM·Intel의 하드웨어 지원으로 셀프 호스팅 러너를 확대하고 있어요.
- ggml은 거의 모든 하드웨어에서 돌도록 백엔드를 동적 라이브러리로 따로 빌드해 런타임에 불러올 수 있고, llama.cpp는 현재 **150개 이상의 아키텍처 변형**과 주요 추측 디코딩 방식을 지원해요.
