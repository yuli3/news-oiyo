// AI use-case guides in Simplified Chinese for mainland China, checked 2026-10-20 (sources: Chinese media, official sites, tool directories).
import type { Guide, KeywordCategory } from "../ai-use-cases";

export const keywordMap: KeywordCategory[] = [
  {
    category: "专业工作",
    cases: [
      { name: "法律咨询与合同审查", slug: "legal", keywords: ["法律AI", "AI合同审查", "类案检索AI", "通义法睿", "法行宝", "律师AI工具"] },
      { name: "劳动用工与人事合规", slug: "labor", keywords: ["劳动法AI咨询", "社保政策查询AI", "加班费计算", "劳动仲裁怎么申请", "HR智能体"] },
      { name: "财税与记账", slug: "tax-accounting", keywords: ["财税AI", "个税汇算", "AI记账", "代账AI", "电子税务局"] },
      { name: "政务办事与材料", keywords: ["办事材料AI", "公文写作AI", "申请书模板AI", "政务服务网"] },
      { name: "专利与商标", keywords: ["专利检索AI", "商标查询AI", "专利交底书AI"] },
      { name: "租房与买房合同", keywords: ["租房合同AI审查", "购房合同注意事项", "AI看合同"] },
      { name: "财报与公告解读", keywords: ["财报分析AI", "上市公司公告解读", "研报总结AI"] },
    ],
  },
  {
    category: "文档与演示",
    cases: [
      { name: "PPT演示文稿", slug: "presentation", keywords: ["AI做PPT", "AI生成PPT免费", "Kimi PPT", "WPS AI PPT", "讯飞智文"] },
      { name: "商业计划书与方案", slug: "business-plan", keywords: ["AI写报告", "工作总结AI", "商业计划书AI", "项目申报书AI"] },
      { name: "会议纪要与录音整理", slug: "meeting-notes", keywords: ["会议纪要AI", "录音转文字", "通义听悟", "飞书妙记"] },
      { name: "Excel与数据整理", slug: "spreadsheet", keywords: ["Excel AI", "AI写公式", "WPS表格AI"] },
      { name: "翻译与本地化", slug: "translation", keywords: ["AI翻译文档", "PDF翻译", "出海本地化AI"] },
      { name: "论文与文献", slug: "research", keywords: ["论文AI", "文献综述AI", "AI查资料"] },
    ],
  },
  {
    category: "设计与印刷",
    cases: [
      { name: "海报", slug: "poster", keywords: ["AI海报生成", "活动海报AI", "招聘海报AI", "即梦海报", "稿定AI"] },
      { name: "宣传单与折页", slug: "pamphlet", keywords: ["AI宣传单", "三折页设计AI", "宣传册AI", "菜单设计AI", "传单模板"] },
      { name: "Logo与名片", keywords: ["AI生成logo", "名片设计AI", "店铺logo"] },
      { name: "电商详情页", keywords: ["详情页AI", "淘宝详情页生成", "拼多多详情页AI"] },
      { name: "公众号封面与长图", keywords: ["公众号封面AI", "AI长图", "小红书封面AI"] },
    ],
  },
  {
    category: "营销与广告",
    cases: [
      { name: "广告图与商品图", slug: "ad-image", keywords: ["AI商品图", "电商主图AI", "AI白底图", "广告banner AI", "模特试穿AI"] },
      { name: "广告视频与商品视频", slug: "ad-video", keywords: ["AI广告视频", "即梦AI视频", "可灵AI", "商品视频AI", "带货短视频AI"] },
      { name: "广告文案", keywords: ["AI写文案", "广告语生成", "极限词检测"] },
      { name: "小红书笔记", slug: "xiaohongshu", keywords: ["小红书笔记AI", "种草文案AI", "小红书爆款标题"] },
      { name: "抖音与视频号运营", keywords: ["抖音脚本AI", "口播文案AI", "数字人直播"] },
      { name: "配音与配乐", keywords: ["AI配音", "TTS中文", "AI作曲", "广告背景音乐AI"] },
    ],
  },
  {
    category: "运营与开发",
    cases: [
      { name: "客服机器人", slug: "customer-chat", keywords: ["AI客服", "企业微信AI客服", "智能客服搭建"] },
      { name: "编程与建站", slug: "coding-website", keywords: ["AI编程", "通义灵码", "AI建站"] },
      { name: "办公自动化智能体", keywords: ["AI智能体", "扣子Coze", "办公自动化AI"] },
      { name: "招聘与面试", keywords: ["AI写JD", "简历筛选AI", "AI面试"] },
      { name: "教学课件", keywords: ["AI做课件", "AI出题", "教案生成AI"] },
    ],
  },
];

const IFENG_LEGAL = { label: "凤凰网科技 · 2026法律AI工具横向测评 (2026-09-24)", url: "https://tech.ifeng.com/c/8wgE1RB7b1z" };
const AIBOT_LEGAL = { label: "AI工具集 · AI法律助手合集 (更新于2026-01-23)", url: "https://ai-bot.cn/ai-legal-assistant-tools/" };
const AIBOT_FAXINGBAO = { label: "AI工具集 · 法行宝 (更新于2025-10-29)", url: "https://ai-bot.cn/sites/11432.html" };
const CHINACOM_FAXINGBAO = { label: "中华网科技 · 百度法律智能体 (2025-10-29)", url: "https://m.tech.china.com/articles/20251029/202510291755264.html" };
const MOJ_APP = { label: "App Store · 中国法律服务网 (司法部, 2026-10 查看)", url: "https://apps.apple.com/mo/app/id1364280507" };
const C114_JXB = { label: "C114通信网 · 京晓保 (2026-06-17)", url: "https://m.c114.com.cn/w241-1312326.html" };
const NDRC_DONGYING = { label: "国家发展改革委网站 · 东营12333“智声通” (2026-01-20)", url: "https://www.ndrc.gov.cn/fggz/fgfg/dfxx/202601/t20260120_1403317.html" };
const CHINACOM_XINREN = { label: "中华网 · 薪人薪事“薪灵AI” (2026-07-16)", url: "https://mtz.china.com/touzi/2026/0716/249549.html" };
const THEPAPER_IIT = { label: "澎湃新闻 · 2025年度个税汇算安排 (2026-02-24)", url: "https://www.thepaper.cn/newsDetail_forward_32647829" };
const CHINATAX_AI = { label: "国家税务总局 · China taps AI for tax system modernization (2026-08-26)", url: "https://fgk.chinatax.gov.cn/eng/c101269/c5251980/content.html" };
const JIEMIAN_YQY = { label: "界面新闻 · 亿企赢发布财税Agentic2.0 (2026-06-11)", url: "https://m.jiemian.com/article/14572859.html" };
const SFC_SHUIYOU = { label: "21世纪经济报道 · 税友股份半年报 (2026-08-26)", url: "https://www.sfccn.com/2026/8-26/5MMDE0MDdfMjIyMDk5Mg.html" };
const STDAILY_KINGDEE = { label: "科技日报 · 金蝶中期业绩会 (2026-08-12)", url: "https://www.stdaily.com/web/gdxw/2026-08/12/content_562866.html" };
const CSDN_PPT = { label: "CSDN · 2026年AI PPT生成工具实测 (2026-05-09)", url: "https://gitcode.csdn.net/69fe9eb054b52172bc72a285.html" };
const AIBOT_POSTER = { label: "AI工具集 · AI海报设计工具 (2026-10 查看)", url: "https://ai-bot.cn/ai-poster-design-tools/" };
const AIBOT_GAODING = { label: "AI工具集 · 稿定AI (更新于2026-05-21)", url: "https://ai-bot.cn/sites/2029.html" };
const APP_CHUANGKETIE = { label: "App Store · 创客贴设计 (2026-10 查看)", url: "https://apps.apple.com/cn/app/%E5%88%9B%E5%AE%A2%E8%B4%B4%E8%AE%BE%E8%AE%A1-ai%E6%B5%B7%E6%8A%A5%E5%9B%BE%E7%89%87%E8%AE%BE%E8%AE%A1-%E6%8B%BC%E5%9B%BE%E6%8A%A0%E5%9B%BE%E4%BD%9C%E5%9B%BE%E7%A5%9E%E5%99%A8/id1454506905?l=en-GB" };
const LOVART_PRINT = { label: "Lovart 博客 · AI印刷物料完整指南 (更新于2026-05-10)", url: "https://www.lovart.ai/zh/blog/complete-guide-ai-print-materials-flyers-cards" };
const AITOOLLAB_JIMENG = { label: "AI工具实验室 · 即梦AI完全教程 (2026-08-14)", url: "https://www.aitoollab.cn/articles/jimeng-ai-complete-guide-2026/" };
const ITHOME_SEEDANCE = { label: "IT之家 · Seedance 2.5 发布 (2026-07-31)", url: "https://www.ithome.com/0/984/104.htm" };
const BJNEWS_KLING = { label: "新京报 · 可灵AI (2026-05-27)", url: "https://www.bjnews.com.cn/detail/1779878280129425.html" };
const AIBOT_HAILUO = { label: "AI工具集 · 海螺视频 (2026-10 查看)", url: "https://ai-bot.cn/hailuoai-video/" };
const AIBOT_JICHUANG = { label: "AI工具集 · 即创AI (更新于2025-10-28)", url: "https://ai-bot.cn/sites/5560.html" };
const CSDN_ECOM = { label: "CSDN · 2026电商AI商品图工具横向分析 (2026-05-21)", url: "https://gitcode.csdn.net/6a0ea115662f9a54cb760e9b.html" };

export const guides: Guide[] = [
  {
    slug: "legal",
    category: "专业工作",
    title: "法律咨询与合同审查用什么AI(2026年10月)",
    description: "通义法睿、法行宝、MetaLaw、元典、智合AI等国内法律AI分别适合谁,从类案检索、合同审查到文书起草的使用顺序,以及用AI处理法律问题时要守住的边界。",
    checked: "2026-10-20",
    intro: "国内法律AI大致分两类:面向普通人的免费问答助手,和面向律师、法务的检索与审查工具。前者帮你把问题理清,后者帮专业人士提高效率,结论和责任仍然在律师身上。",
    tools: [
      { name: "通义法睿", maker: "阿里云(基于通义千问)", audience: "普通用户、初步了解法律问题", what: "法律问答、文书生成、法规检索、案情分析、类案推荐和合同审查。合同审查可以叠加律师规则和用户自定义规则。", source: IFENG_LEGAL },
      { name: "法行宝", maker: "百度", audience: "普通用户", what: "用大白话描述情况,即时给出法律建议、类案和相关法规,可生成个性化法律意见书,另有法律文书和法律计算器工具。覆盖民事、刑事、行政咨询,有网页版和App。", price: "免费 (AI工具集页面所列)", source: AIBOT_FAXINGBAO },
      { name: "MetaLaw", maker: "检索由秘塔AI提供", audience: "需要找类案的律师、法务", what: "按争议焦点检索类案,自动总结并引用法条,支持案例对比和基础合同审查。", source: IFENG_LEGAL },
      { name: "元典问达 / 元典智库", audience: "律师、公文写作者", what: "问答式法律检索、结构化起诉状生成、判决书解析,以及法规与案例的要素式检索和知识图谱推荐。", source: IFENG_LEGAL },
      { name: "智合AI", maker: "智合", audience: "律所与法律团队", what: "检索、审查、起草和文件处理放在一个流程里,覆盖法规、裁判文书、检察文书、实务观点和企业数据五个库,能处理PDF、扫描件、录音和截图,支持本地部署。", source: IFENG_LEGAL },
      { name: "法智", maker: "同花顺", audience: "企业法务、律师", what: "智能对话、法律检索、合同审查、文件问答、文书生成和企业查询。", source: AIBOT_LEGAL },
      { name: "中国法律服务网", maker: "司法部", audience: "所有人", what: "官方公共法律服务入口,提供案例库、知识库、法律法规库、办事指南和法律服务机构与人员查询,可以用来核对AI给出的法规,并找到正规律师事务所。", price: "免费", source: MOJ_APP },
    ],
    workflow: [
      { step: "把事实写成时间线", detail: "按时间顺序写清谁、何时、做了什么、有哪些证据,再把想问的问题拆成一句一句。可以先让豆包、DeepSeek、Kimi这类通用模型帮你整理,身份证号、住址等个人信息先打码。" },
      { step: "用免费助手摸清方向", detail: "把整理好的问题交给法行宝或通义法睿,看看涉及哪些法律关系、可能适用哪些条文、大致有哪些选择。" },
      { step: "检索类案和法规原文", detail: "律师和法务用MetaLaw、元典、智合AI等专业工具查类案,再到中国法律服务网或官方法规库核对条文是否现行有效。" },
      { step: "合同逐条审查", detail: "上传合同,让工具标出不利条款和缺失条款(通义法睿、法智、智合AI都有合同审查)。修改建议要结合自己的谈判立场,由人来取舍。" },
      { step: "交给律师定稿", detail: "起诉、仲裁、重大合同签署前,带着AI整理的时间线和问题清单去找执业律师,咨询会更快、更省钱。" },
    ],
    combos: [
      { pair: "通用大模型整理 + 法律专用工具检索", why: "通用模型擅长把杂乱的叙述变成清楚的问题,法律工具的案例和法规库更可靠。依据一律以专用工具和官方原文为准。" },
      { pair: "合同审查AI + 文档比对", why: "接受AI修改建议后,用WPS或Word的比较功能对照原稿,确认改了哪里、有没有误删条款。" },
      { pair: "免费问答助手 + 线下律师", why: "先用免费工具弄清问题和材料清单,再付费咨询律师,把时间花在真正需要判断的地方。" },
    ],
    cautions: [
      "AI的回答不是法律意见。涉及诉讼、仲裁、刑事责任或大额合同时,请咨询执业律师。",
      "AI给出的案号、法条可能不存在或已失效,写进文书前一定要打开原文核对。",
      "上传合同和案情前确认平台的数据使用规则。处理他人个人信息要遵守《个人信息保护法》,能脱敏就先脱敏。",
      "ChatGPT等海外产品在中国大陆没有正式提供服务(SCMP 2024-06-25),工作中优先使用国内合规上线的产品。",
    ],
    keywords: ["法律AI", "AI合同审查", "通义法睿", "法行宝", "类案检索AI", "免费法律咨询AI"],
  },
  {
    slug: "labor",
    category: "专业工作",
    title: "劳动用工与人事合规用什么AI(2026年10月)",
    description: "北京人社“京晓保”、12333热线AI、法行宝、薪人薪事“薪灵AI”等工具分别适合劳动者还是用人单位,以及从查社保政策、算加班费到劳动仲裁准备的使用顺序。",
    checked: "2026-10-20",
    intro: "劳动用工类AI有两条线:人社部门的官方智能问答,适合劳动者和小企业查政策;企业用的HR系统智能体,把考勤、薪酬和各地政策放在一起。政策因城市而异,一定要先确认适用地区。",
    tools: [
      { name: "京晓保", maker: "北京市人社局(联通数智提供技术支持)", audience: "在北京工作的劳动者、单位经办人", what: "用文字或语音咨询社保、就业、人才和劳动关系政策,能计算退休年龄、失业保险金等,会追问细节。新政策24小时内更新,7×24小时服务。入口:“北京人社”公众号的政民互动→智能问答、北京人社局官网、“北京民生一卡通”小程序。", price: "免费", source: C114_JXB },
      { name: "12333热线“智声通”", maker: "山东东营市人社部门", audience: "拨打12333的当地群众", what: "DeepSeek与通义千问双模型辅助坐席:通话中实时提示政策要点,1.8秒匹配政策知识,自动生成通话小结。群众照常拨打12333,由坐席借助AI更快答复。这是地方试点,不同城市的12333能力不一样。", source: NDRC_DONGYING },
      { name: "法行宝", maker: "百度", audience: "劳动者、小微企业主", what: "免费法律咨询助手,覆盖民事等领域,带法律计算器和法律文书工具,可以先用来理清争议点和需要准备的证据。", price: "免费 (AI工具集页面所列)", source: AIBOT_FAXINGBAO },
      { name: "薪灵AI", maker: "薪人薪事", audience: "中大型企业HR部门", what: "内置覆盖300多个地级市的社保、工时、加班政策库,薪资计算随最新个税规则更新,员工数据的查看与修改留痕可审计,还能生成工资条、解析简历和管理排班考勤。", source: CHINACOM_XINREN },
    ],
    workflow: [
      { step: "先把数字列清楚", detail: "上下班时间、休息时间、休息日、工资构成、社保缴纳情况列成表。加班费、经济补偿这类问题,缺了数字就答不准。" },
      { step: "查所在城市的政策", detail: "社保、最低工资、工时政策按城市不同。北京可直接问京晓保,其他地区拨打12333或使用当地人社部门的智能问答。" },
      { step: "用法律助手理清争议", detail: "拖欠工资、解除合同、工伤等争议,先用法行宝这类免费助手梳理法律关系、证据清单和时效问题。" },
      { step: "企业侧对照制度与系统", detail: "HR用薪灵AI这类系统把考勤、薪酬和当地政策放在一起核对,员工手册和规章制度修改后再请律师或专业顾问审一遍。" },
      { step: "争议走正式渠道", detail: "协商不成时,向劳动人事争议仲裁委员会申请仲裁或向劳动保障监察部门投诉。AI对话记录可以作为整理事实的草稿,但证据要用原件。" },
    ],
    combos: [
      { pair: "官方智能问答 + 计算器复核", why: "政策口径以人社部门为准,金额用计算器再算一遍,两步互相校验。" },
      { pair: "HR智能体 + 考勤薪酬数据", why: "有真实考勤和工资数据,系统给出的加班、社保结果才对得上实际情况。" },
      { pair: "通用大模型起草 + 专业审核", why: "用DeepSeek、豆包等起草规章制度或通知初稿,再由律师或专业顾问核对是否符合现行法律和地方政策。" },
    ],
    cautions: [
      "AI答复不等于人社部门的正式答复或仲裁结论。涉及解除劳动合同、工伤认定、欠薪等权益问题,请咨询律师或当地人社部门。",
      "劳动合同、工资条里有身份证号、银行卡号等个人信息,上传前先打码。企业处理员工信息要遵守《个人信息保护法》。",
      "各地社保、工时和最低工资政策不同,也常调整。提问时说明城市和年份,并以官方最新文件为准。",
    ],
    keywords: ["劳动法AI咨询", "京晓保", "12333智能问答", "加班费计算", "劳动仲裁准备", "HR智能体"],
  },
  {
    slug: "tax-accounting",
    category: "专业工作",
    title: "个税、记账和财税工作用什么AI(2026年10月)",
    description: "个人所得税App和电子税务局怎么用,税务局智能助手、亿企赢财税Agentic2.0、金蝶灵基等财税AI分别适合个人、小微企业还是大中型企业,附使用顺序与注意事项。",
    checked: "2026-10-20",
    intro: "个人报税以官方渠道为主:个人所得税App和自然人电子税务局,部分地方税务局已上线AI智能助手。企业侧,代账和财务软件厂商把AI做成了能自动处理票据、账务和申报的智能体。",
    tools: [
      { name: "个人所得税App", maker: "国家税务总局", audience: "个人纳税人", what: "年度汇算的主要渠道。2025年度汇算办理时间为2026年3月1日至6月30日,其中3月1日至20日需先在App预约。也可以通过自然人电子税务局网页端、单位代办或税务机关办理。", price: "免费", source: THEPAPER_IIT },
      { name: "税务局AI智能助手", maker: "各地税务局", audience: "个人和企业纳税人", what: "部分地方已上线:深圳南山区税务局在电子税务局提供场景式问答引导;肇庆税务局在个税网页端和手机端上线聊天机器人,7×24小时AI加人工服务,年度汇算、专项附加扣除等复杂问题转人工。全国层面也在扩大个税App的自动预填。", price: "免费", source: CHINATAX_AI },
      { name: "财税Agentic2.0", maker: "亿企赢(税友股份)", audience: "小微企业、代账机构", what: "基于自研财税大模型“犀友”,多个智能体协作处理票据、账务、申报和档案,分基础记账、合规记账、经营记账三档服务。截至2026年6月底亿企赢平台活跃企业用户1264万。", source: JIEMIAN_YQY },
      { name: "金蝶灵基", maker: "金蝶", audience: "大中型企业财务部门", what: "企业智能体平台,包含费用审核、银企对账、采购付款审核、关账等财务智能体,可用自然语言调用多个智能体搭建应用。", source: STDAILY_KINGDEE },
    ],
    workflow: [
      { step: "先把资料收齐", detail: "工资薪金、劳务报酬、专项附加扣除凭证,或企业的发票、银行流水、合同,按月份和类别归档。" },
      { step: "用通用AI弄懂概念", detail: "用DeepSeek、豆包、Kimi、通义千问解释“综合所得”“专项附加扣除”这类概念,只用来理解,不用来定金额。" },
      { step: "在官方渠道核对和申报", detail: "个人在个人所得税App里查看预填数据、补充扣除并计算应退应补;遇到问题可用当地税务局智能助手或12366纳税服务热线。" },
      { step: "企业把重复工作交给智能体", detail: "小微企业和代账机构可用亿企赢一类工具处理票据和记账,大中型企业用金蝶灵基这类平台做费用审核、对账和关账。" },
      { step: "关键结果人工复核", detail: "申报表、税额和账务调整由会计或税务师复核后再提交。" },
    ],
    combos: [
      { pair: "通用大模型解释 + 个税App计算", why: "AI负责讲清楚该查什么,金额以个税App和电子税务局的计算为准。" },
      { pair: "财税智能体 + 会计复核", why: "智能体处理大量票据和分录,会计把关判断性事项,效率和准确性兼顾。" },
      { pair: "HR薪酬系统 + 财税系统", why: "工资、社保和个税代扣代缴相互关联,两边数据一致才能避免申报差错。" },
    ],
    cautions: [
      "税务局不会通过短信或聊天软件通知稽查,不要向任何人提供个税App账号密码或银行卡信息,警惕“帮你多退税”的骗局。",
      "通用AI给出的税率、扣除标准可能过时,问清是哪一年度的规定,并以税务机关公布的为准。",
      "纳税申报的责任在纳税人。金额较大或情况复杂时,请咨询注册税务师或会计师。",
      "企业把财务数据交给云端AI前,确认数据存储与使用条款,涉及员工个人信息时遵守《个人信息保护法》。",
    ],
    keywords: ["个税汇算", "个人所得税App", "财税AI", "AI记账", "代账AI", "电子税务局智能问答"],
  },
  {
    slug: "presentation",
    category: "文档与演示",
    title: "做PPT用什么AI:国内工具组合(2026年10月)",
    description: "WPS AI、Kimi PPT、百度文库AI、讯飞智文、aippt、即触AI PPT和Gamma怎么选,免费额度与价格,以及从大纲到PPTX定稿的完整流程。",
    checked: "2026-10-20",
    intro: "国内AI PPT工具的差别主要在三点:中文排版、长文档解析和模板数量。比较稳的做法是大纲用通用大模型,生成用PPT工具,最后在WPS或PowerPoint里按公司模板定稿。",
    tools: [
      { name: "WPS AI", audience: "已经在用WPS的人", what: "中文排版好,和WPS生态打通,几乎没有学习成本。导出到PowerPoint时部分动画可能丢失。", price: "WPS大会员约95-150元/年,含PPT功能 (2026-05)", source: CSDN_PPT },
      { name: "Kimi PPT", audience: "要把长文档、论文变成PPT的人", what: "长文本解析能力强,版式偏学术风。", price: "免费每月3次 (2026-05)", source: CSDN_PPT },
      { name: "百度文库AI", audience: "需要中文模板的职场用户", what: "中文排版评价高,可导出PPTX,用PowerPoint打开时部分动画可能丢失。", source: CSDN_PPT },
      { name: "讯飞智文", audience: "习惯语音输入的人", what: "支持语音输入,版式偏现代风格。", source: CSDN_PPT },
      { name: "aippt", audience: "要快速出稿的人", what: "模板库大(文章称10万+),约20页15到20秒生成。", price: "年付168元,免费版限5次主题生成 (2026-05)", source: CSDN_PPT },
      { name: "即触AI PPT", audience: "已有完整文稿的人", what: "有“保持原文”模式,不改动你的文字,只做排版;导出的PPTX可编辑。", price: "年付79元,免费版无限生成但带水印 (2026-05)", source: CSDN_PPT },
      { name: "Gamma", audience: "重视视觉设计的人", what: "视觉设计强,但导出PPTX后版式变化较大,更适合用网页链接演示。属于海外服务。", source: CSDN_PPT },
    ],
    workflow: [
      { step: "一句话定目标", detail: "先让通用大模型(DeepSeek、豆包、Kimi等)帮你写清“讲给谁听、希望对方做什么决定”,这句话决定页面顺序。" },
      { step: "出10页左右大纲", detail: "每页一个结论句加一两条依据,数字旁边注明来源。" },
      { step: "选工具生成初稿", detail: "长文档转PPT用Kimi PPT,已有完整文稿用即触AI PPT的保持原文模式,日常办公用WPS AI或百度文库AI。" },
      { step: "核对数字和图表", detail: "AI生成的图表数字逐项对照原始数据,没有出处的数字删掉或补上出处。" },
      { step: "在WPS或PowerPoint定稿", detail: "导出PPTX,换成公司模板和字体,检查动画是否丢失,再让AI帮你写演讲备注。" },
    ],
    combos: [
      { pair: "Kimi长文解析 + WPS定稿", why: "Kimi把报告、论文压缩成结构,WPS负责中文排版和团队常用格式。" },
      { pair: "通用大模型大纲 + 即触保持原文", why: "文字在对话里改到满意,再交给排版工具,避免AI二次改写你的内容。" },
      { pair: "AI PPT + AI作图", why: "封面和配图用即梦等生图工具补充,比通用图库更贴合主题。" },
    ],
    cautions: [
      "公司机密资料上传前,确认平台是否会把内容用于训练,以及数据存放位置。",
      "价格和免费额度来自2026年5月的评测文章,变化很快,付费前以官网为准。",
      "Gamma等海外服务以及ChatGPT在中国大陆没有正式提供服务(SCMP 2024-06-25),工作中优先选国内可直接使用的工具。",
      "对外发布的PPT若含AI生成图片,按《人工智能生成合成内容标识办法》(2025-09-01施行)保留平台加注的标识,不要刻意删除。",
    ],
    keywords: ["AI做PPT", "AI生成PPT免费", "Kimi PPT", "WPS AI PPT", "讯飞智文", "AI PPT哪个好用"],
  },
  {
    slug: "poster",
    category: "设计与印刷",
    title: "做活动海报、店铺海报用什么AI(2026年10月)",
    description: "即梦AI、稿定AI、创客贴AI、美图设计室和Lovart做海报各有什么长处,中文字效果、价格与商用授权,以及从文案到印刷的海报制作流程。",
    checked: "2026-10-20",
    intro: "做海报的AI分两种:从零生成画面的生图工具,和带大量商用模板的在线设计平台。国内平台的优势是中文字体、模板和本地印刷对接,生图工具负责出主视觉。",
    tools: [
      { name: "即梦AI", maker: "字节跳动剪映团队", audience: "需要原创主视觉的人", what: "文生图、图生图,智能画布可以局部重绘、扩图、消除和抠图。评测作者认为它在图片中渲染中文字的效果处于第一梯队。", price: "基础、标准、高级三档会员,2026年4月起每月积分725/2210/6160;免费用户有排队、水印和720P上限 (2026-08)", source: AITOOLLAB_JIMENG },
      { name: "稿定AI", maker: "稿定设计", audience: "门店、电商、新媒体运营", what: "根据文案生成多版设计,海报复刻和AI改字可以直接替换海报里的文字和图片,还有扩图、变清晰、消除等工具。", price: "有免费版(不含商用授权),模板会员8.3元/月起;以官网为准 (2026-10 查看)", source: AIBOT_POSTER },
      { name: "创客贴AI", maker: "创客贴", audience: "小团队、手机上做图的人", what: "一句话生成多款海报,生成后可继续编辑;模板40万+,支持多人协作,App内可直接下单印刷。", price: "个人版79元/季、169元/年等 (2026-10 查看)", source: AIBOT_POSTER },
      { name: "美图设计室", maker: "美图", audience: "个体商家、日常宣传", what: "一句话或上传图片生成海报,模板覆盖活动海报、招聘、通知等场景,手机、网页、电脑都能用。", price: "基础版免费,订阅20元/月、168元/年 (2026-10 查看)", source: AIBOT_POSTER },
      { name: "Lovart", maker: "LiblibAI", audience: "要成套品牌物料的人", what: "对话式设计智能体,批量生成海报、Logo和品牌物料,支持分层编辑,可导出PSD和PPTX。", price: "Starter 19美元/月起 (2026-10 查看)", source: AIBOT_POSTER },
    ],
    workflow: [
      { step: "写清信息层级", detail: "标题、时间、地点、主办方、二维码、优惠信息按重要程度排好。可以让通用大模型帮你压缩成短句。" },
      { step: "出主视觉", detail: "用即梦AI生成背景或主画面,在提示词里写明画幅(竖版3:4、9:16)和风格,中文标题单独生成或之后再排。" },
      { step: "进模板平台排版", detail: "把主视觉放进稿定、创客贴或美图设计室的模板,文字用平台的商用字体重新排版,比生图里的字更清楚可改。" },
      { step: "检查文案合规", detail: "删除“最”“第一”“国家级”这类绝对化用语,核对价格、时间和联系方式。" },
      { step: "按用途导出", detail: "线上发布导出PNG;印刷常用A3、A4或易拉宝尺寸,留3mm出血,导出PDF或直接在创客贴下单印刷。" },
    ],
    combos: [
      { pair: "即梦主视觉 + 稿定/创客贴排版", why: "生图工具出画面,模板平台负责中文字体、版式和多尺寸适配。" },
      { pair: "通用大模型写文案 + 海报工具", why: "先把文案定好再设计,避免设计完再大改文字。" },
      { pair: "一套海报 + 多平台尺寸", why: "主视觉定下后,在模板平台一键改成朋友圈、小红书、公众号封面等尺寸。" },
    ],
    cautions: [
      "《广告法》禁止使用“国家级”“最高级”“最佳”等用语,海报上的宣传语发布前要检查。",
      "AI生成的图片按《人工智能生成合成内容标识办法》(2025-09-01施行)会带显式或隐式标识,不得恶意删除或篡改。",
      "免费版通常不含商用授权,用于商业宣传前确认模板、字体和素材的授权范围。",
      "2026年10月市场监管总局公布的典型案例中,一家酒吧用AI生成的低俗图片做宣传被罚30万元,AI出图同样要守广告导向。",
    ],
    keywords: ["AI海报生成", "活动海报AI", "即梦海报", "稿定AI", "创客贴AI", "免费AI海报"],
  },
  {
    slug: "pamphlet",
    category: "设计与印刷",
    title: "做宣传单、三折页、菜单用什么AI(2026年10月)",
    description: "用创客贴、稿定AI、Lovart等工具做宣传单、宣传册、三折页和餐厅菜单,常用印刷尺寸、出血和分辨率要求,以及从文案到下单印刷的流程。",
    checked: "2026-10-20",
    intro: "宣传单和折页比海报多了两件事:信息量更大,而且要送印刷。AI适合快速出版式和配图,但折页顺序、出血和颜色模式要人来把关。",
    tools: [
      { name: "创客贴AI", maker: "创客贴", audience: "门店、培训机构、小企业", what: "模板覆盖传单、宣传册、易拉宝等200多种场景,AI可以根据文字或图片生成设计,在线编辑后直接在App里下单印刷。", source: APP_CHUANGKETIE },
      { name: "稿定AI", maker: "稿定设计", audience: "需要成套物料的商家", what: "AI设计和AI改字,还有包装设计、周边物料和店铺装修相关工具,适合把同一套视觉延伸到多种物料。", source: AIBOT_GAODING },
      { name: "Lovart", maker: "LiblibAI", audience: "要直接出印刷文件的人", what: "有印刷工作室,支持A5、A4传单,对折、三折、关门折宣传册和菜单模式;默认3mm出血、6mm安全区,输出CMYK,强制300 DPI,可导出PDF/X-4印刷文件。", source: LOVART_PRINT },
      { name: "即梦AI", maker: "字节跳动剪映团队", audience: "需要插画或菜品配图的人", what: "生成封面插画、场景图,智能画布可局部重绘和扩图,用来补折页里的配图。", source: AITOOLLAB_JIMENG },
    ],
    workflow: [
      { step: "先定尺寸和折法", detail: "单页传单常用A4、A5;三折页常用A4展开后三折。先问清印刷厂的成品尺寸和折法(包心折或Z字折)。" },
      { step: "按面分配内容", detail: "用通用大模型把资料拆成封面、内页、封底几块,每块写清标题和要点,菜单则按菜品分类、价格整理成表。" },
      { step: "生成版式", detail: "在创客贴或稿定选传单、宣传册模板,用AI生成初版;需要成品印刷文件时可以用Lovart的折页模式。" },
      { step: "补配图并统一风格", detail: "缺的图片用即梦生成,统一色调;产品和菜品尽量用实拍图,避免与实物不符。" },
      { step: "印前检查", detail: "确认3mm出血、文字离裁切边足够远、图片300 DPI、CMYK颜色。打一份样张核对折叠顺序后再批量印刷。" },
    ],
    combos: [
      { pair: "通用大模型拆内容 + 模板平台排版", why: "内容先分好面,排版时不会出现某一面挤满、另一面空着的情况。" },
      { pair: "模板设计 + 平台内印刷", why: "创客贴可以在线下单印刷,尺寸和格式由平台对接,减少来回改文件。" },
      { pair: "海报 + 折页同一套视觉", why: "同一主视觉延伸到海报、传单、折页,门店宣传更统一。" },
    ],
    cautions: [
      "菜单和宣传单上的价格、功效描述属于广告内容,避免使用“最佳”“第一”等绝对化用语,也不要夸大功效。",
      "专色、烫金、击凸等特殊工艺和印刷厂拼版要求,AI工具不会自动处理,要和印刷厂确认。",
      "使用AI生成的产品图片时,确保与实物一致,避免误导消费者。",
    ],
    keywords: ["AI宣传单", "三折页设计AI", "宣传册AI", "菜单设计AI", "传单模板", "印刷出血尺寸"],
  },
  {
    slug: "ad-image",
    category: "营销与广告",
    title: "电商主图、广告图用什么AI(2026年10月)",
    description: "稿定AI、美图设计室、即梦AI、即创AI、甩手图省事等工具怎么做白底图、场景图、模特图和广告banner,适配淘宝、拼多多、抖音等平台的流程与合规要点。",
    checked: "2026-10-20",
    intro: "电商和广告图的AI工具已经能从一张商品照片做出白底图、场景图、模特试穿图和整套详情图。关键是保持商品本身真实,只让AI改背景、光线和排版。",
    tools: [
      { name: "稿定AI", maker: "稿定设计", audience: "电商商家、运营", what: "AI商品精修、模特试穿、多图融合、AI商品摄影和主图生成。", source: AIBOT_GAODING },
      { name: "美图设计室", maker: "美图", audience: "中小商家", what: "AI商品场景图和海报生成,模板覆盖电商与社交媒体封面,多端可用。", price: "基础版免费,订阅20元/月、168元/年 (2026-10 查看)", source: AIBOT_POSTER },
      { name: "甩手图省事", audience: "多平台开店的商家", what: "输入商品名即可,不必写提示词;一次生成白底图、场景图、细节图和信息图,按淘宝、拼多多、抖音、速卖通、Temu等13个平台的风格和规格输出,支持16种语言。", source: CSDN_ECOM },
      { name: "即梦AI", maker: "字节跳动剪映团队", audience: "需要创意广告视觉的人", what: "文生图、图生图和智能画布(局部重绘、扩图、消除、抠图、多图融合),中文提示词原生可用。", source: AITOOLLAB_JIMENG },
      { name: "即创AI", maker: "抖音", audience: "抖音电商商家", what: "抖音推出的一站式AI创作平台,有商品卡和图文工具,也能生成短视频脚本和直播话术。", price: "公测免费,每天约100次 (AI工具集页面所列)", source: AIBOT_JICHUANG },
    ],
    workflow: [
      { step: "拍好原图", detail: "商品在自然光下拍正面、侧面和细节,背景干净。原图越清楚,AI抠图和换背景越自然。" },
      { step: "先出白底主图", detail: "用稿定或美图抠图生成白底图,按各平台的主图规格导出。" },
      { step: "生成场景图和模特图", detail: "用稿定的AI商品摄影、模特试穿,或即梦的多图融合做场景图;多平台店铺可以用甩手图省事一次出一整套。" },
      { step: "加卖点文字和banner", detail: "卖点文案用通用大模型写几版,再到模板平台排版。中文字用平台字体排,不要依赖生图里的文字。" },
      { step: "合规检查后投放", detail: "检查绝对化用语、功效宣称和价格表述,核对商品颜色、尺寸与实物一致。" },
    ],
    combos: [
      { pair: "实拍原图 + AI换背景", why: "商品保持真实,只改环境和光线,既省拍摄成本又不误导消费者。" },
      { pair: "整套电商图 + 即梦创意图", why: "主图和详情图走规范流程,广告投放图用生图工具做出差异化。" },
      { pair: "通用大模型文案 + 图片A/B测试", why: "同一张图配不同卖点文案测试点击率,找出更有效的表达。" },
    ],
    cautions: [
      "AI图片不能改变商品的颜色、形状、规格,否则可能构成虚假宣传。",
      "《广告法》禁止使用“国家级”“最高级”“最佳”等用语;市场监管总局的执法指南说明并非所有“最”字都违法,但宣传商品性能和质量时要格外谨慎。",
      "AI生成内容按《人工智能生成合成内容标识办法》(2025-09-01施行)要保留标识,发布时平台要求声明的要如实声明。",
      "模特试穿图使用AI人像时,不要使用真人肖像而未经授权。",
    ],
    keywords: ["AI商品图", "电商主图AI", "AI白底图", "模特试穿AI", "广告banner AI", "详情页AI"],
  },
  {
    slug: "ad-video",
    category: "营销与广告",
    title: "广告视频、商品短视频用什么AI(2026年10月)",
    description: "即梦AI(Seedance 2.5)、可灵AI 3.0、海螺视频、即创AI分别擅长什么,单次时长、会员与积分,以及从脚本、分镜到剪辑投放的带货短视频制作流程。",
    checked: "2026-10-20",
    intro: "2026年国内视频模型进步很快:Seedance 2.5单次能生成30秒、带多镜头叙事和音画同步,可灵3.0支持多模态输入和电商批量生成。实际做广告时,通常是AI生成镜头,再到剪映里剪辑、配字幕和配音。",
    tools: [
      { name: "即梦AI (Seedance 2.5)", maker: "字节跳动", audience: "要做剧情式广告短片的人", what: "Seedance 2.5于2026-07-31发布,单次生成从15秒提升到30秒并可多次续写,30秒内可组织多个连贯镜头,音画联合生成,一次最多参考30张图、10段视频和10段音频。陆续上线即梦AI和豆包专业版。", source: ITHOME_SEEDANCE },
      { name: "即梦AI 会员", maker: "字节跳动剪映团队", audience: "持续产出视频的团队", what: "文生视频、图生视频、首尾帧,以及数字人口播和对口型。", price: "基础、标准、高级三档,2026年4月起每月积分725/2210/6160,年费高于2月水平,购买前以官网为准 (2026-08)", source: AITOOLLAB_JIMENG },
      { name: "可灵AI 3.0", maker: "快手", audience: "品牌广告、电商团队", what: "2026年2月推出3.0系列,文、图、音、视频多模态输入输出,分镜控制和主体一致性更好,音画同步生成,单段最长15秒;有电商自动分组批量生成,团队版最多15人协作。", source: BJNEWS_KLING },
      { name: "海螺视频", maker: "MiniMax", audience: "需要人物表情和动作的短片", what: "文生视频、图生视频,中英文提示词,人物表情和动作细节较好;视频Agent的半自定义模式可在生成中修改分镜。", source: AIBOT_HAILUO },
      { name: "即创AI", maker: "抖音", audience: "抖音带货商家", what: "输入行业、商品名和卖点生成短视频脚本,“智能成片”一次生成脚本、视频、数字人和配音。", price: "公测免费,每天约100次 (AI工具集页面所列)", source: AIBOT_JICHUANG },
    ],
    workflow: [
      { step: "写脚本和分镜", detail: "用即创AI或通用大模型写15到30秒脚本:前3秒抛出痛点或亮点,中间展示商品,结尾给出行动指令。每个镜头写清画面、台词和时长。" },
      { step: "准备参考素材", detail: "商品实拍图、品牌色、Logo、参考视频整理好。Seedance 2.5和可灵3.0都能用多张参考图保持商品和人物一致。" },
      { step: "逐镜头生成", detail: "剧情式长镜头用即梦(Seedance 2.5),商品展示和批量素材用可灵,人物表情戏用海螺。每个镜头多生成几版挑选。" },
      { step: "剪辑、字幕和配音", detail: "在剪映里拼接镜头,加字幕、配音和音乐,导出竖版9:16用于抖音、视频号、小红书。" },
      { step: "合规检查后投放", detail: "核对口播和字幕里的宣传用语,确认AI内容标识保留,商品效果与实物一致。" },
    ],
    combos: [
      { pair: "即创AI脚本 + 即梦/可灵生成", why: "脚本按抖音带货的节奏写好,再交给视频模型出画面,成片更像投放素材而不是演示片段。" },
      { pair: "AI生成镜头 + 实拍商品特写", why: "氛围和场景用AI,商品细节用实拍,既有创意又不失真。" },
      { pair: "数字人口播 + 剪映字幕", why: "即梦或即创的数字人做口播,剪映统一字幕样式和品牌包装。" },
    ],
    cautions: [
      "AI生成的视频按《人工智能生成合成内容标识办法》(2025-09-01施行)要添加显式标识,发布时按平台要求声明,不得删除或篡改标识。",
      "2026年10月市场监管总局通报的典型案例中,用AI生成低俗画面的广告同样被处罚,AI素材也要遵守《广告法》的导向要求。",
      "数字人和配音不要使用未经授权的真人肖像或声音。",
      "会员价格和积分规则在2026年多次调整,付费前以即梦、可灵官网为准。",
    ],
    keywords: ["AI广告视频", "即梦AI视频", "可灵AI", "Seedance 2.5", "带货短视频AI", "商品视频AI"],
  },
];
