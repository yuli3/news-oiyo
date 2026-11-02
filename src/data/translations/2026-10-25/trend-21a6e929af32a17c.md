---
id: trend-21a6e929af32a17c
title: "Rakazo - 내 PC에서 운영하는 Grok Bot 오픈소스 대체제"
sourceUrl: https://github.com/elie222/rakazo
summary: "Rakazo는 자기 PC나 서버에서 돌리는 오픈소스 AI 비서 플랫폼이에요. 역할별 봇이 대화·메모리·루틴·이력을 유지하고, 모델과 샌드박스(Docker·E2B·Daytona 등)를 직접 골라 브라우저·터미널·데스크톱을 다루게 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-25
---

> GitHub 저장소 README의 소개·설치 부분을 기준으로 옮겼어요. 기능 전체 목록과 아키텍처 세부는 다 읽지 못했어요.

### 무엇인가요

**Rakazo**는 '지속되는 팀원'을 위한 오픈소스 AI 에이전트이자, 자기 컴퓨터에서 돌리는 **셀프 호스팅 AI 비서**예요. 웹, Electron 데스크톱 앱 등으로 쓸 수 있고, README는 Grok Bot, Meta Muse, OpenAI Dots 같은 서비스의 오픈소스·셀프 호스팅 대안이라고 소개해요. GeekNews 소개에 따르면 이메일 정리, 영업 조사, 경비 처리처럼 **역할별 비서**를 만들어 운영하는 용도예요.

### 주요 기능

- **지속되는 봇**: 봇마다 자기 대화, 메모리, 루틴, 이력을 가져서 매번 처음부터 설명하지 않아도 돼요.
- **모델과 샌드박스를 직접 선택**: Docker, E2B, Daytona, CreateOS, Boat, 신뢰하는 로컬 컴퓨터를 지원해요. 로컬 Docker 컴퓨터가 기본이에요.
- **음성 모드**: 답을 읽어 주고, 받아쓰고, 봇에 전화를 걸 수 있어요. ElevenLabs, OpenAI, Cartesia, Fish Audio 키를 직접 넣어요.
- **앱 연동**: Composio나 Pipedream Connect, 원격 MCP, OpenAPI 도구 소스를 붙일 수 있어요.

### 설치

- Docker Engine, Compose 플러그인, curl, OpenSSL만 있으면 돼요. 저장소 복제나 Node 설치 없이 설치 스크립트가 Compose 파일을 받고, 무작위 시크릿으로 `.env`를 만든 뒤 Rakazo를 띄워요.
- 기본 이미지 태그는 `edge`(main 빌드, linux/amd64·arm64)예요.
- 서버(VPS)에서 백엔드를 돌리면 봇이 계속 켜져 있고, 데스크톱 앱에서 '기존 인스턴스'로 접속할 수 있어요.
- 직접 개발하려면 Node.js 22.22.2 이상(22.x), 24.x, 26+가 필요하고, Postgres 비밀번호와 인증·암호화 키를 각각 긴 무작위 값으로 정해야 해요. 앱은 행 수준 보안이 적용되는 별도 DB 계정으로 접속해요.
