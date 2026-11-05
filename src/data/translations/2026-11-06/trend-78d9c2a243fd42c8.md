---
id: trend-78d9c2a243fd42c8
title: "GPT‑6 Cyber: Advancing the frontier of aligned cybersecurity agents"
sourceUrl: https://openai.com/index/introducing-gpt-6-cyber
summary: "OpenAI가 보안 연구용 모델 GPT-6 Cyber를 공개했어요. ExploitGym 점수가 48.5%로 GPT-5.6 Cyber 대비 51% 올랐고, 허용 범위 밖 서비스를 공격하지 않는 비율은 99.93~100%였어요. Linux 권한 상승 익스플로잇 948건도 만들었대요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

OpenAI 발표문(2026-11-05)의 앞부분(성과와 Daybreak 확대 계획 첫 문단)까지 읽고 옮겼어요(**partial**). 시스템 카드와 뒷부분 세부 절은 이번 번역에 넣지 않았어요.

### 발표 요지
OpenAI는 보안 연구에서 큰 도약이라며 **GPT-6 Cyber**를 소개했어요. 취약점을 찾고 고치는 능력이 더 좋아졌고, 연구자가 정한 경계 안에 머무는 신뢰도도 크게 높아졌다고 해요. 연구자가 정한 범위 안에서 공격 가능한 취약점을 찾아 검증하도록 학습한 모델이에요.

### 수치
- **ExploitGym**(지정된 취약점을 실제로 익스플로잇할 수 있는지 시험): GPT-6 Cyber 48.5%, GPT-5.6 Cyber 32.1%. 상대적으로 51% 향상이에요.
- **범위 준수 정렬 평가**: 배포용 프롬프트 없이도 99.93%의 테스트에서 범위 밖 서비스를 공격하지 않았고, 프롬프트가 있으면 100%였어요. 승인된 범위 안에 머물고, 제한을 지키고, 결과를 정확히 보고하도록 전용 학습을 한 결과래요.

### 실제 성과
- Linux에서 **권한 상승 익스플로잇 948건**을 만들었어요.
- Firefox에서 그동안 프런티어 모델로 많이 시험했는데도 **알려지지 않은 고위험 취약점 81건**을 찾았고, 후보 패치 개발도 도왔어요. Mozilla는 이 중 상당수를 고쳐 배포했어요.
- Cisco, Calif, CodeRabbit 보안팀이 취약점 연구와 코드 리뷰에 쓰고 있고, OpenAI도 자사 인프라의 약점을 찾고 고치는 데 써 왔대요.

### Daybreak 확대
OpenAI는 프런티어 모델로 소프트웨어를 지킬 수 있는 시간이 한정돼 있다고 보고, **Daybreak** 프로그램을 규모와 관계없는 조직, 독립 연구자, 오픈소스 메인테이너까지 크게 넓히겠다고 했어요.
- GPT-6 Astra 같은 주력 모델은 이미 코드 리뷰, 취약점 분류, 패치 개발을 지원해요.
- **Daybreak Blue**는 검증된 방어자가 불필요한 거절 없이 취약점과 수정 사항을 검증하도록 돕고,
- **Daybreak Red**는 더 깊은 익스플로잇 개발을 가능하게 해요.
