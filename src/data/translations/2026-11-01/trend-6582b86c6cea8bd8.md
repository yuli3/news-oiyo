---
id: trend-6582b86c6cea8bd8
title: "Malware uses LLMs to rank victims by how much they're worth"
sourceUrl: https://blog.talosintelligence.com/appraisal-by-ai-model-driven-victim-prioritization-in-the-volta-infostealer
summary: "Cisco Talos가 훔친 자격 증명·세션·지갑 정보를 LLM에 보내 피해자 자산을 '돈이 되는 순서'로 매기는 자가 삭제형 인포스틸러 VOLTA를 분석했어요. 모델이 거부하면 세 모델 체인으로 넘어가요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

Cisco Talos 블로그 글(2026-10-31, Ryan Fetterman)을 앞부분부터 배포 모델 설명 직전까지 읽고 옮겼어요. 뒷부분(배포 모델·IOC 등)은 읽지 못했어요.

### 핵심 요약

- VOLTA는 성숙한 스틸러 임플란트에 **선택형 AI 연동 계층**을 붙인 악성코드예요. 자격 증명, 세션, 암호화폐 지갑을 훔친 뒤 구조화된 증거 묶음을 LLM에 보내 피해자의 자산을 **수익화 가치 순으로 순위를 매기게** 해요.
- 모델이 대상 평가를 거부하면 **세 모델 체인으로 넘어가요.** Talos는 이를 가드레일에 걸릴 것을 예상한 의도적인 엔지니어링으로 봐요.
- 자가 삭제형이고 공격자 소유 인프라가 없어요. Talos가 꼽은 새로운 점은 AI가 전통적인 악성 기능을 돕는 게 아니라 **운영자를 위한 정보 분석가**로 일한다는 거예요.

### 무엇을 훔치나

"VOLTA-AUTODOXER"라는 이름을 스스로 붙인 이 Windows 인포스틸러는 CAIRN 연구로 드러났어요. 브라우저 비밀번호, 쿠키, 결제 카드, 지갑 시드 문구, Discord·Telegram·Steam·Roblox 세션, Microsoft OAuth 토큰, SSH·클라우드 키, Wi-Fi 프로필, 스크린샷을 모아요. Wi-Fi 비밀번호는 `WlanGetProfileList`를 직접 불러 평문으로 덤프하고, 지갑 볼트는 내장 크래커로 그 자리에서 풀어 보고서에 "WALLET VAULTS CRACKED" 줄로 적어요.

그다음 사람에 대한 증거 묶음을 만들어요. 위치와 집 주소, 고용주와 회사 도메인, 추정 출생 연도, 카드 끝 4자리, Slack 워크스페이스, 문서 작성자 메타데이터, iPhone 백업 흔적, Roblox 계정의 실시간 평가액이 들어가요. 훔친 세션으로 더 보강도 해요. 피해자 Gmail에서 Amazon·DoorDash·Uber Eats·Grubhub·Walmart·PayPal 영수증을 찾아 집 주소를 확인하고, Uber Eats·DoorDash 주문 내역을 직접 불러오고, Discord 토큰으로 계정 프로필을 보강해요.

### LLM 단계

묶음은 `Identity_Report.txt`로 정리돼 JSON으로 직렬화되고, OpenRouter API로 POST돼요. 시스템 프롬프트는 모델에게 "대상 평가서를 쓰는 포렌식 정보 분석가"처럼 행동하라고 하고, 출력에 "WHAT THEY'RE WORTH"(수익화 가치별 저·중·고 등급)와 "THEIR OPSEC"(보안 수준·비밀번호 습관 평가) 섹션을 요구해요.

| 항목 | 값 |
|---|---|
| 기본 모델 | anthropic/claude-opus-4.6 |
| 폴백 체인 | moonshotai/kimi-k2 → google/gemini-2.5-flash |
| Temperature | 0.2 |
| 요청 방식 | 손으로 만든 JSON, SDK 없음 |

응답에 "I can't", "I'm not able" 같은 문구가 있으면 다음 모델로 넘겨요. Talos는 더 작고 덜 엄격한 모델로 피벗하는 구조라고 설명해요. 프롬프트는 이름·주소·대학과 비밀번호 패턴을 연결하는 식으로 **흩어진 데이터를 이어 추론을 늘리라고** 요구해요.

결과는 `AI_Analysis.txt`로 받아 `volta_dox.zip`으로 함께 유출돼요. 유출은 스틸러 실행 직후(`volta_log.zip`), AI 호출 뒤(`volta_dox.zip`), 네트워크 보강 결과가 있을 때(`volta_doxnet.zip`) 세 단계로 일어나요. 추론 왕복은 전부 피해자 PC와 피해자 네트워크에서 일어나요.
