---
id: trend-2d71bd65ab6846c3
title: "AtomicChat/Ling-3.1-flash-GGUF · Hugging Face"
sourceUrl: "https://huggingface.co/AtomicChat/Ling-3.1-flash-GGUF"
summary: "AtomicChat이 inclusionAI의 Ling 3.1 flash를 자체 importance matrix로 양자화한 GGUF를 공개했어요. 141.8GB(1비트)부터 600.8GB(Q8_0)까지 13종이고, 파일마다 BF16 대비 KL 발산과 top-1 일치율을 표로 밝혀요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Hugging Face 저장소 README 원문을 읽고 옮겼어요. 원문은 측정 방법 설명 일부까지 포함해 짧은 편이에요.

### 무엇인가
inclusionAI의 **Ling 3.1 flash**를 GGUF로 빌드한 저장소예요. AtomicChat 자체 importance matrix를 썼고, 빌드에 쓴 보정(calibration) 데이터는 공개돼 있어요. llama.cpp b11571 이상에서 돌아가요.

### 파일 고르기(일부)
| 파일 | 크기 | KL 발산 | top-1 |
|---|---:|---:|---:|
| AD-Q8_0 | 600.8GB | 0.00503 | 97.88% |
| AD-Q5_K_M | 400.2GB | 0.00766 | 97.34% |
| AD-Q4_K_M | 354.4GB | 0.01114 | 96.86% |
| AD-IQ3_M | 277.1GB | 0.02564 | 95.27% |
| AD-IQ2_M | 218.1GB | 0.05927 | 92.72% |
| AD-IQ1_M | 160.9GB | 0.16597 | 87.86% |
| AD-IQ1_S | 141.8GB | 0.20448 | 86.41% |

- **KL 발산**: 양자화 모델의 예측이 BF16에서 얼마나 벗어나는지예요. 낮을수록 좋고 0이면 같아요.
- **top-1**: BF16과 같은 다음 토큰을 고르는 비율이에요.
- 1비트 파일 두 개는 실험용이에요. 86–88%만 일치해서 자기 작업으로 먼저 확인하라고 해요.

### Atomic Dynamic 레이아웃
`AD-`는 라우팅되는 전문가(가중치의 97%)만 저비트로 두고, 어텐션·공유 전문가·라우터·dense 층은 q8_0 이상으로 유지하는 배치예요. 파일 이름은 전문가 gate/up 투영의 형식이고, down 투영과 마지막 다섯 블록의 모든 전문가는 한 단계 더 높게 둬요.

### 메모리
파일이 들어가고 컨텍스트용 여유가 조금 있으면 돼요. 72개 층 중 63개가 고정 크기 상태의 선형 어텐션이고 9개만 압축 어텐션 캐시를 써서, 대화당 약 0.5GB에 토큰당 약 10KB면 된다고 해요.

- 192GB → AD-IQ1_M
- 256GB → AD-IQ2_M
- 384GB → AD-Q4_K_M
- 512GB → AD-Q5_K_M
- 640GB → AD-Q8_0

Mac에서는 먼저 GPU 메모리 한도를 올리라고 해요(예: 256GB 기기에서 `sudo sysctl iogpu.wired_limit_mb=240000`).

### 실행
```bash
llama-server -hf AtomicChat/Ling-3.1-flash-GGUF:AD-Q4_K_M -ngl 99 -c 32768 --jinja
```
파일은 이름별 폴더에 최대 45GB 조각으로 나뉘어 있고, 첫 조각을 가리키면 나머지를 불러와요. 채팅 템플릿이 파일에 들어 있고 thinking은 기본으로 켜져 있어서, 끄려면 시스템 프롬프트에 `detailed thinking off`를 넣어요.

### 측정 방법
기준은 inclusionAI의 FP8 공개본을 BF16으로 변환해 양자화 없이 돌린 모델이에요(보류 세트 perplexity 2.3590). 보류 텍스트는 보정에 한 번도 쓰지 않은 `eval_neutral` 세트예요.
