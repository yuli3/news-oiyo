---
id: trend-18fe79283ac2bc39
title: "Show GN: VEXPLOR AAS Studio – AAS 작성·검사·설비 값 수집을 한 화면에서 하는 오픈소스"
sourceUrl: "https://github.com/waceinc/vexplor-aas"
summary: "VEXPLOR AAS Studio는 제조 설비의 디지털 표준인 AAS(Asset Administration Shell)를 작성·검사·제공하고 설비 실시간 값을 모으는 일을 웹앱 하나로 묶은 오픈소스예요. 원래 도구 세 개가 필요하던 일이에요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

GitHub README 앞부분을 기준으로 옮겼어요. 52개 검사 규칙 문서는 읽지 않았어요.

### 무엇인가
설비 하나의 AASX 파일을 올리면 **어떤 규칙을 어기는지 정확히 보여 주고**, 고칠 수 있는 건 한 번에 고쳐 주는 웹앱이에요. AAS를 처음 접하는 사람도 따라올 수 있게 만들었다고 해요.

### 도구 세 개를 하나로
| 작업 | 보통 쓰는 도구 | 여기서는 |
|---|---|---|
| AASX 열기·편집·내보내기 | AASX Package Explorer(데스크톱) | 브라우저에서, 검사 결과·자동 수정과 함께 |
| 다른 시스템에 AAS 제공(Part 2 REST·레지스트리) | Eclipse BaSyx 서버 | 같은 서버가 처리 |
| 설비 값 수집·구독 발행 | 별도 OPC UA 클라이언트/서버 | AAS 안의 AID대로 수집해 OPC UA 서버로 발행 |

위 도구들과 제휴하거나 파생된 것은 아니고, 같은 일을 한곳에 모았다고 밝혀요. 시작 화면의 "샘플로 시작"을 누르면 다 채워진 설비 파일과 공정 구조가 열려요.

### 왜 만들었나
AAS는 표준으로 자리 잡았지만 공장에 실제로 넣는 일은 명세 밖에 남아 있어요. README는 10년간의 AAS 연구를 검토한 IEEE Access(2025) 논문이 **기존 설비·시스템과의 통합**을 도입의 핵심 걸림돌로 꼽았다고 인용해요. AAS를 손으로 만드는 수고가 크고, 공개 도구가 편집기·서버·라이브러리로 나뉘어 있어 현장 값을 모으려면 설정 파일에서 직접 매핑해야 해요. 이 프로젝트는 그 일을 소프트웨어가 맡게 해, AAS가 문서로 끝나지 않고 실제로 쓰이게 하려는 거예요. 문서는 모두 한국어로도 있어요.
