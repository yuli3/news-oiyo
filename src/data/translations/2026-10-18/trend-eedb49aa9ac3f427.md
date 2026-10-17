---
id: trend-eedb49aa9ac3f427
title: "EpochGo: Local-first multi-agent AutoML engine using offline Ollama LLMs and deterministic Scikit-Learn pipelines [P]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x8c2sq/epochgo_localfirst_multiagent_automl_engine_using"
summary: "EpochGo는 로컬 Ollama LLM(qwen2.5-coder:7b)이 스키마 메타데이터만 보고 특성 공학·모델링 전략을 짜고, 실제 학습은 결정적 scikit-learn 파이프라인이 하는 오프라인 AutoML 엔진이에요. 생성 코드는 AST로 검증하고, 최적 모델은 FastAPI 엔드포인트로 자동 배포해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Reddit은 API 키 없이 본문을 직접 읽을 수 없어 RSS 발췌(본문 전체로 보임)로 옮겼어요. 아키텍처 GIF와 GitHub 저장소는 보지 않았어요.

### 풀려는 문제
작성자는 응용 머신러닝의 두 병목을 들어요.
1. **클라우드 API 비용과 데이터 프라이버시**: GPT-4 같은 클라우드 API에 기대는 에이전트형 ML 프레임워크는 비용이 계속 들고, 표 형식 데이터가 새어 나갈 위험이 있어요. 인도 DPDP나 GDPR 같은 규정에서 특히 문제라고 해요.
2. **수학 추론에서의 환각**: LLM이 학습 로직을 직접 생성할 때 선형대수, 하이퍼파라미터 최적화, 경사하강 계산에서 자주 틀린다고 해요.

### 구조: 추론과 실행 분리
| 계층 | 역할 |
|---|---|
| 로컬 LLM 오케스트레이터 | Ollama의 `qwen2.5-coder:7b`가 열 분포, 카디널리티, 결측을 살펴 특성 공학과 모델링 전략 초안을 짬. **원본 데이터 행은 보지 않고 스키마 메타데이터만** 추론 |
| 결정적 실행 | 모든 변환과 학습은 순수 scikit-learn `Pipeline` 객체로 실행 |
| AST 검증·안전 | 생성된 파이썬 코드를 실행 전에 추상 구문 트리로 파싱해 임의 시스템 명령이나 샌드박스 밖 데이터 유출을 막음 |
| 동적 서빙 | XGBoost, 랜덤 포레스트, 로지스틱 회귀 등을 격리된 K-폴드 교차검증으로 평가한 뒤, 최적 파이프라인을 컨테이너화된 FastAPI 엔드포인트로 자동 생성 |

### 실행 환경
16GB RAM의 일반 소비자 하드웨어(Mac·Linux·Windows)에서 **100% 오프라인**으로 돌아가고 클라우드 비용이 없다고 해요. 코드는 GitHub `AryanDinakaran/EpochGo`에 있어요. 작성자는 파이프라인 격리 설계와, 오프라인에서 카디널리티가 높은 범주형 데이터를 다룰 때의 엣지 케이스에 대한 피드백을 요청했어요.
