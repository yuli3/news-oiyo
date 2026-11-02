---
id: trend-ce26924424bc8cbc
title: "10억 명 이상의 ChatGPT 사용자를 위한 온라인 스토리지의 빠른 확장(2부)"
sourceUrl: https://openai.com/ko-KR/index/scaling-storage-one-billion-users-part-two
summary: "OpenAI가 10억 명 넘는 ChatGPT 사용자를 받치는 스토리지 플랫폼 Habitat 확장기 2부를 공개했어요. 40개 리전에서 500PB 이상을 다루며, Azure 팀과 함께 Cosmos DB 공동 관리 컨테이너 기반 멀티 테넌시와 전 세계 읽기 성능을 확보한 과정을 설명해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

OpenAI 한국어 엔지니어링 블로그 앞부분을 읽고 정리했어요(약 6.7천 자 중 앞 2.1천 자). 원문이 한국어라 요점을 정리했어요.

### Habitat이란

OpenAI의 모든 제품은 빠르고 안정적인 데이터 접근이 필요하고, 이를 스토리지 플랫폼 **Habitat**이 맡아요. Habitat은 **40개 지리적 리전**에서 **10억 명 넘는 사용자**에게 밀리초 단위로 응답해야 해요. 글은 Jon Lee, Hrachya Hakobyan, Chaomin Yu가 썼어요.

우선순위는 이 순서였어요. 먼저 핵심 제품 트래픽을 감당할 안정성, 다음으로 전 세계 사용자에게 충분한 속도, 마지막으로 대규모에서도 능숙한 운영이에요.

### 시리즈 구성

- 2부작으로, 단순한 클라이언트 라이브러리와 데이터베이스였던 Habitat이 **500PB 이상**을 다루는 전 세계 분산 스토리지 플랫폼이 된 과정을 다뤄요.
- 1부는 Python 클라이언트에서 서비스로 발전한 과정과 Python 서비스를 흔히 생각하는 한계 너머로 확장한 기법을 다뤘어요.
- 2부는 기반 저장소인 **Azure Cosmos DB** 확장을 다뤄요. Azure 팀과 협력해 공동 관리 컨테이너를 쓰는 실용적인 멀티 테넌시 방식과 전 세계 읽기 성능을 확보했어요.

### 구성 요소

Habitat은 ChatGPT, API, Codex, 내부 서비스 앞에서 캐싱, ACL 권한, 데이터 레지던시, 암호화, 멀티테넌시 격리, 속도 제한, 라우팅을 맡아요. 뒤에는 Cosmos DB, Nanobase, Valkey 캐시, Blob 스토리지가 있고, CDC로 Databricks, Rockset, Kafka에 변경을 흘려요.

### 멀티 테넌시의 장단점

싱글 테넌시는 장애 영향 범위를 줄이고 담당을 분명히 하지만, 팀마다 용량 계획을 해야 해 과잉 프로비저닝으로 이어지기 쉬워요. 멀티 테넌시는 중앙 DB 팀이 자원을 관리하지만 한 테넌트가 자원을 과하게 써 남에게 피해를 주는 노이지 네이버 문제가 있어요. Habitat은 멀티 테넌트 컨테이너 하나에서 싱글 테넌트 컨테이너로 갔다가 다시 멀티 테넌트로 돌아오는 한 바퀴 여정을 거쳤다고 해요. 이후 세부 기법은 이 번역에 담지 못했어요.
