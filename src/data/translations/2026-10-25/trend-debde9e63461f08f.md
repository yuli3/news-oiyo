---
id: trend-debde9e63461f08f
title: "caddyserver/caddy"
sourceUrl: https://github.com/caddyserver/caddy
summary: "Caddy는 기본으로 HTTPS를 켜 주는 Go 기반 확장형 웹 서버예요. Let's Encrypt·ZeroSSL 인증서 자동 발급, 내부망용 로컬 CA, HTTP/1.1·2·3 기본 지원, Caddyfile·JSON API 설정이 특징이에요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-25
---

> GitHub 트렌딩에 오른 저장소예요. README의 기능 소개와 설치 부분을 기준으로 옮겼어요. 별 수는 수집 시점 약 7만 8천 개예요.

### 어떤 프로젝트인가요

**Caddy**는 "모든 사이트를 HTTPS로"를 내건, **TLS를 기본으로 쓰는 확장형 서버 플랫폼**이에요. Go로 작성됐고 Apache-2.0 라이선스예요.

### 주요 기능

| 영역 | 내용 |
|---|---|
| 설정 | 쉬운 **Caddyfile**, 강력한 네이티브 **JSON 설정**, 동적 변경용 **JSON API**, 다른 형식을 쓰고 싶을 때의 설정 어댑터 |
| 자동 HTTPS | 공개 도메인은 ZeroSSL·Let's Encrypt, 내부 이름·IP는 완전 관리형 **로컬 CA**, 클러스터 내 인스턴스 간 조율, 다중 발급자 폴백, **ECH(Encrypted ClientHello)** 지원 |
| 안정성 | TLS·OCSP·인증서 문제로 다른 서버가 멈출 때도 버티도록 설계, 수조 건 요청과 수백만 인증서를 관리한 실전 경험 |
| 프로토콜 | HTTP/1.1, HTTP/2, HTTP/3 기본 지원 |
| 구조 | 군더더기 없는 모듈형 확장 구조, 외부 의존성 없이(libc도 없이) 어디서나 실행 |

README는 Go가 다른 서버 언어보다 메모리 안전성이 높다는 점도 장점으로 꼽아요.

### 설치와 빌드

- 가장 간단한 방법은 GitHub Releases에서 실행 파일을 받아 PATH에 두는 거예요.
- 소스 빌드는 **Go 1.26.0 이상**이 필요하고, `cmd/caddy`에서 `go build`로 만들 수 있어요.
- 리눅스에서 낮은 포트(80/443)에 바인딩하려면 `setcap cap_net_bind_service=+ep`로 권한을 주라고 안내해요. 비밀번호 없는 sudo 설정 예시도 있지만, 무엇을 하는지 알 때만 쓰라고 경고해요.
