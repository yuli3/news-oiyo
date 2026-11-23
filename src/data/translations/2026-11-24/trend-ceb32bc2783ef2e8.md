---
id: trend-ceb32bc2783ef2e8
title: "그렇다, Lean 코드 1,700만 줄은 정말 많다"
sourceUrl: https://micjm.com/blog/yes-17m-lines-of-lean-is-a-lot
summary: "리만 가설 증명이 Lean 코드 1,700만 줄이라는 통계가 정말 큰지, Mathlib 유명 정리 259개와 Reservoir 패키지 938개의 길이와 비교한 글이에요. 결론은 정말 많다는 것이에요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-24
---

micjm이 2026년 11월 22일 쓴 블로그 글이에요. 리만 가설 증명이 1,700만 줄의 Lean 코드라는 통계를 보고, 그 규모가 정말 큰지 확인하려고 온라인의 Lean 증명 모음 두 가지 길이를 차트로 그렸어요. 차트는 모두 x축이 로그 스케일이라 실제보다 차이가 작아 보인다고 밝혀요.

### Mathlib의 유명 정리
- Mathlib은 유명한 정리 모음을 관리해요. 1,000개가 넘지만 Lean 코드가 연결된 것은 259개예요.
- 이 증명들은 모두 사람이 만든 것이고, 대부분 10만 줄에서 120만 줄 사이에 있어요.
- Mathlib 전체인 240만 줄보다 작고, 1,700만 줄과는 거리가 멀어요.

### Reservoir의 Lean 패키지
- Reservoir는 공개된 Lean 패키지를 색인해요. 그중 938개가 GitHub에 Lean 코드를 갖고 있어요.
- 가장 큰 것은 8,800만 줄의 Qiuzhen-CFSG/CFSG예요. AI가 만든 증명으로 보이며 아직 작업 중이에요.
- 3,600만 줄의 CBirkbeck/LeanBridge는 LMFDB 데이터베이스를 Mathlib에 연결하는 프로젝트예요. 코드의 약 98%가 수치를 하나씩 확인하는 스크립트로 생성된 파일이라, 직접 쓴 부분은 약 50만 줄 수준이라고 해요.
- 2,700만 줄의 anthropics/fermats-last-theorem은 9월에 공개된 페르마의 마지막 정리 증명이에요. README에 따르면 AI 에이전트가 사람이 만든 오픈소스 Lean 코드를 바탕으로 만들었어요.
- 같은 README가 언급한 Kevin Buzzard 주도의 사람 프로젝트 FLT는 약 6만 줄이고 아직 진행 중이에요. 저자는 AI 버전이 그보다 약 450배 길다고 계산해요.

### 결론
- 938개 패키지의 중앙값은 약 4,000줄이고, 1,700만 줄보다 큰 패키지는 세 개뿐이에요.
- 저자는 1,700만 줄은 정말 많다는 결론으로 글을 맺어요.
