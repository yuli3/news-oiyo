---
id: trend-cbb606efb4d1a072
title: "formbricks/formbricks"
sourceUrl: https://github.com/formbricks/formbricks
summary: "Formbricks는 '오픈소스 Qualtrics 대안'을 내건 설문·경험 관리 플랫폼이에요. 인앱, 웹사이트, 링크, 이메일 설문을 노코드 편집기로 만들고, AGPLv3로 Docker 셀프호스팅도 할 수 있어요. TypeScript·Next.js 기반이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> GitHub 저장소 첫 화면과 README 앞부분을 기준으로 정리했어요.

### 무엇인가

**Formbricks**는 무료 오픈소스 설문 플랫폼이자 **프라이버시 우선 경험 관리 플랫폼**이에요. 사용자 여정 곳곳에서 인앱, 웹사이트, 링크, 이메일 설문으로 피드백을 모으고, 내장 분석을 쓰거나 그 위에 직접 만들 수 있어요. 미션은 "팀에 힘을 주고, 거부할 수 없는 경험을 만들기"예요.

### 기능

- 여러 질문 유형을 지원하는 **노코드 편집기**로 전환 최적화 설문을 만들어요.
- 모범 사례 **템플릿** 제공.
- 앱 코드를 바꾸지 않고 특정 사용자 그룹에 설문을 타기팅해요.
- 공유 가능한 링크 설문, 조직 구성원 협업.
- Slack, Notion, Zapier, n8n 등과 연동돼요.

### 기술과 배포

| 항목 | 내용 |
|---|---|
| 스택 | TypeScript, Next.js, React, TailwindCSS, Prisma, Auth.js, Zod, Vitest |
| 클라우드 | formbricks.com 무료 플랜 |
| 셀프호스팅 | AGPLv3, Docker로 구독 없이 |
| 개발 환경 | Node.js, pnpm, Docker(PostgreSQL, SpiceDB, MailHog, Valkey 등) |

저장소엔 `.agents/skills`, `.claude/skills`, `.cursor/commands`, `AGENTS.md`, `CLAUDE.md`가 있어 AI 코딩 에이전트용 설정을 같이 관리하는 게 눈에 띄어요.
