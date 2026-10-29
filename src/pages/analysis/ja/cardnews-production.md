---
layout: ../../../layouts/AnalysisLayout.astro
lang: ja
slug: cardnews-production
title: "AIカード記事の作り方：下書きから出典確認まで"
description: "3枚の例で執筆・描画・確認・公開を分け、失敗例と読み上げ用の情報を確認します。"
date: "2026-10-29"
---

装飾より先に文章を確定しましょう。デザインと事実確認を一度にモデルへ任せると、見栄えのよい誤りを見落としがちです。この記事はOIYOの決定的なSVGレンダラーの制作手順です。画像・動画サービスの性能、価格、商用利用権の比較ではありません。

<figure class="cost-chart"><figcaption>原文 → 3つの主張 → 3枚 → 確認 → 公開</figcaption><ol><li>1. 1枚につき主張と出典を1つずつ対応させます</li><li>2. 小さな入力から描画します</li><li>3. 画像と読める本文を一緒に確認します</li></ol></figure>

## 1. 1枚につき主張と出典を1つずつ対応させます

1枚目は読者の疑問、2枚目は根拠と条件、3枚目は次の行動にします。AIに役割を指定して下書きさせ、人が原文を開いて数値・日付・例外を照合します。原文にない因果関係や予測を足さないでください。法律・金融の情報は対象の国と適用日も確認します。

## 2. 小さな入力から描画します

ダウンロードできるのはアクセシビリティを扱う英語3枚の例です。入力ファイルは公開されていますが、実行コマンドはOIYO Newsリポジトリを使う制作担当者向けです。実行環境がない場合も企画表として使えます。下のSVG例は別ファイルに保存すればブラウザーで開けます。

[入力例をダウンロード](/examples/cardnews-deck.json)

<figure class="cost-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" role="img" aria-labelledby="example-name"><title id="example-name">Source, draft, review</title><rect width="600" height="300" rx="12" fill="#14283a"/><text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text></svg><figcaption>ブラウザーで開けるSVG例</figcaption></figure>

```sh
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example --dry-run
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example
```

<details><summary>ブラウザーで開けるSVG例</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="name">
  <title id="name">Source, draft, review</title>
  <rect width="600" height="300" fill="#14283a"/>
  <text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text>
</svg>
```

</details>

## 3. 画像と読める本文を一緒に確認します

出力はSVG、同じ文章を含むHTMLプレビュー、下書きmanifestです。生成できても事実確認済み・公開済みとは限りません。スマートフォンの幅で改行と読みやすさを確認し、画像を見られない読者にも重要な情報を届けます。長い図表の説明をSVGのtitleだけで代用しないでください。

## 失敗したときの直し方

<div class="table-scroll" tabindex="0" role="region" aria-label="失敗したときの直し方"><table><caption>失敗したときの直し方</caption><thead><tr><th scope="col">条件</th><th scope="col">対応</th></tr></thead><tbody><tr><th scope="row">2枚または9枚になった</th><td>3〜8枚に収めるか記事を分けます。</td></tr><tr><th scope="row">本文が220文字を超えた</th><td>重要な条件を削らず、主張を次のカードへ分けます。</td></tr><tr><th scope="row">出力フォルダーが存在する</th><td>新しいフォルダーを使い、確認済みの版を残します。</td></tr><tr><th scope="row">出典がない・主張を裏付けない</th><td>描画に成功しても公開を止め、原文を確認します。</td></tr></tbody></table></div>

## 公開前の確認

原文、日付、数値、対象範囲を確認しましょう。画像・フォント・音楽の利用条件は別途確認します。保存したSVGとHTMLを実際に開き、承認済みのファイルだけを既存の公開手順に渡します。このレンダラーはログイン、アップロード、メール送信を行いません。

## 出典と検証範囲

自社レンダラーの入出力仕様を説明しています。制作速度、収益、リーチは測定していません。

- [MDN: SVG title](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
