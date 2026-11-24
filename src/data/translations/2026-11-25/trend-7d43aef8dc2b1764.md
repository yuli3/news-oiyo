---
id: trend-7d43aef8dc2b1764
title: "How to handle user, connector, and agent auth in Gemini Enterprise with a custom UI"
sourceUrl: https://developers.googleblog.com/how-to-handle-user-connector-and-agent-auth-in-gemini-enterprise-with-a-custom-ui
summary: "Gemini Enterprise의 StreamAssist API를 직접 만든 UI로 호출할 때 필요한 인증 3계층을 정리한 글이에요. 사용자·워크로드 인증, 페더레이티드 커넥터 3LO, ADK 에이전트의 도구별 OAuth를 다뤄요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

자체 UI(Customer UI)와 백엔드(Customer BE)로 Gemini Enterprise의 StreamAssist API를 호출할 때 필요한 인증 3계층을 설명한 글이에요. 기본 제공 웹 앱은 이 흐름을 자동으로 처리하지만, 직접 만든 UI는 전부 구현해야 해요. 글에는 코드가 인라인으로 실려 있지 않고, 실행 가능한 코드는 `gemini-enterprise-custom-ui-auth` GitHub 저장소에 있어요.

### 1계층: StreamAssist 인증

호출 주체는 모두 프로젝트에 Discovery Engine User IAM 역할이 필요하고, 사람 패턴(1A·1B)에서는 사용자나 Workforce Pool 그룹에 Admin Console의 Gemini Enterprise 라이선스도 있어야 해요.

- **1A Google Identity**: Google Identity Services(OAuth 2.0)로 로그인해 받은 사용자 범위 액세스 토큰을 Bearer로 그대로 전달해요. 추가 교환 단계가 없어요.
- **1B Workforce Identity Federation**: 커스텀 앱의 Entra ID나 Okta 클라이언트 ID를 기존 Workforce Pool OIDC 공급자에 추가하고, 로그인 후 IdP의 OIDC 토큰을 Google STS에서 교환해요. STS가 돌려준 단기 토큰이 그룹 권한과 문서 ACL을 적용해요.
- **1C Workload Identity Federation**: 백엔드 서비스·봇·웹훅용이에요. IdP에서 받은 머신 JWT를 프로젝트 범위 Workload Identity Pool 공급자로 교환하고, 서비스 계정 키는 저장하지 않아요.

1C는 Gemini Enterprise에 하나의 워크로드 아이덴티티로 보이기 때문에, 사용자별 ACL이나 사용자별 3LO 커넥터, 제한된 에이전트가 필요하면 1A나 1B를 써야 해요.

### 2계층: 페더레이티드 커넥터 3LO

페더레이티드 커넥터는 Google Drive, SharePoint Online, Jira, Box, ServiceNow, Confluence 같은 외부 시스템을 직원 각자의 권한으로 실시간 검색해요. 사용자별 리프레시 토큰은 Gemini Enterprise의 관리형 Keystore에 저장되므로 Customer BE가 외부 자격 증명을 보관하지 않아요. 흐름은 세 단계예요.

1. **탐색(1~4단계)**: Customer BE가 사용자 Bearer 토큰으로 엔진의 커넥터 목록과 Keystore를 확인해요. 유효한 토큰이 있으면 갱신해 돌려주고, 없으면 인가 URL을 돌려줘 UI가 Authorize 버튼을 띄워요.
2. **동의 팝업(5~7단계)**: 팝업이 외부 인증 서버로 가고, 승인 후 Google의 GE FE Server `/oauth-redirect`가 code와 state가 담긴 콜백 URL을 UI로 전달하고 팝업을 닫아요.
3. **토큰 저장(8~11단계)**: Customer BE가 GE Server에 코드 교환과 Keystore 저장을 요청하고, 이후 StreamAssist 요청에 커넥터의 데이터 스토어 ID를 붙여요.

커스텀 도메인에서 팝업 전달이 되려면 Gemini Enterprise 팀이 custom origin 플래그를 켜 줘야 해요.

### 3계층: ADK 에이전트의 도구별 OAuth

에이전트 등록 단계의 루트 OAuth는 로그인이 필요 없는 질문까지 모든 OAuth 로그인이 끝날 때까지 막고, StreamAssist의 도구 단위 프롬프트가 아니라 기본 웹 UI에 묶여 있어요. 대안은 세 단계 설정이에요. 보호된 API를 쓰는 도구만 ADK의 `AuthenticatedFunctionTool`과 `GcpAuthProvider`로 감싸고, 루트 라우터와 서브 에이전트를 Agent Identity를 켠 Vertex AI Agent Engine에 배포해 SPIFFE 아이덴티티에 Agent Identity Service Agent 역할을 주고, 콘솔에서 앱별 3LO Auth Provider를 만들어 기본 Continue URI를 `<website-url>/validateUserId`로 지정해요. 런타임에서는 Token Vault 확인 → 동의 → `/validateUserId` 검증과 FinalizeCredentials 저장 → 같은 세션에서 질의 재시도로 이어지고, 이후 질의에는 팝업이 필요 없어요.

저장소는 패턴별 스크립트(`01_user_auth_streamassist/`), 커넥터 흐름 도구(`02_federated_connector_oauth/`), ADK 멀티 에이전트 코드(`03_adk_agent_oauth/`)로 나뉘어 있어요. 정확한 STS 파라미터나 토큰 대상, 전체 스코프 목록은 글에 없어서 저장소를 봐야 해요.
