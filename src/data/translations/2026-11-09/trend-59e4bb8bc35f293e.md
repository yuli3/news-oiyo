---
id: trend-59e4bb8bc35f293e
title: "hagezi/dns-blocklists"
sourceUrl: https://github.com/hagezi/dns-blocklists
summary: "hagezi/dns-blocklists는 광고, 추적기, 텔레메트리, 피싱, 악성코드, 사기 도메인을 네트워크 전체에서 막는 DNS 차단 목록 모음이에요. 강도별 Multi 버전 5종과 위협 정보 피드 등을 제공해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

GitHub README의 앞부분(소개와 목차)을 읽고 옮겼어요.

### 무엇인가
광고, 추적기, 텔레메트리, 피싱, 악성코드, 사기 등 원치 않는 도메인을 네트워크 전체에서 막는 DNS 차단 목록 모음이에요. 지역과 상관없이 쓸 수 있고 흔히 쓰는 DNS 서버, 광고 차단기, 콘텐츠 차단기와 모두 호환된다고 해요. 저장소에는 adblock, adguard, controld, dnsmasq, rpz, wildcard 같은 형식별 폴더가 있어요.

### 어디서부터 시작하나
README는 처음이라면 **Multi PRO**와 **Threat Intelligence Feeds** 목록으로 시작하고, 쓰는 도구에 맞는 형식을 고른 뒤 빠른 설정 가이드를 따르라고 권해요. 어떤 버전이 맞는지 모르겠으면 별도 안내 문서가 있고, 'Direct Link Generator'로 두 다운로드 링크를 한 번에 받을 수 있어요.

### Multi 버전(청소 도구 비유)
다섯 가지 Multi 버전은 청소 도구 이름을 따요. Light는 손빗자루(기본 보호), Normal은 빗자루(전반적 보호), Pro는 큰 빗자루(확장 보호, 권장), Pro++는 청소기(더 공격적), Ultimate는 궁극의 청소기(가장 공격적)예요. 도구가 클수록 더 철저히 치우지만 남기고 싶던 것까지 쓸어 갈 가능성도 커진다고 해요. Pro, Pro++, Ultimate는 Full/Mini 크기가 있어요.

### 특화 목록
Fake(사기·가짜 사이트), Pop-Up Ads, Threat Intelligence Feeds(Full/Medium/Mini/IPs), Dynamic DNS 악용, Badware Hoster, 가장 악용되는 TLD, DNS 리바인드 보호, DoH/VPN/Tor/Proxy 우회 차단, 세이프서치 미지원 검색엔진, URL 단축기, 불법복제, 도박, 소셜 네트워크, 성인 콘텐츠, 기기·앱·OS 내장 추적기 목록이 있어요. 도메인·IP를 모든 목록에서 확인하는 Blocklist Lookup과 치트 시트, AdGuard DNS·ControlD 등 이 목록을 쓰는 온라인 DNS 서비스 안내도 있어요.
