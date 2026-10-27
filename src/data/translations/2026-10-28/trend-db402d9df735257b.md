---
id: trend-db402d9df735257b
title: "Fuzzers vs. AI: Comparing Fuzzilli and BigSleep on JavaScript Engines"
sourceUrl: https://projectzero.google/2026/10/fuzzing-v-AI.html
summary: "Google Project Zero가 V8에서 퍼저 Fuzzilli와 LLM 기반 BigSleep을 비교했어요. 최근 6개월 BigSleep이 45건, Fuzzilli가 37건을 찾았고 겹친 건 25%였어요. 실험으로 본 이론적 중복은 약 60%라, 둘은 서로 보완적이고 함께 쓰라고 권해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 요약

Google Project Zero가 Chrome의 JavaScript 엔진 **V8**에서 정기적으로 취약점을 찾는 두 자동화 도구를 비교했어요.

- **Fuzzilli**: 생성형 JavaScript 엔진 퍼저
- **BigSleep**: LLM 기반 에이전트형 버그 탐지 시스템

| 지표 | 결과 |
|---|---|
| 최근 6개월 발견 취약점 | BigSleep 45건, Fuzzilli 37건 |
| 실제 보고 버그 중복 | 25% |
| 2023년 이후 취약점 대상 실험으로 추정한 이론적 중복 | 약 60% |

보고 기준 비교는 중복을 과소평가하는 경향이 있어 별도 실험을 했대요. 어느 값이 맞든 **상당수 취약점은 LLM만, 또는 퍼징만 찾을 수 있었어요.**

> LLM이 이렇게 많은 취약점을 빠르게 찾게 된 건 매우 고무적이지만, 퍼징과 LLM은 여전히 상호 보완적이에요. 벤더는 사용자에게 피해가 가기 전에 최대한 많은 취약점이 보고되도록 퍼징과 에이전트 분석을 둘 다 하길 권해요.

### 왜 이 비교인가

퍼징은 Chrome, V8 같은 프로젝트에서 오래 성과를 냈어요. 그런데 코드를 읽고 추론하고 쓰는 LLM이 등장해 잘 퍼징된 대상에서도 수백, 수천 건의 새 버그가 나오자 "LLM이 퍼저를 대체하나, 보완하나?"라는 질문이 생겼어요. 글은 세 가지를 봐요.

1. 실제로 각 방식이 버그를 얼마나 찾나?
2. 두 방식은 얼마나 겹치나?
3. 한쪽만 찾은 버그는 어떤 '모양'인가?

### 비교 조건

- 두 시스템 모두 프로덕션에서 새로 추가된 코드를 자동으로 살펴서 직접 비교하기 좋아요.
- Fuzzilli는 여러 인스턴스에서 계속 돌며 보통 몇 시간 안에 새 변경을 잡아요. BigSleep은 현재 **하루 한 번** 돌며 새 커밋을 검토하고, 찾은 버그마다 개념 증명(PoC) 테스트케이스를 쓰도록 프롬프트돼요.
- 둘 다 **Clusterfuzz**로 보고하고, Clusterfuzz가 기본 크래시 분류 후 Chrome 이슈 트래커에 등록해요.
- 대상은 성숙한 테스트·퍼징 체계를 갖춘 V8로 한정했어요. Fuzzilli는 이런 엔진 전용 도구예요.

> 원문의 요약, 도입, 비교 조건까지 옮겼어요. 버그 유형별 분석과 실험 세부는 다 읽지 않았어요.
