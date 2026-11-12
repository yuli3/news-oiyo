---
id: trend-2f3d8eb2fd48eccc
title: "chat : refactor gemma4 to build loose schema rules and clean up by aldehir · Pull Request #31915 · ggml-org/llama.cpp"
sourceUrl: https://github.com/ggml-org/llama.cpp/pull/31915
summary: "llama.cpp에서 Gemma 4가 도구 스키마를 잘 안 따르던 문제를 고치는 PR이 병합됐어요. 도구 인자의 속성과 전체 형태를 강제하는 문법 규칙을 추가하고, 공식 템플릿이 해결한 예전 우회 코드를 정리했어요. 11월 12일 master에 들어갔어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

GitHub PR 페이지(설명, 커밋 목록, 리뷰·병합 기록)를 읽고 옮겼어요. 코드 diff는 따로 보지 않았어요.

### 무엇이 문제였나

Gemma 4가 사용자가 준 스키마를 따르지 않는다는 보고가 있었어요. Gemma 4는 llama.cpp의 `json-schema-to-grammar`를 쓸 수 없어서, 그동안은 형식만 맞는 Gemma 4 객체면 무엇이든 받아들였기 때문이에요.

### 무엇을 바꿨나

- 도구 스키마를 더 잘 따르도록 **문법(grammar) 규칙**을 추가했어요. 다만 생성되는 문법은 속성과 전체 형태만 강제하고, 실제 값까지는 강제하지 않아요.
- 이 기회에 예전 우회 코드와 템플릿을 정리했어요. 공식 Gemma 4 템플릿이 그 문제들을 해결한 지 꽤 됐으니, 아직 업데이트하지 않았다면 업데이트하라는 입장이에요.
- 앞선 PR #31612와 #23247을 대체해요.

커밋에는 Gemma 4 도구 인자용 스키마 모양 PEG 파서 만들기, 키 구조만 강제하기, 예전 gemma4 우회 제거, 깊이 제한(depth_guard) 추가, Gemma 4 파서 분리 등이 있어요.

### 진행

- 작성자 aldehir가 11월 8일 올렸고, PR 양식의 AI 사용 공개 항목에 "Yes, Opus 5.5"라고 적었어요.
- ngxson이 승인했고, 11월 11일 'merge ready' 라벨이 붙은 뒤 11월 12일 ggerganov가 master에 병합했어요(검사 17개 통과).
