---
id: trend-9d7724d43d34fb5b
title: "Launch HN: Alter (YC S25) – Access control for multi-user agents"
sourceUrl: https://alterauth.com/
summary: "YC S25 스타트업 Alter가 AI 에이전트용 특권 접근 관리(PAM)를 내놨어요. 자격 증명을 금고에 두고 요청마다 주입하며, 에이전트별 정책·위험 작업 승인·감사 로그를 런타임에 강제해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> 제품 랜딩 페이지를 기준으로 옮겼어요. 마케팅 문구라 실제 동작은 문서로 확인해야 해요.

### 무엇인가

Alter Vault는 **AI 에이전트를 위한 특권 접근 관리(PAM)**예요. 각 사용자를 대신해 에이전트가 무엇을 할 수 있는지 통제하고, 정책을 강제하고, 자격 증명을 감추고, 모든 행동을 감사해요. Y Combinator 투자를 받았고 140개 연동, 경로 내(in-path) 강제를 내세우며 SOC 2는 진행 중이라고 밝혀요.

### Alter가 없을 때의 문제

- **키가 여기저기 흩어져요.** `OPENAI_API_KEY`, `SLACK_BOT_TOKEN`, `STRIPE_SECRET_KEY` 같은 키가 프롬프트, 설정 파일, `.env`에 붙여 넣어져요.
- **키 하나가 모든 걸 해요.** 14개 에이전트가 권한이 과도한 같은 관리자 키를 빌려 써요.
- **나중에 답이 없어요.** "그 환불은 누가 했지?"라고 물어도 어느 에이전트가 누구를 대신해 했는지 알 수 없어요.

### Alter를 쓰면

- **금고 하나**: 자격 증명을 한 번 저장하고 요청마다 주입해서, 프록시 호출이면 코드에 키가 남지 않아요.
- **에이전트별 최소 권한**: 에이전트마다 고유 ID와 스코프를 주고, 원하는 곳에 사람 승인 단계를 둬요(예: billing-agent의 `refunds:write`는 승인 필요).
- **모든 행동을 기록**: 변조 탐지가 되는 감사 기록에 호출마다 이름이 붙어요. 예시로 "billing-agent가 finance-ops를 대신해 14:03에 실행, J. Lee 승인"을 보여 줘요.

### 동작 방식

SDK 호출 하나로 저장, 토큰 갱신, 정책, 감사를 140개 제공자에 대해 처리해요. LangChain, MCP, AWS 연동을 지원해요. 정책은 기본 거부(default-deny)로 파라미터 단위까지 걸 수 있고, 위험한 호출은 승인 후 완료돼요. 에이전트·키·권한을 즉시 회수할 수 있고, IdP 웹훅으로 퇴사 처리가 연쇄 적용돼요. 감사 기록은 고객의 SIEM으로 스트리밍할 수 있어 보안 심사 대응에 쓸 수 있다고 해요.
