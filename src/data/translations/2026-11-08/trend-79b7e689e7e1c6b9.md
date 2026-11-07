---
id: trend-79b7e689e7e1c6b9
title: "Betelgeuse running DeepSeek V4.1 Flash Q8_XL (1017) at 19 tok/s decode &amp; 62 tok/s prefill on an RTX 3060 12GB + 16GB RAM: How we finally fixed the prefill bottleneck on out-of-core MoEs"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xqfekg/betelgeuse_running_deepseek_v41_flash_q8_xl_1017
summary: "Betelgeuse 개발자가 RTX 3060 12GB·RAM 16GB PC에서 DeepSeek V4.1 Flash Q8_XL을 디코드 19 tok/s, 프리필 62 tok/s로 돌렸다고 공유했어요. SSD 기반 대형 MoE의 프리필 병목을 캐시 분할·레이어 단위 프리필로 풀었다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-08
---

Reddit이 자동 읽기를 막아(API 키 없음) r/LocalLLaMA RSS 본문 기준으로 옮겼어요. 수치는 작성자 주장이에요.

### 무엇을 했나

작성자는 지난번 Qwen 3.8 Flash Next 글 이후, out-of-core MoE 스트리밍이 DeepSeek V4.1 Flash(1017) 같은 프런티어급 모델에서도 쓸 만할지, 아니면 프롬프트 처리 때문에 못 쓸지 질문을 많이 받았다고 해요. 그래서 DeepSeek V4.1 Flash Q8_XL(305.6GB + 110.6GB)을 쓸 만한 속도로 돌렸고, 현재는 sm_86에서 가장 잘 동작한다고 밝혀요.

### 문제: 첫 토큰까지의 시간

SSD·하이브리드 계층에서 거대 MoE를 돌릴 때 가장 큰 불만은 첫 토큰까지의 시간(TTFT)이에요. 500토큰 프롬프트를 보내면 엔진이 초당 1~3토큰으로 30~60초 동안 프롬프트만 씹다가 첫 토큰을 내요.

### 테스트 환경

- GPU: RTX 3060 12GB
- RAM: 16GB 싱글 채널 DDR4-3200
- OS: CachyOS / Arch Linux(MemoryMax=12G cgroup, 스왑 0B)
- 저장장치: PCIe 4.0 NVMe SSD

고정밀 Q8_XL 전문가 백본에 IQ4_NL Engram 테이블(DeepSWE 72.3점)을 붙였어요. 110GB Engram 테이블은 전부 SSD에 둬요. Engram은 1번·14번 레이어에서만 켜지고 토큰당 48행(약 192KB)만 건드리기 때문에, 활성 행을 2MB VRAM 버퍼에 올려 RAM을 거의 쓰지 않는다고 해요.

### 프리필 병목을 푼 세 가지

오프로딩한 대형 MoE에서는 프롬프트가 40개 레이어의 거의 모든 전문가를 깨워, 순차 스트리밍하면 버스가 막히고 GPU가 놀아요. Betelgeuse의 해법은 이래요.

1. **위치 불변 캐시 분할**: 레이어마다 상주 슬롯 20개(VRAM 핫 슬롯 5 + 호스트 RAM 슬롯 15)를 두고 서로 간섭하지 않게 라우팅해요.
2. **단일 패스 레이어 우선 프리필**: 텐서 코어 점유율을 망치는 3토큰 마이크로배치 대신 16토큰 ubatch로 돌리고, 활성 호스트 RAM 전문가를 연산과 병렬로 PCIe 실행 링에 스트리밍해요.
3. **패스 끝 VRAM 통합**: 프롬프트와 초기 생성이 실제로 요구한 전문가를 학습해, 첫 패스가 끝날 때 가장 활발한 상위 5개를 VRAM 핫 슬롯으로 옮겨요.

> 글 뒷부분(벤치마크 세부와 향후 계획)은 이 정리에 포함하지 않았어요.
