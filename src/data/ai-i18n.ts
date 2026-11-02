// UI strings for the AI pricing and use-case pages in six languages (2026-10-20).
// Content (prices, services) lives in ai-pricing*.ts and ai-use-cases*.ts; this file is only interface text.

export const LOCALES = ["ko", "en", "ja", "zh", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const LOCALE_NAMES: Record<Locale, string> = { ko: "한국어", en: "English", ja: "日本語", zh: "简体中文", fr: "Français", es: "Español" };

export const pricingPath = (l: Locale) => (l === "ko" ? "/ai/pricing/" : `/ai/${l}/pricing/`);
export const hubPath = (l: Locale) => (l === "ko" ? "/ai/use-cases/" : `/ai/${l}/use-cases/`);
export const guidePath = (l: Locale, slug: string) => `${hubPath(l)}${slug}/`;
export const allPaths = (f: (l: Locale) => string) => Object.fromEntries(LOCALES.map((l) => [l, f(l)])) as Record<Locale, string>;

export interface UiStrings {
  skip: string; related: string; otherLanguages: string; family: string; privacy: string; terms: string; license: string;
  pricingShort: string; useCasesShort: string;
  // pricing
  pricingTitle: string; pricingH1: string; pricingLede: string; pricingNote: string; checkedOn: string;
  toc: [string, string, string, string, string, string];
  budgetLede: string; plansTitle: string;
  colPlan: string; colUsd: string; colLocal: string; colWhat: string; officialWeb: string; appStore: string; reported: string; source: string;
  billingTitle: string; billingRows: [string, string][]; colCheck: string; colWhy: string;
  apiTitle: string; apiLede: string; colModel: string; colInput: string; colCached: string; colOutput: string; colNote: string; original: string;
  calcTitle: string; calcLede: string; calcInput: string; calcOutput: string; calcCache: string; calcHelp: string;
  tipsTitle: string; tips: string[]; sourcesTitle: string; sourcesLede: string;
  // guides
  hubTitle: string; hubH1: string; hubLede: string; hubReady: string; hubMore: (n: number) => string; hubMoreLede: string; guideReady: string; soon: string; hubPricing: string;
  services: string; audience: string; price: string; workflow: string; combos: string; colCombo: string; colWhyCombo: string; cautions: string; seeAlso: string; allGuides: string; sources: string; checkedLine: string; workflowSuffix: string;
}

export const UI: Record<Locale, UiStrings> = {
  ko: {
    skip: "본문 바로가기", related: "관련 정보", otherLanguages: "다른 언어", family: "패밀리 사이트", privacy: "개인정보", terms: "이용약관", license: "라이선스",
    pricingShort: "요금 비교", useCasesShort: "분야별 AI",
    pricingTitle: "AI 구독료·API 비용 비교 (2026년 10월): ChatGPT·Claude·Gemini·Grok·Muse", pricingH1: "AI 구독료·API 비용 비교",
    pricingLede: "2026년 10월 기준, 다섯 회사의 구독 요금제와 여섯 회사의 API 단가를 공식 페이지에서 옮겼어요.",
    pricingNote: "가격은 자주 바뀌어요. 모든 숫자 옆의 출처를 결제 직전에 다시 열어 보세요. 공식 페이지에서 금액을 읽지 못한 칸은 비워 두었고, 보도로만 확인한 금액은 따로 표시했어요.",
    checkedOn: "확인일", toc: ["예산별로 보기", "구독 요금제", "구독 방식 차이", "API 단가", "API 월 비용 계산", "출처"],
    budgetLede: "원화 가격이 확인된 요금제만 묶었어요. 한국 앱스토어 가격(부가세 포함)을 우선 썼고, 없으면 한국 공식 웹 가격을 썼어요. 웹에서 달러로 결제하면 세금이 따로 붙거나 환율에 따라 달라질 수 있어요.",
    plansTitle: "회사별 구독 요금제", colPlan: "요금제", colUsd: "공식 달러가(월)", colLocal: "한국 원화가(월)", colWhat: "무엇이 달라요", officialWeb: "공식 웹", appStore: "앱스토어", reported: "보도 기준", source: "출처",
    billingTitle: "같은 \"월 구독\"이라도 방식이 달라요", colCheck: "확인할 것", colWhy: "왜 중요해요",
    billingRows: [
      ["웹 결제 vs 앱 결제", "공식 웹 가격은 대개 달러·세금 별도, 앱스토어는 원화·부가세 포함이에요. 예를 들어 Claude Pro는 $20(세금 별도)와 앱 ₩33,000이 같은 요금제예요."],
      ["사용량 리셋 주기", "Claude는 5시간 단위로 한도가 다시 차고 주간 한도가 따로 있을 수 있어요. Muse Code도 5시간·주간 주기를 써요. \"무제한\"이라고 적힌 곳도 남용 방지 한도가 있어요."],
      ["배수로 표시된 한도", "Claude Max 5x·20x, Google AI Ultra 5x·20x, Muse Code 5배·20배·80배처럼 기준 요금제 대비 배수로 적어요. 기준 한도가 숫자로 공개되지 않은 경우가 많아요."],
      ["API 크레딧 포함 여부", "Claude Max는 매달 API 크레딧 $100·$200, Team은 팀 전체 최대 $500을 포함해요. 다른 회사 구독은 API 사용료가 별도예요."],
      ["저장공간·번들", "Google AI 요금제에는 Drive 저장공간(400GB~)이 같이 들어 있어요. 이미 Google One을 쓰고 있다면 실제 추가 비용은 그만큼 작아요."],
      ["연간 결제", "Claude Pro는 연간 월 $17($200 선결제), ChatGPT Business와 Claude Team은 연간이 좌석당 $5씩 싸요. 중도 해지 조건을 먼저 확인하세요."],
      ["코딩 에이전트 포함", "ChatGPT는 Codex, Claude는 Claude Code, Google AI Pro는 Antigravity, Meta는 Muse Code를 같은 구독 안에서 써요."],
    ],
    apiTitle: "API 단가 (100만 토큰당, USD)", apiLede: "직접 앱이나 자동화를 만들 때 내는 종량제 요금이에요. 구독과 별개로 청구돼요. 표는 각 회사의 표준 처리 단가이고, 묶음 처리(Batch)는 대부분 50% 싸요.",
    colModel: "모델", colInput: "입력", colCached: "캐시 입력", colOutput: "출력", colNote: "참고", original: "원문",
    calcTitle: "내 사용량으로 API 월 비용 계산", calcLede: "한 달에 보내는 입력·출력 토큰 수를 넣으면 모델별 비용을 싼 순서로 보여 줘요. 한국어 1글자는 대략 1~2토큰이지만 모델마다 달라요.",
    calcInput: "입력 토큰 (백만/월)", calcOutput: "출력 토큰 (백만/월)", calcCache: "캐시 적중 비율 (%)", calcHelp: "기본값: 입력 1,000만, 출력 200만 토큰, 캐시 0%. 캐시 쓰기 비용, 도구 호출료, 긴 프롬프트 할증, 할인 시간대는 빠져 있어요.",
    tipsTitle: "고를 때 기억할 세 가지",
    tips: ["단가보다 끝낸 작업당 비용을 보세요. 싼 모델로 세 번 고치는 것보다 비싼 모델로 한 번에 끝내는 편이 쌀 수 있어요.", "예정된 인상을 확인하세요. Gemini 4 Argon은 2026-12-01, Gemini 3.8 Flash는 2027-01-01부터 단가가 두 배가 돼요.", "민감한 자료를 넣기 전에 데이터 조건을 읽으세요. Meta Muse Spark의 Contributor 모드처럼 싼 대신 입력이 제품 개선에 쓰이는 등급도 있어요."],
    sourcesTitle: "출처와 확인 범위", sourcesLede: "아래 공식 페이지를 열어 숫자를 옮겼어요. 직접 결제해 본 가격이 아니며, 국가·결제 수단·프로모션에 따라 달라질 수 있어요.",
    hubTitle: "분야별 AI 활용 가이드 — 노무·법무·세무·PPT·광고까지", hubH1: "분야별 AI 활용 가이드",
    hubLede: "\"AI가 좋다\"보다 \"이 일에는 어떤 서비스를 무엇과 묶어 쓰는지\"를 정리해요. 각 가이드는 확인일과 출처를 붙이고, 사람이 최종 판단해야 하는 선을 함께 적어요.",
    hubReady: "지금 읽을 수 있는 가이드", hubMore: (n) => `앞으로 다룰 분야 (${n}개)`, hubMoreLede: "분야를 누르면 그 분야에서 사람들이 찾는 말을 볼 수 있어요. 가이드가 있는 분야는 바로 연결돼요.", guideReady: "가이드 있음", soon: "준비 중", hubPricing: "요금이 궁금하면 AI 구독료·API 비용 비교를 함께 보세요.",
    services: "어떤 서비스가 있나요", audience: "대상", price: "가격", workflow: "이 순서로 써 보세요", combos: "함께 쓰면 좋은 조합", colCombo: "조합", colWhyCombo: "왜 좋아요", cautions: "쓸 때 지킬 선", seeAlso: "함께 보기", allGuides: "분야별 AI 활용 가이드 전체", sources: "출처", checkedLine: "아래 서비스 정보는 각 줄의 출처 기사·공식 자료를 따랐어요.", workflowSuffix: "워크플로우",
  },
  en: {
    skip: "Skip to content", related: "Related", otherLanguages: "Other languages", family: "Family sites", privacy: "Privacy", terms: "Terms", license: "License",
    pricingShort: "AI pricing", useCasesShort: "AI by task",
    pricingTitle: "AI Subscription & API Pricing in the US (October 2026): ChatGPT, Claude, Gemini, Grok, Muse", pricingH1: "AI subscription and API pricing (US)",
    pricingLede: "Subscription plans from five companies and API rates from six, copied from official pages as of October 2026, with US App Store prices.",
    pricingNote: "Prices change often. Re-open the source next to each number before you pay. Cells are blank where the official page did not show an amount; press-only figures are labeled.",
    checkedOn: "Checked", toc: ["By budget", "Plans", "How billing differs", "API rates", "API cost calculator", "Sources"],
    budgetLede: "Plans grouped by their US App Store monthly price. Web checkout may differ and sales tax is added where it applies.",
    plansTitle: "Plans by company", colPlan: "Plan", colUsd: "Official price (USD/mo)", colLocal: "US App Store (mo)", colWhat: "What you get", officialWeb: "official web", appStore: "App Store", reported: "reported", source: "Source",
    billingTitle: "Same \"monthly plan\", different billing", colCheck: "Check", colWhy: "Why it matters",
    billingRows: [
      ["Web vs. App Store", "App Store prices can be higher than web prices for the same plan: Claude Max 5x is $100 on the web and $124.99 in the App Store."],
      ["Usage resets", "Claude refills limits every five hours and may also apply weekly caps; Muse Code uses five-hour and weekly cycles. \"Unlimited\" plans still have abuse limits."],
      ["Limits shown as multiples", "Claude Max 5x/20x, Google AI Ultra 5x/20x and Muse Code 5x/20x/80x are multiples of a base plan whose exact limit is often unpublished."],
      ["API credits", "Claude Max includes $100 or $200 of API credits a month and Team up to $500 pooled. Other subscriptions bill API use separately."],
      ["Storage bundles", "Google AI plans include Google One storage (from 400 GB). If you already pay for storage, the real extra cost is lower."],
      ["Annual billing", "Claude Pro is $17/mo billed annually ($200 upfront); ChatGPT Business and Claude Team seats are $5 cheaper annually."],
      ["Coding agents included", "ChatGPT includes Codex, Claude includes Claude Code, Google AI Pro includes Antigravity, and Meta sells Muse Code."],
    ],
    apiTitle: "API rates (per 1M tokens, USD)", apiLede: "Pay-as-you-go prices for building apps and automations, billed separately from subscriptions. Standard tier shown; batch processing is usually 50% off.",
    colModel: "Model", colInput: "Input", colCached: "Cached input", colOutput: "Output", colNote: "Notes", original: "source",
    calcTitle: "Estimate your monthly API cost", calcLede: "Enter your monthly input and output tokens to rank models from cheapest. One English word is roughly 1.3 tokens; check your real usage logs.",
    calcInput: "Input tokens (millions/mo)", calcOutput: "Output tokens (millions/mo)", calcCache: "Cache hit rate (%)", calcHelp: "Default: 10M input, 2M output, 0% cache. Excludes cache writes, tool fees, long-context surcharges and off-peak discounts.",
    tipsTitle: "Three things to remember",
    tips: ["Compare cost per finished task, not per token. One pass with a stronger model can beat three passes with a cheap one.", "Watch scheduled increases: Gemini 4 Argon doubles on 2026-12-01 and Gemini 3.8 Flash on 2027-01-01.", "Read the data terms before sending sensitive files. Some cheap tiers, like Meta Muse Spark's Contributor mode, use your inputs to improve the product."],
    sourcesTitle: "Sources and scope", sourcesLede: "Numbers were copied from the official pages below. We did not buy each plan; prices vary by country, payment method and promotion.",
    hubTitle: "AI Tools by Task — Legal, HR, Tax, Slides, Ads (US)", hubH1: "AI tools by task (US)",
    hubLede: "Not \"which AI is best\" but which service to pair with what for a specific job in the US, with sources, check dates and the lines a human still has to hold.",
    hubReady: "Guides available now", hubMore: (n) => `All work areas (${n})`, hubMoreLede: "Open an area to see the searches people use for it. Areas with a guide link straight to it.", guideReady: "guide", soon: "coming", hubPricing: "For prices, see AI subscription and API pricing.",
    services: "Services to know", audience: "For", price: "Price", workflow: "Workflow", combos: "Combinations that work", colCombo: "Combination", colWhyCombo: "Why", cautions: "Limits to keep", seeAlso: "See also", allGuides: "All AI-by-task guides", sources: "Sources", checkedLine: "Each service line follows the article or official page cited under it.", workflowSuffix: "workflow",
  },
  ja: {
    skip: "本文へ", related: "関連情報", otherLanguages: "他の言語", family: "ファミリーサイト", privacy: "プライバシー", terms: "利用規約", license: "ライセンス",
    pricingShort: "料金比較", useCasesShort: "用途別AI",
    pricingTitle: "AIサブスク・API料金比較（2026年10月・日本）：ChatGPT・Claude・Gemini・Grok・Muse", pricingH1: "AIサブスク・API料金比較（日本）",
    pricingLede: "2026年10月時点で、5社のサブスクプランと6社のAPI単価を公式ページから転記しました。円の価格は日本のApp Storeの表示です。",
    pricingNote: "価格はよく変わります。支払う前に各数字の出典を開き直してください。公式ページで金額を確認できなかった欄は空欄、報道でのみ確認した金額は区別して表示しています。",
    checkedOn: "確認日", toc: ["予算別", "プラン", "課金方式の違い", "API単価", "API月額計算", "出典"],
    budgetLede: "日本のApp Storeの月額（税込）があるプランだけをまとめました。Webで米ドル決済すると為替や税の扱いで変わります。",
    plansTitle: "会社別プラン", colPlan: "プラン", colUsd: "公式価格（USD/月）", colLocal: "日本App Store（月）", colWhat: "主な違い", officialWeb: "公式Web", appStore: "App Store", reported: "報道ベース", source: "出典",
    billingTitle: "同じ「月額プラン」でも仕組みが違う", colCheck: "確認すること", colWhy: "なぜ大事か",
    billingRows: [
      ["Web決済とアプリ決済", "公式Webは多くが米ドル・税別、App Storeは円・税込です。たとえばClaude Proは$20（税別）とアプリ¥3,000が同じプランです。"],
      ["利用上限のリセット", "Claudeは5時間ごとに上限が戻り、週の上限が別にかかることがあります。Muse Codeも5時間・週単位です。"],
      ["倍率で示される上限", "Claude Max 5x・20x、Google AI Ultra、Muse Code 5倍・20倍・80倍のように基準プランの倍率で書かれ、基準値が公開されていないことが多いです。"],
      ["APIクレジット", "Claude Maxは毎月$100・$200のAPIクレジット、Teamはチーム全体で最大$500を含みます。他社はAPI利用料が別です。"],
      ["ストレージ同梱", "Google AIプランにはGoogle Oneの容量（400GB〜）が含まれます。"],
      ["年払い", "Claude Proは年払いで月$17（$200前払い）。ChatGPT BusinessとClaude Teamは年払いで1席$5安くなります。"],
      ["コーディングエージェント", "ChatGPTはCodex、ClaudeはClaude Code、Google AI ProはAntigravityを同じサブスク内で使えます。"],
    ],
    apiTitle: "API単価（100万トークンあたり・USD）", apiLede: "アプリや自動化を自分で作るときの従量課金です。サブスクとは別に請求されます。標準処理の単価で、バッチ処理は多くが50%引きです。",
    colModel: "モデル", colInput: "入力", colCached: "キャッシュ入力", colOutput: "出力", colNote: "備考", original: "出典",
    calcTitle: "API月額を自分の使用量で計算", calcLede: "月の入力・出力トークン数を入れると、モデル別の費用を安い順に並べます。日本語1文字はおおむね1〜2トークンですがモデルで異なります。",
    calcInput: "入力トークン（百万/月）", calcOutput: "出力トークン（百万/月）", calcCache: "キャッシュヒット率（%）", calcHelp: "初期値：入力1,000万、出力200万、キャッシュ0%。キャッシュ書き込み、ツール料金、長文割増、時間帯割引は含みません。",
    tipsTitle: "選ぶときの3つのポイント",
    tips: ["トークン単価より「仕上がった作業1件あたり」で比べましょう。", "値上げ予定に注意：Gemini 4 Argonは2026-12-01、Gemini 3.8 Flashは2027-01-01に単価が2倍になります。", "機密資料を入れる前にデータ条件を確認しましょう。Meta Muse SparkのContributorモードのように、安い代わりに入力が製品改善に使われる区分もあります。"],
    sourcesTitle: "出典と確認範囲", sourcesLede: "下記の公式ページから数字を転記しました。実際に購入した価格ではなく、国・決済手段・キャンペーンで変わります。",
    hubTitle: "用途別AI活用ガイド（日本）— 法務・労務・税務・資料作成・広告", hubH1: "用途別AI活用ガイド（日本）",
    hubLede: "「どのAIが一番か」ではなく、日本でその仕事にどのサービスを何と組み合わせるかを、出典・確認日・人が判断すべき線とともにまとめます。",
    hubReady: "公開中のガイド", hubMore: (n) => `扱う分野（${n}）`, hubMoreLede: "分野を開くと、その分野でよく検索される言葉が見られます。", guideReady: "ガイドあり", soon: "準備中", hubPricing: "料金はAIサブスク・API料金比較をご覧ください。",
    services: "主なサービス", audience: "対象", price: "料金", workflow: "使う順番", combos: "相性のよい組み合わせ", colCombo: "組み合わせ", colWhyCombo: "理由", cautions: "守るべき線", seeAlso: "関連ページ", allGuides: "用途別AI活用ガイド一覧", sources: "出典", checkedLine: "各サービスの情報は、その下の記事・公式資料に基づきます。", workflowSuffix: "ワークフロー",
  },
  zh: {
    skip: "跳至正文", related: "相关信息", otherLanguages: "其他语言", family: "网站家族", privacy: "隐私", terms: "使用条款", license: "许可协议",
    pricingShort: "价格对比", useCasesShort: "按场景选AI",
    pricingTitle: "AI 会员与 API 价格对比（2026年10月·中国大陆）：DeepSeek、豆包、Kimi", pricingH1: "AI 会员与 API 价格对比（中国大陆）",
    pricingLede: "截至2026年10月，整理中国大陆可直接使用的 AI 助手会员价格和 DeepSeek API 人民币价格，并附上海外服务的价格作参考。",
    pricingNote: "价格变动频繁，付款前请重新打开每个数字旁的出处。官方页面未显示金额的格子留空；仅见于媒体报道的价格单独标注。",
    checkedOn: "核对日期", toc: ["按预算", "会员方案", "计费方式差异", "API 价格", "API 月费计算", "出处"],
    budgetLede: "按连续包月价格（人民币）分组。年付通常更便宜，具体以购买页为准。",
    plansTitle: "各家会员方案", colPlan: "方案", colUsd: "官方价格（USD/月）", colLocal: "人民币价格（月）", colWhat: "主要区别", officialWeb: "官方", appStore: "官方", reported: "媒体报道", source: "出处",
    billingTitle: "同样是“月度会员”，计费方式不同", colCheck: "要看什么", colWhy: "为什么重要",
    billingRows: [
      ["免费与付费", "DeepSeek 网页端和 App 免费，只有开发者 API 收费；豆包、Kimi 对高阶功能设每日或每月额度，付费会员额度更高。"],
      ["连续包月与单次购买", "豆包连续包月比单次月卡便宜；Kimi 年付折合每月更低。注意取消自动续费的方法。"],
      ["额度以倍数表示", "豆包加强套餐为标准套餐的4倍、高级为10倍；Kimi Ultra 的 Agent 额度为 Max 的2倍。基础额度常不公开具体数值。"],
      ["海外服务", "ChatGPT、Claude、Gemini、Grok 未在中国大陆正式提供服务，OpenAI 也限制来自中国大陆的 API 访问。下方海外价格仅作参考。"],
      ["API 分时价格", "DeepSeek API 在北京时间工作日 9:00–12:00、14:00–18:00 为高峰价，其余时间半价。"],
    ],
    apiTitle: "API 价格", apiLede: "自己开发应用或自动化时按量计费，与会员分开收费。先列 DeepSeek 人民币价格，再列海外模型的美元价格（中国大陆无法直接使用）。",
    colModel: "模型", colInput: "输入", colCached: "缓存输入", colOutput: "输出", colNote: "备注", original: "原文",
    calcTitle: "按用量估算 API 月费（美元模型）", calcLede: "输入每月的输入、输出 token 数，按费用从低到高排列。中文1个汉字约1–2个 token，因模型而异。",
    calcInput: "输入 token（百万/月）", calcOutput: "输出 token（百万/月）", calcCache: "缓存命中率（%）", calcHelp: "默认：输入1000万、输出200万、缓存0%。不含缓存写入、工具调用费、长上下文加价和分时折扣。",
    tipsTitle: "选择时记住三点",
    tips: ["比较“完成一件工作的成本”，而不是 token 单价。", "DeepSeek 闲时半价：批量任务放在夜间和周末更省。", "上传敏感资料前先读数据条款，部分低价档会把输入用于改进产品。"],
    sourcesTitle: "出处与范围", sourcesLede: "数字摘自下列官方页面和媒体报道。并非实际购买价格，可能因渠道和促销而不同。",
    hubTitle: "按场景选 AI（中国大陆）— 法律、劳动人事、财税、PPT、广告", hubH1: "按场景选 AI（中国大陆）",
    hubLede: "不是“哪个 AI 最好”，而是在中国大陆做某件事时，用哪项服务、和什么搭配，并附出处、核对日期和必须由人把关的边界。",
    hubReady: "已发布的指南", hubMore: (n) => `全部场景（${n}）`, hubMoreLede: "展开场景可查看大家常搜的词。有指南的场景可直接进入。", guideReady: "有指南", soon: "筹备中", hubPricing: "价格请看 AI 会员与 API 价格对比。",
    services: "有哪些服务", audience: "适合", price: "价格", workflow: "使用顺序", combos: "推荐搭配", colCombo: "搭配", colWhyCombo: "原因", cautions: "使用边界", seeAlso: "相关页面", allGuides: "全部场景指南", sources: "出处", checkedLine: "各服务信息依据其下方注明的文章或官方资料。", workflowSuffix: "工作流程",
  },
  fr: {
    skip: "Aller au contenu", related: "Pour aller plus loin", otherLanguages: "Autres langues", family: "Sites du groupe", privacy: "Confidentialité", terms: "Conditions", license: "Licence",
    pricingShort: "Prix de l'IA", useCasesShort: "IA par métier",
    pricingTitle: "Prix des abonnements IA et des API en France (octobre 2026) : ChatGPT, Claude, Gemini, Grok, Muse", pricingH1: "Prix des abonnements IA et des API (France)",
    pricingLede: "Les offres de cinq éditeurs et les tarifs API de six, relevés sur les pages officielles en octobre 2026, avec les prix de l'App Store français (TTC).",
    pricingNote: "Les prix changent souvent : rouvrez la source à côté de chaque chiffre avant de payer. Les cases sont vides quand la page officielle n'affichait pas de montant ; les montants issus de la presse sont signalés.",
    checkedOn: "Vérifié le", toc: ["Par budget", "Offres", "Différences de facturation", "Tarifs API", "Calcul du coût API", "Sources"],
    budgetLede: "Offres classées selon leur prix mensuel sur l'App Store français (TVA comprise). Le paiement sur le web, souvent en dollars, peut différer.",
    plansTitle: "Offres par éditeur", colPlan: "Offre", colUsd: "Prix officiel (USD/mois)", colLocal: "App Store France (mois)", colWhat: "Ce qui change", officialWeb: "web officiel", appStore: "App Store", reported: "selon la presse", source: "Source",
    billingTitle: "Même « abonnement mensuel », facturation différente", colCheck: "À vérifier", colWhy: "Pourquoi",
    billingRows: [
      ["Web ou App Store", "Le prix web officiel est souvent en dollars hors taxes, l'App Store en euros TTC : Claude Pro coûte 20 $ HT sur le web et 22,00 € dans l'App Store."],
      ["Réinitialisation des quotas", "Claude recharge ses limites toutes les cinq heures et peut appliquer un plafond hebdomadaire ; Muse Code fonctionne aussi par cycles de cinq heures et d'une semaine."],
      ["Limites en multiples", "Claude Max 5x/20x, Google AI Ultra et Muse Code 5x/20x/80x sont des multiples d'une offre de base dont la limite exacte n'est souvent pas publiée."],
      ["Crédits API", "Claude Max inclut 100 $ ou 200 $ de crédits API par mois, Team jusqu'à 500 $ partagés. Les autres abonnements facturent l'API à part."],
      ["Stockage inclus", "Les offres Google AI comprennent du stockage Google One (dès 400 Go)."],
      ["Paiement annuel", "Claude Pro revient à 17 $/mois en annuel (200 $ d'avance) ; les sièges ChatGPT Business et Claude Team sont 5 $ moins chers en annuel."],
      ["Agents de code inclus", "ChatGPT inclut Codex, Claude inclut Claude Code et Google AI Pro inclut Antigravity."],
    ],
    apiTitle: "Tarifs API (par million de jetons, USD)", apiLede: "Tarifs à l'usage pour développer vos applications et automatisations, facturés à part des abonnements. Tarif standard ; le traitement par lots est en général 50 % moins cher.",
    colModel: "Modèle", colInput: "Entrée", colCached: "Entrée en cache", colOutput: "Sortie", colNote: "Remarques", original: "source",
    calcTitle: "Estimer votre coût API mensuel", calcLede: "Saisissez vos jetons d'entrée et de sortie par mois pour classer les modèles du moins cher au plus cher. Un mot français fait environ 1,5 jeton ; vérifiez vos journaux d'usage.",
    calcInput: "Jetons d'entrée (millions/mois)", calcOutput: "Jetons de sortie (millions/mois)", calcCache: "Taux de cache (%)", calcHelp: "Par défaut : 10 M en entrée, 2 M en sortie, 0 % de cache. Hors écriture en cache, frais d'outils, surcoût contexte long et remises horaires.",
    tipsTitle: "Trois points à retenir",
    tips: ["Comparez le coût par tâche terminée, pas par jeton.", "Hausses prévues : Gemini 4 Argon double le 1er décembre 2026, Gemini 3.8 Flash le 1er janvier 2027.", "Lisez les conditions de données avant d'envoyer des documents sensibles : certaines offres bon marché, comme le mode Contributor de Meta Muse Spark, réutilisent vos entrées."],
    sourcesTitle: "Sources et périmètre", sourcesLede: "Chiffres relevés sur les pages officielles ci-dessous. Nous n'avons pas acheté chaque offre ; les prix varient selon le pays, le moyen de paiement et les promotions.",
    hubTitle: "L'IA par métier en France — juridique, social, fiscal, présentations, publicité", hubH1: "L'IA par métier (France)",
    hubLede: "Pas « quelle est la meilleure IA », mais quel service associer à quoi pour un travail précis en France, avec sources, date de vérification et limites qui restent humaines.",
    hubReady: "Guides disponibles", hubMore: (n) => `Tous les domaines (${n})`, hubMoreLede: "Ouvrez un domaine pour voir les recherches associées. Les domaines avec guide y mènent directement.", guideReady: "guide", soon: "à venir", hubPricing: "Pour les prix, voir Prix des abonnements IA et des API.",
    services: "Les services à connaître", audience: "Pour", price: "Prix", workflow: "Méthode pas à pas", combos: "Associations efficaces", colCombo: "Association", colWhyCombo: "Pourquoi", cautions: "Limites à respecter", seeAlso: "Voir aussi", allGuides: "Tous les guides IA par métier", sources: "Sources", checkedLine: "Chaque service suit l'article ou la page officielle cités en dessous.", workflowSuffix: "méthode",
  },
  es: {
    skip: "Ir al contenido", related: "Información relacionada", otherLanguages: "Otros idiomas", family: "Sitios del grupo", privacy: "Privacidad", terms: "Condiciones", license: "Licencia",
    pricingShort: "Precios de IA", useCasesShort: "IA por tarea",
    pricingTitle: "Precios de suscripciones de IA y API en España (octubre de 2026): ChatGPT, Claude, Gemini, Grok, Muse", pricingH1: "Precios de suscripciones de IA y API (España)",
    pricingLede: "Planes de cinco empresas y tarifas API de seis, tomados de las páginas oficiales en octubre de 2026, con precios del App Store de España (IVA incluido).",
    pricingNote: "Los precios cambian a menudo: vuelve a abrir la fuente de cada cifra antes de pagar. Las casillas quedan vacías cuando la página oficial no mostraba el importe; las cifras solo publicadas en prensa se indican aparte.",
    checkedOn: "Comprobado el", toc: ["Por presupuesto", "Planes", "Diferencias de cobro", "Tarifas API", "Calculadora API", "Fuentes"],
    budgetLede: "Planes agrupados por su precio mensual en el App Store de España (IVA incluido). El pago web, a menudo en dólares, puede variar.",
    plansTitle: "Planes por empresa", colPlan: "Plan", colUsd: "Precio oficial (USD/mes)", colLocal: "App Store España (mes)", colWhat: "Qué cambia", officialWeb: "web oficial", appStore: "App Store", reported: "según la prensa", source: "Fuente",
    billingTitle: "Mismo \"plan mensual\", distinto cobro", colCheck: "Qué revisar", colWhy: "Por qué importa",
    billingRows: [
      ["Web o App Store", "El precio web oficial suele estar en dólares sin impuestos y el App Store en euros con IVA: Claude Pro cuesta 20 $ en la web y 22,00 € en el App Store."],
      ["Reinicio de límites", "Claude recarga sus límites cada cinco horas y puede aplicar un tope semanal; Muse Code también usa ciclos de cinco horas y semanales."],
      ["Límites en múltiplos", "Claude Max 5x/20x, Google AI Ultra y Muse Code 5x/20x/80x son múltiplos de un plan base cuyo límite exacto a menudo no se publica."],
      ["Créditos de API", "Claude Max incluye 100 $ o 200 $ al mes en créditos de API y Team hasta 500 $ compartidos. El resto cobra la API aparte."],
      ["Almacenamiento incluido", "Los planes Google AI incluyen almacenamiento de Google One (desde 400 GB)."],
      ["Pago anual", "Claude Pro sale a 17 $/mes en anual (200 $ por adelantado); los puestos de ChatGPT Business y Claude Team son 5 $ más baratos en anual."],
      ["Agentes de código", "ChatGPT incluye Codex, Claude incluye Claude Code y Google AI Pro incluye Antigravity."],
    ],
    apiTitle: "Tarifas API (por millón de tokens, USD)", apiLede: "Precios por uso para crear tus propias apps y automatizaciones, cobrados aparte de las suscripciones. Tarifa estándar; el procesamiento por lotes suele costar un 50 % menos.",
    colModel: "Modelo", colInput: "Entrada", colCached: "Entrada en caché", colOutput: "Salida", colNote: "Notas", original: "fuente",
    calcTitle: "Calcula tu coste mensual de API", calcLede: "Introduce tus tokens de entrada y salida al mes para ordenar los modelos de más barato a más caro. Una palabra en español son unos 1,5 tokens; revisa tus registros reales.",
    calcInput: "Tokens de entrada (millones/mes)", calcOutput: "Tokens de salida (millones/mes)", calcCache: "Tasa de caché (%)", calcHelp: "Por defecto: 10 M de entrada, 2 M de salida, 0 % de caché. No incluye escritura en caché, herramientas, recargos de contexto largo ni descuentos horarios.",
    tipsTitle: "Tres cosas a recordar",
    tips: ["Compara el coste por tarea terminada, no por token.", "Subidas previstas: Gemini 4 Argon duplica su precio el 1 de diciembre de 2026 y Gemini 3.8 Flash el 1 de enero de 2027.", "Lee las condiciones de datos antes de subir documentos sensibles: algunos niveles baratos, como el modo Contributor de Meta Muse Spark, usan tus entradas para mejorar el producto."],
    sourcesTitle: "Fuentes y alcance", sourcesLede: "Cifras tomadas de las páginas oficiales de abajo. No compramos cada plan; los precios varían según país, medio de pago y promociones.",
    hubTitle: "IA por tarea en España — jurídico, laboral, fiscal, presentaciones, publicidad", hubH1: "IA por tarea (España)",
    hubLede: "No \"cuál es la mejor IA\", sino qué servicio combinar con qué para un trabajo concreto en España, con fuentes, fecha de comprobación y los límites que siguen siendo humanos.",
    hubReady: "Guías disponibles", hubMore: (n) => `Todas las áreas (${n})`, hubMoreLede: "Abre un área para ver las búsquedas habituales. Las que tienen guía enlazan directamente.", guideReady: "guía", soon: "próximamente", hubPricing: "Para precios, consulta Precios de suscripciones de IA y API.",
    services: "Servicios a conocer", audience: "Para", price: "Precio", workflow: "Paso a paso", combos: "Combinaciones que funcionan", colCombo: "Combinación", colWhyCombo: "Por qué", cautions: "Límites a respetar", seeAlso: "Ver también", allGuides: "Todas las guías de IA por tarea", sources: "Fuentes", checkedLine: "Cada servicio sigue el artículo o la página oficial citados debajo.", workflowSuffix: "flujo de trabajo",
  },
};
