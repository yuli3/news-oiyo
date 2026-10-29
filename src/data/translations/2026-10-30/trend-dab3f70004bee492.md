---
id: trend-dab3f70004bee492
title: "SafeAgents: an open-source proxy that checks every tool call your coding agent makes before it runs"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xii45s/safeagents_an_opensource_proxy_that_checks_every
summary: SafeAgents는 코딩 에이전트와 모델 서버 사이에 놓여 모델이 낸 도구 호출을 실행 전에 검사하는 오픈소스 로컬 프록시예요. 걸린 호출은 짧은 텍스트 안내로 바꿔 아무것도 실행되지 않게 해요.
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

Reddit은 API 키 없이 읽지 않고 Wayback 스냅샷도 없어 원문 페이지를 열지 못했어요. 수집기가 받은 RSS 본문(게시물 앞부분)을 기준으로 옮겼어요. 저장소 링크와 댓글은 확인하지 못했어요.

### 어떻게 동작하나요

SafeAgents는 코딩 에이전트와 모델 서버 사이에 있는 작은 **로컬 프록시**예요. 모델 응답에 든 도구 호출을 하네스가 받기 전에 검사하고, 걸린 호출은 짧은 텍스트 안내로 바꿔요. 그러면 하네스는 평범한 텍스트 답을 받고 아무것도 실행하지 않아요. 에이전트의 base URL을 모델 서버 대신 프록시로 바꾸기만 하면 돼요.

모든 검사는 내 컴퓨터에서 돌아요. 프록시는 원래 쓰던 모델 서버로만 트래픽을 넘기고, 선택 기능인 판정 모델을 원격 서버로 지정하지 않는 한 프롬프트, 코드, 도구 호출을 다른 곳으로 보내지 않는대요.

### 세 가지 검사

1. **요청만으로 하는 로컬 검사 두 가지**: 그 도구가 하네스에 선언된 것인지, 그리고 호출이 대화 어디에도 나오지 않은 호스트에 접속하는지 봐요. 모델 자신의 이전 답변은 출처로 치지 않아서, 모델이 혼자 지어낸 URL은 걸려요.
2. **atif-scan**: u/evalstate가 만든 도구로, 대기 중인 호출에 결정론적 탐지기 약 110개를 모델이나 네트워크 호출 없이 프로세스 안에서 돌려요. 샌드박스 사이드채널, 프록시·네트워크 우회, 네임스페이스 탈출, 보상 해킹을 잡아요. 예로 클라우드 메타데이터 엔드포인트로의 curl, `~/.netrc`를 어딘가로 보내는 `curl --noproxy`, `/proc/1/environ` 읽기를 들어요.
3. **선택 기능: 판정 모델**: 덜 명확한 경우를 위해 OpenAI 호환 서버라면 무엇이든(llama.cpp로 돌리는 내 컴퓨터의 작은 모델도) 쓸 수 있고, 허용·차단을 JSON으로 답해요.
