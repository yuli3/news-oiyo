---
id: trend-fbe215ad7d995490
title: "I tested Strata's routing optimizations with Qwen 3.8FN IQ3_S - Strata 라우팅 최적화 실험"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xhtbh5/i_tested_stratas_routing_optimizations_with_qwen
summary: "Strata 0.2.7.1의 두 가지 전문가 라우팅 최적화(VRAM 캐시 전문가 선호, 꼬리 전문가 건너뛰기)가 Qwen 3.8 Flash Next IQ3_S의 코딩·수학·지시 수행에 주는 영향을 시험한 r/LocalLLaMA 글이에요."
translationStatus: blocked
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

> Reddit 원문은 자동 수집이 막혀(인증 키 없음, 아카이브 없음) 열지 못했어요. RSS 피드에 실린 본문 발췌만 바탕으로 정리했고, 댓글과 이미지·영상은 보지 못했어요.

### 무엇을 시험했나

**Strata** 0.2.7.1에는 성능과 품질에 모두 영향을 줄 수 있는 라우팅 최적화가 두 개 있어요. 글쓴이는 실제 영향이 궁금해 자기 하드웨어에서 **Qwen 3.8 Flash Next IQ3_S**로 코딩, 수학, 지시 따르기를 시험했어요.

### 두 최적화

- **STRATA_ROUTE_PRIOR**(새 기능): 이미 VRAM에 캐시된 전문가의 점수에 1.5(유효 배수 약 4.48배)를 더해 그쪽을 선호하게 해요. 원래 고를 전문가와 점수가 비슷하면 캐시된 전문가가 대신 뽑힐 수 있어요.
- **STRATA_ROUTE_TAIL_SKIP**: 기본값 7이면 7~10번째 전문가가 VRAM에 없을 때 계산을 건너뛰어요. 선택 자체는 바꾸지 않는다고 해요.

### 확인하지 못한 것

발췌가 여기서 끊겨 실제 벤치마크 수치와 결론은 보지 못했어요. 속도 이득과 품질 손실의 크기는 원문에서 확인해야 해요.
