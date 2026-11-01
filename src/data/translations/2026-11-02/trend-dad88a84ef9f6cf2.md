---
id: trend-dad88a84ef9f6cf2
title: "Show GN: EBS Gurapinggala Teacher - 거짓말 에이전트"
sourceUrl: https://github.com/NomaDamas/EBS-Gurapingala-teacher
summary: "NomaDamas가 EBS '생각의 멸종'과 연계해 만든 수업 도구로, 교사가 준비한 거짓 주장 DB로 학생과 대화하는 챗봇과 Teacher Console이에요. 학생이 AI 답을 의심하고 근거를 확인하게 하고, 수업 뒤 정답을 함께 확인해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-02
---

GitHub README의 앞부분(약 4,000자, 성능·벤치마크 절까지)을 읽고 옮겼어요. 보안·비용·운영 절 이후는 반영하지 않았어요.

### 무엇인가

**EBS gurapinggala project**는 "EBS with ChatGPT — AI의 답을 의심하고 근거를 확인하는 수업 도구"예요. 선생님이 준비한 **거짓 주장**으로 학생이 챗봇과 대화하고, 수업 뒤 올바른 사실을 함께 확인해요. 도덕 수업용 NomaDamas × EBS 챗봇과 Teacher Console에 DB 업로드, API 키 등록, 수업 운영 기능을 담았어요. 서버·DB·AI 호출 없이 브라우저에서만 도는 합성 자료 데모도 있어요.

README에 따르면 EBS1 '생각의 멸종'은 **2026년 11월 2일(월) 밤 9시 55분** 첫 방송 예정이에요. 다만 이 도구 공개가 EBS나 OpenAI의 공식 배포·판매 허가를 뜻하지는 않는다고 밝혀요.

### 선생님 Quickstart

- 준비물은 GitHub·Cloudflare 계정과 수업 자료예요. **Cloudflare 무료 플랜**에서 시작할 수 있고, OpenAI 대화를 고를 때만 API 키가 필요해요(ChatGPT 구독과 API 요금은 별개).
- 배포 때 `TEACHER_TOKEN`(교사 비밀번호)과 `CLASS_CODE`(학생 참여 코드)는 16자 이상, `CREDENTIAL_ENCRYPTION_KEY`는 32자 이상의 서로 다른 무작위 값으로 정해요.
- `…workers.dev/teacher?room=class1`처럼 반을 나눠 같은 배포에서 운영해요. OpenAI 기본 한도는 **반별 하루 100시도**이고, 한도를 넘으면 매칭된 등록 원문으로 답해요.
- 학생은 코드와 수업용 이름·별명으로 참여하고, 교사는 학생별 대화와 등록한 정답·근거를 봐요. 수업은 즉시 중지 → 비공개 기록 다운로드 → 정정 수업 → 서버 이름·대화 삭제 순으로 마쳐요.

### 거짓말 DB

`물의 상태 | 물은 섭씨 50도에서 언다.`처럼 한 줄씩 적은 TXT·MD나 JSON을 올려요. **최대 500KB·500개**이고 저장하면 그 반의 DB를 바꿔요. JSON의 `correct_fact`, `correction_basis`에 정답과 근거를 넣으면 대시보드에서 함께 볼 수 있어요. OpenAI 모드도 등록한 주장 범위에서만 대화하고 **정답·정정 근거는 학생과 AI에 보내지 않아요.**

### 성능

로컬 합성 수업·원문 전달 모드 실측으로, 동시 학생 35명이 700회 요청했을 때 700/700 성공, p50 29.13ms, p95 41.1ms였대요. Cloudflare 원격 성능이나 실제 AI 응답 속도는 아니라고 밝혀요. 자동·통합·실제 Chrome 테스트는 268/268, 102/102, 32/32 통과예요.
