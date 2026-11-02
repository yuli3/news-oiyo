---
id: trend-565cf7d5aa62e1c9
title: "Show GN: AI Quota Monitor - AI 할당량 소진 되셨나요? vs-code 상태바에서 모니터링 하세요!"
sourceUrl: "https://marketplace.visualstudio.com/items?itemName=nicezic.lean-quota-monitor"
summary: "Lean Quota Monitor는 Codex, Claude Code, Copilot, Gemini/Antigravity 등 12개 AI 도구의 남은 할당량, 초기화 시각, 크레딧을 VS Code 상태 표시줄에 보여 주는 확장이에요. 할당량이 20% 아래로 떨어지면 경고해요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

VS Code Marketplace 소개 페이지의 앞부분을 읽고 옮겼어요. 설정 항목 전체는 다 읽지 않았어요.

### 무엇인가
"상태 표시줄 하나에 모든 AI 할당량"을 내건 VS Code 확장이에요. 지원 대상은 Codex, Claude Code, GitHub Copilot, Gemini/Antigravity, MiniMax, Kimi, GLM, OpenRouter, Vercel AI Gateway, OpenCode Go, DeepSeek, Devin이에요. 페이지 기준 설치 수는 49회예요.

### 어떻게 보이나
상태 표시줄에 `GPT 99% 1w 6d │ AGY 98% 1w 3d │ M3 99% 1w 23h │ OR $74.75`처럼 표시돼요.
- 할당량형 공급자는 남은 비율, 창 종류(5h, 1d, 1w, 1m), 초기화까지 남은 시간을 보여 줘요.
- 크레딧형 공급자는 남은 크레딧을 보여 줘요.
- 기본으로는 가장 긴 창(Primary Window)을 보여 주다가, 다른 창이 경고 기준(기본 **20%**) 아래로 떨어지면 ⚠️ 표시와 함께 그 창으로 바꿔 보여 줘요.

### 인증 방식
- Codex는 로컬 Codex 로그인, Claude는 로컬 Claude Code OAuth 로그인을 써요.
- Copilot은 `gh auth login`이나 GitHub 토큰을 쓰고, 월간 프리미엄 요청 창을 보여 줘요.
- Gemini/Antigravity는 AGY CLI의 `/quota`를 써요.
- MiniMax, Kimi, GLM, OpenRouter 등은 API 키를 VS Code SecretStorage에 넣어 써요.

### 지원 환경
Linux/Remote WSL, 네이티브 Windows(베타), macOS 일부(베타)를 지원해요. macOS에서는 Codex, AGY, Copilot만 되고, Claude Code가 자격 증명을 macOS 키체인에 저장하기 때문에 Claude 구독 할당량은 아직 안 된다고 밝혀요.
