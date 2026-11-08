---
id: trend-e18aacffeaa3a98d
title: "Goodbye Claude, hello Pi"
sourceUrl: https://caleb.software/posts/claude-to-pi.html
summary: "개발자 Caleb이 Claude Code를 주력 코딩 하네스에서 내리고 Pi로 옮기기로 한 이유를 적은 글이에요. AGENTS.md 지원 지연, VSCode 연동 한계, 잦은 시스템 프롬프트 변경 등 누적된 불만이 배경이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

글(2026-09-21 작성)의 앞부분을 읽고 옮겼어요. 뒷부분(Pi를 고른 이유 등)은 읽은 범위 밖이라 옮기지 않았어요.

### 결정
저자는 Claude Pro 구독에 Claude Code가 들어온 이후 1년 넘게 쓴 사용자예요. 첫 사용 때 한 번의 프롬프트로 파이썬 코드가 나오는 걸 보고 들떴고, 이 출시가 소프트웨어 개발의 새 시대를 이끈 계기로 기억될 거라고 믿어요. 그래도 작은 불만이 쌓여 Claude Code를 주력 코딩 하네스에서 은퇴시키고 Pi로 옮기기로 했어요. 결정한 다음 날 Anthropic이 Claude Code의 AGENTS.md 지원을 발표했지만 "너무 늦었다"고 해요.

### 불만 목록
- **AGENTS.md vs CLAUDE.md**: 두 형식 사이를 복사하거나 심볼릭 링크로 맞춰야 하는 건 사용자에게 번거로워요.
- **IDE 연동**: 저자는 커밋 전에 코드를 직접 검토하는 편이라 VSCode 안에서 Claude Code를 쓰고, 선택한 텍스트가 자동으로 컨텍스트에 들어가는 기능을 좋아해요. 그런데 IDE와 "연결"되는 세션은 한 번에 하나뿐이고, 두 번째 탭은 선택 이벤트를 받지 못해요. 2025년 12월부터 보고됐는데 무관한 버그의 중복으로 닫혔다고 해요.
- **공식 VSCode GUI 확장**: 여러 탭과 선택 컨텍스트는 되지만, 기본 슬래시 명령의 절반이 안 되고, 커스텀 상태 줄 지원이 없고, 서브에이전트 출력이 메인 대화에 시간순으로 섞여 읽기 어려워요.
- **기능 우선 개발**: 동적 워크플로, 에이전트 팀, ultrareview 같은 기능은 기업 고객의 토큰 소비를 늘리는 방법일 뿐 자신이 원하는 게 아니라고 해요.
- **잦은 변경**: 저자 집계로 올해 Claude Code는 244번 릴리스됐고 4분의 3 넘게가 시스템 프롬프트나 도구 설명을 바꿨어요. 이런 변경은 LLM 성능과 사용자 지침·저장소 관례와의 충돌에 큰 영향을 준다고 지적해요.
