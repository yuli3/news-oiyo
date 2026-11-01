---
id: trend-ef82819ff8fbe453
title: "Heretic 2.0 released: Model modification for everyone"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xl2tcm/heretic_20_released_model_modification_for
summary: "p-e-w가 언어 모델 검열 제거 도구 Heretic 2.0을 냈어요. 기존 방향성 abliteration 대신 직접 만든 Arbitrary-Rank Ablation(ARA)을 기본으로 쓰고, 플러그인 구조로 다시 짜 아첨 줄이기 같은 범용 모델 수정 도구로 넓혔대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

Reddit이 API 키 없이 막혀 있어 r/LocalLLaMA RSS 본문(앞 4,000자)을 기준으로 옮겼어요. 수치와 평가는 작성자 주장이에요.

### 무엇인가

작성자는 약 5개월 개발 끝에 **Heretic 2.0**을 공개했어요(github.com/p-e-w/heretic). Heretic은 언어 모델의 검열(거절)을 없애는 소프트웨어로, GitHub 별 3만7천 개, Hugging Face 모델 8,500개 이상, 누적 모델 다운로드 **8,800만 회**라고 해요.

2.0부터는 검열 제거 전용 도구에서 **범용 모델 수정 도구**로 넓어진대요. 검열 제거 외에도 뻔한 문장(slop) 억제, **아첨(sycophancy) 줄이기**, 감정 정렬 바꾸기 등을 할 수 있다고 해요. 기본 기능은 여전히 검열 제거예요.

### TL;DR

- 방향성 abliteration을 작성자가 처음부터 만든 조향 방법 **Arbitrary-Rank Ablation(ARA)**으로 바꿨어요. 몇 달 동안 테스터들이 써 왔고 이제 기본값이에요(기존 방식도 옵션으로 남아요).
- **플러그인 구조**로 완전히 다시 만들었어요. Scorer 플러그인은 무엇을 최적화할지, Modifier 플러그인은 실제 조향 방법을 정해요. 파이썬 파일 하나로 불러올 수 있대요.
- 비대화형 실행이 가능해져 종단 간 테스트로 품질 관리를 강화했어요.
- hyper-connection을 쓰는 모델을 지원하고 thinking 모델 지원을 크게 개선했어요.
- 1.x 설정과 **하위 호환되지 않아** 마이그레이션 가이드가 있어요. 기본 사용법은 `heretic Qwen/Qwen3.5-4B`처럼 여전히 간단해요.

### ARA란

abliteration은 거절 같은 행동이 잔차 공간에서 **방향 하나(rank-1 부분공간)**로 표현된다고 가정해요. 연구에서는 이게 전부인지 의심해 왔고 다방향 ablation이나 "representation cones" 같은 대안 논문이 나왔어요. 작성자는 올해 초 ablation 변환을 고정 rank 부분공간에 묶는다는 생각 자체를 버린 방법을 실험했고, 3월에 첫 ARA를 PR로 공개했대요. 이후 설명은 RSS 본문이 끊겨 옮기지 못했어요.
