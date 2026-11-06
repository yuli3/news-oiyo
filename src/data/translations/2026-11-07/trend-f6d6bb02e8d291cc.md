---
id: trend-f6d6bb02e8d291cc
title: "Memorilla: Latent Semantic Memory for LLMs"
sourceUrl: https://arxiv.org/abs/2610.21375
summary: "Memorilla는 고정된 소수 메모리 토큰으로 문서 컬렉션에서 질의별 정보를 모아 동결 LLM에 넣는 메모리 시스템이에요. 16토큰으로 여러 벤치에서 Mem0·MemoRAG를 앞섰고 FactKG에서는 전체 문맥보다 높은 정확도를 냈어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-07
---

arXiv 초록(2610.21375)을 읽고 정리했어요. 논문 PDF 본문 전체가 아니라 abs 페이지 기준이라 수치·주장은 초록에 적힌 범위만 옮겨요.

### 문제
동결(frozen) LLM이 대화·긴 문서·에이전트 과거 행동을 쓰려면 메모리 시스템이 컨텍스트에 무엇을 넣을지가 관건이에요. 관련 정보를 모으면서 컨텍스트를 짧게 유지하기가 어렵다고 해요.

### Memorilla
문서를 한 번 임베딩해 재사용하고, 질의에 맞는 정보를 LLM 입력 임베딩 공간에 두는 방식을 배워요. **고정 개수의 질의 의존 메모리 토큰**만 씁니다. **16개 메모리 토큰**만으로 Mem0·MemoRAG 등 베이스라인 대비 개인화·긴 문서·지식 QA 등 **8개 벤치 중 5개**에서 최고 성능을 냈다고 해요.

### 눈에 띄는 수치
- **FactKG**: 전체 문맥 추론 80.43% 대비 Memorilla **84.33%**, 원문 표현 토큰은 **108× 적음**.
- 에이전트 궤적처럼 문서 수(과거 턴)가 늘어나는 연속 학습에도 도움이 된다고 해요.
- TextWorld에서 이미 탐험한 방을 헤매는 경향이 줄고, 전체 이력 in-context 학습 평균 성공률 **18.6% → 24.2%**로 올랐다고 해요.

짧은 abs 요약이지만 핵심 주장과 수치는 원문에 있는 것만 옮겼어요.
