// Japanese AI use-case guides (8 guides + keyword map) for Japan, checked 2026-10-20.
import type { Guide, KeywordCategory } from "../ai-use-cases";

export const keywordMap: KeywordCategory[] = [
  {
    category: "専門業務",
    cases: [
      { name: "法務・契約書レビュー", slug: "legal", keywords: ["契約書レビュー AI", "リーガルテック 比較", "LegalOn 料金", "AI 契約審査 弁護士法72条", "法務 AI ツール"] },
      { name: "労務・人事", slug: "labor", keywords: ["労務 AI", "就業規則 AI チェック", "社労士 AI ツール", "残業代 計算 AI", "人事労務 チャットボット"] },
      { name: "税務・会計", slug: "tax-accounting", keywords: ["確定申告 AI", "会計ソフト AI 仕訳", "freee AI", "マネーフォワード AI確定申告", "国税庁 チャットボット"] },
      { name: "行政手続き・申請書類", keywords: ["補助金 申請書 AI", "事業計画書 AI", "行政書類 AI 作成"] },
      { name: "特許・知財", keywords: ["特許調査 AI", "先行技術調査 AI", "商標 検索 AI"] },
      { name: "不動産・賃貸契約", keywords: ["賃貸借契約書 AI", "重要事項説明 AI", "不動産 契約 チェック"] },
      { name: "決算書・IR資料の読み込み", keywords: ["決算書 分析 AI", "有価証券報告書 要約 AI", "IR資料 AI"] },
    ],
  },
  {
    category: "資料・プレゼン",
    cases: [
      { name: "プレゼン資料(スライド)", slug: "presentation", keywords: ["プレゼン資料 AI 作成", "スライド 自動生成", "Gamma 使い方", "イルシル", "PowerPoint Copilot"] },
      { name: "報告書・企画書", keywords: ["企画書 AI", "報告書 作成 AI", "稟議書 AI"] },
      { name: "議事録・文字起こし", keywords: ["議事録 AI", "文字起こし AI", "会議 要約 AI"] },
      { name: "Excel・データ整理", keywords: ["Excel 関数 AI", "データ整理 AI", "スプレッドシート AI"] },
      { name: "翻訳・ローカライズ", keywords: ["翻訳 AI 比較", "DeepL 代わり", "多言語化 AI"] },
      { name: "論文・リサーチ", keywords: ["論文 要約 AI", "ディープリサーチ 使い方", "文献調査 AI"] },
    ],
  },
  {
    category: "デザイン・印刷物",
    cases: [
      { name: "ポスター", slug: "poster", keywords: ["ポスター 作成 AI", "イベント ポスター AI", "画像生成AI 日本語 文字", "B2 ポスター 作り方"] },
      { name: "パンフレット・チラシ・メニュー", slug: "pamphlet", keywords: ["チラシ 作成 AI", "パンフレット AI", "メニュー表 作成 AI", "Canva チラシ 印刷"] },
      { name: "ロゴ・名刺", keywords: ["ロゴ 作成 AI", "名刺 デザイン AI", "ロゴ AI 無料"] },
      { name: "ECの商品ページ", keywords: ["商品ページ AI", "楽天 商品画像 AI", "LP 作成 AI"] },
      { name: "サムネイル・SNS画像", keywords: ["サムネイル AI", "YouTube サムネ 作成 AI", "インスタ 投稿画像 AI"] },
    ],
  },
  {
    category: "マーケティング・広告",
    cases: [
      { name: "広告画像・商品写真", slug: "ad-image", keywords: ["広告画像 AI", "商品写真 AI 背景", "バナー 作成 AI", "物撮り AI"] },
      { name: "広告動画・ショート動画", slug: "ad-video", keywords: ["動画生成AI 比較", "広告動画 AI", "Veo 3.1 使い方", "Kling 料金", "ショート動画 AI"] },
      { name: "広告コピー", keywords: ["キャッチコピー AI", "広告文 作成 AI", "コピーライティング AI"] },
      { name: "SNS運用", keywords: ["SNS運用 AI", "インスタ 投稿 AI", "X 投稿 自動化"] },
      { name: "ブログ・SEO", keywords: ["ブログ 記事 AI", "SEO 記事 AI", "note 記事 AI"] },
      { name: "ナレーション・BGM", keywords: ["AI ナレーション", "音声合成 日本語", "BGM 生成 AI"] },
    ],
  },
  {
    category: "業務運用・開発",
    cases: [
      { name: "問い合わせ対応チャットボット", keywords: ["問い合わせ AI チャットボット", "LINE チャットボット AI", "カスタマーサポート AI"] },
      { name: "コーディング・Web制作", keywords: ["コーディング AI", "バイブコーディング", "ホームページ 作成 AI"] },
      { name: "業務自動化エージェント", keywords: ["業務自動化 AI", "AIエージェント 導入", "MCP とは"] },
      { name: "採用・面接", keywords: ["求人票 AI", "履歴書 AI 添削", "AI 面接"] },
      { name: "教材・研修資料", keywords: ["研修資料 AI", "テスト問題 作成 AI", "教材 作成 AI"] },
    ],
  },
];

// ---- Sources ----
const AIPICKS_LEGAL_RANK = { label: "AIピックス・法務AIツールランキング (2026-06-06, 2026-10-01更新)", url: "https://aipicks.jp/mag/legal-ai-tools-ranking-2026" };
const AIPICKS_LEGAL_LAWYERS = { label: "AIピックス・弁護士向けAIツール (2026-06-04, 2026-10-02更新)", url: "https://aipicks.jp/mag/legal-ai-tools-lawyers-2026" };
const LEGALON_WEEKLY = { label: "LegalOn Technologies・Weekly Report (2026-09-02)", url: "https://www.legalontech.com/jp/news/299" };
const HRBASE_IMPRESS = { label: "クラウド Watch (2026-02-18)", url: "https://cloud.watch.impress.co.jp/docs/news/2086535.html" };
const AIPICKS_LABOR = { label: "AIピックス・社労士向けAIツール (2026-06-04, 2026-10-02更新)", url: "https://aipicks.jp/mag/labor-consultant-ai-tools-2026" };
const SHALOM_PR = { label: "エムケイシステム プレスリリース (2026-06-11)", url: "https://prtimes.jp/main/html/rd/p/000000028.000045053.html" };
const SMARTHR_IMPRESS = { label: "クラウド Watch (2026-07-08)", url: "https://cloud.watch.impress.co.jp/docs/news/2123332.html" };
const FREEE_IMPRESS = { label: "Impress Watch (2026-02-03)", url: "https://www.watch.impress.co.jp/docs/news/2083061.html" };
const MF_AI_TAX = { label: "マネーフォワード AI確定申告 公式 (2026-02-05更新)", url: "https://biz.moneyforward.com/campaign/ai-tax-return/" };
const NTA_FUTABA = { label: "TKC (2025-12-11)", url: "https://tkc.jp/consolidate/tkc_express/2025/12/202512_13179" };
const ETAX_IMPRESS = { label: "Impress Watch・令和7年分 確定申告の変更点", url: "https://www.watch.impress.co.jp/docs/news/2073621.html" };
const SLIDES_COMPARE = { label: "デジタルゴリラ・プレゼンAI比較 (2026-06-29, 2026-08-25更新)", url: "https://digital-gorilla.co.jp/ai-lab/?p=1728" };
const GPT_IMAGES2 = { label: "GIGAZINE (2026-04-22)", url: "https://gigazine.net/news/20260422-chatgpt-images-2-0/" };
const GPT_IMAGES2_SBBIT = { label: "ビジネス+IT (2026-04-22)", url: "https://www.sbbit.jp/article/cont1/184892" };
const NANO_BANANA = { label: "SHIFT AI (2026-09-04更新)", url: "https://shift-ai.co.jp/blog/37147/" };
const CANVA_PRINT = { label: "Canva 公式・チラシ印刷 (2026-10確認)", url: "https://www.canva.com/ja_jp/flyers/" };
const CANVA_AI2 = { label: "Web担当者Forum (2026-04-24)", url: "https://webtan.impress.co.jp/n/2026/04/24/52558" };
const ADOBE_MAX = { label: "マイナビニュース (2025-10-29)", url: "https://news.mynavi.jp/article/20251029-3599208/" };
const ADOBE_NEWS = { label: "Adobe 公式・AIニュース (2026年3〜6月)", url: "https://www.adobe.com/jp/ai/overview/news.html" };
const GRAPHIC_PRINT = { label: "公募ガイド・グラフィック プレスリリース (2026-05-15)", url: "https://koubo.jp/article/78981" };
const AIMSTAR = { label: "コマースピック (2025-04-04)", url: "https://www.commercepick.com/?p=63848" };
const FLOW_WEEL = { label: "WEEL・Google Flow解説 (2026-05時点の料金)", url: "https://weel.co.jp/media/innovator/google-flow/" };
const VEO_AISMILEY = { label: "AIsmiley (2026-02-06, 2026-02-27更新)", url: "https://aismiley.co.jp/ai_news/google-veo3-new-2026/" };
const VIDEO_LABMEMO = { label: "labmemo・AI動画生成比較 (2026-06-14, 2026-07-21更新)", url: "https://labmemo.com/ai-video-generation-comparison-guide-2026/" };

export const guides: Guide[] = [
  {
    slug: "legal",
    category: "専門業務",
    title: "法務・契約書レビューに使うAI(2026年10月)",
    description: "LegalOn・LeCHECK・MNTSQ・OLGA・GVA assist・クラウドリーガルなど国内の法務AIを、企業規模や用途別に整理。契約書レビューの流れ、料金の目安、弁護士法72条や守秘義務との関係、汎用AIとの使い分けまでまとめました。",
    checked: "2026-10-20",
    intro: "日本の法務AIは、契約書レビューを中心に「レビューから契約管理、案件管理まで」を一つにまとめる方向へ進んでいます。多くは企業法務部や法律事務所向けで、汎用の生成AIとは学習データも責任の所在も違います。まずは自社の契約件数と、法務担当者がいるかどうかで選ぶのが近道です。",
    tools: [
      { name: "LegalOn Cloud", maker: "LegalOn Technologies", audience: "契約レビューが月100件を超える企業法務部・中堅以上の法律事務所", what: "契約書のAIレビュー、弁護士監修のひな形、案件管理、締結後の契約管理までを一つで扱います。自社の審査基準に合わせたカスタマイズや、受任判断から修正案作成、相手方とのやり取りまでを進める「レビューAgent」も紹介されています。", price: "要問い合わせ (2026-06)", source: AIPICKS_LEGAL_RANK },
      { name: "LegalOn 契約一括分析", maker: "LegalOn Technologies", audience: "大量の締結済み契約を見直したい法務部", what: "複数の契約書をまとめて分析し、分析後もファイルを追加すると既存の観点が自動で当てはまります。Word形式でダウンロードすると、指摘コメントや修正履歴に編集者名が反映されます。", source: LEGALON_WEEKLY },
      { name: "LeCHECK", audience: "月数十件の契約を扱う中小企業・小規模事務所", what: "専門弁護士30名が監修した条項ライブラリで、業務委託・NDA・売買などの契約をAIレビューします。", source: AIPICKS_LEGAL_RANK },
      { name: "MNTSQ CLM", audience: "数千件規模の契約を持つ大企業・M&Aやグローバル案件の多い企業", what: "契約の締結・管理・更新を一括で扱うCLMです。締結済み契約のデータベース化、検索、分析に強みがあります。", price: "要問い合わせ (2026-06)", source: AIPICKS_LEGAL_RANK },
      { name: "OLGA", audience: "企業の法務・経営企画部門", what: "案件の依頼受付から契約管理、法律相談までを一元管理します。", source: AIPICKS_LEGAL_LAWYERS },
      { name: "GVA assist", maker: "GVA TECH", audience: "スピード重視のスタートアップ・事業部門", what: "NDAのチェックから始まり、対応する契約類型を広げたレビューツールです。ひな形との照合ができます。", source: AIPICKS_LEGAL_RANK },
      { name: "クラウドリーガル", audience: "法務担当者がいない会社", what: "AIによるチェックに加え、弁護士へのチャット相談が付きます。回答は原則1営業日以内です。", price: "Basic 月11,000円〜、Pro 月55,000円〜、Premium 月110,000円〜(税込・年契約、2026-06)", source: AIPICKS_LEGAL_RANK },
    ],
    workflow: [
      { step: "論点を整理する", detail: "取引の背景、相手方との力関係、譲れない条件を箇条書きにします。汎用AI(ChatGPT・Claude・Gemini)で整理してもよいですが、社名や個人名は伏せて入力します。" },
      { step: "契約書をAIレビューにかける", detail: "契約書をアップロードし、不利な条項や抜けている条項を指摘させます。自社の審査基準(プレイブック)を登録できるツールなら、先に登録しておくと指摘がぶれにくくなります。" },
      { step: "修正案を人が選ぶ", detail: "AIが出した修正文案は、交渉の方針に合わせて担当者が取捨選択します。そのまま相手に送らず、なぜ直すのかを一言添えられるか確認します。" },
      { step: "判例・法令の裏取り", detail: "汎用AIが挙げた判例番号や条文は、実在しないことがあります。判例データベースや六法で原文を開いて確認してから使います。" },
      { step: "締結後の管理", detail: "締結した契約はCLM(MNTSQ・OLGA・LegalOnなど)に保存し、更新期限や自動更新条項を検索できる状態にしておきます。" },
    ],
    combos: [
      { pair: "契約レビューAI + 汎用AIでの説明文作成", why: "リスクの指摘は法務特化ツールに任せ、事業部への説明メールや相手方へのコメントは汎用AIで読みやすく整えると、往復が減ります。" },
      { pair: "契約レビューAI + CLM", why: "レビューした結果と締結版を同じ場所に残すと、次回の同種契約で過去の交渉経緯をすぐ参照できます。" },
      { pair: "AIチェック + 弁護士チャット相談", why: "法務担当者がいない会社は、AIで論点を洗い出してから弁護士に聞くと、相談の時間と費用を抑えやすくなります。" },
    ],
    cautions: [
      "法務省は2023年8月に「AI等を用いた契約書等関連業務支援サービスの提供と弁護士法第72条との関係について」を公表し、AIが個別の法的リスクを判断して修正案を示すサービスは弁護士法に抵触し得る場合があるとしています。最終判断は社内法務や弁護士が行いましょう。",
      "海外製ツールは日本法への対応に差があります。日本の契約・紛争に使うときは特に慎重に確認してください。",
      "依頼者情報や機密の契約書は、弁護士職務基本規程の守秘義務や個人情報保護法との関係を踏まえ、データの学習利用や保管条件を確認したサービスにだけ入力します。個人情報保護委員会も2023年6月に生成AIサービス利用時の注意喚起を出しています。",
      "料金は記事掲載時点の目安です。多くの製品は商談ベースなので、導入前に各社に確認してください。",
    ],
    keywords: ["契約書レビュー AI", "リーガルテック 比較", "LegalOn 料金", "AI 契約審査 弁護士法72条", "CLM 比較", "法務 AI ツール"],
  },
  {
    slug: "labor",
    category: "専門業務",
    title: "労務・人事に使うAI(2026年10月)",
    description: "HRbaseの就業規則チェック、社労士事務所向けのAI社労夢、SmartHRのAIエージェント構想など、労務AIを人事担当・社労士・働く人の立場別に整理し、就業規則の点検から残業代の確認まで、使う順番と注意点をまとめました。",
    checked: "2026-10-20",
    intro: "労務AIは、就業規則や手続きをチェックする「業務型」と、法令や通達を調べる「調査型」に分かれます。どちらも最終的な判断や行政への届出は人が行う前提です。働く人の立場で困ったときは、AIで状況を整理したうえで労働基準監督署や社会保険労務士に相談するのが確実です。",
    tools: [
      { name: "HRbase 就業規則チェック機能", maker: "HRbase", audience: "企業の労務担当者・社会保険労務士", what: "就業規則を読み込み、最近の法改正が反映されていない条文や、項・号単位の漏れ・重複を指摘します。差し替え条文の案を出し、条文の追加・削除に合わせて条番号を自動で振り直します。既存のWordファイルをそのまま使えます。", source: HRBASE_IMPRESS },
      { name: "HRbase PRO", maker: "HRbase", audience: "社労士・労務担当者", what: "労務相談に特化した専門データベースを搭載したAIです。", price: "要見積もり(月数万円〜、2026-06)", source: AIPICKS_LABOR },
      { name: "AI社労夢", maker: "エムケイシステム", audience: "社労士事務所", what: "社労士事務所向けクラウド「社労夢」と連携し、手続き・給与・社会保険・雇用保険・労働保険の5つのエージェントが、入退社手続きや算定・月変のチェック、公文書や返戻書類の読み取り、提出前のエラー検出を手伝います。最終確認と承認は人が行う設計です。2026年7月23日に正式リリース予定と発表されました。", source: SHALOM_PR },
      { name: "SmartHR のAIエージェント(計画)", maker: "SmartHR", audience: "従業員・人事担当者", what: "従業員向けに業務や社内情報を案内するエージェント、人事担当の設定や定型作業を手伝うバックオフィス向けエージェント、人事データから条件に合う人を探す「AI HRBP」を2026年度の計画として発表しています。", source: SMARTHR_IMPRESS },
      { name: "Perplexity", audience: "法改正や通達を調べたい人", what: "出典リンク付きで公的情報をリアルタイムに検索できます。厚生労働省の報道発表や通達の原文にたどり着く入口として使えます。", price: "無料〜約3,000円/月(Pro、2026-06)", source: AIPICKS_LABOR },
    ],
    workflow: [
      { step: "状況を数字で書き出す", detail: "始業・終業時刻、休憩、休日、基本給と手当の内訳を表にします。残業代や有給休暇の質問は、数字がそろっていないと答えがぶれます。" },
      { step: "法令・通達を調べる", detail: "出典付き検索(Perplexityなど)で厚生労働省の資料や通達の原文を探し、いつ時点のルールかを確認します。" },
      { step: "自社の規程と照らす", detail: "人事担当者は就業規則チェック機能などで、自社の規程が最新の法改正に合っているかを確認し、差し替え案を作ります。" },
      { step: "計算は自分で検算する", detail: "割増賃金や有給休暇の日数は、AIの答えをそのまま使わず、給与計算ソフトや表計算で検算します。" },
      { step: "トラブルは専門家・窓口へ", detail: "解雇、未払い賃金、ハラスメントなど争いになりそうな件は、社労士や弁護士、労働基準監督署・総合労働相談コーナーに相談します。AIとのやり取りは事実関係のメモとして使えます。" },
    ],
    combos: [
      { pair: "出典付き検索 + 就業規則チェック", why: "法改正の中身は公的資料で確かめ、自社規程への反映は専用ツールで行うと、根拠と作業が分かれて確認しやすくなります。" },
      { pair: "業務型労務AI + 社労士のレビュー", why: "AIがエラーや漏れを先に拾い、社労士は判断が必要な箇所に時間を使えます。AI社労夢も最終承認は人が行う設計です。" },
      { pair: "汎用AI + 社内向け説明資料", why: "改定した就業規則のポイントを、汎用AIで従業員向けのやさしい説明文やFAQにまとめると周知がスムーズです。" },
    ],
    cautions: [
      "AIの回答は法的判断ではありません。解雇や賃金未払いなど権利に関わる判断は、社会保険労務士・弁護士や労働基準監督署に確認してください。",
      "雇用契約書や給与明細には個人情報が含まれます。個人情報保護法の観点から、外部のAIに入れる前に氏名・住所・口座番号などを伏せ、サービスのデータ保管・学習の条件を確認しましょう。",
      "労働法令は改正が多い分野です。回答がいつ時点の法令に基づくか、必ず確認してください。",
      "SmartHRの各機能やAI社労夢のリリース時期は発表時点の計画です。利用前に提供状況を確認してください。",
    ],
    keywords: ["労務 AI", "就業規則 AI チェック", "社労士 AI ツール", "HRbase", "AI社労夢", "SmartHR AI"],
  },
  {
    slug: "tax-accounting",
    category: "専門業務",
    title: "確定申告・税務・会計に使うAI(2026年10月)",
    description: "freeeのAIチャットとAI-OCR、マネーフォワードのAI確定申告(β)、国税庁のチャットボット「ふたば」、マイナポータル連携まで、確定申告と記帳に使えるAIを整理し、書類集めから申告前の確認まで使う順番と注意点をまとめました。",
    checked: "2026-10-20",
    intro: "日本の税務AIは、個人事業主の確定申告と日々の記帳を助けるものが中心です。国税庁もチャットボットやマイナポータル連携で入力の手間を減らしています。ただし申告内容の責任は納税者にあり、判断に迷う部分は税理士の確認が欠かせません。",
    tools: [
      { name: "freee会計 確定申告機能", maker: "freee", audience: "フリーランス・個人事業主", what: "実際のアプリ画面に沿って操作を案内し専門用語をかみ砕く「寄り添い型AIチャット」(iOS 16以降)、書類を読み取り種類を判別して入力する「確定申告AI-OCR」、レシートの金額・日付・内容をプレビューする「AIレシート要約」(iOS 26以降)があります。記帳を代行する「入力おまかせプラン」も用意されています。", price: "入力おまかせプラン 月4,150円 (2026-02)", source: FREEE_IMPRESS },
      { name: "マネーフォワード AI確定申告(β)", maker: "マネーフォワード", audience: "事業収入があり不動産収入のない人、免税事業者", what: "AIが領収書を読み取り、取引明細を自動で作ります。簿記の知識は不要です。明細はマネーフォワード クラウド確定申告に連携して申告書を作るか、PDFで出力して国税庁の作成コーナーで使えます。不動産所得・農業所得・消費税の計算には対応していません。", price: "公開中の機能は無料。申告書への連携はクラウド確定申告の有料プランが必要 (2026-02)", source: MF_AI_TAX },
      { name: "税務相談チャットボット「ふたば」", maker: "国税庁", audience: "納税者全般", what: "確定申告や年末調整の疑問に答える公式チャットボットです。令和7年分の申告では、所得税は2026年1月5日、消費税は2月2日から相談に対応する予定と案内されていました。", price: "無料", source: NTA_FUTABA },
      { name: "マイナポータル連携(確定申告書等作成コーナー)", maker: "国税庁", audience: "e-Taxで申告する人", what: "控除証明書などのデータを申告書に自動で取り込みます。令和7年分からは代理人が家族分のデータをまとめて取得でき、2026年1月から生命保険の一時金・年金、損害保険の満期返戻金など(対応する保険会社のみ)、ふるさと納税以外の一部の寄附金も対象になりました。iPhoneのマイナンバーカードでの申告にも対応しています。", price: "無料", source: ETAX_IMPRESS },
    ],
    workflow: [
      { step: "書類を一か所に集める", detail: "領収書、請求書、通帳の明細、控除証明書、前年の申告書をスマホで撮影するかPDFにして一つのフォルダにまとめます。" },
      { step: "AIで明細を作る", detail: "AI-OCRや領収書読み取り(freee・マネーフォワード)で取引明細を作り、勘定科目と金額を目で確認します。私的な支出が混ざっていないかもここで見ます。" },
      { step: "わからない点を公式に聞く", detail: "控除の条件や用語は国税庁のチャットボット「ふたば」で確認します。答えに出てきたタックスアンサーのページも開いて読みます。" },
      { step: "控除データを自動で取り込む", detail: "マイナポータル連携で控除証明書のデータを取り込み、手入力のミスを減らします。" },
      { step: "申告前に人の目で確認", detail: "所得の種類が複数ある、金額が大きい、初めての申告といった場合は、提出前に税理士に確認してもらいます。" },
    ],
    combos: [
      { pair: "会計ソフトのAI + 国税庁チャットボット", why: "入力はソフトのAIで速くし、ルールの確認は公式のチャットボットで行うと、速さと正確さを両立できます。" },
      { pair: "AI確定申告(β) + 確定申告書等作成コーナー", why: "マネーフォワードの明細をPDFで出力すれば、有料プランなしでも国税庁の作成コーナーで申告書を作れます。" },
      { pair: "汎用AIの要約 + 税理士相談", why: "取引の事情を汎用AIで時系列に整理してから相談すると、税理士とのやり取りが短く済みます。" },
    ],
    cautions: [
      "税制は毎年変わります。AIの回答が何年分(令和何年分)の申告に基づくのか、必ず確認してください。",
      "申告と納付の責任は納税者にあります。判断が必要な処理や大きな金額は、税理士の確認を受けましょう。",
      "マイナンバーや口座番号を含む書類を汎用AIに入れないでください。個人情報保護委員会も2023年6月に生成AIサービス利用時の注意喚起を出しています。",
      "β版のサービスは機能や対象者が変わることがあります。対象外の所得がないか、利用前に確認してください。",
    ],
    keywords: ["確定申告 AI", "freee AI", "マネーフォワード AI確定申告", "国税庁 チャットボット ふたば", "マイナポータル連携 確定申告", "仕訳 AI"],
  },
  {
    slug: "presentation",
    category: "資料・プレゼン",
    title: "プレゼン資料(スライド)を作るAIの組み合わせ(2026年10月)",
    description: "Gamma・イルシル・Genspark・Copilot・Gemini・Canvaの違いを、日本語対応やPowerPoint形式での書き出し、料金で比較。構成づくりからPPTXでの仕上げまでの流れと、目的別の組み合わせ方を紹介します。",
    checked: "2026-10-20",
    intro: "スライド作成AIは「素早く骨組みを作る」「日本のビジネス資料らしく整える」「調べものから一気に作る」で得意分野が分かれます。構成は汎用AI、スライド化は専用ツール、仕上げはPowerPointやGoogleスライドと分けると、修正が楽になります。",
    tools: [
      { name: "Gamma", audience: "とにかく早くたたき台がほしい人", what: "テキストやURLからプレゼン、文書、Webページを生成します。3.0でエージェント機能とAPIが加わりました。PPTXとPDFで書き出せます。", price: "$10〜(年払い)、無料プランは400クレジット (2026-08)", source: SLIDES_COMPARE },
      { name: "イルシル", audience: "日本の社内資料・提案書を作る人", what: "日本語に特化し、3,000種類以上のビジネス向けテンプレートがあります。PPTX・PDFの書き出しは有料プランのみです。", price: "個人プラン月1,848円(税込)、無料は3資料まで透かし入り (2026-08)", source: SLIDES_COMPARE },
      { name: "Genspark(AIスライド)", audience: "調べものから資料を作りたい人", what: "スライドを作る前にアウトラインを提示し、確認してから生成します。PPTX・PDF・Googleスライドに書き出せます。", price: "$19.99〜(年払い)、無料は1日200ポイント (2026-08)", source: SLIDES_COMPARE },
      { name: "Copilot in PowerPoint", maker: "Microsoft", audience: "社内テンプレートを使う会社員", what: "Wordファイルからスライドを作り、組織のテンプレートを使えます。最初からPPTXなので、そのまま社内で回せます。", price: "Microsoft 365 Personal 2,130円〜(年払い)、Microsoft 365 Copilot 4,497円(年契約) (2026-08)", source: SLIDES_COMPARE },
      { name: "Googleスライド + Gemini", maker: "Google", audience: "Google Workspaceを使うチーム", what: "テキストからスライドを作り、ドライブやGmailのファイルを参照できます。PPTX・PDF・ODPで書き出せます。無料のGoogleアカウントではAI機能は使えません。", price: "Google AI Pro 2,900円〜 (2026-08)", source: SLIDES_COMPARE },
      { name: "Canva(マジックデザイン)", maker: "Canva", audience: "デザインの見栄えを重視する人", what: "豊富なテンプレートとAIのデザイン・文章作成機能があり、PPTX・PDFで書き出せます。", price: "Pro 約1,500円〜(年払い) (2026-08)", source: SLIDES_COMPARE },
    ],
    workflow: [
      { step: "結論と聞き手を決める", detail: "汎用AIに「誰に、何を決めてもらう発表か」を一文で決めさせます。この一文がスライドの順番を決めます。" },
      { step: "10枚分の構成を作る", detail: "各スライドのタイトル(言い切りの一文)と根拠を1〜2個だけ出してもらいます。数字には出典も書かせます。" },
      { step: "スライドを生成する", detail: "構成をGamma・Genspark・イルシルに貼り付けてたたき台を作ります。日本語の社内資料らしさが必要ならイルシル、デザイン重視ならCanvaで整えます。" },
      { step: "数字とグラフを確認する", detail: "AIが作ったグラフの数字は元データと照合し、出典のない数字は消すか出典を付けます。" },
      { step: "PPTXで仕上げる", detail: "PowerPointやGoogleスライドに書き出し、社内テンプレートとフォントに合わせます。発表者ノートは汎用AIで下書きします。" },
    ],
    combos: [
      { pair: "汎用AIで構成 + Gammaでたたき台", why: "構成は対話で詰め、見た目は専用ツールが一度に作るので、手戻りが減ります。" },
      { pair: "Gensparkで調査 + Canvaでデザイン", why: "調べものが付いたたたき台を、デザインツールに移してブランドに合わせます。" },
      { pair: "イルシル + Copilot in PowerPoint", why: "日本語の見出しや図解はイルシルで作り、社内テンプレートへの流し込みはPowerPoint側で行うと、提出用の形式に合わせやすくなります。" },
    ],
    cautions: [
      "社外秘の資料をアップロードする前に、サービスのデータ学習の設定を確認してください。",
      "AIが生成した画像やアイコンの商用利用条件はサービスごとに違います。社外で発表する前に規約を確認しましょう。",
      "PPTX書き出しが有料プラン限定のツールもあります。料金ページで書き出し条件を確認してから選んでください。",
    ],
    keywords: ["プレゼン資料 AI 作成", "スライド 自動生成 AI", "Gamma 使い方", "イルシル 料金", "PowerPoint Copilot", "Genspark スライド"],
  },
  {
    slug: "poster",
    category: "デザイン・印刷物",
    title: "イベント・店舗ポスターを作るAI(2026年10月)",
    description: "ChatGPT Images 2.0やNano Banana Proで日本語の文字入りビジュアルを作り、Canva・Adobe Expressで整え、ネット印刷で刷るまで。ポスター作りのAIの組み合わせと、日本ならではの注意点をまとめました。",
    checked: "2026-10-20",
    intro: "2026年に入り、画像生成AIが日本語の文字をかなり正確に描けるようになりました。それでも、日時や住所のような間違えられない情報は、生成画像に任せずデザインツールで文字として入れるのが安全です。ビジュアルはAI、文字組みはデザインツール、印刷はネット印刷と分けると失敗が減ります。",
    tools: [
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "日本語の見出し入りビジュアルを作りたい人", what: "2026年4月(日本時間22日)公開。日本語・中国語・韓国語などの文字を画像内に正確に描け、ポスターやインフォグラフィックのような文字の多い画像に向きます。最大2K、横3:1から縦1:3までの比率に対応し、生成画像にはAI生成を示すC2PAの情報が付きます。", price: "無料プランでも利用可(制限あり)。思考モードはPlus・Pro・Businessで利用可 (2026-04)", source: GPT_IMAGES2_SBBIT },
      { name: "Nano Banana Pro", maker: "Google", audience: "Geminiを使っている人", what: "Geminiアプリから選べる画像生成モデルで、図解や文字入れの精度が上位モデルとして高められています。有料プランでは最大4Kで出力できます。", source: NANO_BANANA },
      { name: "Canva", maker: "Canva", audience: "テンプレートから手早く作りたい人", what: "AIで画像やデザインを生成し、そのまま印刷注文まで進めます。2026年4月発表の「Canva AI 2.0」では、ブランドのフォント・色を自動で当てる機能などが加わりました(リサーチプレビュー)。", source: CANVA_AI2 },
      { name: "Adobe Express / Firefly", maker: "Adobe", audience: "商用利用の安心感を重視する人", what: "Adobeは自社のFireflyモデルを商用利用に安全と位置づけています。Firefly Image Model 5や自然文で画像を直す「Prompt to Edit」が発表されています。ExpressのAIアシスタント(ベータ)は2025年10月時点で英語のみの対応です。", source: ADOBE_MAX },
      { name: "印刷の通販 グラフィック", maker: "グラフィックネットプリント", audience: "部数をまとめて刷りたい人", what: "チラシや冊子をネットで注文できる印刷通販です。2026年5〜6月のキャンペーンではA4・B5のチラシや冊子が値引きされていました。", price: "例: A4チラシ コート90kg 両面カラー 7日納期 1,000部 通常4,880円(税込) (2026-05)", source: GRAPHIC_PRINT },
    ],
    workflow: [
      { step: "伝える情報を決める", detail: "イベント名、日時、場所、料金、問い合わせ先、主催者を箇条書きにします。ポスターは遠くから3秒で読めるかが勝負なので、一番大きく見せる言葉を一つ決めます。" },
      { step: "サイズを決める", detail: "日本ではA系(A4・A3・A2)とB系(B3・B2)が一般的です。掲示場所のサイズを確認し、生成時の縦横比をそれに合わせます。" },
      { step: "ビジュアルを生成する", detail: "ChatGPT Images 2.0やNano Banana Proで、雰囲気・色・余白の位置を指定して背景やメインビジュアルを作ります。見出しの文字を入れさせる場合も、誤字がないか一文字ずつ確認します。" },
      { step: "文字はデザインツールで入れる", detail: "日時・住所・料金はCanvaやAdobe Expressのテキストとして配置します。後から修正でき、印刷でもにじみません。" },
      { step: "入稿して印刷する", detail: "印刷用のPDF(塗り足し付き)で書き出し、Canvaの印刷サービスやネット印刷に入稿します。少部数で一度色を確認すると安心です。" },
    ],
    combos: [
      { pair: "ChatGPT Images 2.0 + Canva", why: "日本語の見出しまで含めたビジュアルをAIで作り、細かい情報や修正はCanvaのテキストで行うと、仕上がりと修正のしやすさを両立できます。" },
      { pair: "Nano Banana Pro + Adobe Express", why: "Geminiで作った素材をExpressでレイアウトし、Fireflyで背景を広げたりサイズを変えたりできます。" },
      { pair: "Canva + ネット印刷", why: "Canvaは印刷注文まで一続きで、部数が多いときは印刷通販と価格を比べて選べます。" },
    ],
    cautions: [
      "既存のキャラクターや作品に似たビジュアルは著作権侵害になるおそれがあります。文化庁「AIと著作権に関する考え方について」(2024年3月)を参考にし、似ていないか確認しましょう。",
      "画像内のAI生成文字は、もっともらしい誤字や実在しない漢字が混ざることがあります。日時・住所・電話番号は必ずテキストで入れ直してください。",
      "セールや割引をうたうポスターは、景品表示法の有利誤認に注意が必要です。実際より安く見える表示は避けましょう。",
    ],
    keywords: ["ポスター 作成 AI", "イベント ポスター AI", "画像生成AI 日本語 文字", "ChatGPT Images 2.0 使い方", "Canva ポスター 印刷", "B2 ポスター 作り方"],
  },
  {
    slug: "pamphlet",
    category: "デザイン・印刷物",
    title: "パンフレット・チラシ・メニュー表を作るAI(2026年10月)",
    description: "チラシ、三つ折りパンフレット、飲食店のメニュー表をAIで作る流れを紹介。文章づくり、画像生成、Canva・Adobe Expressでのレイアウト、A4・B5での印刷注文までの組み合わせと、景品表示法など表示の注意点をまとめました。",
    checked: "2026-10-20",
    intro: "チラシやパンフレットは、文章の量が多く、写真と文字の配置で読みやすさが決まります。文章は汎用AI、写真やイラストは画像生成AI、レイアウトと印刷はCanvaやネット印刷と分担すると、一人でも短時間で仕上がります。",
    tools: [
      { name: "Canva(チラシ印刷)", maker: "Canva", audience: "デザインから印刷まで一か所で済ませたい人", what: "AIで画像やチラシのデザイン、文章(マジック作文)を作り、そのまま印刷を注文できます。A4・A5・B5・B4などのサイズ、紙質と仕上げを選べ、全国送料無料です。", price: "25枚1,475円〜 (2026-10確認)", source: CANVA_PRINT },
      { name: "Canva AI 2.0", maker: "Canva", audience: "シリーズで販促物を作る店舗・会社", what: "ブランドのフォント・色・スタイルを自動で当て、既存デザインもまとめて更新できます。スプレッドシートのデータからデザインを作る「Canva Sheets AI」もあり、メニューや価格表の更新に向きます(リサーチプレビュー)。", source: CANVA_AI2 },
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "挿絵やイメージ写真がほしい人", what: "日本語の文字を含む画像を高い精度で描け、縦書きへの変換も指示できます。1つのプロンプトから8〜10枚のテイストのそろった画像を作れます。", source: GPT_IMAGES2_SBBIT },
      { name: "Adobe Express / Firefly", maker: "Adobe", audience: "商用利用の安心感を重視する人", what: "Fireflyの画像編集で不要物の削除、背景の拡張、アップスケールができます(2026年3月の発表)。テンプレートを使ったチラシ作成と組み合わせられます。", source: ADOBE_NEWS },
      { name: "印刷の通販 グラフィック", maker: "グラフィックネットプリント", audience: "チラシ・冊子をまとまった部数で刷りたい人", what: "A4・B5のチラシ、中綴じ・無線綴じの冊子をネットで注文できます。500〜10,000部の注文に対応したキャンペーンも実施していました。", price: "例: A4チラシ 1,000部 通常4,880円(税込) (2026-05)", source: GRAPHIC_PRINT },
    ],
    workflow: [
      { step: "折り方とサイズを決める", detail: "1枚もののチラシはA4やB5、パンフレットはA4三つ折りなど、配る場所と手渡しか設置かで決めます。面ごとに載せる内容を先に割り振ります。" },
      { step: "文章を下書きする", detail: "汎用AIに、読み手、伝えたい特徴、行動してほしいこと(来店・申込)を渡して、見出しと本文を面ごとに作らせます。メニューは料理名、価格、アレルゲン表示を表にしておきます。" },
      { step: "写真・イラストを用意する", detail: "実物の写真が使えるものは実物を使い、雰囲気のイメージや挿絵だけを画像生成AIで作ります。" },
      { step: "レイアウトする", detail: "Canvaのテンプレートに流し込み、文字はテキストとして配置します。メニューや価格表はスプレッドシートから作ると更新が楽です。" },
      { step: "校正して入稿する", detail: "価格・日付・電話番号を声に出して読み合わせ、塗り足し付きのPDFで入稿します。" },
    ],
    combos: [
      { pair: "汎用AIの文章 + Canvaのテンプレート", why: "文章の量が多い印刷物は、先に文章を固めてからテンプレートに流すと、レイアウトの手直しが減ります。" },
      { pair: "スプレッドシート + Canva Sheets AI", why: "メニューや価格表は表のデータから作ると、値上げや季節メニューの差し替えが一度で済みます。" },
      { pair: "Canva印刷 + ネット印刷の相見積もり", why: "少部数や急ぎはCanva、数千部単位は印刷通販のキャンペーンと比べると費用を抑えられます。" },
    ],
    cautions: [
      "料理や商品の写真をAIで実物より良く見せると、景品表示法の優良誤認にあたるおそれがあります。メニューの料理写真は実物を使うのが基本です。",
      "健康食品や化粧品の効能をうたう文言は、薬機法の表現ルールにも注意が必要です。AIが出した宣伝文句をそのまま使わないでください。",
      "AI生成画像が既存の作品やキャラクターに似ていないか確認しましょう。文化庁の「AIと著作権に関する考え方について」(2024年3月)が参考になります。",
      "印刷料金はキャンペーンや紙質で大きく変わります。表示価格は記事掲載時点の例です。",
    ],
    keywords: ["チラシ 作成 AI", "パンフレット 作成 AI", "メニュー表 作成 AI", "Canva チラシ 印刷", "三つ折りパンフレット 作り方", "チラシ 印刷 安い"],
  },
  {
    slug: "ad-image",
    category: "マーケティング・広告",
    title: "広告画像・商品写真・バナーを作るAI(2026年10月)",
    description: "ChatGPT Images 2.0、Nano Banana Pro、Adobe Firefly、Canva AI 2.0、ECの商品画像向けAIまで、広告クリエイティブ制作のAIを比較。物撮りの代わり方、サイズ展開、ステマ規制と景品表示法の注意点をまとめました。",
    checked: "2026-10-20",
    intro: "広告画像のAIは、ゼロから絵を作るものより「実物の商品写真を生かして背景やシーンを変える」使い方が実務の中心です。商品そのものの見た目を変えると表示のトラブルにつながるので、背景・小物・サイズ展開をAIに任せるのが基本です。",
    tools: [
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "日本語コピー入りのバナー案を量産したい人", what: "日本語の文字を画像内に正確に描け、追加の指示で画風や写実度を変えられます。APIでは「gpt-image-2」として使え、縦横の解像度を選べます。", price: "API 1024×1024 1枚 約$0.006(Low)〜$0.211(High) (2026-04)", source: GPT_IMAGES2 },
      { name: "Nano Banana Pro", maker: "Google", audience: "Geminiで画像を作り直したい人", what: "文字入れや図解の精度が高い上位モデルで、有料プランでは最大4Kで出力できます。2026年4月21日からはGoogle AI Pro・Ultra会員がAI Studioでも使えます。", price: "生成上限の目安 1日 Plus 50枚、Pro 100枚、Ultra 1,000枚 (2026-09)", source: NANO_BANANA },
      { name: "Adobe Firefly", maker: "Adobe", audience: "商用利用の安全性を重視する広告主・制作会社", what: "自社のFireflyモデルを商用利用に安全と位置づけ、Firefly Image Model 5を発表しています。2026年3月には好みのスタイルを学ばせるカスタムモデルや、不要物の削除・背景拡張・アップスケールの編集機能が加わりました。", source: ADOBE_NEWS },
      { name: "Canva AI 2.0", maker: "Canva", audience: "SNS広告を継続的に出す店舗・中小企業", what: "ブランドのフォント・色を自動で当て、既存デザインを数秒でまとめて更新できます。定期的なSNS投稿をオフライン中に作る「スケジュールタスク」もあります(リサーチプレビュー)。", source: CANVA_AI2 },
      { name: "AIMSTAR 画像生成", maker: "GROWTH VERSE", audience: "BtoCの大手・中堅企業", what: "モデルの着せ替え、人物や商品の背景生成(白背景からシーンへ)、商品に小物を足す、不要な文字や物を消すといったEC向けの画像生成ができます。", source: AIMSTAR },
    ],
    workflow: [
      { step: "掲載先とサイズを決める", detail: "Instagramのフィード(正方形・縦長)、ストーリーズやリール(9:16)、LINE広告、楽天・Amazonの商品画像など、掲載先ごとに必要な比率を一覧にします。" },
      { step: "実物の商品写真を撮る", detail: "スマホでもよいので、白背景で商品を正面・斜め・ディテールの3カットほど撮ります。商品の色や形はこの写真が基準になります。" },
      { step: "背景とシーンを生成する", detail: "Firefly・Nano Banana Pro・ChatGPT Imagesで、商品写真をもとに使用シーンや季節の背景を作ります。商品自体の色や形は変えないよう指示します。" },
      { step: "コピーを入れてサイズ展開", detail: "Canvaなどで見出しと価格を入れ、掲載先ごとのサイズに展開します。ABテスト用に背景違いを2〜3案作ります。" },
      { step: "表示ルールを確認して出稿", detail: "価格表示や「No.1」などの表現の根拠、インフルエンサーに依頼する場合の「広告」「PR」表記を確認してから出稿します。" },
    ],
    combos: [
      { pair: "実物写真 + Fireflyの背景生成", why: "商品は本物のまま背景だけを変えるので、見た目のずれによる表示トラブルを避けつつ撮影コストを下げられます。" },
      { pair: "ChatGPT Images 2.0 + Canva", why: "日本語コピー入りのラフ案をAIで量産し、採用案だけをCanvaで正確な文字に組み直します。" },
      { pair: "Nano Banana Pro + Canva AI 2.0", why: "Geminiで作ったシーン画像を、Canvaのブランド設定で色とフォントをそろえたシリーズ広告にできます。" },
    ],
    cautions: [
      "2023年10月1日から景品表示法のステルスマーケティング規制が始まりました。インフルエンサー投稿などでも広告であることがわからない表示は事業者の責任になり得るため、「広告」「PR」と明確に表示しましょう。",
      "AIで商品の色や形を実物と違うように補正すると、景品表示法の優良誤認にあたるおそれがあります。",
      "化粧品・健康食品などの広告は薬機法の表現ルールにも注意してください。AIのコピー案には根拠のない効能表現が混ざることがあります。",
      "実在の人物や有名キャラクターに似た画像は、肖像権や著作権のトラブルになります。生成後に必ず確認しましょう。",
    ],
    keywords: ["広告画像 AI", "商品写真 AI 背景", "バナー 作成 AI", "物撮り AI", "Adobe Firefly 商用利用", "ステマ規制 広告 表記"],
  },
  {
    slug: "ad-video",
    category: "マーケティング・広告",
    title: "広告動画・ショート動画を作るAI(2026年10月)",
    description: "Veo 3.1とGoogle Flow、Kling 3.0、Runway Gen-4.5、Hailuo、Adobe Fireflyの動画機能を、音声・日本語対応・料金で比較。商品動画やSNS広告の作り方の流れと、日本での表示ルールの注意点をまとめました。",
    checked: "2026-10-20",
    intro: "動画生成AIは2026年に音声付きの生成や縦型動画への対応が進み、数秒のSNS広告なら一人でも作れるようになりました。一方で1本あたりの長さは数秒から10秒程度が中心なので、短いカットをいくつも作って編集でつなぐのが現実的な作り方です。",
    tools: [
      { name: "Veo 3.1 / Google Flow", maker: "Google", audience: "音声付きの短尺動画を作りたい人", what: "Veo 3.1は映像と音声を同時に生成し、セリフのリップシンクもできます。Flowは動画制作用のツールで、参照画像から動画を作る「Ingredients to Video」、場面を伸ばす「Extend」、カメラ操作、1080pへのアップスケールなどがあり、日本でも利用できます。", price: "Google AI Pro 月2,900円でFlowクレジット1,000、Google AI Plus 月1,200円で200 (2026-05)", source: FLOW_WEEL },
      { name: "Veo 3.1(縦型・Gemini)", maker: "Google", audience: "リールやショート向けの縦型広告", what: "Ingredients to Videoで9:16の縦型出力に対応しました。Geminiアプリでは、Google AI ProならVeo 3.1 Fastを1日3本まで使えます。日本語のプロンプトも受け付けます。", source: VEO_AISMILEY },
      { name: "Kling 3.0", maker: "Kuaishou(Kling AI)", audience: "低コストで試作を重ねたい人", what: "最大4K、カメラパスやキャラクター動作の指定に対応します。日本語の画面は一部対応で、英語プロンプトがすすめられています。Adobe FireflyからもKlingでマルチショット動画を作れるようになりました(2026年4月)。", price: "無料枠あり(1日数本)、有料は月額約1,000円〜 (2026-06)", source: VIDEO_LABMEMO },
      { name: "Runway Gen-4.5", maker: "Runway", audience: "カメラワークにこだわる制作者", what: "最大4Kで、Motion Brush、Camera Control、Keyframesなど細かい演出機能があります。音声生成はベータ段階です。", price: "Free 125クレジット、Standard 月$15 (2026-06)", source: VIDEO_LABMEMO },
      { name: "Hailuo 2.3", maker: "MiniMax", audience: "人物が登場する広告", what: "テキストや画像から動画を作り、キャラクターの一貫性を保つSubject Referenceに対応します。実写系の日本人キャラクターの表現に優れると評価されています。音声は付きません。", price: "無料プランあり (2026-06)", source: VIDEO_LABMEMO },
      { name: "Adobe Firefly(動画)", maker: "Adobe", audience: "Premiereなどで仕上げる制作チーム", what: "Firefly上でKling AIを使ったマルチショット動画の作成ができ、Premiere(ベータ)のカラーモードやFrame.io Driveと組み合わせて仕上げられます。", source: ADOBE_NEWS },
    ],
    workflow: [
      { step: "尺と掲載先を決める", detail: "6秒・15秒・30秒のどれか、縦型(9:16)か横型(16:9)かを掲載先(Instagramリール、TikTok、YouTubeショート、LINE広告など)から決めます。" },
      { step: "絵コンテを作る", detail: "汎用AIに商品の特徴と見せたい場面を伝え、3〜5カットの絵コンテ(カメラの動き、時間、テロップ)を作らせます。" },
      { step: "キービジュアルを先に作る", detail: "実物の商品写真や画像生成AIで各カットの1枚目を作り、それを参照画像にして動画化すると、商品の見た目がぶれにくくなります。" },
      { step: "カットごとに動画を生成する", detail: "Veo 3.1・Kling・Runwayで数秒ずつ生成し、良いものだけ残します。音声が必要ならVeo 3.1、カメラワーク重視ならRunwayと使い分けます。" },
      { step: "編集して表示を確認する", detail: "動画編集ソフトでつなぎ、日本語テロップは編集側で入れます。価格や効果の表現、「広告」「PR」表記を確認してから出稿します。" },
    ],
    combos: [
      { pair: "画像生成AI + Veo 3.1", why: "先に静止画で商品の見た目を固め、その画像から動画を作ると、カット間で商品がぶれません。" },
      { pair: "Kling + Runway", why: "Klingで安く試作して方向性を決め、本番のこだわりカットだけRunwayで細かく演出すると、費用と品質のバランスが取れます。" },
      { pair: "AI動画 + 編集ソフトの日本語テロップ", why: "動画内のAI生成文字は崩れることがあるので、テロップは編集ソフトで入れると修正もしやすくなります。" },
    ],
    cautions: [
      "景品表示法のステマ規制(2023年10月1日施行)により、インフルエンサーに依頼した動画などで広告であることがわからない表示は問題になり得ます。「広告」「PR」を明確に表示しましょう。",
      "AIで商品の性能や見た目を実物以上に見せると、景品表示法の優良誤認にあたるおそれがあります。",
      "実在の有名人や政治家に似せた動画は、各サービスの禁止事項にもあたります。人物を登場させる場合は特に注意してください。",
      "料金やクレジットの消費量は頻繁に変わり、記事によって数字が食い違うこともあります。契約前に公式の料金ページで確認しましょう。",
    ],
    keywords: ["動画生成AI 比較", "広告動画 AI", "Veo 3.1 使い方", "Google Flow 料金", "Kling 料金", "ショート動画 AI 作り方"],
  },
];
