---
id: trend-f86f5cfff15130a9
title: "Worshipping at the altar of Brendan Gregg"
sourceUrl: https://fzakaria.com/2026/11/12/worshipping-at-the-altar-of-brendan-gregg
summary: "Farid Zakaria가 결정론적 VM Rewind에 크리티컬 패스 분석 명령 rewind time을 추가했어요. libuv 빌드·테스트 47.4초 경로 중 67%가 잠든 시간이었고, Brendan Gregg의 플레임 그래프·오프 CPU 분석에서 영감을 받았다고 해요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

### 들어가며
Farid Zakaria는 AI에 "조금 들떠 있다"고 인정하며, 결정론적 VM인 Rewind를 플레이키 빌드 버그 추적, 재현 가능한 PGO, Nix 빌드의 비트 단위 재현에 써 왔다고 해요. 그중 가장 재미있던 건 성능 분석이었고, 이번 글은 빌드의 크리티컬 패스를 다뤄요.

### 크리티컬 패스란
- 프로그램에서 서로 의존하는 작업의 가장 긴 사슬이에요. CPU를 아무리 늘려도 이보다 빨라질 수 없어서, 프로그램을 빠르게 하려면 이 경로를 줄여야 해요.
- 그는 Brendan Gregg가 성능 분석을 과학으로 만들었다며, 새 명령 `rewind time`을 그에게 바치는 작은 헌정이라고 소개해요. 녹화본을 분석해 시간이 어디에 쓰였는지, 무엇을 줄이면 더 빨리 끝나는지 알려 주고, 원인이 된 소스 줄까지 내려가 볼 수 있어요.

### libuv 예제
- libuv 빌드와 테스트는 Rewind 단일 CPU에서 78.0초, 크리티컬 패스는 47.4초였어요. 64코어여도 47초는 걸린다는 뜻이에요.
- 이 경로의 67%는 잠든 시간(`epoll_pwait` 23.1초, `clock_nanosleep` 8.53초, `futex` 100ms)이고 계산은 33%였어요. 그래서 CPU 프로파일은 거의 쓸모가 없어요.
- 단계별로는 checkPhase가 42.0초, configurePhase 3.54초, buildPhase 1.67초였어요. 프로세스 트리에서는 `make check`가 41.9초, 그 안의 테스트 러너 `lt-run-tests`가 36.4초였어요. 287개 테스트가 하나씩 차례로 돌며 대부분 타이머를 기다렸어요.

### 무엇을 줄이면 빨라지나
- "drag" 표는 항목이 0초가 되면 얼마나 빨라지는지 보여 줘요. 모든 `lt-run-tests`(600개 프로세스) 36.1초, 모든 `cc1`(283개) 6.66초, `hrtime` 테스트의 `clock_nanosleep` 75회 3.38초 등이에요.
- `rewind time --in hrtime`으로 들어가 보면 이 테스트는 100% 잠들어 있었어요. `rewind where`로 해당 단계에 가 보니 `uv_hrtime`이 sleep 동안 얼마나 흐르는지 확인하려고 일부러 45ms씩 자는 코드라 최적화할 게 없었어요. 재생이 결정론적이라 같은 지점에서 `rewind gdb`도 열 수 있어요.

### 도구와 연동
- Rewind 앱의 Time 탭은 Gregg의 오프 CPU 플레임 그래프처럼 계산은 따뜻한 색, 수면은 파란색으로 보여 주고, 클릭하면 그 시점의 로그·프로세스·소스로 이동하거나 gdb를 열어 줘요.
- 결과는 flamegraph.pl·speedscope용 folded stack이나 Perfetto 트레이스로 내보낼 수 있어요.

### 제단 앞에서
이 아이디어들은 Rewind보다 오래됐어요. Gregg는 10년 넘게 오프 CPU·웨이크업 플레임 그래프를 그려 왔고 Bazel 같은 빌드 시스템도 크리티컬 패스 분석을 제공해 왔어요. Rewind가 더하는 건 데이터예요. 재생을 위해 모든 컨텍스트 스위치를 이미 기록하고 이제 웨이크업과 그 원인도 남기므로, 미리 트레이싱을 준비하지 않아도 어떤 실행이든 나중에 정확히 분석할 수 있다고 해요.
