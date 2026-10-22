---
id: trend-3eed0a2392d2330a
title: "Embedding EYG in Erlang programs"
sourceUrl: https://eyg.run/guides/embedding-eyg-in-erlang-programs
summary: "EYG 공식 가이드가 Erlang 앱에 EYG 스크립팅을 넣는 법을 단계별로 보여 줘요. 순수 프로그램 실행, 에러 출력 다듬기, 효과(effect) 추가로 접근 범위를 엄격히 통제하는 스크립트 환경을 만들어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> 가이드 앞부분(설치, 순수 프로그램 실행, 에러 출력)까지 옮겼어요. 효과와 패키지 부분은 다 읽지 못했어요.

### 왜 EYG를 임베드하나

이 가이드는 Erlang 애플리케이션 `my_counters`에 EYG 스크립팅을 추가해요. EYG를 임베드하면 **무엇에 접근할 수 있는지 엄격히 통제되는** 스크립팅 환경이 생겨요. 그래서 이런 걸 할 수 있어요.

- 사용자에게 작은 쿼리나 자동화용 스크립팅을 열어 주기
- 미리 정한 개발 작업만 하는 더 안전한 셸 만들기
- 에이전트에게 비즈니스 로직 함수 묶음을 제공하기

### 의존성 설치

EYG 툴킷은 조합 가능한 부품들로 되어 있어요. 이 가이드에서는 `eyg_parser`, `eyg_interpreter`, `eyg_analysis`를 설치해요.

### 순수 프로그램 실행

EYG 코드를 실행하는 가장 단순한 Erlang 모듈은 이래요.

```erlang
-module(my_counters_script).
-export([run/1]).
run(Code) when is_binary(Code) ->
  case eyg@parser:all_from_string(Code) of
    {ok, Source} -> eyg@interpreter@expression:execute(Source, []);
    {error, Reason} -> {error, Reason}
  end.
```

Erlang 셸에서 `my_counters_script:run(<<"!int_add(2, 1)">>).`를 실행하면 `{ok,{integer,3}}`이 나와요. 자체 완결된 순수 EYG 프로그램은 이것만으로 다 돌릴 수 있어요.

### 쓰기 편하게 다듬기

두 가지를 더해요. 첫째, 에러를 보기 좋게 출력해요. EYG 패키지마다 자체 pretty print 함수가 있어서 파서 에러, 런타임 값, 런타임 에러를 사람이 읽을 수 있는 바이너리로 바꿔요. 둘째, 셸에서 편하게 쓰도록 charlist도 받게 `unicode:characters_to_binary`로 변환하는 절을 추가해요.

그러면 `!int_add(2, foo)`를 실행했을 때 `error: variable undefined: foo`와 "변수 이름을 확인하거나 쓰기 전에 let 바인딩을 추가하라"는 힌트, 그리고 문제 위치를 가리키는 표시가 나와요.

### 다음 단계: 효과

이 첫 실행기의 EYG 프로그램은 부수 효과를 전혀 낼 수 없어요. 설정 스크립트로는 이걸로 충분하지만, 그 이상을 하려면 호스트가 허용한 효과를 추가해야 하고 가이드는 그 방법으로 이어져요.
