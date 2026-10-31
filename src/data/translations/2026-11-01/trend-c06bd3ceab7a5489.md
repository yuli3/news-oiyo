---
id: trend-c06bd3ceab7a5489
title: "IceWhaleTech/CasaOS"
sourceUrl: https://github.com/IceWhaleTech/CasaOS
summary: "CasaOS는 ZimaBoard·NUC·라즈베리파이·오래된 PC에서 돌아가는 오픈소스 개인 클라우드 시스템이에요. 가정용 UI, 원클릭 앱 스토어(Nextcloud, HomeAssistant, Jellyfin 등), 도커 앱 설치를 지원하고 한 줄 명령으로 설치해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

GitHub README를 "Contributing" 절 앞까지 읽고 옮겼어요. 그 뒤(기여·라이선스 등)는 읽지 못했어요.

### 왜 개인 클라우드인가

팀은 2020년 세 가지 흐름을 봤다고 해요. 컴퓨팅·저장 비용이 빠르게 떨어지고, 클라우드 일부가 엣지로 옮겨 가고, 소비자 데이터 자산의 소유권 문제가 무시되고 있다는 거예요. 그래서 "5년 안에 100달러 이하 개인 클라우드가 나온다면?"이라는 사고 실험을 했어요.

이 개인 클라우드는 창작자와 소규모 조직의 데이터를 저장·관리하는 개인 데이터센터가 되고, 전 세계 개인 서버가 분산 협업 컴퓨팅 네트워크를 이루며, 스마트 기기를 연결해 생태계를 넘는 로컬 지능형 서비스를 제공한다는 구상이에요. 개인 데이터로 **개인화된 AI 비서**를 학습시킬 수도 있다고 해요.

### 기능

- 가정용으로 설계한 친근한 UI(코드·양식 없이 직관적으로)
- ZimaBoard, NUC, 라즈베리파이, 오래된 컴퓨터 등 여러 하드웨어 지원
- 앱 스토어에서 Nextcloud, HomeAssistant, AdGuard, Jellyfin, *arr 등 **원클릭 설치**
- 도커 생태계의 10만 개 이상 앱을 쉽게 설치
- 드라이브·파일 관리와 자원 사용량·앱 상태 위젯

### 설치

- 하드웨어: amd64/x86-64, arm64, armv7.
- 공식 지원 OS: Debian 12(권장), Ubuntu Server 20.04, Raspberry Pi OS. 커뮤니티 지원: Elementary 6.1, Armbian 22.04(테스트됨), Alpine·OpenWrt·ArchLinux(완전 테스트 전).
- 설치는 `curl -fsSL https://get.casaos.io | sudo bash` 한 줄이에요(wget도 가능).
- 업데이트는 UI의 설정에서 하거나, SSH나 직접 연결한 터미널에서 업데이트 스크립트를 돌려요. CasaOS UI 안의 터미널에선 안 돼요. 버전은 `casaos -v`, 제거는 v0.3.3 이상에서 `casaos-uninstall`이에요.

### 이름과 커뮤니티

Casa는 스페인어로 '집'이에요. 원래 킥스타터 크라우드펀딩 제품 ZimaBoard의 기본 탑재 시스템으로 시작했고, 가정용으로 설계된 서버 시스템이 없어서 직접 만들었다고 해요. 소통은 Discord에서 해요.
