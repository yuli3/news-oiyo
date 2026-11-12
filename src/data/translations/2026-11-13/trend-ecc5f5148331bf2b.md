---
id: trend-ecc5f5148331bf2b
title: "nestjs/nest"
sourceUrl: https://github.com/nestjs/nest
summary: "Nest는 Node.js 위에서 한 파일짜리 API부터 대규모 시스템까지 만드는 TypeScript 백엔드 프레임워크예요. 모듈, 의존성 주입, 검증·인증·에러 처리를 한곳에 두고, AI·MCP·인증·워크플로 같은 공식 패키지를 제공해요. 코딩 에이전트용 AGENTS.md도 함께 생성돼요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

GitHub 저장소 README를 읽고 옮겼어요. 가져온 본문이 글자 수 제한에 걸려 '시작하기' 안내 부분에서 끊겨, 그 뒤 내용(후원, 라이선스 등)은 반영하지 못했어요.

### 무엇인가

**Nest**는 Node.js에서 백엔드를 만드는 **TypeScript 프레임워크**예요. 한 파일짜리 작은 API부터 여러 팀이 쓰는 엔터프라이즈 시스템까지 다뤄요.

- 모듈, 의존성 주입, 그리고 검증·인증·에러 처리를 각각 한곳에 둬서, 프로젝트가 커져도 모양을 유지하게 해요.
- Express, Fastify, Node의 `node:http` 위에서 돌아요.

### 빠른 시작

- `npx @nestjs/cli new my-api`로 프로젝트를 만들고 `npm run start:dev`로 실행해요.
- `--minimal`을 붙이면 파일 하나에서 시작하고, `npx tsx src/main.ts`로 빌드 없이 돌릴 수 있어요.
- 단, tsx는 데코레이터 메타데이터를 내보내지 않아서 타입 기반 생성자 주입이나 ValidationPipe를 쓰면 Nest CLI나 `emitDecoratorMetadata`를 켠 tsc/SWC로 실행해야 해요.

### 공식 패키지 (일부)

- 언어 모델, 도구, 에이전트, 브라우저 스트리밍: `@nestjs/ai`
- MCP 서버: `@nestjs/mcp`
- 로그인·세션·토큰·2단계 인증·API 키: `@nestjs/authentication`, 권한: `@nestjs/authorization`
- 메일, 파일(S3 포함), 번역, 데이터베이스(TypeORM, Drizzle, Mongoose, Sequelize)
- 재시도·타임아웃·서킷브레이커(`@nestjs/resilience`), 멱등성 키, 트랜잭셔널 아웃박스, 웹훅, 분산 락, 며칠 걸리는 워크플로(`@nestjs/workflows`)
- 큐와 예약 작업, GraphQL·WebSocket·마이크로서비스, OpenAPI(`@nestjs/swagger`), 설정·캐시·속도 제한·헬스 체크

### 옮겨 오기와 에이전트

- Express에서 라우트 단위로 또는 한 번에, Fastify에서 플러그인을 유지한 채, Next.js 앱의 백엔드로서 라우트 핸들러를 하나씩 옮길 수 있대요.
- 전체 문서를 마크다운으로 제공하고 색인은 docs.nestjs.com/llms.txt에 있어요. `nest new`로 만든 프로젝트에는 위 패키지 목록을 담은 **AGENTS.md**가 들어가요. 대부분의 모델이 이 패키지들이 생기기 전에 학습됐기 때문이래요.

### 철학

Node.js 덕분에 JavaScript가 프런트·백엔드 공용어가 됐지만, 서버 쪽에는 좋은 라이브러리는 많아도 **아키텍처** 문제를 해결하는 게 없었다는 문제의식이에요. Nest는 테스트·확장·유지보수가 쉬운 느슨한 결합 구조를 기본으로 주고, Angular에서 크게 영향을 받았어요.
