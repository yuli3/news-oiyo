---
id: trend-91806adda866a3a3
title: "AlpineBSD - AI 생성 소프트웨어를 최소화한 NetBSD 기반 운영체제"
sourceUrl: https://wiki.alpinebsd.org/
summary: "AlpineBSD는 NetBSD 커널 위에 Alpine Linux에서 영감을 받은 사용자 공간을 얹은 운영체제예요. 기본 시스템과 메인 패키지 저장소에 LLM 출력물을 넣지 않는 것을 목표로 하고, 아직 설치 프로그램이 없는 개발 중 단계예요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-29
---

### 무엇인가

**AlpineBSD**는 NetBSD 커널을 바탕으로 하고 사용자 공간은 Alpine Linux에서 영감을 받은 운영체제예요. 목표는 **AI가 생성한 소프트웨어를 최대한 적게 쓰는 것**이에요. 기본 시스템과 메인 패키지 저장소에는 LLM 출력물을 넣지 않는다는 AI 정책을 두고 있어요.

아직 개발 중이라 설치 프로그램이 없어요. 모험을 즐기는 사람을 위해 아주 대략적인 설치 안내만 있어요.

### NetBSD와 비교

- NetBSD 커널, libc, mount 같은 플랫폼별 필수 도구를 그대로 써요.
- 주의할 점으로, NetBSD 커널은 하드웨어 지원이 Linux보다 훨씬 들쭉날쭉해요. 아무 컴퓨터에서나 돌아간다고 기대하면 안 되고, 특히 노트북은 NetBSD 지원 하드웨어 목록을 확인하라고 해요.

### Alpine Linux와 비교

- 패키지 관리자 apk-tools와 busybox를 쓰고, BSD make보다 GNU make를 쓰는 등 조금 더 GNU 쪽 사용자 공간이에요.
- Alpine Linux의 포크는 아니에요. 패키지 모음은 독자적이지만, 많은 패키지가 결국 aports를 바탕으로 해요.
- Alpine Linux는 OpenRC를 쓰지만 AlpineBSD는 지금 **s6**를 쓰고, OpenRC도 대안으로 넣을 계획이에요.

> 위키 첫 페이지만 읽었어요.
