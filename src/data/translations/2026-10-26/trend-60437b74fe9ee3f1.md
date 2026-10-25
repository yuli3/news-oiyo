---
id: trend-60437b74fe9ee3f1
title: "Nanbeige/Nanbeige4.3-33B · Hugging Face"
sourceUrl: https://huggingface.co/Nanbeige/Nanbeige4.3-33B
summary: "BOSS직빙 계열 Nanbeige 팀이 소형 에이전트 증류용 교사 모델 Nanbeige4.3-33B를 Apache 2.0으로 공개했어요. 512K 컨텍스트이고, 자체 평가에서 Terminal-Bench 2.1 80.9점으로 Qwen3.8-27B(73.0)를 앞섰어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

Hugging Face 모델 카드(README)를 옮겼어요. 벤치마크는 모두 공개 팀의 자체 평가예요.

### 소개

Nanbeige4.3은 **가벼운 에이전트**의 한계를 넓히는 첫걸음이래요. 먼저 큰 용량의 **교사(teacher) 에이전트**를 만들고, 이를 바탕으로 고급 에이전트 능력을 작은 모델로 **증류**하는 전략이에요.

- **Nanbeige4.3-33B**는 시리즈의 대표 교사 모델이에요.
- 약 30B급 오픈 모델 중 최고 수준의 에이전트 성능을 내고, 복잡한 코딩과 전문 '코워크(cowork)' 작업에 강하대요.
- 곧 나올 소형 모델(예: **Nanbeige4.3-3B**) 증류 파이프라인의 기반이 돼요.
- 라이선스 **Apache 2.0**, 영어·중국어. 기본 시스템 프롬프트에는 BOSS直聘(BOSS직빙)이 자체 개발한 모델이라고 적혀 있어요.

### 성능 비교(최고 사고 강도, 같은 하네스·설정)

| 벤치마크 | Nanbeige4.3-33B | Qwen3.8-27B | Muse-Glimmer-30B | Gemma4-31B |
|---|---|---|---|---|
| Terminal-Bench 2.1 | **80.9** | 73.0 | 61.8 | 47.2 |
| Terminal-Bench 4.0 | **23.8** | 6.3 | 1.6 | 0.0 |
| DeepSWE | **65.5** | 42.5 | 4.4 | 2.7 |
| SWE-Bench Pro | 60.3 | **61.7** | 36.9 | 51.2 |
| SWE-Atlas-QnA | **50.8** | 41.9 | 17.7 | 3.3 |
| Automation Bench | **54.2** | 38.3 | 15.2 | 9.7 |
| JobBench | **44.8** | 34.5 | 16.6 | 9.0 |
| GDPval | 84.8 | **86.4** | 75.8 | 71.4 |
| DeepPlanning | **63.3** | 49.2 | 21.4 | 19.4 |
| GPQA Diamond | 89.5 | 89.2 | 83.5 | **91.3** |
| AIME 2026 | **95.2** | 94.5 | 94.7 | 89.2 |

YC-bench(가상 수익)는 Nanbeige 1,025,437달러, Qwen3.8-27B 641,290달러였어요. 대부분 벤치마크에서 앞서지만 SWE-Bench Pro, GDPval, GPQA Diamond처럼 **지는 항목도 있어요.** JobBench에서는 평가한 35개 직업 대부분에서 기준선보다 나았대요.

평가 조건도 밝혀요. Nanbeige는 채팅 템플릿에서 `preserve_thinking=true`로 평가했고, Terminal-Bench 2.1은 Terminus 2, Terminal-Bench 4와 DeepSWE는 mini-swe-agent v2.4.6, NL2Repo는 Claude Code, SWE-Atlas-QnA는 GPT-6 Sol 채점(1,304개 루브릭)을 썼어요.

### 빠른 시작

- `enable_thinking`: 현재 응답에서 추론을 생성할지(기본 켜짐).
- `preserve_thinking`: 여러 턴에서 이전 추론을 유지할지. **일반 채팅·질의응답은 False, 여러 턴 도구 사용·사무 작업·코드 에이전트는 True**를 권해요.
- 도구 호출은 `tool_call_format="xml"`을 권하고 `json`도 지원해요.
- 컨텍스트는 최대 **524,288토큰(512K)**이에요.

권장 설정은 에이전트·도구 작업 temperature 1.0, top_p 0.95, 최대 65,536토큰, 추론·채팅 작업 0.6, 0.95, 262,144토큰이에요. Transformers, SGLang, vLLM(텐서 병렬 4 예시)으로 돌릴 수 있고, 도메인·산업별 에이전트 공동 개발도 환영한대요.
