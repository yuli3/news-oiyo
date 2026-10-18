---
id: trend-fbba8611836942ee
title: "Hybrid Reasoning Agents: LLM agents that think in latent space, act through text"
sourceUrl: "https://arxiv.org/abs/2610.18861"
summary: "잠재 공간에서 생각하고 텍스트로 도구를 쓰는 'HybridAgents' 논문이에요. HybridLink로 두 모드를 오가고 HybridSFT·HybridRL로 학습해, 11개 벤치마크에서 성능 10.4% 향상, 토큰 35.5–54.7% 절감, 추론 1.8–2.6배 가속을 보고했어요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

arXiv 초록 페이지(2610.18861, 2026-10-13 제출)만 읽고 옮겼어요. 45쪽 본문 PDF는 읽지 않아서 세부 실험 설정과 표는 담지 않았어요.

### 문제의식
논문은 "인간 언어를 넘어 생각하면서도, 바깥 환경과는 여전히 언어로 상호작용하는 에이전트를 어떻게 만들까?"라고 물어요. 지금의 LLM 에이전트는 추론과 상호작용을 모두 텍스트로 해요. 반면 잠재(latent) 추론은 효율적인 내부 매체지만 도구를 직접 쓸 수 없고 추론 과정이 투명하지 않다는 한계가 있다고 짚어요.

### 제안: HybridAgents
- 하나의 생성 과정 안에서 **잠재 추론과 텍스트 기반 상호작용을 동적으로 오가는** 에이전트예요.
- 가벼운 **HybridLink**가 텍스트 모드와 잠재 모드 사이 전환을 이어 주고, 에이전트의 **연속 작업 기억(continuous working memory)**이 여러 턴에 걸쳐 손실 없는 하이브리드 컨텍스트를 유지해요.
- 이 설계로 도구 통합 에이전트 능력을 지키면서 잠재 사고를 직접 들여다볼 수 있게 했다고 해요.

### 학습 방법
- **HybridSFT**: 백본이 HybridLink와 협응하도록 가르쳐 도구 통합 하이브리드 생성을 안정화해요.
- **HybridRL**: 언제 잠재 공간에서 생각하고 언제 텍스트로 행동할지 배워 추론을 확장해요.

### 결과(초록 기준)
3개 모델 규모, 수학·과학·의학·검색·에이전트 추론을 아우르는 11개 벤치마크에서 평가했어요. 텍스트 기반과 잠재 방식을 모두 포함한 프런티어 LLM 에이전트·프레임워크와 비교해 성능이 일관되게 **10.4%** 올랐고, 토큰은 **35.5–54.7%** 줄고, 추론은 **1.8–2.6배** 빨라지고, 비용은 **2.7–3.7배** 절감됐다고 보고해요. 코드와 데이터는 공개돼 있다고 밝혀요.

저자는 Jiaru Zou, Yunzhe Qi, Sirui Chen, Federico Bianchi, Shang Zhu, Pan Lu, Jingrui He, James Zou예요.
