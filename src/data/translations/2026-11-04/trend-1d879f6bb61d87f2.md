---
id: trend-1d879f6bb61d87f2
title: "Basalt 0.2.0: Qwen 3.8 Flash Next NVFP4, 300 t/s prose, 600 t/s struct, 10K t/s prefill on a 5090 + 5060 Ti and 128GB RAM"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xn4qn1/basalt_020_qwen_38_flash_next_nvfp4_300_ts_prose
summary: "Basalt 0.2.0: Qwen 3.8 Flash Next NVFP4, 300 t/s prose, 600 t/s struct, 10K t/s prefill on a 5090 + 5060 Ti and 128GB RAM. 원문 접근 실패(needs-browser)."
translationStatus: "blocked"
translatedBy: Grok Bot
translatedAt: 2026-11-04
---

원문을 읽지 못했어요(**needs-browser**). 브라우저/페이월 우회는 하지 않아요.

### 제목

Basalt 0.2.0: Qwen 3.8 Flash Next NVFP4, 300 t/s prose, 600 t/s struct, 10K t/s prefill on a 5090 + 5060 Ti and 128GB RAM

### 공개 목록 요약

> Basalt 0.2.0: Quality & Speed Hey all! I wanted to share a quick update on Basalt , a Blackwell only inference engine for Qwen 3.8 Flash Next. As usual, speed is the headline but that's not what I want to open this post with, I've been reading lot of discussions talking about quality recently, and the main takeaway from most people (which I agree with) is "speed means nothing if your model isn't smart enough", so this time I want to lead with quality, and all of the new measurements which are run against the full precision model as reference (BF16 weights served using llama.cpp). Every number below uses Unsloth's BF16 GGUF, llama.cpp (reference PPL 3.2749), scored using basalt-bench --quality . The old base was llama.cpp Q8, which funnily enough made things look worse because of its own error: pack KLD same top-1 llama.cpp Q8 0.0325 93.98% Basalt Q8 0.0200 95.34% (higher than llama's in this test) NVFP4-DQ8 (new) 0.0561 92.25% NVFP4-DQ6_K 0.0624 91.65% GSQ-RCO IQ3_S 0.1497 87.56% To be fair here, each engine was measured with its own tool so this is not a perfect comparison, still a good reference though. New DQ8 build. For those who want a little extra quality and don't mind giving up some speed, Qwen3.8-FN-NVFP4-DQ8 is on HF next to the default -DQ6_K : KLD 0.0561 vs 0.0624, about 7% slower on prose. Nothing lossy is on by default. Basalt offers certain "hacks" that can decrease accuracy, mostly because of community requests, but they're off by default and show a warning when you turn them on. Every other rounding the engine does costs about 0.001 KLD or less, compared to full model. All the numbers are on the HF card and in the precision docs . Speed. Rig as usual: RTX 5090 (400 W) + RTX 5060 Ti 16 GB (180 W) and 128GB of DDR5 RAM, 262K context, 4 parallel slots, vision on (dynamic), no lossy flags. Using NVFP4-DQ6_K quant on current main: test run 1 (tok/s) run 2 (tok/s) struct 603.7 594.2 conv 363.8 321.9 prose 295.0 299.9 prefill 16K 7432 8159 prefill 64K 10221 10229 Since last week, prose went from 277 to about 300, and struct from 558 to about 600. It comes from a faster draft step, a faster output head and better expert placement at startup. The .basalt format is now version 2, same weights and quality as before but starts a bit faster. Older basalt files can use the migration tool instead of redownloading. I also wanted to end this post with a HUGE thank you note to every person who has contributed one, two or 10 PRs and also to everyone who has shared issues/feedback/community benchmarks or just shared the project with another person, 500 stars on the Github repo and overwhelmingly good feedback, y'all are amazing. submitted by /u/jesdga95

### 메타

- `https://www.reddit.com/r/LocalLLaMA/comments/1xn4qn1/basalt_020_qwen_38_flash_next_nvfp4_300_ts_prose`
- sourceId=`reddit`
- discussionUrl=`https://www.reddit.com/r/LocalLLaMA/comments/1xn4qn1/basalt_020_qwen_38_flash_next_nvfp4_300_ts_prose`

원문에 없는 사실은 추정하지 않았어요.
