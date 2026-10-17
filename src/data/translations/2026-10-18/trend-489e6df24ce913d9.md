---
id: trend-489e6df24ce913d9
title: "DeepSeek V4.1 Flash 1017 - CED 아키텍처와 네이티브 이미지 이해를 도입한 MoE 모델"
sourceUrl: "https://openrouter.ai/deepseek/deepseek-v4.1-flash-1017"
summary: "OpenRouter에 올라온 DeepSeek V4.1 Flash 1017은 552B 파라미터 MoE로 입력 8B·출력 16B만 활성화하는 CED 구조예요. 이미지 이해를 사전학습부터 함께 학습했고 KV 캐시를 이전 세대의 약 4분의 1로 줄였어요. 가격은 100만 토큰당 입력 0.08달러, 출력 0.50달러, 컨텍스트 1M이에요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

OpenRouter 모델 페이지의 설명과 가격·벤치마크 부분을 읽고 옮겼어요. 페이지 아래 FAQ·안내 문구는 생략했어요.

### 어떤 모델인가
- DeepSeek V4.1 Flash 1017은 **2026년 10월 17일 스냅샷**이고, DeepSeek이 `deepseek-flash` API 모델 이름으로 서비스해요.
- V4.1 Flash는 DeepSeek의 희소 MoE 모델이자 **Causal Encoder-Decoder(CED) 아키텍처**를 처음 쓴 모델이에요. 552B 파라미터 백본에서 **입력에는 8B, 출력에는 16B**만 활성화하는 비대칭 구조라, 전체 크기에 비해 토큰당 연산이 적어요.
- **이미지 이해가 네이티브**예요. 이전 실험판 V4 Flash Vision Exp처럼 나중에 붙인 게 아니라, 사전학습 처음부터 시각·텍스트 임베딩을 함께 학습했어요.
- 압축 KV 캐시로 캐시 메모리를 **이전 Flash 세대의 약 4분의 1**로 줄여 에이전트 작업 비용을 크게 낮췄다고 해요.
- 코딩·터미널·컴퓨터 사용 에이전트, 여러 단계를 끝까지 이어 가야 하는 장기 작업, 긴 컨텍스트 분석에 맞는다고 소개해요. DeepSeek은 V4.1 계열의 가성비 등급으로 두고, V4 Pro보다 성능·속도·작업 완료 시간이 낫다고 밝혔어요.

### 가격과 사양
| 항목 | 값 |
|---|---|
| 가격(100만 토큰당) | 입력 $0.08 / 출력 $0.50 |
| 컨텍스트 | 1.0M |
| 공개일 | 2026-10-17 |
| 비고 | EU 역내 라우팅은 아직 지원 안 함 |

### Artificial Analysis 점수 (페이지 표기, V4.1 Flash Max 기준)
| 벤치마크 | 점수 |
|---|---|
| Intelligence Index | 39.5 |
| HLE | 39.2% |
| AA-LCR | 84.0% |
| GDPval-AA | 55.0% |
| SciCode | 51.9% |
| Terminal-Bench 4.0 | 26.8% |
| AA-Omniscience 정확도 | 46.4% |

표의 이름이 "V4.1 Flash (Max)"로 돼 있어 1017 스냅샷 자체의 측정인지는 페이지에서 분명하지 않아요. OpenRouter API는 OpenAI 호환이라 base URL과 모델 슬러그만 바꾸면 돼요.
