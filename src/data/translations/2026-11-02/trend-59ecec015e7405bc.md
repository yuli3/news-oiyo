---
id: trend-59ecec015e7405bc
title: "Git 사용자를 위한 Jujutsu(jj) 워크숍"
sourceUrl: https://www.youtube.com/live/DczKGei6igY
summary: "vim.kr이 10월 31일 튜링의사과에서 연 3시간 반 분량의 Jujutsu(jj) 실습 워크숍 라이브예요. Tangled 개발자 boltless가 Git 내부 구조에서 시작해 jj 데이터 모델, 고급 워크플로, Tangled 연동까지 3부로 진행했대요."
translationStatus: blocked
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

원문은 YouTube 라이브 영상이라 자동 읽기로는 내용을 볼 수 없었어요. GeekNews 소개글(작성 kodingwarrior)을 기준으로 옮겼어요.

### 1부: Git 내부 모델과 jj 기초

- Git 객체 모델(blob, tree, commit, tag, ref, 인덱스)을 먼저 짚고 jj가 이를 어떻게 다르게 다루는지 비교했대요.
- jj에는 **인덱스와 stash가 없어요.** working copy 자체가 하나의 커밋이고 명령을 실행할 때 자동 스냅샷돼요.
- **change ID와 commit ID가 분리**돼 있어, 내용이 바뀌어 commit ID가 달라져도 같은 변경을 계속 추적할 수 있어요. 브랜치 대신 **bookmark**를 써요.
- Git 백엔드 위에서 돌아 기존 저장소에 바로 쓸 수 있고, 커밋 메시지를 먼저 쓰고 작업하는 흐름을 권했대요.
- 실습 명령: `jj git init`, `jj status`, `jj log`, `jj describe`, `jj new`, `jj commit`, `jj squash -i`, `jj edit`, `jj file show`.

### 2부: 히스토리 조작과 고급 워크플로

- `jj evolog`로 한 change의 변천을 보고, `jj undo`, `op log`, `op restore`로 저장소 작업 단위 되돌리기를 다뤘어요.
- 기존 변경을 직접 고치는 edit 흐름과 새 변경에서 작업해 부모로 합치는 squash 흐름을 비교했어요.
- `jj new`에 부모를 여러 개 줘 머지·옥토퍼스 머지를 만들고, `jj rebase -b/-s/-r`과 revset으로 변경을 옮겼어요.
- **충돌이 일급 객체**라 rebase가 멈추지 않고 충돌 상태를 커밋에 기록해 나중에 풀 수 있어요. 여러 작업을 한 머지 커밋 위에 올리는 메가 머지 흐름도 소개했대요.

### 3부: Tangled와 원격 협업

AT Protocol 기반 탈중앙 Git 포지 **Tangled**를 소개하고, GitHub와 Tangled에 `jj git push`/`fetch`로 bookmark를 동기화하며 interdiff로 PR 리비전 차이를 리뷰하는 방식을 시연했어요. 질의응답에선 `immutable_heads`, revset 함수, workspace, Git LFS 지원이 나왔대요.
