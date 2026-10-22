---
id: trend-cad8c891ebb17f17
title: "OpenAI CLI"
sourceUrl: https://github.com/openai/openai-cli
summary: "OpenAI가 REST API용 공식 CLI 'openai'를 공개했어요. Homebrew나 Go로 설치하고, 이미지 생성 피커용 탭 단축키와 7일 주기 업데이트 알림 같은 편의 기능이 들어 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> GitHub README 앞부분(설치·업데이트 알림)을 기준으로 옮겼어요. 명령별 상세 문서는 다 읽지 못했어요.

### 무엇인가

`openai/openai-cli`는 **OpenAI REST API의 공식 CLI**예요. 저장소는 Go로 되어 있고 커밋이 559개 쌓여 있어요.

### 설치

Homebrew:

```
brew install openai/tools/openai
```

Go(1.26 이상 필요):

```
go install 'github.com/openai/openai-cli/cmd/openai@latest'
```

`go install`로 설치하면 바이너리는 기본적으로 `$HOME/go/bin`(GOPATH가 있으면 `$GOPATH/bin`)에 들어가요. 명령을 못 찾으면 셸 프로필에 `export PATH="$PATH:$(go env GOPATH)/bin"`을 추가하라고 안내해요.

### 이미지 피커 단축키

처음으로 조건에 맞는 대화형 `openai` 실행을 하면, Bash·zsh·fish 세션에서 쓸 **이미지 피커용 Tab 단축키**를 조용히 저장해요. 새 터미널을 열어야 적용돼요. 끄는 방법과 요구 사항은 별도 문서에 있어요. PowerShell은 일반 Tab 완성을 유지하고, `openai images generate` 뒤에 Enter를 누르면 피커가 열려요.

### 업데이트 알림

- 인자 없이 `openai`만 실행하고 stdin·stdout·stderr가 모두 터미널일 때만 새 안정 버전을 확인해요.
- 알림은 도움말 아래 평문으로, **최대 7일에 한 번** 붙어요.
- 명시적 help, 일반 명령, completion, CI, 리다이렉트된 스트림에서는 확인 자체를 건너뛰어요.
- 설치 방식을 검증할 수 있으면 업데이트 명령을 같이 보여 줘요. Homebrew는 `brew upgrade --cask openai/tools/openai`, Go는 검증된 바이너리·Go 명령·일치하는 `GOBIN`이 있을 때만이에요. GOOS/GOARCH를 바꿨거나 메이저 버전 2 이상으로 올라갈 때는 설치 가이드로 안내해요.
