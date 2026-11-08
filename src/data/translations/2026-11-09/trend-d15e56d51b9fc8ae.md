---
id: trend-d15e56d51b9fc8ae
title: "neuml/txtai"
sourceUrl: https://github.com/neuml/txtai
summary: "txtai는 시맨틱 검색, LLM 오케스트레이션, 언어 모델 워크플로를 위한 올인원 AI 프레임워크예요. 벡터 인덱스·그래프·관계형 DB를 합친 임베딩 데이터베이스가 핵심이고 RAG와 에이전트를 만들 수 있어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-09
---

GitHub README의 앞부분(소개와 기능 요약)을 읽고 옮겼어요.

### 무엇인가
txtai는 시맨틱 검색, LLM 오케스트레이션, 언어 모델 워크플로를 위한 올인원 AI 프레임워크예요. 핵심 구성 요소는 임베딩 데이터베이스로, 희소·밀집 벡터 인덱스, 그래프 네트워크, 관계형 데이터베이스를 합친 것이에요. 이 기반 위에서 벡터 검색을 하거나 LLM 애플리케이션의 지식 원천으로 쓸 수 있고, 자율 에이전트, 검색 증강 생성(RAG), 멀티 모델 워크플로 등을 만들 수 있어요.

### 기능 요약
- SQL, 객체 저장소, 토픽 모델링, 그래프 분석, 멀티모달 인덱싱을 곁들인 벡터 검색이에요.
- 텍스트, 문서, 오디오, 이미지, 비디오의 임베딩을 만들어요.
- 언어 모델 기반 파이프라인으로 LLM 프롬프트, 질의응답, 라벨링, 전사, 번역, 요약 등을 실행해요.
- 워크플로로 파이프라인을 묶고 비즈니스 로직을 모아요. 단순 마이크로서비스부터 멀티 모델 워크플로까지 가능해요.
- 에이전트가 임베딩, 파이프라인, 워크플로, 다른 에이전트를 지능적으로 연결해 복잡한 문제를 자율적으로 풀어요.
- 웹 API와 MCP(Model Context Protocol) API를 제공하고 JavaScript, Java, Rust, Go 바인딩이 있어요.
- 기본값이 갖춰져 있어 빨리 시작할 수 있고, 로컬 실행이나 컨테이너 오케스트레이션으로 확장할 수 있어요.

### 기술 스택
Python 3.11+, Hugging Face Transformers, Sentence Transformers, FastAPI로 만들었고 Apache 2.0 라이선스의 오픈소스예요. 개발사는 NeuML이에요. README 뒷부분(설치, 예제)은 읽은 범위 밖이에요.
