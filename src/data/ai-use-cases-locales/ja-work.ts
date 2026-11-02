// 日本向けAI活用ガイド 第2弾（2026-10-21確認）: 議事録、Excel、翻訳、リサーチ、事業計画書・補助金、
// Web制作、問い合わせ対応、ブログSEO。料金は出典ページの記載と日付のとおり。
import type { Guide } from "../ai-use-cases";

const ASANA_MINUTES = { label: "Asana · 議事録AIおすすめツール比較【2026年版】（2026-05-15）", url: "https://asana.com/ja/resources/ai-minutes" };
const NOVA_MINUTES = { label: "NovaScribe · 議事録AI徹底比較 2026（2026-07-26更新、料金は6月時点）", url: "https://novascribe.ai/ja/ai-gijiroku-hikaku" };
const AIPICKS_NOTTA = { label: "AI PICKS · Notta 料金（10/20更新）", url: "https://aipicks.jp/tool/notta/pricing" };
const AIPICKS_CONSENT = { label: "AI PICKS · 録音・録画の同意（2026-08-31更新）", url: "https://aipicks.jp/glossary/recording-consent" };
const AIPICKS_EXCEL = { label: "AI PICKS · ExcelとスプレッドシートのAI活用ガイド（2026-10-02更新）", url: "https://aipicks.jp/mag/ai-excel-spreadsheet-guide-2026" };
const AIPICKS_DEEPL = { label: "AI PICKS · DeepL 無料版とProの違い（2026-10-07確認）", url: "https://aipicks.jp/mag/deepl-plans-free-vs-pro-2026" };
const AIPICKS_MIRAI = { label: "AI PICKS · みらい翻訳（2026-10-21確認）", url: "https://aipicks.jp/tool/mirai-translator" };
const AIPICKS_TRANSLATE = { label: "AI PICKS · AI翻訳ツール比較 2026（2026-09-01更新）", url: "https://aipicks.jp/mag/ai-translation-tools-comparison-2026" };
const AIMARKET_DR = { label: "AI Market · Deep Research 比較（2026-08-08更新、料金・回数は2025年2月時点）", url: "https://ai-market.jp/technology/deep_research-review/" };
const AIPICKS_PPLX = { label: "AI PICKS · Perplexity と Gemini の使い分け（2026-09-04更新）", url: "https://aipicks.jp/mag/perplexity-vs-gemini-guide-2026" };
const ATSOHO_SUBSIDY = { label: "atsoho · AIで補助金申請書を作る手順と注意点（2026-08-12更新）", url: "https://atsoho.com/blog/business-ai-subsidy" };
const AIPICKS_VIBE = { label: "AI PICKS · バイブコーディング入門 2026（2026-10-02更新）", url: "https://aipicks.jp/mag/vibe-coding-guide-2026" };
const LYC_AIBOT = { label: "LINEヤフー for Business · AIチャットボット（β）（2025-11-12）", url: "https://www.lycbiz.com/jp/column/line-official-account/service-information/ai-chatbot/" };
const AURANT_AIBOT = { label: "Aurant · LINE AIチャットボット（β）の使い方（2026-10-06更新）", url: "https://aurant-technologies.com/?p=52377" };
const INNOVATOPIA_GOOGLE = { label: "innovatopia · Google公式のAI検索最適化ガイド解説（2026）", url: "https://innovatopia.jp/ai/ai-news/103601/" };
const WEBTAN_CTR = { label: "Web担当者Forum · AI OverviewsでCTR62.7%減【Ahrefs調べ】（2026-07-29）", url: "https://webtan.impress.co.jp/n/2026/07/29/53036" };

export const guides: Guide[] = [
  {
    slug: "meeting-notes",
    category: "資料・プレゼン",
    title: "議事録・文字起こしに使うAI（2026年10月）",
    description: "Notta・Rimo Voice・tl;dv・LINE WORKS AiNote・AutoMemoの無料枠と料金、録音の同意から決定事項・宿題の整理までの手順、社外参加者がいる会議の注意点をまとめました。",
    checked: "2026-10-21",
    intro: "議事録AIは録音を文字にし、話者を分け、要約とToDoを出します。日本語の会議では日本語特化ツールの精度と敬語処理が差になり、無料枠と同意の取り方がツール選びの基準になります。",
    tools: [
      { name: "Notta", audience: "Zoom・Teams・Meetの会議が多い人、多言語の会議", what: "日本語を含む58言語に対応し、Zoom・Teams・Meet・Webexと連携します。AI要約とリアルタイム翻訳も使えます。", price: "フリー 月120分（1回3分まで）・AI要約月10回、プレミアム月1,185円、ビジネス月2,508円（2026-10確認）", source: AIPICKS_NOTTA },
      { name: "Rimo Voice", audience: "日本語の会議を正確に残したいチーム", what: "日本語特化で敬語処理と議事録テンプレートがあります。1時間の音声を5分程度で文字にするとしています。", price: "無料 月60分、ベーシック月2,178円〜（2026-06時点）", source: NOVA_MINUTES },
      { name: "tl;dv", audience: "オンライン会議を録画して後で質問したい人", what: "Zoom・Meet・Teams連携とAIによる質問応答があります。", price: "無料あり、Pro 月$20〜（2026-06時点）", source: NOVA_MINUTES },
      { name: "LINE WORKS AiNote", audience: "セキュリティ要件のある企業", what: "二段階認証やSSOを備えます。文字正解率90.8%、数字認識率80.3%（同社調査）としています。", source: ASANA_MINUTES },
      { name: "AutoMemo", maker: "ソースネクスト", audience: "対面の会議を録音機で残したい人", what: "5人会議での文字起こし正確率98.9%（同社調査）としています。無料プランがあります。", source: ASANA_MINUTES },
    ],
    workflow: [
      { step: "同意を取る", detail: "録音・録画は個人情報の取得にあたるため、参加者全員への事前の同意か通知が業界標準です。社外参加者がいる場合は書面かツールの同意ボタンで取ります。" },
      { step: "録音環境を整える", detail: "スマホやマイクを机の中央に置き、冒頭で名前を呼び合うと話者分けが楽になります。" },
      { step: "文字起こしと話者名", detail: "話者ラベルを実名に直してから要約を実行します。" },
      { step: "3つに分ける", detail: "要約は下書きです。決定事項・論点・宿題（担当と期限）に分け、結論を入れた件名を付けます。" },
      { step: "数字と名前の照合", detail: "共有前に金額・日付・担当者名を文字起こし本文と照合します。" },
    ],
    combos: [
      { pair: "議事録AI + 汎用AI", why: "日本語の文字起こしは特化ツール、社内フォーマットへの整形はChatGPT・Claude・Geminiが得意です。会社が承認したアカウントで行います。" },
      { pair: "Notta + 翻訳", why: "海外拠点との会議はリアルタイム翻訳で内容を追い、後で日本語の議事録にまとめます。" },
      { pair: "AiNote + 社内SSO", why: "アクセス管理を社内の認証にそろえると、退職者の閲覧を止めやすくなります。" },
    ],
    cautions: [
      "Zoom・Teams・Meetの録音通知だけに頼り、AIツール側で同意を取らないケースは見落とされやすいとされています。",
      "海外の参加者がいる場合は、GDPRなど現地法の同意要件を別に確認してください。",
      "機密情報を含む会議音声を外部サーバーに送る前に、暗号化・アクセス制限・保存期間の方針を確認してください。",
      "精度の数字は各社の自社調査です。自社の会議で試してから導入してください。",
    ],
    keywords: ["議事録 AI", "AI 文字起こし", "Notta 料金", "Rimo Voice", "議事録 自動作成", "会議 録音 同意"],
  },
  {
    slug: "spreadsheet",
    category: "資料・プレゼン",
    title: "Excel・スプレッドシートに使うAI（2026年10月）",
    description: "ExcelのCopilot（Agent Mode）、Googleスプレッドシートの=AI()関数とGemini、ChatGPTのデータ分析を料金と使える条件で比べ、AIの数式を検算する手順をまとめました。",
    checked: "2026-10-21",
    intro: "表計算のAIは、会社がすでに使っている環境に合わせて選ぶのが近道です。Microsoft 365ならCopilot、Google WorkspaceならGeminiと=AI()関数です。どちらも出てきた数式は数行を手で検算してから全体に使います。",
    tools: [
      { name: "Copilot in Excel（Agent Mode）", maker: "Microsoft", audience: "Microsoft 365の会社", what: "数式の生成・挿入、ピボットテーブル、複数シート統合、条件付き書式・グラフ、Python実行まで、ブックを直接編集します。Agent ModeにはOneDriveかSharePointへの保存が必要です。", price: "Copilot Chatは無料（M365契約者、読み取り・質問のみ）、Copilot Pro 月3,200円（個人）（2026-10更新の記事）", source: AIPICKS_EXCEL },
      { name: "Googleスプレッドシート =AI()関数・Gemini", maker: "Google", audience: "Google Workspaceのチーム", what: "=AI(\"指示\", 範囲) で分類・要約・感情分析・翻訳をセルに返します。一括生成は最初の350セルまで、関数のネスト不可、同じシート内のデータだけ参照できます。出力はテキストなので計算にはVALUE()などで変換します。", price: "Workspace Business Starter（年契約で月800円/ユーザー）以上に追加費用なしで含まれる。無料のGoogleアカウントでは使えない（2026-10更新の記事）", source: AIPICKS_EXCEL },
      { name: "ChatGPT（データ分析）", maker: "OpenAI", audience: "集計やグラフを会話で作りたい人", what: "CSVやExcelをアップロードするとPythonを書いて集計・グラフ・回帰分析をします。コードを確認できます。ファイルは約100MBまでで、毎回アップロードし直します。", price: "Plus 月$20（2026-10更新の記事）", source: AIPICKS_EXCEL },
    ],
    workflow: [
      { step: "使っている環境を確認", detail: "M365ならCopilot、WorkspaceならGeminiから。まず追加費用なしで使える範囲で試します。" },
      { step: "毎週の作業を1つ選ぶ", detail: "取引先別の集計、重複削除、問い合わせの分類など、手作業の1つをAIに任せます。" },
      { step: "ダミーデータで設計", detail: "個人アカウントのAIで設計するときは、列が同じで値を変えたサンプルを使います。" },
      { step: "3〜4行を手で検算", detail: "数式は数行を手計算で確かめてから全体にコピーします。範囲が1行ずれるミスが典型です。" },
      { step: "コピーで実行", detail: "削除や上書きを含む操作はファイルのコピーで先に試し、報告に使う数字は元データと照合します。" },
    ],
    combos: [
      { pair: "ChatGPTで設計 + Copilot・Geminiで実行", why: "やり方は会話で決め、実ファイルの編集は会社のテナント内で行えば、機密ファイルを外に出しません。" },
      { pair: "=AI()で分類 + ピボット", why: "問い合わせやレビューを行ごとに分類し、ピボットで件数を数えます。" },
      { pair: "AIの数式 + 手で検算", why: "AIは速く、人は正確です。数行の検算が全体の誤りを防ぎます。" },
    ],
    cautions: [
      "顧客の個人情報や社外秘のファイルを個人のAIアカウントにそのままアップロードしないでください。",
      "ChatGPTはAPIやBusinessのデータを学習に使わないとしていますが、機密データは社内承認を取ってから扱ってください。",
      "=AI()関数の結果はテキスト型です。足し算などに使う前に数値に変換してください。",
      "記事内の料金表記には重複や換算値が含まれます。契約前に公式サイトで確認してください。",
    ],
    keywords: ["Excel AI", "Copilot Excel", "スプレッドシート AI関数", "=AI 関数", "Gemini スプレッドシート", "Excel 関数 AI 作成"],
  },
  {
    slug: "translation",
    category: "資料・プレゼン",
    title: "翻訳に使うAI: DeepL・みらい翻訳・Google翻訳・ChatGPT（2026年10月）",
    description: "DeepLの無料版とIndividual・Team・Businessの料金と文字数、無料版の学習利用、法人向けみらい翻訳、Google翻訳と汎用AIの使い分け、契約書を訳すときの確認手順をまとめました。",
    checked: "2026-10-21",
    intro: "翻訳AIは「どれが一番うまいか」より「何を訳すか」で選びます。文書の品質はDeepL、機密文書と社内用語の統一はみらい翻訳、手軽さと言語数はGoogle翻訳、口調の調整は汎用AIが得意です。業務で大事なのは、入力した文章が学習に使われるかどうかです。",
    tools: [
      { name: "DeepL", audience: "文書をきちんと訳したい人", what: "無料版は月5万文字・ファイル1件。有料版は翻訳完了後にサーバー上のテキストを削除しますが、無料版の入力は学習に再利用されると説明されています。", price: "Individual 月1,150円（年払い換算）・30万文字、Team 月3,750円、Business 月7,500円（2026-10確認）", source: AIPICKS_DEEPL },
      { name: "みらい翻訳（Mirai Translator）", audience: "契約書や機密文書を扱う企業・官公庁", what: "テキスト・ファイル翻訳、リアルタイム音声翻訳、動画字幕、API。組織向けFLaTは20言語、法務・財務・特許の専門モデルを持ち、全プランで用語集が使えます。ISO27001・ISO27017取得、入力文の学習への二次利用はないとされています。", price: "Plus 1名あたり月500円から、FLaT 月25万円から（2026-09時点、詳細は公式確認）", source: AIPICKS_MIRAI },
      { name: "Google翻訳", maker: "Google", audience: "旅行や短い文章", what: "完全無料で対応言語が多いのが特徴です。ビジネス文書の清書には物足りない場面があります。", price: "無料（2026-09更新の記事）", source: AIPICKS_TRANSLATE },
      { name: "ChatGPT・Claude", audience: "口調や用語を指示して整えたい人", what: "指示で訳文を調整できます。Claudeは長文と文脈の保持に強いとされています。業務では学習の扱いを有料プランや設定で確認します。", price: "無料から、有料プランあり（2026-09更新の記事）", source: AIPICKS_TRANSLATE },
    ],
    workflow: [
      { step: "下訳", detail: "文書はDeepLかみらい翻訳、短文はGoogle翻訳で下訳します。" },
      { step: "読み手に合わせて整える", detail: "下訳を汎用AIに渡し、読み手、敬体・常体、固定する用語の一覧を指示して手直しさせます。" },
      { step: "危ない部分を照合", detail: "数字・日付・期限・会社名・否定表現を原文と1行ずつ照合します。" },
      { step: "用語集を育てる", detail: "社内用語はDeepLやみらい翻訳の用語集に登録し、次から使い回します。" },
      { step: "正式な書類は人へ", detail: "公的な提出書類や契約の正本は、専門の翻訳者の確認を入れます。" },
    ],
    combos: [
      { pair: "DeepL下訳 + Claudeで整える", why: "意味の正確さはDeepL、読みやすさの調整は汎用AIが得意です。" },
      { pair: "みらい翻訳 + 用語集", why: "法務・特許の文書で社内用語をそろえやすくなります。" },
      { pair: "AI翻訳 + 人のチェック", why: "責任のある文書は、AIのあとに人が要点を照合します。" },
    ],
    cautions: [
      "DeepL無料版は入力内容が学習に再利用されると説明されています。社外秘の文章は有料版か法人向けサービスを使ってください。",
      "AIの訳文は流暢でも、数字や否定が入れ替わることがあります。契約書は必ず人が照合してください。",
      "料金と条件は2026年9〜10月時点です。契約前に公式サイトで確認してください。",
    ],
    keywords: ["AI翻訳", "DeepL 料金", "DeepL 無料版 学習", "みらい翻訳 料金", "翻訳 AI 比較", "契約書 翻訳 AI"],
  },
  {
    slug: "research",
    category: "資料・プレゼン",
    title: "論文・リサーチに使うAIとDeep Research（2026年10月）",
    description: "ChatGPT・Gemini・Perplexity・GrokのDeep Researchの所要時間と特徴、PerplexityとGeminiの使い分け、レポートを作る手順と出典を確かめるコツをまとめました。",
    checked: "2026-10-21",
    intro: "Deep Researchは調査計画を立て、検索と読み込みを繰り返して出典付きのレポートを作ります。速さと出典の密度ならPerplexity、深さと思考過程の見やすさならGemini、文章量と考察ならChatGPTというように性格が違います。回数制限と料金はよく変わります。",
    tools: [
      { name: "ChatGPT Deep Research", maker: "OpenAI", audience: "提出用の長いレポート", what: "調査前に確認事項を箇条書きで示し、考察が深く文章量が多いのが特徴です。約10分（5〜15分）かかります。", price: "Plus 月20ドル、Pro 月200ドル（料金・回数は2025年2月時点の記載）", source: AIMARKET_DR },
      { name: "Gemini Deep Research", maker: "Google", audience: "時間をかけて深く調べたい人", what: "計画を事前に示して修正でき、Googleドキュメント・スプレッドシートに出力できます。思考過程が見え、日本語のソースを直接引用する傾向があります。", price: "Google AI Pro 月2,900円、Ultra 月14,500円から（2026-09時点）", source: AIPICKS_PPLX },
      { name: "Perplexity", audience: "素早く何度も質問したい人", what: "出典の密度が高く、約3分で終わります。英語のソースを日本語に訳して返す傾向があります。", price: "無料で1日数回のPro Search、Pro 月$20（2026-09時点）", source: AIPICKS_PPLX },
      { name: "Grok Deep Research", maker: "xAI", audience: "Xの最新情報を含めて調べたい人", what: "約1分と速く、英語サイトを優先し学術論文の引用が多い傾向です。情報源に誤りや古い情報が含まれる場合があります。", price: "Xプレミアム 月980円（2025年2月時点の記載）", source: AIMARKET_DR },
    ],
    workflow: [
      { step: "範囲を絞る", detail: "期間、市場、比較する企業数を決めて質問します。広い質問は浅いレポートになります。" },
      { step: "地図を作る", detail: "Perplexityで論点と主要な出典をざっと集め、日本の話題なら日本語の公的機関・報道を出典にするよう指示します。" },
      { step: "形式を決めて本調査", detail: "表の数、出典の位置、結論の形を指定してGeminiかChatGPTでレポートを作ります。" },
      { step: "弱い主張を聞き直す", detail: "「根拠が一番弱い主張を3つ挙げて確かめ直して」と頼みます。" },
      { step: "原文を開いて確認", detail: "引用する数字・日付・名前はリンク先を開いて自分で確認します。論文はCiNiiやJ-STAGEなどで原文を読みます。" },
    ],
    combos: [
      { pair: "Perplexity → Gemini", why: "素早い反復で論点を固め、深い調査は時間をかけてGeminiで行います。" },
      { pair: "Gemini + Googleドキュメント", why: "レポートをそのままドキュメントに出して共同編集できます。" },
      { pair: "Deep Research + 一次資料", why: "AIのまとめを入口にし、引用は必ず一次資料から取ります。" },
    ],
    cautions: [
      "Deep Researchの出典にも誤りや古い情報が含まれます。引用前に原文を確認してください。",
      "ChatGPTとGrokの料金・回数は2025年2月時点の記載です。現在の条件は公式サイトで確かめてください。",
      "学校や学会のAI利用の開示ルールを提出前に確認してください。",
    ],
    keywords: ["ディープリサーチ 比較", "Deep Research 使い方", "論文 要約 AI", "Perplexity Gemini 違い", "リサーチ AI", "文献調査 AI"],
  },
  {
    slug: "business-plan",
    category: "資料・プレゼン",
    title: "事業計画書・補助金申請書をAIで作る手順（2026年10月）",
    description: "ものづくり補助金・持続化補助金などの事業計画書を生成AIで下書きする5つの手順、汎用AI・補助金特化AI・専門家併用の違い、ハルシネーションとテンプレート感を避けるコツをまとめました。",
    checked: "2026-10-21",
    intro: "AIは申請書づくりのハードルを下げますが、申請者が増えて競争が激しくなるので採択を保証するものではありません。制度の条件は公募要領という一次情報で確認し、AIには審査項目に沿った下書きと文章の整理を任せます。",
    tools: [
      { name: "汎用生成AI（ChatGPT・Claude・Geminiなど）", audience: "すべての申請者", what: "低コストで応用が利きますが、補助金固有の知識はないため、指示の出し方で成果が変わります。", source: ATSOHO_SUBSIDY },
      { name: "補助金特化型AIサービス", audience: "審査基準に合った下書きが早くほしい人", what: "審査基準に合わせた下書きが出やすい一方、月額制や成功報酬制で費用がかかります。「作成時間80〜90%削減」などはサービス側の自社実績です。", source: ATSOHO_SUBSIDY },
      { name: "AI + 認定支援機関などの専門家", audience: "金額が大きい申請", what: "AIで下書きを作り、専門家が最終チェックします。品質と安心感が得られますが、報酬負担が大きくなります。", source: ATSOHO_SUBSIDY },
    ],
    workflow: [
      { step: "公募要領で審査項目を把握", detail: "制度の条件はAIの答えではなく公募要領で確認します。ページ数の目安（持続化補助金はA4で5〜10枚程度、ものづくり補助金は10ページ以内）もここで見ます。" },
      { step: "自社情報を箇条書きに", detail: "事業内容、経営課題、補助金で行う投資、見込む効果を具体的な数字と一緒にまとめます。材料が少ないと出力も薄くなります。" },
      { step: "章ごとに下書き", detail: "審査項目に沿った構成で、章ごとに分けて出力させると品質が安定します。" },
      { step: "人が検証して直す", detail: "出典のない数字は削るか一次情報に置き換え、自社ならではのエピソードと数字を足します。" },
      { step: "電子申請と添付書類", detail: "決算書や見積書はAIでは作れません。自分でそろえて電子申請システムに転記します。" },
    ],
    combos: [
      { pair: "汎用AI + 公募要領", why: "審査項目を表にさせ、項目ごとに書くべきことを先に決めると下書きがぶれません。" },
      { pair: "Deep Research + 市場の根拠", why: "市場規模や競合の数字を出典付きで集め、引用する数字は原文で確認します。" },
      { pair: "AI下書き + 専門家チェック", why: "形式と論理はAI、審査の勘所は専門家が補います。" },
    ],
    cautions: [
      "AIはもっともらしい誤った数字や条件を書くことがあります。必ず裏取りしてください。",
      "無難な文章は審査員に見抜かれやすいとされます。自社の具体的な話を人が加えてください。",
      "機密性の高い数字を入力する前に、プランごとの学習利用の扱いを確認してください。",
      "補助金ごとの詳細な要件は中小企業庁などの公式情報で確認してください。",
    ],
    keywords: ["事業計画書 AI", "補助金 申請書 AI", "ものづくり補助金 事業計画書", "持続化補助金 AI", "生成AI 補助金", "事業計画書 書き方"],
  },
  {
    slug: "coding-website",
    category: "業務運用・開発",
    title: "バイブコーディング: プログラミングなしでWebサイト・アプリを作るAI（2026年10月）",
    description: "Bolt・Lovable・v0・Replit・Cursor・Devin Desktop・Claude Codeの料金と無料枠、非エンジニア向けの5ステップ、APIキーの扱いと費用を抑えるコツをまとめました。",
    checked: "2026-10-21",
    intro: "作りたいものを言葉で説明すると、AIがコードを書いて動かしてくれるのがバイブコーディングです。ブラウザだけで完結するBolt・Lovable・v0、開発環境ごと使えるReplit、コードを見ながら指示するCursorやClaude Codeに分かれます。無料枠だけで実用アプリを仕上げるのは難しく、月$20程度は見込んでおくのが現実的です。",
    tools: [
      { name: "Bolt", audience: "未経験者", what: "ブラウザで完結します。", price: "無料 月100万トークン、Pro 月$20（約3,000円）（2026-10更新の記事）", source: AIPICKS_VIBE },
      { name: "Lovable", audience: "見た目を重視する人", what: "デザインの評価が高く、Supabase連携が自動です。無料クレジットは早く減ります。", price: "Starter 月$20、Launch 月$50（2026-10更新の記事）", source: AIPICKS_VIBE },
      { name: "v0", maker: "Vercel", audience: "UI部品を作りたい人", what: "UI部品の生成に強く、複雑なバックエンド処理は不向きです。", price: "無料（毎日付与）、Premium 月$20（2026-10更新の記事）", source: AIPICKS_VIBE },
      { name: "Cursor", audience: "本格的に開発したい人", what: "VS Code系のAIエディタです。初期設定に知識が要ります。", price: "2週間の試用、Pro 月$20（2026-10更新の記事）", source: AIPICKS_VIBE },
      { name: "Devin Desktop（旧Windsurf）", audience: "無料で長く試したい人", what: "Tab補完は無制限で、エージェントはクォータ制です。2026年6月に改称しました。", price: "無料あり、Pro 月$20、Max 月$200（2026-10更新の記事）", source: AIPICKS_VIBE },
      { name: "Claude Code", maker: "Anthropic", audience: "ターミナルを使える上級者", what: "ターミナルで操作するエージェントです。", price: "API従量課金（2026-10更新の記事）", source: AIPICKS_VIBE },
    ],
    workflow: [
      { step: "仕様を箇条書き", detail: "誰が使うか、どんな画面があるか、ボタンを押すと何が起きるかを書き出します。" },
      { step: "まず骨組み", detail: "箇条書きをそのまま入力し、最初は見た目の枠だけを作らせます。" },
      { step: "プレビューで1つずつ直す", detail: "実際にクリックし、違和感を短い文で伝えます。1回の指示で直すのは1か所だけ。エラーはF12のConsoleの赤字をコピーして貼ります。" },
      { step: "データベースをつなぐ", detail: "保存機能を頼みます（LovableならSupabase）。" },
      { step: "公開", detail: "PublishかDeployで専用URLが出ます。独自ドメインも設定できます。" },
    ],
    combos: [
      { pair: "汎用AIで仕様整理 + Bolt・Lovableで制作", why: "画面と機能を先に会話で整理すると、制作ツールへの指示が短く正確になります。" },
      { pair: "Lovable + Supabase", why: "保存やログインが必要なアプリでもデータベースを自動でつなげます。" },
      { pair: "v0の部品 + Cursor", why: "見た目の部品はv0で作り、組み立てはエディタで管理します。" },
    ],
    cautions: [
      "APIキーやパスワードをチャットに直接入れないでください。生成コードに平文で書かれ、流出につながるおそれがあります。.envなどの環境変数に分けます。",
      "AIが勝手に追加した外部ライブラリ（package.json）を定期的に確認してください。",
      "毎回全体を読ませると費用が膨らみます。変更するファイルだけを指定してください。",
      "料金は米ドル表記が中心で、為替と仕様は変わります。導入前に公式サイトを確認してください。",
    ],
    keywords: ["バイブコーディング", "ノーコード AI アプリ", "Webサイト 作成 AI", "Lovable 料金", "Bolt 使い方", "非エンジニア アプリ開発"],
  },
  {
    slug: "customer-chat",
    category: "業務運用・開発",
    title: "LINE公式アカウントのAIチャットボットで問い合わせ対応（2026年10月）",
    description: "LINE公式アカウントのAIチャットボット（β）の仕組み、PDFからQ&Aを自動生成する設定手順、チャットProオプションの料金、応答メッセージとの違いと使えない業種・注意点をまとめました。",
    checked: "2026-10-21",
    intro: "日本のお店の問い合わせはLINEが中心です。LINE公式アカウントのAIチャットボット（β）は、オーナーが用意したQ&Aから意図をくんで答える仕組みで、キーワード完全一致の応答メッセージより柔軟です。ただしQ&Aにない質問には答えられないので、用意するQ&Aの質が成否を分けます。",
    tools: [
      { name: "LINE公式アカウント AIチャットボット（β）", maker: "LINEヤフー", audience: "LINE公式アカウントで問い合わせを受けるお店", what: "チャットをAIが判別し、設定したQ&Aから最適な回答を返します。該当がなければ「適切な回答がありません」と返します。PDFや画像からQ&Aを自動生成し、CSVで一括作成もできます。ユーザーの評価をグラフで見て低評価の回答を直せます。設定はPCのWeb管理画面からだけです。", price: "自動返信にはチャットProオプション（月額3,000円・税別）が必要。Q&A生成とデモ確認は全アカウントで可（2025-11時点）", source: LYC_AIBOT },
      { name: "応答メッセージ（従来機能）", maker: "LINEヤフー", audience: "決まった質問に決まった答えを返したい店", what: "登録したキーワードに完全一致したときだけ返します。キーワードと返信を1つずつ登録し、手動で直します。", source: AURANT_AIBOT },
    ],
    workflow: [
      { step: "よくある質問を集める", detail: "過去のLINE・電話・メールの問い合わせから、多い質問を数えます。" },
      { step: "資料をアップロード", detail: "管理画面の「自動応答」→「AIチャットボット（β）」で注意事項に同意し、メニュー表や料金表のPDF・画像をアップロードします。" },
      { step: "Q&Aを整える", detail: "生成されたQ&Aの表現やリンクを直し、営業時間・予約・キャンセル・アレルギーなどを足します。" },
      { step: "デモで確認", detail: "言い回しを変えた質問をデモ画面で試し、外れる答えを直します。" },
      { step: "評価を見て改善", detail: "運用後はユーザーの評価を見て、低評価の回答から順に直します。" },
    ],
    combos: [
      { pair: "AIチャットボット + 人のチャット", why: "予約の確定や料金の最終確認は人が対応すると誤案内を防げます。" },
      { pair: "AIチャットボット + 応答メッセージ", why: "決まり文句は応答メッセージ、言い回しが揺れる質問はAIに任せます。" },
      { pair: "Q&A + 店の資料更新", why: "メニューや料金を変えたら同じ日にQ&Aも直します。" },
    ],
    cautions: [
      "医療・法律・金融などの専門領域の情報提供を目的とした利用は禁止されています。対象外の業種ではメニュー自体が表示されません。",
      "AIの回答は不正確な場合があると明記されています。予約確定や料金の最終確認は人によるチャットで確認する運用が勧められています。",
      "設定情報やチャット履歴の一部がOpenAIに送られますが、OpenAIのモデル学習には使われないとされています。",
      "返信回数が著しく多い場合などは提供が止まり、手動チャットか応答メッセージに自動で切り替わることがあります。",
    ],
    keywords: ["LINE AIチャットボット", "LINE公式アカウント 自動応答", "チャットPro 料金", "問い合わせ対応 AI", "飲食店 LINE 予約 自動", "チャットボット 導入"],
  },
  {
    slug: "blog-seo",
    category: "マーケティング・広告",
    title: "AI時代のブログ・SEO: AIによる概要で引用される記事（2026年10月）",
    description: "Googleの公式ガイドがAI検索について述べること（llms.txt不要、汎用記事より一次情報）と、日本で検索1位のCTRが62.7%減ったAhrefs調査、AIで下書きして経験を足す手順をまとめました。",
    checked: "2026-10-21",
    intro: "検索結果の上にAIによる概要が出るようになり、日本では検索1位でもクリックが大きく減っています。Googleは従来のSEOの基本はそのままで、AI向けの特別な対策は要らないとしています。差がつくのは、AIが要約で吸収してしまう汎用的な記事ではなく、実体験と独自の視点がある記事です。",
    tools: [
      { name: "Googleの公式ガイド（AI検索）", maker: "Google", audience: "検索流入を狙うすべてのサイト", what: "AIによる概要は既存のランキングを使うRAGとクエリの分割（fan-out）で動きます。llms.txtなどAI専用ファイル、コンテンツの細切れ化、過剰な構造化データ、AI向けの書き直しはGoogle検索には不要としています。一般的な「コツ」記事のような汎用コンテンツは要約に吸収され、一次のレビューや独自の視点が評価されます。", source: INNOVATOPIA_GOOGLE },
      { name: "汎用AI（ChatGPT・Claude・Gemini）", audience: "構成と下書きがほしい書き手", what: "見出し構成、比較表の枠、よくある質問の整理に使います。体験と数字は自分で足します。", source: INNOVATOPIA_GOOGLE },
    ],
    workflow: [
      { step: "実際の質問を選ぶ", detail: "「AとBどっち」「〜するといくら」のような、読者が本当に打つ長い質問をテーマにします。" },
      { step: "AIで骨組み", detail: "見出しと比較表の枠をAIに作らせます。キーワードの詰め込みやAI向けの細切れ化はしません。" },
      { step: "自分だけの情報を足す", detail: "使ってみた結果、写真、払った金額、失敗談を入れます。AIが書けない部分が引用される理由になります。" },
      { step: "事実確認と出典", detail: "AIが出した数字や名前は原文を開いて確かめ、出典リンクを付けます。" },
      { step: "技術面の基本", detail: "クロールとインデックスを妨げないこと、JavaScriptをブロックしないことを確認します。店舗ならGoogleビジネスプロフィールの情報を正確にします。" },
    ],
    combos: [
      { pair: "AIの構成 + 一次体験の本文", why: "速さはAI、引用される理由は体験です。" },
      { pair: "比較表 + よくある質問", why: "比較の問いに答える記事は、AIの回答でも参照されやすくなります。" },
      { pair: "AIで校正 + 自分の言葉", why: "誤字はAIに直させ、判断と語り口は自分で残します。" },
    ],
    cautions: [
      "Ahrefsの調査では、日本の情報収集型キーワードで検索1位のCTR低下率が2025年12月の38.0%から2026年6月の62.7%に広がりました（予測CTR24.1%に対し実測9.0%）。クリックが減る前提で計画してください。",
      "Googleは、作られた言及（被リンクや言及の水増し）はスパム対策で無効化されるとしています。",
      "AI専用の対策を売り込むサービスには注意してください。Googleは不要としています。",
    ],
    keywords: ["AIによる概要 SEO", "AI Overviews 日本 CTR", "ブログ AI 書き方", "生成AI SEO", "llms.txt 必要", "AIモード 対策"],
  },
];
