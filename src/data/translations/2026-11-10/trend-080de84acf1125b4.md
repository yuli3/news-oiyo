---
id: trend-080de84acf1125b4
title: "llm-psicotest: a seeded 38-turn conversation to check whether a quant swap changed behaviour"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xs1my0/llmpsicotest_a_seeded_38turn_conversation_to
summary: "llm-psicotest는 OpenAI 호환 엔드포인트에 시드 고정 38턴 대화를 돌려, 양자화를 바꿨을 때 모델 행동이 달라졌는지 코드로 채점하는 도구예요. 작성자 측정에서 Strata의 IQ3_S가 IQ2_XS를 시드 4개 모두에서 앞섰다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Reddit은 수집 환경에서 막혔고(API 키 없음, Wayback 스냅샷 없음) RSS에 실린 게시글 본문을 기준으로 옮겼어요. GitHub 저장소와 RESULTS.md는 확인하지 않아 `partial`이에요.

### 무엇을 하나요

llm-psicotest는 OpenAI 호환 엔드포인트에 **38턴짜리 대화 하나**를 돌려요. 능력 항목 29개와 프로토콜 턴으로 이뤄져 있어요.

- 항목은 시드 기반 생성기로 만들어서, 같은 시드면 어느 기계에서든 바이트 단위로 같은 프롬프트가 나와요.
- 모든 턴을 계산된 정답과 비교해 코드로 채점해요. 제약이 걸린 산문, 그리고 초반에 정한 출력 규칙이 20턴 뒤에도 지켜지는지도 봐요.
- 작성자는 코드 채점 벤치마크 대부분이 객관식으로 이 두 가지를 피한다고 지적해요.

### 작성자 환경의 보정 결과

기본 모델 하나(Qwen3.8-Flash-Next GGUF), 구성 4개, 시드 4개로 돌렸어요. 29점 만점 평균은 이래요.

- Unsloth Studio: UD-Q3_K_XL 28.25, IQ2_XS 27.50
- Strata(작성자가 직접 운영하는 llama-server 스택): IQ3_S 28.00, IQ2_XS 25.50

같은 서버·설정에서 IQ3_S는 Strata의 시드 4개 모두에서 IQ2_XS를 앞섰어요(29, 28, 28, 27 대 25, 26, 26, 25).

### 사용법

Python 3.11 이상, 표준 라이브러리만 쓰고 MIT 라이선스예요. API 키를 환경 변수로 넣고 `psicotest run --base-url ... --model ... --seed 7`처럼 실행해요. RESULTS.md에 커뮤니티 결과를 받는데, 서버 버전, 컨텍스트 크기, KV dtype, 출력 예산을 함께 적어야 해요.
