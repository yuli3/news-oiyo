---
id: trend-df33864b4dd408a2
title: "elastic/detection-rules (GitHub Trending)"
sourceUrl: https://github.com/elastic/detection-rules
summary: "Elastic Security 탐지 엔진에서 쓰는 탐지 규칙을 개발·테스트·검증·배포하는 공식 저장소예요. 규칙 파일뿐 아니라 '코드로서의 탐지(DaC)' 파이프라인, Python 단위 테스트, Kibana 연동 도구가 함께 들어 있어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-22
---

elastic/detection-rules 깃허브 README 전체를 읽고 옮겼어요.

### 무엇인가

Elastic Security가 쓰는 탐지 규칙의 본거지예요. Elastic Security 탐지 엔진용 규칙의 개발, 유지보수, 테스트, 검증, 배포를 이 저장소에서 해요. Elastic 블로그 글 "Elastic Security opens public detection rules repo"로 처음 공개됐어요.

### 저장소 구성

정적인 규칙 파일만 있는 게 아니라 '코드로서의 탐지(Detections-as-Code)' 파이프라인, Python 단위 테스트, Kibana 탐지 엔진 연동 코드도 있어요.

- `detection_rules/`: 규칙 파싱·검증·패키징 Python 모듈
- `hunting/`: 위협 헌팅 패키지와 쿼리
- `kibana/`: Kibana와 탐지 엔진 API 호출 라이브러리
- `kql/`: Kibana Query Language 파싱·검증 라이브러리
- `rules/`, `rules_building_block/`: 규칙과 빌딩 블록 규칙
- `tests/`: 규칙 단위 테스트

### 시작하기

`.toml` 파일을 직접 만들어도 되지만 권장하지 않아요. Python 3.12 이상에서 `make`나 `pip3 install ".[dev]"`로 의존성을 설치하고, PyPI에 없는 kibana·kql 패키지는 `lib` 디렉터리에서 설치해요. CLI에는 `create-rule`, `export-rules-from-repo`, `import-rules-to-repo`, `rule-search`(KQL·EQL로 규칙 검색), `test`, `validate-all`, `typosquat`(타이포스쿼팅 탐지 생성) 같은 명령이 있어요.

### 기여와 라이선스

- 기여 가이드는 탐지 아이디어를 프로덕션 규칙으로 바꾸고 테스트로 검증하는 과정을 설명해요. 공격 기법을 흉내 내 규칙을 검증하는 Red Team Automations(RTA)는 별도 위치에 있어요.
- 규칙과 코드 모두 Elastic License v2예요. MIT·Apache 2.0 규칙도 재라이선스가 허용되면 받아들이고, 기여자는 CLA에 서명해야 해요.
- 이 저장소에는 아직 릴리스되지 않은 새 규칙도 들어 있어요. 오탐이나 버그는 깃허브 이슈로 알려 달라고 해요.
