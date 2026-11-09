---
id: trend-1ca7e5d6dedc47c0
title: "Our Smallest, Most Efficient Model: Muse Ember"
sourceUrl: https://research.meta.ai/blog/muse-ember
summary: "Meta가 가장 작고 효율적인 모델 Muse Ember를 공개했어요. 도구 호출, 코딩 하위 작업, 라우팅, 추출처럼 에이전트가 반복하는 일을 겨냥했고, Meta Model API에서 입력 100만 토큰당 0.10달러, 출력 0.50달러예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Meta 연구 블로그 발표문의 앞부분과 벤치마크·파트너 인용 일부를 읽고 옮겼어요. 표 전체와 각주는 다 확인하지 못해 `partial`로 표시했어요.

### 무엇을 위한 모델인가요

Muse Ember는 Meta가 "가장 작고 가장 효율적"이라고 소개한 모델이에요. 복잡한 추론 실행과, 에이전트가 하루 종일 반복하는 일, 즉 도구 호출·코딩 하위 작업·라우팅·정보 추출·긴 문서 파싱을 노려요.

- Meta는 어느 reasoning 설정에서든 Claude Haiku 5.5나 GPT-6 Luna보다 **달러당 지능**이 높다고 주장해요. Haiku의 최고 점수를 비용 약 3분의 1로 맞추고, Luna의 모든 설정을 앞선다고 해요.
- Artificial Analysis 리더보드 전체에서도 효율 경계선(efficiency frontier)에 있다고 밝혀요. 과제당 더 적은 비용으로 더 높은 점수를 낸 모델이 없다는 뜻이에요.
- 컨텍스트 창은 1M 토큰, 출력은 최대 512K 토큰이에요.

### 벤치마크(최대 reasoning 기준, Meta 발표)

| 평가 | Muse Ember | Haiku 5.5 | GPT-6 Luna |
|---|---|---|---|
| AutomationBench-AA | 37.8 | 13.9 | 20.2 |
| Agents' Last Exam | 61.6 | 57.0 | 57.1 |
| Terminal-Bench 4.0 | 40.9 | 39.2 | 16.4 |
| Coding Agent Index-AA | 46 | 37 | 31 |

Artificial Analysis Index는 36으로 Haiku 5.5와 같았고, FrontierCode 2.0-AA에서는 Haiku 5.5(34.9)가 더 높았어요.

### 파트너 반응

Box, Cline, Oracle, Cloudflare, You.com이 초기 테스트 소감을 남겼어요. Cloudflare CTO는 비교 모델보다 꼬리 지연이 최대 30% 빨랐다고 했고, You.com은 코딩 과제 p95 지연이 2.2초로 주요 오픈 웨이트 모델보다 4~13배 빠르고 출력 토큰은 36~48% 적었다고 밝혔어요.
