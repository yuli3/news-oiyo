---
id: trend-5a72a4d04aa0a621
title: "Show GN: Flats – AI 에이전트가 만든 웹사이트를 내 컴퓨터에서 호스팅"
sourceUrl: "https://github.com/gosuda/flats"
summary: "Flats는 AI 에이전트가 만든 웹사이트·작은 서버 앱·HTML 페이지·협업 Markdown 문서를 내 컴퓨터에서 호스팅하는 오픈소스 도구예요. Go 단일 바이너리이고, MCP로 Claude Code·Codex·Cursor와 연결되며 공개·배포는 콘솔 승인을 거쳐요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-14"
---
GitHub README(gosuda/flats)의 앞부분(소개, 만들 수 있는 것, 빠른 시작, 에이전트 연동)을 옮겼어요. 문서 링크 너머의 세부 내용은 읽지 않았어요.

### 무엇인가
> Sites, apps and documents — built by agents, hosted on your machine.

Flats는 'sites/artifacts'의 오픈소스 대안이에요. 내 컴퓨터를 AI로 만든 것들의 집으로 바꿔 줘요. 웹사이트를 배포하고, 작은 서버 앱을 돌리고, HTML 페이지를 공유하고, Markdown 문서로 협업할 수 있어요. 처음엔 로컬 루프백에서 **비공개**로 시작하고, 명시적으로 허용한 네트워크 제공자를 통해 누가 접근할지 골라요.

- CGO 없는 Go 바이너리 하나, macOS·Linux 지원
- 웹 콘솔, CLI, HTTP API, MCP 엔드포인트 제공
- 호스팅된 Flats 컨트롤 플레인이 없어요

### 세 가지 원칙
- **내 기기, 내 데이터**: 코드, SQLite DB, 영구 파일, 암호화된 비밀을 로컬에 둬요.
- **에이전트 워크플로용**: Claude Code, Codex, Cursor 등 MCP 클라이언트를 연결하고, 배포는 콘솔에서 확인·승인해요.
- **기본 비공개**: Local이나 허용한 사설망을 쓰고, 공개 공유는 따로 승인하는 선택이에요.

### 만들 수 있는 것
| 유형 | 용도 | 공개 방식 |
|---|---|---|
| Website | 정적 사이트, 샌드박스 JavaScript·WASI 서버 앱 | 비공개 Draft 저장 → 미리보기 → 승인 후 공개, 롤백 지원 |
| Page | 차트·보고서 같은 단일 HTML 문서 | 웹사이트와 같은 흐름, 서버 코드·저장소 없음 |
| Document | 실시간 협업 Markdown | 바로 실행(처음엔 비공개), Draft·버전 없음 |

Draft 작업 중에도 라이브 버전은 그대로이고, 미리보기는 격리된 데이터를 써요. 공개·활성화·롤백은 콘솔 승인이 필요해요. 문서는 에이전트 저장분을 사람 편집에 병합하고, 공개 범위를 바꿀 때는 모든 유형에서 승인이 필요해요.

### 빠른 시작
설치 스크립트가 릴리스 체크섬을 확인하고 `~/.local/bin`에 설치한 뒤 백그라운드 서비스(macOS launchd, Linux systemd 사용자 서비스)를 띄워요. sudo를 쓰지 않고 셸 프로필도 건드리지 않아요. 첫 사이트를 배포하면 승인 URL이 나오고, 승인 후 `hello.localhost:7879`에서 열려요. 승인 대기 중에는 `flats deploy`가 종료 코드 3을 돌려줘요. 컨테이너, 포그라운드, 소스 빌드(Go 1.27.1 이상)로도 돌릴 수 있는데, 콘솔 포트를 네트워크에 열면 누구든 배포를 승인할 수 있으니 절대 열지 말라고 경고해요.

### 에이전트 연동
Flats 플러그인으로 Claude Code, Codex, Cursor를 연결해요. 플러그인은 선택한 호스트의 MCP 엔드포인트를 중계하는 `flats mcp`를 실행해요.
