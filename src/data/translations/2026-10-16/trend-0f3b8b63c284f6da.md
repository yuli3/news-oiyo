---
id: trend-0f3b8b63c284f6da
title: "be5invis/Iosevka"
sourceUrl: "https://github.com/be5invis/Iosevka"
summary: "Iosevka는 코드 작성, 터미널, 기술 문서를 위해 만든 오픈소스 고정폭·준비례 글꼴 패밀리로, 산세리프와 슬랩세리프를 모두 제공해요. \"코드로 만든, 코드를 위한 글꼴\"이라는 소개처럼 빌드 설정으로 직접 커스터마이즈할 수 있어요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

GitHub README 원문 앞부분(소개와 설치 안내)만 읽고 옮겼어요. 커스텀 빌드 옵션과 변형 목록 등 뒷부분은 읽지 않아 `partial`로 표시해요.

### 무엇인가
저장소 소개는 "Versatile typeface for code, from code."예요. Iosevka[ˌjɔˈseβ.kʰa]는 오픈소스 글꼴 패밀리로 이런 특징이 있어요.

- 산세리프와 슬랩세리프 두 계열을 제공해요.
- 고정폭(monospace)과 준비례(quasi-proportional) 변형이 있어요.
- 코드 작성, 터미널, 기술 문서 작성용으로 설계됐어요.

### GitHub Releases로 설치
1. releases에서 글꼴 패키지를 내려받아요. Linux에서는 최신 릴리스의 TTC 패키지를 한 번에 받는 명령도 안내해요.

```bash
curl -s 'https://api.github.com/repos/be5invis/Iosevka/releases/latest' \
  | jq -r ".assets[] | .browser_download_url" \
  | grep PkgTTC-Iosevka | xargs -n 1 curl -L -O --fail --silent --show-error
```

2. 편집기와 프로그램을 모두 종료해요.
3. 압축을 풀고 OS에 맞게 설치해요.
   - **Windows**: 글꼴 파일을 글꼴 설정 화면으로 끌어다 놓아요. Windows 10 1809 이상은 기본이 사용자별 설치라 일부 Java 앱에서 호환 문제가 생길 수 있어, 오른쪽 클릭 후 "모든 사용자용으로 설치"를 권해요.
   - **macOS**: 별도 안내를 따라요.
   - **Linux**: 글꼴 폴더에 복사하고 `sudo fc-cache`를 실행해요.

### 패키지 관리자로 설치
저장소가 패키지 배포를 직접 관리하지 않아 최신이 아닐 수 있다고 밝혀요.

- macOS: `brew install --cask font-iosevka`, 다른 변형은 `brew search font-iosevka`
- Arch Linux: `ttc-iosevka` 패키지
- Ubuntu: `fonts-iosevka` 패키지
- Void Linux: `xbps-install font-iosevka`
- Fedora: COPR 저장소에서 `dnf search iosevka`로 찾아 설치
- openSUSE Tumbleweed: `iosevka-fonts` 패키지
