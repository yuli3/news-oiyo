---
id: trend-cdda9400069b9e0d
title: "Launch HN: Consus (YC F24) – LLM gateway for companies handling sensitive data"
sourceUrl: "https://news.ycombinator.com/item?id=50073471"
summary: "항공우주·방산 기업용 LLM 게이트웨이 Consus가 Launch HN에 나왔어요. 모든 요청을 ITAR·CUI 준수 인프라로 보내고, 모델 이름에 gpt-5.6-sol:fedramp-high 같은 '컴플라이언스 접미사'를 붙여야만 호출되며 데이터를 저장하지 않는대요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-14"
---
창업자 Eric의 Launch HN 본문을 옮겼어요. 본문 마지막 부분(데이터 비저장 설명 이후)과 댓글은 다 읽지 못했어요.

### Consus는 무엇인가
> We route all AI requests to ITAR restricted and controlled unclassified information (CUI) compliant infrastructure.

Consus(YC F24)는 모든 AI 요청을 **ITAR**(미 국제무기거래규정) 제한 정보와 **CUI**(통제 비분류 정보)를 다룰 수 있는 인프라로만 보내는 LLM 게이트웨이예요. Consus 자체가 ITAR 요건을 충족하고, 최근 FedRAMP High 통제 항목 410개에 대한 'FedRAMP 동등성' 감사를 마쳤대요. FedRAMP High는 민감한 비분류 데이터를 다루는 클라우드에 대한 미국 정부의 가장 엄격한 기준이고, CUI를 처리하려면 이 동등성이나 인가가 필요해요.

### 왜 만들었나
- 항공우주·방산 산업은 빠르게 크지만, 데이터 보호와 컴플라이언스 위험 때문에 대부분 AI를 쓰기 어려워해요.
- 창업자는 SpaceX에서 국가안보 탑재체를 발사했고 Castelion 초기 직원이었어요. 민감하지 않은 업무에도 AI 도구를 전혀 허용하지 않는 위성 제조사와 일한 경험도 있대요.
- 기업들이 두려워한 건 모델 제공사의 데이터 학습, ITAR 위반, 사이버 평가 실패로 인한 수주 손실이었고, 모두 합리적인 걱정이라고 말해요.

### 어떻게 동작하나
- OpenRouter처럼 어떤 도구나 워크플로에도 끼울 수 있는 **준수형 추론 계층**이에요. ChatGPT·Claude 같은 도구, Pi 코딩 에이전트·Open WebUI 같은 오픈소스, 조직이 직접 만든 앱과 연결돼요.
- 모든 요청은 하나의 **OpenAI 호환 엔드포인트**로 들어와, 추론 전에 키 검증과 정책 적용을 거쳐요.
- 모델 이름에는 반드시 `gpt-5.6-sol:fedramp-high`, `claude-opus-5-5:itar` 같은 **컴플라이언스 접미사**가 붙어야 하고, 접미사 없는 이름은 거부돼요. 일반 상용 엔드포인트로는 절대 프록시하지 않아요.
- 모델 허용 목록, 사용자별 지출·모델 제한을 Consus Portal에서 관리해요.

### 왜 GovCloud를 직접 안 쓰나
작은 팀은 그 플랫폼에 접근하는 것부터 어렵고, 큰 조직도 GovCloud로는 필요한 통제 일부만 물려받아요. 게다가 모델이 클라우드별로 갈려 있어 GPT-5.6 Sol은 Azure Government에만, Claude Opus 5.5는 AWS GovCloud의 Bedrock에만 있어요. 둘 다 쓰려면 정부 클라우드 두 곳을 따로 세우고 보안을 맞춰야 하는데, Consus는 이를 하나의 엔드포인트 뒤에 묶어 줘요.

데이터 민감성 때문에 고객 데이터를 저장하지 않고, 프롬프트와 응답은 요청이 처리되는 동안에만 메모리에 머물며 로그로 남지 않는다고 해요.
