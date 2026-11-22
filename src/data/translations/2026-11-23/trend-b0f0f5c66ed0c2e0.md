---
id: trend-b0f0f5c66ed0c2e0
title: "GoogleChrome/lighthouse"
sourceUrl: https://github.com/GoogleChrome/lighthouse
summary: "Lighthouse는 웹 앱과 웹 페이지를 분석해 최신 성능 지표와 개발 모범 사례 점검 결과를 모아 주는 구글 크롬 팀의 도구예요. Chrome DevTools, 크롬 확장, Node CLI, Node 모듈로 쓸 수 있고 Node 22 이상이 필요해요."
translationStatus: partial
translatedBy: Claude
translatedAt: 2026-11-23
---

저장소 README 앞부분(사용 방법과 CLI 옵션 일부)을 바탕으로 옮겼어요. README가 매우 길어 개발·FAQ 절은 수집 길이 제한으로 읽지 못했어요.

### 무엇인가

Lighthouse는 웹 앱과 웹 페이지를 분석해 최신 성능 지표와 개발자 모범 사례에 대한 인사이트를 모아 주는 도구예요.

### 쓰는 방법

- **Chrome DevTools**: 크롬에 기본으로 들어 있어요. DevTools를 열고 'Lighthouse' 패널에서 'Generate report'를 누르면 돼요.
- **크롬 확장**: DevTools에 들어오기 전부터 있던 방식으로, 비슷한 기능을 제공해요. 크롬 웹 스토어에서 설치해요.
- **Node CLI**: 설정과 보고 방식을 가장 유연하게 바꿀 수 있어, 고급 사용이나 자동화에 권장돼요. Node 22(LTS) 이상이 필요하고 `npm install -g lighthouse`로 설치한 뒤 `lighthouse <url>`로 실행해요. 기본으로 HTML 파일 보고서를 쓰고, 플래그로 출력 형식을 바꿀 수 있어요.
- **Node 모듈**: 프로그램 안에서 불러 쓰는 방식도 있어요.

### CLI 옵션(일부)

- 로그: `--verbose`(자세한 로그), `--quiet`(진행·디버그·오류 출력 안 함)
- 설정: `--save-assets`(트레이스와 DevTools 로그 저장), `--list-all-audits`(모든 감사 항목 출력), `--list-trace-categories`, `--additional-trace-categories`
- `--config-path`(설정 JSON 경로), `--preset`(perf, experimental, desktop 중 내장 설정 선택, 설정 파일이 있으면 무시됨)
- `--chrome-flags`(크롬에 넘길 플래그). `CHROME_PATH` 환경 변수로 특정 크롬 바이너리를 쓸 수 있고, Chromium 66 이상이 필요해요.

README 목차에는 보고서 온라인 뷰어, 개발 환경 설정·테스트, 성능 서비스 통합, 플러그인, 그리고 "결과가 원격 서버로 보내지나요?", "네트워크 스로틀링은 어떻게 하나요?" 같은 FAQ가 있어요.
