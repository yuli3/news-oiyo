---
id: trend-c1d42f21dbbbe879
title: "Vibecoding an inference chip"
sourceUrl: https://ankitg.me/blog/vibecoding-inference-chip
summary: "Ankit Gupta가 코딩 에이전트로 AWS F2 FPGA에 DeepGrove의 삼진(ternary) 가중치 LLM을 올리고, 며칠간의 자동 실험으로 초당 6.43토큰에서 213토큰까지 33배 빠르게 만든 경험기예요. 토큰 비용은 약 1만 달러였다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

Ankit Gupta의 블로그 글(2026년 11월 20일) 앞부분과 함께 실린 FPGA 설계 프롬프트 일부까지 읽고 옮겼어요. 글이 길어 뒷부분은 읽지 못했어요.

### 시작

- 필자는 코딩 에이전트 덕분에 새 언어와 패러다임에 손댈 수 있게 됐고, 요즘은 하드웨어를 해킹한다고 해요. FPGA는 잘 몰랐고, C++가 산더미처럼 필요하고 파형을 손으로 분석해야 한다는 정도만 알았대요.
- "AI 추론에 쓸 수 있을까"가 출발점이었어요. 깃허브에 ML 모델을 FPGA로 옮기려는 저장소는 있지만, 코딩 에이전트가 저수준 C++·Verilog를 잘 쓰고 정확히 검증하는지에 대한 글은 못 봤다고 해요. 결론부터 말하면 "놀라울 만큼 잘한다"고 해요.
- 실물 대신 AWS F2 인스턴스(FPGA HBM 16GB)를 Codex에게 예약시켰고, 메모리가 적은 환경에 맞는 DeepGrove 창업자들의 삼진 가중치 아키텍처 모델을 골랐어요.

### 자동 연구 루프

- Conductor에서 클라우드 에이전트를 며칠 돌리며 가끔 격려만 했는데, 모델을 완전히 돌리고 첫 비트 단위 일치 기준선 대비 속도를 33배 올렸다고 해요.
- 실험 이력 전체에서 약 300만 줄을 쓰고 출력 파일 3,000만 줄을 파싱했고, Claude와 OpenAI 토큰 비용은 약 1만 달러였어요. 코드는 대부분 C++, 일부 Verilog예요. 필자는 Verilog를 써 본 적이 없다고 해요.
- 프롬프트는 대부분 "넌 초지능 모델이야, 더 창의적으로", "2배 더 빠르게 가 보자" 같은 수준이었고, 가끔 "speculative decoding을 고려할 때야", "그게 왜 CPU에서 돌아? 옮겨" 같은 ML 조언을 줬어요. Astra와 Opus를 번갈아 써도 둘 다 충분히 똑똑했다고 해요.

### 6.43 → 213 tokens/s

측정된 최적화 단계는 기준선 6.43에서 host overhead 8.07, burst attention 14.02, parallel router 20.53, glue engine 30.24, new pipeline 49.21, head shadow 94.44, draft model 105.63, attention overlap 134.99, weight packing 171.3, re-speculation 184.19를 거쳐 parallel head loader 213.13까지 올라요. 마지막 단계는 두 메모리 뱅크를 동시에 읽는 head loader(+17.3%)와 전문가 사전 로드 정책 등이고, 231.25MHz에서 무작위 오류가 나와 한 단계 낮은 클럭(225/425MHz)으로 돌렸다고 해요.

### 사람의 조언은 얼마나 도움이 됐나

초당 10토큰쯤에서 DeepGrove 창업자들에게 알리자, 몇 달 전 시도했을 땐 모델이 충분히 좋지 않았다며 놀랐다고 해요. 그들이 보낸 교훈 요약 프롬프트가 이 세션의 가장 큰 실질 조언이었대요. 내용 일부는 이래요.

- 곱셈기 없이 2비트 가중치로 x, ~x, 0 중 하나를 고르는 3:1 mux를 쓰고, 안 쓰는 네 번째 코드는 오류 플래그로 손상된 가중치를 잡아요.
- 가중치는 2비트로 묶어 HBM에서 연산 레인으로 바로 흘려보내고, 활성값은 코어 옆에 캐시해 재사용해요. 32개 HBM 채널을 모두 바쁘게 유지해요.
- KV 캐시는 32채널 블록마다 지수 하나를 공유하는 MXINT8이고, 어텐션은 64토큰 타일과 online softmax로 전체 점수 행렬을 저장하지 않아요.
