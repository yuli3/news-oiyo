---
id: trend-59e4bb8bc35f293e
title: "hagezi/dns-blocklists"
sourceUrl: "https://github.com/hagezi/dns-blocklists"
summary: "HaGeZi DNS Blocklists는 광고·추적기·텔레메트리·피싱·악성코드·사기 도메인을 네트워크 단위로 막는 DNS 차단 목록 모음이에요. Light부터 Ultimate까지 강도별 Multi 목록과 위협 인텔리전스, 신규 등록 도메인 등 특화 목록을 제공해요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
GitHub Trending에 오른 저장소예요. README가 매우 길어서 소개와 목록 구성(목차)을 옮겼어요.

### 무엇인가
**HaGeZi DNS Blocklists**는 광고, 추적기, 텔레메트리, 피싱, 악성코드, 사기 및 원치 않는 도메인을 **네트워크 전체에서** 차단하는 DNS 차단 목록 모음이에요. 지역을 가리지 않고, 흔히 쓰는 모든 DNS 서버·광고 차단기·콘텐츠 차단기에서 동작한다고 해요.

### 처음이라면
**Multi PRO**에 **Threat Intelligence Feeds** 목록을 더하는 것으로 시작하고, 쓰는 도구에 맞는 형식을 고른 뒤 빠른 설정 가이드를 따르라고 권해요. 어떤 버전이 맞는지 모르겠으면 FAQ의 "어떤 목록 버전을 써야 하나"를, 급하면 두 다운로드 링크를 한 번에 주는 Direct Link Generator를 쓰면 돼요.

### 청소 도구에 빗댄 다섯 가지 Multi 버전
강도가 셀수록 더 깨끗이 쓸어 내지만, 지키고 싶던 것까지 쓸어 버릴 가능성도 커져요.
- **LIGHT**(손빗자루): 기본 보호
- **NORMAL**(빗자루): 전반적 보호
- **PRO**(큰 빗자루): 확장 보호, 권장 — Full/Mini
- **PRO++**(청소기): 고급 보호, 더 공격적 — Full/Mini
- **ULTIMATE**(궁극의 청소기): 최대 보호, 가장 공격적 — Full/Mini

### 특화 목록
- **Fake**(사기·함정·가짜 사이트), **Pop-Up Ads**(성가시거나 악성인 팝업)
- **Threat Intelligence Feeds**(권장): Full/Medium/Mini/IPs
- **신규 등록 도메인(NRD/DGA)**: 공격자가 즐겨 쓰는 도구
- **Dynamic DNS 남용**, **Badware Hoster**(악성 호스팅), **가장 많이 악용되는 TLD**
- **DNS Rebind Protection**: 도메인을 로컬 네트워크로 향하게 하는 공격 차단
- **DoH/VPN/Tor/Proxy 우회 차단**: DNS를 몰래 우회하는 것 방지
- **Safesearch 미지원 검색엔진**, **URL 단축기**, **불법 복제**, **도박**(Full/Medium/Mini), **소셜 네트워크**, **성인물(NSFW)**
- **Native Tracker**: 기기·앱·OS에 내장된 추적기 차단

### 도구와 서비스
Direct Link Generator, 도메인·IP를 모든 목록에 대조하는 Blocklist Lookup, 목록별 요약표(Cheat Sheet)를 제공하고, AdGuard DNS, ControlD, HaGeZi DNS, RethinkDNS 등 이 목록을 쓰는 온라인 DNS 서비스도 안내해요.
