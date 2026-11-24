---
id: trend-5f0c9c1d47b99b07
title: "Maple raises $5.3M to build AI products that protect your data, even from itself"
sourceUrl: https://techcrunch.com/2026/11/24/maple-raises-5-3m-to-build-ai-products-that-protect-your-data-even-from-itself
summary: "전 애플 엔지니어가 공동 창업한 Maple이 530만 달러 시드 투자를 유치했어요. 기기에서 암호화한 데이터를 신뢰 실행 환경(TEE) 안에서만 처리해 회사조차 사용자 데이터를 볼 수 없게 만든 AI 앱과 데스크톱 에이전트 Maple Work를 내놓았어요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

AI 비서가 파일, 이메일, 캘린더, 브라우저까지 다루는 에이전트로 바뀌면서 사용자는 AI 회사를 점점 더 많이 믿어야 하는 처지가 됐어요. 애플에서 프라이버시 보호 기술을 다뤘던 엔지니어가 공동 창업한 Maple은 회사 자신에게서도 사용자 데이터를 지키는 방식을 택했어요.

### "우리 말을 믿을 필요가 없어요"
공동 창업자이자 CEO인 Mark Suman은 사용자가 오픈소스 코드와 Maple 서버에서 돌아가는 신뢰 실행 환경(TEE)을 직접 확인할 수 있다고 말해요.

> 사용자는 우리 서버에서 돌아가는 코드를 직접 보고 검증할 수 있어요. 그래서 우리 말을 그대로 믿을 필요가 없어요.

Maple은 편리함을 위해 프라이버시를 내줄 필요가 없다고 주장해요. 데이터를 오용하지 않겠다고 약속하는 대신, 아예 데이터에 접근할 수 없는 사업 구조를 만드는 게 목표예요.

### 제품과 투자
- 채팅 앱은 일반적인 AI 질의응답을 제공해요.
- 새로 내놓은 데스크톱 앱 Maple Work는 컴퓨터를 제어하고 파일·앱을 다루며 브라우저로 온라인 작업을 처리하는 에이전트예요.
- 사용자 컴퓨터가 꺼져 있어도 계속 일하는 클라우드 에이전트도 만들고 있어요.
- 이번 530만 달러 시드 라운드는 초과 청약됐고 EPIC Ventures가 주도했어요. Draper Associates, Planetary VC, Epoch VC가 참여했어요. 앞서 100만 달러 미만의 프리시드 엔젤 라운드가 있었고, 2027년 상반기 시리즈 A를 계획하고 있어요.

### 창업 배경
Suman은 애플에서 6년간 일하며 컴퓨터 비전 중심의 AI·머신러닝을 맡았고, 사람의 신원을 보호하면서 기술을 쓰는 문제를 다뤘어요. CTO Anthony Ronning은 방산 기술·보안·네트워킹 출신이에요. Ronning이 2023년 프라이버시 중심 핀테크로 회사를 시작했고, 2024년 8월 Suman이 합류하면서 Maple AI 아이디어가 나왔어요. 모바일 앱은 이듬해 1월 공개됐어요.

### 작동 방식
앱은 DeepSeek, Kimi, GLM, Thinking Machines의 Inkling, 구글 Gemma, OpenAI GPT OSS 등 공개 모델을 돌려요. 모델은 미국 데이터센터의 TEE에서 실행되고, 유럽 고객은 유럽 서버를 운영하는 파트너를 거쳐요. 데이터는 사용자만 아는 비밀번호로 기기에서 암호화된 뒤 TEE 안에서만 복호화·처리되고 다시 암호화돼 돌아가요. Suman은 "TEE 안에 있는 동안에도 우리는 데이터에 접근하지 못해요"라고 말했어요. 해커나 정부 소환장이 와도 Maple이 내줄 수 있는 건 암호화된 파일뿐이에요.

### 앞으로의 계획
Maple Work는 소규모 사업자를 겨냥하며 Gmail·캘린더 등 연동 스토어를 갖췄어요. Agent Client Protocol을 지원하는 Claude, Codex 같은 앱 안에 하위 에이전트를 띄워 작업에 필요한 정보만 넘길 수도 있어요. 내년에는 자체 데이터 무보존 옵션으로 기업 파일럿을 하고, SOC 2 인증과 보안 감사를 마무리하고 있어요. 고객 수는 밝히지 않았지만 최근 3개월간 60배 성장했다고 해요. 요금은 Pro 월 20달러, Max 월 100달러, Max Plus 월 200달러예요. 오스틴과 샌프란시스코에 기반을 둔 4명 팀이며 채용 중이에요.
