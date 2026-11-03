---
id: trend-7803bca45fd4d3cc
title: "I tried MIT's &quot;weight-space programming&quot; on my own use case: Claude rewrote 8 neurons of Gemma 4 12B to change how it translates one Italian tense"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xn1gs9/i_tried_mits_weightspace_programming_on_my_own
summary: "I tried MIT's &quot;weight-space programming&quot; on my own use case: Claude rewrote 8 neurons of Gemma 4 12B to change how it translates one Italian tense. 원문 접근 실패(needs-browser)."
translationStatus: "blocked"
translatedBy: Grok Bot
translatedAt: 2026-11-04
---

원문을 읽지 못했어요(**needs-browser**). 브라우저/페이월 우회는 하지 않아요.

### 제목

I tried MIT's &quot;weight-space programming&quot; on my own use case: Claude rewrote 8 neurons of Gemma 4 12B to change how it translates one Italian tense

### 공개 목록 요약

> Yesterday MIT CSAIL showed GPT-6 Astra editing the weights of a small model by hand. It changed a few neurons of Qwen3.5-0.8B, the model stopped looping on math problems, and its scores jumped. No training at all. I wanted to try the same thing on something closer to what I actually do with local models, which is translating into Italian. Gemma 4 has a habit I don't love. For sentences like He had been hiding in the attic for months when the soldiers found him. it writes «Si era nascosto in soffitta per mesi…». That's correct, but I prefer «Si nascondeva in soffitta da mesi…», which says he was still hiding when they came. The catch is that when the period was already over ( he had lived in Paris for ten years, but by 1990 he had moved back ), the original tense has to stay. So it's not "always use tense X", it's "use it only when the meaning calls for it". So I gave Claude Opus 5.5 the same kind of setup MIT used: a Python kernel over Gemma's weights; 50 forward passes to test its ideas on practice sentences; no gradients, no training. It first checked whether Gemma already "knows" the difference between still-going-on and already-over. It does: a linear probe in the middle layers separates them almost perfectly. It just doesn't use that when choosing the verb. Then Claude rewrote 8 MLP neurons into a small switch that fires only in that context and nudges the verb toward the form I prefer. That's 92k out of 11.9B parameters, roughly a 100 KB diff. Results on sentences it never saw The table shows the share still in the old form, then how many control sentences got pushed into a wrong reading, then how many of 200 unrelated translations stayed identical. Method test 1 test 2 (independent) controls broken unrelated unchanged Gemma 4 12B 26 % 32 % — 200 Preference in the system prompt 4 % 2 % 49 82 Classic "difference of means" ablation 49 % 75 % 53 43 LoRA fine-tune on the same data 12 % 23 % 0 120 Claude's hand edit 5 % 16 % 2 182 The prompt applies the preference everywhere, even where it changes the meaning. The ablation recipe breaks the past tenses. The LoRA shifts fewer sentences and touches far more unrelated ones (it's better inside paragraphs, though). The hand edit moves just the verb and leaves almost everything else identical. Fair warning: it's one construction and one model. Two of my three runs succeeded (the third crashed because of my own harness), and the two that worked landed on the same "switch neuron" design independently. Repo with the edits, the code, the agent logs and all baselines: https://github.com/ValerioDolci/frontier-weight-edit submitted by /u/FeydRowan

### 메타

- `https://www.reddit.com/r/LocalLLaMA/comments/1xn1gs9/i_tried_mits_weightspace_programming_on_my_own`
- sourceId=`reddit`
- discussionUrl=`https://www.reddit.com/r/LocalLLaMA/comments/1xn1gs9/i_tried_mits_weightspace_programming_on_my_own`

원문에 없는 사실은 추정하지 않았어요.
