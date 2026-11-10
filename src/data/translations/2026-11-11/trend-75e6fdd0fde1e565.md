---
id: trend-75e6fdd0fde1e565
title: "Show GN: Herdr CKD - 격리된 Git Worktree와 3자 교차 검증(C·A·B) 기반 오픈소스 AI 코딩 오케스트레이터"
sourceUrl: https://github.com/kokogo100/herdr-ckd
summary: "에이엑스엔엘아이가 공개한 Herdr CKD는 사용자가 대화창 하나(Core Leader C)에만 말하면 C가 격리된 Git Worktree에서 만드는 쪽(A)과 검증하는 쪽(B) 짝을 병렬로 띄워 교차 검증한 뒤 합치는 오픈소스 AI 코딩 오케스트레이터예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

GitHub 저장소 README 앞부분(1장과 2장 첫머리)을 읽고 옮겼어요. 이론 문서(CKD_THEORY.md)와 나머지 README는 읽지 못해 partial로 표시했어요.

### 무엇인가

Herdr CKD는 **에어갭(air-gapped) 3자 AI 오케스트레이터**이자 데스크톱 대시보드예요. 오픈소스 Herdr(OSC 7501) 터미널 멀티플렉싱 프로토콜과 주식회사 에이엑스엔엘아이(AXNli)의 독자 이론인 CKD(Collaborative Knowledge Distillation & Cross-Verified Role Separation)를 결합했다고 해요.

README는 "프로젝트 안에 채팅 스레드 여러 개를 여는 것"과 다르다고 강조해요. 그런 방식은 탭마다 AI 하나가 코드를 쓰고 스스로 판단해요. Herdr CKD에서는 사용자가 **대화창 하나(👑 Core Leader C)**에만 평범한 말로 요청해요. 그러면 C가 격리된 Git Worktree에 Maker(A_n)와 Checker(B_n) 짝([A1·B1], [A2·B2]…)을 띄우고, 교차 검증을 강제한 뒤 검증된 작업을 하나로 합쳐요.

### 기존 도구의 두 가지 함정

- **단일 에이전트 하네스**(SWE-agent, Aider, IDE 에이전트): 같은 컨텍스트가 코드를 쓰고 테스트도 평가해서 자기 확증 편향이 생겨요(버그를 합리화하거나 테스트를 약하게 고쳐 통과).
- **채팅방형 멀티 에이전트**(AutoGen, CrewAI): 에이전트가 공유 채팅방에서 직접 대화해 아첨성 집단사고에 빠지고, 리뷰어가 코더의 주장에 도장만 찍게 돼요.

### Herdr CKD의 차이 (README 표 요약)

- **역할 구조**: 고정 Core C 1개 + 병렬 [A_n·B_n] 짝 N개
- **전염 방지**: A_n과 B_n은 직접 대화하지 않고 C가 그대로 전달해요.
- **도구 분리**: B_n과 C는 `write_file`, `edit_file`을 호출할 수 없게 도구를 물리적으로 뺐어요.
- **증거 주입**: C가 A_n 워크트리의 원본 `git diff`를 B_n에 자동으로 붙여요.
- **완료 기준**: A=DONE, B=DONE, C=PASS가 모두 맞아야 끝나요.
- **지식 증류**: 로그를 버리지 않고 로컬 LLM 재학습용 SFT/DPO 데이터셋(`finetune/curated.jsonl`)으로 자동 정리해요.

사용자·IDE는 MCP(`http://127.0.0.1:37501/mcp`)로 C와 연결돼요. 데모로는 세 짝이 각각 아케이드 HUD, 물리·보너스 엔진, WebAudio 신스를 맡아 네온 스네이크 게임을 만들고, 2번 짝의 B2가 1라운드에서 180° 역방향 자기 충돌 버그를 잡아 2라운드에서 통과한 화면을 보여 줘요.
