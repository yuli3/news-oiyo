// AI use-case guides for US readers (American English), checked 2026-10-20, country: United States.
import type { Guide, KeywordCategory } from "../ai-use-cases";

export const keywordMap: KeywordCategory[] = [
  {
    category: "Professional work",
    cases: [
      { name: "Legal research & contract review", slug: "legal", keywords: ["AI for lawyers", "AI contract review", "legal AI tools", "CoCounsel vs Harvey", "AI legal research"] },
      { name: "Employment law & HR compliance", slug: "labor", keywords: ["HR compliance software", "AI for HR", "overtime calculator", "employee handbook builder", "am I exempt from overtime"] },
      { name: "Taxes & bookkeeping", slug: "tax-accounting", keywords: ["AI tax prep", "IRS Free File", "TurboTax AI", "AI bookkeeping", "QuickBooks AI agent"] },
      { name: "Immigration paperwork", keywords: ["USCIS forms help", "AI immigration paperwork", "green card application checklist"] },
      { name: "Patents & trademarks", keywords: ["AI patent search", "prior art search AI", "USPTO trademark search"] },
      { name: "Leases & real estate", keywords: ["lease review AI", "rental agreement checker", "real estate contract AI"] },
      { name: "Medical bills & insurance claims", keywords: ["medical bill review AI", "insurance claim denial letter", "appeal health insurance denial"] },
    ],
  },
  {
    category: "Documents & presentations",
    cases: [
      { name: "Slide decks", slug: "presentation", keywords: ["AI presentation maker", "Gamma AI", "make slides with AI", "AI PowerPoint generator", "pitch deck AI"] },
      { name: "Reports & proposals", keywords: ["AI report writer", "business proposal AI", "grant proposal AI"] },
      { name: "Meeting notes & transcripts", keywords: ["AI meeting notes", "meeting transcription", "AI note taker"] },
      { name: "Spreadsheets & data cleanup", keywords: ["AI Excel formulas", "Google Sheets AI", "clean data with AI"] },
      { name: "Translation & localization", keywords: ["AI translation", "translate documents AI", "Spanish translation AI"] },
      { name: "Research & literature review", keywords: ["deep research AI", "AI literature review", "summarize papers AI"] },
    ],
  },
  {
    category: "Design & print",
    cases: [
      { name: "Posters", slug: "poster", keywords: ["AI poster maker", "event poster AI", "18x24 poster design", "Canva poster AI"] },
      { name: "Brochures, flyers & menus", slug: "pamphlet", keywords: ["AI brochure maker", "tri-fold brochure template", "AI flyer maker", "restaurant menu design AI"] },
      { name: "Logos & business cards", keywords: ["AI logo generator", "business card design AI"] },
      { name: "Product listings", keywords: ["Amazon listing images AI", "Shopify product page AI", "Etsy listing AI"] },
      { name: "Thumbnails & social graphics", keywords: ["YouTube thumbnail AI", "Instagram carousel AI", "social media graphics AI"] },
    ],
  },
  {
    category: "Marketing & ads",
    cases: [
      { name: "Ad images & product photos", slug: "ad-image", keywords: ["AI product photography", "AI ad creative", "AI banner maker", "product photo background AI"] },
      { name: "Ad & product videos", slug: "ad-video", keywords: ["AI video ad maker", "Veo 3.1", "Kling AI", "Runway video", "Sora alternatives"] },
      { name: "Ad copy & slogans", keywords: ["AI ad copy generator", "AI copywriting", "slogan generator"] },
      { name: "Social media management", keywords: ["AI social media posts", "TikTok content AI", "Instagram Reels AI"] },
      { name: "Blogging & SEO", keywords: ["AI blog writer", "SEO AI tools", "AI content optimization"] },
      { name: "Voiceover, dubbing & music", keywords: ["AI voiceover", "text to speech", "AI music for ads"] },
    ],
  },
  {
    category: "Operations & dev",
    cases: [
      { name: "Customer support chatbots", keywords: ["AI customer service", "AI chatbot for website", "support automation"] },
      { name: "Coding & website building", keywords: ["AI coding assistant", "vibe coding", "AI website builder"] },
      { name: "Workflow automation & agents", keywords: ["AI agents for business", "workflow automation AI", "MCP"] },
      { name: "Hiring & interviews", keywords: ["AI job description generator", "AI resume screening", "AI interview"] },
      { name: "Teaching & training materials", keywords: ["AI lesson plan", "AI quiz generator", "training course AI"] },
    ],
  },
];

const DUPPLE_LEGAL = { label: "Dupple, Best AI Legal Tools in 2026 (2026-06-16)", url: "https://dupple.com/learn/best-ai-legal-tools" };
const UNC_512 = { label: "UNC Law Library on ABA Formal Opinion 512 (2025-02-26)", url: "https://library.law.unc.edu/?p=2569" };
const GUSTO_GUIDE = { label: "Gusto, Best HR Compliance Software (2026-02-10)", url: "https://gusto.com/resources/guides/best-hr-compliance-software" };
const NELSON_AI_HIRING = { label: "Nelson Mullins on state AI hiring laws (2026-06-16)", url: "https://www.nelsonmullins.com/insights/blogs/ai-task-force/ai/states-take-aim-at-ai-in-employment-decisions-illinois-s-disclosure-and-anti-discrimination-requirements-enforcement-gaps-under-nyc-s-local-law-144-and-connecticut-s-new-ai-law" };
const BEANCOUNT_FREEFILE = { label: "Beancount, IRS Free File guide (2026-09-20)", url: "https://beancount.io/blog/2026/09/20/irs-free-file-89000-agi-direct-file-gone-schedule-c-guide" };
const BEANCOUNT_BOOKS = { label: "Beancount, QuickBooks Intuit Assist vs Xero JAX (2026-10-09)", url: "https://beancount.io/blog/2026/09/17/quickbooks-intuit-assist-vs-xero-jax-ai-bookkeeping-workflow-guide" };
const ZAPIER_DECKS = { label: "Zapier, Best AI presentation makers (2026-06-24)", url: "https://zapier.com/blog/best-ai-presentation-maker/" };
const PETAPIXEL_CANVA = { label: "PetaPixel, Canva Magic Layers (2026-03-11)", url: "https://petapixel.com/2026/03/11/canvas-new-ai-tool-turns-flat-images-into-editable-layers" };
const NEUROHIVE_IMAGES = { label: "Neurohive, ChatGPT Images 2.0 launch (2026-04-21)", url: "https://neurohive.io/en/news/chatgpt-images-2-0-openai-launches-image-generation-model-with-reasoning-2k-resolution-and-multilingual-text/" };
const EWEEK_ADOBE = { label: "eWeek, Adobe MAX: Express AI Assistant (2025-10-29)", url: "https://www.eweek.com/de/news/adobe-max-express-ai-assistant-firefly-foundry/" };
const VAIZLE_POMELLI = { label: "Vaizle, Pomelli adds Photoshoot (2026-02-20)", url: "https://insights.vaizle.com/news/google-labs-adds-photoshoot-to-pomelli-turning-one-product-photo-into-studio-style-marketing-visuals" };
const AMAZON_CREATIVE = { label: "Amazon Ads, agentic AI creative tool (2025-09-17)", url: "https://advertising.amazon.com/library/news/amazon-ads-agentic-ai-creative-tool" };
const DUPPLE_VIDEO = { label: "Dupple, Best AI Video Generators (updated 2026-10-06)", url: "https://dupple.com/learn/best-ai-video-generators" };
const PIKTOCHART_SORA = { label: "Piktochart, Best Sora alternatives (updated 2026-09-18)", url: "https://piktochart.com/blog/best-sora-alternatives/" };

export const guides: Guide[] = [
  {
    slug: "legal",
    category: "Professional work",
    title: "AI for Legal Research and Contract Review (October 2026)",
    description: "Harvey, CoCounsel, Lexis+ with Protégé, Spellbook, Vincent, Paxton and Clio Duo: what each US legal AI tool does, what it costs, and how to use it within ABA rules.",
    checked: "2026-10-20",
    intro: "US legal AI has split into three camps: research assistants built on Westlaw, Lexis or vLex content, contract tools that live inside Microsoft Word, and practice-management add-ons that know your matters. Most are built for attorneys, and the right pick depends heavily on firm size and which research database you already pay for.",
    tools: [
      { name: "Harvey", maker: "Harvey", audience: "Large firms and corporate legal teams", what: "Assistant for research and drafting, Vault for reviewing thousands of documents at once, Workflows for repeatable tasks, and Deep Research for multi-step work. Dupple calls it overkill for firms under about 50 lawyers.", price: "Not published; quote only (2026-06)", source: DUPPLE_LEGAL },
      { name: "CoCounsel", maker: "Thomson Reuters", audience: "Litigators whose firms already use Westlaw", what: "Built on Westlaw primary law. Handles document review, deposition prep, contract analysis and research with citations linked to sources.", price: "$180 to $639 per user/month depending on tier, usually on top of a Westlaw subscription (2026-06)", source: DUPPLE_LEGAL },
      { name: "Lexis+ with Protégé", maker: "LexisNexis", audience: "Research-heavy firms", what: "Combines Lexis content, the Protégé AI assistant and Shepard's citation checking in one workflow.", price: "Quote-based, generally $128 to $494 per user/month (2026-06)", source: DUPPLE_LEGAL },
      { name: "Vincent AI", maker: "vLex (now part of Clio)", audience: "Firms that want an alternative to Westlaw or Lexis", what: "Research across millions of US documents, strong on multi-jurisdictional and comparative work. A lighter tier is free through more than 40 state bars as a member benefit.", price: "Around $399 per user/month for the core research package (2026-06)", source: DUPPLE_LEGAL },
      { name: "Spellbook", maker: "Spellbook", audience: "Lawyers who draft and redline contracts in Word", what: "A Word add-in that drafts clauses, flags risky language, generates redlines and applies negotiation playbooks. It is not a research platform. 7-day free trial.", source: DUPPLE_LEGAL },
      { name: "Paxton AI", maker: "Paxton", audience: "Solo attorneys and small firms", what: "Drafting, contract analysis and research across federal regulations, state law and case law. Holds SOC 2, ISO 27001 and HIPAA certifications.", price: "$499/month or $2,999/year for the individual plan, 7-day free trial (2026-06)", source: DUPPLE_LEGAL },
      { name: "Clio Duo", maker: "Clio", audience: "Firms already on Clio Manage", what: "An AI layer inside Clio that uses your matters, documents and deadlines to summarize matters, pull out deadlines and draft client emails. A productivity assistant, not a research engine.", price: "About $39/user/month as an add-on to Clio Manage ($49 to $149/user/month) (2026-06)", source: DUPPLE_LEGAL },
    ],
    workflow: [
      { step: "Frame the issue", detail: "Write a short timeline of the facts and break the legal questions into one sentence each. A general assistant can help organize notes, but strip client names and identifying details first." },
      { step: "Research in a legal database", detail: "Run the questions in a tool grounded in primary law (CoCounsel, Lexis+ with Protégé, Vincent). If you used a general chatbot earlier, pull every case it named and confirm it exists and says what was claimed." },
      { step: "Check every citation", detail: "Run the authorities through KeyCite or Shepard's before anything goes into a filing. Treat an unverified citation as missing." },
      { step: "Draft and redline", detail: "Draft memos from the verified research, and handle contracts in Word with Spellbook or a similar add-in. Accept or reject each suggested change against your client's negotiating position." },
      { step: "Log it in the matter", detail: "Save research, drafts and deadlines in your practice-management system (Clio Duo can extract deadlines) so the next person on the file can pick up where you left off." },
    ],
    combos: [
      { pair: "Westlaw or Lexis AI + Word contract add-in", why: "Research tools are grounded in case law, while Spellbook-style add-ins work where contracts are actually negotiated. Each covers what the other does not." },
      { pair: "Vincent via your state bar + Paxton", why: "Solos can start with the free bar-member tier for research and add a single-seat drafting tool before committing to an enterprise contract." },
      { pair: "Practice management AI + research tool", why: "Clio Duo knows your matters and deadlines; the research tool knows the law. Keep facts in one and authority in the other." },
    ],
    cautions: [
      "ABA Formal Opinion 512 (July 2024) says lawyers using generative AI must keep up technological competence and still owe duties of confidentiality, client communication, candor to the tribunal, supervision and reasonable fees. Check your state bar's own guidance too.",
      "Never file a citation you have not read. General chatbots can invent cases and quotes that look real.",
      "Before uploading client files, confirm the vendor's data retention and model-training terms. Most consumer chatbot plans are not the right place for privileged material.",
      "If you are not a lawyer, use these tools to prepare questions for an attorney, not to replace one. Prices above are from mid-2026 reporting and often require a quote.",
    ],
    keywords: ["AI for lawyers", "legal AI tools 2026", "AI contract review", "CoCounsel pricing", "Harvey AI", "ABA Opinion 512"],
  },
  {
    slug: "labor",
    category: "Professional work",
    title: "AI for Employment Law and HR Compliance (October 2026)",
    description: "DOL elaws advisors for workers, plus Gusto, Rippling, Mineral and Workday for employers: how to check overtime, handbooks and new AI hiring laws in the US.",
    checked: "2026-10-20",
    intro: "Employment-law help in the US comes from two directions. Workers can use free Department of Labor advisors to check basic rights, while employers increasingly rely on payroll and HR platforms that send law-change alerts and answer questions in chat. Neither replaces an employment attorney when there is a real dispute, and state and city rules often go further than federal law.",
    tools: [
      { name: "elaws Advisors", maker: "U.S. Department of Labor", audience: "Workers and employers", what: "Free interactive advisors: the FLSA Advisor covers coverage, hours worked, overtime exemptions (Part 541), an overtime calculator and child labor rules. There are also FMLA, Poster and FirstStep advisors for recordkeeping and which DOL laws apply.", price: "Free", source: { label: "U.S. Department of Labor, elaws Advisors", url: "https://www.dol.gov/agencies/whd/compliance-assistance/elaws-advisors" } },
      { name: "Gusto", maker: "Gusto", audience: "Small businesses running payroll", what: "Federal, state and local tax filings, a built-in handbook builder, policy alerts for labor law and minimum wage changes, and an HR Resource Center with templates.", price: "Simple plan $49/month + $6/person/month (2026-02)", source: GUSTO_GUIDE },
      { name: "Gus (Gusto AI assistant)", maker: "Gusto", audience: "Gusto employers and employees", what: "Answers payroll, benefits, time-tracking and compliance questions in plain language with links to Help Center sources, and hands you to a human on request. Gusto itself says to check the source before acting on pay, tax or employment-law answers.", source: { label: "Gusto Help Center, Use Gus (checked 2026-10)", url: "https://support.gusto.com/article/250211164235690/use-gus-gustos-ai-assistant" } },
      { name: "Rippling AI", maker: "Rippling", audience: "Growing companies on Rippling", what: "An HR, IT and finance copilot that runs analyses on your people data and sets up automations within existing policies and permissions.", source: { label: "01net / Business Wire, Rippling tops G2 grid (2026-08-25)", url: "https://www.01net.it/rippling-tops-g2s-first-ever-grid-for-ai-agents-for-hr/" } },
      { name: "Mineral HR", maker: "Mineral", audience: "Small employers without an HR department", what: "A 50-state law and policy library, custom handbook builder, automated state labor-law alerts, HR advisor chat and more than 300 e-learning courses.", price: "$279/month for up to 50 employees (2026-02)", source: GUSTO_GUIDE },
      { name: "Workday", maker: "Workday", audience: "Large enterprises", what: "A global HR and payroll compliance engine with AI-powered risk alerts and reporting.", price: "Custom enterprise quote", source: GUSTO_GUIDE },
    ],
    workflow: [
      { step: "Put the facts in numbers", detail: "Write down start and end times, unpaid breaks, the workweek, pay rate, job duties and the state you work in. Overtime and exemption questions turn on these details." },
      { step: "Check the federal baseline", detail: "Use the DOL FLSA Advisor to see whether a job is exempt and to run the overtime calculator. Then check your state labor department, since many states set higher minimum wages or daily overtime." },
      { step: "Match against company policy", detail: "HR teams can ask an in-platform assistant (Gus, Rippling AI) how payroll is configured and use the handbook builder or Mineral's library to update policies by state." },
      { step: "Audit AI in hiring", detail: "If you use AI to screen or rank candidates, list each tool and where you hire. Illinois, New York City and Connecticut now have specific notice or audit rules." },
      { step: "Escalate disputes to people", detail: "Terminations, unpaid wages, harassment and retaliation claims belong with an employment attorney or the DOL Wage and Hour Division. Keep your AI chat notes as a timeline, not as advice." },
    ],
    combos: [
      { pair: "DOL advisors + state labor website", why: "Federal rules set the floor; state rules often raise it. Checking both catches the most common overtime mistakes." },
      { pair: "Payroll platform alerts + handbook builder", why: "When an alert flags a minimum wage or leave change, update the matching handbook section the same week so policy and payroll stay in sync." },
      { pair: "General AI draft + HR compliance review", why: "A chatbot can draft a policy quickly, but run it past Mineral's library or an employment attorney before it goes to staff." },
    ],
    cautions: [
      "Illinois HB 3773 (effective 2026-01-01) makes discriminatory AI use in employment decisions a civil rights violation and requires notice to employees. NYC Local Law 144 requires an annual independent bias audit and candidate notice for automated hiring tools. Connecticut's SB 5 adds notice rules from 2027-10-01.",
      "AI answers about wages and exemptions are general information, not legal advice. For a termination, wage claim or discrimination complaint, talk to an employment attorney or the DOL.",
      "Pay stubs, I-9s and offer letters contain Social Security numbers and bank details. Redact them before uploading to any chatbot.",
      "Prices come from Gusto's own comparison guide (February 2026). Confirm current pricing with each vendor.",
    ],
    keywords: ["AI for HR compliance", "overtime calculator DOL", "FLSA exempt or nonexempt", "Gusto vs Rippling", "employee handbook builder", "AI hiring law Illinois"],
  },
  {
    slug: "tax-accounting",
    category: "Professional work",
    title: "AI for Taxes and Bookkeeping in the US (October 2026)",
    description: "IRS Free File after Direct File ended, TurboTax and H&R Block AI assistants, and QuickBooks and Xero AI agents: a practical US tax and bookkeeping workflow.",
    checked: "2026-10-20",
    intro: "IRS Direct File was not offered for the 2026 filing season, so free federal filing now runs mainly through IRS Free File partners. Paid tax software and bookkeeping platforms have added AI assistants and agents, but the arithmetic still comes from the software and the responsibility still sits with you.",
    tools: [
      { name: "IRS Free File", maker: "IRS and partner companies", audience: "Taxpayers with AGI of $89,000 or less", what: "Guided software from partners (1040Now, 1040.com, ezTaxReturn.com, FileYourTaxes.com, FreeTaxUSA, OnLine Taxes, TaxAct, TaxSlayer) for 2025 returns. Free File Fillable Forms have no income limit. Start from the Free File page on IRS.gov or a free return can turn into a paid one.", price: "Free federal return; state may cost extra", source: BEANCOUNT_FREEFILE },
      { name: "TurboTax with Intuit Assist", maker: "Intuit", audience: "DIY filers who want help", what: "Intuit Assist runs an accuracy check that flags gaps before you move on, explains your refund or balance due, and answers tax questions. Intuit does not use the AI for calculations. TurboTax Live adds human tax experts.", source: { label: "AARP, Can AI help with your taxes? (updated 2025-02-12)", url: "https://www.aarp.org/money/taxes/tax-return-ai/" } },
      { name: "H&R Block AI Tax Assist", maker: "H&R Block", audience: "DIY filers, self-employed and small businesses", what: "24/7 GenAI answers in DIY Online and Desktop software, drawing on The Tax Institute's knowledge. In-office tax pros also use AI tools to answer client questions.", source: { label: "H&R Block press release (2026-02-09)", url: "https://www.globenewswire.com/news-release/2026/02/09/3234883/0/en/H-R-Block-Combines-AI-Power-with-Digital-Enhancements-and-Unmatched-Tax-Pro-Expertise-to-Win-Tax-Season-2026.html" } },
      { name: "QuickBooks Online (Intuit Assist and AI agents)", maker: "Intuit", audience: "Small business owners and bookkeepers", what: "Drafts estimates, invoices and payment reminders, categorizes transactions and flags anomalies. The Accounting Agent helps with reconciliation and sends ambiguous items to the owner or a QuickBooks Live expert.", source: BEANCOUNT_BOOKS },
      { name: "Xero JAX", maker: "Xero", audience: "Small businesses on Xero", what: "\"Just Ask Xero\" coordinates agents for invoicing, bill capture, bank reconciliation and payment collection, with the owner approving material actions. AI features are included in plans rather than sold as add-ons.", source: BEANCOUNT_BOOKS },
    ],
    workflow: [
      { step: "Gather documents", detail: "Collect W-2s, 1099s, 1098s, last year's return and receipts in one folder. Name files with the year and payer so the software and any assistant can find them." },
      { step: "Pick the cheapest route that fits", detail: "If your AGI is $89,000 or less, start at IRS Free File. VITA volunteers help people who generally earn $69,000 or less, and TCE serves taxpayers 60 and older. Complex returns may need paid software or a preparer." },
      { step: "Keep books clean all year", detail: "Let QuickBooks or Xero suggest categories and reconciliations, but review flagged items monthly. Clean books make Schedule C or a business return much faster." },
      { step: "Ask the assistant, then check the form", detail: "Use AI Tax Assist or Intuit Assist to understand a line or a credit, then confirm the result on the actual form and IRS instructions for that tax year." },
      { step: "Bring in a pro when stakes rise", detail: "Multi-state returns, rental depreciation, K-1s, foreign accounts and IRS notices deserve a CPA or enrolled agent." },
    ],
    combos: [
      { pair: "QuickBooks or Xero + tax software", why: "Year-round categorized books feed straight into the business section of your return instead of a February scramble." },
      { pair: "AI assistant + IRS instructions", why: "The assistant explains in plain language; the IRS instructions are the authority. Read both for any number you are unsure of." },
      { pair: "IRS Free File + VITA", why: "Free File covers straightforward returns; VITA volunteers can sit with you when you get stuck, at no cost." },
    ],
    cautions: [
      "The National Taxpayer Advocate has warned that taxpayers should not rely solely on AI-generated tax advice, and you remain responsible for errors on your return.",
      "Always ask which tax year an answer applies to. Rules and thresholds change every year.",
      "Free File does not cover quarterly estimated taxes, and a free federal return may not include a free state return.",
      "Do not paste Social Security numbers or full bank account numbers into general chatbots.",
    ],
    keywords: ["AI tax prep", "IRS Free File 2026", "Direct File discontinued", "TurboTax Intuit Assist", "H&R Block AI Tax Assist", "QuickBooks AI agent"],
  },
  {
    slug: "presentation",
    category: "Documents & presentations",
    title: "Best AI Combo for Making Slide Decks (October 2026)",
    description: "How to split work between ChatGPT or Claude, Gamma, Canva, Genspark and Beautiful.ai, from a one-line message to a finished PowerPoint or Google Slides deck.",
    checked: "2026-10-20",
    intro: "AI deck tools are good at different things: Gamma builds a full first draft fast, Canva polishes visuals and branding, Genspark adds research, and Beautiful.ai keeps charts tidy. The least painful route is to outline in a chat assistant, generate in a deck tool, and finish in PowerPoint or Google Slides.",
    tools: [
      { name: "Gamma", audience: "Anyone who needs a fast first draft", what: "Outline-first generation with settings for audience, tone and aspect ratio, an agent that edits on command, plus landing pages and documents. Free-plan AI credits do not refill monthly.", price: "Free plan; paid from $9/seat/month billed annually (2026-06)", source: ZAPIER_DECKS },
      { name: "Canva", audience: "Teams that care about brand and design", what: "AI presentation generation, Magic Write and Magic Media, PPTX export and recorded presenting.", price: "Free plan with limited AI; Pro $12/month billed annually (2026-06)", source: ZAPIER_DECKS },
      { name: "Genspark AI Slides", audience: "Research-heavy topics", what: "Builds slides from a prompt with automatic visuals and research. Exports to PowerPoint, PDF or Google Slides, though reviewers report font and layout shifts that need cleanup.", price: "Free daily credits; Plus $24.99/month (2026-01)", source: { label: "Deckary, Genspark review (2026-01-20)", url: "https://deckary.com/blog/genspark-review" } },
      { name: "Beautiful.ai", audience: "Decks with charts and frequent updates", what: "Smart slides for charts and pictographs that re-layout automatically, team collaboration and per-slide recording.", price: "From $12/month billed annually (2026-06)", source: ZAPIER_DECKS },
      { name: "Pitch", audience: "Sales teams", what: "Sales-oriented decks with data-app integrations and presentation-level design styles.", price: "Free plan; $10/month individual, $20/seat/month teams, billed annually (2026-06)", source: ZAPIER_DECKS },
    ],
    workflow: [
      { step: "One message, one audience", detail: "Ask a chat assistant to state the single decision or takeaway and who is in the room. That line sets the slide order." },
      { step: "Ten-slide outline", detail: "Get an outline where each slide title is a claim and each claim has one or two supporting points with their sources." },
      { step: "Generate the draft", detail: "Paste the outline into Gamma or Genspark for a full draft. Move it to Canva if it needs your brand kit." },
      { step: "Verify numbers and charts", detail: "Check every figure against the original data. Delete any number without a source, or add the source in the notes." },
      { step: "Finish in PowerPoint or Google Slides", detail: "Export, apply your company template and fonts, and have the chat assistant draft speaker notes. Check the export for shifted text boxes." },
    ],
    combos: [
      { pair: "Chat assistant outline + Gamma draft", why: "You fix the logic in conversation and let Gamma handle layout once, which cuts revision rounds." },
      { pair: "Genspark research + Canva design", why: "Genspark gets the content and sources in; Canva brings it up to brand standard." },
      { pair: "Beautiful.ai + monthly reporting", why: "Smart slides re-layout when you update numbers, which suits recurring status decks." },
    ],
    cautions: [
      "Check a tool's data and training settings before uploading confidential company material.",
      "Commercial-use terms for AI images and icons differ by service. Read them before an external or paid presentation.",
      "PPTX export and AI credits depend on the plan, and plans change often. Confirm on the pricing page before you commit to a workflow.",
    ],
    keywords: ["AI presentation maker", "Gamma AI review", "make slides with AI", "AI PowerPoint generator", "Gamma vs Canva"],
  },
  {
    slug: "poster",
    category: "Design & print",
    title: "AI for Event and Shop Posters (October 2026)",
    description: "Make print-ready posters with ChatGPT Images 2.0, Canva Magic Layers and Adobe Express, using US sizes like 11x17, 18x24 and 24x36 with proper bleed and 300 DPI.",
    checked: "2026-10-20",
    intro: "Image models in 2026 finally render readable text, so an AI draft can be close to a real poster. The catch is that print still needs exact dimensions, bleed and editable type, so the reliable route is generate, convert to layers, then fix text and size in a design editor.",
    tools: [
      { name: "ChatGPT Images 2.0 (gpt-image-2)", maker: "OpenAI", audience: "Anyone drafting a poster concept", what: "Renders multilingual text, outputs up to 2000 px on the long edge in ratios including 2:3 and 3:1, and can make up to 10 consistent images per request. Thinking mode, which plans layout and checks constraints, is for Plus, Pro and Business users.", source: NEUROHIVE_IMAGES },
      { name: "Canva Magic Layers", maker: "Canva", audience: "Small businesses and event organizers", what: "Turns a flat PNG or JPG into an editable layered design, restoring text as real text boxes while keeping the layout. Public beta in the US, UK, Canada and Australia; uses your plan's monthly AI allowance.", source: PETAPIXEL_CANVA },
      { name: "Adobe Express AI Assistant", maker: "Adobe", audience: "People who prefer to edit by describing changes", what: "Create and edit designs in conversation, such as changing fonts, colors or backgrounds, while keeping the rest intact. Uses Adobe Firefly and third-party models. Beta.", source: EWEEK_ADOBE },
      { name: "4over4 poster size guide", maker: "4over4", audience: "Anyone sending a poster to print", what: "Reference for US sizes: 11x17 for bulletin boards, 18x24 for retail and events, 24x36 for trade shows, 27x40 for movie one-sheets. Recommends 0.125 in bleed, 0.25 in safe zone, 300 DPI up to 24x36, and CMYK files.", source: { label: "4over4, Poster sizes guide (checked 2026-10)", url: "https://www.4over4.com/guide/poster-sizes-and-dimensions-complete-guide" } },
    ],
    workflow: [
      { step: "Pick the size first", detail: "Choose by viewing distance: 11x17 or 18x24 within about 5 feet, 24x36 from 5 to 15 feet. Set up the file with 0.125 in bleed on every side (an 18x24 poster becomes 18.25 x 24.25 in)." },
      { step: "Write the copy", detail: "List the event name, date, time, place, price and a URL or QR target. Ask a chat assistant to cut it to the fewest words that still answer who, what, when and where." },
      { step: "Generate concepts", detail: "Ask ChatGPT Images 2.0 for several directions at 2:3 with your exact headline in quotes. Pick one for composition, not for final text." },
      { step: "Make it editable", detail: "Bring the image into Canva and run Magic Layers, or rebuild in Adobe Express. Retype every word, check spelling and keep text 0.25 in inside the trim." },
      { step: "Export for print", detail: "Export a PDF at 300 DPI (150 DPI is acceptable for larger formats viewed from far away) in CMYK, and order one proof before a full run." },
    ],
    combos: [
      { pair: "ChatGPT Images 2.0 + Canva Magic Layers", why: "Get a strong composition with good text from the model, then make every element editable so you can fix details without regenerating." },
      { pair: "Adobe Express AI Assistant + brand assets", why: "Describe changes in plain English while your logo and colors stay put." },
      { pair: "Chat assistant copy + design tool", why: "Short, checked copy first means fewer redesigns when someone spots a wrong date." },
    ],
    cautions: [
      "Proofread the date, time, address and price yourself. AI text rendering is better, not perfect.",
      "Do not ask for a real artist's style, a celebrity's likeness or another brand's logo. Check each tool's commercial-use terms.",
      "Screens are RGB and print is CMYK. Bright AI colors can print duller, so order a proof.",
      "Canva Magic Layers is still a beta feature and draws on a shared monthly AI allowance.",
    ],
    keywords: ["AI poster maker", "event poster AI", "18x24 poster template", "Canva Magic Layers", "ChatGPT Images 2.0 poster"],
  },
  {
    slug: "pamphlet",
    category: "Design & print",
    title: "AI for Brochures, Flyers and Menus (October 2026)",
    description: "Lay out tri-fold brochures, flyers and menus with Canva, Adobe Express, ChatGPT Images 2.0 and Gamma, using real US Letter panel sizes, bleed and safe zones.",
    checked: "2026-10-20",
    intro: "Brochures and menus are mostly about words and folding, so AI helps most with copy, illustrations and a first layout. The fold math still matters: a US Letter tri-fold has one narrower panel, and getting that wrong is the most common reason a print job comes back crooked.",
    tools: [
      { name: "Canva (with Magic Layers)", maker: "Canva", audience: "Shops, restaurants and nonprofits", what: "Generate visuals by prompt and edit in the Canva editor. Magic Layers turns a flat AI image into editable layers with real text boxes (public beta in the US, UK, Canada and Australia).", source: PETAPIXEL_CANVA },
      { name: "Adobe Express AI Assistant", maker: "Adobe", audience: "People who want to edit by describing changes", what: "Conversational design editing that changes specific fonts, images or layers while keeping the rest of the layout, using Firefly and third-party models. Beta.", source: EWEEK_ADOBE },
      { name: "ChatGPT Images 2.0 (gpt-image-2)", maker: "OpenAI", audience: "Illustrations, food shots and cover images", what: "Generates up to 10 style-consistent images per request with readable multilingual text, useful for a matching set of panel illustrations or menu sections.", source: NEUROHIVE_IMAGES },
      { name: "Gamma", audience: "Text-heavy guides and handouts", what: "Besides decks, builds documents and landing pages from an outline, handy when the brochure also needs a web version.", price: "Free plan; paid from $9/seat/month billed annually (2026-06)", source: ZAPIER_DECKS },
    ],
    workflow: [
      { step: "Choose the fold", detail: "For a Letter (8.5 x 11 in) roll-fold tri-fold, the two outer panels are about 3.69 in and the tuck-in panel about 3.62 in. A Z-fold uses three equal panels of about 3.67 in. Legal (8.5 x 14) and Tabloid (11 x 17) give more room." },
      { step: "Write panel by panel", detail: "Ask a chat assistant for copy sized to each panel: cover, inside three panels, back with contact info and a call to action. Menus need prices and allergen notes you supply, not ones AI guesses." },
      { step: "Generate a matching image set", detail: "Request all illustrations in one ChatGPT Images 2.0 batch so the style stays consistent across panels." },
      { step: "Lay out with bleed and margins", detail: "Build in Canva or Adobe Express with 0.125 in bleed and keep text 0.25 in from folds and trim. Use Magic Layers if you started from a flat AI image." },
      { step: "Fold a paper test", detail: "Print on your office printer, fold it, and read it in the order a customer would before sending the PDF to the printer." },
    ],
    combos: [
      { pair: "Chat assistant copy + Canva template", why: "Get concise panel copy first and pour it into a fold-correct template, instead of fighting text overflow later." },
      { pair: "ChatGPT Images batch + Adobe Express", why: "A consistent image set plus conversational edits keeps a multi-panel piece looking like one design." },
      { pair: "Gamma document + printed brochure", why: "Publish the same content as a web page and link it with a QR code on the back panel." },
    ],
    cautions: [
      "Check every price, phone number, address and opening hour yourself. AI will happily fill blanks with plausible guesses.",
      "Menu allergen and nutrition claims carry legal risk. Only print what you have verified for your kitchen.",
      "If you use customer quotes or reviews, the FTC's 2024 rule bans fake or AI-generated testimonials (penalties of up to $51,744 per violation).",
      "Canva Magic Layers and the Adobe Express AI Assistant were both still beta features at last check.",
    ],
    keywords: ["AI brochure maker", "tri-fold brochure template 8.5x11", "AI flyer maker", "restaurant menu maker AI", "Canva brochure AI"],
  },
  {
    slug: "ad-image",
    category: "Marketing & ads",
    title: "AI for Product Photos and Ad Images (October 2026)",
    description: "Turn one product photo into ad creatives with Google Pomelli, ChatGPT Images 2.0, Canva and Amazon's Creative Studio, plus Meta and Google AI labels and FTC rules.",
    checked: "2026-10-20",
    intro: "For small sellers, the biggest 2026 change is that a single phone photo of a product can become a full set of studio and lifestyle shots in minutes. The work that remains is keeping the product accurate, resizing for each placement, and staying on the right side of platform AI labels and FTC rules.",
    tools: [
      { name: "Pomelli Photoshoot", maker: "Google Labs", audience: "Small and mid-size retailers", what: "Turns one basic product photo into studio and lifestyle variations that match your brand profile (Business DNA). Powered by Nano Banana; outputs carry SynthID watermarks. Public beta in English in the US, Canada, Australia and New Zealand.", price: "Free (2026-02)", source: VAIZLE_POMELLI },
      { name: "ChatGPT Images 2.0 (gpt-image-2)", maker: "OpenAI", audience: "Marketers making many variants", what: "Up to 10 style-consistent images per request, ratios from 1:1 to 9:16 and 16:9, readable text for headlines and offers. Also available via API.", price: "API about $0.21 per 1024x1024 high-quality image (2026-04)", source: NEUROHIVE_IMAGES },
      { name: "Amazon Ads Creative Studio (AI agent)", maker: "Amazon Ads", audience: "Amazon sellers and brands", what: "A chat-based creative partner that researches your product and audience, proposes concepts and taglines, and produces display and video ads for Sponsored Display, Sponsored Brands, Brand Stores and Amazon DSP. Beta.", price: "No additional cost beyond ad spend (2025-09)", source: AMAZON_CREATIVE },
      { name: "Canva Magic Layers", maker: "Canva", audience: "Anyone resizing and editing AI creatives", what: "Splits a flat AI image into editable layers so you can change the offer text or swap the background without regenerating the product.", source: PETAPIXEL_CANVA },
    ],
    workflow: [
      { step: "Shoot a clean reference", detail: "Photograph the product in even light on a plain background, from the angle customers care about. Every AI variant inherits this photo's accuracy." },
      { step: "Generate scenes", detail: "Run the photo through Pomelli Photoshoot or ChatGPT Images 2.0 for studio and lifestyle versions. Ask for several in one batch so the look stays consistent." },
      { step: "Check the product", detail: "Compare each image with the real item: color, logo, label text, size and parts. Reject any image that changes what the customer would receive." },
      { step: "Resize per placement", detail: "Make square, vertical 9:16 and wide versions, and edit the offer text in Canva with Magic Layers. Amazon sellers can let Creative Studio build placement-ready ads directly." },
      { step: "Label and launch", detail: "Declare AI-edited assets where the platform asks (Google Ads lets you mark them). Keep notes on which tool made which file." },
    ],
    combos: [
      { pair: "Pomelli Photoshoot + Canva", why: "Free brand-consistent scenes from Pomelli, then quick text and size changes in Canva." },
      { pair: "ChatGPT Images 2.0 + A/B testing", why: "Batch generation makes it cheap to test several backgrounds or headlines against each other." },
      { pair: "Amazon Creative Studio + Sponsored Brands", why: "The agent pulls from your product pages and Brand Store, so creatives stay aligned with the listing." },
    ],
    cautions: [
      "An ad image must show the product as it really is. Altering features, size or contents can be deceptive advertising under FTC rules.",
      "Meta labels ads made or significantly edited with its generative tools and can apply \"AI info\" labels to images from third-party tools. Google rolled out AI disclosure settings for ads in July 2026.",
      "New York requires a conspicuous disclosure when an ad uses an AI-generated synthetic performer, in effect since 2026-06-09.",
      "Do not create fake reviews or testimonials with AI. The FTC rule in effect since 2024-10-21 covers AI-generated reviews.",
    ],
    keywords: ["AI product photography", "AI ad creative generator", "Google Pomelli Photoshoot", "Amazon Creative Studio AI", "AI banner maker"],
  },
  {
    slug: "ad-video",
    category: "Marketing & ads",
    title: "AI for Short Ad and Product Videos (October 2026)",
    description: "Make short ad and product videos with Veo 3.1 in Flow, Kling 3.0, Runway, HeyGen and Amazon's ad agent now that Sora is gone, with US disclosure rules.",
    checked: "2026-10-20",
    intro: "OpenAI discontinued Sora in 2026, so most US marketers now build short ads with Google Veo 3.1, Kling or Runway. Clips are still short (often 5 to 10 seconds), so a good ad is several generated shots stitched together with real product footage, captions and sound.",
    tools: [
      { name: "Veo 3.1 in Flow", maker: "Google", audience: "Ads that need sound in one pass", what: "Generates synchronized dialogue, ambient sound and music with the video, and Flow is the editor for extending scenes.", price: "Google AI Pro $19.99/month; AI Ultra $249.99/month; API with audio $0.20 to $0.40/second (2026-06)", source: DUPPLE_VIDEO },
      { name: "Kling 3.0", audience: "Budget-conscious creators", what: "Physics-aware motion and Motion Brush. Native audio exists but is less polished than Veo's. Free tier gives daily credits.", price: "Free 66 credits/day; Standard $6.99/month (2026-06)", source: DUPPLE_VIDEO },
      { name: "Runway Gen-4.5", maker: "Runway", audience: "Editors who need control after generation", what: "Post-generation text editing (Aleph) and 4K/ProRes export on Pro and above.", price: "Standard $12/month, Pro $28/month, billed annually (2026-09)", source: PIKTOCHART_SORA },
      { name: "HeyGen", maker: "HeyGen", audience: "Talking-head explainers and spokesperson ads", what: "Avatar videos with lip-synced dubbing in more than 120 languages, useful for Spanish-language versions of the same ad.", price: "Creator $24/month (2026-09)", source: PIKTOCHART_SORA },
      { name: "Amazon Ads Creative Studio (AI agent)", maker: "Amazon Ads", audience: "Amazon sellers", what: "Builds storyboards with scene scripts, then produces multi-scene videos with animation, voiceover and music for Sponsored Brands video and other Amazon placements. Beta.", price: "No additional cost beyond ad spend (2025-09)", source: AMAZON_CREATIVE },
    ],
    workflow: [
      { step: "Script in shots", detail: "Write a 15 to 30 second script as 3 to 6 shots: hook, problem, product in use, proof, offer. Ask a chat assistant to tighten the hook to the first two seconds." },
      { step: "Generate each shot", detail: "Make each shot as its own clip in Veo 3.1 or Kling, using a real product photo as the reference image so packaging and color stay accurate." },
      { step: "Mix in real footage", detail: "Use actual product footage for close-ups, labels and anything a customer will judge the purchase on. AI clips work best for mood and setting." },
      { step: "Edit and caption", detail: "Assemble in Flow, Runway or your usual editor. Add captions, since many people watch muted, and export 9:16 for Reels, TikTok and Shorts plus a 16:9 or 1:1 cut." },
      { step: "Disclose and publish", detail: "Mark AI-generated assets where ad platforms ask, and add a conspicuous disclosure if a synthetic person appears in an ad running in New York." },
    ],
    combos: [
      { pair: "Veo 3.1 + real product B-roll", why: "Veo handles scenes and sound; real footage keeps product claims honest." },
      { pair: "Kling free tier + Runway editing", why: "Explore cheaply with Kling, then refine the keepers in Runway." },
      { pair: "HeyGen spokesperson + localized dubbing", why: "One script can become English and Spanish versions without reshooting." },
    ],
    cautions: [
      "Sora is no longer available (app and API discontinued in 2026). Move old Sora workflows to another tool.",
      "New York requires a conspicuous disclosure for ads that use an AI-generated synthetic performer, effective 2026-06-09. Audio-only ads and translation-only uses are exempt.",
      "An AI avatar presented as a real customer can be a fake testimonial under the FTC's 2024 rule. Do not imply real experience that did not happen.",
      "Do not use real people's faces or voices, or copyrighted music, without permission. Video pricing is credit-based and changes often.",
    ],
    keywords: ["AI video ad maker", "Veo 3.1 Flow", "Kling AI pricing", "Runway Gen-4.5", "Sora alternatives 2026", "AI product video"],
  },
];
