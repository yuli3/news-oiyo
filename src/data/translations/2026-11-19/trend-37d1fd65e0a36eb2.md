---
id: trend-37d1fd65e0a36eb2
title: "paperless-ngx/paperless-ngx"
sourceUrl: https://github.com/paperless-ngx/paperless-ngx
summary: "페이퍼리스-ngx는 종이 문서를 검색 가능한 온라인 보관함으로 바꾸는 문서 관리 시스템이고, 원래 페이퍼리스와 페이퍼리스-ng의 공식 후속작이에요. 문서는 암호화 없이 평문으로 저장되니 신뢰할 수 없는 호스트에서 돌리지 말라고 해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-19
---

paperless-ngx/paperless-ngx 저장소 README를 끝까지 읽었어요. 스타 수는 이 수집본에 없어 적지 않았어요.

페이퍼리스-ngx는 실제 종이 문서를 검색 가능한 온라인 보관함으로 바꿔, 종이를 덜 남기게 하는 문서 관리 시스템이라고 해요. 원래 페이퍼리스와 페이퍼리스-ng 프로젝트의 공식 후속작이고, 발전과 지원 책임을 여러 사람이 나누도록 설계됐으며 팀 합류를 권한다고 해요. Fyra Stack이 데모를 https://demo.paperless-ngx.com 에서 제공하고, 로그인은 demo / demo이며, 데모 내용은 자주 초기화되니 비밀 정보는 올리지 말라고 해요.

기능과 스크린샷의 전체 목록은 https://docs.paperless-ngx.com 문서에 있다고 안내해요. 가장 쉬운 배포는 도커 컴포즈이고, docker/compose 디렉터리 파일이 깃허브 컨테이너 레지스트리 이미지를 끌어오도록 설정돼 있어요. 설치 스크립트 `bash -c "$(curl -L https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/main/install-paperless-ngx.sh)"`로 컴포즈 환경을 구성할 수 있고, 다른 설치 방법은 문서의 설치 안내에 있다고 해요. 페이퍼리스-ng에서 옮기기는 새 도커 이미지만 넣으면 되고, 마이그레이션 문서가 있다고 해요.

기여는 버그 수정, 개선, 시각 수정 등을 환영하고, 큰 기능은 먼저 논의를 시작하라고 해요. 커뮤니티 지원은 깃허브와 매트릭스 방(#paperless:matrix.org, 배지 링크는 #paperlessngx:matrix.org)이며, 프론트엔드, CI/CD 등 팀이 있다고 해요. 번역은 Crowdin(https://crowdin.com/project/paperless-ngx)에서 조정하고, 기능 요청은 깃허브 토론, 버그는 이슈나 토론이라고 해요. 관련 프로젝트는 위키의 사용자 유지 목록을 보라고 해요.

중요한 주의로, 문서 스캐너는 사회보험번호, 세금 기록, 청구서 같은 민감한 문서를 쓰는 경우가 많아, 정보가 암호화 없이 평문으로 저장되므로 신뢰할 수 없는 호스트에서 절대 실행하지 말라고 해요. 보안에 대한 보장은 하지 않으며(노력한다고는 해요) 사용 책임은 이용자에게 있고, 가장 안전한 방법은 집에 있는 로컬 서버에서 백업을 갖추고 실행하는 것이라고 못 박아요.
