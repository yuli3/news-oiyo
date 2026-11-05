---
id: trend-ea28e32d5d7ebe9e
title: "Lawyer with too many GPUs, part 4: DeepSeek-V4.1-Flash on eight V100s from 2018. 200+ tok/s on code, ~110 on legal writing, 2,200 tok/s prefill at 128K, 524K context, every weight in VRAM"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xoubyo/lawyer_with_too_many_gpus_part_4_deepseekv41flash
summary: "2018년산 V100 8장에 DeepSeek-V4.1-Flash 2비트 양자화를 모두 VRAM에 올려 코드 생성 200 tok/s 이상, 법률 문서 약 110 tok/s, 128K에서 prefill 2,200 tok/s를 낸 변호사의 서버 구축기예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

Reddit 자동 수집이 막혀 Grok Bot이 공개 페이지를 직접 열어 전문을 읽었어요. 원문의 거친 표현은 옮기지 않았어요.

### 배경
V100 서버를 운영하는 변호사의 네 번째 글이에요. 사흘 전 V100 4장으로 36–38 tok/s를 올렸고, 이번에 8장으로 늘렸어요. 작성자는 실제 업무에 정말 쓸모 있었다며, 예전엔 프런티어 모델이 필요하던 LLM 작업의 50–60%를 이 모델로 돌릴 수 있다고 추정했어요. RAG DB와 도구 호출이 모두 연결돼 있고, DGX Spark 2대에 DeepSeek 서버가 하나 더 있대요. 벤치마크 실행과 집계는 Claude Code가 했다고 밝혔어요.

### 구성 요약
- 모델: ISTA-DASLab의 2비트 GSQ-RCO IQ2_XXS GGUF(DeepSeek-V4.1-Flash-1017)
- 8× V100-SXM2-32GB, NVLink 보드 2개(보드 사이는 PCIe), pipeline 2 × tensor 4 분할
- 가중치 248.8GB 전부 VRAM 상주, 요청당 컨텍스트 524,288 토큰, 한 번에 한 요청
- Threadripper PRO 3945WX, DDR4 256GB, 카드당 150W 제한

### 속도(2026-11-05 측정, thinking off, greedy, 2회 평균)
- 코드: 1K 프롬프트 뒤 215 tok/s, 32K 200, 128K 183, 256K 160
- JSON: 203~207, 256K에서 180
- 법률 문서: 103~118
- 산문 약 85~98, 채팅 약 80~110
- Prefill: 1K 약 900 tok/s, 32K 1,900, 128K·256K 2,200. 첫 토큰은 32K 17초, 128K 59초, 256K 약 2분

**코드가 법률 글보다 두 배 빠른 이유**: 드래프터가 매 라운드 5토큰을 제안하고 큰 모델이 한 번에 검증해요. 라운드 비용은 비슷한데 코드·JSON은 예측이 쉬워 3.6–3.8개가 채택되고(라운드당 약 4.7토큰), 법률은 약 1.6개, 산문은 약 1.2개만 채택돼요.

### 발전 과정(고정 테스트셋 디코드)
4× V100 기본 패키지 36–38 → 8× V100 이전 EXL3 빌드 42–46 → PP2×TP4 포팅(튜닝 전) 99 → 오늘 빌드 약 135 tok/s.

### 품질(서빙 빌드에서 측정)
- LegalBench 22개 과제 balanced accuracy 0.716
- MMLU-Pro 79.9%(±1.5), HumanEval+ 89.6%(기본 테스트 94.5%)
- 원본 모델 대비 1순위 토큰 일치율: 일반 패널 89.0%, 법률 패널 92.5%. 코드·수학·도구 호출에서 가장 가깝고(89–99%), 채팅·창작·다국어에서 가장 멀어요(81–86%). 이 차이는 속도 작업이 아니라 2비트 양자화 때문이래요.
- 약 45만·50만 토큰 위치의 needle 6개를 4번 모두 찾았어요.

### 실제 용도와 다음 계획
사무실 밖으로 문서가 나가지 않는 상태에서 자기 사건 기록의 1차 작업(사실·날짜·숫자 추출, 요약, 일상적 초안)에 써요. Anthropic API 형식을 쓰는 서버라 Claude Code를 이 서버에 붙였고, 결과물은 반드시 사람이 검토한대요. 스트리밍 도구 호출 버그도 고쳐 테스트 144개를 모두 통과했어요. 남은 과제는 동시 요청 처리(예상 4스트림 약 1.8배, 아직 측정 아님), 느린 산문 속도, 긴 첫 토큰 대기예요. 이긴 개선은 1Cat-vLLM에 PR 19개로 올렸고, 설정·A/B 결과·실패한 아이디어까지 저장소에 공개했어요.
