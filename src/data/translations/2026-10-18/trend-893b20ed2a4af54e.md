---
id: trend-893b20ed2a4af54e
title: "DeepSeek-v4.1-Flash-1017"
sourceUrl: "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017"
summary: "DeepSeek이 V4.1-Flash의 소규모 업데이트인 V4.1-Flash-1017을 Hugging Face에 MIT 라이선스로 공개했어요. 추론·코딩·에이전트·시각 벤치마크가 오르고 작업 시간과 출력 길이는 줄었다고 해요. Jinja 템플릿 대신 파이썬 인코딩 구현과 Rust 기반 deepseek-recipe를 함께 냈어요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

Hugging Face 모델 카드(기술 보고서 요약) 전체를 읽고 옮겼어요. 수치는 모두 DeepSeek이 자체 측정해 밝힌 값이에요.

### 어떤 업데이트인가
DeepSeek-V4.1-Flash-1017은 **DeepSeek-V4.1-Flash의 소규모(minor) 업데이트**예요. 추론, 코딩, 에이전트 작업, 시각 벤치마크 전반에서 성능이 크게 올랐고, 동시에 **작업 실행 시간과 출력 길이를 줄여** 더 빠르고 싸게 일을 끝낼 수 있게 했다고 해요. DeepSeek은 이를 여러 에이전트 하네스에서 "성능–비용 파레토 전선"을 앞으로 민 것이라고 표현해요.

### 벤치마크 (모델 카드 표 일부)
| 벤치마크 | V4.1-Flash-1017 | V4.1-Flash | Opus 5 |
|---|---|---|---|
| HLE (도구 없음) | 42.6 (텍스트 44.0) | 36.8 (39.1) | 56.3 |
| Terminal-Bench 4.0 | 42.3 | 31.2 | 51.8 |
| DeepSWE v1.1 | 77.0 | 74.2 | 74.0 |
| ProgramBench | 29.1 | 20.3 | 37.0 |
| Automation-Bench v1.0.6 | 60.5 | 54.8 | 50.3 |
| Agents' Last Exam | 35.4 | 31.8 | 28.6 |
| Apex Bench v1.1 | 72.1 | 64.6 | 65.8 |
| BabyVision (도구 사용) | 92.5 | 89.6 | 94.1 |

표에는 K3, GLM-5.3, GPT-5.6 Sol도 함께 실려 있어요. Terminal-Bench 4.0은 Claude Code 하네스, DeepSWE v1.1은 Mini-SWE-V2 하네스로 쟀다고 밝혔어요.

### 프롬프트 인코딩
- 이번 릴리스에는 **Jinja 형식 채팅 템플릿이 없어요.** 대신 `encoding` 폴더에 독립 실행형 파이썬 참조 구현(`encoding.py`)과 테스트 케이스를 넣었어요. 멀티턴, 도구 호출, thinking 모드, 숫자형 추론 강도(reasoning effort), 대화 중간 시스템 메시지, 이미지가 섞인 입력을 다뤄요.
- 프로덕션용으로는 **deepseek-recipe**를 따로 공개했어요. 파이썬 바인딩이 있는 Rust 라이브러리 묶음으로, Messages·Chat Completions·Responses API 요청을 대화 형식으로 바꾸고 V4/V4.1 프롬프트나 토큰 ID로 인코딩한 뒤, 모델 출력을 완성형 또는 스트리밍 응답으로 다시 파싱해요. 모델 추론, 도구 실행, HTTP 전송은 호출하는 쪽 몫이에요.

### 실행과 라이선스
- 로컬 실행은 `inference` 폴더의 가중치 변환·추론 안내를 따르라고 해요.
- 권장 샘플링: temperature 1.0, top_p 1.0, 컨텍스트 창 1M 토큰, max_tokens 256K 이상.
- 저장소와 가중치 모두 **MIT 라이선스**예요. 페이지 메타데이터 기준 전체 파라미터 표기는 약 7,632억(FP8·I8 혼합), 파일 크기는 약 510GB예요.
