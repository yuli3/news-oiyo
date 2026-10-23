---
id: trend-5b6cd277596f4fdf
title: "projectdiscovery/nuclei-templates"
sourceUrl: https://github.com/projectdiscovery/nuclei-templates
summary: "nuclei-templates는 nuclei 스캐너가 앱 보안 취약점을 찾는 데 쓰는 템플릿을 커뮤니티가 모아 둔 저장소예요. 실제 악용된 취약점(KEV)을 다루는 템플릿이 1,496개이고, http 디렉터리에만 9,281개 템플릿이 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-24
---

> GitHub 트렌딩에 오른 저장소예요. README를 기준으로 옮겼고, 통계 표는 일부만 옮겼어요. 보안 점검 도구라 **허가받은 대상**에만 써야 해요.

### 무엇인가

**nuclei-templates**는 **nuclei 엔진**이 애플리케이션 보안 취약점을 찾을 때 쓰는 템플릿을 **커뮤니티가 큐레이션**한 저장소예요. 템플릿이 실제 스캔 엔진을 움직이는 핵심이고, ProjectDiscovery 팀과 커뮤니티가 기여한 템플릿이 함께 들어 있어요. PR이나 GitHub 이슈로 템플릿을 보내 달라고 해요.

### 실제 악용 취약점(KEV) 커버리지

| 출처 | 템플릿 수 |
|---|---|
| CISA KEV | 454 |
| VulnCheck KEV | 1,449 |
| 두 출처 모두 | 407 |
| 고유 KEV 템플릿 합계 | **1,496** |

`nuclei -tags kev,vkev`로 실제 악용 중인 취약점만 골라 스캔할 수 있어요.

### 상위 통계 (일부)

- **태그**: vuln 6,468 · cve 3,587 · discovery 3,265 · panel 1,365 · xss 1,269 · wordpress 1,261
- **디렉터리**: http 9,281 · cloud 659 · file 436 · network 259 · code 251
- **심각도**: info 4,353 · high 2,552 · medium 2,457 · critical 1,555 · low 330
- 전체 873개 디렉터리, 11,997개 파일이에요.

### 참여

문서는 nuclei.projectdiscovery.io에 있고, GitHub Discussions와 Discord 커뮤니티에서 메인테이너와 이야기할 수 있어요.
