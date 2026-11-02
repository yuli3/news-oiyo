import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("subscription failure copy does not deny retained uncertain dispatch records", () => {
  const html = readFileSync(new URL("../../dist/subscribe/index.html", import.meta.url), "utf8");
  assert.ok(html.includes("대기 중인 신청이 남아 있을 수 있어요"));
  assert.equal(html.includes("확인 메일을 보내지 못했습니다. 주소는 저장하지 않았습니다."), false);
  assert.ok(html.includes("발송 처리 기록과 남용 방지용 해시"));
});

test("subscription pages do not expose token URLs to analytics or referrers", () => {
  for (const page of ["subscribe", "subscribe/confirm", "subscribe/unsubscribe"]) {
    const html = readFileSync(new URL(`../../dist/${page}/index.html`, import.meta.url), "utf8");
    assert.equal(html.includes("G-915L6V38X6"), false, page);
    assert.match(html, /<meta\s+name="referrer"\s+content="no-referrer"\s*\/?>(?:)/, page);
    // 2026-10-30: 모집 공개로 토큰이 없는 /subscribe/ 랜딩만 색인을 허용하고, 토큰 페이지는 계속 noindex.
    if (page === "subscribe") assert.equal(/name="robots"/.test(html), false, page);
    else assert.match(html, /name="robots"\s+content="noindex, follow"/, page);
    assert.equal(html.includes("adsbygoogle.js"), false, page);
  }
  const home = readFileSync(new URL("../../dist/index.html", import.meta.url), "utf8");
  assert.equal(home.includes("G-915L6V38X6"), true);
});
