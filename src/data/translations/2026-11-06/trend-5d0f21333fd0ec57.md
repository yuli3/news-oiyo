---
id: trend-5d0f21333fd0ec57
title: "Z.ai chief scientist Jie Tang just revealed the training pipeline behind the upcoming GLM-5.5 (32B, 122B, and 256B)"
sourceUrl: https://x.com/bebuu_ai/status/2118052769856888892
summary: "X 사용자 bebu가 Z.ai 수석 과학자 Jie Tang의 칭화대 강연 내용이라며 GLM-5.5(32B·122B·256B) 사전학습 파이프라인을 정리했어요. 웹·문서·책·코드·영상·음성 6개 내부 엔진에서 데이터를 모은다는 내용이에요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

r/LocalLLaMA 글은 "작은 GLM 모델이 온다, GLM 5.5에 32B 모델이 있다"는 한 줄과 함께 X 게시물을 걸었어요. 아래는 그 X 게시물(@bebuu_ai, 2026-11-04) 전문을 옮긴 거예요. 강연 원본이나 Z.ai 공식 발표는 확인하지 못했고, 게시자가 전한 내용이라는 점을 감안해 주세요.

### 게시물 번역
Z.ai 수석 과학자 Jie Tang이 오늘 칭화대학교 강연에서 곧 나올 **GLM-5.5(32B, 122B, 256B)**의 학습 파이프라인을 공개했어요.

공개 데이터셋에 기대지 않고, 사전학습 파이프라인은 6개의 별도 내부 엔진에서 데이터를 가져온다고 해요.

- **웹**: 하루 약 100억 페이지 속도로 1조 페이지를 크롤링하고, PB 규모 템플릿 클러스터링을 적용
- **문서**: 과학 PDF 20억 건을 GLM-OCR로 파싱(투기적 디코딩으로 4배 빠르게)
- **책**: 책 5천만 권, 레이아웃 재정렬과 깨진 텍스트 필터링
- **코드**: 저장소 5억 개를 실제 테스트와 이슈 설명이 붙은 실행 가능한 과제로 변환
- **영상**: 긴 시퀀스 세계 지식을 위한 영상 100억 개
- **음성**: 3억 시간 분량을 ASR로 다시 써서 수조 토큰으로

### 반응
게시물 조회수는 약 21.5만 회였어요. 댓글에는 "GLM이 크기 대비 가장 강한 모델을 내는 건 결국 데이터셋 덕분"이라는 의견과, 괄호 속 32B·122B·256B가 전문가(expert) 크기일 수 있다는 지적도 있었어요.
