---
id: trend-4994baa5ae60e3b1
title: "What’s New for Game Developers: AI Animation and RTX Tools"
sourceUrl: https://developer.nvidia.com/blog/whats-new-for-game-developers-ai-animation-and-rtx-tools
summary: "엔비디아가 11월 게임 개발 업데이트를 정리했어요. War Thunder의 DLSS 5 통합 사례, 언리얼 엔진 5.9 프리뷰의 Kimodo AI 애니메이션, In-Game Inferencing SDK 1.8, RTX 경로 추적·조명 SDK 새 버전, Nsight의 DLSS-FG 분석과 MCP 서버가 담겼어요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

엔비디아 시니어 개발자 마케팅 매니저 Phillip Singh가 쓴 이번 달 게임 개발 소식이에요. 화질, 성능, 창작 의도 사이의 균형을 맞추면서 그래픽·애니메이션·로컬 AI 기능을 엔진에 넣을 수 있게 돕는 업데이트들이에요.

### War Thunder와 DLSS 5

- Gaijin Entertainment는 자체 Dagor Engine에 3D-Guided Neural Rendering을 쓰는 DLSS 5를 통합하면서 게임 고유의 비주얼 스타일을 유지했어요.
- 색 관리 파이프라인을 조정해 후처리와 UI 이전에 sRGB에서 DLSS 5를 평가하고, 결과를 다시 linear HDR로 매핑했어요.
- Gaijin은 DLSS 5가 하이라이트와 그림자를 개선하고 새로운 수준의 마이크로 콘트라스트를 더해 더 자연스럽고 세밀한 이미지를 만든다고 밝혔어요.
- 기체 마킹, 표면 마모, 재질 특성이 보존되도록 레퍼런스 룩에 맞춰 튜닝했고, 공중·지상·해상전을 따로 나눠 화질과 성능을 평가했어요.

### 언리얼 엔진 5.9 프리뷰의 Kimodo

언리얼 엔진 5.9 프리뷰에는 AI 모션 생성 모델을 다루는 가이드 애니메이션 프레임워크와 Sequencer 도구가 추가됐어요. 엔비디아 Kimodo는 여기에 처음 통합된 모델이에요. 애니메이터는 Sequencer 안에서 텍스트 프롬프트, 캐릭터가 따라갈 스플라인 경로, 특정 프레임의 목표 포즈로 동작을 지시해 캐릭터 모션을 GPU 가속으로 생성할 수 있어요.

### In-Game Inferencing SDK 1.8

NVIDIA ACE를 기기 안에서 통합하도록 돕는 SDK로, 여러 GPU·CPU 추론 백엔드에 공통 인터페이스를 제공해요. 1.8에서는 RTX Spark 지원 강화, llama.cpp·whisper.cpp 백엔드 업데이트, whisper.cpp를 통한 Parakeet 음성 인식 지원, Vulkan 우선순위 API 통합, 버그 수정이 들어갔어요.

### RTX 조명·경로 추적 도구

- **RTX Dynamic Illumination 3.2**: ReSTIR DI 공간 리샘플링용 층화 저불일치 샘플링, ReSTIR DI 폴백 샘플 기능, DI·GI·경로 추적용 리저버 시각화 강화, RTX Spark 지원을 더했어요.
- **Real-Time BVH Viewer 1.0**: GitHub에 공개된 도구로, 실행 중인 D3D12·Vulkan 앱의 TLAS·BLAS 가속 구조를 별도 창과 카메라로 보여줘요. 코드 수정 없이 실행 중인 프로세스에 붙일 수 있고, 픽셀별 트레이스 시간 히트맵과 지오메트리 필터를 제공해요.
- **RTX Path Tracing 1.9**: 이미지 기반 조명부터 ReSTIR DI, SHaRC 방사 캐싱까지 9단계로 기능을 하나씩 더해 보는 입문 샘플이 생겼어요. SHaRC는 기본 활성화돼 DLSS Ray Reconstruction에 간접광 정보를 제공하고, 최대 200만 개 광원을 다루는 NEE-AT 샘플링 확장도 포함됐어요.
- **RTX Global Illumination 2.9**: NRC 또는 SHaRC를 쓰는 IndirectDiffuse 샘플과 D3D12(Shader Model 6.9)·Vulkan용 SER 지원이 추가됐어요.

### Nsight Graphics·Nsight Systems

Nsight Graphics 2026.4와 Nsight Systems 2026.6은 DLSS Frame Generation을 쓰는 앱을 분석할 수 있어요. GPU Trace는 앱 프레임과 표시 프레임을 별도 행으로 보여주고, Nsight Systems는 생성 프레임을 구분해 CPU 프레임 구간과 연결해요. 두 도구 모두 Streamline SDK 2.12 이상이 필요해요. 또 새 Nsight Graphics MCP 서버로 AI 에이전트가 캡처·디버깅·GPU 트레이스 분석을 할 수 있고, Nsight Systems에는 CPU 병목과 프레임 끊김 진단을 안내하는 스킬 파일이 들어갔어요.
