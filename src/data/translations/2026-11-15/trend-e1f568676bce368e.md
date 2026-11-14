---
id: trend-e1f568676bce368e
title: "Building a Local AI Photography Editing Assistant. Anyone working on something similar? [D]"
sourceUrl: https://www.reddit.com/r/MachineLearning/comments/1xvzkwz/building_a_local_ai_photography_editing_assistant
summary: "r/MachineLearning 사용자가 RTX 5060 8GB와 64GB RAM으로, 사진을 분석해 필요한 보정 기법을 고르고 Photoshop·Lightroom에서 레이어와 마스크를 살린 채 실행하는 로컬 AI 사진 보정 비서를 구상하며 비슷한 프로젝트를 묻고 있어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

자동 수집 경로(Reddit API 키 없음, Wayback 스냅샷 없음)가 막혀, 데스크톱 브라우저(로그인 없이)로 Reddit 글을 직접 열어 본문을 옮겼어요. 아직 댓글이 없는 질문 글이에요.

### 하고 싶은 것

작성자는 풍경·인물 사진의 고급 보정 작업을 자동화하는 **로컬 AI 시스템**을 만들려고 해요. Adobe Creative Cloud 전체 앱, **RTX 5060 8GB**, **RAM 64GB**가 있고 Ollama로 로컬 LLM을 돌려 본 경험이 있어요.

목표는 AI 필터나 이미지 생성이 아니에요. **전문 보정 기법을 이해하고 Photoshop과 Lightroom에서 실행하는 비서**예요.

- **풍경**: 노출 블렌딩, 광도 마스크, 초점 스태킹, 파노라마, 색 보정, 닷지 앤 번
- **인물**: 피부 리터칭, 주파수 분리, 닷지 앤 번, 피부 톤 보정, 자연스러운 색 보정

이상적으로는 이미지를 분석해 필요한 기법을 정하고, 작업 흐름을 실행하고, **편집 가능한 Photoshop 레이어와 마스크를 남기는** 거예요.

### 고려 중인 방식

로컬 비전-언어 모델, Python/OpenCV, Photoshop **UXP 자동화**를 쓰고, 보정 튜토리얼과 작업 흐름 지식 베이스로 받치는 방안을 생각하고 있어요.

### 묻는 것

1. 비슷한 오픈소스 프로젝트가 있나요?
2. 로컬 AI 모델이 전문 보정 작업 흐름을 이해하고 재현할 수 있나요?
3. LLM + 컴퓨터 비전 + Photoshop 자동화가 맞는 접근인가요?
4. 로컬 LLM을 Adobe 소프트웨어와 연동해 본 사람이 있나요?

관련 프로젝트, 실험, 실용적인 접근을 듣고 싶다고 해요.
