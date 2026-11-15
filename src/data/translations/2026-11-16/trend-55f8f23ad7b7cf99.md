---
id: trend-55f8f23ad7b7cf99
title: "Basalt 0.4.0: More models, still as fast - Qwen 27B up to 770 tok/s on a 5090"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xx1cu9/basalt_040_more_models_still_as_fast_qwen_27b_up
summary: "로컬 추론 엔진 Basalt 0.4.0이 첫 dense 모델로 Qwen 3.8 27B를 지원해요. RTX 5090에서 단일 스트림 기준 구조화 출력 최대 초당 776토큰, 대화 262토큰이고, BF16 원본 대비 top-1 일치율은 92.8%라고 개발자가 밝혔어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

Mac mini의 자동 수집은 Reddit API 키가 없어 막혔고, 공개 Reddit 글을 로그인 없이 직접 열어 옮겼어요. 원문은 짧은 업데이트 글이에요.

### 지난 글 이후 바뀐 점

- 다중 모델과 라우터 지원이 들어갔고, 첫 대상은 **DeepSeek V4.1 Flash**예요(IQ1_M, RTX 5090 + 5060 Ti에서 대화 초당 90토큰, 구조화 출력 246토큰).
- 영상 지원, 채팅 안 파일, 여러 수정과 개선이 추가됐어요.

### 0.4.0: 첫 dense 모델

Basalt의 첫 dense 모델로 **Qwen 3.8 27B**를 지원해요. 개발자는 BF16 전체 모델 대비 top-1 일치율 92.8%로 빠르고 정확하다고 하고, Qwen 4를 대비해 dense 커널을 미리 준비한 것이라고 설명해요.

### 수치 (RTX 5090, 단일 스트림)

- 구조화 출력 최대 초당 **776토큰**, 대화 262토큰, 산문 194토큰
- 프리필 4k 컨텍스트에서 초당 12,000토큰(컨텍스트가 길수록 느려짐)
- BF16 대비 top-1 92.8%(KLD 0.0262)
- 채팅, 도구, thinking, 이미지·영상, 최대 262K 컨텍스트

### 링크

GitHub 저장소(`jesdga95/basalt`), 사이트, 27B 양자화 모델(Hugging Face `jesdga/Qwen3.8-27B-Basalt`)을 공개했어요. 개발자는 이슈·PR·벤치마크를 보내 준 사람과 후원자에게 감사를 전해요. 제목의 "770 tok/s"는 본문의 최대 776토큰 수치를 반올림한 표현이에요.
