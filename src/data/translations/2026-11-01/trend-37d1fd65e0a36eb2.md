---
id: trend-37d1fd65e0a36eb2
title: "paperless-ngx/paperless-ngx"
sourceUrl: https://github.com/paperless-ngx/paperless-ngx
summary: "Paperless-ngx는 종이 문서를 스캔·색인해 검색 가능한 온라인 아카이브로 만드는 커뮤니티 문서 관리 시스템이에요. Paperless·Paperless-ng의 공식 후속작이고 docker compose로 배포하며, 암호화 없이 저장하니 믿을 만한 호스트에서만 돌리라고 강조해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

GitHub README 전체를 읽고 옮겼어요.

### 무엇인가

**Paperless-ngx**는 실물 문서를 **검색 가능한 온라인 아카이브**로 바꿔 주는 문서 관리 시스템이에요. 이름처럼 "종이를 덜(less paper)" 쓰게 해 주는 게 목표예요. 원래 Paperless와 Paperless-ng 프로젝트의 **공식 후속작**이고, 프로젝트를 발전시키고 지원하는 책임을 한 사람이 아니라 여러 사람의 팀으로 나누도록 설계됐어요.

Fyra Stack의 지원으로 demo.paperless-ngx.com에서 데모(아이디·비밀번호 demo)를 써 볼 수 있어요. 데모 내용은 자주 초기화되니 기밀 정보는 올리지 말라고 해요. 전체 기능과 스크린숏은 문서(docs.paperless-ngx.com)에 있어요.

### 시작하기

- 가장 쉬운 배포 방법은 **docker compose**예요. `/docker/compose` 폴더의 파일이 GitHub 컨테이너 레지스트리에서 이미지를 받아요.
- 설치 스크립트(`install-paperless-ngx.sh`)로 docker compose 환경을 바로 구성할 수도 있어요.
- Paperless-ng에서 옮기는 건 새 도커 이미지로 바꾸기만 하면 된다고 해요.

### 참여

- 버그 수정, 기능 개선, 화면 수정 등 기여를 환영하고, 큰 기능은 먼저 토론을 열어 달라고 해요.
- 프론트엔드, CI/CD 등 여러 팀이 있고 GitHub와 Matrix 방에서 소통해요.
- 번역은 Crowdin에서 조율하고, 기능 요청은 GitHub Discussions에서 투표로 모아요.

### 중요한 주의

문서 스캐너로는 보통 주민번호, 세금 기록, 청구서 같은 **민감한 문서**를 스캔해요. Paperless-ngx는 정보를 **암호화 없이 평문으로** 저장하므로 **믿을 수 없는 호스트에서 절대 돌리지 말라**고 해요. 보안은 보장하지 않으며(노력은 한다고 해요) 사용 책임은 본인에게 있어요. 가장 안전한 방법은 **백업을 갖춘 집 안의 로컬 서버**에서 돌리는 거예요.

GPL-3.0 라이선스이고, 저장소 주제에는 ai, llm, ocr, django, angular 등이 있으며 스타는 약 4.75만 개예요.
