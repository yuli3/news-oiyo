---
id: trend-7f1d5f23a4d942f1
title: "facebookresearch/faiss"
sourceUrl: https://github.com/facebookresearch/faiss
summary: "Faiss는 Meta FAIR가 주로 개발하는 밀집 벡터 유사도 검색·클러스터링 라이브러리예요. RAM에 다 들어가지 않는 규모까지 다루고, C++로 작성돼 Python/numpy 래퍼와 CUDA·ROCm GPU 구현을 함께 제공해요. MIT 라이선스예요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-25
---

GitHub 저장소 README 전체를 읽고 옮겼어요.

### Faiss란

Faiss는 밀집 벡터(dense vector)의 효율적인 유사도 검색과 클러스터링을 위한 라이브러리예요. 크기와 상관없이 벡터 집합을 검색하는 알고리즘을 담고 있고, RAM에 다 들어가지 않을 수도 있는 규모까지 다뤄요. 평가와 파라미터 튜닝을 돕는 코드도 들어 있어요. C++로 작성됐고 Python/numpy용 래퍼를 완전하게 제공하며, 가장 유용한 알고리즘 일부는 GPU로 구현돼 있어요. 주로 Meta의 Fundamental AI Research 그룹이 개발해요. 최신 기능은 CHANGELOG.md에서 볼 수 있어요.

### 소개

- 인스턴스를 정수 ID가 붙은 벡터로 보고, L2(유클리드) 거리나 내적으로 비교해요. 코사인 유사도는 정규화한 벡터의 내적이라 함께 지원해요.
- 이진 벡터나 압축 양자화 코드 기반 방법은 원본 벡터 없이 압축 표현만 써요. 검색 정밀도는 다소 떨어지지만 서버 한 대 메모리에서 수십억 개 벡터까지 확장할 수 있어요.
- HNSW, NSG 같은 방법은 원본 벡터 위에 인덱스 구조를 얹어 검색을 빠르게 해요.
- GPU 인덱스는 CPU 인덱스를 그대로 대체할 수 있어요(예: `IndexFlatL2` → `GpuIndexFlatL2`). 메모리 복사는 자동으로 처리되지만 입출력이 GPU에 머물면 더 빨라요. 단일·다중 GPU를 모두 지원해요.

### 설치

Anaconda용 사전 빌드 패키지 faiss-cpu, faiss-gpu, faiss-gpu-cuvs가 있어요. 대부분 C++로 구현돼 필수 의존성은 BLAS 하나뿐이에요. GPU 지원은 CUDA나 AMD ROCm으로 선택할 수 있고, Python 인터페이스와 NVIDIA cuVS 백엔드도 선택 사항이에요. CMake로 빌드하며 자세한 내용은 INSTALL.md에 있어요.

### 동작 방식

Faiss는 벡터 집합을 저장하고 L2·내적으로 검색하는 인덱스 타입을 중심으로 만들어졌어요. 정확 검색 같은 단순 기준선도 있고, 대부분의 인덱스 구조는 검색 시간, 검색 품질, 벡터당 메모리, 학습 시간, 추가 시간, 비지도 학습용 외부 데이터 필요 여부 사이의 절충을 다르게 잡아요. README는 GPU 구현이 (2017년 3월 기준) 고차원 벡터의 정확·근사 최근접 이웃 검색, Lloyd k-means, 작은 k 선택에서 알려진 것 중 가장 빠를 것이라고 소개해요.

### 문서와 저자

- 위키에 튜토리얼·FAQ·문제 해결 섹션이 있고, doxygen 문서로 클래스별 설명을 볼 수 있어요. 논문 결과 재현은 benchmarks README를 보면 돼요.
- 주요 저자는 Hervé Jégou(프로젝트 시작, 첫 구현), Matthijs Douze(CPU 대부분), Jeff Johnson(GPU 전체), Lucas Hosseini(이진 인덱스·빌드 시스템), Chengqi Deng(NSG, NNdescent, 가산 양자화), Alexandr Guzhva(SIMD 등 최적화), Gergely Szilvasy(빌드·벤치마크 프레임워크)예요.
- 인용 논문은 "The Faiss library"(2024, arXiv:2401.08281)와 GPU 관련 "Billion-scale similarity search with GPUs"(IEEE Transactions on Big Data, 2019)예요.

### 커뮤니티와 라이선스

공개 토론은 GitHub Discussions, 버그 보고와 질문은 Issues 페이지를 쓰면 돼요. Faiss는 MIT 라이선스이고 저작권은 Meta Platforms, Inc.에 있어요.
