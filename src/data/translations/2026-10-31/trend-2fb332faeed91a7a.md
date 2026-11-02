---
id: trend-2fb332faeed91a7a
title: "sensenova/SenseNova-Loop-9B-Preview · Hugging Face"
sourceUrl: https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview
summary: "SenseNova가 긴 컨텍스트와 에이전트 작업용 멀티모달 모델 SenseNova-Loop-9B-Preview를 공개했어요. 24개 디코더 층을 가중치를 공유한 채 두 번 돌리는 루프 구조와 2-stream mHC를 써서, 약 9B 파라미터로 14.6B 수준의 추론 경로를 만들어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

Hugging Face 모델 카드(README) 앞부분을 읽고 옮겼어요. 벤치마크 수치는 이미지로만 있어 옮기지 못했어요.

### 공개

2026년 10월 30일 **SenseNova-Loop-9B-Preview**가 공개됐어요. 긴 컨텍스트와 에이전트 워크플로를 위한 루프형 멀티모달 모델이에요. 텍스트와 이미지를 받아 텍스트를 생성하고, 문서 이해, 코딩, 외부 도구 상호작용을 섞는 용도를 겨냥해요. 라이선스는 Apache 2.0이에요. 모델 카드에는 모션 디자인, PPT 디자인, 데이터 분석 쇼케이스가 실려 있어요.

### 구조

**루프 디코더**와 **2-stream mHC(manifold-constrained hyper-connections)** 를 결합했어요. 연속된 디코더 층 블록을 가중치를 공유한 채 두 번 실행하고, 학습된 매핑이 루프 구간의 두 residual stream 사이 정보 흐름을 조절해요. 반복 블록의 파라미터를 복제하지 않고도 더 깊은 실행 경로를 얻는 방식이에요.

- **공유 루프 블록**: 24개 층을 두 번 적용해, 서로 다른 32개 층으로 56번의 층 실행을 만들어요.
- **하이브리드 어텐션**: 선형 어텐션과 풀 어텐션을 4층 패턴으로 번갈아 써요.
- **긴 컨텍스트 학습**: 텍스트, 이미지, 코드, 도구 궤적을 최대 262,144토큰 길이로 학습했어요.

### 사양

| 항목 | 값 |
|---|---|
| 규모 | 총 약 9B, 추론 시 약 14.6B |
| 입출력 | 텍스트·이미지 / 텍스트 |
| 루프 층 | [4, 28) 구간 2회, 가중치 공유 |
| 정밀도 | BF16 백본, FP32 mHC 라우팅 |

벤치마크 그림에는 BIRD-Dev, Terminal Bench 2.1, AutomationBench 등이 비교 대상으로 나와요. 기술 보고서는 아직 'TBD'예요.
