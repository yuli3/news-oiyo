---
id: trend-94b3a186c7cee43b
title: "hyprwm/Hyprland"
sourceUrl: https://github.com/hyprwm/Hyprland
summary: "Hyprland는 외관을 포기하지 않는 100% 독립형 동적 타일링 Wayland 컴포지터예요. wlroots 등에 기대지 않고, 블러·애니메이션 같은 효과, 강력한 플러그인, 소켓 IPC, Lua 커스텀 레이아웃을 지원해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

GitHub 저장소 README를 읽고 정리했어요.

### 무엇인가요

**Hyprland** 는 외관을 희생하지 않는 100% 독립형 동적 타일링 **Wayland 컴포지터**예요. 최신 Wayland 기능, 높은 커스터마이징, 화려한 효과, 강력한 플러그인, 쉬운 IPC를 내세워요. BSD-3-Clause 라이선스이고 GitHub 스타는 약 3만 9천 개예요.

### 주요 기능

- 그라데이션 테두리, 여러 종류의 블러, 애니메이션, 글로우, 그림자 등 효과
- wlroots, libweston, kwin, mutter에 기대지 않는 완전 독립 구현
- 커스텀 베지어·스프링 곡선 애니메이션
- 플러그인 지원과 내장 플러그인 관리자
- 게임 성능을 위한 티어링 지원
- 저장하면 즉시 반영되는 설정
- 원하는 앱에 전달되는 전역 단축키
- 타일링·의사 타일링·플로팅·전체화면 창, 스크래치패드, 탭 모드 창 그룹
- 창·모니터·레이어 규칙, 소켓 기반 IPC, 네이티브 IME 지원
- 완전 동적 워크스페이스

### 레이아웃

Dwindle, Scrolling, Master, Monocle 레이아웃을 제공하고, Lua나 플러그인으로 커스텀 레이아웃을 만들 수 있으며 워크스페이스마다 다른 레이아웃을 쓸 수 있어요.

예전에 Hyprland를 받쳐 준 wlroots와 tinywl, Sway, Vivarium, dwl, Wayfire에 감사를 전해요.
