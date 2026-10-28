---
id: trend-fa9da53ef92b511b
title: "processing/p5.js"
sourceUrl: https://github.com/processing/p5.js
summary: "p5.js는 Processing의 원칙을 웹으로 옮긴 무료 오픈소스 JavaScript 크리에이티브 코딩 라이브러리예요. 예술가, 디자이너, 교육자, 입문자가 브라우저에서 그림·소리·인터랙션 작품을 만들 수 있게 해 줘요. 2.0 베타는 beta.p5js.org에 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

> GitHub 저장소 첫 화면과 README 앞부분을 기준으로 정리했어요.

### 무엇인가

**p5.js**는 접근하기 쉬운 크리에이티브 코딩을 위한 무료 오픈소스 JavaScript 라이브러리예요. README는 스스로를 "돌봐 주는 커뮤니티, 다가가기 쉬운 언어, 탐색 도구, 접근성 있는 환경, 포용적인 플랫폼"이라고 소개해요. 저장소 설명에 따르면 **Processing**의 핵심 원칙을 바탕으로 하고, p5.js 2.0은 beta.p5js.org에서 볼 수 있어요.

### 이렇게 생겼어요

```js
function setup() {
  createCanvas(400, 400);
  background(255);
}
function draw() {
  circle(mouseX, mouseY, 80);
}
```

마우스를 따라 원을 그리는 두 함수만으로 스케치가 돌아가요.

### 특징

| 항목 | 내용 |
|---|---|
| 가치 | 접근성, 포용성, 커뮤니티, 즐거움을 우선 |
| 표현 | 그림 도구 전체, 오디오·비주얼·인터랙티브·실험적·생성형 작업 |
| 관점 | 웹 페이지 자체를 스케치로 보기 |
| 문서 | 여러 언어 지원, 시각 예제가 많은 레퍼런스 |
| 지원 | Processing Foundation 기부로 후원 가능 |

### 기여

버그나 기능 요청은 이슈로 올리면 되고, 기여 가이드와 템플릿이 있어요. 저장소엔 `AGENTS.md`와 `AI_USAGE_POLICY.md`도 있어 AI 도구 사용 기여에 대한 정책을 따로 두고 있어요.
