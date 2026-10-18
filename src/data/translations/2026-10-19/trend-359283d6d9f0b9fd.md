---
id: trend-359283d6d9f0b9fd
title: "Ghidra + CBMC = Assembly Model Checker"
sourceUrl: "https://www.philipzucker.com/asmc_cpp"
summary: "Philip Zucker가 Ghidra P-code 의미론으로 ELF를 CBMC의 GOTO IR로 올려 어셈블리를 모델 체킹하는 asmc를 소개해요. 후조건·ABI 위반 검사, RISC-V 지원, C와 어셈블리 번역 검증 예제를 보여 주고, 도구 대부분을 AI가 만들었다는 소회도 밝혀요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

Philip Zucker 블로그 글 전체를 읽고 정리했어요. 긴 CBMC 실행 로그는 요점만 옮겼어요.

### asmc란
ASMC(github.com/philzook58/asmc)는 Ghidra가 올린(lifted) 어셈블리 의미론을 **CBMC(C Bounded Model Checker)**에 붙이는 또 한 번의 시도예요. CBMC는 건전성, 확장성, 실용성의 파레토 경계에 있는 도구라고 저자는 평가해요.

- CBMC에는 **GOTO IR**이라는 중간 표현과 `.gb` 오브젝트 형식이 있어요.
- `asmc-lift`는 컴파일된 `.elf`를 Trail of Bits가 패키징한 Ghidra **P-code** 의미론(sleigh)으로 `.gb`로 올려요.
- `asmc`는 lift와 CBMC 도구들을 돌려 실제 모델 체킹을 하는 드라이버예요.

저자가 좋아하는 점은 쓰임새가 넓다는 거예요(단독 어셈블리 검증, 번역 검증, 외부 어셈블리 링크, 어셈블리용 C 명세, DWARF 디버그 정보 검증, 패치된 어셈블리 검증, 디컴파일 검증). 핵심 lift 도구는 C++ 접착 코드 약 1천 줄뿐이에요. GOTO와 P-code가 꽤 비슷하고, 어셈블리에 던지는 질문 상당수가 C 수준 개념과 얽혀 있어 CBMC와 긴밀히 붙는 게 유용하다고 해요.

### 예제
- **mov 42**: `rax`에 42를 넣고 `--post 'outreg.rax == 42'`로 확인하면 PASS, 43으로 바꾸면 반례(counterexample)와 함께 FAIL이 나와요. 후조건 문자열은 CBMC의 C 단언에 그대로 끼워져서 단언 언어가 C예요.
- **ABI 검사**: `mov $42, (%rsp)`로 반환 주소를 덮어쓰면 "예상치 못한 반환 주소"로, `r12`를 복원하지 않으면 "callee-saved 레지스터 R12 미복원"으로 실패해요.
- **RISC-V**: RV32/64도 지원해요. Ghidra가 지원하는 다른 아키텍처를 붙이려면 주로 C로 ABI shim을 새로 쓰면 돼요.
- **mymax 번역 검증**: C 함수를 gcc로 어셈블리로 만든 뒤, 커스텀 하니스에서 같은 비결정 입력으로 C 버전과 어셈블리 버전 결과를 비교해 PASS를 받아요.

### 이전 작업과 장단점
pcode2c(Ghidra P-code를 C 인터프리터로 바꿔 CBMC에 넣던 도구), z3 기반 파이썬 기호 실행 시도, CBAT의 후속이라고 소개해요. C로 인코딩하려면 단순한 비트벡터·메모리 연산을 돌려 말해야 하는 번거로움이 있지만, 읽을 수 있는 C 출력과 컴파일해 돌려 볼 수 있다는 점은 디버깅에 유용했다고 해요.

### AI가 만든 도구라는 소회
> 이 새 도구는 내 메모와 지시를 바탕으로 상당 부분 AI가 만들었어요.

저자는 C++와 CBMC 내부에 능숙하지 않아 쉬워지지 않았다면 시도도 못 했을 거라고 해요. 7년간 프로토타입을 4–5개 만들어 왔는데 "6번째는 별로 신나지 않는다"며 씁쓸하면서도, 바이너리 검증은 늘 관심사와 사회적 필요의 타협이었기에 그 고생이 사라지는 게 아주 슬프진 않다고 해요. CBMC의 C 의미론과 Ghidra P-code 의미론이 엄밀하지 않다는 비판(알려진 구멍이 있음)도 인정하고, 엄밀한 쪽은 SAIL이라고 적어요. 에이전트 AI 붐 이후 더 높은 건전성의 비용이 크게 바뀌었을 수 있지만, 지금까지 공개된 것만으로는 그렇게 결론 내리기 어렵다고 맺어요.
