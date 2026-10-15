---
id: trend-2ceffb4fa50f23e5
title: "137B A6.8B model from Microsoft?"
sourceUrl: "https://github.com/ggml-org/llama.cpp/pull/29778"
summary: "llama.cpp에 'maion-coder' 아키텍처 지원 PR(#29778)이 병합됐어요. LocalLLaMA에서는 이것이 Microsoft AI의 로컬 코딩 모델 MAI Code 1.1 Flash(총 137B·활성 6.8B MoE)용이라는 점이 화제가 됐어요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

GitHub PR 원문과 댓글을 직접 읽고 옮겼어요(PR 본문은 짧아요). Reddit 글은 403이라 RSS 본문만 확인했어요.

### Reddit에서 화제가 된 이유
u/jacek2023는 Microsoft 커맨드라인 블로그 글을 인용하며 "Microsoft AI가 MAI Code 1.1 Flash의 로컬 버전을 개발했다. 총 1,370억 개, 활성 68억 개 파라미터의 코딩 최적화 MoE 모델"이라고 소개했어요. 그리고 이 llama.cpp PR을 연결했어요.

### PR #29778: Add Support to maion-coder arch
- 작성자: mailkv23, 2026-10-01 생성, 상태 **MERGED**, +211/−4줄
- `general.architecture = maion-coder`인 **Maion-Coder** 아키텍처를 네이티브로 지원해요.

변경 내용:
- `src/models/maion-coder.cpp`, `models.h`: 새 `llama_model_maion_coder`(하이퍼파라미터, 텐서, 그래프). MoE step, latent 크기, 전문가 수, 슬라이딩 윈도, 층별 SWA 패턴이 없으면 로드 초기에 실패해요.
- `src/llama-arch.{h,cpp}`, `src/llama-model.cpp`: `LLM_ARCH_MAION_CODER` 등록, NEOX rope 타입.
- `gguf-py/gguf/constants.py`: 아키텍처 enum, 이름, 텐서 목록.
- `src/llama-model-saver.cpp`: `expert_feed_forward_length`를 층별 배열로 쓰고 `moe_latent_size` 추가.
- `tests/test-llama-archs.cpp`: dense+MoE 층 × SWA+전체 어텐션, GQA, 균일하지 않은 전문가 FFN 크기를 덮는 4층 테스트 설정.

AI 사용 공개 항목에는 "평가 실행과 통합 빌드 실패 수정에 사용"이라고 적혀 있어요.

### 댓글 흐름
- 리뷰어 CISC가 "변환 코드(HF → GGUF)는 어디 있나요?"라고 물었어요.
- 작성자는 Azure ML 레지스트리의 `MAI-Code-1.1-Flash-On-Device` 자산을 받는 PowerShell 스크립트를 안내했어요.
- 10월 13일에는 microsoft/vscode의 "agentHost: run on-device models with llama.cpp" PR이 이 PR을 언급했어요.
- 병합 뒤 ggerganov가 master의 일부 테스트가 이 모델에서 실패한다며 확인을 요청했어요.
