---
id: trend-4d3f1c71fd6dd98c
title: "Bitcoin's quantum security challenge extends to bridges, custodians and millions of coins"
sourceUrl: https://www.coindesk.com/tech/2026/11/22/bitcoin-s-quantum-security-challenge-extends-to-bridges-custodians-and-millions-of-coins
summary: "양자컴퓨터가 아직 비트코인 보안을 깨지는 못하지만, 600만 BTC 이상이 공개키가 노출된 주소에 있고 거래소·수탁사·브리지까지 업그레이드해야 해 '이전(migration)'이 진짜 시한이라는 CoinDesk 기사예요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-23
---

CoinDesk 기사 본문 전체를 읽고 정리했어요. 수집 스크립트는 429(요청 과다)로 막혔고 보관본도 없어서, 읽기 전용 웹 fetch로 전문을 읽었어요. 글쓴이는 Olivier Acuna예요.

### 문제의 핵심

비트코인의 양자 위협은 더 강한 암호만으로 풀리지 않아요. 보유자는 수백만 개의 코인을 양자 내성 보안으로 옮겨야 하고, 그 코인을 다루는 거래소·수탁사·브리지도 자기 시스템을 바꿔야 해요. 다른 체인은 이미 움직였어요. NEAR는 7월 양자 이후(post-quantum) 서명을 넣었고, Algorand는 8월 Falcon-1024 계정을 도입했어요.

Cysic CEO Leo Fan은 "중요한 시계는 이전(migration)"이라고 말해요. 양자컴퓨터가 서명을 깨기 훨씬 전에 자금을 옮겨야 할 수 있고, 휴면 코인은 노출된 채 남을 수 있다는 거예요.

### 노출된 공개키

- Glassnode에 따르면 10월 기준 600만 BTC 이상, 유통량의 31.2%가 이미 온체인에 공개키가 드러난 주소에 있어요. 지금은 안전하지만, 충분히 강한 양자컴퓨터가 나오면 이 공개키로 자금을 가져갈 수 있어요. 기사는 이 수치가 분실·휴면 코인 수를 뜻하지는 않는다고 덧붙여요.
- 4월 Jameson Lopp 등 6명은 취약한 서명 방식을 단계적으로 없애고 업그레이드하지 않은 지갑의 거래를 결국 제한하는 BIP 361을 제안했어요. Lopp은 휴면 코인이 도난당하는 것보다 동결이 낫다고 봐요.
- Blockstream CEO Adam Back은 자발적 업그레이드를 선호하고 정해진 동결로 강제 이전시키는 데 반대해요.
- BIP 361과 새 출력 유형을 제안한 BIP 360 모두 아직 초안이에요. Fan은 움직이지 않는 코인은 "기술 문제가 아니라 사회 문제"라며, 옛 경로를 영원히 열어 두면 공격자가 쓸 거라고 경고해요.

### 수탁과 브리지

- 수탁사는 여러 당사자가 승인하는 구조를 쓰는데, Fan에 따르면 단일 서명자용 양자 이후 서명은 표준화됐지만 임계값·멀티시그 버전은 아직 연구 단계예요. NIST는 1월 다자간 임계값 암호 제안을 공모했어요.
- 5월 BitGo와 Silence Laboratories가 MPC로 양자 이후 거래를 시뮬레이션했지만 실제 배포는 발표하지 않았어요.
- 비트코인 사이드체인 Rootstock은 2028년 양자 내성 서명 계획과 브리지 PowPeg 변경안을 내놨지만, 아직 제안이고 비트코인 프로토콜 자체를 바꿀 수는 없어요.

기사는 이전하지 못하거나 하지 않는 보유자가 결국 코인 이동 제한을 받거나 미래 공격에 노출될 수 있다고 정리해요.

이 글은 정보 제공용이며 투자 권유가 아니에요. 투자 판단과 책임은 본인에게 있어요. 수치는 지연·종가 기준이며 정확성을 보장하지 않아요.
