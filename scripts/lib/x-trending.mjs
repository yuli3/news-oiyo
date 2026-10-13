import { readFileSync } from 'node:fs';
const schema = JSON.parse(readFileSync(new URL('../../data/x-trending/schema.json', import.meta.url), 'utf8'));

// 2026-10-13 P0: validate the checked-in schema subset without runtime/network dependencies.
function check(value, rule, path) {
  if ('const' in rule && value !== rule.const) throw new TypeError(`${path}: invalid constant`);
  const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  if (rule.type && ![].concat(rule.type).some(t => t === type || t === 'integer' && Number.isInteger(value))) throw new TypeError(`${path}: invalid type`);
  if (type === 'number' && (!Number.isFinite(value) || value < (rule.minimum ?? -Infinity))) throw new TypeError(`${path}: invalid number`);
  if (type === 'string') {
    if (value.length < (rule.minLength ?? 0) || rule.pattern && !new RegExp(rule.pattern).test(value)) throw new TypeError(`${path}: invalid string`);
    if (rule.format === 'date-time' && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value)))) throw new TypeError(`${path}: invalid timestamp`);
    if (rule.format === 'uri') {
      const u = new URL(value);
      if (u.protocol !== 'https:' || !u.hostname || u.username || u.password) throw new TypeError(`${path}: invalid HTTPS URL`);
    }
  }
  if (type === 'array') value.forEach((v, i) => check(v, rule.items, `${path}[${i}]`));
  if (type === 'object') {
    for (const key of rule.required ?? []) if (!(key in value)) throw new TypeError(`${path}.${key}: required`);
    for (const [key, v] of Object.entries(value)) {
      if (!rule.properties[key]) throw new TypeError(`${path}.${key}: unknown field`);
      check(v, rule.properties[key], `${path}.${key}`);
    }
  }
}
export function validateXTrending(data) {
  check(data, schema, '$');
  const ids = new Set();
  const stories = new Set(data.stories.map(s => s.id));
  if (stories.size !== data.stories.length) throw new TypeError('duplicate story id');
  for (const post of data.posts) {
    if (ids.has(post.id)) throw new TypeError('duplicate post id');
    ids.add(post.id);
    const path = new URL(post.url).pathname.split('/');
    if (path[3] !== post.id || path[1].toLowerCase() !== post.author.username.toLowerCase()) throw new TypeError('post URL/id/author mismatch');
    if (post.story_id !== null && !stories.has(post.story_id)) throw new TypeError('unknown story_id');
    const age = Date.parse(data.collected_at) - Date.parse(post.created_at);
    if (age < 0 || age > data.window_hours * 3600000) throw new TypeError('post outside collection window');
  }
  return data;
}
export function normalizeUrl(value) {
  const url = new URL(value);
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, '').replace(/^twitter\.com$/, 'x.com');
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) if (/^utm_/i.test(key) || /^(fbclid|gclid|ref|s|t)$/i.test(key)) url.searchParams.delete(key);
  url.searchParams.sort();
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';
  return url.toString();
}
const tokens = value => new Set(value.normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []);
export function sameTitle(a, b) {
  const x = tokens(a), y = tokens(b);
  if (!x.size || !y.size) return false;
  const overlap = [...x].filter(t => y.has(t)).length;
  return overlap / new Set([...x, ...y]).size >= 0.8;
}
export function mergeXTrending(news, input, { minScore = 0, now = Date.now() } = {}) {
  validateXTrending(input);
  if (!Number.isFinite(minScore) || minScore < 0) throw new TypeError('minScore must be nonnegative');
  const age = now - Date.parse(input.collected_at);
  if (age < -300000) throw new TypeError('collection timestamp is in the future');
  const items = (news.days ?? []).flatMap(day => day.items ?? []);
  const stories = new Map(input.stories.map(s => [s.id, s]));
  const urls = new Set(), authors = new Map(), posts = [], duplicates = [];
  for (const post of [...input.posts].sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))) {
    if (post.score < minScore || post.metrics.impression < 1000) continue;
    const candidates = [post.url, ...post.links].map(normalizeUrl);
    const title = stories.get(post.story_id)?.name ?? post.text;
    const match = items.find(item => [item.url, item.canonicalUrl, item.discussionUrl].filter(Boolean).some(u => candidates.includes(normalizeUrl(u))) || sameTitle(title, item.title ?? ''));
    if (match) { duplicates.push({ post_id: post.id, news_id: match.id, url: post.url }); continue; }
    const author = post.author.username.toLowerCase();
    if ((authors.get(author) ?? 0) >= 2 || candidates.some(u => urls.has(u)) || posts.some(p => sameTitle(title, stories.get(p.story_id)?.name ?? p.text))) continue;
    candidates.forEach(u => urls.add(u));
    authors.set(author, (authors.get(author) ?? 0) + 1);
    posts.push(post);
  }
  // P0 keeps X reactions inside the isolated block; public news cards stay unchanged.
  return { ...news, x_trending: { ...input, posts, stories: input.stories.filter(s => posts.some(p => p.story_id === s.id)), duplicates, hidden: age > 30 * 3600000, min_score: minScore } };
}
