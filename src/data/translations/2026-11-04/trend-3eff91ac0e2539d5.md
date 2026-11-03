---
id: trend-3eff91ac0e2539d5
title: "Qwen3.8-Flash-Next (local) vs Claude"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xmolk6/qwen38flashnext_local_vs_claude
summary: "Qwen3.8-Flash-Next (local) vs Claude. 원문 접근 실패(needs-browser)."
translationStatus: "blocked"
translatedBy: Grok Bot
translatedAt: 2026-11-04
---

원문을 읽지 못했어요(**needs-browser**). 브라우저/페이월 우회는 하지 않아요.

### 제목

Qwen3.8-Flash-Next (local) vs Claude

### 공개 목록 요약

> I am seriously impressed and want to share my experience. Qwen3.8-Flash-Next (local) vs Claude in Claude Code: reviewing one real commit I ran the same code review twice on one commit in my repo https://github.com/leok7v/ChatOKF (Swift, on-device LLM chat app, about 48 files changed, +1048/-102: a module move plus a new 783-line search harness). Setup: Qwen3.8-Flash-Next UD-Q4_K_XL (unsloth) on llama-server, ROCm, AMD Strix Halo 128 GB, 262K context, MTP draft head, driven headless by Claude Code itself (claude -p pointed at the local server, read-only tools). The comparison reviewer was Claude (Opus) in Claude Code, which reviewed blind first and then judged Qwen's review against the code. Yes, Claude judging its own competitor is a bias; every finding below was checked against the source, and the main one with a small Swift repro. Result: Qwen produced 8 findings, all real, zero false positives. It caught 2 things Claude missed (a test harness that does not follow the app's recall path, and a markdown ingest that takes the frontmatter "---" as a description). It missed 5 that Claude found, including the most important one: a stop-word filter that compares stemmed words with an unstemmed list, so "this" and "does" leak through as search terms. It also got two details wrong (the exact fallback behavior of a failable init, and column counts off by a few). Severity calibration and the "checked and fine" section were good. It read whole files and chased module boundaries like a careful human. Cost: 53 turns, 41 minutes, context grew to about 110K tokens. Decode was about 21 t/s at 4K context and about 14 t/s at 128K; prefill 520 t/s falling to 230 t/s. MTP gives about 1.5x up to 64K and turns into a loss past about 100K. Gotchas: Use --lazy-mode on. Otherwise the 27 GiB n-gram embedding table loads into RAM instead of staying mmapped. unsloth's MTP heads crash llama.cpp (GGML_ASSERT in set_input_k_idxs) because the MTP layer's compress ratio is 0 in the GGUF. Fix branch: https://github.com/leok7v/llama.cpp/tree/qwen4exp/mtp-dense-no-indexer Claude Code sends a system message mid-conversation and the Qwen chat template raises on it. Override the template so it renders as a system turn. Verdict: a trustworthy first-pass reviewer you can run privately overnight, but verify its mechanisms before acting, and don't treat it as the final word on subtle logic. One commit, one run, so treat it as an anecdote, not a benchmark. submitted by /u/leo-k7v

### 메타

- `https://www.reddit.com/r/LocalLLaMA/comments/1xmolk6/qwen38flashnext_local_vs_claude`
- sourceId=`reddit`
- discussionUrl=`https://www.reddit.com/r/LocalLLaMA/comments/1xmolk6/qwen38flashnext_local_vs_claude`

원문에 없는 사실은 추정하지 않았어요.
