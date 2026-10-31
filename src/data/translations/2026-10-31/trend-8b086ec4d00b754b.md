---
id: trend-8b086ec4d00b754b
title: "Show HN: A working Nintendo in ~1GB of Qwen weights"
sourceUrl: https://github.com/dbreunig/nesformer
summary: "nesformer는 NES의 6502 CPU와 작업 RAM, 카트리지 ROM을 일반 Qwen3.5 체크포인트 가중치 안에 컴파일한 프로젝트예요. 학습이 아니라 컴파일러가 가중치를 계산했고, 모델이 CPU 실행 로그를 토큰 단위로 예측하며 게임을 돌려요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-31
---

GitHub README 앞부분을 읽고 옮겼어요(README가 길어 설치·사용법 위주로 읽었어요).

### 무엇인가

**nesformer**는 NES의 CPU를 일반 **Qwen3.5** 모델 가중치 안에 컴파일한 프로젝트예요. NES의 6502 CPU(2A03 칩의 핵심), 2KB 작업 RAM, 카트리지 프로그램 ROM이 표준 `Qwen3_5ForCausalLM` 체크포인트 안에서 돌아가요.

- 이 가중치는 아무도 학습시키지 않았어요. 컴파일러가 모든 값을 계산했어요.
- 게임을 실행하면 모델이 CPU 실행 로그를 토큰 하나씩 예측해요. 작은 호스트 프로그램이 화면 그리기, 컨트롤러 입력, vblank 인터럽트 같은 나머지 콘솔 역할을 해요.
- Divyansh Agrawal의 **Qwenputer**(CHIP-8, RISC-V CPU를 Qwen3.5-4B에 컴파일한 프로젝트)를 바탕으로 했고, 모델의 Gated DeltaNet 상태를 기계의 메모리로 쓰는 핵심 기법을 그대로 써요.
- 번들된 테스트 게임에서는 모든 프레임이 기존 6502 에뮬레이터 출력과 정확히 일치한다고 해요.

### 써 보기

- Python 3.11 이상이 필요하고 `numpy scipy numba pillow`를 설치해요.
- `python -m nesformer run roms/thwaite.nes --frames 600 --show`처럼 실행하면 터미널에 프레임을 그리고 끝나면 GIF를 저장해요.
- 매우 느려요. 첫 실행은 numba 컴파일에 약 20초가 걸리고, 이후 프레임당 1–6초라 600프레임(NES 시간 10초)에 약 25분이 걸려요.

### 다른 게임

iNES mapper 0(NROM 보드)을 쓰는 `.nes` 파일이면 Super Mario Bros., Donkey Kong, Excitebike 등도 돌릴 수 있어요. ROM은 사용자가 준비하고, 저장소에는 자유 라이선스 테스트 ROM 3개만 들어 있어요. `--buttons` 옵션으로 프레임 범위별 버튼 입력을 스크립트처럼 넣을 수 있어요.

### 명령

`run`(게임 실행·GIF 저장), `check`(참조 CPU와 나란히 돌려 첫 차이에서 멈춤), `trace`(토큰 스트림 출력), `build`(회로 컴파일, 약 10초), `info`(체크포인트 설명)가 있어요. 엔진은 `fast`(numba), `numpy`, `hf`(transformers, 초당 약 10토큰) 중에서 고를 수 있어요.
