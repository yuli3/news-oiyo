---
layout: ../../../layouts/AnalysisLayout.astro
lang: zh
slug: cardnews-production
title: "用AI制作图文卡片：从草稿到核对来源"
description: "用三张卡片区分写作、渲染、审核和发布，附失败处理与无障碍说明。"
date: "2026-10-29"
---

先确定文字，再做装饰。让模型同时设计和核实事实，容易漏掉好看却错误的内容。本文演示OIYO确定性SVG渲染器的制作流程，不比较图像或视频产品的性能、价格或商业使用权。

<figure class="cost-chart"><figcaption>原文 → 3个要点 → 3张卡片 → 审核 → 发布</figcaption><ol><li>1. 每张卡片对应一个要点和来源</li><li>2. 先用小输入渲染</li><li>3. 同时审核图片与可读正文</li></ol></figure>

## 1. 每张卡片对应一个要点和来源

第一张提出读者的问题，第二张说明证据与条件，第三张给出下一步。让模型按角色起草，再由人打开原文核对数字、日期和例外。不要增加来源未支持的因果关系或预测。法律与金融内容还要明确适用地区和生效日期。

## 2. 先用小输入渲染

下载文件是讨论无障碍设计的三张英文示例。文件公开提供，但命令面向拥有OIYO News仓库的制作人员。没有执行环境时，可把该结构当作策划表，也可将下面的SVG示例另存为文件，用浏览器打开。

[下载输入示例](/examples/cardnews-deck.json)

<figure class="cost-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" role="img" aria-labelledby="example-name"><title id="example-name">Source, draft, review</title><rect width="600" height="300" rx="12" fill="#14283a"/><text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text></svg><figcaption>可在浏览器打开的SVG示例</figcaption></figure>

```sh
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example --dry-run
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example
```

<details><summary>可在浏览器打开的SVG示例</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="name">
  <title id="name">Source, draft, review</title>
  <rect width="600" height="300" fill="#14283a"/>
  <text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text>
</svg>
```

</details>

## 3. 同时审核图片与可读正文

输出包括SVG卡片、包含相同文字的HTML预览和草稿manifest。生成成功不代表事实正确或已经发布。请在手机宽度下检查换行和可读性，让看不到图片的读者也能获取关键信息。长图表说明不能只靠SVG的title代替。

## 失败后怎么处理？

<div class="table-scroll" tabindex="0" role="region" aria-label="失败后怎么处理？"><table><caption>失败后怎么处理？</caption><thead><tr><th scope="col">失败条件</th><th scope="col">处理方式</th></tr></thead><tbody><tr><th scope="row">只有2张或多达9张</th><td>保持3至8张，或拆分主题。</td></tr><tr><th scope="row">正文超过220字符</th><td>将要点拆到下一张，不要先删除重要限定条件。</td></tr><tr><th scope="row">输出目录已经存在</th><td>选择新目录，保留已审核版本。</td></tr><tr><th scope="row">没有来源或来源不支持要点</th><td>即使渲染成功也应暂停发布，先核对原文。</td></tr></tbody></table></div>

## 发布前检查

核对原文、日期、数字和适用范围；另行检查图片、字体、音乐的使用条件。实际打开保存的SVG和HTML。只将审核通过的文件交给现有发布流程。渲染器不会登录账号、上传或发送邮件。

## 来源与核验范围

本文说明自有渲染器的输入输出规则，没有测量制作速度、收益或触达率。

- [MDN: SVG title](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
