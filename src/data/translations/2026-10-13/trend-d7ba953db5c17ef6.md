---
id: trend-d7ba953db5c17ef6
title: "Explore DNA with DeepMind’s AlphaGenome and in-browser MedGemma 1.5 4B via WebGPU"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x4ec7b/explore_dna_with_deepminds_alphagenome_and"
summary: "DNA 단일 염기 변이가 질병으로 이어지는 과정을 탐색하는 교육용 도구 AskCyph Health Explorer 소개 글이에요. 분자 예측은 DeepMind AlphaGenome API로, 설명은 브라우저에서 WebGPU로 도는 MedGemma 1.5 4B로 나눠 개인정보를 지키게 했어요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요. 의료 조언이 아니라 작성자가 밝힌 대로 교육용 도구 소개예요.

r/LocalLLaMA에 올라온 **AskCyph Health Explorer** 소개 글이에요. 단일 글자 DNA 변이가 어떻게 질병으로 이어지는지, 3D 해부 구조를 어떻게 바꾸는지, 유전 확률과 가능한 치료법은 무엇인지 탐색하는 교육용 도구예요. 상호작용을 살리면서 사용자 프라이버시를 지키려고, 작업을 두 모델에 나눴어요.

### 파이프라인
- **분자 영향 예측(AlphaGenome):** LLM이 코돈 메커니즘을 지어내게 하는 대신, Google DeepMind의 **AlphaGenome API**에 연결해 조절 변이 효과와 스플라이싱 붕괴를 예측해요. 예컨대 겸상적혈구증의 직접적인 코딩 변화와, RNA 스플라이싱을 망가뜨리는 비코딩 베타지중해빈혈 변이를 대비해 보여 줘요.
- **브라우저 안 개인 설명자(MedGemma 1.5 4B, WebGPU):** 모든 사용자 상호작용, 후속 채팅, 멀티모달 검사가 **ONNX Runtime Web**으로 로컬 하드웨어에서만 돌아요. 유전 위험을 묻거나 X-ray·조직학 도식을 올려도 프롬프트·이미지·채팅 토큰이 외부 서버로 가지 않아요.
- **결정론적 근거 주입:** 변이 정보, OMIM ID, 유전 방식, 약물 승인 정보는 NCBI ClinVar, openFDA, ClinicalTrials.gov에서 직접 가져와 MedGemma 프롬프트에 넣어요. 로컬 모델은 검증된 사실과 AlphaGenome 점수를 평이한 말로 종합하되 임상 세부를 지어내지 않게 했다고 해요.

### 기술 사양
- 모델: MedGemma 1.5 4B (INT4 ONNX, FP16/FP32 실행 폴백)
- 런타임: ONNX Runtime Web 위의 WebGPU
- 멀티모달: 비전 프로젝션 레이어가 기기에서 실행돼 업로드한 임상 도식을 살펴봐요.
- 저장: 압축 가중치 약 2.8GB를 로컬에 캐시해 다음부터는 바로 로드돼요.
- 로그인 없이 무료로 쓸 수 있어요.

작성자는 각자 기기에서 WebGPU 처리량이 얼마나 나오는지, 그리고 민감한 영역에서 특화 파운데이션 모델과 클라이언트 측 소형 모델(SLM)을 어떻게 조합하는지 듣고 싶다고 했어요.
