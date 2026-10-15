---
id: trend-60c3a834b92dc38f
title: "Show GN: hone - 에이전트 평가 사이클을 자동으로 돌리고, 처음 보는 케이스로 판정하는 CLI"
sourceUrl: "https://github.com/kyu1204/hone"
summary: "hone은 AI 시스템을 내 케이스로 평가하고, 실패 원인을 찾고, 수정안을 시도한 뒤 수정에 쓰이지 않은 보류 케이스로 효과를 판정하는 CLI예요. npm에 hone-eval로 올라와 있고 init·draft·test·sharpen 네 명령이 핵심이에요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

GitHub README를 읽었지만 수집 상한(9,000자) 때문에 판정(verdict) 표 이후는 읽지 못해 `partial`로 표시해요.

### 한 줄 소개
> Evaluate. Correct. Sharpen.

hone은 내 케이스로 AI 시스템을 측정하고, 왜 실패하는지 찾고, 변경을 시도하고, **변경이 한 번도 보지 못한 케이스에서도 버티는 것만** 남겨요. npm 패키지 이름은 `hone-eval`이에요. 공개적으로 만들고 있어서 계획은 WORKPLAN.md, 작업은 모두 읽을 수 있는 PR, 출시 내역은 CHANGELOG.md에 있어요.

### 네 가지 명령
```bash
hone init     # 프로젝트를 파악해 hone.config.ts와 예시 케이스 작성
hone draft    # 에이전트 프롬프트와 코드로 케이스 초안 작성, 실행, 실패 표시
hone test     # 모든 케이스를 여러 번 돌리고 점수를 얼마나 믿을지 표시
hone sharpen  # 실패 원인, 시도한 변경, 보류 케이스 판정
```
`hone`만 치면 결과를 터미널에서 열어요. 다른 명령은 이 네 단계의 일부이거나 도구라 필요할 때만 나서요.

### sharpen 예시
`examples/sharpen`의 장난감 헬프데스크 봇(실제 출력, 15초, 모델 호출 4번)이에요.

- 시작: 12개 케이스 통과율 0%, 6개는 최종 확인용으로 보류해요.
- 실패 원인 분류: 근거 없는 "모르겠어요" 거절(12번 중 6번), 정형화된 답변 포장(5번), 인사말 같은 군더더기(1번).
- 시도한 변경 3개: loose matching 단독은 0% → 0%, 프롬프트 재작성은 0% → 50%, 재작성 위에 loose matching을 더하면 0% → 100%.
- 결과: **PROVEN**. 본 적 없는 6개 케이스에서 0%에서 100%로 올랐고(95% 구간 +100~+100, p = 0.03), 새 프롬프트와 변경 파일을 `.hone/sharpen/` 아래에 저장해요.

### 판정의 뜻
- **PROVEN**: 보류 케이스에서 쌍대 검정과 정확 부호 검정으로 더 나음 → 변경을 채택해요.
- **PROMISING, not proven**: 더 낫지만 케이스가 적어 우연을 배제할 수 없음 → 케이스를 더 넣고, 개선이라고 부르지 않아요. 몇 개가 더 있으면 결론이 나는지도 알려 줘요.
- **NO GAIN**: 아무것도 현재보다 낫지 않거나, 가장 좋은 변경이 학습한 케이스에만 맞았던 경우예요.
