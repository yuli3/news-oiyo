---
id: trend-bf5daa24c2b1f6ad
title: "Pangram Image 1.0 공개 - 사진과 영상에서 AI로 만든 부분을 탐지"
sourceUrl: https://www.pangram.com/blog/introducing-pangram-image-1-0
summary: "Pangram이 사진·영상 속 AI 생성 부분을 찾는 Pangram Image 1.0과 더 작고 빠른 Flash 1.0을 공개했어요. 히트맵으로 AI 영역을 표시하고, 실제 사진 100장을 12개 생성기로 흉내 낸 1,200장 평가에서 정확도 99.96%를 냈다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-08
---

Pangram 블로그 발표문 앞부분(새 기능, 프런티어 이미지 탐지, 견고성)을 읽고 옮겼어요.

### 리서치 프리뷰에서 1.0으로

Pangram은 몇 달 전 Pangram Image를 리서치 프리뷰로 냈고, 이번에 AI 이미지·영상 탐지 모두에서 최고 수준이라고 소개하는 **Pangram Image 1.0**을 발표했어요. 써 보며 약점을 찾아 준 커뮤니티에 감사를 전했어요.

### 새로운 점

플래그십 모델 **Pangram Image 1.0**:

- 프런티어 AI 이미지 생성기 탐지 최고 수준 성능
- 이미지 안에서 AI가 들어간 위치를 짚는 히트맵 출력
- 편집·압축·저해상도에 대한 견고성

더 작고 빠른 **Pangram Image Flash 1.0**:

- 프런티어 AI 영상 생성기 탐지 최고 수준 성능
- AI로 편집된 영상의 프레임별 분석
- 피드 속 AI를 탐지하는 크롬 확장 지원
- 이미지·영상 API 지원

### 프런티어 이미지 탐지 평가

Pangram은 여러 상용·학술 AI 이미지 탐지기와 비교했어요. 실제 사진 100장에 대해, 원본과 비슷한 프롬프트로 12개 최신 AI 이미지 생성기를 돌려 합성 "거울" 이미지 총 1,200장을 만들었고, 이 평가 세트에서 정확도 99.96%를 냈다고 해요.

학술 벤치마크로는 X-AIGD, Mirage-Test, AIGenImages2026, Synthbuster + RAISE 비교, Community Forensics를 썼다고 밝혀요.

### 견고성

많은 소셜 미디어가 이미지를 압축하고 축소하며, 악의적인 사용자는 블러·노이즈 같은 아티팩트를 넣어 AI 이미지를 진짜로 보이게 하려 해요. Pangram은 이런 변형을 탐지하도록 따로 학습했고, 모델이 이런 편집에 견고했다고 말해요.

> 저해상도 탐지, 영상 벤치마크, 업계 비교 수치 등 뒷부분은 이 정리에 넣지 않았어요.
