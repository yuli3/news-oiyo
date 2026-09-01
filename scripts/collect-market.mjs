#!/usr/bin/env node
// 증시 수집기 — company-brain/reports/market-latest.json 을 만든다.
//
// 왜 repo 안에 있나: 이전 정본은 company-brain/scripts/stock_analysis.py +
// 런타임 크론이었다. 크론이 멈추면 sync-news.mjs 는 낡은 JSON 을 그대로
// 복사했고, 사이트 증시는 며칠씩 멈춘 채 발행됐다. 뉴스 수집과 같이
// `npm run update` 한 명령이 시세까지 갱신해야 어느 런타임에서든 같은
// 결과가 나온다.
//
// 소스 우선순위: Yahoo chart v8 → NASDAQ historical → 네이버(KOSPI/KOSDAQ)
// → CNBC(지수 종가·일간만). Yahoo 가 429 를 주면 그 실행에서는 끈다.
//
// usage:
//   node scripts/collect-market.mjs
//   node scripts/collect-market.mjs --dry-run
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRAIN = join(process.env.HOME, "coding", "company-brain");
const OUT = join(BRAIN, "reports", "market-latest.json");
const DRY = process.argv.includes("--dry-run");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// name 은 기존 스냅샷과 동일해야 UI 라벨이 안 바뀐다.
const ROSTER = {
  indices: [
    ["S&P 500", "^GSPC"],
    ["Nasdaq", "^IXIC"],
    ["Dow Jones", "^DJI"],
    ["KOSPI", "^KS11"],
    ["KOSDAQ", "^KQ11"],
  ],
  ai_stocks: [
    ["NVIDIA (AI 반도체)", "NVDA"],
    ["AMD (AI GPU)", "AMD"],
    ["Alphabet (Gemini)", "GOOGL"],
    ["Microsoft (OpenAI·Copilot)", "MSFT"],
    ["Meta (Llama)", "META"],
    ["Broadcom (AI 네트워킹)", "AVGO"],
    ["TSMC (파운드리)", "TSM"],
    ["Palantir (AI 분석)", "PLTR"],
  ],
  ai_etf: [
    ["BOTZ (로보틱스·AI)", "BOTZ"],
    ["AIQ (AI·기술)", "AIQ"],
    ["ROBO (로보틱스)", "ROBO"],
    ["IRBO (AI·로보틱스)", "IRBO"],
    ["CHAT (생성형 AI)", "CHAT"],
    ["QQQ (나스닥100)", "QQQ"],
  ],
  monthly_div_stocks: [
    ["Realty Income (월배당 리츠)", "O"],
    ["Main Street (월배당 BDC)", "MAIN"],
    ["STAG Industrial (월배당 리츠)", "STAG"],
    ["Agree Realty (월배당 리츠)", "ADC"],
    ["LTC Properties (월배당 리츠)", "LTC"],
    ["Phillips Edison (월배당 리츠)", "PECO"],
  ],
  monthly_div_etf: [
    ["JEPI (JPM 프리미엄·월배당)", "JEPI"],
    ["JEPQ (나스닥 프리미엄·월배당)", "JEPQ"],
    ["QYLD (나스닥 커버드콜·월배당)", "QYLD"],
    ["DIVO (배당+콜·월배당)", "DIVO"],
    ["SPHD (저변동 고배당·월배당)", "SPHD"],
    ["SDIV (글로벌 초고배당·월배당)", "SDIV"],
  ],
  stocks: [
    ["Apple", "AAPL"],
    ["NVIDIA", "NVDA"],
    ["Microsoft", "MSFT"],
    ["Tesla", "TSLA"],
  ],
  dividend_etf: [
    ["SCHD (배당성장·분기)", "SCHD"],
    ["VYM (고배당·분기)", "VYM"],
    ["SPYD (S&P 고배당·분기)", "SPYD"],
    ["DGRO (배당성장·분기)", "DGRO"],
  ],
};

const NASDAQ = {
  "^IXIC": { symbol: "COMP", assetclass: "index" },
  NVDA: { symbol: "NVDA", assetclass: "stocks" },
  AMD: { symbol: "AMD", assetclass: "stocks" },
  GOOGL: { symbol: "GOOGL", assetclass: "stocks" },
  MSFT: { symbol: "MSFT", assetclass: "stocks" },
  META: { symbol: "META", assetclass: "stocks" },
  AVGO: { symbol: "AVGO", assetclass: "stocks" },
  TSM: { symbol: "TSM", assetclass: "stocks" },
  PLTR: { symbol: "PLTR", assetclass: "stocks" },
  AAPL: { symbol: "AAPL", assetclass: "stocks" },
  TSLA: { symbol: "TSLA", assetclass: "stocks" },
  O: { symbol: "O", assetclass: "stocks" },
  MAIN: { symbol: "MAIN", assetclass: "stocks" },
  STAG: { symbol: "STAG", assetclass: "stocks" },
  ADC: { symbol: "ADC", assetclass: "stocks" },
  LTC: { symbol: "LTC", assetclass: "stocks" },
  PECO: { symbol: "PECO", assetclass: "stocks" },
  BOTZ: { symbol: "BOTZ", assetclass: "etf" },
  AIQ: { symbol: "AIQ", assetclass: "etf" },
  ROBO: { symbol: "ROBO", assetclass: "etf" },
  IRBO: { symbol: "IRBO", assetclass: "etf" },
  CHAT: { symbol: "CHAT", assetclass: "etf" },
  QQQ: { symbol: "QQQ", assetclass: "etf" },
  JEPI: { symbol: "JEPI", assetclass: "etf" },
  JEPQ: { symbol: "JEPQ", assetclass: "etf" },
  QYLD: { symbol: "QYLD", assetclass: "etf" },
  DIVO: { symbol: "DIVO", assetclass: "etf" },
  SPHD: { symbol: "SPHD", assetclass: "etf" },
  SDIV: { symbol: "SDIV", assetclass: "etf" },
  SCHD: { symbol: "SCHD", assetclass: "etf" },
  VYM: { symbol: "VYM", assetclass: "etf" },
  SPYD: { symbol: "SPYD", assetclass: "etf" },
  DGRO: { symbol: "DGRO", assetclass: "etf" },
};

const NAVER_INDEX = { "^KS11": "KOSPI", "^KQ11": "KOSDAQ" };
const CNBC_INDEX = { "^GSPC": ".SPX", "^DJI": ".DJI", "^IXIC": ".IXIC" };
// S&P·Dow 일간 종가는 CNBC 지수, 20일 수익률·이평 대비는 추종 ETF 시계열.
const PROXY_ETF = { "^GSPC": { symbol: "SPY", assetclass: "etf" }, "^DJI": { symbol: "DIA", assetclass: "etf" } };

let yahooDisabled = false;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round2 = (n) => Math.round(n * 100) / 100;
const pct = (a, b) => (a == null || b == null || b === 0 ? null : round2((a / b - 1) * 100));

async function get(url, { retries = 1 } = {}) {
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "application/json,text/plain,*/*" },
        signal: AbortSignal.timeout(20_000),
      });
      const text = await res.text();
      if (res.status === 429) {
        if (url.includes("finance.yahoo.com")) yahooDisabled = true;
        throw new Error("HTTP 429");
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return text;
    } catch (error) {
      if (i >= retries) {
        console.error(`  실패 ${url} — ${error.message}`);
        return "";
      }
      await sleep(1500 * (i + 1));
    }
  }
}

function statsFromCloses(closes) {
  const h = closes.filter((x) => Number.isFinite(x.close));
  if (h.length < 2) return null;
  const last = h.at(-1).close;
  const date = h.at(-1).date;
  const dayChange = pct(last, h.at(-2).close);
  if (h.length < 21) {
    return { date, last: round2(last), dayChange, ret20: null, ma5: null, ma20: null, hi20: null, lo20: null, vsMa20: null, signal: "" };
  }
  const lastN = (n) => h.slice(-n).map((x) => x.close);
  const ma5 = round2(lastN(5).reduce((s, v) => s + v, 0) / 5);
  const w20 = lastN(20);
  const ma20 = round2(w20.reduce((s, v) => s + v, 0) / 20);
  const vsMa20 = pct(last, ma20);
  let signal = "";
  if (vsMa20 != null) {
    if (vsMa20 > 3) signal = "20일선 대비 강세";
    else if (vsMa20 < -3) signal = "20일선 대비 약세";
  }
  return {
    date,
    last: round2(last),
    dayChange,
    ret20: pct(last, h.at(-21).close),
    ma5,
    ma20,
    hi20: round2(Math.max(...w20)),
    lo20: round2(Math.min(...w20)),
    vsMa20,
    signal,
  };
}

function rowFromCloses(closes, extra = {}) {
  const stats = statsFromCloses(closes);
  if (!Number.isFinite(extra.last)) return stats;
  const date = extra.date ?? stats?.date;
  if (!date) return null;
  // extra.last 는 지수 종가, closes 는 추종 ETF일 수 있으므로 달러 이평은 섞지 않는다.
  return {
    date,
    last: round2(extra.last),
    dayChange: extra.dayChange ?? stats?.dayChange ?? null,
    ret20: stats?.ret20 ?? null,
    ma5: null,
    ma20: null,
    hi20: null,
    lo20: null,
    vsMa20: stats?.vsMa20 ?? null,
    signal: stats?.signal ?? "",
  };
}

async function yahooCloses(symbol) {
  if (yahooDisabled) return null;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=3mo&interval=1d`;
  const raw = await get(url, { retries: 0 });
  if (!raw || raw.startsWith("Too Many")) {
    yahooDisabled = true;
    return null;
  }
  let json;
  try { json = JSON.parse(raw); } catch { yahooDisabled = true; return null; }
  const result = json?.chart?.result?.[0];
  const timestamps = result?.timestamp;
  const close = result?.indicators?.quote?.[0]?.close;
  if (!Array.isArray(timestamps) || !Array.isArray(close)) return null;
  const out = [];
  for (let i = 0; i < timestamps.length; i++) {
    if (!Number.isFinite(close[i])) continue;
    out.push({ date: new Date(timestamps[i] * 1000).toISOString().slice(0, 10), close: close[i] });
  }
  return out.length ? out : null;
}

function parseNasdaqDate(s) {
  const [m, d, y] = String(s).split("/");
  if (!y) return "";
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function parseMoney(s) {
  const n = Number(String(s ?? "").replace(/[$,]/g, "").replace(/--/g, ""));
  return Number.isFinite(n) ? n : null;
}

async function nasdaqCloses(symbol, assetclass) {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 100);
  const from = start.toISOString().slice(0, 10);
  const to = end.toISOString().slice(0, 10);
  const url = `https://api.nasdaq.com/api/quote/${encodeURIComponent(symbol)}/historical?assetclass=${assetclass}&fromdate=${from}&todate=${to}&limit=80`;
  const raw = await get(url, { retries: 1 });
  if (!raw) return null;
  let json;
  try { json = JSON.parse(raw); } catch { return null; }
  const rows = json?.data?.tradesTable?.rows;
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const out = [];
  for (const row of rows) {
    const date = parseNasdaqDate(row.date);
    const close = parseMoney(row.close);
    if (date && close != null) out.push({ date, close });
  }
  out.sort((a, b) => a.date.localeCompare(b.date));
  return out.length ? out : null;
}

async function naverCloses(symbol) {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 100);
  const fmt = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
  const url = `https://api.finance.naver.com/siseJson.naver?symbol=${encodeURIComponent(symbol)}&requestType=1&startTime=${fmt(start)}&endTime=${fmt(end)}&timeframe=day`;
  const raw = await get(url, { retries: 1 });
  if (!raw) return null;
  let rows;
  try { rows = JSON.parse(raw.trim().replace(/'/g, "\"")); } catch { return null; }
  if (!Array.isArray(rows) || rows.length < 2) return null;
  const out = [];
  for (const row of rows.slice(1)) {
    const stamp = String(row[0] ?? "");
    const close = Number(row[4]);
    if (stamp.length === 8 && Number.isFinite(close)) {
      out.push({ date: `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}`, close });
    }
  }
  out.sort((a, b) => a.date.localeCompare(b.date));
  return out.length ? out : null;
}

function parseCnbcPct(q) {
  const raw = q.change_pct ?? q.change_percent ?? q.pctChange ?? q.changePercent;
  if (raw == null || raw === "") return null;
  const n = Number(String(raw).replace(/%/g, ""));
  return Number.isFinite(n) ? n : null;
}

async function cnbcQuote(cnbcSymbol) {
  const url = `https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=${encodeURIComponent(cnbcSymbol)}&requestMethod=itv&noform=1&partnerId=2&output=json`;
  const raw = await get(url, { retries: 1 });
  if (!raw) return null;
  let json;
  try { json = JSON.parse(raw); } catch { return null; }
  let q = json?.FormattedQuoteResult?.FormattedQuote;
  if (Array.isArray(q)) q = q[0];
  if (!q || typeof q !== "object") return null;
  const last = parseMoney(q.last);
  if (!Number.isFinite(last)) return null;
  const date = String(q.last_time ?? "").slice(0, 10);
  let dayChange = parseCnbcPct(q);
  if (dayChange == null) {
    const prev = parseMoney(q.previous_day_closing ?? q.previousClose ?? q.previous_close);
    dayChange = pct(last, prev);
  }
  if (dayChange == null) {
    const quick = `https://quote.cnbc.com/quote-html-webservice/quote.htm?symbols=${encodeURIComponent(cnbcSymbol)}&requestMethod=quick&noform=1&partnerId=2&output=json`;
    const qraw = await get(quick, { retries: 0 });
    try {
      const qj = JSON.parse(qraw);
      let qq = qj?.QuickQuoteResult?.QuickQuote;
      if (Array.isArray(qq)) qq = qq[0];
      dayChange = parseCnbcPct(qq ?? {});
    } catch { /* keep null */ }
  }
  return { last, date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10), dayChange };
}

async function closesFor(symbol) {
  const yahoo = await yahooCloses(symbol);
  if (yahoo?.length) return { closes: yahoo, extra: null, via: "yahoo" };

  const naver = NAVER_INDEX[symbol];
  if (naver) {
    const closes = await naverCloses(naver);
    if (closes?.length) return { closes, extra: null, via: "naver" };
  }

  const listed = NASDAQ[symbol];
  if (listed) {
    const closes = await nasdaqCloses(listed.symbol, listed.assetclass);
    if (closes?.length) return { closes, extra: null, via: "nasdaq" };
  }

  const cnbc = CNBC_INDEX[symbol];
  if (cnbc) {
    const quote = await cnbcQuote(cnbc);
    const proxy = PROXY_ETF[symbol];
    const closes = proxy ? (await nasdaqCloses(proxy.symbol, proxy.assetclass)) ?? [] : [];
    if (quote) return { closes, extra: quote, via: closes.length ? "cnbc+proxy" : "cnbc" };
  }
  return null;
}

async function main() {
  console.error("증시 수집 중…");
  const groups = {};
  let ok = 0;
  let fail = 0;
  const seen = new Map();

  for (const [gname, pairs] of Object.entries(ROSTER)) {
    const rows = [];
    for (const [name, symbol] of pairs) {
      let fetched = seen.get(symbol);
      if (!fetched) {
        fetched = await closesFor(symbol);
        seen.set(symbol, fetched);
        await sleep(120);
      }
      if (!fetched) {
        console.error(`  skip ${symbol} (${name})`);
        fail++;
        continue;
      }
      const row = rowFromCloses(fetched.closes, fetched.extra ?? {});
      if (!row) {
        console.error(`  skip ${symbol} (${name}) — 시계열 부족`);
        fail++;
        continue;
      }
      rows.push({ name, ...row });
      ok++;
      console.error(`  ${symbol} ${row.last} ${row.dayChange ?? "?"} (${fetched.via})`);
    }
    groups[gname] = rows;
  }

  const total = Object.values(groups).reduce((s, rows) => s + rows.length, 0);
  if (total === 0) {
    console.error("FAIL 시세 0건 — 기존 market-latest.json 을 덮지 않는다");
    process.exit(1);
  }

  const payload = {
    generatedAt: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    groups,
  };
  if (!DRY) {
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(OUT, `${JSON.stringify(payload, null, 1)}\n`, "utf8");
  }
  console.error(`${DRY ? "dry-run" : "작성"} ${total}행 (ok ${ok} · skip ${fail})${yahooDisabled ? " · yahoo=429 skipped" : ""}${DRY ? "" : ` → ${OUT}`}`);
}

await main();
