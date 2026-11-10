---
id: trend-b6b611c901e09bca
title: "dgtlmoon/changedetection.io"
sourceUrl: https://github.com/dgtlmoon/changedetection.io
summary: "changedetection.io는 웹페이지 변경을 감시해 Discord·이메일·Slack·텔레그램·웹훅 등으로 알려 주는 오픈소스 도구예요. OpenAI·Gemini·Anthropic·Ollama 등 LLM을 붙여 '가격이 50달러 아래로 내려가면만 알려 줘' 같은 자연어 조건과 변경 요약을 쓸 수 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-11
---

GitHub 저장소 README 앞부분(소개와 AI 기능 설명)을 읽고 옮겼어요. 나머지는 읽지 않아 partial로 표시했어요. 이번 주 GitHub 트렌딩 수집 항목이에요.

### changedetection.io

웹사이트 업데이트를 감시하고 Discord, 이메일, Slack, Telegram, 웹훅 등 여러 채널로 알려 주는 도구예요. 가격 변동, 콘텐츠 수정, 조건부 변경 감시와 LLM 변경 요약·트리거 같은 기능을 내세워요.

- 셀프호스팅 오픈소스 외에, 월 8.99달러 구독형도 있어요. 같은 오픈소스를 프록시와 지원까지 붙여 인프라 관리 없이 쓰는 방식이고, Chrome 브라우저가 포함돼 있어요.

### AI 기반 변경 감지

"뭔가 바뀌었다"에서 "내가 신경 쓰는 것만 바뀌었다"로 가는 게 목표예요. OpenAI, Gemini, Anthropic, Ollama 등 어떤 LLM이든 연결할 수 있어요.

- **AI 변경 감지 규칙**: "가격이 50달러 아래로 떨어질 때만 알려 줘", "재고가 돌아오면 알려 줘", "내비게이션과 푸터 변경은 무시해" 같은 의도를 평범한 영어로 한 번 써 두면, AI가 감지된 차이마다 의도와 비교해 관계없는 건 조용히 걸러요. 오탐이 줄어든다고 해요.
- **AI 변경 요약**: 원시 diff 대신 "가격이 89.99달러에서 67.00달러로 내려갔어요", "목록에 상품 3개 추가" 같은 알림을 받아요. 전체 또는 감시 항목별로 쓸 수 있고 프롬프트도 직접 고칠 수 있어요.
- **이미 쓰는 모델 그대로**: GPT-4o-mini나 Gemini Flash면 확인 한 번에 1센트도 안 되는 비용으로 잘 돌아간다고 해요. Ollama, vLLM, LM Studio 같은 OpenAI 호환 셀프호스팅 엔드포인트로 완전히 로컬에서 돌릴 수도 있어요.
