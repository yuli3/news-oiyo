---
id: trend-a0b5d03b0a2cbda5
title: "DeepSeek V4.1 Flash 1017 Support for ds4 · PR #1225 · antirez/ds4"
sourceUrl: "https://github.com/antirez/ds4/pull/1225"
summary: "antirez/ds4에 DeepSeek V4.1 Flash 1017을 지원하는 PR이 올라왔어요. 1017은 설정·텐서·토크나이저가 기존 체크포인트와 같고 가중치만 바뀌었는데, ds4가 비전 GGUF를 고정 해시로 검사해 올바른 1017 파일을 거부하던 문제를 같은 리비전인지 비교하도록 고쳐요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

GitHub PR #1225(nazeshinjite, 2026-10-17) 본문의 문제·변경·테스트 앞부분을 읽고 옮겼어요. 테스트 결과 뒷부분과 리뷰 대화는 읽지 못했어요.

### 문제
- DeepSeek이 두 번째 V4.1 Flash 체크포인트 **DeepSeek-V4.1-Flash-1017(리비전 `1bae0e10`)**을 냈어요. ds4가 지원하는 기존 체크포인트(`df42c109`)와 설정, 텐서 목록, 토크나이저, Engram 코드가 같고 **가중치만 바뀌었어요(비전 타워 포함).**
- ds4는 V4.1 체크포인트가 하나뿐이라고 가정한 곳이 두 군데 있었어요.

| 위치 | 문제 |
|---|---|
| 런타임 | 비전 GGUF가 `df42c109`에서 왔는지 고정 해시로 검사해서, 제대로 만든 1017 비전 파일은 거부하고 옛 비전 파일은 1017 모델 옆에서 아무 경고 없이 로드됨. 오류 메시지는 "언어 모델과 맞아야 한다"고 하는데 실제로는 고정값과 비교 |
| 변환기 | `deepseek41_metadata.py`, `deepseek41_vision.py`가 모델 이름·URL(비전은 리비전까지)을 하드코딩해 1017을 변환하면 새 리비전에 옛 URL이 붙고 비전 파일엔 `df42c109`가 찍힘 |

### 바뀌는 것
- ds4가 특정 리비전이 아니라 **비전 GGUF와 언어 GGUF가 같은 리비전인지** 확인해요. V4 Vision-Exp는 기존 고정을 유지해요.
- `deepseek41_metadata.py`에 공개된 리비전별 이름·URL 표(`CHECKPOINTS`)를 두고 두 변환기가 이를 써요. 표에 없는 리비전은 엉뚱한 URL을 붙이지 않고 거부해요.
- `deepseek41_vision.py`에 `--source-revision` 플래그(기본 `df42c109`)를 추가해요.
- 기존 파일엔 영향이 없고, 양자화 레시피·텐서 형식·파일 배치도 그대로예요. 아직 공개된 1017 GGUF가 없어 다운로드 스크립트와 문서는 건드리지 않았어요.
- 1017 변환은 평소 명령에 `--source-revision 1bae0e1088993b9b82de08f59de5be5a34e42170`을 붙이면 돼요.

### 테스트 (읽은 부분)
M5 Max MacBook Pro 128GB, macOS 26, Metal에서 `main`(fc80bd6)과 PR을 비교했어요. 빌드는 경고 없이 됐고 변환·비전 변환 테스트가 통과했어요. 실제 가중치 없이 진짜 헤더만 담은 희소 테스트 GGUF를 공개된 Q2(365,713,686,528바이트)·Vision(970,555,552바이트) 파일과 같은 크기로 만들어 런타임 검사를 시험했어요.
