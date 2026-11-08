---
id: trend-41eac64ee9b2212d
title: "I'm not a fan of Deno's security model (2024)"
sourceUrl: https://goldstein.lol/posts/deno-security
summary: "2024년 글에서 저자는 Deno의 권한 시스템이 근본적으로 안전하지 않고 오해를 부른다고 비판해요. 터미널에 뜨는 권한 프롬프트 자체가 stdout/stdin을 통해 악성 코드에 조작될 수 있다는 점이 가벼운 쪽 문제예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

2024-08-31에 쓰인 글의 앞부분을 읽고 옮겼어요. 저자가 말한 '더 심각한' 두 번째 문제는 읽은 범위 밖이라 옮기지 않았어요.

### 배경: Deno의 권한 시스템
Deno는 V8을 재사용하는 JavaScript 런타임이에요(표준 라이브러리, 패키지 매니저, TypeScript 트랜스파일러 포함). 대표 기능이 랜딩 페이지의 "Secure by default"에 있는 권한 시스템이에요. JS 코드는 표준 라이브러리를 통해서만 바깥 세계에 접근하므로 Deno가 허용 범위를 정할 수 있어요. 예를 들어 `deno run --allow-read=/tmp/dir --allow-run=uname code.ts`로 실행하면 code.ts는 /tmp/dir 읽기와 uname 실행만 가능해요. 프로그램은 실행 중에 `Deno.permissions.request()`로 권한을 요청할 수도 있고, 그러면 터미널에 "Deno requests read access to /tmp/dir. Allow? [y/n/A]" 프롬프트가 떠요. 저자는 브라우저 확장에도 이런 기능이 있었으면 한다고 덧붙여요(지금은 모든 웹사이트 접근이 필요하면 전체 접근을 요청해야 해요).

### 프롬프트 문제
이 프롬프트는 PolKit 같은 GUI 창이 아니라 stdout에 찍힌 텍스트가 stdin 입력을 기다리는 것이어서 "엉뚱한 설계"라고 저자는 말해요. 터미널의 명령과 요청은 대부분 stdout에 출력하는 방식(in-band)으로 보내고, 터미널은 stdin으로 답을 줘요. Deno는 권한 없이 임의 데이터를 stdout에 출력하고 stdin에서 읽을 수 있게 하므로, 악성 코드가 터미널에 임의의 명령을 보낼 수 있어요. 보통은 터미널이 stdout 내용만으로 셸 명령을 실행하지 않으니 파일을 `cat`해도 안전하다고 기대하지만, 이 경우엔 그 가정이 문제가 돼요. 글은 이어서 이 문제를 구체적으로 풀어 가지만, 그 부분은 읽지 않았어요.
