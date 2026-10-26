---
id: trend-a4b8f7f3feec4318
title: "Have 8 GB of VRAM and 32 GB of RAM? You can run Qwen 3.8 Flash Next at up to 900 t/s PP and 30 t/s TG!"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xft2ae/have_8_gb_of_vram_and_32_gb_of_ram_you_can_run
summary: "r/LocalLLaMA 사용자가 RTX 5060 Laptop 8GB VRAM·32GB RAM에서 Strata로 Qwen 3.8 Flash Next Q2를 돌려 PP 최대 900 t/s·TG 30 t/s대 결과를 냈다고 공유했어요. --mmap-experts, --kv-resident 등 튜닝 팁을 적었어요. > Reddit이 자동 수집을 막아 RSS 본문(앞부분)을 기준으로 옮겼어요. Pastebin·GDrive 설정 파…"
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-27
---

### 주장하는 결과

작성자는 클릭베이트가 아니라며, Qwen 3.8 Flash Next Q2가 자신이 시험한 Qwen 3.6 35B A3B 파인튜이나 Qwen 3.8 27B보다 벤치·실사용이 나았고 더 빨랐대요.

### 사양

- GPU: RTX 5060 Laptop 8GB
- CPU: Ryzen 9 8945HX
- RAM: 32GB DDR5-5200
- SSD: 1TB, OS Linux

### Strata 튜닝 포인트

- `--mmap-experts`: 메모리에 안 들어가는 전문가를 SSD에
- `--kv-resident 20480`: KV를 VRAM·RAM에 나눔(최소값)
- `--vram-reserve-mib 500`(권장 900)
- `--pcie-frac 0.35` (캘리브레이션 권장)
- `STRATA_RESIDENT_HEADROOM_GIB=4`

가장 큰 이득은 vram-reserve와 headroom 조정이었대요. 양자화는 Gyro S를 썼고 MTP는 끄고 Vision은 CPU로 돌린대요. 컨텍스트 131K 이상에서는 `--parallel` 대신 `--conversation-cache`가 안전하대요.
