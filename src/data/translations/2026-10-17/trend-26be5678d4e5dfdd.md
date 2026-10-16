---
id: trend-26be5678d4e5dfdd
title: "traefik/traefik"
sourceUrl: "https://github.com/traefik/traefik"
summary: "Traefik은 Docker·Kubernetes·Consul 같은 오케스트레이터 API를 지켜보다 라우트를 자동으로 만들어 주는 클라우드 네이티브 HTTP 리버스 프록시·로드밸런서예요. 재시작 없이 설정이 갱신되고 Let's Encrypt로 HTTPS를 붙여 줘요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-17"
---

GitHub 저장소 README 원문을 읽고 옮겼어요.

### 무엇인가
Traefik(발음은 '트래픽')은 마이크로서비스 배포를 쉽게 해 주는 최신 HTTP 리버스 프록시이자 로드밸런서예요. Docker, Swarm, Kubernetes, Consul, Etcd, Rancher v2, Amazon ECS 같은 기존 인프라와 붙어 스스로 설정을 바꿔요. 오케스트레이터를 가리키는 것만이 필요한 유일한 설정이 되는 게 목표예요.

### 왜 필요한가
오케스트레이터로 마이크로서비스를 띄웠다면 사용자가 접근할 리버스 프록시가 필요해요. 전통적인 프록시는 경로와 서브도메인마다 라우트를 직접 적어야 해서, 하루에도 몇 번씩 서비스를 추가·삭제·업그레이드·확장하는 환경에서는 라우트를 최신으로 유지하기가 번거로워요. Traefik은 서비스 레지스트리나 오케스트레이터 API를 듣고 즉시 라우트를 만들어 줘요. 원하면 일부 라우트를 수동으로 설정할 수도 있어요.

### 기능
| 분류 | 내용 |
|---|---|
| 설정 | 재시작 없이 지속 갱신 |
| 트래픽 | 여러 로드밸런싱 알고리즘, 서킷 브레이커, 재시도 |
| 보안 | Let's Encrypt로 HTTPS(와일드카드 인증서 포함) |
| 프로토콜 | WebSocket, HTTP/2, gRPC |
| 관측 | 메트릭(Prometheus, Datadog, StatsD, InfluxDB 2.x 등), JSON·CLF 접근 로그, 웹 UI, REST API |
| 배포 | Go로 만든 단일 바이너리와 공식 Docker 이미지 |

지원 백엔드는 Docker/Swarm, Kubernetes, ECS, File이에요.

### 시작하기
문서의 5분 퀵스타트(Docker 필요)를 따르거나, 릴리스에서 바이너리를 받아 `./traefik --configFile=traefik.toml`로 실행하면 돼요. 공식 Docker 이미지도 있어요. v3 전체 문서는 doc.traefik.io에 있고, 메이저 버전을 올릴 때는 마이그레이션 가이드를 꼭 보라고 강조해요. 상업 지원은 Traefik Labs에 문의할 수 있어요.
