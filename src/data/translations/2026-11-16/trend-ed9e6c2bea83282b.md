---
id: trend-ed9e6c2bea83282b
title: "f3d-app/f3d"
sourceUrl: https://github.com/f3d-app/f3d
summary: "glTF, USD, STL, STEP, OBJ, FBX 등 많은 포맷을 여는 빠르고 미니멀한 3D 뷰어 F3D예요. 명령줄로 완전히 제어되고 썸네일 생성, PBR·레이트레이싱을 지원하며, C++17 라이브러리 libf3d에 파이썬·자바스크립트 등 바인딩도 있어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

GitHub 저장소 README를 끝까지 읽고 정리했어요.

### 무엇인가

**F3D**('페드'로 읽어요)는 **빠르고 미니멀한 데스크톱 3D 뷰어**예요. 디지털 콘텐츠부터 과학 데이터셋까지 다양한 포맷을 지원해요. glTF, USD, STL, STEP, PLY, OBJ, FBX, Alembic 등이에요. 애니메이션 재생, 썸네일 생성, 실시간 물리 기반 렌더링(PBR)과 레이트레이싱 같은 렌더링·텍스처 옵션도 있어요. 브라우저에서 바로 써 볼 수도 있어요.

### 쓰는 법

- **명령줄로 완전히 제어**할 수 있고 설정 파일을 지원해요. 단축키, 드래그 앤 드롭, 파일 관리자 통합도 돼요.
- 터미널에서 `f3d` 명령으로 파일을 열고, `--output=/path/to/img.png`를 붙이면 렌더링 결과를 이미지로 저장해요.

### libf3d

메시를 렌더링하는 간단한 라이브러리 **libf3d**가 들어 있어요. C++17 API에 C, 파이썬, 자바, 자바스크립트 바인딩을 제공해요.

### 목표

- 가능한 한 많은 3D 포맷 지원
- 텍스처, 엣지 등 여러 렌더링과 메시·볼륨·포인트 스프라이트 시각화
- 좋은 기본값으로 누구나 빠르게 모델 보기
- 명령줄·설정 파일로 완전 제어, 적은 의존성으로 빌드되는 모듈 구조
- 메뉴와 버튼이 있는 고전적인 마우스 UI

### AI 정책과 출처

- README는 메인테이너 부담을 줄이려고 F3D가 **'AI 친화적인 프로젝트가 아니라고'** 밝히고, 생성형 AI를 쓸 땐 AI 정책을 꼼꼼히 확인하라고 해요.
- 처음엔 Kitware SAS의 Joachim Pouderoux, Michael Migliore, Mathieu Westphal이 만들었고 VTK, OCCT, Assimp, OpenUSD, OpenVDB, ImGui 등 오픈소스에 기대요.
- 라이선스는 **3-Clause BSD**예요.
