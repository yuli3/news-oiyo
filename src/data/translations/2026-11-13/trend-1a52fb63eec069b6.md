---
id: trend-1a52fb63eec069b6
title: "neovim/neovim"
sourceUrl: https://github.com/neovim/neovim
summary: "Neovim은 유지보수를 쉽게 하고 기여를 늘리며 확장성을 극대화하려고 Vim을 적극적으로 리팩터링하는 프로젝트예요. 여러 언어용 API, 내장 터미널, 비동기 작업, 대부분의 Vim 플러그인 호환을 내세워요. 스타는 10만 3,600개예요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

GitHub 저장소 README 전체를 읽고 옮겼어요. 원문이 짧은 README예요.

### 무엇인가

**Neovim**은 Vim을 적극적으로 리팩터링하는 프로젝트예요. 목표는 네 가지예요.

1. 유지보수를 단순하게 하고 기여를 장려하기
2. 여러 개발자가 일을 나눠 할 수 있게 하기
3. 코어를 고치지 않고도 고급 UI를 가능하게 하기
4. 확장성 극대화

GitHub 소개 문구는 "확장성과 사용성에 집중한 Vim 포크"예요.

### 기능

- 현대적인 GUI
- C/C++, C#, Clojure, D, Elixir, Go, Haskell, Java/Kotlin, JavaScript/Node.js, Julia, Lisp, Lua, Perl, Python, Racket, Ruby, Rust 등 **여러 언어에서 쓸 수 있는 API**
- 내장·스크립트 가능한 터미널 에뮬레이터
- 비동기 작업 제어
- 여러 에디터 인스턴스 사이의 공유 데이터(shada)
- XDG 기본 디렉터리 지원
- Ruby·Python 플러그인을 포함해 **대부분의 Vim 플러그인과 호환**

전체 목록은 `:help nvim-features`, 최신 버전 변경은 `:help news`에서 볼 수 있어요.

### 설치

- Windows, macOS, Linux용 빌드는 Releases 페이지에 있고, Homebrew, Debian, Ubuntu, Fedora, Arch Linux, Void Linux, Gentoo 등 패키지 관리자로도 설치할 수 있어요.
- 소스 빌드는 CMake 기반이고, 편의를 위해 Makefile이 있어요. `make CMAKE_BUILD_TYPE=RelWithDebInfo` 뒤 `sudo make install`로 설치해요. `CMAKE_INSTALL_PREFIX`로 설치 위치를 바꿀 수 있어요.
- Vim에서 옮겨 오려면 `:help nvim-from-vim`을 보래요.

### 프로젝트 구조

cmake 설정, 의존성 빌드, runtime(플러그인과 문서), src/nvim(API, Vimscript, 이벤트 루프, Lua, msgpack RPC, OS 계층, 내장 TUI 등), test로 나뉘어 있어요.

### 라이선스와 규모

특정 커밋 이후 기여분은 **Apache 2.0**이고, Vim에서 가져온 기여(vim-patch 표시)는 예외예요. 수집 시점에 스타 10만 3,600개, 포크 7,400개였어요.
