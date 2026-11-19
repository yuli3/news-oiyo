---
id: trend-d4a1702dd635e21e
title: "Launch HN: Onlook (YC W25) – An open-source developer tool for designers"
sourceUrl: https://github.com/onlook-dev/onlook
summary: "Onlook은 디자이너가 실제 코드베이스 위에서 AI로 화면을 디자인하는 오픈소스(Apache 2.0) 로컬 우선 데스크톱 앱이에요. 자체 모델 없이 사용자의 Claude Code나 ChatGPT/Codex 계정을 연결해 에이전트가 repo 파일을 직접 고쳐요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

onlook-dev/onlook GitHub README 앞부분(기여 안내 직전까지, 약 7,000자)을 읽고 정리했어요. 뒷부분(기여·보안 신고·라이선스 세부)은 옮기지 않았어요. YC W25 팀이 Launch HN으로 소개했어요.

### Onlook이 뭔가요

"디자이너를 위한 개발자 도구"예요. 무료이고 로컬 우선인 에디터로, 디자이너가 코드로 경험을 만들게 해 준다고 해요. AI와 함께 웹사이트, 프로토타입, 디자인을 캔버스에서 만들고, 실제로 돌아가는 앱을 보면서 시각적으로 다듬고, 코드는 내 에이전트가 쓰는 구조예요. Figma, V0, Replit Agent, Base 44, Webflow 등의 오픈소스 대안을 표방해요.

### 왜 Onlook인가 (README의 6가지)

- **디자인을 위해 만들었어요.** 실제 앱을 캔버스에 띄우고 아이디어를 나란히 비교하며, 터미널이 아니라 시각적으로 인터페이스를 다듬어요. 로컬 폰트와 에셋으로 앱, 웹사이트, 포스터, 그래픽을 디자인해요.
- **내 에이전트를 가져와요.** 자체 모델을 넣지 않아요. 이미 가진 Claude Code 또는 ChatGPT/Codex 계정을 연결하면 그 에이전트가 프로젝트 안에서 일해요. MCP 커넥터로 도구를 더 붙이고, 여러 repo·페이지에서 디자인 작업을 동시에 할 수 있어요.
- **실제 repo에서 일해요.** 내 컴퓨터의 아무 Git 저장소나 열고 내 개발 서버를 돌려요. 나중에 다시 만들어야 하는 목업이 아니라 실제 제품을 디자인한다는 거예요.
- **로컬 우선 데스크톱 앱이에요.** 코드는 내 컴퓨터에 남고, 소스 빌드에는 Onlook 계정이나 클라우드 키, .env 파일이 필요 없어요.
- **만든 걸 공유해요.** 결과물을 독립 HTML, PNG, JPEG, PDF로 내보내요.
- **오픈소스예요.** Apache 2.0.

### 할 수 있는 일

- 무한 캔버스 위의 라이브 앱, 모바일·태블릿·데스크톱 프레임을 나란히 배치
- 안전한 worktree 복사본에서 작업해 원본 폴더는 건드리지 않음, 프로젝트를 탭으로 병렬 진행
- 캔버스의 아무 요소에 대해 질문, 에이전트가 변형·상태·흐름을 캔버스에 정리, 참고 이미지 배치
- repo 밖에서 빠르게 HTML 스케치를 만드는 Artifacts
- GitHub repo 가져오기, 새 코드베이스 시작, 검사부터 머지까지 한 번에 하는 풀 리퀘스트

### 동작 방식

1. Git 저장소를 가리키거나 가져와요. 코드는 그 자리에 그대로 있어요.
2. Onlook이 터미널에서처럼 로컬 개발 서버를 띄워요.
3. 실행 중인 앱이 캔버스의 프레임에 나타나요.
4. 채팅으로 원하는 걸 말하면 연결한 Claude Code나 ChatGPT/Codex가 repo의 실제 파일을 고쳐요.
5. 개발 서버가 다시 로드되면서 캔버스에 반영되고, 변경은 Git이 추적해요.

프로젝트를 자체 도구로 돌리기 때문에 개발 서버가 지원하는 웹 프레임워크·언어라면 다 동작한다고 해요.

### 설치

macOS(Apple Silicon·Intel x64) 데스크톱 앱이 권장 경로예요. Windows는 대기자 명단, Linux는 수요를 보는 중이에요. 소스 빌드 방법은 SOURCE_BUILD.md에 있어요. 기술 스택은 Electron, React 19, Astryx(디자인 시스템), React Flow, Zustand, CodeMirror, node-pty, Bun, Turborepo 등이에요.
