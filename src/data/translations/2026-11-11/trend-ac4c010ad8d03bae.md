---
id: trend-ac4c010ad8d03bae
title: "Show GN: skilladopt, Claude Code와 Codex 스킬을 내 프로젝트에 맞추는 도구"
sourceUrl: https://github.com/kks0488/skilladopt
summary: "skilladopt는 GitHub에서 가져온 Claude Code·Codex 스킬(SKILL.md)을 설치 전에 내 프로젝트의 명령·도구·AGENTS.md 규칙에 맞게 고쳐 주고, 문단마다 바꾼 근거를 남기며, 프로젝트가 바뀌면 다시 볼 부분을 알려 주는 도구예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

GitHub 저장소 README 앞부분(빠른 시작까지)을 읽고 옮겼어요. 나머지 README는 읽지 못해 partial로 표시했어요.

### 스킬은 설치하지 말고 "입양"하세요

GitHub에서 복사해 오는 Claude Code·Codex 스킬은 모두 다른 사람의 프로젝트를 위해 쓰였어요. 그래서 내 에이전트에게 그 사람의 도구를 쓰고, 그 사람의 명령을 실행하고, 그 사람의 규칙을 따르라고 말해요. skilladopt는 스킬이 들어가기 전에 내 프로젝트에 맞추고, 줄마다 왜 바꿨는지 적어 두고, 프로젝트가 바뀌면 어느 줄을 다시 봐야 하는지 알려 줘요.

### 주요 기능

- **프로젝트에 맞추기**: 일반적인 명령을 내 명령으로 바꾸고, 쓰지 않는 도구에 대한 조언은 지우고, 내 `AGENTS.md` 규칙을 지켜요.
- **줄마다 근거 남기기**: 문단마다 keep, bind, rewrite, drop, review 중 하나의 결정을 내리고, 그 결정이 기댄 의존성·스크립트·규칙과 함께 저장해요.
- **다시 볼 곳 알려 주기**: `skilladopt impact`가 근거가 바뀐 결정과 입양 이후 추가된 규칙을 가리켜요. `update`는 아직 유효한 결정을 재사용해요.
- **스킬 안의 것은 실행하지 않기**: 스킬은 고정된 커밋에서 GitHub API로 읽어요. AI 작업자는 도구가 없거나 읽기 전용 샌드박스만 받고, 설치에 실패하면 롤백해요.

### 빠른 시작

```bash
npx skilladopt setup
```

한 번 실행한 뒤 아무 프로젝트에서 Claude Code나 Codex에게 "이 프로젝트에 프런트엔드 디자인 스킬을 추가해 줘"라고 하면, 에이전트가 스킬을 찾아 skilladopt로 맞추고 무엇이 바뀌었는지 보여 준 뒤 설치 전에 물어봐요. 원하는 스킬을 알면 직접 지정할 수도 있어요.

```bash
npx skilladopt anthropics/skills frontend-design
```

Node 20 이상과 Claude Code 또는 Codex가 필요해요. 저장소에는 한국어 README도 있어요.
