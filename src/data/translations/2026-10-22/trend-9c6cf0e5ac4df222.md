---
id: trend-9c6cf0e5ac4df222
title: "LiteLLM 1.107.0 PyPI 패키지에 인증 정보 탈취 악성코드와 백도어 삽입"
sourceUrl: https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor
summary: "PyPI의 LiteLLM 1.107.0에 Python이 시작될 때마다 실행되는 자격 증명 탈취기(.pth)와 sitecustomize.py 백도어가 들어 있었어요. Docker 이미지 일부도 오염됐고, 1.106.2와 rc1·rc2는 깨끗해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> SafeDep 글 앞부분(영향 범위, 공격 동작, 침투 경로 시작)을 기준으로 옮겼어요. IoC 목록 전체는 원문을 확인하세요.

### 요약

PyPI에 올라온 **LiteLLM 1.107.0**에 자격 증명 탈취기와 원격 코드 실행 백도어가 들어 있었어요. Linux·macOS·Windows용 휠 7개 모두가 `site-packages`에 파일 3개를 설치하고, 그중 둘은 **litellm을 import하지 않는 Python 프로세스여도 시작될 때마다** 실행돼요. 업스트림 GitHub 소스에는 이 코드가 없어요.

### 영향 범위

- LiteLLM은 사고 보고서로 침해를 확인하고 조치 방법을 안내했어요.
- PyPI는 2026-10-21 13:23 UTC(한국 시간 22:23)까지 해당 릴리스를 내렸어요.
- Docker Hub와 GHCR의 `v1.107.0`, `latest`, `main-latest`, `main-stable` 이미지도 11:46~14:20 UTC(한국 시간 20:46~23:20)에 악성 코드를 담고 있었어요.
- **1.106.2, 1.107.0rc1, 1.107.0rc2는 깨끗해요.** 1.107.0이 고정한 `litellm-proxy-extras==0.4.110`, `litellm-enterprise==0.1.78`도 깨끗해요.

### 공격 동작

- `cook.pth`가 `cook.py`를 import해요. 이게 탈취기예요. SSH 키, 클라우드 자격 증명, CI/CD 시크릿, AI 도구 토큰, 브라우저 비밀번호, LiteLLM 프록시 DB의 LLM 제공자 키를 모아 암호화한 뒤 `www.litellm[.]dev`로 보내요.
- `sitecustomize.py`는 백그라운드 데몬을 띄워요. 매시간 GitHub 파일에서 서버 주소를 읽고, 탈취기를 다시 돌리고, 그 서버에서 코드를 받아 실행해요.

### 어떻게 들어갔나

1.107.0 소스 배포본(sdist)의 `pyproject.toml`에서 maturin 빌드 섹션에 한 줄이 더 있었어요.

```toml
[tool.maturin]
python-source = "."
data = "cook"   # <-- 주입된 줄
```

이 설정 때문에 `cook` 디렉터리의 파일이 휠에 데이터로 실려 설치 때 `site-packages`에 깔린 거예요. 해당 버전을 설치한 적이 있다면 LiteLLM 사고 보고서의 조치를 따르고 노출됐을 수 있는 키를 모두 교체하는 게 좋아요.
