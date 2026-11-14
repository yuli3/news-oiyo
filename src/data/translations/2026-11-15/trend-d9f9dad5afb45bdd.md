---
id: trend-d9f9dad5afb45bdd
title: "PowerShell/PowerShell"
sourceUrl: https://github.com/PowerShell/PowerShell
summary: "PowerShell은 Windows, Linux, macOS에서 돌아가는 자동화·구성 도구로, JSON·CSV·XML 같은 구조화된 데이터와 REST API 처리에 최적화돼 있어요. 이 저장소는 PowerShell 7 이상을 다루고, Windows PowerShell 5.1로는 변경이 넘어가지 않아요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-15
---

GitHub 저장소 README를 읽고 정리했어요.

### 한 줄 소개

**PowerShell**은 Windows, Linux, macOS에서 돌아가는 크로스 플랫폼 자동화·구성 도구이자 프레임워크예요. 기존 도구와 잘 어울리고, JSON·CSV·XML 같은 **구조화된 데이터**, REST API, 객체 모델 처리에 최적화돼 있어요. 명령줄 셸, 스크립트 언어, cmdlet 처리 프레임워크로 구성돼요.

### Windows PowerShell과의 차이

- 이 저장소는 Windows PowerShell 코드베이스의 포크로 시작했지만, 여기서의 변경은 **Windows PowerShell 5.1로 역이식되지 않아요**.
- 그래서 이 저장소 이슈는 **PowerShell 7.x 이상**만 다뤄요. Windows PowerShell 문제는 Windows 피드백 허브 앱의 "Apps > PowerShell" 분류로 보내야 해요.

### 설치와 업그레이드

Windows, macOS, 여러 Linux 배포판을 지원하고, 업그레이드할 때는 처음 설치한 방법과 같은 방법을 쓰는 게 좋다고 해요. 처음이라면 Microsoft Learn의 시작 가이드를 권해요.

### 커뮤니티

- 커뮤니티 기여와 프로젝트 상태를 시각화한 대시보드가 있어요.
- 코드와 무관한 주제는 **GitHub Discussions**에서 다루는 실험을 하고 있어요. 팀원이 정기적으로 참여한다고 기대하지는 말아 달라고 해요.
- Discord, Libera.Chat IRC, Slack에 주제별 채널이 있어요.

### 개발과 라이선스

- 기여 가이드를 먼저 읽고, Linux·Windows·macOS별 빌드 문서와 FAQ를 참고하면 돼요.
- 라이선스는 **MIT**예요.
- **Docker 컨테이너 이미지는 이제 .NET 팀이 관리**해요. `mcr.microsoft.com/powershell`의 컨테이너는 현재 관리되지 않아요.
- 수집되는 원격 측정(텔레메트리)은 about_Telemetry 문서에 설명돼 있고, 거버넌스·행동 강령·보안 정책 문서도 있어요.
