---
id: trend-6e9cff778e1dea97
title: "majd/ipatool"
sourceUrl: https://github.com/majd/ipatool
summary: "ipatool은 App Store에서 iOS, iPadOS, tvOS, watchOS, visionOS, macOS 앱을 검색하고 .ipa나 macOS .pkg 패키지를 내려받는 명령줄 도구예요. App Store가 설정된 Apple 계정이 필요하고, MCP 서버 모드도 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

GitHub 저장소 `majd/ipatool` README의 앞부분(소개, 요구 사항, 설치, 명령 목록)을 읽고 옮겼어요. 각 명령의 세부 사용법은 읽지 않아 `partial`이에요. GitHub Trending에 오른 저장소예요.

### 무엇인가요

ipatool은 App Store에서 앱을 검색하고 앱 패키지를 내려받는 명령줄 도구예요. iOS, iPadOS, tvOS, watchOS, visionOS, macOS 앱을 다루고, .ipa 또는 macOS .pkg 파일을 받아요.

### 요구 사항

- 지원 운영체제: macOS, Linux, Windows, iOS
- App Store를 쓰도록 이미 설정된 Apple 계정

### 설치

- Linux, Windows: GitHub 릴리스에서 최신 버전을 받아요.
- Homebrew: `brew install ipatool`
- 시작은 `ipatool --help`

### 명령

- `auth`: App Store 인증
- `search`: App Store 앱 검색
- `download`: 앱 패키지 다운로드
- `purchase`: App Store에서 앱 라이선스 얻기
- `list-purchases`: 로그인한 계정이 가진 앱 목록
- `list-versions`, `get-version-metadata`: 앱의 버전 목록과 특정 버전 메타데이터
- `mcp`: stdio로 App Store 도구를 **MCP 서버**로 제공
- `completion`: 셸 자동완성 스크립트 생성

`--format` 옵션으로 출력 형식을 text(기본)나 json으로 고를 수 있어요.
