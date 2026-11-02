---
id: trend-6e575c259ec2ef89
title: "Survival LLM: AI assistant and emergency library that runs on your own computer"
sourceUrl: https://www.brangus.io/survival-llm
summary: "Survival LLM은 인터넷 없이 내 컴퓨터에서만 도는 무료 오픈소스 AI 비서 겸 비상 도서관이에요. 의료 자료, FEMA·CDC 지침, 생존 매뉴얼, 위키백과 약 93만 문서를 담고, 답마다 출처 문단을 보여 줘요. 메모리에 맞춰 모델을 골라 내려받아요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 무엇인가

**Survival LLM**은 정전에 음식 보관, 화상 처치, 물 정화 같은 질문에 믿을 만한 출처로 답하고, 답이 어디서 왔는지 정확히 보여 주는 무료 AI 비서예요. 인터넷이 있을 때 설치해 두면 이후엔 인터넷이 필요 없어요. 무료 오픈소스이고 Mac(212MB)과 Windows(25MB)용 앱이 있어요.

### 특징

- **인터넷 없이 동작**: 모델과 도서관이 모두 내 컴퓨터에 있고, 질문이 밖으로 나가지 않아요.
- **출처 표시**: 답마다 읽은 문서를 나열하고, 누르면 해당 문단을 강조해 보여 줘요.
- **비상용 자료**: 의료 참고서, FEMA·CDC 지침, 생존 매뉴얼, 사용법·수리 가이드, 많이 읽힌 위키백과 문서 약 **93만 개**

### 컴퓨터에 맞춰 모델 선택

앱이 메모리를 확인해 맞는 모델을 받아요. 정전·응급처치 질문 22개를 블라인드로 채점한 자체 테스트 결과예요(이전 빌드 기준).

| 컴퓨터 | 모델 | 테스트 | 다운로드 |
|---|---|---|---|
| Mac 128GB 이상 | NVIDIA Nemotron 3.5 Super | 22개 중 21개 | 80GB |
| Mac 32–96GB | Qwen3.8 27B | 22개 중 21개 | 18GB |
| Windows 32GB 이상 | NVIDIA Nemotron 3.5 Lightning | 22개 중 19개 | 25GB |
| Mac·PC 16–31GB | IBM Granite 4.2 8B | 22개 중 14개 | 6GB |

작은 모델일수록 실수가 많아서 앱이 항상 출처를 보여 준대요.

### 설치

- 도서관은 전체 9GB(설치 후 19GB), 위키백과·iFixit을 빼면 1.3GB(설치 후 3GB)예요.
- Apple Silicon(M1 이상) macOS 14 이상, 64비트 Windows 10·11을 지원해요.
- 설치는 20분에서 2시간 30분 정도 걸리고 직접 누르는 시간은 5분쯤이에요. 앱스토어 앱이 아니라 처음 열 때 보안 경고를 직접 허용해야 해요.

> 소개 페이지 앞부분을 기준으로 옮겼어요. 도서관 구성 목록 뒷부분은 다 읽지 않았어요.
