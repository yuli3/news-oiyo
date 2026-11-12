---
id: trend-914fcdaa0389fa4e
title: "ventoy/Ventoy"
sourceUrl: https://github.com/ventoy/Ventoy
summary: "Ventoy는 ISO·WIM·IMG·VHD(x)·EFI 파일로 부팅 USB를 만드는 오픈소스 도구예요. 디스크를 매번 포맷할 필요 없이 이미지 파일을 USB에 복사만 하면 부팅 메뉴에서 골라 쓸 수 있고, 1,300개 넘는 ISO를 시험했대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-13
---

GitHub 저장소 README를 읽고 옮겼어요. 가져온 본문이 글자 수 제한에 걸려 시험한 OS 목록 중간에서 끊겨, 그 뒤 기능 설명 등은 반영하지 못했어요.

### 무엇인가

**Ventoy**는 ISO, WIM, IMG, VHD(x), EFI 파일로 부팅 가능한 USB 드라이브를 만드는 오픈소스 도구예요.

### 쓰는 방식

- 디스크를 반복해서 포맷할 필요 없이, 이미지 파일을 USB 드라이브에 **복사만 하면** 부팅할 수 있어요.
- 이미지 파일 여러 개를 한꺼번에 복사해 두면 Ventoy가 **부팅 메뉴**를 띄워 고를 수 있게 해요.
- 로컬 디스크에 있는 이미지 파일도 찾아서 부팅할 수 있어요.

### 지원 범위

- x86 Legacy BIOS, IA32 UEFI, x86_64 UEFI, ARM64 UEFI, MIPS64EL UEFI를 같은 방식으로 지원해요.
- MBR과 GPT 파티션 방식 모두 지원해요.
- Windows, WinPE, Linux, Unix, ChromeOS, VMware, Xen 등 대부분의 OS를 지원해요.
- **1,300개 넘는 ISO 파일**을 시험했고, distrowatch.com에 있는 배포판의 **90% 이상**을 지원한대요.

### 시험한 OS (일부)

- **Windows**: Windows 7, 8, 8.1, 10, 11, Windows Server 2012·2012 R2·2016·2019·2022·2025, WinPE
- **Linux**: Debian, Ubuntu, CentOS, RHEL, Fedora, Rocky Linux, AlmaLinux, openSUSE, Arch, Manjaro, Linux Mint, Kali, Gentoo, NixOS, Proxmox VE, Tails, SteamOS, Garuda Linux 등 수백 개가 나열돼 있어요. 한국의 HamoniKR도 목록에 있어요.

공식 웹사이트는 ventoy.net이에요.
