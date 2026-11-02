---
id: trend-2660bf0ef9de959c
title: "AUTOMATIC1111/stable-diffusion-webui"
sourceUrl: https://github.com/AUTOMATIC1111/stable-diffusion-webui
summary: "AUTOMATIC1111의 Stable Diffusion web UI는 Gradio로 만든 Stable Diffusion용 웹 인터페이스예요. txt2img·img2img, 인페인팅·아웃페인팅, 프롬프트 가중치, Textual Inversion, 얼굴 복원·업스케일러 등 기능을 한데 모았대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

GitHub 저장소 README 앞부분(약 9,000자)을 읽고 기능 목록 위주로 정리했어요. 설치 방법과 크레딧 등 뒷부분은 반영하지 못했어요.

### 어떤 프로젝트인가

**Stable Diffusion web UI**는 이미지 생성 모델 Stable Diffusion을 브라우저에서 쓰도록 만든 웹 인터페이스예요. **Gradio** 라이브러리로 구현됐어요. 오래된 프로젝트지만 다시 GitHub 트렌딩에 올라왔어요.

### 주요 기능

- 기본 **txt2img·img2img** 모드, 원클릭 설치·실행 스크립트(Python과 git은 따로 설치)
- **아웃페인팅·인페인팅**, 컬러 스케치, 프롬프트 매트릭스, SD 업스케일
- **어텐션 지정**: `((tuxedo))`나 `(tuxedo:1.21)`처럼 써서 특정 단어에 더 집중시키고, Ctrl/⌘+위·아래로 가중치를 조절해요.
- 루프백(img2img 반복), 파라미터를 바꿔 가며 비교하는 **X/Y/Z 플롯**
- **Textual Inversion**: 임베딩을 원하는 만큼, 원하는 이름으로 쓰고 8GB(6GB 보고도 있음)에서 학습할 수 있어요.
- Extras 탭: 얼굴 복원 GFPGAN·CodeFormer, 업스케일러 RealESRGAN·ESRGAN·SwinIR·Swin2SR·LDSR
- 샘플러 선택과 eta 등 노이즈 설정, 언제든 중단
- **4GB 그래픽카드 지원**(2GB 보고도 있음), 배치 시드 보정, 프롬프트 토큰 길이 실시간 확인
- 생성 파라미터를 PNG 청크나 JPEG EXIF에 저장하고, 이미지를 끌어다 놓으면 설정을 복원해요.
- 설정 페이지, UI 기본값 텍스트 설정, 타일링(텍스처처럼 이어지는 이미지), 진행률과 실시간 미리보기, 네거티브 프롬프트

UI에서 임의 Python 코드를 실행하는 기능은 `--allow-code` 옵션을 켜야만 동작해요.
