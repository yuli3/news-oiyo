// 2026-11-14 CHOSEUN: FinancialJuice·오선식 "실시간에 가까운" 경제 헤드라인 와이어.
// 원칙
// - 런타임 LLM 없음. 발행처 공개 RSS 의 제목·링크·시각만 모으고, 규칙으로 분류(주제·지역·영향도)한다.
// - 저작권: 본문·요약 재게시 없음. 제목 + 원문 링크 + 출처 이름만. 페이월·차단은 우회하지 않는다.
// - 이 파일은 순수 함수만 둔다(Pages Function·MCP·Node 테스트 공용). 네트워크는 호출자가 넘긴다.

export interface WireSource {
  id: string;
  name: string;
  url: string;
  /** 1차 출처(중앙은행·정부·감독기관). 금리·지표·환율 발표면 '주목'. */
  primary?: boolean;
  region: "KR" | "US" | "GLOBAL";
  maxAgeHours: number;
}

// 피드 목록. 앞의 9개는 docs/finance-desk.md 에서 Mac mini 로 검증된 금융 데스크 피드와 같다
// (2026-11-14 수집에서도 전부 항목이 들어왔다). 연합뉴스 경제·마켓은 와이어 전용 추가분이며
// 실패해도 다른 피드는 그대로 나간다(sources[].ok 로 보인다).
export const WIRE_SOURCES: readonly WireSource[] = [
  { id: "yna-economy", name: "연합뉴스 경제", url: "https://www.yna.co.kr/rss/economy.xml", region: "KR", maxAgeHours: 24 },
  { id: "yna-market", name: "연합뉴스 마켓+", url: "https://www.yna.co.kr/rss/market.xml", region: "KR", maxAgeHours: 24 },
  { id: "hankyung-finance", name: "한국경제 증권", url: "https://www.hankyung.com/feed/finance", region: "KR", maxAgeHours: 24 },
  { id: "hankyung-realestate", name: "한국경제 부동산", url: "https://www.hankyung.com/feed/realestate", region: "KR", maxAgeHours: 36 },
  { id: "mk-economy", name: "매일경제 경제", url: "https://www.mk.co.kr/rss/30100041/", region: "KR", maxAgeHours: 24 },
  { id: "bok", name: "한국은행", url: "https://www.bok.or.kr/portal/bbs/P0000559/news.rss?menuNo=200690", primary: true, region: "KR", maxAgeHours: 72 },
  { id: "moef", name: "재정경제부", url: "https://mofe.go.kr/com/detailRssTagService.do?bbsId=MOSFBBS_000000000028", primary: true, region: "KR", maxAgeHours: 48 },
  { id: "federal-reserve", name: "Federal Reserve", url: "https://www.federalreserve.gov/feeds/press_all.xml", primary: true, region: "US", maxAgeHours: 72 },
  { id: "sec", name: "U.S. SEC", url: "https://www.sec.gov/news/pressreleases.rss", primary: true, region: "US", maxAgeHours: 48 },
  { id: "cnbc-finance", name: "CNBC", url: "https://www.cnbc.com/id/10000664/device/rss/rss.html", region: "US", maxAgeHours: 24 },
  { id: "coindesk", name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/", region: "GLOBAL", maxAgeHours: 24 },
];

export type WireTag = "rates" | "fx" | "stocks" | "crypto" | "realestate" | "commodities" | "macro" | "policy" | "earnings";

export const TAG_LABELS: Record<WireTag, string> = {
  rates: "금리·채권",
  fx: "환율",
  stocks: "증시",
  crypto: "크립토",
  realestate: "부동산",
  commodities: "원자재",
  macro: "지표",
  policy: "정책",
  earnings: "실적",
};

// 한국어는 단어 경계가 없으니 부분 문자열, 영어는 \b 경계로 잡는다.
const RULES: [WireTag, RegExp][] = [
  ["rates", /기준금리|금리|국채|채권|국고채|회사채|\b(?:rates?|yields?|treasur(?:y|ies)|bonds?|fomc|rate (?:cut|hike)s?)\b/i],
  ["fx", /환율|원[·.\s-]?달러|달러[화값]|엔화|엔저|위안화|외환|\b(?:dollar|yen|euro|yuan|currenc(?:y|ies)|forex|fx)\b/i],
  ["stocks", /코스피|코스닥|증시|주가|상장|공모주|나스닥|다우|\b(?:s&p|nasdaq|dow|stocks?|shares|equit(?:y|ies)|ipo|etfs?)\b/i],
  ["crypto", /비트코인|이더리움|가상자산|암호화폐|코인|스테이블코인|\b(?:bitcoin|ether(?:eum)?|crypto\w*|stablecoins?|btc|eth|xrp|solana)\b/i],
  ["realestate", /부동산|아파트|전세|월세|주택|분양|집값|재건축|재개발|청약|\b(?:housing|mortgages?|real estate|home sales)\b/i],
  ["commodities", /유가|원유|금값|금 ?가격|구리|원자재|\b(?:oil|crude|brent|wti|gold|copper|opec)\b/i],
  ["macro", /물가|소비자물가|생산자물가|성장률|GDP|고용|실업률|수출|수입|무역수지|경상수지|\b(?:cpi|pce|ppi|gdp|inflation|payrolls?|jobs report|unemployment|retail sales|pmi)\b/i],
  ["policy", /정부|재정경제부|기재부|금융위|금감원|한국은행|한은|세제|세법|규제|정책|법안|관세|추경|예산|\b(?:sec|fed|federal reserve|regulat\w*|tariffs?|sanctions?|policy|treasury secretary)\b/i],
  ["earnings", /실적|영업이익|순이익|매출|어닝|분기|배당|\b(?:earnings|revenue|profits?|quarterly results|dividends?)\b/i],
];

// 시장을 움직일 만한 신호. 너무 넓으면 전부 빨간색이 되므로 '사건'만 잡는다.
const HIGH_IMPACT =
  /속보|긴급|\[단독\]|기준금리|금리 ?(?:인하|인상|동결)|빅컷|FOMC|금통위|서킷브레이커|사이드카|폭락|폭등|급락|급등|디폴트|파산|관세 ?(?:부과|인상)|비상|\b(?:breaking|rate decision|cuts? rates|raises? rates|holds? rates|fomc|cpi|payrolls|plunges?|soars?|crash\w*|halt(?:s|ed)?|default|bankrupt\w*|tariffs?)\b/i;

export interface WireItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceName: string;
  publishedAt: string | null;
  region: WireSource["region"];
  tags: WireTag[];
  impact: "high" | "normal";
}

export interface WireSourceStatus { id: string; name: string; ok: boolean; count: number }
export interface Wire { generatedAt: string; items: WireItem[]; sources: WireSourceStatus[] }

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”" };

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function unwrap(s: string): string {
  return s.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1");
}

function tagText(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? unwrap(m[1]).trim() : "";
}

function cleanTitle(s: string): string {
  return decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim().slice(0, 240);
}

function toIso(s: string): string | null {
  if (!s) return null;
  const t = Date.parse(s.trim());
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

export interface RawHeadline { title: string; url: string; publishedAt: string | null }

/** RSS 2.0 <item> 과 Atom <entry> 를 모두 읽는다. https 링크만 남긴다. */
export function parseFeed(xml: string): RawHeadline[] {
  const out: RawHeadline[] = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  for (const b of blocks) {
    const title = cleanTitle(tagText(b, "title"));
    let link = decodeEntities(tagText(b, "link"));
    if (!link) link = decodeEntities((b.match(/<link[^>]*href="([^"]+)"/i) ?? [])[1] ?? "");
    link = link.trim().replace(/^http:\/\//i, "https://");
    if (!title || !/^https:\/\/[^\s<>"]+$/i.test(link)) continue;
    const publishedAt = toIso(tagText(b, "pubDate") || tagText(b, "dc:date") || tagText(b, "published") || tagText(b, "updated"));
    out.push({ title, url: link, publishedAt });
  }
  return out;
}

export function classify(title: string, source?: Pick<WireSource, "primary">): { tags: WireTag[]; impact: WireItem["impact"] } {
  const tags = RULES.filter(([, re]) => re.test(title)).map(([tag]) => tag);
  // 1차 출처는 금리·지표·환율 발표일 때만 '주목'. 인사·제재 공고까지 빨갛게 칠하면 신호가 묻힌다.
  const primaryMacro = !!source?.primary && tags.some((t) => t === "rates" || t === "macro" || t === "fx");
  const impact = primaryMacro || HIGH_IMPACT.test(title) ? "high" : "normal";
  return { tags, impact };
}

/** 제목 정규화: 언론사 접두어([속보] 등)·문장부호·공백을 뺀 소문자. 같은 사건의 중복 송고를 묶는다. */
export function normTitle(title: string): string {
  return title.toLowerCase().replace(/\[[^\]]{1,8}\]/g, "").replace(/[^\p{L}\p{N}]+/gu, "");
}

function hashId(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return `w${(h >>> 0).toString(36)}`;
}

export interface FeedResult { source: WireSource; xml: string | null }

/** 피드 결과들을 하나의 와이어로 합친다. 최신순, URL·제목 중복 제거, 나이 제한, 최대 limit 건. */
export function buildWire(results: readonly FeedResult[], now = new Date(), limit = 120): Wire {
  const seenUrl = new Set<string>();
  const seenTitle = new Set<string>();
  const items: WireItem[] = [];
  const sources: WireSourceStatus[] = [];
  for (const { source, xml } of results) {
    const parsed = xml ? parseFeed(xml) : [];
    let count = 0;
    for (const h of parsed) {
      if (h.publishedAt) {
        const age = now.getTime() - Date.parse(h.publishedAt);
        if (age > source.maxAgeHours * 3_600_000) continue;
      }
      const nt = normTitle(h.title);
      if (seenUrl.has(h.url) || (nt && seenTitle.has(nt))) continue;
      seenUrl.add(h.url);
      if (nt) seenTitle.add(nt);
      const { tags, impact } = classify(h.title, source);
      items.push({ id: hashId(h.url), title: h.title, url: h.url, source: source.id, sourceName: source.name, publishedAt: h.publishedAt, region: source.region, tags, impact });
      count++;
    }
    sources.push({ id: source.id, name: source.name, ok: xml !== null && parsed.length > 0, count });
  }
  // 시각이 없는 항목은 맨 뒤. 미래 시각(피드 오류)은 지금으로 본다.
  const ts = (i: WireItem) => (i.publishedAt ? Math.min(Date.parse(i.publishedAt), now.getTime()) : -Infinity);
  items.sort((a, b) => ts(b) - ts(a));
  return { generatedAt: now.toISOString(), items: items.slice(0, limit), sources };
}

export type Fetcher = (url: string) => Promise<string | null>;

/** 모든 피드를 병렬로 받는다. 하나가 실패해도 나머지는 나간다. */
export async function collectWire(fetcher: Fetcher, sources: readonly WireSource[] = WIRE_SOURCES, now = new Date()): Promise<Wire> {
  const results = await Promise.all(
    sources.map(async (source) => {
      try { return { source, xml: await fetcher(source.url) }; } catch { return { source, xml: null }; }
    }),
  );
  return buildWire(results, now);
}

/** 쿼리 필터(MCP·API 공용). tag·impact·region 은 선택. */
export function filterWire(items: readonly WireItem[], opts: { tag?: string; impact?: string; region?: string; limit?: number } = {}): WireItem[] {
  return items
    .filter((i) => !opts.tag || i.tags.includes(opts.tag as WireTag))
    .filter((i) => !opts.impact || i.impact === opts.impact)
    .filter((i) => !opts.region || i.region === opts.region)
    .slice(0, opts.limit ?? items.length);
}
