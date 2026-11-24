---
id: trend-914fcdaa0389fa4e
title: "ventoy/Ventoy"
sourceUrl: https://github.com/ventoy/Ventoy
summary: "Ventoy는 ISO·WIM·IMG·VHD(x)·EFI 파일로 부팅 USB를 만드는 오픈소스 도구예요. 디스크를 매번 포맷할 필요 없이 이미지 파일을 복사만 하면 부팅 메뉴에서 골라 쓸 수 있고, 1300개 넘는 ISO를 시험했어요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

GitHub 저장소 README 전체를 읽고 옮겼어요. 수백 개에 이르는 테스트 OS 목록은 분류만 정리했어요.

### Ventoy란

Ventoy는 ISO/WIM/IMG/VHD(x)/EFI 파일로 부팅 USB를 만드는 오픈소스 도구예요. 디스크를 몇 번이고 다시 포맷할 필요 없이, 이미지 파일을 USB에 복사하고 부팅하면 돼요. 여러 이미지를 한꺼번에 복사해 두면 부팅 메뉴에서 골라 쓸 수 있고, 로컬 디스크의 이미지 파일도 찾아서 부팅할 수 있어요.

- x86 Legacy BIOS, IA32 UEFI, x86_64 UEFI, ARM64 UEFI, MIPS64EL UEFI를 같은 방식으로 지원해요.
- MBR과 GPT 파티션 방식을 모두 지원해요.
- Windows, WinPE, Linux, Unix, ChromeOS, VMware, Xen 등 대부분의 OS를 지원하고, 1300개 넘는 ISO 파일을 시험했으며 distrowatch.com 배포판의 90% 이상이 동작한다고 해요.

### 테스트된 OS

Windows는 Windows 7~11, Windows Server 2012~2025, WinPE까지 들어 있어요. Linux는 배포판·복구 환경·유틸리티를 합쳐 수백 개로 가장 길고, Unix(FreeBSD, pfSense, TrueNAS 등), ChromeOS(FydeOS, ChromeOS Flex 등), 기타(VMware ESXi, Citrix XenServer, XCP-ng) 항목도 있어요. 사용자는 GitHub 이슈로 시험 성공한 이미지를 제보할 수 있어요.

### 주요 기능

- 100% 오픈소스이고 쓰기 쉬우며, 속도는 사실상 파일 복사 속도에 달려 있어요.
- USB, 로컬 디스크, SSD, NVMe, SD 카드에 설치할 수 있어요.
- 이미지를 풀지 않고 바로 부팅하고, 연속된 디스크 공간이 필요 없으며 4GB 넘는 파일도 지원해요.
- IA32/x86_64 UEFI Secure Boot(1.0.07부터), MBR·GPT(1.0.15부터)를 지원해요.
- 메인 파티션은 FAT32, exFAT, NTFS, UDF, XFS, Btrfs, Ext2/3/4를 지원해요.
- Linux 영속성(1.0.11부터), Windows·Linux 자동 설치(1.0.09부터)를 지원해요.
- 메뉴 별칭, 팁 메시지, 비밀번호 보호, List/TreeView 전환, 테마 커스터마이징, 플러그인 프레임워크, 파일 주입, Linux vDisk 부팅을 지원해요.
- USB 쓰기 보호를 지원하고 일반 USB 사용에 영향이 없으며, 업그레이드해도 데이터가 남고, 새 배포판이 나와도 Ventoy를 업데이트할 필요가 없어요.

### 그 밖의 섹션

로컬 디스크 이미지를 부팅하는 Ventoy Browser와 그래픽 플러그인 설정 도구 VentoyPlugson이 있어요. 설치 방법과 설치·테마·자동 설치·영속성·WIM 부팅 등 문서는 공식 사이트에 있고, 소스 빌드 방법은 DOC 폴더의 BuildVentoyFromSource.txt에 있어요. FAQ와 포럼(forums.ventoy.net)도 운영하고, 후원은 Alipay, WeChat Pay, PayPal, 비트코인으로 받아요. 라이선스는 GPL-3.0이에요.
