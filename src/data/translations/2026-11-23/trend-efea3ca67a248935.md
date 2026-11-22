---
id: trend-efea3ca67a248935
title: "Fast-Anything: 전체를 Rust로 재작성하지 말고, 느린 5%만 재작성하라"
sourceUrl: https://github.com/EL4CTEO/fast-anything
summary: "fast-anything은 Python·Node·Ruby 등 앱을 프로파일링해 느린 함수만 골라 코딩 에이전트로 Rust에 옮기고, 실제 호출을 기록·재생해 결과가 같다고 증명한 뒤 갈아 끼우는 도구예요. 되돌리기도 한 명령이에요."
translationStatus: partial
translatedBy: Claude
translatedAt: 2026-11-23
---

저장소 README를 바탕으로 옮겼어요. 지원 함수 조건 뒷부분 등 README 끝부분은 수집 길이 제한으로 읽지 못했어요.

### 아이디어

앱 전체를 Rust로 다시 쓰면 몇 달이 걸리고, 컴파일은 분 단위이고, `target/` 폴더가 기가바이트로 불어나요. 그런데 실행 시간 대부분은 몇몇 함수에 몰려 있어요. fast-anything은 그 함수를 찾아 코딩 에이전트에게 그것만 Rust로 옮기게 하고, 기록된 실제 호출로 결과가 같음을 증명한 뒤 바꿔 끼워요. 한 명령이고 완전히 되돌릴 수 있어요.

### 사용법

`npm i -g @el4cteo/fast-anything`(또는 `cargo install`)으로 설치하고 `fast-anything go --agent claude -- python app.py`처럼 실행해요. 단계별 명령은 이래요.

- `scan`: 앱을 프로파일링해 시간 × 이식 용이성으로 함수 순위를 매겨요.
- `port`: 실제 호출을 최대 500개 기록하고 함수 하나짜리 Rust crate와 TASK.md를 만들어요.
- `verify`: 릴리스 빌드 후 기록된 모든 호출을 재생해요.
- `enable`/`disable`: 표시된 블록 하나로 Rust를 넣고 빼요(바이트 단위로 원상 복구).
- `bench`, `report`, `doctor`도 있어요. `--agent`에는 claude, codex 또는 stdin으로 프롬프트를 읽는 아무 명령이나 쓸 수 있어요.

### '느낌이 아니라 증명'

README의 예시로, 그럴듯해 보이던 포트가 문자 대신 바이트를 비교해 실제 호출 500개 중 148개에서 걸렸다고 해요. 기록된 호출 외에도 NaN, ±무한대, -0.0, 비ASCII 문자열, 빈 입력과 최대 16배 큰 입력 같은 경계 사례를 원본에게 답하게 해 비교해요. 모든 사례가 일치해야(실수는 1e-9 이내, 원본이 오류를 내면 같이 오류) 활성화되고, 맞더라도 호출당 원본보다 느리면 켜지 않아요. `FAST_ANYTHING_DISABLE=1`이면 언제든 원본으로 돌아가요.

### 결과(README 기준)

i5-10500·Windows 11에서 Python 퍼지 중복 제거(이름 700개)가 4.91초에서 42ms(116배), TypeScript는 20배, PHP 55배, Go 21배, Ruby 14배, C# 13배, Java 3배(함수만 보면 11배), C 3.4배, C++ 2.7배였어요. 안쪽 작은 함수가 아니라 가능한 바깥 루프를 옮겨 Rust 경계를 한 번만 넘게 하는 게 핵심이고, 안쪽 levenshtein만 옮기면 35배·1.9배에 그쳤다고 해요.

### 에이전트 연동과 언어

Claude Code 플러그인, 바이너리에 내장된 MCP 서버(도구 8개), 다른 에이전트용 스킬을 제공해요. Python(PyO3), JS/TS(napi-rs), Ruby, Java·Kotlin, Go, PHP, C/C++, C#을 지원하고, 평범한 데이터를 받는 최상위 결정적 함수를 옮겨요.
