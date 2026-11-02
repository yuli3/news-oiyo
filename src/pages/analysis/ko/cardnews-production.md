---
layout: ../../../layouts/AnalysisLayout.astro
lang: ko
slug: cardnews-production
title: "AI 카드뉴스 만들기: 초안에서 출처 검수까지"
description: "3장짜리 예제로 기획·렌더링·검수·배포를 나누고, 실패 사례와 접근성까지 확인해요."
date: "2026-10-29"
---

먼저 3장의 문장을 확정한 뒤 그림을 입히세요. AI에게 디자인과 사실 확인을 한꺼번에 맡기면 보기 좋은 오답을 잡기 어려워요. 여기서는 OIYO의 결정적 SVG 렌더러로 제작 흐름을 설명해요. 외부 이미지·영상 서비스의 성능·가격·상업 이용 권리를 비교한 글은 아니에요.

<figure class="cost-chart"><figcaption>원문 → 주장 3개 → 카드 3장 → 검수 → 게시</figcaption><ol><li>1. 카드마다 하나의 주장과 출처를 연결해요</li><li>2. 작은 입력으로 먼저 렌더링해요</li><li>3. 화면과 읽을 수 있는 본문을 함께 검수해요</li></ol></figure>

## 1. 카드마다 하나의 주장과 출처를 연결해요

첫 장은 독자의 질문, 둘째 장은 근거와 조건, 셋째 장은 독자가 할 일을 담아요. 모델에는 이 역할 안에서 초안을 쓰게 하고, 사람이 원문을 열어 수치·시점·예외를 대조해요. 출처가 말하지 않은 인과관계나 전망을 덧붙이지 마세요. 법률·금융 콘텐츠라면 해당 국가와 적용일도 확정해야 해요.

## 2. 작은 입력으로 먼저 렌더링해요

아래 예제는 접근성 설명을 담은 영어 3장 템플릿이에요. 다운로드 자체는 무료 공개 파일이고, 실행 명령은 OIYO News 저장소의 제작 담당자용이에요. 저장소 실행 환경이 없는 독자는 이 형식을 기획표로 사용하거나 SVG 예제를 별도 파일로 저장해 브라우저에서 열 수 있어요.

[예제 입력 다운로드](/examples/cardnews-deck.json)

<figure class="cost-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" role="img" aria-labelledby="example-name"><title id="example-name">Source, draft, review</title><rect width="600" height="300" rx="12" fill="#14283a"/><text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text></svg><figcaption>브라우저에서 열 수 있는 SVG 예제</figcaption></figure>

```sh
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example --dry-run
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example
```

<details><summary>브라우저에서 열 수 있는 SVG 예제</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="name">
  <title id="name">Source, draft, review</title>
  <rect width="600" height="300" fill="#14283a"/>
  <text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text>
</svg>
```

</details>

## 3. 화면과 읽을 수 있는 본문을 함께 검수해요

출력은 SVG 카드, 같은 문장을 담은 HTML 미리보기, 초안 manifest예요. 생성됐다는 사실은 내용 검증이나 게시 완료를 뜻하지 않아요. 휴대폰 폭에서 글자와 줄바꿈을 확인하고, 이미지를 못 보는 독자도 핵심 내용을 읽을 수 있는지 살펴보세요. SVG의 title만으로 긴 도표 설명을 대신하지 마세요.

## 실패하면 무엇을 고칠까요?

<div class="table-scroll" tabindex="0" role="region" aria-label="실패하면 무엇을 고칠까요?"><table><caption>실패하면 무엇을 고칠까요?</caption><thead><tr><th scope="col">실패 조건</th><th scope="col">처리</th></tr></thead><tbody><tr><th scope="row">카드가 2장 또는 9장이에요</th><td>3~8장 범위로 기획을 줄이거나 나눠요.</td></tr><tr><th scope="row">본문이 220자를 넘어요</th><td>중요한 단서부터 지우지 말고 주장 하나를 다음 장으로 나눠요.</td></tr><tr><th scope="row">출력 폴더가 이미 있어요</th><td>새 폴더를 지정해 기존 검수본을 보존해요.</td></tr><tr><th scope="row">출처가 없거나 내용과 맞지 않아요</th><td>렌더러 통과 여부와 무관하게 게시를 멈추고 원문부터 확인해요.</td></tr></tbody></table></div>

## 게시 전 마지막 확인

원문·날짜·숫자·적용 범위를 확인했나요? 이미지·폰트·음악의 이용 조건은 별도로 확인했나요? 저장한 SVG·HTML을 실제로 열어 봤나요? 검수자가 승인한 파일만 기존 게시 흐름으로 넘기세요. 이 렌더러는 계정 로그인·업로드·메일 발송을 하지 않아요.

## 출처와 검증 범위

이 글은 자체 렌더러의 입력·출력 계약을 설명해요. 제품별 제작 시간·수익·도달률은 측정하지 않았어요.

- [MDN: SVG title](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
