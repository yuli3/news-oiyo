---
id: trend-31b9fb90a106d4b9
title: "microsoft/qlib"
sourceUrl: "https://github.com/microsoft/qlib"
summary: "Qlib은 아이디어 탐색부터 운영까지 퀀트 리서치에 AI를 쓰도록 돕는 마이크로소프트의 MIT 오픈소스 플랫폼이에요. 지도학습·시장 동학 모델링·강화학습을 지원하고 LightGBM부터 Transformer까지 모델 동물원을 갖췄어요. 최근 소스엔 아티팩트 로딩을 제한하는 호환성 깨지는 보안 기본값이 들어갔어요."
translationStatus: partial
translatedBy: "Grok Bot"
translatedAt: "2026-10-19"
---

GitHub README(약 44KB) 중 소개, 보안 변경 공지, 프레임워크, 빠른 시작, 데이터 준비, 모델·데이터셋 목록, 학습 프레임워크, 라이선스 부분을 읽고 정리했어요. Docker, 자동 리서치 워크플로 상세, 시장 동학·강화학습 세부, 오프라인·온라인 모드, 데이터 서버 성능 부분은 자세히 읽지 않아 partial로 표시해요. 저장소 정보(GitHub API, 2026-10-19 조회): 스타 약 4만9,480개, 포크 7,825개, Python, MIT. **정보 제공용이며 투자 권유가 아니에요.**

### 한 줄 요약
아이디어 탐색부터 실제 운영까지 퀀트 투자 리서치에 AI를 쓰도록 돕는 플랫폼이에요. 지도학습, 시장 동학 모델링, 강화학습 같은 여러 ML 패러다임을 지원하고, 마이크로소프트의 RD-Agent와 연결해 R&D 과정을 자동화할 수 있다고 소개해요.

### 먼저 알아둘 변경
아직 태그 릴리스에 들어가지 않은 **호환성 깨지는 보안 기본값**이 소스 빌드에 들어갔어요. 저장된 모델·데이터셋을 다시 불러오거나 온라인·지연 학습을 재개하거나 DDG-DA를 쓰려면, 아티팩트 작성자와 저장소 권한을 확인한 뒤 `trusted=True`(CLI `--trusted=True`)로 명시해야 해요. 메모리 안 새 학습과 지원되는 데이터 읽기는 필요 없어요. 설정 기반 워크플로도 로컬 `.py` 임포트별 `trusted: true`, 제한된 표현식 등 이전 가이드가 따로 있어요.

### 구조
구성 요소는 느슨하게 결합돼 각각 따로 쓸 수 있어요: 데이터 → 학습 프레임워크(지도·강화학습, 시장 동학) → 트레이딩 전략과 실행기(여러 단계로 중첩 최적화 가능) → 분석 리포트 → 저비용 온라인 서빙.

### 빠른 시작
- pip(`pyqlib`)이나 소스로 설치하고, `qrun`으로 설정 파일 기반 워크플로(예: LightGBM)를 돌려요.
- **공식 데이터셋은 강화된 데이터 보안 정책 때문에 일시 중단**됐고, 커뮤니티가 제공하는 chenditc/investment_data 릴리스를 대신 쓰라고 안내해요.

### 모델·데이터셋 동물원
| 분류 | 예시 |
|---|---|
| 트리 계열 | XGBoost, LightGBM, CatBoost, DoubleEnsemble |
| 신경망 | MLP, LSTM, GRU, ALSTM, GATs, SFM, TCN, TabNet |
| 어텐션·트랜스포머 | Transformer, Localformer, TFT, TRA |
| 기타 연구 모델 | TCTS, ADARNN, ADD, IGMTF, HIST, KRNN, Sandwich |
| 데이터셋 | Alpha158, Alpha360(미국·중국 시장) |

모델은 `qrun`, `workflow_by_code` 스크립트, `run_all_model.py` 세 가지 방식으로 실행할 수 있고, Alpha158·Alpha360 성능표는 benchmarks 폴더에 있어요.
