---
id: trend-e4ba2ea907e7057b
title: "I built an RK3588 NPU runtime without any proprietary inference libraries: Qwen3.5-4B at ~10 tok/s, ~2x faster than vendor SDK."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1xb45bq/i_built_an_rk3588_npu_runtime_without_any"
summary: "r/LocalLLaMA 사용자가 Rockchip 독점 라이브러리 없이 RK3588 NPU에서 LLM을 돌리는 오픈 추론 엔진을 만들었어요. Qwen3.5-4B 디코딩이 약 10 tok/s로 공식 RKLLM 1.3.1의 약 2배라고 해요."
translationStatus: partial
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

Reddit API 키가 없어 글 페이지를 직접 읽지 못했고, Wayback 스냅샷에도 본문이 없었어요. 수집 때 받은 RSS 본문(글 본문)을 기준으로 옮겼어요.

### 무엇을 만들었나
작성자(u/Flashy_Squirrel4745)는 Rockchip **RK3588 NPU**용 로컬 LLM 추론 엔진 `open_rknpu2_lm_infer`를 공개했어요. Rockchip의 독점 사용자 공간 추론 라이브러리 없이 돌아가요. 상위 부분은 **Rust**, NPU 연산자는 **C++**로 짰고, 블랙박스가 없어 호스트 추론 코드와 NPU 연산 실행을 직접 읽고 고칠 수 있다고 해요. 이제 이미지 입력과 선택형 MTP 추측 디코딩을 갖춘 Qwen3.5-4B를 지원해요.

### RKLLM 1.3.1과 비교(Qwen3.5-4B)
| 테스트 | RKLLM 1.3.1 | open_rknpu2_lm_infer(MTP1) |
|---|---|---|
| Prefill, 512토큰 | 58.35 tok/s | 147.83 tok/s |
| Prefill, 3,800토큰 | 54.03 tok/s | 139.92 tok/s |
| 512토큰 뒤 디코딩 | 5.54 tok/s | 10.61 tok/s |
| 3,800토큰 뒤 디코딩 | 4.57 tok/s | 9.90 tok/s |

### 현재 기능
- 터미널 채팅 또는 OpenAI 호환 API(스트리밍, 도구 호출, 접두사 캐싱)
- Qwen3.5-4B 이미지 입력
- 검증한 체크포인트: Qwen3-4B, Qwen3.5-4B, Granite-4.2-3B, MiniCPM5-2B
- 미리 빌드한 ARM64 Linux 바이너리와 양자화 모델 링크

### 예정 기능
DFlash·DSpark 추측 디코딩, 전문가 미리 가져오기를 쓰는 MiniCPM-V 4.7 35a3를 준비 중이래요. 작성자는 보드, 드라이버 버전, 모델, 속도를 공유해 달라고 부탁해요.
