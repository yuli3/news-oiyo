---
id: trend-edade9a42c62a4d2
title: "Tencent open-sourced Agent Memory and it runs 100% locally on SQLite"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x50rgo/tencent_opensourced_agent_memory_and_it_runs_100"
summary: "Tencent가 에이전트 메모리를 오픈소스로 공개했어요. SQLite 위에서 100% 로컬로 돌고 별도 벡터 DB가 없으며, 토큰 사용 약 61% 감소, PersonaMem 정확도 48%→76%를 보고했대요. 메모리가 원래 대화 기록으로 추적 가능하다는 점도 강조해요."
translationStatus: partial
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-14"
---
Reddit이 403을 돌려줘 RSS로 읽었어요. 이 글은 r/AI_Agents 게시물을 링크한 크로스포스트라, 작성자가 댓글로 단 요약과 다른 댓글을 기준으로 옮겼어요. GitHub 저장소(TencentCloud/TencentDB-Agent-Memory)는 직접 읽지 않았어요.

### 핵심 내용(작성자 요약 댓글 기준)
u/AdamDhahabi가 정리한 특징은 이래요.
- **100% 로컬, SQLite 기반**: 클라우드 API도, 따로 띄울 벡터 데이터베이스도 없어요.
- 토큰을 약 **61% 덜** 쓴다고 보고했어요.
- **PersonaMem** 정확도가 **48%에서 76%**로 올랐대요.
- 메모리를 사람이 읽을 수 있고 추적할 수 있어서, 에이전트가 불투명한 임베딩 대신 원래 대화 기록을 가리킬 수 있어요.

### 댓글 반응
- pi.dev 같은 하네스와 통합하기 어렵냐는 질문에, 에이전트에 bash 권한을 주고 "TODO, STATE, GOAL을 sqlite3로 관리하라"는 지시를 프롬프트나 스킬 파일에 넣으면 된다는 답이 달렸어요. SQLite도 좋지만 grep·tail을 쓰는 텍스트 파일도 괜찮다는 의견이었어요.
- 다른 사용자는 링크가 왜 없냐며 저장소 주소를 붙이고, 최근 자기가 만든 것과 비슷하다고 했어요.
