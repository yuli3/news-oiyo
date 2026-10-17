---
id: trend-ebc1df8b5e0a9344
title: "Otaku — an LLM frontend for creative writing"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x865rk/otaku_an_llm_frontend_for_creative_writing"
summary: "Otaku는 창작·롤플레이용 오픈소스 LLM 프런트엔드로, 긴 이야기에서도 문장 품질을 지키고 컨텍스트를 작게 유지하는 데 초점을 둬요. 웹 UI와 터미널 UI를 함께 제공하고 llama.cpp·KoboldCpp·LM Studio 등 로컬 엔진을 자동으로 찾아요. uv로 설치해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Reddit은 API 키 없이 본문을 직접 읽을 수 없어 RSS 발췌(본문 전체로 보임)로 옮겼어요. GitHub 저장소와 인터랙티브 데모는 따로 열어 보지 않았어요.

### 세 가지 원칙
작성자는 SillyTavern 같은 도구의 대안으로 Otaku를 만들었다며 핵심 아이디어를 이렇게 소개해요.
1. 이야기가 길어져도 **글 품질 유지**
2. 긴 이야기에서도 중요한 디테일은 잃지 않으면서 **컨텍스트를 작게**
3. 브라우저와 터미널 모두에서 **좋은 인터페이스**

설정에서 로어(lore) 추출을 끄면 일반 채팅용으로도 쓸 수 있다고 해요.

### 두 가지 인터페이스
| | 웹 UI | 터미널 UI |
|---|---|---|
| 조작 | 메뉴 | 슬래시 명령(`/help`로 목록) |
| 캐릭터 라이브러리 | 있음 | 나중에 추가 예정 |
| 기타 | 모바일 최적화, HTTPS·비밀번호 보호, 여러 레이아웃 | 같은 기능 |

### 새로 생긴 기능
- 양방향 **캐릭터 라이브러리**: 카드로 이야기를 시작하거나, 이야기에서 자동 추출된 캐릭터로 카드를 만들거나 기존 카드에 연결
- NovelAI 같은 **스토리 모드**: 프롬프트 칸이 아니라 본문에 직접 쓰고 Enter를 누르면 모델이 이어 씀
- 이미지 첨부(컨텍스트에 남아 나중에 참조 가능), 웹 검색 도구, 모델이 사용자에게 진행 방향을 묻는 질문 도구
- SillyTavern의 Author's Note 같은 주입 기능
- 컨텍스트 상한: 넘으면 이야기 중간을 요약으로 바꿈

### 설치와 시작
- 무료 오픈소스, macOS·Linux·Windows 지원. `uv tool install otaku`로 설치하고 `otaku`(터미널) 또는 `otaku web`(기본 `http://localhost:9600`)으로 실행해요.
- 처음 실행하면 샘플 이야기 두 개와 캐릭터 카드가 들어와 있어요.
- llama.cpp, KoboldCpp, oMLX, LM Studio 로컬 설치를 자동 감지하고, OpenRouter·NanoGPT는 API 키를 넣으면 목록이 떠요. 새 이야기는 `/new`로 시작해요.
- 저장소는 `enclavum/otaku`이고, 개인 사이드 프로젝트라 피드백을 바란다고 해요.
