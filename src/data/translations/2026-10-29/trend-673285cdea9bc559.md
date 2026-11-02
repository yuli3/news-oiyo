---
id: trend-673285cdea9bc559
title: "I fine-tuned an LLM to clean up transcriptions for my voice-to-text app - 받아쓰기 정리용 LLM 미세조정기"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xhr7xz/i_finetuned_an_llm_to_clean_up_transcriptions_for
summary: "음성 입력 앱 WhisperNow 개발자가 받아쓰기 결과의 군말·말 바꿈·자기 정정을 지우고 목록을 정리하는 LLM을 직접 미세조정했어요. 6만 6,557행 데이터셋을 만든 과정을 공유했어요."
translationStatus: blocked
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

> Reddit 원문은 자동 수집이 막혀(인증 키 없음, 아카이브 없음) 열지 못했어요. RSS 피드에 실린 본문 발췌만 바탕으로 정리했고, 댓글과 이미지·영상은 보지 못했어요.

### 무엇을 만들었나

글쓴이는 음성 입력 앱 **WhisperNow**를 만들었어요. WisprFlow 비슷한 앱이 넘쳐나서 한 걸음 더 나가, 받아쓰기 정리 단계를 위한 LLM을 직접 미세조정했어요.

- 군말(filler), 말을 꺼냈다 멈춘 부분, 자기 정정을 지워요.
- 목록 형식을 정리해요.
- 모두 기기 안(로컬)에서 처리해요.

### 데이터셋

- 총 **6만 6,557행**이에요.
- 공개 데이터셋(aawaaz, handy, Disfl-QA)을 합치고 이메일, 회의록, 레시피, 명령 같은 합성 받아쓰기를 더했어요.
- 정리된 정답은 gpt-6.1-sol이 앱이 클라우드 모델에 보내는 것과 같은 프롬프트로 썼어요.

### 찾은 약점

학습 중 긴 받아쓰기, 음성 인식이 잘못 들은 단어, 잘린 단어('interf interface'), 정정어 사용 같은 약점을 발견했다고 해요. 발췌가 여기서 끊겨 해결 방법과 결과는 확인하지 못했어요.
