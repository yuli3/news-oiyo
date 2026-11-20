---
id: trend-81bef65a15467adf
title: "Inkling 2 Mini"
sourceUrl: https://thinkingmachines.ai/news/inkling-2-mini
summary: "Thinking Machines Lab이 노트북에서 돌아가는 오픈 웨이트 모델 Inkling 2 Mini를 공개했어요. 중간 층을 토큰마다 세 번 도는 looped transformer MoE(총 26.4B, 활성 3.4B)로, 100B 미만 오픈 모델 중 DeepSWE v1.1 48.2%로 1위라고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

Thinking Machines Lab 공지(2026년 11월 20일) 본문과 벤치마크 표 앞부분을 읽고 옮겼어요. 표 뒷부분(추론·지식 항목 일부)과 이후 내용은 읽지 못했어요.

### 무엇인가

- Inkling 2 Mini는 노트북에서 돌릴 만큼 작지만 빠르고 강한 모델이라고 소개해요. 오픈 웨이트로 공개했고 Tinker에서 추론과 커스터마이징을 바로 쓸 수 있어요.
- **looped transformer**예요. 토큰마다 모델의 중간 층을 세 번 실행해 더 많이 추론하고, 에이전트 코딩처럼 추론 품질이 중요한 작업에서 적은 토큰으로 정답에 닿는다고 해요.
- 총 26.4B 파라미터, 활성 3.4B인 MoE이고, 루프를 감안하면 토큰당 5.4B 가중치가 활성화돼요.
- 총 100B 미만 오픈 웨이트 모델 중 DeepSWE v1.1(48.2%), Vals Index v2.2(46.5%)에서 1위이고, 비슷한 성능 모델보다 빠르다고 해요.

### 루프와 모니터링 가능성

- 루프는 추론을 글로 적지 않고도 더 길게 생각하게 해 주기 때문에, CoT를 읽어 모델을 감독하는 능력(monitorability)에 영향을 줘요.
- 함께 공개한 연구용 '가변 루프' 모델로 측정해 보니, CoT 없이 해낼 수 있는 시간 지평이 1회 통과 16초에서 3회 37초로 늘었고, 직렬 추론 벤치마크 성능은 학습 때의 두 배인 10회 루프까지 계속 올랐다고 해요.
- 루프가 늘수록 CoT는 짧아졌지만 끝까지 읽을 수 있었고, 에이전트 사보타주 테스트 점수가 높아지는 경향은 없었다고 해요.

### 로컬 실행

- 가중치 대부분은 NVFP4로 학습·배포되고 마지막 4개 층만 MXFP8이에요. 전체 메모리 약 20GB라 일반 노트북이나 데스크톱 AI 컴퓨터에서 돌아가요.
- 연구원들이 비행기 안에서 비행기 모드의 MacBook Pro(M5 Pro, 48GB)로 오프라인 실행해 몇 분 만에 플레이 가능한 비행 시뮬레이터를 만들었다고 해요.

### 능력

- 장기 에이전트 작업에 강하고, DeepSWE v1.1, SWE-bench Pro v2 같은 에이전트 코딩 벤치마크에서 비교 모델을 앞서며 일부 항목에서는 Qwen3.8-27B에만 뒤진다고 해요. 커널 최적화 벤치마크 PMPP-Hard에서는 훨씬 큰 Inkling 2 Small에 근접해요.
- 루프는 추론을 높이지만 저장할 수 있는 지식을 늘리지는 않아, 사실성 지표 AA-Omniscience는 같은 크기 모델 수준이라고 해요. 가변 루프 모델에서 GraphWalks BFS, MRCR v2 같은 긴 문맥 과제는 루프가 늘수록 좋아졌지만 SimpleQA Verified 같은 지식 과제는 그대로였어요.
- 대신 검색·도구 사용으로 지식 격차를 메워 BrowseComp(79.0%), DeepSearchQA(85.3%), MCP Atlas(82.7%)에서 비슷한 크기 오픈 모델 중 1위라고 해요. 표에는 SWE-bench Verified(bash only) 79.2% 등도 나와요. 평가 설정은 모델마다 다르다고 밝혀요.
