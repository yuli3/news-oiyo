---
id: trend-24480abfba2a6202
title: "encoredev/encore"
sourceUrl: https://github.com/encoredev/encore
summary: "Encore는 개발자와 AI 코딩 에이전트가 인프라를 직접 설정하지 않고 백엔드를 만들고 배포하게 돕는 도구예요. 코드에서 DB·Pub/Sub·버킷을 선언하면 로컬에선 그대로 띄우고, 배포 때는 AWS나 Google Cloud에 맞는 리소스를 만들어 줘요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> GitHub README 앞부분(개념과 로컬 실행까지)을 기준으로 정리했어요. 프리뷰·프로덕션 환경 이후 설명은 읽지 못했어요.

### 한 줄 요약

**Encore**는 개발자와 **AI 코딩 에이전트**가 인프라를 손으로 세팅하지 않고 백엔드 앱을 만들고 배포하게 해 줘요. **오픈소스 SDK, CLI, 클라우드 플랫폼**을 하나의 흐름으로 묶었어요.

### 흐름

| 단계 | 하는 일 |
|---|---|
| 1. 선언 | SDK를 앱에 import해서 서비스와 인프라를 코드로 정의 |
| 2. 로컬 실행 | `encore run`으로 앱과 인프라를 로컬에 띄워 끝단까지 테스트 |
| 3. 배포 | 저장소에 push하면 플랫폼이 AWS나 Google Cloud에 맞는 리소스를 만들고 배포 |

SDK만 따로 써서 로컬 개발에 쓰고, 프로덕션 인프라는 Terraform 등으로 직접 관리해도 돼요.

### 코드 예시

README 예시에서는 TypeScript로 이렇게 선언해요.

```ts
const db = new SQLDatabase("users", { migrations: "./migrations" });
const signups = new Topic<SignupEvent>("signups", { deliveryGuarantee: "at-least-once" });
const avatars = new Bucket("avatars", { versioned: true });
```

- 선언 하나하나가 Encore **애플리케이션 그래프**의 노드가 돼요.
- `encore run` 때는 마이그레이션을 돌리고 로컬 대응물을 띄우고, 배포 때는 클라우드 대응물을 만들어요.
- 리소스를 추가하거나 바꾸면 그래프와 환경을 **diff**해서 빠진 것만 프로비저닝하고 새 코드를 배포해요.

### 설계 원칙

- 코드에는 **어떤 리소스가 필요한지**만 적고, 환경별로 어떻게 구성할지는 분리해요. 그래서 클라우드·리전·계정·로컬 사이에서 옮기기 쉬워요.
- 리소스는 합리적인 프로덕션 기본값으로 만들고, 설정은 **Encore 대시보드**(프로세스 배치, 인스턴스 크기, 레플리카), **AWS·GCP 콘솔**(다음 배포 때 반영), **Terraform provider**(곧 출시, 얼리 액세스 신청)로 관리해요.

### 로컬 개발

`encore run`은 **진짜 Postgres**, 실제 Pub/Sub 의미론, 타입 안전한 서비스 간 호출, 분산 추적이 되는 로컬 대시보드까지 띄워요. **인프라 네임스페이스** 덕분에 여러 브랜치나 에이전트가 격리된 상태로 동시에 작업할 수 있어요.
