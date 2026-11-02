---
id: trend-0ae9e07bdeb97d85
title: "Google Cloud 장애로 은행 서비스 중단"
sourceUrl: "https://www.neowin.net/news/google-cloud-outage-takes-down-hsbc-revolut-bank-of-scotland-llyods-equifax-more"
summary: "Google Cloud europe-west2 리전의 전력 문제로 여러 서비스가 멈추면서 HSBC, Revolut, Lloyds 등 영국 금융 서비스가 중단됐어요. GeekNews는 HN 토론을 요약해 다중 영역 구성의 중요성을 짚었어요."
translationStatus: blocked
translatedBy: "Claude"
translatedAt: "2026-10-21"
---

원문(Neowin)이 403을 돌려줘 읽지 못했어요. GeekNews 소개 페이지에 정리된 Hacker News 의견을 기준으로 썼어요.

### 무슨 일이 있었나
원문 제목에 따르면 Google Cloud 장애로 HSBC, Revolut, Bank of Scotland, Lloyds, Equifax 등이 영향을 받았어요. HN 의견에 인용된 Google 상태 페이지에 따르면 2026년 10월 19일 23:08(PDT)부터 **europe-west2**의 여러 서비스에 장애가 있었어요. europe-west2-b 영역의 **전력 문제**는 해소됐고, 인프라 서비스가 차례로 복구될 예정이라고 안내됐어요.

### HN 토론 요지
- 결국 전력 장애로 한 영역이 내려간 것인데, 큰 기업들이 **다중 영역 구성**을 쓰지 않은 게 놀랍다는 의견이 있었어요.
- 클라우드 내부에 영역·리전 간 의존성이 있어 장애가 번지기도 하고, AWS us-east-1 장애가 전 세계로 번진 일도 있었다는 지적이 나왔어요.
- 백업처럼, **시험하지 않은 다중 영역 구성은 없는 것과 같다**는 말이 공감을 얻었어요.
- 영국·EU 사용자에게 PDT 기준 시간으로 안내하는 것이 불편하다는 의견도 있었어요.
- 국가별 데이터 위치 규제 때문에 분산한 자원이 가까운 곳에 몰리는 단점이 있다는 지적도 있었어요.
