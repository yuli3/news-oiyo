---
id: trend-2a6fc5bafce4b590
title: "Google DeepMind and Singapore Government collaborate to build fine-tuned AI model for scam detection"
sourceUrl: "https://deepmind.google/blog/on-device-ai-scam-detection-mddi"
summary: "구글 딥마인드와 싱가포르 GovTech가 로컬 사기 대화로 Gemma를 파인튜닝한 온디바이스 사기 탐지 모델을 공개했어요. 대화는 기기에서만 처리되고 동의 없이는 정부·구글이 볼 수 없다고 해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Google DeepMind 블로그(2026-10-14, JJ Geewax·Miguel de Andrés)를 옮겼어요.

### 문제
싱가포르에서 사기(투자·가짜 채용·공무원 사칭 등)가 신고 범죄의 절반 넘게를 차지하고, 2019년 이후 손실이 **S$40억**을 넘는다고 해요. 단순 피싱에서 **사회공학 대화**로 옮겨가며 손실의 최대 **80%**가 그 유형이라고 해요.

### 해법
National AI Partnership 일환으로 **경량 Gemma**를 현지 사기 대화(기관·은행·유명인 사칭, 지역 유행 수법)로 파인튜닝한 **온디바이스** 탐지 모델을 만들었어요. 클라우드 서버 스캔이 아니라 기기에서 대화 패턴을 보고 조작 의도를 경고해요.

### 프라이버시·거버넌스
- 앱 배포 시 **사용자 동의** 하에서만 온디바이스 대화에 접근
- 모델이 기기에서만 돌므로 배포를 통해 싱가포르 정부·구글이 대화를 볼 수 없다고 명시
- 파인튜닝은 GovTech가 관리하는 GCP **소버린 샌드박스**, 학습에 시민 개인정보 제외(익명화 신고·인텔리전스 피드)
- SICW 2026에서 발표

### 파이프라인
1단계 경량 분류기로 수신 메시지 스크리닝 → 2단계 파인튜닝 Gemma로 대화 스냅샷을 확인해 오탐 걸러냄.

### 2단계 추론
배터리 때문에 모든 메시지에 큰 모델을 돌리지 않고, 1단계에서 가볍게 걸러 의심만 2단계 Gemma로 본다고 해요. 경고는 기기에서 실시간으로 뜨며 민감 정보·송금 전 멈춤을 유도해요.

### 거버넌스 요약
소버린 샌드박스·시민 원본 데이터 미사용·합성·신고 기반 스트레스 테스트가 강조돼요. E2E 암호 메시징과 보호를 兼顾하는 모델 사례로 SICW에서 소개됐어요.
