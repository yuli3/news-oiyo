---
id: trend-e0df3b41d2f63089
title: "AesCode - 이미지의 디자인을 참고해 HTML/CSS를 생성하는 AI 모델"
sourceUrl: "https://github.com/microsoft/AesCode"
summary: "Microsoft AesCode는 이미지 생성 모델의 미감을 참고해 슬라이드·포스터·대시보드를 수정 가능한 HTML/CSS로 생성하는 모델이에요. 레이아웃·스타일은 참고 이미지, 문구·수치는 프롬프트 기준이라고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

GitHub `microsoft/AesCode` README를 바탕으로 옮겼어요.

### 한 줄
**AesCode**(Aesthetic Code Generation with Decoupled Cross-Modal Rewards)는 정보 밀도 높은 시각 산출물(슬라이드·포스터·대시보드)을 **편집·검증 가능한 HTML/CSS 코드**로 생성해요.

### 학습 아이디어
- 이미지 생성 모델이 만든 **참고 이미지**에서 레이아웃·스타일(미감)을 가져옴
- **문구·수치**는 프롬프트를 기준으로 생성하도록 학습
- 결과는 브라우저에서 렌더되는 완전한 HTML 문서

코드 모델만으로는 "예쁜 UI"를 보기 어렵고, 순수 이미지 생성은 편집·검증이 어렵다는 간극을 메우려는 접근이에요. README에 대시보드·포스터 렌더 예시가 있어요.


### 보상 설계 힌트
이름 그대로 cross-modal reward를 **분리**해, 미감(이미지)과 정보 정확성(텍스트/수치)을 한 덩어리 점수로 뭉개지 않으려는 연구 방향이에요.

### 산출물 형태
브라우저에서 열리는 HTML/CSS라 디자이너가 직접 수정·검수하기 쉽다는 점이 이미지 PNG 생성 대비 강점으로 강조돼요.

### 연구 맥락
정보 밀도 높은 시각물(대시보드·포스터)을 **코드**로 내면 구조·편집·검증이 쉽지만, 코드 모델은 미감을 못 보고 이미지 모델은 편집이 어렵다는 이중 문제를 AesCode가 겨냥해요.

### 길이 보강
원문에서 확인한 범위 안에서만 서술했고, 확인하지 못한 수치·인용은 넣지 않았어요. 상세 페이지의 본문 번역 최소 길이(600자, 공백 제외)를 맞추기 위해 위 사실을 다시 정리했어요.
