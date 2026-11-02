---
id: trend-afa08401f4c7ed28
title: "Steal My Bitcoin CTF PoC - PHP 메모리 누수부터 명령 실행까지 재현하는 Python 스크립트"
sourceUrl: https://github.com/KillaBoi/StealMyBitcoin-PoC
summary: "Steal My Bitcoin CTF의 요청 흐름을 파이썬 표준 라이브러리 한 파일로 재현한 PoC 저장소예요. Alpine PHP 8.4.26 로컬 Docker 랩에서 힙·코드 주소를 세션 쿠키로 읽고 최종 콜백을 보내는 단계로 구성됐다고 README가 설명해요. > GitHub README를 기준으로 옮겼어요. 교육용 CTF·로컬 Docker 랩 설명이며, 라이브 챌린지용 페이로드나 오프셋 재현 절차는 이 번역에 넣지…"
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-27
---

### 무엇을 공개했나

KillaBoi의 **StealMyBitcoin-PoC**는 Steal My Bitcoin CTF에서 쓴 요청 순서를 **파이썬 표준 라이브러리만 쓰는 단일 파일**로 다시 보여 주는 저장소예요.

- 스크립트가 요청을 직접 만들고, 각 단계에서 누출이 확인돼야 다음으로 넘어가요.
- 실행 중 주고받은 HTTP 데이터를 기록해요.
- README는 **Docker로 세운 로컬 랩**을 대상으로 쓰라고 강조해요. 라이브 챌린지를 푼 기록은 맨 아래에 역사적 메모로만 남겨 뒀대요.

### README가 말하는 큰 그림

문서에 나온 단계는 대략 이래요.

1. 헬스 체크로 PHP 버전(8.4.26) 확인
2. 세션 업로드 진행 상황 처리 중 메모리 부족을 일으켜 재사용되는 워커를 오염시키고, 세션 쿠키로 **힙 주소**를 읽음
3. 비슷한 방식으로 **PHP 코드 주소**를 읽음
4. 정리(cleanup) 경로가 찾을 위조 구조를 넣고 `system` 핸들러로 이어지게 하는 최종 요청

주소 두 개가 필요한 이유로, OS가 코드와 힙의 위치를 서로 다르게 무작위화하기 때문이라고 설명해요. 이전 워커·이전 실행의 주소는 쓸 수 없대요.

### 랩 환경

- 오프셋은 **Alpine PHP 8.4.26**, 내장 CLI 서버, **워커 4개** 기준으로 맞춰져 있어요.
- Debian 계열 `php:8.4.26-fpm`처럼 버전 문자열은 같아도 바이너리 배치가 다르면 코드 포인터 지문이 맞지 않아 코드 누출 단계에서 중단된대요.
- nginx 뒤에서 루프백으로 돌리는 Docker 레시피가 README에 있어요.

### 주의

이 글은 뉴스 요약이며, 원격 시스템에 대한 무단 접근이나 실서비스 공격 절차를 안내하지 않아요. README도 로컬 랩에서 실험하라고 적혀 있어요.
