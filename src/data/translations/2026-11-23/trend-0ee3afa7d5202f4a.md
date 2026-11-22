---
id: trend-0ee3afa7d5202f4a
title: "Data Processing Incidents on Inference Providers"
sourceUrl: https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers
summary: "OpenRouter가 보안 연구자들이 일부 추론 제공업체의 데이터 유출·정책 위반 정황을 찾아낸 뒤, 업체 3곳을 퇴출하고 엔드포인트 125개를 데이터 무보존(ZDR) 대상에서 뺐다고 발표했어요."
translationStatus: full
sourceShort: true
translatedBy: Claude
translatedAt: 2026-11-23
---

OpenRouter 공지 전문을 읽고 옮겼어요. 원문이 짧은 공지예요.

### 무슨 일이 있었나

이번 주 보안 연구자들이 일부 추론 제공업체의 데이터가 유출됐거나, 업체가 밝힌 데이터 정책이 지켜지지 않은 정황을 보고했어요. OpenRouter는 연구자·업체와 함께 내용을 확인하고 있다고 해요. OpenRouter 자체가 침해되거나 무단 접근당한 증거는 없었고, 문제는 특정 제공업체에 관한 것이었어요.

### 취한 조치

- 조사 결과에 따라 제공업체 **3곳을 퇴출**했어요.
- **엔드포인트 125개를 ZDR(데이터 무보존) 대상에서 제외**했어요. 연구자가 지목한 곳과 예방 차원에서 추가로 뺀 곳이 함께 들어 있어요.
- 영향을 받았을 수 있는 고객 모두에게 알렸어요.

### 진행 중인 작업

- 연구자의 시험 방법을 가져와 상시 점검에 쓰도록 바꾸고 있어요.
- 요청·응답이 제3자에게 전달되는 경우를 찾으려고 네트워크 경로를 기술적으로 검증하고 있어요.
- 제외한 엔드포인트는 적절한 보증과 검증을 거친 뒤에만 ZDR 자격을 되돌려 줄 거예요.

OpenRouter는 Dragos 보고서에 감사를 표하며, 기준을 계속 높이고 이를 충족하는 업체만 남기겠다고 했어요. 공개 사고 보고를 올린 업체로 Atlas Cloud, Novita(MiniMax 요청 관련), Phala(11월 예비 보고), Together(2026년 6~7월 요청의 프롬프트 유출)를 나열했고, 공개 글이 없는 업체의 사용자에게도 따로 알렸다고 해요.
