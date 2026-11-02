---
id: trend-2c7a8a1cad13cff2
title: "GPU-unlock - RTX 30 시리즈의 AI 연산 성능 제한을 해제하는 Linux 모듈"
sourceUrl: https://github.com/Zagitta/gpu-unlock
summary: "gpu-unlock은 NVIDIA 드라이버가 붙기 전에 RTX 30 시리즈(GA102–GA106)의 FP16/BF16 명령 발행 속도 제한을 풀어 전문가용 카드 수준으로 두 배 올리는 Linux 커널 모듈이에요. LLM 프리필이 14–36% 빨라졌다는 보고가 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

> GitHub README의 앞부분(원리, 사용자 보고, 설치·패키징)을 읽고 옮겼어요. 벤치마크 표의 숫자 일부와 뒤쪽 문서는 읽지 못했어요. 커널 모듈로 GPU 설정을 바꾸는 도구라 위험은 사용자 몫이에요.

### 무엇을 하나요

NVIDIA **RTX 30 시리즈**(GA102, GA103, GA104, GA106) 카드의 **FP16/BF16 명령 발행 속도**를 전문가용 카드 수준으로 푸는 **Linux 커널 모듈**이에요.

- CMP 언락커의 V67/PLM 기법과 UEFI 방식의 '드라이버보다 먼저' 타이밍을 합쳤어요.
- 언락을 실행하고, 속도 선택자(전체 BF16 속도를 고르는 SS0 `0x88888888`, 4비트 SS1 `0x8` IMLA4)를 쓰고, **수정하지 않은 NVIDIA 드라이버가 카드를 잡기 전에** FLR(기능 수준 리셋)을 해요.
- UEFI 앱도, 패치된 NVIDIA 드라이버도 아니라서 **새 드라이버가 나올 때마다 다시 패치할 필요가 없대요.**
- 효과: FP32 누산을 하는 FP16/BF16 FMA의 **명령 발행 속도가 두 배**가 돼요.

### 사용자 보고

- 모듈은 코드에 적힌 모든 GeForce ID를 받지만, 표는 실제 보고가 있는 카드만 실어요. 예를 들어 RTX 3080 Ti 20GB(OEM, GA102-250)는 언락은 되지만 BF16이 반 속도에 머물렀고, 메모리를 개조한 RTX 3080 20GB는 이 모듈로는 시험하지 않았대요(Windows의 UEFI 포트로는 같은 언락이 됐대요).
- 향상 폭은 보고마다 벤치마크가 달라 직접 비교할 수 없어요. **전력 제한**이 중요해서, 가장 낮은 +25%는 225W로 제한한 카드였대요.
- 행렬 연산이 많은 작업이 빨라져요. **LLM 프리필은 FlashAttention에서 +14–36%**였고, 메모리 대역폭에 묶인 **LLM 디코드와 INT8 작업은 거의 그대로**예요.
- 출력을 비교한 보고에선 전후 결과가 **비트 단위로 같았대요.**
- 한 대에 카드 4장, 화면을 출력하는 카드, `vfio-pci`로 VM에 넘긴 카드 사례도 있어요.

### 설치

저장소를 받은 뒤 커널 명령줄에 `gpu_unlock.targets=all`을 붙여요. GRUB(Debian/Ubuntu/Mint, Arch/CachyOS), grubby, systemd-boot, UKI별 방법이 안내돼 있어요.

- 빌드는 고정된 NVIDIA/CachyOS 입력을 HTTPS로 받아 **SHA-256을 확인**하고, 펌웨어는 빌드 디렉터리와 바이너리 패키지에서만 만들어요.
- `make install`이 배포판을 감지해 Arch, Debian/Ubuntu, Fedora/RHEL 계열용 패키지를 만들고 설치해요(`make install-arch`, `install-deb`, `install-rpm`).
- 배포용 소스 아카이브에는 NVIDIA 파일이나 생성된 펌웨어가 들어 있지 않아요.
- 패키지는 모듈과 펌웨어를 initramfs에 넣어 **nvidia보다 먼저** 로드해요(mkinitcpio, initramfs-tools, dracut 설정 포함).

같은 날 r/LocalLLaMA에는 이 모듈과 reBAR·P2P 해제를 함께 적용한 RTX 3080 20GB 테스트 글도 올라왔어요.
