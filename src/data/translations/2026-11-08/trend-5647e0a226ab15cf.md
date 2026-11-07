---
id: trend-5647e0a226ab15cf
title: "helix-editor/helix"
sourceUrl: https://github.com/helix-editor/helix
summary: "Helix는 Kakoune과 Neovim에서 영감을 받아 Rust로 만든 '포스트모던 모달 텍스트 에디터'예요. 언어 서버 지원과 tree-sitter 기반 구문 강조·편집이 내장돼 있어요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-08
---

GitHub 저장소 README를 읽고 정리했어요. README 자체가 짧은 편이에요.

### Helix란

Helix는 Kakoune과 Neovim에서 영감을 받아 Rust로 작성된 에디터예요. 저장소 설명은 "포스트모던 모달 텍스트 에디터"예요.

- 편집 모델은 Kakoune에 매우 크게 기반을 두고 있어요. 작성자는 개발하면서 Kakoune의 설계 결정 대부분에 동의하게 됐다고 해요.
- 모든 단축키·키맵은 웹사이트 문서에 정리돼 있어요.

### 주요 기능

- 내장 언어 서버(LSP) 지원
- tree-sitter를 통한 똑똑하고 점진적인 구문 강조와 코드 편집

주로 터미널 기반 에디터지만, 작성자는 Emacs처럼 wgpu를 쓴 커스텀 렌더러도 탐구해 보고 싶다고 밝혀요.

### 참고 사항

- 현재는 일부 언어만 들여쓰기 정의가 있어요. `runtime/queries/<lang>/`에 `indents.scm`이 있는지 확인하라고 안내해요.
- 설치 문서, 기여 가이드, FAQ가 따로 있어요.
- 커뮤니티는 Matrix Space(#helix-editor:matrix.org)에서 논의해요.
- 로고는 @jakenvac가 디자인했어요.

이 저장소는 오늘 GitHub Trending에서 별을 많이 받아 '오늘의 저장소'에 올랐어요. AI 전용 도구는 아니에요.
