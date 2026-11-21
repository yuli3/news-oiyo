---
id: trend-5b6cd277596f4fdf
title: "projectdiscovery/nuclei-templates"
sourceUrl: https://github.com/projectdiscovery/nuclei-templates
summary: "보안 취약점 스캐너 nuclei가 실제로 검사에 쓰는 템플릿을 커뮤니티가 모아 관리하는 저장소예요. 실제 악용 중인 취약점(KEV)을 겨냥한 템플릿이 1,496개이고, HTTP 템플릿만 9,000개가 넘어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-22
---

projectdiscovery/nuclei-templates 깃허브 README 전체를 읽고 옮겼어요. README 대부분이 통계 표라 글 자체는 짧아요.

### 무엇인가

nuclei 엔진으로 애플리케이션 보안 취약점을 찾을 때 쓰는 템플릿을 커뮤니티가 큐레이션한 목록이에요. 템플릿은 nuclei 스캐너에서 실제 검사를 수행하는 핵심이고, 이 저장소에는 ProjectDiscovery 팀이 만든 템플릿과 커뮤니티 기여 템플릿이 함께 있어요. 풀 리퀘스트나 깃허브 이슈로 템플릿을 보내 달라고 요청해요.

### 실제 악용 취약점(KEV) 커버리지

- CISA KEV(미국 사이버보안·인프라보안청의 실제 악용 취약점 목록)와 VulnCheck KEV를 함께 다뤄요. VulnCheck KEV 관련 템플릿은 1,449개예요.
- 중복을 뺀 KEV 템플릿은 총 1,496개이고, `nuclei -tags kev,vkev`로 실제 악용 중인 취약점만 골라 스캔할 수 있어요.

### 통계 상위 항목(README 표 기준)

- 태그: `vuln` 6,468개
- 작성자: dhiyaneshdk 1,894개로 가장 많고, daffainfo, princechaddha, dwisiswant0, ritikchaddha, pussycat0x 등이 뒤를 이어요.
- 디렉터리: `http` 9,281개, 그 밖에 `cloud`, `file`, `network`, `code`, `dast` 등이 있어요.
- 심각도: info 4,353개, high 2,552개, medium 2,457개, critical 1,555개
- 유형: file 3,587개, discovery 3,265개, vkev 1,394개, panel 1,365개 등

전체 통계는 별도 문서와 JSON으로도 제공돼 다른 도구와 연동할 수 있어요.

### 참여

GitHub Discussions와 Discord 커뮤니티에서 메인테이너와 직접 이야기할 수 있어요. 저장소 주제 태그에는 bugbounty, exploit-development, vulnerability-detection 등이 붙어 있어요.
