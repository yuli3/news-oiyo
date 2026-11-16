---
id: trend-4b692fc340d7e17c
title: "Show GN: redfirst, PR이 추가한 테스트가 수정 전에도 통과하는지 확인하는 도구"
sourceUrl: https://github.com/mandu5/redfirst
summary: "redfirst는 PR이 추가·수정한 테스트를 PR 코드와, 코드 쪽만 이전으로 되돌린 상태에서 두 번 돌려 수정 없이도 통과하는 '아무것도 검증하지 않는 테스트'를 잡는 pytest용 도구예요. 에이전트 PR 7건 중 1건꼴로 그런 사례가 있었대요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

GitHub README 전체를 읽고 정리했어요.

### 한 줄 요약

> 수정 전에도 통과하는 테스트는 그 수정을 테스트하지 않아요.

redfirst는 PR이 추가하거나 고친 테스트를 PR 상태에서 한 번 돌리고, **테스트가 아닌 파일을 모두 변경 전으로 되돌린 뒤** 다시 돌려요. 그래도 통과하면 그 테스트는 버그를 잡지 못했을 테고, PR은 아무것도 확인하지 않는 수정을 내보내는 셈이에요.

### 예시

재시도 backoff를 지수형으로 바꾸는 PR에 `backoff(100) == 30.0`만 확인하는 테스트를 넣으면, 예전 코드도 상한이 있었기 때문에 `passes_without_fix`가 나와요. 증가 폭을 확인하는 테스트를 추가하면 변경 없이 실패해 `proves_fix`가 나와요.

### 얼마나 자주 일어나나

글쓴이는 스타 100개 이상 Python 저장소 120곳에서 코딩 에이전트(Claude Code, Copilot, Codex, Devin, Cursor)가 연 병합된 버그 수정 PR 120개와 같은 저장소의 사람 PR 89개를 병합 당일 의존성으로 격리 컨테이너에서 재생했어요.

- 새 테스트가 변경과 함께 통과한 PR: 에이전트 69, 사람 57
- 그중 수정을 되돌려도 새 테스트가 전부 통과: 에이전트 10건(14%), 사람 5건(9%)
- 그중 실제로 테스트할 수 있었던 변경: 에이전트 6, 사람 3

정확 McNemar 검정 p=0.63으로 차이는 잡음 범위예요. 결론은 "에이전트가 더 나쁘다"가 아니라 **에이전트 수정 약 7건 중 1건, 사람 수정 약 11건 중 1건**이 수정 없이도 통과하는 테스트와 함께 병합됐다는 거예요.

### 사용법과 판정

- GitHub Actions 단계로 넣으면 job summary에 표를 쓰고, `mode: warn`이면 경고, `fail`이면 실패시켜요. 로컬에서는 `redfirst check --base origin/main`으로 돌리고, 더러운 작업 트리에서는 실행을 거부하며 끝나면(크래시 후에도) 파일을 되돌려요.
- 판정: `proves_fix`, `fails_by_error`, `passes_without_fix`, `inconclusive`, `head_not_green`, `no_new_tests`, `no_code_change`, `needs_rebuild`.
- 로그 메시지·타입 힌트·성능 변경처럼 단위 테스트로 볼 수 없는 변경도 있어서, 문제인지는 사용자가 판단해요.

### 한계

Python과 pytest만 지원하고, 의존성 변경은 되돌리지 않으며, 컴파일 소스 변경은 재빌드가 필요해요. 새 테스트를 두 번 돌리는 만큼 시간이 들어요. MIT 라이선스이고, 호스팅 GitHub App도 검토 중이에요.
