---
id: trend-bd5873c4a03db6c0
title: "Using AI to reverse engineer hardware"
sourceUrl: "https://blogs.gnome.org/uraeus/2026/10/15/aiandreverseengineerhardware"
summary: "GNOME의 Christian Schaller가 Windows VM과 usbmon 캡처를 Claude Code에 맡겨 문서 없는 필름 스캐너의 SANE 드라이버와 노트북 MIPI 카메라 패치를 만든 경험을 공유하고, 이를 범용화한 hw-harness를 공개했어요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

GNOME 블로그 원문을 읽었지만 수집 상한(9,000자) 때문에 세 프로젝트 중 첫 번째와 두 번째 시작까지만 읽었어요. 그래서 `partial`로 표시해요.

### 시작은 필름 스캐너
어머니가 돌아가신 뒤 Schaller는 어린 시절 가족 여행 사진이 담긴 필름 네거티브 상자를 물려받았어요. Linux 지원을 보고 Plustek 8200i 스캐너를 샀는데, 칩셋이 Linux에서 지원되지 않는 것으로 바뀌어 있었다고 해요. Claude Code로 드라이버를 만들어 보려 했지만 몇 달간 진전이 없어 거의 포기했어요.

그러다 Tom Crider(Glorious Eggroll)가 AI 에이전트에 Windows 인스턴스 전체 제어권을 줘서 마우스 드라이버를 고친 X 글을 봤어요. 그 글을 Claude에 붙여 넣고 같은 방식의 Windows VM 구성을 부탁했더니, Windows에서 스캔하며 USB 데이터를 캡처할 수 있게 되자 몇 시간 만에 Linux에서 첫 스캔이 됐다고 해요. 며칠 뒤에는 적외선 스캔까지 되는 거의 완벽한 드라이버가 나왔지만, 그사이 누군가 SANE에 이 스캐너 지원을 이미 커밋해 둔 상태였어요. 네거티브 스캔 앱 Negative Vibes도 Claude로 만들었다고 해요.

같은 하네스로 노트북 MIPI 카메라도 손봤어요. 아침에 작업을 맡기고 저녁에는 커널과 libcamera 패치가 준비됐다고 해요.

### 왜 AI에 잘 맞나
문서 없는 하드웨어 드라이버 작성은 버스 트래픽을 캡처하고, hex dump를 보고, 레지스터 의미를 추측해 하나씩 시험하는 일이라 보통 몇 주가 걸려요. 개념적으로 어렵진 않지만 인내가 필요해요. AI는 수천 줄의 USB 캡처에서 한 바이트만 바뀌는 반복을 찾아내 의미를 제안하고, 확인 테스트를 쓰고, 지루해하지 않아요. 무엇을 만들지 정하고 실제 하드웨어에서 검증하는 건 여전히 사람이에요.

### hw-harness
실제 작업에 쓴 스크립트를 Claude나 Codex 세션에서 쓰도록 범용화한 도구예요.

1. 기준 세션 기록: 실제 장치를 패스스루한 KVM VM에서 제조사 Windows 드라이버를 돌려요.
2. VM 바깥에서 캡처: Linux 호스트에서 usbmon으로 기록해요. 패스스루 층 아래라 게스트는 이를 못 봐요.
3. 같은 작업을 Linux에서 내 드라이버로 반복해 똑같이 캡처해요.
4. 두 트레이스를 비교해요. 차이가 곧 드라이버 버그 목록이에요.

버스가 없는 내장 MIPI 카메라 같은 장치는 INF 파일, 레지스트리, ACPI 테이블, 장치 속성 같은 Windows 쪽 정보를 봐요. 코드를 복사하지 않고 하드웨어 동작을 관찰하고 설정 데이터만 뽑아서, 새 드라이버의 상수는 모두 기록된 무언가로 거슬러 올라간다고 해요.

### 프로젝트 1: Plustek OpticFilm 8200i SANE 백엔드
Genesys GL128 컨트롤러(USB 07b3:1825)를 쓰는 신형 모델용이에요. 컬러·그레이·적외선·컬러+적외선 모드, 300–7200dpi, 채널당 8/16비트, 적외선 먼지·스크래치 제거, 노출 배수를 지원하고 Fedora RPM으로 자동 빌드돼요. 2026년 9월 upstream SANE genesys 백엔드도 이 스캐너를 지원하게 돼 비교했더니, 3600dpi 세부 해상도는 같고 최고 해상도 속도는 34.6초 대 54.4초로 자기 쪽이 빨랐으며 upstream은 해상도 단계가 더 많았다고 해요. 한 대·한 프레임 결과라 데이터 포인트 하나로 봐 달라고 해요.
