---
id: trend-6de4d335c11daa00
title: "Show HN: A language model that lives in a boot sector"
sourceUrl: https://github.com/kerlenton/bootgpt
summary: "bootgpt는 512바이트 MBR에 손으로 짠 어셈블리로 11.5KB int8 신경망을 불러와 OS 없이 386 실모드에서 돌리는 Show HN 프로젝트예요. 부팅하면 존재하지 않는 하드웨어의 리눅스 부팅 로그를 '꿈꿔요'."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

GitHub README 전체를 읽고 옮겼어요.

### 무엇인가

"PC를 부팅하는 신경망"이에요. MBR은 손으로 쓴 어셈블리 512바이트이고, 다음 23개 섹터에서 **11.5KB짜리 int8 모델**을 읽어 386의 16비트 실모드에서 돌려요. OS도 C 런타임도 없어요. 기계가 깨어나면 타임스탬프, PCI BAR, 존재한 적 없는 하드웨어의 ACPI 이벤트가 담긴 **리눅스 부팅 로그를 지어내요.**

문맥 8글자, 은닉층 하나라서 결과물은 이런 수준이에요.

```
[ 0.206596] Command line: BOOT_IMAGE=/vmlinu -5.5.2-1-generic gcc version 13.3.0, GNU ld ...
[ 1.883084] NET: Registered protocol family 16
```

### 실행

`brew install nasm qemu`, Python 가상환경에 numpy를 설치한 뒤 `./build.sh`, `./run.sh`로 돌려요. `disk.img`는 일반 부팅 이미지라 USB에 `dd`로 써서 BIOS 기계에서 부팅할 수도 있어요. 자기 섹터만 읽어요.

### 구성

- **corpus_gen.py**: 가짜 dmesg 3MB를 만들어요. 부팅 세션마다 커널 버전과 디스크를 하나로 고정해요. 실제 부팅 로그는 반복이 많고, 그 반복 덕에 작은 모델이 그럴듯해 보여요.
- **train.py**: 글자 임베딩, 은닉층 하나, softmax 모델을 학습하고 2의 거듭제곱 스케일로 전부 int8 양자화해요. 그래서 부트 섹터가 `imul`과 `idiv` 한 번으로 순전파를 끝내요. 어셈블리가 할 정수 연산을 LCG 샘플러까지 그대로 시뮬레이션해서 Python 출력과 부트 섹터 출력이 **글자 단위로 일치**하는지 비교해요.
- **boot.asm**: 런타임 전체예요. `int 13h`로 가중치를 읽고, `int 10h`로 출력하고, `cdq/idiv`로 softclip 활성화를 하고, 타이머 시드 노이즈로 argmax 샘플링을 해요. 아무 키나 누르면 재부팅돼요.
- **record.py**: 헤드리스 QEMU의 모니터 소켓으로 데모 GIF를 녹화해요.

부트 섹터에는 코드만 있고 문자열, 가중치, 어휘 표는 데이터 섹터에 있어요. 추론과 BIOS 처리를 510바이트에 넣으려면 이 방법뿐이었대요.

### 선행 작업

부트 섹터 장르는 오래됐어요. Oscar Toledo는 체스, OS, BASIC 인터프리터를 512바이트에 넣었고 C 컴파일러를 넣은 사람도 있어요. 가장 가까운 건 **sectorllm**으로, 약 1.2KB 실모드 어셈블리로 진짜 llama2 트랜스포머(5층, 어텐션 포함)를 부팅해 Karpathy의 stories260K를 돌려요. bootgpt는 반대 극단이에요. 엔진 전체가 510바이트 MBR 안에 들어가고, 모델은 범용 이야기꾼이 아니라 **자기가 깨어난 기계의 부팅 로그를 환각하는 일 하나만** 하도록 학습된 작은 글자 단위 신경망이에요. MIT 라이선스예요.
