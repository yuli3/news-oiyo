---
id: trend-1ce98aa8c35a034b
title: "psf/black"
sourceUrl: https://github.com/psf/black
summary: "Black은 '타협하지 않는' Python 코드 포매터예요. 손으로 하는 세세한 서식 결정을 넘기는 대신 속도, 결정성, 최소한의 diff를 준다고 해요. Python 3.10 이상이 필요해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> GitHub 트렌딩에 오른 저장소예요. README 앞부분을 기준으로 옮겼어요.

### 무엇인가

> 원하는 색은 뭐든 돼요(검은색이기만 하면). — "Any color you like."

**Black**은 **타협하지 않는 Python 코드 포매터**예요. Black을 쓰면 손으로 하던 서식의 세세한 부분에 대한 통제권을 넘기는 데 동의하는 셈이에요. 그 대가로 이런 걸 얻어요.

- **속도**와 **결정성(determinism)**
- pycodestyle이 서식 문제로 잔소리하는 데서 벗어나는 자유
- 더 중요한 일에 쓸 시간과 정신력

### 왜 쓰나

- Black으로 정리된 코드는 어떤 프로젝트에서 읽든 **똑같이 생겼어요.** 시간이 지나면 서식은 눈에 안 들어오고 내용에 집중할 수 있어요.
- **가능한 가장 작은 diff**를 만들어 코드 리뷰가 빨라져요.
- 더 알고 싶으면 PyCon 2019 발표를 보라고 해요. 문서는 ReadTheDocs에 있어요.

### 설치와 사용

```
pip install black
```

- **Python 3.10 이상**이 필요해요.
- Jupyter 노트북도 포맷하려면 `pip install "black[jupyter]"`로 설치해요.

이후 사용법(명령줄 옵션, 설정 파일, 에디터 연동)은 README 뒷부분에 이어지는데 다 읽지 못했어요.
