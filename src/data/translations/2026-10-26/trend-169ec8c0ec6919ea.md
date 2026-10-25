---
id: trend-169ec8c0ec6919ea
title: "Qwen3.8-27B 모델 5개, GVS5H 하네스로 Fable 5에 필적하는 성능 달성"
sourceUrl: https://github.com/slee-persis/GVS5H
summary: "GVS5H는 같은 모델의 새 인스턴스들이 공유 파일시스템의 계획·메모·현재 해법으로 협업하는 학습 없는 방식이에요. LiveCodeBench 고난도 100문제에서 로컬 Qwen3.8-27B가 66.8%에서 92.4%로 올라 Fable 5(90.4%)를 넘었대요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

GitHub 저장소 README(논문 초록과 실행법)를 옮겼어요.

### 이름과 아이디어

**GVS5H**는 "Gorilla vs. 5 Humans"의 약자예요. 최상위 코딩 성능은 보통 크고 비싼 독점 모델로 '사는' 건데, 이 프로젝트는 **추론 시점의 조직화**로 거기에 다가가려 해요.

논문이 제안하는 방법은 **장부(ledger) 기반 제로샷 자기 오케스트레이션**이에요.

- 별도 학습이 없어요(training-free).
- **같은 모델의 새 인스턴스들**이 문제를 나누고,
- **공유 파일시스템**에 둔 계획(plan), 메모(notes), 현재 해법(current solution)으로 서로 조율해요.

### 결과

- 대상: 최신 **LiveCodeBench 고난도 100문제**, 오픈·비공개 웨이트 모델 **11개**.
- 고정된(pinned) 백엔드에서 최대 **25.6%포인트** 향상.
- 최상위 정확도로 가는 길이 두 가지래요.
  - 오케스트레이션한 **Qwen3.8 Flash Next**: pass@1 **93.0%**, Fable 5(90.4%)의 **9% 비용**.
  - 로컬에서 서빙한 오픈 웨이트 **Qwen3.8-27B**: **66.8% → 92.4%**.
- **모든 모델이 좋아지진 않았어요.** 일부는 그대로이거나 오히려 나빠졌대요.
- 실행 기록을 분석해 보니 향상은 **문제 분해**와 **지속되는 문맥** 덕분이었대요.
- 주의: Opus 5는 이전 버전 스캐폴드로, 고정 백엔드 5회가 아니라 OpenRouter를 통해 1회만 돌렸어요.

결론은 추론 시점 조직화로 적은 비용에 최상위 코딩 정확도에 다가갈 수 있고, 직접 호스팅하는 가중치로는 조금 넘을 수도 있다는 거예요.

### 실행 방법

`uv`와 시험할 모델의 API 키가 필요해요.

```bash
MULTIAGENT_MODEL=openai:gpt-5.6-terra \
uv run --no-project --python 3.12 --with 'datasets<4' --with numpy --with anthropic \
python escalation/run_bench.py --engine multiagent --only lcb --lcb 100 --parallel 8
```

- `--engine multiagent`는 매니저를 쓰는 방식, `--engine single`은 한 번 호출하는 기준선이에요.
- 다른 모델은 `anthropic:`, `dashscope:`, `openrouter:` 접두사와 각각의 API 키로 지정해요.
- 끝나면 pass@1이 출력되고 결과는 `runs/results.json`, 작업 공간은 `runs/ws/`에 저장돼요.

### 라이선스

코드는 **MIT**, 논문·그림·실행 데이터는 **CC BY 4.0**이에요. LiveCodeBench 포크, 문제 원문, LaTeX 템플릿은 각자 원래 라이선스를 따르고, 경로별 범위는 `NOTICE.md`에 있어요.
