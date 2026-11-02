---
layout: ../../../layouts/AnalysisLayout.astro
lang: en
slug: cardnews-production
title: "Making AI-assisted card stories: from draft to source review"
description: "A three-card walkthrough separates writing, rendering, review and publishing, with failure cases and accessible text."
date: "2026-10-29"
---

Approve the sentences before decorating them. Asking a model to design and verify everything in one pass makes attractive mistakes harder to catch. This walkthrough uses OIYO’s deterministic SVG renderer. It does not compare image or video products, prices or commercial-use rights.

<figure class="cost-chart"><figcaption>Source → 3 claims → 3 cards → review → publish</figcaption><ol><li>1. Give each card one claim and a supporting source</li><li>2. Render a small input first</li><li>3. Review both the picture and readable text</li></ol></figure>

## 1. Give each card one claim and a supporting source

Use the first card for the reader’s question, the second for evidence and conditions, and the third for a useful next step. Let a model draft within those roles, then open the original yourself and check numbers, dates and exceptions. Do not add causation or forecasts absent from the source. Legal or financial material also needs a jurisdiction and effective date.

## 2. Render a small input first

The download is a three-card English example about accessibility. The file is public; the command is for production staff with the OIYO News repository. Without that execution environment, use the structure as an editorial worksheet or save the SVG example as a separate file and open it in a browser.

[Download example input](/examples/cardnews-deck.json)

<figure class="cost-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" role="img" aria-labelledby="example-name"><title id="example-name">Source, draft, review</title><rect width="600" height="300" rx="12" fill="#14283a"/><text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text></svg><figcaption>SVG example you can open in a browser</figcaption></figure>

```sh
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example --dry-run
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example
```

<details><summary>SVG example you can open in a browser</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="name">
  <title id="name">Source, draft, review</title>
  <rect width="600" height="300" fill="#14283a"/>
  <text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text>
</svg>
```

</details>

## 3. Review both the picture and readable text

The output contains SVG cards, an HTML preview with the same wording, and a draft manifest. Generation does not establish factual correctness or publication. Check wrapping and legibility at phone width. Ensure readers who cannot see the image still get its essential information. An SVG title is not a replacement for a long chart description.

## What should you fix when it fails?

<div class="table-scroll" tabindex="0" role="region" aria-label="What should you fix when it fails?"><table><caption>What should you fix when it fails?</caption><thead><tr><th scope="col">Failure</th><th scope="col">Response</th></tr></thead><tbody><tr><th scope="row">Only 2 cards, or 9 cards</th><td>Keep 3–8 cards, or split the story.</td></tr><tr><th scope="row">Body exceeds 220 characters</th><td>Split the claim instead of deleting essential qualifications.</td></tr><tr><th scope="row">Output directory already exists</th><td>Choose a new directory to preserve the reviewed copy.</td></tr><tr><th scope="row">Source missing or does not support the claim</th><td>Stop publication and check the original, even if rendering succeeds.</td></tr></tbody></table></div>

## Before publishing

Check the original, dates, numbers and scope. Separately check rights for images, fonts and music. Open the saved SVG and HTML. Pass only approved files to the existing publishing process. This renderer does not log in, upload or send email.

## Sources and verification scope

This article documents our renderer’s input/output contract. Production speed, revenue and reach have not been measured.

- [MDN: SVG title](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
