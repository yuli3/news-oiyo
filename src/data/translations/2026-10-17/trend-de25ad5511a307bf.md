---
id: trend-de25ad5511a307bf
title: "Strands Harness SDK - 모델과 클라우드를 선택하고 에이전트 실행을 직접 제어하는 SDK"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
summary: "Strands Agents는 Python·TypeScript로 프로덕션 AI 에이전트를 만들고 직접 제어하는 오픈소스 SDK예요. 새 Strands harness는 create_harness() 한 번으로 모델·도구·메모리·세션·컨텍스트 관리 기본값을 갖춘 에이전트를 만들어 줘요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

GitHub 저장소 README를 읽었어요. README가 길어서 소개, 구성, Quick Start까지 옮겼고 SDK 상세 사용법은 읽지 못해 `partial`이에요.

### 무엇인가
Strands Agents는 "몇 줄 코드로 에이전트를 만드는 모델 주도 접근"을 내세우는 오픈소스 SDK예요. 직접 에이전트 루프를 짜려 할 때 고르라고 해요. 호스팅된 컨트롤 플레인 없이 내 프로세스에서 돌고, 직접 짠 루프가 결국 커지게 되는 일들을 한 SDK에 담았다고 설명해요.

- 수명 주기 제어(턴 한도, 토큰 예산, 취소, 중단 이유)
- 도구와 구조화 출력, MCP, 멀티 에이전트 패턴
- 메모리·세션, 모델 이식성, 스트리밍
- 가드레일, 트레이싱, 평가

### 저장소 구성
| 디렉터리 | 내용 |
|---|---|
| `harness-py/`, `harness-ts/` | 완성형 에이전트 Strands harness |
| `strands-cli/` | 터미널에서 harness 에이전트로 프로토타입·채팅 |
| `strands-py/`, `strands-ts/` | 에이전트 루프, 모델 제공자, 도구 SDK |
| `strands-mcp/` | 코딩 에이전트에게 Strands 지식을 주는 MCP 서버 |
| `site/`, `team/`, `test-infra/` | 문서 사이트, 거버넌스, 통합 테스트용 AWS CDK |

Claude Code, Codex, Cursor용 Strands 플러그인도 있어 프레임워크 선택, 스캐폴딩, 도구 작성, MCP 연결, LangGraph 이전 안내를 해 준다고 해요.

### 왜 Strands인가
- **어떤 모델, 어떤 클라우드든**: Amazon Bedrock, Anthropic, OpenAI, Gemini를 1급 지원하고 다른 제공자와 사용자 정의도 돼요. 규모를 키울 때 백엔드를 바꿔도 코드는 그대로예요.
- **제어**: 에이전트 루프가 모든 결정을 기본으로 추적하고, 훅으로 어느 단계든 가로채 기록·검증·방향 전환할 수 있어요.
- **결과**: 가드레일이 실행 전에 실수를 잡고, steering 핸들러로 에이전트가 조용히 실패하지 않고 스스로 고쳐요.

### 빠른 시작
```python
from strands_harness import create_harness

agent = create_harness()
agent("Find the slowest test in this repo and explain why it's slow")
```
TypeScript는 `npm install @strands-agents/harness` 뒤 `createHarness()`를 써요. 벤치마크로 고른 기본값으로 시작한 뒤, 루프를 직접 소유하고 싶으면 하위 SDK로 내려가라고 안내해요.
