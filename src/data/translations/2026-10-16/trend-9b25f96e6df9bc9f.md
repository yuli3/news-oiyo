---
id: trend-9b25f96e6df9bc9f
title: "FLUX.3 Image Klein just got weights published on hugging face"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x6t5fc/flux3_image_klein_just_got_weights_published_on"
summary: "Black Forest Labs가 5.6B 오픈웨이트 이미지 생성·편집 모델 FLUX 3 Image Klein을 Hugging Face에 공개했어요. 프롬프트와 참조 이미지 최대 10장으로 한 장을 만들고, 박스 좌표로 배치를 지정할 수 있어요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Reddit 글은 403이라 읽지 못했지만, RSS 본문이 Hugging Face 모델 카드 링크 하나뿐이라 **링크된 원문(모델 카드)**을 읽고 옮겼어요. 모델 카드 앞부분(약 3,000자)까지만 읽어 `partial`로 표시해요.

### 무엇인가
FLUX 3 Image Klein은 텍스트-이미지 생성과 이미지 편집을 위한 **5.6B 오픈웨이트 모델**이에요. 프롬프트와 참조 이미지 최대 10장을 받아 이미지 한 장을 돌려줘요. 텍스트-이미지, 단일 참조 편집, 다중 참조 합성이 모두 같은 모델로 돌아가고, 텍스트 인코더는 Qwen3-VL-4B-Instruct예요. 5.6B는 이미지 트랜스포머 크기이고 텍스트 인코더는 별도라고 해요.

저장소는 공개돼 있지만 파일에 접근하려면 연락처 공유 조건에 동의해야 해요.

### 체크포인트
- **Klein Base**: 증류 전, bfloat16, 50스텝, guidance 3.5. 파인튜닝·LoRA 학습·연구용이에요.
- **Klein**: 증류, bfloat16, 16스텝, guidance 없음. 생성·편집·자체 호스팅용이고 BFL API 뒤에 있는 체크포인트예요.

BF16 트랜스포머와 FP8, NVFP4 변형, 텍스트 인코더, 이미지 오토인코더가 함께 들어 있어요.

### 주요 기능
- 텍스트-이미지, 단일 참조 편집, 다중 참조 생성을 한 모델로 해요.
- **프롬프트 안 바운딩 박스**: 0–1000 격자에 박스로 요소를 배치하고, 프롬프트로 색 바꾸기·이동·교체·삭제를 해요. 박스는 위치와 크기를 안내할 뿐 픽셀을 딱 잘라 막는 마스크는 아니라고 해요.
- 이미지 안 텍스트 렌더링을 지원해요.

### 프롬프트 업샘플러를 꼭 쓰라고 해요
모델은 업샘플러가 쓴 자세한 캡션에서 가장 잘 동작하고, 짧은 프롬프트를 그대로 넣으면 평범한 결과가 나온다고 해요. 참조 코드는 기본으로 업샘플러를 돌리지만 Diffusers는 그렇지 않아서 파이프라인 전에 따로 돌려야 해요.

### 라이선스
FLUX Kommunity License로, 비상업적 사용을 허용하고 조건을 충족하는 사용자에게는 상업적 결과물 예외를 준다고 해요.
