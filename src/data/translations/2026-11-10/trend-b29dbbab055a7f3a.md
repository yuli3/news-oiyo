---
id: trend-b29dbbab055a7f3a
title: "Best Practices for Provisioning Local Inference to a Team?"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xs0uxs/best_practices_for_provisioning_local_inference
summary: "r/LocalLLaMA 사용자가 회사용 Radiance 추론 서버를 만든 뒤 팀에 접근 권한을 나눠 주는 모범 사례를 물었어요. Tailscale로만 HTTPS 접근을 열고, 사용자별 Hermes 컨테이너에 공용 스킬 저장소를 붙이는 계획인데, Google 등 API 토큰 관리가 가장 고민이래요."
translationStatus: partial
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-10
---

Reddit은 수집 환경에서 막혔고(API 키 없음, Wayback 스냅샷 없음) RSS에 실린 게시글 본문만 읽었어요. 댓글은 보지 못해 `partial`이에요.

### 상황

작성자 /u/Anarchaotic은 최근 회사용 Radiance 추론 서버를 만들었고, 이제 팀원들에게 접근 권한을 나눠 주려고 해요.

### 현재 계획

- **접근 경로**: Tailscale을 서버에 HTTPS로 들어오는 유일한 길로 둬요.
- **하네스**: Hermes를 써요. 사용자마다 접근 제한이 걸린 자기 컨테이너를 갖지만, 중앙 스킬 저장소에는 모두 열려 있어요.
- **배치**: Hermes는 Framework Desktop에서 돌아가요. Radiance는 별도 서버에서 돌고, Framework를 통해서만 접근하게 설정했어요.

### 묻는 것

다른 사람들은 이걸 어떻게 성공적으로 해냈는지 물어요. 지금 가장 큰 숙제는 하네스(여기선 Hermes)를 팀 전체에서 쓰게 하면서, Google 같은 서비스의 API 토큰을 받아 오는 큰 골칫거리를 피하는 방법이라고 해요.

RSS 본문에는 질문만 있고, 커뮤니티의 답이나 결론은 담겨 있지 않아요.
