---
id: trend-51bbb13d95f8f59b
title: "nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB · Hugging Face"
sourceUrl: "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB"
summary: "NVIDIA가 24GB 메모리에 들어가는 비전-언어 모델 Nemotron 3.5 Bolt 74B-A9B를 공개했어요. 양자화 인식 학습을 거친 2비트 모델로 로컬 에이전트 작업을 겨냥하고, 256K 컨텍스트와 OpenMDW-1.1 라이선스예요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-16"
---

Hugging Face 모델 페이지가 채팅 템플릿 코드로 가득해서, 같은 저장소의 **README 원문**을 읽고 옮겼어요. 앞부분과 벤치마크, 용도까지만 읽었고 아키텍처·학습 세부와 기술 보고서는 읽지 않아 `partial`로 표시해요.

### 무엇인가
NVIDIA Nemotron 3.5 Bolt 74B-A9B 24GB는 일상적인 에이전트 작업을 로컬에서 돌리도록 만든 비전-언어 모델(VLM)이에요. 네이티브 2비트 양자화로 24GB 메모리에 들어가서 다른 앱과 함께 돌릴 수 있어요. GB당 지능과 속도를 최적화해, 비슷한 메모리를 쓰는 인기 dense 모델보다 빠르고 인기 MoE 모델보다 똑똑한 균형을 노린다고 해요. 상업·비상업 용도 모두 쓸 수 있어요.

### 요약 사양
- 파라미터: 총 74B(활성 9B)
- 구조: Mamba-2–Transformer 하이브리드 LatentMoE + C-RADIO v4-H 비전 인코더
- 정밀도: IQ2(양자화 인식 학습을 거친 2비트)
- 컨텍스트: 최대 256K 토큰
- 입출력: 텍스트·이미지·영상 입력, 텍스트 출력
- 배포: 24GB 패키지, NVIDIA Ampere(A100)·Hopper(H100-80GB)·Blackwell에서 vLLM
- 추측 디코딩: DFlash 기반 LiLiCorr 드래프터, 추측 토큰 7개
- 추론 모드: 채팅 템플릿의 `enable_thinking=True/False`
- 라이선스: OpenMDW-1.1
- 학습 기간: 2025년 12월–2026년 5월, 사후 학습 데이터 기준일 2026년 5월
- Hugging Face 공개일: 2026-10-15

### 벤치마크(Bolt IQ2 / Qwen3.6-35B-A3B BF16)
- Terminal-Bench 2.1: 50.98 / 44.38
- GDPVal-AA-V2: 28.47 / 25.75
- HLE(도구 없음): 25.30 / 19.56
- GPQA Diamond: 86.43 / 83.40
- BrowseComp: 66.75 / 48.74
- WebArena(vision): 50.86 / 36.60
- PinchBench: 87.82 / 88.07
- AA-Omniscience 정확도: 16.90 / 19.47(Gemma4 26B가 22.17로 최고)

비교 대상 대부분에서 가장 높지만 PinchBench와 AA-Omniscience 계열은 다른 모델이 앞서요. Qwen3.6의 MCP-Atlas는 공식 보고치가 62.8인데 NVIDIA가 공개 과제 500개로 재 보니 51.2였다고 각주를 달았어요.

### 용도
로컬 에이전트 하네스와 도구 호출, 웹 브라우징, 터미널 사용 같은 일반 에이전트 작업에 최적화했어요. 주 언어는 영어와 코딩 언어이고 스페인어·프랑스어·독일어·이탈리아어·일본어도 지원해요. README는 특정 vLLM nightly 이미지와 b12x 커널, 전용 reasoning parser를 쓰는 실행 명령을 함께 제공해요.
