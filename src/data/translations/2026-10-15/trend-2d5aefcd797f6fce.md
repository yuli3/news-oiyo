---
id: trend-2d5aefcd797f6fce
title: "Web search for a 1.7B model running fully on a phone, no search API and no backend (open source)"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x5oqiy/web_search_for_a_17b_model_running_fully_on_a"
summary: "Private Mind(OSS 모바일 로컬 LLM)가 검색 API·백엔드 없이 폰 WebView로 DuckDuckGo 등을 파싱하고, 온디바이스 임베딩으로 청크를 고른 뒤 1.7B가 인용과 함께 답한다고 해요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 파이프라인(포스트)
1. 숨은 WebView로 DuckDuckGo(폴백 Brave·Mojeek) 결과 파싱 — **검색 API 없음**
2. 상위 페이지를 ~500자 청크로 분할
3. 온디바이스 임베딩 **LFM2.5(~415MB)** + 키워드로 최대 6청크(한 사이트 최대 3)
4. 단일 사이트만 주장하면 가중↓
5. 모델이 청크 근거로 답하고 출처 링크

데모: Qwen3 1.7B, 웹 끄면 Apple 9월 이벤트 오답 → 켜면 맞고 5페이지 인용. 채팅은 기기, react-native-executorch. 기본 웹검색 끔. Repo: software-mansion-labs/private-mind.
