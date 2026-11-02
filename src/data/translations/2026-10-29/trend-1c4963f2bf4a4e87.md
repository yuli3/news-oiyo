---
id: trend-1c4963f2bf4a4e87
title: "GLM-5.3 Workers AI 모델에서 요청 간 KV 캐시 노출, 응답 155건 영향"
sourceUrl: https://blog.cloudflare.com/kv-cache-exposure-remediation
summary: "Cloudflare Workers AI의 GLM-5.3에서 설정 불일치가 SGLang 버그를 건드려 다른 고객 요청 내용이 응답에 섞였어요. 8월 27일~9월 9일 응답 155건이 영향을 받았고, 의도적 악용 증거는 없었다고 해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

### 무슨 일이 있었나

Cloudflare는 9월 8일 Knostic의 보안 연구자 가디 에브론에게서 **GLM-5.3** Workers AI 모델(`@cf/zai-org/glm-5.3`)의 테넌트 격리 문제를 제보받았어요. 문제는 8월 27일부터 있었고, 9월 9일 고친 뒤 모델을 복구했어요. Workers AI의 다른 모델은 영향이 없었어요.

- 8월 27일~9월 9일 일부 고객이 같은 모델에 직전에 들어온 **다른 고객 요청의 데이터**가 섞인 응답을 받았어요.
- 영향받은 응답은 **155건**이고, 모두 68만 1,280토큰보다 긴 프롬프트였어요.
- 자체 테스트와 연구자 요청을 빼면 평범한 긴 컨텍스트 사용과 시점·양이 맞아, 의도적 악용 증거는 없었다고 해요.

### 대응

에브론은 HackerOne으로 제보했고, Cloudflare는 다음 날 아침 문제를 재현한 뒤 장애 선언 40분 안에 모델을 내렸어요. 설정을 고치고 패치한 추론 엔진을 배포해 같은 날 서비스를 되살렸어요. SGLang 팀과 함께 공동 공개했어요.

### 원인

두 문제가 겹쳤어요. 첫째는 오픈소스 추론 엔진 **SGLang** 설정 오류예요. GLM 5.3을 104만 8,576토큰 컨텍스트로 배포했지만, prefill GPU의 KV 캐시 풀은 68만 1,280토큰만 담을 수 있었어요. Cloudflare는 출시 전에 이 불일치를 알고 있었다고 밝혀요.

> 원문 앞부분만 읽었어요. 두 번째 원인(SGLang 버그)의 세부는 다루지 못했어요.
