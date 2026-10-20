---
id: trend-5e8c805f67bcaca7
title: "ornith-ai/Ornith-1.5-122B (Qwen finetune)"
sourceUrl: "https://huggingface.co/ornith-ai/Ornith-1.5-122B"
summary: "Ornith-1.5-122B는 Qwen을 파인튜닝한 122B MoE 모델로, DGX 한 대에서 돌아가고 MIT 라이선스로 공개됐어요. 개발사는 더 강하고 빠르고 출력이 짧다고 주장하며, 양자화한 모바일 변형도 있어요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

Hugging Face 모델 카드의 앞부분과 벤치마크 표 일부를 읽고 옮겼어요.

### 무엇인가
"Stronger. Faster. Leaner."를 내건 Ornith-1.5 제품군의 가장 큰 모델이에요. **122B MoE** 모델로 단일 GPU(DGX 한 대) 배포를 목표로 했고, 양자화한 **Ornith-1.5-122B-Mobile** 변형으로 모바일 기기에도 올릴 수 있다고 해요. Reddit 제목에 따르면 Qwen 파인튜닝이에요. 가중치는 **MIT 라이선스**로 공개됐어요.

### 개발사 주장
- 벤치마크 결과가 더 좋고, 작업을 더 빨리 끝내고, 출력이 더 짧아요.
- 지시 따르기, 작업 분해, 실제 업무 상황 지식이 좋아졌어요.
- 비슷한 크기 오픈소스 모델 가운데 최고 수준이라고 해요.

### 벤치마크 표 일부(코딩)
카드의 표에서 비교 대상은 Qwen3.8-Flash-Next(125B), Qwen3.8(27B dense), Nemotron 3.5 Super VL(120B), DeepSeek-V4-Flash-0731(284B), Beam(501B)이에요.
- TerminalBench 2.1: Ornith 81.2, Qwen3.8-Flash-Next 83.4, DeepSeek-V4-Flash 82.7
- CyberGym: Ornith 80.0, Qwen3.8-Flash-Next 78.0, DeepSeek-V4-Flash 76.7
- NL2Repo: Ornith 51.2, Qwen3.8-Flash-Next 45.2, DeepSeek-V4-Flash 54.2
- SWE-bench Pro(no-hack): Ornith 76.9, Qwen3.8-Flash-Next 43.9, Qwen3.8 65.5

모든 항목에서 앞서지는 않아요. 표의 나머지 항목은 읽지 않았고, 수치는 개발사 자체 평가예요.
