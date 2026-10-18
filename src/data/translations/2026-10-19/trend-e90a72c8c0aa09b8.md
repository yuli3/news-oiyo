---
id: trend-e90a72c8c0aa09b8
title: "CVE-2026-99999(PwnEscape) — Linux 커널 취약점으로 VM 탈출 가능, VPS 사업자 긴급 대응"
sourceUrl: "https://www.cve.org/CVERecord?id=CVE-2026-99999"
summary: "Linux 커널 IPv4 경로가 checksum_start를 검증하지 않아, 악성 microVM이 조작한 패킷으로 호스트 메모리 유출·크래시·코드 실행까지 일으킬 수 있는 취약점이에요. CVSS 9.3(Critical)이고 5.10.272, 6.1.190, 6.6.159, 6.12.113, 7.2.11 등에서 고쳐졌어요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

cve.org 페이지는 스크립트로 그려져 본문이 비어 있어서, 같은 레코드를 CVE 공식 API(cveawg.mitre.org)로 받아 **CVE 레코드 전체**를 읽고 옮겼어요. 발견 경위와 업계 반응(사쿠라 인터넷, AWS)은 GeekNews 소개글에만 있는 내용이라 따로 표시했어요.

### 레코드 기본 정보
| 항목 | 내용 |
|---|---|
| ID | CVE-2026-99999 |
| 할당 기관(CNA) | Linux |
| 공개 | 2026-10-15 12:19 UTC(10-17 갱신) |
| 심각도 | CVSS 3.1 **9.3 Critical** (AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H) |
| 수정 패치 제목 | `ipv4: validate checksum_start before completing checksum` |

### 무엇이 문제인가
레코드 설명에 따르면, 잘못된 체크섬 메타데이터를 가진 패킷이 IPv4 스택에 들어오면 `skb_checksum_help`가 네트워크 헤더를 망가뜨려 여러 문제를 일으킬 수 있어요. Paulos가 발견해 보고했고 이후 다른 사람들도 독립적으로 재현했다고 적혀 있어요. 이런 패킷은 애초에 들어오지 않아야 하지만, 심층 방어로 체크섬을 완성하기 전에 검사를 추가했고 입력 단계의 더 완전한 검증은 추가 작업이 필요하다고 해요.

### 공격 시나리오(CVSS 근거)
- **경로**: 악성 microVM이 virtio-net 체크섬 메타데이터를 조작해 프레임을 내보내면, VMM이 호스트 TAP에 쓰고 `tun_get_user()`가 IPv4 스택에 넘기며 `ip_do_fragment()`가 `skb_checksum_help()`를 불러요. 인터넷 수신 경로가 아니라 게스트·로컬 가상 장치 경로예요.
- **조건**: 게스트가 프레임, 체크섬 시작·오프셋, 패킷 크기를 통제하고 같은 단편화 시퀀스를 반복할 수 있어 경쟁 조건이나 타이밍이 필요 없어요. 호스트 권한이나 `/dev/net/tun` 접근도 필요 없어요.
- **기밀성**: 이미 검증된 IPv4 IHL이 바뀐 뒤 `ip_frag_next()`가 skb 논리 헤드를 넘어 IPv4 옵션으로 복사해, 게스트가 내보내는 패킷에 호스트 메모리가 계속 새어 나오는 게 시연됐어요.
- **무결성·가용성**: 공격자가 정한 위치에 쓰기가 일어나고, 조작한 게스트 패킷으로 물리 호스트를 다운시켜 그 위 모든 샌드박스를 멈추게 한 사례가 시연됐어요. 관리자 권한 코드 실행 변형도 재현됐다고 해요.

### 영향 버전과 수정
2.6.27부터 영향을 받고, 다음 안정 버전부터 수정됐어요: **5.10.272, 5.15.223, 6.1.190, 6.6.159, 6.12.113, 6.18.57, 7.2.11, 7.3-rc7**. 관련 파일은 `net/ipv4/ip_output.c`, `include/net/ip.h`, netfilter·xfrm 일부예요. 참고 링크로 git.kernel.org 안정 커밋 8개, pwn.ai의 "pwnescape" 글, Vercel의 "100만 달러 Sandbox 챌린지 결과" 글이 달려 있어요.

### GeekNews 소개글에 있는 맥락(레코드 밖 정보)
- Vercel이 연 100만 달러 규모 Sandbox 해킹 챌린지에서 Paulos Yibelo(pwn.ai)가 발견했고, Vercel 운영 환경에서 호스트 메모리 유출이, 연구자의 KVM·Firecracker 환경에서 크래시와 코드 실행이 재현됐다고 해요.
- 게스트 커널 업데이트만으로는 해결되지 않고 **호스트 커널 패치**가 필요하며, 구성에 따라 호스트 재부팅이 필요할 수 있다고 해요.
- 일본 사쿠라 인터넷은 10월 16일부터 신규 VPS 신청 등을 일시 중단했고, AWS는 EC2·Lambda·Fargate가 영향받지 않는다고 공지했다고 전해요.
