---
id: trend-df33864b4dd408a2
title: "elastic/detection-rules (GitHub Trending)"
sourceUrl: https://github.com/elastic/detection-rules
summary: "elastic/detection-rules는 Elastic Security 탐지 엔진이 쓰는 탐지 규칙의 공식 저장소예요. 규칙 파일뿐 아니라 규칙 생성·검증·테스트·Kibana 연동을 위한 Python CLI로 'Detections-as-code' 파이프라인을 만들 수 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-23
---

> GitHub README를 기준으로 옮겼어요. 설치 출력 예시와 일부 CLI 명령 목록은 줄였어요.

### 무엇인가요

**Detection Rules**는 **Elastic Security**가 쓰는 규칙의 본거지예요. Elastic Security 탐지 엔진(Detection Engine)용 규칙을 개발, 유지보수, 테스트, 검증, 배포하는 데 쓰여요. 처음엔 Elastic 블로그 글 "Elastic Security opens public detection rules repo"로 공개됐어요.

### 저장소 구성

정적인 규칙 파일만 있는 게 아니에요. **Detections-as-code** 파이프라인 구축, Python 단위 테스트, Kibana 탐지 엔진 연동 코드도 함께 있어요.

- 규칙 파싱·검증·패키징용 Python 모듈
- ECS·Beats 스키마 등 기타 파일
- 위협 헌팅(threat hunting) 패키지와 쿼리
- Kibana·탐지 엔진 API 호출 라이브러리, KQL 파싱·검증 라이브러리
- 규칙과 빌딩 블록(building block) 규칙 디렉터리, 규칙 단위 테스트

### 시작하기

`.toml` 파일을 손으로 만들 수도 있지만 권장하지 않아요. Python **3.12 이상**에서 makefile이나 pip로 의존성을 설치하고, `kibana`·`kql` 패키지는 PyPI에 없어서 저장소의 `lib` 디렉터리에서 설치해요.

```bash
pip3 install lib/kibana lib/kql
python -m detection_rules --help
```

CLI에는 규칙 생성·가져오기(`import-rules-to-repo`), Kibana 연동(`kibana`), EQL 결과로 일괄 수정(`mass-update`), KQL/EQL로 규칙 찾기(`rule-search`), 전체 테스트(`test`), 스키마 검증(`validate-all`, `validate-rule`), 타이포스쿼팅 탐지 생성(`typosquat`) 같은 명령이 있어요.

### 라이선스

규칙과 코드 전부 **Elastic License v2**예요. Elastic Cloud나 무료 기능이 포함된 기본 배포판을 쓰면 탐지 엔진을 처음 열 때 최신 규칙을 받아요. 공격 기법을 흉내 내 규칙을 검증하는 Red Team Automations(RTA)는 별도 저장소에 있어요.
