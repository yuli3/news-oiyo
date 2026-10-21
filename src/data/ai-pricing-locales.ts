// Country-specific AI pricing for the non-Korean pages (/ai/{lang}/pricing/), checked 2026-10-20.
// Each locale shows its own country's prices (세운 2026-10-19: 나라별 특화 페이지): en = United States,
// ja = Japan, zh = mainland China, fr = France, es = Spain. Same rules as ai-pricing.ts: every price cites
// the page it was read from; App Store prices are that country's in-app purchase list (tax included);
// blanks mean the source did not show an amount. The USD API table (API_MODELS) is shared.
import type { Locale } from "./ai-i18n";
import type { Plan, Source, Vendor } from "./ai-pricing";
import { SUBSCRIPTIONS } from "./ai-pricing";

export interface PricingLocale {
  country: string;
  vendors: Vendor[];
  /** Budget bands in the local currency: [label, min, max]. */
  bands: [string, number, number][];
  /** Extra API rows priced in local currency (zh: DeepSeek in CNY). */
  localApi?: { title: string; lede: string; rows: { model: string; input: string; cached: string; output: string; note: string }[]; source: Source };
}

const app = (cc: string, id: string, label: string): Source => ({ label, url: `https://apps.apple.com/${cc}/app/id${id}` });
const CHATGPT = "6448311069", CLAUDE = "6473753684", GEMINI = "6477489729", GROK = "6670324846";
const OPENAI_HELP_PLUS = { label: "OpenAI Help · ChatGPT Plus", url: "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" };
const OPENAI_HELP_PRO = { label: "OpenAI Help · ChatGPT Pro tiers", url: "https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers" };
const OPENAI_BUSINESS = { label: "OpenAI · Premium seats in ChatGPT Business (2026-08-10)", url: "https://openai.com/index/premium-seats-chatgpt-business" };
const CLAUDE_PRICING = { label: "Claude pricing", url: "https://claude.com/pricing" };
const XAI_PRICING = { label: "x.ai pricing", url: "https://x.ai/pricing" };
const MUSE = SUBSCRIPTIONS.find((v) => v.id === "muse")!;

type Row = [name: string, usd: string | null, local: string | null, summary: string];
const plans = (rows: Row[]): Plan[] => rows.map(([name, usd, localApp, summary]) => ({ name, usd, localApp, summary }));
const muse = (summaries: string[], notes: string[]): Vendor => ({ ...MUSE, plans: MUSE.plans.map((p, i) => ({ ...p, summary: summaries[i] })), notes });

// Summaries are written once per language and shared by countries that use it.
const en = {
  chatgpt: ["Basic chat; limited image generation, deep research and Codex.", "More messages, uploads and images than Free; may show ads.", "Projects, scheduled tasks, custom GPTs, more deep research.", "First of three Pro tiers; no Ultrafast mode.", "More usage than Pro 100; no Ultrafast mode.", "Highest included usage, with Ultrafast mode.", "From 2 users. Premium seat $125 ($100 annual)."],
  claude: ["Everyday use; limits refill every five hours.", "At least 5x Free per five-hour session. $17/mo billed annually.", "5x Pro usage plus $100 of API credits a month. Monthly only.", "20x Pro usage plus $200 of API credits a month.", "Teams of 2–150; more usage than Pro.", "5x a Standard seat; up to $500/mo pooled API credits."],
  gemini: ["Flash model, 2x Free limits, 400 GB storage, 200 Flow credits.", "Gemini 4 Argon and Pro models, 4x Free limits, 5 TB, Antigravity.", "Highest limits, Flow credits, Project Genie, 30 TB in the app listing."],
  grok: ["Name on x.ai's price list.", "Name on x.ai's price list.", "Name on x.ai's price list.", "Name on x.ai's price list.", "Per user, team management."],
  muse: ["10–50 prompts every 5 hours; Muse Spark, Wonder and Image.", "5x Everyday.", "20x Everyday, includes Muse Wonder Full.", "80x Everyday, includes Muse Wonder Full."],
  museNotes: ["Meta's docs list plan structure and multiples but show prices only during signup, so amounts here are press-reported.", "Muse Wonder Full is not sold via API; it is only in the Power and Maximum plans. Benefits may vary by region."],
};

const ja = {
  chatgpt: ["基本の会話。画像生成・Deep Research・Codexは制限付き。", "無料より多いメッセージ・アップロード・画像。広告が表示される場合あり。", "プロジェクト、予約タスク、カスタムGPT、Deep Research拡大。", "Pro 3段階の1つ目。Ultrafastなし。", "Pro 100より多い利用量。Ultrafastなし。", "最も多い利用量、Ultrafastあり。", "2ユーザーから。プレミアム席は$125（年払い$100）。"],
  claude: ["日常利用。5時間ごとに上限が回復。", "5時間あたり無料の5倍以上。年払いは月$17。", "Proの5倍、毎月$100のAPIクレジット。月払いのみ。", "Proの20倍、毎月$200のAPIクレジット。", "2〜150人のチーム。Proより多い利用量。", "標準席の5倍。チーム全体で月最大$500のAPIクレジット。"],
  gemini: ["Flashモデル、無料の2倍の上限、400GB、Flowクレジット200。", "Gemini 4 Argon・Proモデル、無料の4倍、5TB、Antigravity。", "最上位の上限、Flowクレジット、Project Genie。アプリ表記は30TB。"],
  grok: ["x.aiの料金表の名称。", "x.aiの料金表の名称。", "x.aiの料金表の名称。", "x.aiの料金表の名称。", "1ユーザーあたり、チーム管理。"],
  muse: ["5時間ごとに10〜50プロンプト。Muse Spark・Wonder・Image。", "Everydayの5倍。", "Everydayの20倍、Muse Wonder Full付き。", "Everydayの80倍、Muse Wonder Full付き。"],
  museNotes: ["Metaの公式文書はプラン構成と倍率のみで、金額は登録画面で表示されるため、ここでは報道ベースで記載しています。", "Muse Wonder FullはAPI提供がなく、Power・Maximumプランのみで使えます。地域により特典が異なる場合があります。"],
};

const fr = {
  chatgpt: ["Discussion de base ; génération d'images, recherche approfondie et Codex limités.", "Plus de messages, d'envois et d'images que Free ; publicité possible.", "Projets, tâches planifiées, GPT personnalisés, plus de recherche approfondie.", "Premier des trois niveaux Pro ; sans mode Ultrafast.", "Plus d'usage que Pro 100 ; sans Ultrafast.", "Usage inclus le plus élevé, avec Ultrafast.", "Dès 2 utilisateurs. Siège Premium 125 $ (100 $ en annuel)."],
  claude: ["Usage courant ; limites rechargées toutes les cinq heures.", "Au moins 5x Free par session de cinq heures. 17 $/mois en annuel.", "5x Pro et 100 $ de crédits API par mois. Mensuel uniquement.", "20x Pro et 200 $ de crédits API par mois.", "Équipes de 2 à 150 ; plus d'usage que Pro.", "5x un siège Standard ; jusqu'à 500 $/mois de crédits API partagés."],
  gemini: ["Modèle Flash, 2x les limites gratuites, 400 Go, 200 crédits Flow.", "Gemini 4 Argon et modèles Pro, 4x les limites gratuites, 5 To, Antigravity.", "Limites maximales, crédits Flow, Project Genie."],
  grok: ["Nom sur la grille x.ai.", "Nom sur la grille x.ai.", "Nom sur la grille x.ai.", "Nom sur la grille x.ai.", "Par utilisateur, gestion d'équipe."],
  muse: ["10 à 50 requêtes toutes les 5 heures ; Muse Spark, Wonder et Image.", "5x Everyday.", "20x Everyday, avec Muse Wonder Full.", "80x Everyday, avec Muse Wonder Full."],
  museNotes: ["La documentation de Meta décrit les offres et leurs multiples mais n'affiche les prix qu'à l'inscription : les montants viennent de la presse.", "Muse Wonder Full n'est pas vendu en API ; il n'existe que dans les offres Power et Maximum. Les avantages peuvent varier selon la région."],
};

const es = {
  chatgpt: ["Chat básico; imágenes, investigación profunda y Codex limitados.", "Más mensajes, subidas e imágenes que Free; puede mostrar anuncios.", "Proyectos, tareas programadas, GPT personalizados, más investigación profunda.", "Primer nivel Pro de tres; sin modo Ultrafast.", "Más uso que Pro 100; sin Ultrafast.", "El mayor uso incluido, con Ultrafast.", "Desde 2 usuarios. Puesto Premium 125 $ (100 $ anual)."],
  claude: ["Uso diario; los límites se recargan cada cinco horas.", "Al menos 5x Free por sesión de cinco horas. 17 $/mes en anual.", "5x Pro y 100 $ de créditos API al mes. Solo mensual.", "20x Pro y 200 $ de créditos API al mes.", "Equipos de 2 a 150; más uso que Pro.", "5x un puesto estándar; hasta 500 $/mes de créditos API compartidos."],
  gemini: ["Modelo Flash, el doble de límites que gratis, 400 GB, 200 créditos de Flow.", "Gemini 4 Argon y modelos Pro, 4x los límites gratuitos, 5 TB, Antigravity.", "Límites máximos, créditos de Flow, Project Genie."],
  grok: ["Nombre en la tabla de x.ai.", "Nombre en la tabla de x.ai.", "Nombre en la tabla de x.ai.", "Nombre en la tabla de x.ai.", "Por usuario, gestión de equipo."],
  muse: ["10–50 peticiones cada 5 horas; Muse Spark, Wonder e Image.", "5x Everyday.", "20x Everyday, incluye Muse Wonder Full.", "80x Everyday, incluye Muse Wonder Full."],
  museNotes: ["La documentación de Meta describe los planes y sus múltiplos, pero solo muestra precios al registrarse: los importes proceden de la prensa.", "Muse Wonder Full no se vende por API; solo está en los planes Power y Maximum. Las ventajas pueden variar por región."],
};

type Copy = typeof en;
interface Local { chatgpt: (string | null)[]; claude: (string | null)[]; claudeAnnual: string; gemini: (string | null)[]; grokApp: [string, string][]; }

function western(cc: string, c: Copy, local: Local, t: { annual: string; appNames: string; chatgptNote: string; claudeNote: string; geminiNote: string; grokNote: string; appListing: string }): Vendor[] {
  const [go, plus, p100, p200, p500] = local.chatgpt;
  const [cPro, cMax5, cMax20] = local.claude;
  const [gPlus, gPro, gUltra] = local.gemini;
  return [
    { id: "chatgpt", vendor: "OpenAI", product: "ChatGPT", plans: plans([["Free", "$0", null, c.chatgpt[0]], ["Go", null, go, c.chatgpt[1]], ["Plus", "$20", plus, c.chatgpt[2]], ["Pro 100", "$100", p100, c.chatgpt[3]], ["Pro 200", "$200", p200, c.chatgpt[4]], ["Pro 500", "$500", p500, c.chatgpt[5]], ["Business", "$25 ($20)", null, c.chatgpt[6]]]), notes: [t.chatgptNote], sources: [OPENAI_HELP_PLUS, OPENAI_HELP_PRO, OPENAI_BUSINESS, app(cc, CHATGPT, `${t.appListing} · ChatGPT`)] },
    { id: "claude", vendor: "Anthropic", product: "Claude", plans: plans([["Free", "$0", null, c.claude[0]], ["Pro", "$20", cPro, `${c.claude[1]} ${t.annual}: ${local.claudeAnnual}`], ["Max 5x", "$100", cMax5, c.claude[2]], ["Max 20x", "$200", cMax20, c.claude[3]], ["Team Standard", "$25 ($20)", null, c.claude[4]], ["Team Premium", "$125 ($100)", null, c.claude[5]]]), notes: [t.claudeNote], sources: [CLAUDE_PRICING, app(cc, CLAUDE, `${t.appListing} · Claude`)] },
    { id: "gemini", vendor: "Google", product: "Gemini (Google AI)", plans: plans([["Google AI Plus", null, gPlus, c.gemini[0]], ["Google AI Pro", null, gPro, c.gemini[1]], ["Google AI Ultra", null, gUltra, c.gemini[2]]]), notes: [t.geminiNote], sources: [app(cc, GEMINI, `${t.appListing} · Google Gemini`)] },
    { id: "grok", vendor: "xAI", product: "Grok", plans: plans([["Plus", "$8", null, c.grok[0]], ["Premium", "$30", null, c.grok[1]], ["Super", "$100", null, c.grok[2]], ["Ultra", "$200", null, c.grok[3]], ["Teams", "$30+", null, c.grok[4]], ...local.grokApp.map(([n, p]) => [`${n} (${t.appNames})`, null, p, t.appNames] as Row)]), notes: [t.grokNote], sources: [XAI_PRICING, app(cc, GROK, `${t.appListing} · Grok`)] },
    muse(c.muse, c.museNotes),
  ];
}

export const PRICING_LOCALES: Record<Exclude<Locale, "ko">, PricingLocale> = {
  en: {
    country: "United States",
    bands: [["Up to $10", 0.01, 10], ["$10–$50", 10.01, 50], ["$50–$200", 50.01, 200], ["Over $200", 200.01, Infinity]],
    vendors: western("us", en, { chatgpt: ["$8.00", "$19.99", "$100.00", "$200.00", "$500.00"], claude: ["$20.00", "$124.99", "$249.99"], claudeAnnual: "$214.99", gemini: ["$4.99", "$19.99", "$199.99"], grokApp: [["SuperGrok", "$30.00"], ["SuperGrok Heavy", "$300.00"]] }, {
      annual: "App Store annual", appNames: "App Store name", appListing: "US App Store",
      chatgptNote: "The official pricing page draws prices with script, so Plus and Pro come from OpenAI's Help Center and Business from OpenAI's announcement. Go's web price was not shown; the App Store lists $8.00.",
      claudeNote: "Max costs more in the App Store ($124.99 / $249.99) than on the web ($100 / $200). Web prices exclude tax.",
      geminiNote: "Google's US plan page did not show amounts in our check; prices are the US App Store listing.",
      grokNote: "x.ai's price list and the App Store use different plan names. We could not confirm which names match, so they are listed separately.",
    }),
  },
  ja: {
    country: "日本",
    bands: [["¥1,500以下", 1, 1500], ["¥1,501〜¥5,000", 1501, 5000], ["¥5,001〜¥20,000", 5001, 20000], ["¥20,001以上", 20001, Infinity]],
    vendors: western("jp", ja, { chatgpt: ["¥1,400", "¥3,000", "¥16,800", "¥30,000", "¥84,000"], claude: ["¥3,000", "¥20,000", "¥40,000"], claudeAnnual: "¥35,000", gemini: ["¥720", "¥2,900", "¥32,000"], grokApp: [["SuperGrok Lite", "¥1,500"], ["SuperGrok", "¥5,000"], ["SuperGrok Plus", "¥15,000"], ["SuperGrok Heavy", "¥50,000"]] }, {
      annual: "App Store年額", appNames: "App Store名", appListing: "日本App Store",
      chatgptNote: "公式料金ページは金額をスクリプトで描画するため、PlusとProはOpenAIヘルプセンター、Businessは公式発表の金額です。円価格は日本のApp Storeの表示です。",
      claudeNote: "公式Webの米ドル価格は税別、App Storeの円価格は税込です。",
      geminiNote: "円価格は日本のApp Storeの表示です。App StoreにはAI Plusの年額¥7,200も表示されています。",
      grokNote: "x.aiの料金表とApp Storeでプラン名が異なります。どれが同じ商品か確認できないため、対応づけずに別々に記載しました。",
    }),
  },
  fr: {
    country: "France",
    bands: [["Jusqu'à 10 €", 0.01, 10], ["10 € à 50 €", 10.01, 50], ["50 € à 200 €", 50.01, 200], ["Plus de 200 €", 200.01, Infinity]],
    vendors: western("fr", fr, { chatgpt: ["7,99 €", "22,99 €", "102,99 €", "229,00 €", "509,99 €"], claude: ["22,00 €", "149,99 €", "299,99 €"], claudeAnnual: "249,99 €", gemini: ["4,99 €", "21,99 €", null], grokApp: [["SuperGrok Lite", "10,00 €"], ["SuperGrok", "35,00 €"], ["SuperGrok Plus", "100,00 €"], ["SuperGrok Heavy", "349,00 €"]] }, {
      annual: "annuel App Store", appNames: "nom App Store", appListing: "App Store France",
      chatgptNote: "La page de prix officielle affiche les montants par script : Plus et Pro viennent du centre d'aide OpenAI, Business de l'annonce officielle. Les prix en euros sont ceux de l'App Store français (TTC).",
      claudeNote: "Le prix web officiel en dollars est hors taxes ; l'App Store affiche des euros TTC.",
      geminiNote: "L'App Store français listait AI Plus (400 Go) à 4,99 €, AI Plus (2 To) à 9,99 € et AI Pro à 21,99 €, mais pas Ultra.",
      grokNote: "La grille x.ai et l'App Store n'utilisent pas les mêmes noms d'offres ; faute de confirmation, nous ne les avons pas rapprochés.",
    }),
  },
  es: {
    country: "España",
    bands: [["Hasta 10 €", 0.01, 10], ["10 € a 50 €", 10.01, 50], ["50 € a 200 €", 50.01, 200], ["Más de 200 €", 200.01, Infinity]],
    vendors: western("es", es, { chatgpt: ["7,99 €", "22,99 €", "102,99 €", "229,00 €", "509,99 €"], claude: ["22,00 €", "149,99 €", "299,99 €"], claudeAnnual: "249,99 €", gemini: ["4,99 €", "21,99 €", null], grokApp: [["SuperGrok Lite", "10,00 €"], ["SuperGrok", "35,00 €"], ["SuperGrok Plus", "100,00 €"], ["SuperGrok Heavy", "349,00 €"]] }, {
      annual: "anual App Store", appNames: "nombre en App Store", appListing: "App Store España",
      chatgptNote: "La página oficial de precios muestra los importes por script: Plus y Pro proceden del centro de ayuda de OpenAI y Business del anuncio oficial. Los precios en euros son del App Store de España (IVA incluido).",
      claudeNote: "El precio web oficial en dólares no incluye impuestos; el App Store muestra euros con IVA.",
      geminiNote: "El App Store de España listaba AI Plus a 4,99 € y AI Pro a 21,99 €, pero no Ultra.",
      grokNote: "La tabla de x.ai y el App Store usan nombres de plan distintos; sin confirmación, no los emparejamos.",
    }),
  },
  zh: {
    country: "中国大陆",
    bands: [["50元以下", 1, 50], ["51–200元", 51, 200], ["201–700元", 201, 700], ["700元以上", 701, Infinity]],
    vendors: [
      { id: "deepseek", vendor: "深度求索", product: "DeepSeek", plans: [{ name: "网页端 / App", usd: null, localApp: null, localWeb: "免费", summary: "网页端和 App 免费，深度思考免费；只有开发者 API 收费。" }], notes: ["免费信息来自媒体报道（2026-06-29），API 价格见下方官方价格表。"], sources: [{ label: "搜狐 · 豆包开始收钱了，但隔壁DeepSeek免费（2026-06-29）", url: "https://www.sohu.com/a/1043093789_121124358" }, { label: "DeepSeek 官方入口", url: "https://chat.deepseek.com/" }] },
      { id: "doubao", vendor: "字节跳动", product: "豆包专业版", plans: [
        { name: "标准套餐", usd: null, localApp: null, localWeb: "68元", summary: "专家模式、办公任务模式等额度为免费版的5倍以上。学生认证后38元/月（6个月）。" },
        { name: "加强套餐", usd: null, localApp: null, localWeb: "200元", summary: "额度为标准套餐的4倍。" },
        { name: "高级套餐", usd: null, localApp: null, localWeb: "500元", summary: "额度为标准套餐的10倍，连续包年最高5088元。" },
      ], notes: ["价格为连续包月，来自澎湃新闻报道（2026-06-24）；单次购买更贵。免费版仍可使用基础模型。"], sources: [{ label: "澎湃新闻 · 豆包专业版（2026-06-24）", url: "https://m.thepaper.cn/newsDetail_forward_33441793" }] },
      { id: "kimi", vendor: "月之暗面", product: "Kimi", plans: [
        { name: "Go", usd: null, localApp: null, localWeb: "49元", summary: "共享月度额度；不含 Kimi Code。年付468元。" },
        { name: "Plus", usd: null, localApp: null, localWeb: "99元", summary: "含 Kimi Code 与 Agent 集群；Kimi Code 每5小时滚动限额。年付948元。" },
        { name: "Pro", usd: null, localApp: null, localWeb: "199元", summary: "额度高于 Plus，含目标模式。年付1,908元。" },
        { name: "Max", usd: null, localApp: null, localWeb: "699元", summary: "额度高于 Pro，任务并行更强。年付6,708元。" },
        { name: "Ultra", usd: null, localApp: null, localWeb: "1,399元", summary: "Agent 额度为 Max 的2倍，4个任务并行。年付13,428元。" },
      ], notes: ["官方帮助中心价格，页面注明截图日期为2026年10月19日。"], sources: [{ label: "Kimi 帮助中心 · 价格与权益", url: "https://www.kimi.com/help/membership/membership-pricing" }] },
    ],
    localApi: {
      title: "DeepSeek API（人民币 / 百万 tokens）",
      lede: "DeepSeek 官方价格。高峰为北京时间工作日 9:00–12:00、14:00–18:00，其余时间（含周末、节假日）半价。",
      rows: [
        { model: "deepseek-flash", input: "2 / 1", cached: "0.04 / 0.02", output: "8 / 4", note: "高峰 / 闲时" },
        { model: "deepseek-v4-pro", input: "9.0 / 4.5", cached: "0.30 / 0.15", output: "27.0 / 13.5", note: "高峰 / 闲时" },
      ],
      source: { label: "DeepSeek 官方价格", url: "https://api-docs.deepseek.com/zh-cn/quick_start/pricing" },
    },
  },
};
