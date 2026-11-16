---
id: trend-a4e09a035bdf5408
title: "Under 9gb model comparison"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xxvr5z/under_9gb_model_comparison
summary: "9GB 미만 소형 모델 7종(K2-Horizon-7B, Granite 4.2-8B, Qwen3.5-9B, MiMo 증류 9B, LFM2.5-8B-A1B, Gemma 4 E4B, LFM3-VL-2B)의 사양과 연구소 발표 벤치마크를 한 표로 모은 글이에요. 하네스가 달라 직접 비교엔 주의하라고 해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

Reddit 원문이 자동 경로로 막혀 데스크톱 브라우저로 원 게시물을 직접 읽고 옮겼어요. 표가 커서 대표 수치만 골라 옮겼고, 수치는 모두 원문 그대로예요.

### 전제

글쓴이(u/parepeg)는 점수가 **각 연구소가 발표한 값**이라 걸러 들으라고 해요. 위첨자로 출처 하네스(K2 카드, Liquid, MiMo 카드 등)를 표시했고, 하네스가 서로 달라 행별 최고값 비교에도 주의가 필요하다고 해요.

### 비교한 모델

| 모델 | 조직 | 파라미터 | 컨텍스트 | 모달리티 | 라이선스 |
|---|---|---|---|---|---|
| K2-Horizon-7B | IFM | 7B dense | 512K | 텍스트 | Apache-2.0 |
| Granite 4.2-8B | IBM | 8B dense(thinking) | 128K(512K 확장) | 텍스트 | Apache-2.0 |
| Qwen3.5-9B | Qwen | 9B 하이브리드 | 262K(~1M 확장) | 텍스트·이미지·비디오 | Apache-2.0 |
| MiMo-V2.6-Distill-Qwen-9B | Xiaomi | 9B(Qwen3.5-9B SFT) | ~262K | 텍스트·이미지 | MIT |
| LFM2.5-8B-A1B | Liquid | 8.3B/활성 1.5B MoE | 128K | 텍스트 | LFM 1.0 |
| Gemma 4 E4B | Google | 유효 4.5B/총 8B | 128K | 텍스트·이미지·오디오 | Apache-2.0 |
| LFM3-VL-2B | Liquid | 1.92B | 128K | 텍스트·이미지·비디오 | LFM 1.0 |

### 눈에 띄는 텍스트 벤치마크

- **AIME 2026**: K2-7B 90.2, Qwen3.5-9B 92.5, LFM2.5-8B-A1B 50.0, Gemma 4 E4B 42.5
- **SWE-bench Verified**: K2-7B 72.4, MiMo-D-9B 61.1, Qwen3.5-9B 50.8, Granite 8B 47.7
- **Terminal-Bench 2.1**: K2-7B 44.6, MiMo-D-9B 37.1, Qwen3.5-9B 29.2
- **GPQA Diamond**: Qwen3.5-9B 81.7, K2-7B 75.6, Granite 8B 64.1
- **IFEval**: LFM3-VL-2B 96.7, LFM2.5-8B-A1B 91.8, Qwen3.5-9B 91.5
- **RULER 128K**: Qwen3.5-9B 87.1, Granite 8B 71.4, Gemma 4 E4B 18.8

### 비전 벤치마크

MMMU(val)는 Qwen3.5-9B 78.4, LFM3-VL-2B 55.7이고, Video-MME(자막)는 Qwen3.5-9B 84.5, LFM3-VL-2B 69.0이에요. 비전 항목은 대부분 Qwen3.5-9B가 가장 높게 나왔어요.
