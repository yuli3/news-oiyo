---
id: trend-86df051dcd5632fb
title: "qev-0.8b · New SOTA tiny local decision model"
sourceUrl: "https://app.labqoat.com/e/qev/qev"
summary: "Labqoat이 게임 화면, 글, 받은편지함, 웹페이지를 읽고 질문에 보정된 확률로 한 번에 답하는 0.8B 결정 모델 qev를 공개했어요. 비슷한 크기 27개 모델 중 Benchmark Heaven 1위(77.1%), 응답 3.5ms라고 주장해요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

Labqoat 소개 페이지의 앞부분을 읽고 옮겼어요. 벤치마크 전체 표는 다 읽지 않았어요.

### 무엇인가
qev-0.8b는 "작은 로컬 결정 모델"이에요. 게임판, 게시물, 받은편지함, 웹페이지 등 무엇이든 읽고 그에 관한 질문에 **보정된 확률(calibrated probabilities)**로 답해요. 답은 **한 번의 순전파**로 나와요. 노트북에 들어가는 크기예요.

### 주장하는 수치
- Benchmark Heaven **77.1%**, 27개 모델 중 1위
- 지연 시간 p50 **3.5ms**, 27개 중 가장 빠름
- JevSpatial games **74.2%**, 1위
- Mac에서 8비트로 **1.3GB RAM**

### 라이브 데모
페이지의 모든 것이 실제 모델이 실시간으로 돌리는 거라고 해요. 게임 6개와 읽기 작업 6개, 모두 12개가 GPU 한 대에서 동시에 돌아가요. 게임 중 테트리스, 팩맨, 2048, 브레이크아웃, 두더지 잡기는 **학습 데이터에 없었고** 스네이크만 봤던 게임이래요. 아무도 안 볼 때는 서버가 잠들어서 첫 방문자는 콜드 스타트를 기다려야 해요.

### 벤치마크 방법
약 1B 파라미터 결정 모델 26개와 비교했어요. 모든 모델에 같은 문항과 채점을 쓰고, NVIDIA L40S 한 장에서 각자 공개한 추론 방식으로 돌렸대요. qev는 Benchmark Heaven, JevExtra, JevSpatial에서 1위였고, 다음 두 모델(decision-2b, decider-2b)은 두 배 넘게 크다고 해요. 모두 개발사 자체 평가예요.
