import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { adSubject, buildDigest, buildReviewedDraftMail, tagLinks, withUnsubscribe, withUtm } from "../../functions/lib/digest.mjs";
import { readReviewedDraft } from "../lib/mailing-draft.mjs";

const UTM = "utm_source=newsletter&utm_medium=email&utm_campaign=mailing-20261103";

test("(광고) subject label follows the 정보통신망법 form and is configurable", () => {
  assert.equal(adSubject("[광고] OIYO 소식"), "(광고) OIYO 소식");
  assert.equal(adSubject("(광고) OIYO 소식"), "(광고) OIYO 소식");
  assert.equal(adSubject("OIYO 소식", false), "OIYO 소식");
  assert.equal(buildReviewedDraftMail({ id: "mailing-20261103", subject: "소식", body: "x", promotional: false }).subject, "소식");
});

test("every body link gets the issue UTM, existing utm values are replaced, unsubscribe links are left alone", () => {
  assert.equal(withUtm("https://news.oiyo.net/item/a/", "mailing-20261103"), `https://news.oiyo.net/item/a/?${UTM}`);
  const replaced = new URL(withUtm("https://blog.oiyo.net/x/?a=1&utm_campaign=old", "mailing-20261103"));
  assert.equal(replaced.searchParams.get("a"), "1");
  assert.equal(replaced.searchParams.get("utm_campaign"), "mailing-20261103");
  assert.equal(replaced.searchParams.get("utm_source"), "newsletter");
  assert.equal(withUtm("https://news.oiyo.net/subscribe/unsubscribe/?token=t", "c-1"), "https://news.oiyo.net/subscribe/unsubscribe/?token=t");
  const text = tagLinks("원문 https://toollab.org/etf · 다음 https://idealab.ai/.", "mailing-20261103");
  assert.ok(text.includes(`https://toollab.org/etf?${UTM} ·`));
  assert.ok(text.includes(`https://idealab.ai/?${UTM}.`));
  const mail = buildReviewedDraftMail({ id: "mailing-20261103", subject: "s", body: "a https://news.oiyo.net/x/\nb https://example.com/y" });
  const bodyLinks = mail.text.split("\n---\n")[0].split("\n").slice(3).join("\n").match(/https?:\/\/\S+/g);
  assert.equal(bodyLinks.length, 2);
  for (const link of bodyLinks) assert.ok(link.includes(UTM), link);
});

test("footer carries sender, public contact, and a per-recipient unsubscribe link", () => {
  const mail = buildReviewedDraftMail({ id: "mailing-20261103", subject: "OIYO 요약", body: "본문 https://news.oiyo.net/" });
  assert.match(mail.text, /보내는 이: OIYO News · https:\/\/news\.oiyo\.net\/$/m);
  assert.match(mail.text, /문의: support@oiyo\.net/);
  const sent = withUnsubscribe(mail.text, "https://news.oiyo.net", "tok");
  assert.match(sent, /수신 거부: https:\/\/news\.oiyo\.net\/subscribe\/unsubscribe\/\?token=tok$/m);
  assert.ok(buildReviewedDraftMail({ id: "mailing-20261103", subject: "a", body: "b", contact: "hello@oiyo.net" }).text.includes("문의: hello@oiyo.net"));
  const preview = buildDigest({ date: "2026-10-14", items: [{ title: "t", url: "https://example.com/a" }], pageUrl: "https://news.oiyo.net/archive/" });
  assert.match(preview.text, /문의: support@oiyo\.net/);
  assert.equal(preview.source, "auto-preview");
});

const DRAFT_MD = `---
id: mailing-20261103
title: "(광고) OIYO AI·금융 요약 2026-11-03"
review_status: checked-await-owner-release
reviewer: codex
sent_count:
---

<!-- 내부 메모 -->

# (광고) OIYO AI·금융 요약 2026-11-03

**이번 호 한 줄:** 테스트예요.
https://news.oiyo.net/item/trend-1/

---
보내는 이: 옛 바닥글
## 60초 쇼츠 대본
대본
`;

test("reviewed draft parser keeps only the mail body and rejects unreviewed or already-sent drafts", () => {
  const { problems, draft } = readReviewedDraft(DRAFT_MD);
  assert.deepEqual(problems, []);
  assert.equal(draft.id, "mailing-20261103");
  assert.equal(draft.reviewed, true);
  assert.equal(draft.body.includes("내부 메모"), false);
  assert.equal(draft.body.includes("쇼츠"), false);
  assert.equal(draft.body.includes("옛 바닥글"), false);
  assert.ok(readReviewedDraft(DRAFT_MD.replace("checked-await-owner-release", "draft")).problems.length);
  assert.ok(readReviewedDraft(DRAFT_MD.replace("sent_count:", "sent_count: 3")).problems.length);
});

test("CLI defaults to dry-run and refuses --send without a confirmed reviewed draft", () => {
  const root = resolve(import.meta.dirname, "../..");
  const dir = mkdtempSync(join(tmpdir(), "draft-"));
  const file = join(dir, "mailing-20261103.md");
  writeFileSync(file, DRAFT_MD);
  const env = { ...process.env, MAILING_LIST_SEND: "", MAILING_LIST_ADMIN_KEY: "", MAILING_LIST_FILE: join(dir, "none.json") };
  const run = (...args) => spawnSync(process.execPath, ["scripts/render-mailing-digest.mjs", ...args], { cwd: root, env, encoding: "utf8" });
  const preview = run(`--draft=${file}`);
  assert.equal(preview.status, 0);
  assert.ok(preview.stdout.startsWith("(광고) OIYO AI·금융 요약 2026-11-03"));
  assert.ok(preview.stdout.includes(UTM));
  const noDraft = run("--send");
  assert.equal(noDraft.status, 2);
  assert.match(noDraft.stderr, /검토한 초안/);
  const noConfirm = run(`--draft=${file}`, "--send");
  assert.equal(noConfirm.status, 2);
  assert.match(noConfirm.stderr, /--confirm=mailing-20261103/);
  const noKey = run(`--draft=${file}`, "--send", "--confirm=mailing-20261103");
  assert.equal(noKey.status, 2, "without MAILING_LIST_SEND=1 and admin key nothing is sent");
});
