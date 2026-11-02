// 댓글 목록·작성·답글·추천·신고·삭제 화면. 날짜·상세·커뮤니티 글이 함께 쓴다.
import { ApiError, REPORT_LABEL, api, attachTurnstile, el, getConfig, getMe, loginHref, timeAgo, type Comment, type Me } from "./community";

export async function mountComments(root: HTMLElement, thread: string): Promise<void> {
  const [config, me] = await Promise.all([getConfig(), getMe()]);
  const list = el("ol", { class: "cm-list", "aria-live": "polite" });
  const count = el("span", { class: "cm-count" });
  const head = el("div", { class: "cm-head" }, el("h2", { class: "cm-title", text: "댓글" }), count);
  root.replaceChildren(head, composer(null), list);

  let comments: Comment[] = [];
  async function load() {
    try {
      const data = await api<{ comments: Comment[] }>("GET", `/api/comments?thread=${encodeURIComponent(thread)}`);
      comments = data.comments;
      render();
    } catch {
      list.replaceChildren(el("li", { class: "cm-empty", text: "댓글을 불러오지 못했어요." }));
    }
  }

  function render() {
    const visible = comments.filter((c) => c.state !== "deleted").length;
    count.textContent = visible ? `${visible}개` : "";
    const top = comments.filter((c) => !c.parentId);
    if (top.length === 0) {
      list.replaceChildren(el("li", { class: "cm-empty", text: "아직 댓글이 없어요. 첫 댓글을 남겨 보세요." }));
      return;
    }
    list.replaceChildren(
      ...top.map((c) => {
        const replies = comments.filter((r) => r.parentId === c.id);
        const li = item(c, true);
        if (replies.length) li.append(el("ol", { class: "cm-replies" }, ...replies.map((r) => item(r, false))));
        return li;
      }),
    );
  }

  function item(c: Comment, canReply: boolean): HTMLLIElement {
    const li = el("li", { class: "cm-item", id: `c-${c.id}` });
    const meta = el("p", { class: "cm-meta" },
      el("strong", { class: "cm-author", text: c.author ?? "" }),
      el("span", { text: timeAgo(c.createdAt) }),
    );
    let body: HTMLElement;
    if (c.state === "deleted") body = el("p", { class: "cm-gone", text: "삭제된 댓글이에요." });
    else if (c.state === "hidden" && c.body == null) body = el("p", { class: "cm-gone", text: "신고가 쌓여 운영자 확인을 기다리는 댓글이에요." });
    else body = el("p", { class: "cm-body", text: c.body ?? "" });
    li.append(meta, body);
    if (c.state === "deleted") return li;

    const actions = el("div", { class: "cm-actions" });
    const vote = el("button", { type: "button", class: "cm-btn cm-vote", "aria-pressed": String(c.voted), "aria-label": `추천 ${c.score}` }, `👍 ${c.score}`);
    vote.addEventListener("click", async () => {
      if (!me) return needLogin(vote);
      if (c.mine) return flash(vote, "내 댓글은 추천할 수 없어요.");
      try {
        const r = await api<{ voted: boolean; score: number }>("POST", `/api/comments/${c.id}/vote`);
        c.voted = r.voted; c.score = r.score;
        vote.textContent = `👍 ${r.score}`;
        vote.setAttribute("aria-pressed", String(r.voted));
      } catch (e) { flash(vote, msg(e)); }
    });
    actions.append(vote);

    if (canReply) {
      const reply = el("button", { type: "button", class: "cm-btn", text: "답글" });
      reply.addEventListener("click", () => {
        if (!me) return needLogin(reply);
        const existing = li.querySelector(":scope > .cm-form");
        if (existing) { existing.remove(); return; }
        const f = composer(c.id);
        li.insertBefore(f, li.querySelector(":scope > .cm-replies"));
        f.querySelector("textarea")?.focus();
      });
      actions.append(reply);
    }
    if (c.mine || me?.admin) {
      const del = el("button", { type: "button", class: "cm-btn", text: "삭제" });
      del.addEventListener("click", async () => {
        if (!confirm("이 댓글을 지울까요?")) return;
        try { await api("DELETE", `/api/comments/${c.id}`); await load(); } catch (e) { flash(del, msg(e)); }
      });
      actions.append(del);
    }
    if (!c.mine && me) actions.append(reportButton("comment", c.id));
    li.append(actions);
    return li;
  }

  function composer(parentId: string | null): HTMLElement {
    if (!me) {
      const providers = config.providers ?? [];
      return el("div", { class: "cm-form cm-login" },
        el("p", { text: parentId ? "답글을 달려면 로그인해 주세요." : "로그인하고 댓글을 남겨 보세요. 이메일이나 이름은 받지 않아요." }),
        el("div", { class: "cm-providers" }, ...providers.map((p) => el("a", { class: `cm-provider cm-provider-${p.id}`, href: loginHref(p.id), text: `${p.label}로 로그인` }))),
      );
    }
    const ta = el("textarea", { class: "cm-input", rows: parentId ? "2" : "3", maxlength: "1000", placeholder: parentId ? "답글을 남겨 주세요" : thread.startsWith("post:") ? `${me.nickname} 님, 댓글을 남겨 주세요` : `${me.nickname} 님, 이 뉴스 어떻게 보셨어요?`, "aria-label": parentId ? "답글" : "댓글" });
    const ts = el("div", { class: "cm-turnstile" });
    const status = el("span", { class: "cm-status", role: "status" });
    const submit = el("button", { type: "submit", class: "cm-submit", text: parentId ? "답글 달기" : "댓글 달기" });
    const form = el("form", { class: "cm-form" }, ta, ts, el("div", { class: "cm-row" }, status, submit));
    let turnstile: ReturnType<typeof attachTurnstile> | null = null;
    ta.addEventListener("focus", () => { turnstile ??= attachTurnstile(ts); }, { once: true });
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (!ta.value.trim()) return;
      submit.disabled = true;
      status.textContent = "";
      try {
        await api("POST", "/api/comments", { thread, body: ta.value, parentId, turnstileToken: turnstile?.token() });
        ta.value = "";
        if (parentId) form.remove();
        await load();
      } catch (e) {
        status.textContent = msg(e);
      } finally {
        submit.disabled = false;
        turnstile?.reset();
      }
    });
    return form;
  }

  await load();
}

export function reportButton(type: "comment" | "post", id: string): HTMLElement {
  const wrap = el("span", { class: "cm-report" });
  const btn = el("button", { type: "button", class: "cm-btn", text: "신고" });
  btn.addEventListener("click", () => {
    if (wrap.querySelector("select")) return;
    const sel = el("select", { class: "cm-select", "aria-label": "신고 이유" }, el("option", { value: "", text: "이유를 골라 주세요" }), ...REPORT_LABEL.map(([v, t]) => el("option", { value: v, text: t })));
    sel.addEventListener("change", async () => {
      if (!sel.value) return;
      try {
        await api("POST", "/api/reports", { targetType: type, targetId: id, reason: sel.value });
        wrap.replaceChildren(el("span", { class: "cm-done", text: "신고했어요" }));
      } catch (e) { flash(btn, msg(e)); }
    });
    wrap.append(sel);
    sel.focus();
  });
  wrap.append(btn);
  return wrap;
}

export function msg(e: unknown): string {
  return e instanceof ApiError ? e.message : "잠시 뒤에 다시 시도해 주세요.";
}

export function flash(anchor: HTMLElement, text: string): void {
  const t = el("span", { class: "cm-flash", role: "status", text });
  anchor.after(t);
  setTimeout(() => t.remove(), 3000);
}

export function needLogin(anchor: HTMLElement): void {
  flash(anchor, "로그인이 필요해요.");
  document.querySelector<HTMLElement>(".cm-login")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export type { Me };
