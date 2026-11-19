---
id: trend-04eacb7aeafbe77d
title: "Breakthrough/PySceneDetect"
sourceUrl: https://github.com/Breakthrough/PySceneDetect
summary: "PySceneDetect는 Python과 OpenCV 기반의 영상 장면 전환(컷) 감지 도구이자 라이브러리예요. 명령 한 줄로 컷마다 영상을 나누거나 프레임을 저장하고, Python API로 장면 목록을 얻어 파이프라인에 넣을 수 있어요. 최신 릴리스는 v0.7.3(2026년 11월 8일)이에요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

GitHub 저장소 Breakthrough/PySceneDetect의 README 전체를 읽고 정리했어요. BSD 3-Clause 라이선스이고, 읽은 시점 기준 스타 약 5.6천 개였어요.

### 무엇인가

PySceneDetect는 영상의 컷과 장면 전환을 찾아내는 분석 도구예요. 최신 릴리스는 v0.7.3(2026년 11월 8일)이고, `pip install scenedetect --upgrade`로 설치해요. 영상 분할에는 ffmpeg 또는 mkvmerge가 필요해요. Windows용 MSI 설치본·포터블 ZIP, 모든 의존성이 들어 있는 Docker 이미지(ghcr.io/breakthrough/pyscenedetect)도 있어요.

### 명령줄로 시작하기

- 빠른 컷마다 영상 분할(ffmpeg 사용): `scenedetect -i video.mp4 split-video`
- 컷마다 프레임 몇 장 저장: `scenedetect -i video.mp4 save-images`
- 처음 10초 건너뛰기: `scenedetect -i video.mp4 time -s 10s`
- Docker에서는 영상 폴더를 마운트해 같은 명령을 그대로 써요.

### Python API

- `from scenedetect import detect, ContentDetector` 후 `detect("my_video.mp4", ContentDetector())`를 부르면 모든 장면의 시작·끝 시간 목록이 나와요.
- 카메라가 빠르게 움직이는 영상에 강한 2패스 방식 `AdaptiveDetector`, 페이드 아웃·인을 다루는 `ThresholdDetector`도 있어요.
- 각 장면의 타임코드와 프레임 번호를 출력하거나, `split_video_ffmpeg`로 장면별로 영상을 자를 수 있어요(mkvmerge도 지원).
- 고급 사용에선 `open_video`, `SceneManager`, 감지기(예: threshold 27.0의 ContentDetector)를 직접 조합해 진행 표시와 함께 장면을 감지하고 분할할 수 있어요. API는 설정 폭이 넓어 어떤 파이프라인에도 붙일 수 있다고 해요.

### 벤치마크와 개발

- 감지기별 정확도와 처리 속도를 평가한 벤치마크 결과를 공식 사이트에 공개해요.
- 버그·기능 요청은 이슈 트래커에, 도움은 Discord에서 받아요.
- 개발 환경: 가상환경에서 `pip install -e ".[dev]"`를 하고, resources 브랜치의 테스트 영상을 tests/resources로 가져와 pytest를 돌려요. 전체 테스트엔 ffmpeg와 mkvmerge가 필요하고, ffmpeg가 PATH에 없으면 imageio-ffmpeg에 들어 있는 것을 써요.
- SignPath.io와 SignPath Foundation의 무료 코드 서명을 사용해요.
