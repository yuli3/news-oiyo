---
id: trend-a7e6b2a74c24903d
title: "난베이지, 33B 오픈소스 AI 모델 공개...코딩 벤치마크서 '큐원3.8-27B' 앞서"
sourceUrl: https://www.aitimes.com/news/articleView.html?idxno=216711
summary: "BOSS 직핀이 운영하는 난베이지 LLM 연구소가 33B 밀집형 오픈소스 에이전트 모델 Nanbeige4.3-33B를 Apache 2.0으로 공개했어요. 자체 평가에선 20개 항목 중 17개에서 Qwen3.8-27B 등을 앞섰지만, 일부 경쟁 모델 수치가 공식 발표와 달라 독립 검증이 필요해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 무엇을 공개했나

AI타임스에 따르면 중국 채용 플랫폼 BOSS 직핀이 운영하는 **난베이지 LLM 연구소**가 24일 코딩·업무 자동화용 에이전트형 모델 **Nanbeige4.3-33B**를 Hugging Face에 공개했어요.

- 매개변수 330억 개, 영어·중국어 지원
- **Apache 2.0** 라이선스로 상업 이용, 수정, 재배포가 비교적 자유로워요.
- MoE가 아닌 **밀집형(Dense)** 구조예요. 실행 구조가 단순하고 배포 환경을 예측하기 쉽지만, MoE보다 연산 자원을 더 쓸 수 있어요.
- 컨텍스트 창은 최대 **524,288토큰**이고, 모델 카드에 Transformers, SGLang, vLLM 실행법이 있어요.

연구소는 약 300억 매개변수급 공개 모델 중 에이전트 성능이 가장 뛰어난 모델 중 하나라고 소개해요.

### 연구소 자체 벤치마크

Qwen3.8-27B, Meta Muse-Glimmer-30B, Google Gemma4-31B와 비교한 20개 항목 중 17개에서 1위였대요. 고난도 평가는 모든 모델을 '최고 추론 노력'과 같은 하이퍼파라미터로 돌렸다고 해요.

| 벤치마크 | Nanbeige4.3-33B | Qwen3.8-27B |
|---|---|---|
| Terminal-Bench 2.1 | 80.9 | 73.0 |
| DeepSWE | 65.5 | 42.5 |
| Automation Bench | 54.2 | 38.3 |
| JobBench | 44.8 | 34.5 |
| YC-Bench 시뮬레이션 수익 | 102만 5,437달러 | 64만 1,290달러 |
| SWE-bench Pro | 60.3 | 61.7 |
| GDPval | 84.8 | 86.4 |

AIME 2026은 95.2, AA-LCR은 84.0이에요.

### 주의할 점

자체 평가라 독립 검증이 필요해요. 예를 들어 비교표의 Gemma4-31B GPQA Diamond 점수는 89.5인데 Google 공식 수치는 84.3이에요. 평가 환경과 실행 도구 차이가 결과에 영향을 줄 수 있어, 자체 비교표만으로 우위를 확정하기 어렵다고 기사는 지적해요.

> 기사 본문 대부분을 옮겼지만 끝부분이 잘려 마지막 문단은 확인하지 못했어요.
