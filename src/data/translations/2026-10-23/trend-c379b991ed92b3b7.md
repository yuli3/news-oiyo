---
id: trend-c379b991ed92b3b7
title: "electron/electron"
sourceUrl: https://github.com/electron/electron
summary: "Electron은 JavaScript, HTML, CSS로 크로스 플랫폼 데스크톱 앱을 만드는 프레임워크예요. Node.js와 Chromium 기반이고 Visual Studio Code 등 많은 앱이 써요(MIT, 별 약 12만 3천 개)."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> GitHub README(원문 Markdown)를 기준으로 옮겼어요. 별 개수는 GitHub API 조회 기준이에요.

### 무엇인가요

**Electron** 프레임워크로 JavaScript, HTML, CSS만으로 **크로스 플랫폼 데스크톱 앱**을 만들 수 있어요. **Node.js**와 **Chromium**을 기반으로 하고, **Visual Studio Code**를 비롯한 많은 앱이 Electron으로 만들어졌어요. 문서는 중국어, 포르투갈어, 스페인어, 일본어, 러시아어, 프랑스어, 독일어 번역을 Crowdin으로 받아요.

### 설치

앱의 개발 의존성으로 설치하는 게 권장 방식이에요.

```sh
npm install electron --save-dev
```

중국용 npmmirror 미러도 있고, 커스텀 미러 설정은 고급 설치 안내를 보면 돼요.

### 지원 플랫폼

| OS | 바이너리 |
|---|---|
| macOS(Ventura 이상) | 64비트 Intel, Apple Silicon/ARM |
| Windows(10 이상) | x64, arm64 |
| Linux | x64, arm64(Ubuntu에서 빌드) |

Linux는 Chromium과 배포판 제작사가 모두 (유료 구독 없이) 지원하는 버전의 Ubuntu, Fedora, Debian 등 주요 배포판을 지원해요. 전반적으로 Chromium의 플랫폼 지원 정책을 따르려 해요.

### Electron Fiddle

**Electron Fiddle**로 작은 실험을 만들고 실행하고 패키징하며, 모든 API의 예제를 보고 여러 Electron 버전을 시험할 수 있어요. 입문을 쉽게 하려고 만든 도구예요.

### 코드에서 쓰기

Electron 앱이 아닌 일반 **Node 앱**에서 `require('electron')`을 하면 Electron 바이너리 경로를 돌려줘요. 이걸로 Node 스크립트에서 Electron을 띄울 수 있어요.

```javascript
const electron = require('electron')
const proc = require('node:child_process')
const child = proc.spawn(electron)
```

기여는 CONTRIBUTING.md, 커뮤니티 정보는 electronjs.org 커뮤니티 페이지를 보면 돼요. 로고를 쓸 땐 OpenJS 재단 상표 정책을 따라야 해요.
