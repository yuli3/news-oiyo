---
id: trend-918f40bdbd3c9dc5
title: "Jepsen: ParticleDB 1.1.4"
sourceUrl: https://jepsen.io/analyses/particledb-1.1.4
summary: "Jepsen이 AI 워크로드용 Rust 데이터베이스 ParticleDB 1.1.4~1.1.18.11.rc-22를 시험해 96개 문제를 찾았어요. 대부분 고쳐졌지만 기본 occ 모드에서 커밋된 쓰기 유실, serializable에서 Lost Update가 남았어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-01
---

Jepsen 보고서(Kyle Kingsbury, 2026-10-31)의 요약과 배경, 안전성 주장 부분까지 읽고 옮겼어요. 테스트 결과 세부 장은 읽지 못했어요.

### 요약

ParticleDB는 AI 워크로드용 멀티모델 데이터베이스예요. Jepsen은 1.1.4부터 1.1.18.11.rc-22까지 시험했고, "Full ACID"라는 주장이 **다소 이르다**고 결론 내렸어요.

- 문제는 **96개**예요. 충돌, 교착, 데이터 유실 같은 평범한 것부터 지울 수 없는 반쯤 보이지 않는 행, `WHERE 4 = 5`, 삭제한 테이블이 일그러진 모양으로 다시 나타남, 열 혼동, 문자열이 정수로 바뀜 같은 기묘한 것까지 있어요.
- 대부분 **서버 하나, 클라이언트 하나, 장애 주입 없이** 재현됐어요.
- 1.1.18.11.rc-22에서는 10개를 빼고 해결된 것으로 보였어요. 그래도 기본 `occ` 트랜잭션 모드에서 정상 운영 중 **커밋된 쓰기를 잃었고**, 가장 강한 `serializable`에서도 내부 이상 현상과 **Lost Update**가 나왔어요.
- 제조사 Orkes는 이후 1.1.19-rc.13을 내고 남은 문제를 모두 해결했다고 주장해요. 이 연구는 Orkes가 비용을 댔고 Jepsen 윤리 정책에 따라 진행됐어요.

### 배경

ParticleDB는 트랜잭션 SQL, 키-값 저장소, 벡터 검색, 실시간 분석, "Particles"라는 사용자 정의 함수를 한 엔진에 묶어요. Postgres·Redis 프로토콜과 자체 gRPC·HTTP2 API로 접속할 수 있고, Rust로 처음부터 짰으며 Postgres보다 몇 자릿수 빠르면서 같은 안전성을 지킨다고 주장해요.

Orkes는 워크플로 오케스트레이션 플랫폼 Conductor를 위해 이 DB를 만들었어요. 1.0.0은 Conductor 쿼리용 제한 기능만 있었고, 넓은 출시를 앞두고 대대적으로 리팩터링한 버전을 particledb.ai에 소프트 런칭했어요. Raft 복제는 엔터프라이즈 클라우드에서만 제공돼 이번 보고서는 **단일 노드**만 다뤄요.

### 안전성 주장에 대한 지적

- 홈페이지는 TLA+로 "형식 증명됐다"고 했지만 협업 기간 동안 TLA+ 명세는 없었어요.
- WAL 동기화는 `sync`(커밋마다 fsync), `groupsync`(묶어서 fsync), `nosync`(fsync 안 함) 세 가지예요. 문서는 `sync`가 더 강하다고 했지만 `--help`와 내부 운영 가이드는 `groupsync`도 같은 내구성이라고 해 서로 어긋났어요.
- 홈페이지는 "Full ACID. 159K TPS."라고 했지만 바로 아래에 완전 격리가 아닌 "snapshot isolation"이라고 적혀 있었어요.
- `SET TRANSACTION ISOLATION LEVEL`은 무시되거나 거부됐고, 격리는 시작할 때 주는 `--txn-mode`(`fast`, `occ`(기본), `zero-copy-occ`, `table-2pl`)로 정해졌어요. Jepsen은 문서가 각 모드가 무엇을 보장하는지 설명하지 않아 해석하기 어려웠다고 적어요.
