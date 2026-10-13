---
id: trend-7e7de6ec7c21e259
title: "Compressed a RoBERTa AI-text detector from ~500 MB to ~97 MB so it runs client-side in the browser, plus a 26 MB image detector [P]"
sourceUrl: "https://www.reddit.com/r/MachineLearning/comments/1x3vqip/compressed_a_roberta_aitext_detector_from_500_mb"
summary: "기존 오픈 AI 텍스트·이미지 탐지기를 압축해 업로드 없이 브라우저에서만 돌게 만든 tinydetect 프로젝트예요. RoBERTa 텍스트 탐지기를 약 500MB에서 97MB로 줄였고, 26MB 이미지 탐지기와 함께 ONNX Runtime Web으로 실행해요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요.

r/MachineLearning [P] 글이에요. 작성자는 아무것도 업로드할 필요 없는 AI 텍스트·이미지 탐지기를 원해서, 기존 오픈 탐지기 두 개를 **ONNX Runtime Web**으로 완전히 클라이언트에서 돌게 만들었어요. 데모는 tinydetect.ritabratamaiti.com, 코드와 스크립트는 GitHub(ritabratamaiti/tinydetect)에 있어요.

새 탐지기를 학습한 건 아니에요. 기반 모델은 **fakespot-ai/roberta-base-ai-text-detection-v1**(Apache-2.0)과 **Community Forensics**(commfor-model-384, MIT)이고, 작성자의 작업은 튜닝·압축·브라우저 런타임이에요.

### 텍스트 모델 (fp32 약 500MB → 97MB)
- HC3, GPT-wiki-intro, HAP-E, WildChat, Gutenberg, 그리고 Gemma-3-1B로 로컬 생성한 텍스트를 섞어 가볍게 미세조정했어요.
- 원본과 튜닝 가중치를 보간하는 **WiSE-FT**로 원본에서 너무 멀어지지 않게 했어요.
- 단어 임베딩 행렬은 ONNX 그래프에서 빼서 행별 fp16 스케일을 붙인 **int4**로 저장해요(약 19MB + 2MB). JS에서 역양자화해 트랜스포머 본체에 넘겨요.
- 트랜스포머 본체는 혼합 정밀도 양자화로 약 75MB예요.
- byte-level BPE 토크나이저와 Fakespot의 clean_text 전처리를 JS로 다시 구현했어요.

### 이미지 모델 (약 26MB)
보정된 출력 점수를 갖는 양자화된 Community Forensics ViT예요. 리사이즈, 중앙 크롭, 정규화가 모두 추론 전에 로컬에서 이뤄져요.

### 런타임
ONNX Runtime Web 1.30을 쓰고, GPU 어댑터가 있으면 WebGPU 빌드, 없으면 스레드 WASM으로 돌아요. 서비스 워커가 COOP/COEP 헤더를 붙여 GitHub Pages에서도 스레드 WASM이 동작하게 하고, 모델·런타임 파일을 캐시해요. 첫 검사 전 워밍업으로 GPU 셰이더를 컴파일하고, 그 뒤엔 작성자 노트북에서 약 100토큰 텍스트 검사가 60ms, 이미지는 200ms 정도 걸려요.

### 한계
점수가 높다고 누가 썼는지 증명되진 않아요. 짧거나 가벼운 글, 패러프레이즈, 많이 고친 글, 스크린샷, 크롭, 최신 생성기는 두 모델 모두의 정확도를 떨어뜨려요. 첫 로드는 다운로드가 커서 특히 폰에서 부담이에요. 후보 벤치마크, 튜닝, WiSE 알파 선택, 내보내기, 양자화 스윕, 평가까지 `training/`의 모든 과정은 노트북 한 대에서 돌아가요. 작성자는 양자화 선택과 각자의 글에서 어디서 실패하는지에 대한 피드백을 요청했어요.
