---
id: trend-08e12b5efd291bed
title: "Gemini 4 Carbon is now available"
sourceUrl: https://deepmind.google/blog/gemini-4-carbon-is-now-available
summary: "DeepMind 블로그에도 Gemini 4 Carbon 공개 글이 실렸어요. 같은 글로, 복잡한 지식 작업·금융 리서치·멀티에이전트 코딩 사례와 Antigravity /swarm 예시를 자세히 소개하고, 가격은 Argon과 같은 입력 2달러·출력 10달러(100만 토큰당)예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

DeepMind 블로그에 실린 글은 Google 블로그의 Gemini 4 Carbon 발표(오늘 함께 실린 항목)와 같은 글이에요. 두 페이지를 함께 읽고, 여기서는 지식 작업과 코딩 사례 부분을 중심으로 옮겼어요. 글 마지막 부분은 읽지 못해 partial로 표시했어요.

### 요약

Gemini 4 Carbon은 Google의 가장 강한 모델로, 복잡한 다단계 코딩·디버깅과 열린 과학 연구처럼 모델 지능의 한계를 시험하는 작업용이에요. 대부분의 일상 작업에는 Gemini 4 Argon이 여전히 알맞다고 해요. 가격은 Argon과 같은 도입가로 입력 100만 토큰당 2달러, 출력 10달러예요.

### 더 정밀한 지식 작업

- 밀도 높은 문서와 데이터 묶음에서 근거 있는 통찰을 끌어내고, 엄격한 스키마와 서식을 지켜 스프레드시트·프레젠테이션·보고서를 만든다고 해요.
- 기존 벤치마크가 차트·이미지·도면·표가 가득한 파일 위에서 에이전트가 추론하는 능력을 제대로 재지 못해서, Artificial Analysis와 **멀티모달 지식 에이전트(MKA)** 벤치마크를 새로 만들었어요. Carbon은 2위이고 1위 모델보다 작업당 평균 비용이 6배 이상 낮다고 해요.
- 금융에서는 Hebbia의 E2E Financial Agentic 평가에서 최고 모델과 같은 성능을, Balyasny Asset Management의 General Financial Intelligence 벤치마크에서 23개 프런티어 모델 구성 중 1위를 했다고 해요.

### 에이전트 코딩, 풀스택, 3D·UI 디자인

- 여러 패키지에 걸친 마이그레이션, 하위 시스템을 넘나드는 원인 조사, 복잡한 아키텍처 재설계처럼 멀티에이전트 협업이 필요한 작업에 강하다고 해요.
- 웹앱 개발에서는 빌드·검증 루프를 돌고, 오류에서 회복하고, 코드와 렌더링된 UI를 모두 확인해 완성된 앱을 만든다고 해요.
- 시각 디자인과 공간 추론이 좋아져 3D 게임과 크리에이티브 코딩에도 이어진다고 해요.

### /swarm 예시

- 시의회 공개 PDF 7개(도면 206개)와 프롬프트 하나로 Google Platform 37 사무실을 90만 6천 개 삼각형의 Three.js 3D로 10번의 밤샘 루프에 걸쳐 재구성했어요.
- 학술 논문을 바탕으로 가상 섬유 유한요소 프레임워크를 모델링한 직물 시각화 도구를 만들었어요.
- 펠리컨이 GBike를 타고 Mountain View 캠퍼스를 누비는 오픈월드 3D 게임을 만들었는데, 서브에이전트가 Blender로 3D 에셋을 만들고 Three.js·WebGL 셰이더로 게임을 짓고 Web Audio 효과음과 Lyria 음악을 붙였다고 해요.

> 금융 섹션에도 함께 보이는 글이에요. 정보 제공용이며 투자 권유가 아니에요.
