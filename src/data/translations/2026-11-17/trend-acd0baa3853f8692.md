---
id: trend-acd0baa3853f8692
title: "First phase of embedded assessments at OpenAI"
sourceUrl: https://openai.com/index/our-first-phase-of-embedded-assessments
summary: "OpenAI가 Apollo Research, METR, Transluce, Goodfire 네 곳과 '임베디드 평가' 1단계 계약을 맺었어요. 내부 체크포인트·코드·데이터·모니터링 기록에 깊이 접근해 정렬과 안전장치를 독립 평가하고, 감독·공개 절차도 공개했어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

OpenAI 공식 글 전체를 읽고 정리했어요.

### 임베디드 평가란

OpenAI는 첫 단계 '임베디드 평가(embedded assessments)'를 위해 독립 평가기관 네 곳 — **Apollo Research, METR, Transluce, Goodfire** — 과 계약했어요. 외부 전문가가 연구자들이 쓰는 내부 자원(모델 체크포인트, 소스 코드, 학습·평가 데이터, 모니터링 시스템, 기술 문서, 담당 연구자·엔지니어와의 대화)에 깊이 접근해 오랜 기간 모델 정렬과 안전장치의 효과를 평가하는 방식이에요. 첫 평가는 학습 중·내부 사용 중 모델의 정렬과 안전장치에 집중하고, 'White House Accord on Super Intelligence'에서 약속한 독립 평가 이행의 일부이기도 해요.

### 네 기관의 역할

- **Apollo Research**: 모델이 개발자 의도에 몰래 반하는 행동을 할 수 있는지, 안전장치가 이를 잡는지 봐요. ① 학습이 전복을 유도하지 않았는지 ② 강한 평가·레드팀이 전복을 끌어내지 못하는지 ③ 내부 사용 중 전복 시도가 없었는지 ④ 전복 추론이 탐지 가능한지, 네 주장을 두 단계로 평가해요.
- **Goodfire**: 해석 가능성 연구자를 상주시켜 모델 내부를 분석하고 학습 실행 모니터링·디버깅·정렬을 도와요. 주 독자는 OpenAI 내부 연구자이고, 진행하며 결과도 공개해요.
- **METR**: 지금까지 가장 큰 강화학습 실행에서 기존 테스트와 모니터가 놓친 정렬 실패를 찾는 평가와, 모니터 스트레스 테스트 후속 평가(범위 합의 대기)를 해요.
- **Transluce**: 사후 학습 정렬 평가의 품질과 커버리지를 검토해요. 2027년 초 약 8주짜리 후속 평가도 계획 중이에요.

### 운영 원칙

- **범위 설정**: 합의된 범위에서 시작하되 증거를 따라갈 자유를 줘요. 가중치·아키텍처 같은 민감한 IP는 OpenAI 연구자와 함께 분석하는 대안을 검토해요.
- **보안 환경**: 민감 정보가 필요하면 OpenAI 사무실에서 OpenAI 기기로 일하고, 최소 직원과 같은 보안 기준을 따라요.
- **감독·분쟁 해결**: OpenAI Foundation 이사회의 독립 위원회인 안전·보안위원회(SSC)가 비편집 보고서를 받고 평가자와 비공개로도 소통해요. 이견은 Safety Advisory Group과 경영진을 거쳐 SSC가 최종 판단해요.
- **직원 인터뷰**: 비공개(off the record)로 진행하고, 별도 확인(attestation) 절차로 OpenAI가 확인한 진술은 공개할 수 있어요. OpenAI가 확인을 거부했다는 사실도 공개할 수 있어요.
- **이해충돌·냉각기간**과 **공개**: 평가자는 독립적으로 공개하되 OpenAI는 기밀 정보를 가릴 권리와 책임 있는 공개 지연을 요청할 권리를 가져요.

앞으로 안전 프레임워크 준수, 조직 문화와 프로세스를 보는 임베디드 평가도 검토한다고 해요.
