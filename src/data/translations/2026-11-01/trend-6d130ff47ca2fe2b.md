---
id: trend-6d130ff47ca2fe2b
title: "recastnavigation/recastnavigation"
sourceUrl: https://github.com/recastnavigation/recastnavigation
summary: "Recast Navigation은 레벨 지오메트리에서 내비메시를 자동 생성하고 길찾기·군중 시뮬레이션을 제공하는 게임용 C++ 도구 모음이에요. Unity·Unreal·Godot·O3DE와 많은 게임의 AI 내비게이션을 받치고, ZLib 라이선스예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

GitHub README 전체를 읽고 옮겼어요.

### 무엇인가

**Recast Navigation**은 게임용 최신 내비메시(navmesh) 생성과 내비게이션 도구예요.

- **자동**: 어떤 레벨 지오메트리든 넣으면 내비메시를 만들어요.
- **빠름**: 레벨 디자이너가 결과를 빨리 확인할 수 있어요.
- **유연함**: 세부 설정과 모듈식 설계로 필요에 맞게 고칠 수 있어요.
- **의존성 없음**: C++98 호환 컴파일러만 있으면 빌드돼요.
- **업계 표준**: Unity, Unreal, Godot, O3DE와 수많은 AAA·인디 게임의 AI 내비게이션 기능을 받쳐요.

### 모듈

| 폴더 | 역할 |
|---|---|
| `Recast/` | 내비메시 생성 |
| `Detour/` | 내비메시 런타임 로딩, 길찾기, 질의 |
| `DetourTileCache/` | 내비메시 스트리밍(큰 레벨, 오픈월드용) |
| `DetourCrowd/` | 에이전트 이동, 충돌 회피, 군중 시뮬레이션 |
| `DebugUtils/` | 디버그 시각화 API |
| `Tests/` | 단위 테스트 |
| `RecastDemo/` | 모든 기능을 보여 주는 데모 앱 |

처음이라면 `BuildingAndIntegrating.md`를 보고, RecastDemo의 `Sample_SoloMesh.cpp`(내비메시 만들기)와 `NavMeshTesterTool.cpp`(Detour로 경로 만들기)부터 보라고 안내해요.

### 동작 원리

Recast는 여러 단계의 메시 래스터화로 내비메시를 만들어요.

1. 입력 삼각형 메시를 **복셀**로 래스터화해요.
2. 에이전트가 움직일 수 없는 영역의 복셀을 걸러 없애요.
3. 복셀 격자가 나타내는 걸을 수 있는 영역을 다각형 영역들로 나눠요.
4. 이 영역들을 다시 삼각화해 내비게이션 다각형, 즉 내비메시를 만들어요.

내비메시는 하나로 만들 수도, 타일로 나눠 만들 수도 있어요. 단일 메시는 단순한 정적 환경에 맞고 다루기 쉬워요. 타일 메시는 더 복잡하지만 크고 동적인 환경에 맞고, 다시 굽기(re-baking), 계층적 경로 계획, 데이터 스트리밍 같은 Detour 고급 기능을 쓸 수 있어요.

공식 문서는 recastnav.com에 있고, 질문과 기능 요청은 GitHub Discussions에서 받아요. 라이선스는 **ZLib**이에요.
