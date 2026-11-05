---
id: trend-cf20b53c936d12a3
title: "goauthentik/authentik"
sourceUrl: https://github.com/goauthentik/authentik
summary: "authentik은 셀프 호스팅용 오픈소스 ID 공급자(IdP)예요. SAML, OAuth2/OIDC, LDAP, RADIUS 등을 지원하는 SSO 도구로, 소규모 실험실부터 대형 운영 클러스터까지 쓸 수 있게 설계됐어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

GitHub README 전문을 읽고 정리했어요.

### 무엇인가요
authentik은 "필요한 인증 접착제(The authentication glue you need)"를 표방하는 오픈소스 **ID 공급자(Identity Provider, IdP)**예요. 현대적인 SSO(통합 로그인)를 위해 SAML, OAuth2/OIDC, LDAP, RADIUS 등을 지원하고, 작은 홈랩부터 큰 운영 클러스터까지 직접 호스팅하도록 설계됐어요.

기업용 상품도 있어서, 조직이 Okta, Auth0, Entra ID, Ping Identity 같은 기존 IdP를 대체해 대규모 ID 관리를 안전하게 할 수 있게 한대요.

### 설치 방법
- **Docker Compose**: 소규모·테스트 환경에 권장
- **쿠버네티스(Helm 차트)**: 큰 환경에 권장
- **AWS CloudFormation**: 공식 템플릿으로 AWS에 배포
- **DigitalOcean Marketplace**: 공식 마켓플레이스 앱으로 원클릭 배포

### 개발·기여
로컬 빌드 환경 구성, 테스트, 기여 절차는 개발자 문서를 보라고 해요. 문서를 기여할 땐 문서 스타일 가이드를 따라 달라고 해요. 보안 관련 내용은 SECURITY.md에 있고, 사용 중이라면 hello@goauthentik.io나 GitHub 이슈/PR로 사례를 알려 달래요.

### 기본 정보
저장소 주제로 인증, 인가, 쿠버네티스, OAuth2, OIDC, 프록시, 리버스 프록시, SAML, 보안, SSO가 붙어 있어요. 라이트·다크 테마 스크린샷이 있고, 수집 시점 기준 스타 약 2.6만 개, 포크 약 2,100개예요.
