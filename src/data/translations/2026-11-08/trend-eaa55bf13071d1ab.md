---
id: trend-eaa55bf13071d1ab
title: "oven-sh/bun"
sourceUrl: https://github.com/oven-sh/bun
summary: "Bun은 JavaScript·TypeScript 앱을 위한 올인원 툴킷으로, 단일 실행 파일 bun 하나에 Node.js 대체 런타임, 테스트 러너, 스크립트 러너, 패키지 매니저를 담았어요. JavaScriptCore 기반으로 시작 시간과 메모리 사용을 줄였다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-08
---

GitHub 저장소 README 앞부분을 읽고 정리했어요.

### Bun이란

Bun은 JavaScript와 TypeScript 앱을 위한 올인원 툴킷이고, `bun`이라는 단일 실행 파일로 배포돼요.

- 핵심은 Node.js를 바로 대체하도록 설계된 빠른 JavaScript 런타임이에요.
- README에 따르면 Rust로 작성됐고 내부적으로 JavaScriptCore를 써서 시작 시간과 메모리 사용량을 크게 줄였어요.
- TypeScript와 JSX를 별도 설정 없이 바로 실행해요(`bun run index.tsx`).

### 한 명령에 담긴 도구들

`bun` CLI는 테스트 러너, 스크립트 러너, Node.js 호환 패키지 매니저도 구현해요. 개발에 node_modules 1,000개 대신 `bun` 하나면 된다는 설명이에요. 내장 도구가 기존 도구보다 훨씬 빠르고, 기존 Node.js 프로젝트에서도 거의 수정 없이 쓸 수 있다고 해요.

```
bun run start        # package.json의 start 스크립트 실행
bun install <pkg>    # 패키지 설치
bunx cowsay 'Hello, world!'  # 패키지 실행
```

### 지원 환경과 설치

- Linux(x64·arm64), macOS(x64·Apple Silicon), Windows(x64·arm64)를 지원해요.
- Linux는 커널 5.6 이상을 강하게 권장하고 최소 5.1이 필요해요.
- x64에서 "illegal instruction" 오류가 나면 CPU 요구 사항을 확인하라고 안내해요.
- 설치 스크립트(curl, PowerShell), Docker 이미지 등으로 설치할 수 있어요. main 브랜치 커밋마다 canary 빌드가 자동 배포돼요.

README 뒤쪽 문서 목록에는 워치 모드·핫 리로딩, HMR, HTML import 기반 풀스택, 트랜스파일러, Cloud Run 배포, Blob·Buffer 변환 같은 가이드가 이어져요.

이 저장소는 오늘 GitHub Trending에서 별을 많이 받아 '오늘의 저장소'에 올랐어요.
