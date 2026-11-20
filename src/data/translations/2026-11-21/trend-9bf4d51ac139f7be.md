---
id: trend-9bf4d51ac139f7be
title: "grokability/snipe-it"
sourceUrl: https://github.com/grokability/snipe-it
summary: "Snipe-IT는 누가 어떤 노트북을 쓰는지, 소프트웨어 라이선스 등을 관리하는 오픈소스 IT 자산 관리 웹앱이에요. 25개 MDM·RMM 동기화 어댑터와 Claude·ChatGPT가 재고를 조회·수정할 수 있는 MCP 서버를 내장했어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

grokability/snipe-it 깃허브 README 앞부분(소개, 기능, 동기화 어댑터, MCP 서버, 라이브 데모)을 읽고 옮겼어요. 설치·업그레이드 등 뒷부분은 읽지 못했어요.

### 무엇인가

- IT 운영의 자산 관리를 위한 FOSS 프로젝트예요. 누가 어떤 노트북을 갖고 있는지, 감가상각을 제대로 하려면 언제 샀는지, 소프트웨어 라이선스 처리 같은 일을 다뤄요.
- 활발히 개발되고 릴리스도 잦다고 해요.
- 웹 기반 소프트웨어라 실행 파일(.exe)이 없고, 웹 서버에서 돌려 브라우저로 접속해요. macOS, 모든 리눅스, Windows에서 돌아가고 Docker 이미지도 있어요.

### 주요 기능

- 모바일 친화적이라 이동 중에도 자산 정보를 고칠 수 있어요.
- 체크인·체크아웃 때 Slack/Teams 알림, 빠른 대여용 사전 정의 '키트'
- SAML SSO, Active Directory/LDAP 로그인·사용자 동기화, Google Secure LDAP, SCIM 자동 프로비저닝
- 세분화된 권한의 역할 그룹, 사용자 간 쉬운 이전, 수령 시 선택적 전자서명
- 견고한 JSON REST API, CSV 가져오기, 원클릭(또는 cron) 백업
- 55개 넘는 언어 번역과 사용자별 언어·라이트/다크 모드
- 한 설치에서 여러 회사 지원, JAMF 연동(Jamf2Snipe 또는 Jira)
- 새 기능: 네이티브 MDM/RMM 동기화 어댑터, 캘린더 보기, 네이티브 MCP 서버

### 동기화 어댑터

25개(계속 늘어나는 중)의 동기화 어댑터로 MDM·RMM 시스템과 데이터를 맞춰요. Apple Business Manager, Jamf Pro, Microsoft Intune, Google Workspace(ChromeOS), JumpCloud, Kandji(Iru), NinjaOne, Omnissa Workspace ONE, Meraki Systems Manager, Sophos Central, UniFi 등이 있어요.

### MCP 서버

README는 MCP를 재고 시스템 관리용 프로토콜이라고 설명하며, Snipe-IT에 내장된 MCP 서버로 Claude나 ChatGPT 같은 시스템이 Snipe-IT 재고 데이터를 실시간으로 조회·수정할 수 있다고 해요.

### 라이브 데모

가입 없이 공개 샌드박스를 써 볼 수 있어요. 안정 릴리스는 demo.snipeitapp.com, 미공개 기능 미리보기는 develop.snipeitapp.com이에요.
