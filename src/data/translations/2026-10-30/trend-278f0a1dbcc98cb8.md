---
id: trend-278f0a1dbcc98cb8
title: "mistralai/Mistral-Large-4-1T-A52B · Hugging Face"
sourceUrl: https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B
summary: Mistral Large 4의 Hugging Face 모델 카드예요. 총 1조·활성 약 520억 파라미터 MoE로, 유럽 자체 데이터센터의 Grace Blackwell GPU 3,800개로 처음부터 학습했고, 100만 토큰 컨텍스트와 세 단계 추론 모드를 지원해요.
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-30
---

Hugging Face 모델 카드(README)의 앞부분과 주요 기능, 라이선스 부분을 읽고 옮겼어요. 권장 설정과 배포 예시는 다 읽지 못했어요. 공식 발표 글은 같은 날 따로 실린 항목에서 볼 수 있어요.

### 어떤 모델인가요

Mistral Large 4(Le Chonk)는 미스트랄의 가장 크고 유능한 모델이에요. **총 1조 파라미터의 네이티브 멀티모달 MoE**이고, 토큰당 활성 파라미터는 490억(임베딩·출력 레이어 포함 520억)이에요. 유럽에 있는 미스트랄 자체 데이터센터의 **NVIDIA Grace Blackwell GPU 3,800개**로 처음부터 학습했대요.

지시 따르기, 추론, 코딩, 에이전트 작업을 한 가중치에 합쳤고, 범용 모델이지만 사이버보안, 금융, 법률에서 특히 좋고 시각적 grounding에서는 폐쇄형 프런티어 모델을 넘는다고 해요. EU 공식 언어 전부를 포함해 160개 이상 언어를 구사해요. 체크포인트에는 DSpark 추측 디코딩 초안 헤드가 들어 있고, Blackwell용 NVFP4 양자화 체크포인트도 따로 있어요.

### 구조와 기능

- 라우팅 전문가 128개(토큰당 4개 활성)와 공유 전문가 1개의 세분화된 MoE
- **100만 토큰** 컨텍스트
- 텍스트·이미지 입력, 텍스트 출력(Pixtral식 비전 인코더)
- 추론 강도 low·medium·high(기본) 세 단계를 요청마다 설정
- 네이티브 함수 호출, JSON 출력, 엄격한 JSON 스키마 강제
- 보안 작업에서 오픈 가중치 최고 수준이면서 악의적 요청은 거절한다고 밝혀요.

### 라이선스

**Mistral Ecosystem Open-Weight License**로 공개해요. MIT를 수정한 라이선스로 상업·비상업 모두 쓸 수 있지만, 모델을 서비스로 제공하는(MaaS) 사업에는 미스트랄과 별도 상업 라이선스가 필요해요. Mistral API에서는 `mistral-large-4`로 제공돼요.
