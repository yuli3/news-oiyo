---
id: trend-16fd1e490fbeda12
title: "unsloth/DeepSeek-V4.1-Flash-1017-GGUF · Hugging Face"
sourceUrl: "https://huggingface.co/unsloth/DeepSeek-V4.1-Flash-1017-GGUF"
summary: "Unsloth가 DeepSeek-V4.1-Flash의 소규모 업데이트인 1017 버전용 GGUF 저장소를 열었어요. 모델 카드는 추론·코딩·에이전트·비전 벤치마크가 크게 올랐다고 밝히지만, 저장소 상단에는 양자화 파일이 곧 올라온다는 'WIP' 표시가 있어요. MIT 라이선스예요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

Hugging Face 페이지 본문은 채팅 템플릿 코드가 대부분이라, 저장소의 모델 카드(README.md) 원문 전체를 받아 읽고 옮겼어요. r/LocalLLaMA에서 공유된 링크예요.

### 상태
저장소 맨 위에 **"WIP - 양자화 파일과 구현은 곧 올라와요"**라고 적혀 있어요. 즉 이 글을 쓰는 시점에 Unsloth 저장소는 원본 모델 카드를 옮겨 둔 준비 단계예요. 베이스 모델은 `deepseek-ai/DeepSeek-V4.1-Flash-1017`이고 라이선스는 MIT예요.

### DeepSeek-V4.1-Flash-1017이란
DeepSeek-V4.1-Flash의 **소규모 업데이트**로, 추론, 코딩, 에이전트 작업, 시각 벤치마크 전반에서 큰 개선이 있었다고 해요. 동시에 작업 실행 시간과 출력 길이를 줄여 더 빠르고 싸게 일을 끝낼 수 있고, 여러 에이전트 하니스에서 성능–비용 파레토 경계를 앞당겼다고 설명해요.

### 벤치마크(모델 카드 표 일부)
| 벤치마크 | V4.1-Flash-1017 | V4.1-Flash | GPT-5.6 Sol | Opus 5 |
|---|---|---|---|---|
| HLE(도구 없음) | 42.6 | 36.8 | 44.5 | 56.3 |
| Terminal-Bench 4.0 | 42.3 | 31.2 | 39.9 | 51.8 |
| DeepSWE v1.1 | 77.0 | 74.2 | 73.0 | 74.0 |
| ProgramBench | 29.1 | 20.3 | 23.0 | 37.0 |
| Automation-Bench v1.0.6 | 60.5 | 54.8 | 45.8 | 50.3 |
| Agents' Last Exam | 35.4 | 31.8 | 26.7 | 28.6 |
| Apex Bench v1.1 | 72.1 | 64.6 | 54.3 | 65.8 |
| BabyVision(도구 사용) | 92.5 | 89.6 | 88.9 | 94.1 |

표에는 K3와 GLM-5.3도 비교 대상으로 들어 있어요. Terminal-Bench 4.0은 Claude Code 하니스, DeepSWE v1.1은 Mini-SWE-V2 하니스로 쟀다고 각주에 적혀 있어요. 수치는 DeepSeek 측 발표예요.

### 프롬프트 인코딩과 추론
- 이번 배포에는 **Jinja 채팅 템플릿이 없어요**. 대신 `encoding` 폴더에 멀티턴, 도구 호출, thinking 모드, 숫자형 reasoning effort, 대화 중간 시스템 메시지, 이미지 끼워 넣기 테스트가 담긴 파이썬 참조 구현이 있어요.
- 프로덕션용으로 **deepseek-recipe**(파이썬 바인딩이 있는 Rust 라이브러리)를 함께 공개했어요. Messages, Chat Completions, Responses API 요청을 대화 형식으로 바꿔 V4/V4.1 프롬프트나 토큰 ID로 인코딩하고, 출력을 다시 응답으로 파싱해요.
- 권장 샘플링은 `temperature` 1.0, `top_p` 1.0, 컨텍스트 창 1M 토큰, `max_tokens` 256K 이상이에요.
