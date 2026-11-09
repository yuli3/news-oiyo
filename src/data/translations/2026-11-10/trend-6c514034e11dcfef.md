---
id: trend-6c514034e11dcfef
title: "M4 Pro vs M5 Pro (24GB): Qwen 3.8 Flash Next IQ3 with MoEShift at 374 tok/s prefill, 14.7 tok/s decode, 8.5GB peak memory"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xrq2fv/m4_pro_vs_m5_pro_24gb_qwen_38_flash_next_iq3_with
summary: "MoEShift 개발자가 76GB짜리 Qwen3.8-Flash-Next 125B IQ3_XXS 양자화를 24GB 통합 메모리 Mac 두 대에서 SSD 오프로딩으로 돌린 벤치마크를 공유했어요. M5 Pro는 긴 프롬프트 prefill 초당 374토큰, 디코드 14.7토큰이었고 최대 메모리는 둘 다 8.5GB였어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Reddit은 수집 환경에서 막혔고(API 키 없음, Wayback 스냅샷 없음) RSS에 실린 게시글 본문을 기준으로 옮겼어요. 본문은 거의 읽혔지만 GitHub 저장소와 댓글은 확인하지 않아 `partial`이에요.

### 무엇을 측정했나요

작성자 /u/dave-tro는 ISTA-DASLab의 GSQ-RCO IQ3_XXS 양자화로 만든 **Qwen3.8-Flash-Next 125B**(디스크 76GB)를 24GB 통합 메모리 Mac 두 대에서 **MoEShift** 백엔드로 돌렸어요. MoEShift 커뮤니티 벤치마크 도구로 3회 실행한 중앙값이고, 프롬프트 캐싱은 껐어요.

| 지표 | M4 Pro | M5 Pro |
|---|---|---|
| 짧은 프롬프트 디코드(입력 72토큰) | 9.84 tok/s | 14.69 tok/s |
| 긴 프롬프트 prefill(입력 6,060토큰) | 199.09 tok/s | 374.15 tok/s |
| 긴 프롬프트 디코드(출력 512토큰) | 9.57 tok/s | 13.14 tok/s |
| 긴 프롬프트 전체 시간 | 83.9초 | 55.1초 |
| 프로세스 최대 물리 메모리 | 8.5GB | 8.5GB |

### 작성자의 해석

특히 prefill 속도 덕분에 채팅이나 에이전트에서 충분히 쓸 만하고, 두 기기 모두 최대 8.5GB 안에 머물렀다는 점이 흥미롭다고 해요. 곧 나올 Qwen4 MoE에도 기대되는 결과라고 덧붙였어요.

### MoEShift

작성자가 만든 오픈소스 추론 백엔드로, 메모리가 부족해 SSD 오프로딩이 필요한 Apple Silicon Mac용이에요. `brew install davide-troiani/moeshift/moeshift`로 설치한 뒤 `moeshift`를 실행하면 설정 마법사가 모델 선택과 준비를 해 준대요. SSD 공간만 충분하면 된다고 해요. 다른 Apple Silicon 구성의 결과도 공유해 달라고 요청했어요.
