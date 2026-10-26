---
id: trend-69ae0db7137eeec7
title: "I built an engine that runs Qwen-Flash-Next at nearly 400t/s on cheap(ish) hardware. 3x V100 32GB in an old R740. Originally forked from strata but the engine guts all built for the old Volta generation."
sourceUrl: https://github.com/johnfink8/sfnx
summary: "sfnx는 중고 PCIe V100 세 장에 MoE LLM의 각 층을 나눠 올려, 작성자 기준 Qwen-Flash-Next에서 약 382 tok/s를 냈다는 CUDA 엔진이에요. 로컬 저가 하드웨어에서 Flash급 MoE 속도를 노린 프로젝트예요. ### 한 줄 요약"
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-10-27
---

sfnx는 중고 PCIe V100 세 장에 MoE LLM의 각 층을 나눠 올려, 작성자 기준 Qwen-Flash-Next에서 약 382 tok/s를 냈다는 CUDA 엔진이에요. 로컬 저가 하드웨어에서 Flash급 MoE 속도를 노린 프로젝트예요.

### 한 줄 요약

GitHub **johnfink8/sfnx**는 생산급 MoE LLM의 **레이어를 PCIe V100 GPU 세 장에 분할**해 돌리는 CUDA 엔진이에요. README는 중고 장비에서 **382 tok/s**를 기록했다고 소개해요.

### 맥락

같은 날 r/LocalLLaMA에는 Qwen 3.8 Flash Next를 Strata·저VRAM 환경에서 돌린 글이 여럿 올라왔어요. sfnx는 그중 **여러 장의 구형 데이터센터 GPU를 묶어** 토큰 생성 속도를 끌어올리려는 쪽에 가깝아요.

### README에서 확인한 것

- 대상: MoE LLM을 층 단위로 세 GPU에 나눔
- 인터페이스: CUDA 엔진
- 보고 수치: Qwen-Flash-Next 기준 약 **382 tok/s**(작성자 환경)
- 저장소에 빌드·실행 관련 파일이 포함돼 있어요.

빌드 의존성, 지원 양자화, 벤치 프롬프트 길이, 다른 모델 수치는 이 요약에 넣지 않았어요. 저장소 README와 코드를 직접 확인해 주세요. 투자나 특정 하드웨어 구매를 권하는 글이 아니에요.

### 한 줄로 다시

**I built an engine that runs Qwen-Flash-Next at nearly 400t/s on cheap(ish) hardware. 3x V100 32GB in an old R740. Originally forked from strata but the engine guts all built for the old Volta generation.**. sFNX Qwen3.8-Flash-Next at 382 tokens a second on a code edit, for $1,800 of used GPUs. Three Tesla V100-32GB cards at ~$600 each, on PCIe Gen3 with no NVLink. Six conversations at once, each holding the full 262,144-token context, served…

원문 링크는 `https://github.com/johnfink8/sfnx` 예요. 숫자·인용은 위에서 확인한 범위만 썼어요.
