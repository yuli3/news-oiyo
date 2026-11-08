---
id: trend-2fdddfd80e0e5b45
title: "Agent memory needs its OpenTelemetry moment"
sourceUrl: https://www.lorekit.io/blog/open-agent-memory-format
summary: "LoreKit 블로그는 AGENTS.md, 메모리 도구, Copilot Memory, 메모리 MCP 등 서로 읽지 못하는 에이전트 메모리 형식이 난립한다며, OpenTelemetry처럼 데이터 모델·규약·프로토콜에 합의할 때라고 주장해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

글의 앞부분을 읽고 옮겼어요. 저자는 오픈소스 도구 LoreKit을 만드는 사람이며 LoreKit이 해답이라고 주장하지는 않는다고 밝혀요.

### 문제: 형식이 제각각이에요
한 대의 머신에도 에이전트가 "기억"을 두는 곳이 여러 가지예요. 저장소마다 있는 AGENTS.md나 CLAUDE.md, 일부 저장소의 .cursor/rules/*.mdc, Anthropic 메모리 도구가 쓰는 /memories 디렉터리, GitHub 쪽에 저장되는 Copilot의 저장소별 사실, JSONL 지식 그래프를 쓰는 메모리 MCP 서버예요. 네 가지 모양이 서로를 읽지 못해서 CI 에이전트가 배운 교훈은 그걸 쓴 곳에 갇혀요. r/ClaudeAI, r/LocalLLaMA, r/cursor에는 "에이전트용 메모리 레이어를 만들었어요" 글이 계속 올라오는데, 저마다 저장 방식·스키마·MCP 도구가 달라요. 저자는 부족한 것은 도구가 아니라 합의라고 말해요.

### 선례: OpenTelemetry
2019년 이전 관측성 벤더는 각자 에이전트, 계측 라이브러리, 데이터 형식을 냈어요. OpenTracing과 OpenCensus가 문제를 풀려다 서로 경쟁하다가 2019년 OpenTelemetry로 합쳐졌고, 벤더들은 네 가지를 두고 경쟁하지 않기로 합의했어요: 데이터 모델(span, metric, log), 시맨틱 규약(service.name, http.*), 프로토콜(OTLP), 참조 구현(SDK, Collector). 벤더는 저장·질의·분석에서 계속 경쟁해요. 저자는 에이전트 메모리가 2019년 이전 관측성의 위치에 있고, 형식이 아직 어려 바꿀 수 있으며, MCP와 AGENTS.md가 Linux Foundation의 Agentic AI Foundation 아래 있어 중립적인 자리가 이미 있다고 말해요.

### 형식 둘러보기
글은 2026년 말 시점의 스냅샷이라며 계열별로 표를 제시해요. 지침 파일은 단위가 Markdown 파일 전체이고 파일 경로로 지정되며 사람이 고치기 전엔 잊히지 않아요. 에이전트 관리 파일(Anthropic 메모리 도구)은 모델이 고른 경로를 쓰고, 호스팅 저장소 사실(Copilot Memory)은 코드 인용이 붙은 사실 하나가 단위예요. 표의 나머지와 LoreKit 형식 제안은 읽은 범위 밖이에요.
