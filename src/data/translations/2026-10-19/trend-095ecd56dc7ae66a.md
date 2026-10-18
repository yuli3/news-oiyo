---
id: trend-095ecd56dc7ae66a
title: "DeepSeek v4.1 Flash 1017 for Dwarfstar (ds4)"
sourceUrl: "https://huggingface.co/nazeshinjite/DeepSeek-V4.1-Flash-1017-ds4-GGUF"
summary: "DeepSeek-V4.1-Flash-1017을 DwarfStar(ds4) 엔진용으로 2.36bpw까지 줄인 GGUF예요. 128GB Mac에서 SSD 스트리밍으로 돌리도록 만들었고 전문가 캐싱 시 디코드가 최대 20tps라고 해요. antirez의 Q2와 같은 레시피에 1017용 imatrix만 바꿨어요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

Hugging Face 모델 카드 본문 전체를 읽고 옮겼어요. r/LocalLLaMA에서 공유된 링크예요.

### 무엇인가
DeepSeek-V4.1-Flash-1017을 **DwarfStar(ds4)**용으로 양자화한 GGUF예요. Engram을 뺀 기준 **2.36bpw**이고, 라우팅 전문가(routed experts)는 2.25bpw, 나머지는 8비트 이상이에요. antirez의 DeepSeek-V4.1-Flash-Q2.gguf와 같은 레시피와 파일 배치를 쓰되, 1017 가중치로 만들고 1017에서 보정한 imatrix를 썼어요. **128GB 시스템에서 SSD 스트리밍**을 하도록 설계했고, 전문가 캐싱을 쓰면 디코드가 최대 **20tps**까지 나온다고 해요.

### 파일
| 파일 | 크기 | 비고 |
|---|---|---|
| DeepSeek-V4.1-Flash-1017-Q2.gguf | 340.60 GiB | 주 가중치 151.77 GiB |
| DeepSeek-V4.1-Flash-1017-Vision.gguf | 0.90 GiB | 별도 비전 인코더 |

언어 GGUF에는 네이티브 FP8 **Engram 테이블 188.83 GiB**가 들어 있어요. ds4는 필요한 행만 디스크에서 바로 읽고 전체를 올리지 않으니 빠른 로컬 SSD에 두라고 해요. 페이지가 표시하는 모델 크기는 755B 파라미터예요.

### 실행
언어 모델은 현재 ds4에서 수정 없이 로드돼요. 메모리 옵션은 antirez의 Q2와 같아요: 128GB Mac 한 대에서 SSD 스트리밍, 두 대에 나눠 상주(TP), 더 큰 Mac에서 전부 상주.

```
./ds4 -m gguf/DeepSeek-V4.1-Flash-1017-Q2.gguf --ssd-streaming --ctx 32768
```

**비전**은 ds4 PR #1225가 병합될 때까지 그 PR이 필요해요. 현재 ds4는 첫 V4.1 체크포인트의 비전 파일만 받는데, 그 파일을 이 모델에 쓰면 로드는 되지만 다른 언어 가중치와 함께 학습된 비전 타워라 쓰지 말라고 경고해요.

### 양자화 세부
ds4의 기본 `--quant q2` 레시피를 그대로 썼어요(라우팅 gate/up 전문가 IQ2_XXS, down 전문가 Q2_K, 어텐션 투영·공유 전문가·출력 Q8_0, 나머지 F16/F32, Engram 테이블은 바이트 그대로 복사). 텐서 이름, 타입, 오프셋, 파일 크기(365,713,686,528바이트)가 antirez의 Q2와 정확히 같아요. 차이는 imatrix 하나예요. antirez의 imatrix는 공개되지 않았고 첫 체크포인트로 모은 것이라, 이 빌드는 Lucebox가 1017 가중치로 모은 imatrix를 썼어요. 15,360개 라우팅 전문가 중 32개는 보정 중 토큰을 한 번도 받지 않아 중요도 가중치 없이 양자화됐어요. 두 파일 모두 ds4 검증기를 통과했고 SHA-256 체크섬도 공개돼 있어요. 원본은 MIT 라이선스예요.
