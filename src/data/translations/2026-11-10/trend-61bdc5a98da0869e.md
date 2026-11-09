---
id: trend-61bdc5a98da0869e
title: "netease-youdao/Confucius4-R2T2 · Hugging Face"
sourceUrl: https://huggingface.co/netease-youdao/Confucius4-R2T2
summary: "NetEase Youdao가 스트리밍 음성 인식 모델 Confucius4-R2T2를 공개했어요. Qwen3-ASR-1.7B를 중국어·영어 1,500시간으로 다듬어 한 번 낸 글자를 고치지 않는 안정 접두사 방식이고, 160ms 설정 오류율 5.76%로 기본 모델(21.01%)보다 크게 낮다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Hugging Face 모델 카드(README)의 소개와 특징 목록을 읽고 옮겼어요. 사용법과 평가 표 전체는 읽지 않아 `partial`이에요. Reddit r/LocalLLaMA에서 화제가 된 링크예요.

### 어떤 모델인가요

Confucius4-R2T2는 지연이 짧고 정확한 **안정 접두사(stable-prefix) 스트리밍 음성 인식(ASR)** 모델이에요. 디코딩 청크를 80ms부터 2초까지 설정할 수 있어요. 출력은 단조(monotonic) 방식이라, 한 번 확정한 텍스트는 다시 고치지 않아요. 실시간 자막, 동시통역, 후속 NLP 파이프라인, LLM 에이전트처럼 텍스트를 바로 처리해야 하는 곳에서 글자가 바뀌며 깜빡이는 일이 줄어든다고 해요.

### 어떻게 만들었나요

R2T2는 "Real Real-Time Transcription"의 줄임말이에요. **Qwen3-ASR-1.7B**에 중국어·영어 음성 1,500시간으로 **Longest Stable Prefix(LSP) 학습**을 했어요. SFT와 GRPO 두 단계로 언어 디코더만 업데이트했고, 오디오 인코더와 프로젝터는 고정해 구조를 바꾸지 않았어요. LSP 목표와 명시적 `Wait` 동작으로 무엇을 확정해도 되는지, 언제 오디오를 더 기다려야 하는지 가르쳤어요.

### 특징

- **정확도**: 160ms·임시 토큰 1개 설정에서 오류율 5.76%로, 같은 설정 기본 모델(21.01%)보다 낮아요. 평가한 오픈소스 모델 중 1위이고, 전체 문맥 기준치(5.15%)에 가까워요(영어·중국어 13개 테스트셋).
- **안정 출력**: 품질 우선(`U=1`)과 지연 우선(`U=0`) 모드 모두 확정된 텍스트만 내보내요.
- **조절 가능**: 청크 길이와 임시 토큰 예산으로 정확도와 지연을 재학습 없이 조절해요.
- 같은 체크포인트로 오프라인·스트리밍 모두 되고, vLLM, transformers, llama.cpp 경로를 지원하며 주제·핫워드 힌트도 받아요.
