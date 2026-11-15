---
id: trend-5e95901af8acdb13
title: "Agnes-AI/Agnes-2.5-Pro-Theta • HuggingFace"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xwu5jt/agnesaiagnes25protheta_huggingface
summary: "Agnes AI가 약 1,878억 파라미터 멀티모달 MoE 모델 Agnes 2.5 Pro Theta를 Apache 2.0으로 공개했어요. 제작사 표에서 GPQA Diamond 92.9, LiveCodeBench v6 90.5를 기록했고, BF16 가중치만 약 349.7GiB라 H200급 GPU 4장을 출발점으로 제시해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-16
---

Reddit 글은 Hugging Face 링크 하나뿐이라, 링크가 가리키는 **모델 카드(`Agnes-AI/Agnes-2.5-Pro-Theta` README)** 를 읽고 옮겼어요. 벤치마크는 제작사가 제공한 비교 자료예요. README 끝부분의 일부 코드 예시는 생략했어요.

### 어떤 모델인가

**Agnes 2.5 Pro Theta**는 대화형 추론, 과학 문제 풀이, 코딩, 시각 이해를 내세운 **멀티모달 전문가 혼합(MoE)** 체크포인트예요. 모델 구현, 토크나이저, 채팅 템플릿, 이미지·영상 프로세서를 함께 배포하고, Transformers로 로컬 추론할 수 있는 BF16 가중치를 제공해요.

### 벤치마크 (제작사 제공)

| 벤치마크 | Agnes 2.5 Pro Theta | Qwen3.8-27B | GLM-5.3-Flash | DeepSeek-V4.1-Flash-1017 |
|---|---|---|---|---|
| IFBench | **82.6** | 80.1 | 64.4 | 76.3 |
| AA-LCR | **84.7** | 72.6 | 76.7 | 80.4 |
| GPQA Diamond | **92.9** | 88.9 | 92.2 | 92.8 |
| SciCode | 56.0 | 47.9 | 53.4 | **57.6** |
| LiveCodeBench v6 | **90.5** | 90.3 | 80.6 | 89.7 |
| SWE-bench Pro | **64.1** | 61.7 | 59.7 | — |
| HLE-Diamond | 16.8 | 15.3 | 18.2 | **25.3** |

Nemotron 3.5 Super VL 120B도 비교 대상에 들어 있어요. SciCode는 하위 문제 단위 채점이라고 밝혀요.

### 모델 정보

- 총 파라미터 약 **1,878억 개**, 텍스트 디코더 52층
- MoE 블록마다 라우팅 전문가 512개, top-10 라우팅, 공유 전문가 분기
- 설정상 컨텍스트 한도 **262,144토큰**. 모든 길이와 모달리티 조합을 평가했다는 뜻은 아니라고 해요.
- 입력은 텍스트·이미지·영상 프레임, 출력은 텍스트. 강조 언어는 영어와 중국어
- Safetensors 샤드 105개, 가중치 약 375.5GB(약 349.7GiB)
- 커스텀 Transformers 코드라 `trust_remote_code=True`가 필요하고, 켜기 전에 코드를 검토하라고 권해요.
- 라이선스는 **Apache 2.0**이에요.

### 하드웨어

양자화하지 않은 가중치만 약 349.7GiB라, 완전히 GPU에 올리려면 **H200급 GPU 4장**이 현실적인 출발점이라고 해요(측정된 처리량 보장은 아님). 저장 공간은 최소 400GB, 큰 어휘 조회 테이블 때문에 호스트 RAM도 넉넉해야 해요. 구성 검증은 PyTorch 2.14.1, Transformers 5.19.0 환경에서 했지만 전체 생성 과정을 검증한 건 아니라고 밝혀요.
