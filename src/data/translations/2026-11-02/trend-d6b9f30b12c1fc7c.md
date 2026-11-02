---
id: trend-d6b9f30b12c1fc7c
title: "Show GN: 맥용 카카오톡 하단 광고 영역을 제거해주는 CLI"
sourceUrl: https://github.com/abruption/NoAdKakaoMac
summary: "macOS 카카오톡의 하단 광고와 구분선을 없애 목록 공간 101pt를 되찾는 CLI예요. 앱을 한 번 패치하면 상주 프로그램 없이 쓰고, 카카오 공식 서명을 ad-hoc 서명으로 바꾸며 원본 백업으로 복원할 수 있어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

GitHub README 전체를 읽고 옮겼어요. 현재 v0.1.0-rc.2 프리릴리스(안정판 아님)예요.

### 무엇인가

**NoAdKakaoMac**은 macOS 카카오톡의 **하단 광고와 구분선을 제거해 101pt를 목록 공간으로 회수**하는 CLI예요. 한 번 적용하면 기존 카카오톡 아이콘으로 그대로 실행하고, 상주 프로그램은 필요 없어요.

### 지원 환경과 주의점

- Apple Silicon(ARM64), 카카오톡 **26.9.0 (2006)**, Python 3.9+, `codesign`, `lipo`. Intel과 Rosetta는 지원하지 않아요.
- **카카오 공식 서명을 ad-hoc 서명으로 교체**해요. Hardened Runtime은 유지하고 라이브러리 검증 예외를 추가하며, 전체 원본 백업으로 복원할 수 있어요.
- 모든 광고 통신·추적 차단을 보장하지는 않는대요.
- 전후 비교 이미지는 실제 채팅 화면이 아니라 계정 데이터 없는 진단 화면이고, RC1 때 로그인 앱에서 101pt 회수를 따로 확인했지만 RC2로 로그인 앱 GUI를 다시 검증하진 않았다고 밝혀요.

### 사용 순서

1. 지원 환경 확인(`python3 --version`).
2. 터미널에서 `NOAD_HOME`, `NOAD_INSTALLER`, `NOAD_BACKUP` 경로 변수를 설정해요. 백업 경로는 앱 경로와 카카오톡 버전으로 정해져 RC1에서 넘어와도 같아요.
3. 릴리스에서 `install.sh`와 `SHA256SUMS`를 받아 `shasum -a 256 -c`로 확인해요. `install.sh: OK`가 아니면 멈춰요.
4. 카카오톡을 **⌘Q로 완전히 종료**하고 `sudo sh "$NOAD_INSTALLER" status --backup-dir "$NOAD_BACKUP"`로 상태를 봐요. `ORIGINAL`이면 진행, `PATCHED`면 이미 적용, `RECOVERY_REQUIRED`나 오류면 중단해요.
5. `apply`로 적용하고 `PATCHED`를 확인해요.
6. 기존 아이콘으로 실행해 광고 영역이 사라졌는지 봐요.

### 복원과 업데이트

같은 백업 경로로 `restore`를 실행하고 `status`가 `ORIGINAL`이면 공식 원본으로 돌아온 거예요. **카카오톡 업데이트 전에는 먼저 복원**하고, 새 버전을 지원하기 전까지 다시 적용하지 말라고 해요. 문서로 사용 가이드, 문제 해결, 진단·복구, 검증 기록, 개발 안내가 있고 MIT 라이선스예요.
