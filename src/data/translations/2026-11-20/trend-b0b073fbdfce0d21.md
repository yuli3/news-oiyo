---
id: trend-b0b073fbdfce0d21
title: "Do not buy RAM, compress"
sourceUrl: https://curiousbits.nl/blog/do-not-buy-ram-compress
summary: "RAM을 더 사는 대신 Linux의 zram으로 메모리를 압축하자는 글이에요. 32GB 머신에서 Firefox 탭을 잔뜩 열어 5.7G 데이터를 1.7G RAM에 담아 1:3.35 압축비를 확인했다고 해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-20
---

Therry van Neerven이 2026년 11월 19일 올린 글 전체를 읽고 옮겼어요.

### 왜 메모리 압축인가

AI 때문에 일하는 방식이 많이 바뀌었고, 병렬로 하는 일이 늘면서 워크스테이션의 메모리 수요도 커졌다고 해요. 메모리는 비싸고 증설이 안 되는 경우도 많아서 RAM을 더 사는 게 쉬운 선택이 아니에요. 글쓴이는 메모리가 부족해졌을 때 메모리를 압축하는 zram에서 해법을 찾았어요.

메모리 압축은 새 기술이 아니에요. Windows나 Mac을 쓴다면 이미 쓰고 있고, 많은 Android 스마트폰도 압축으로 RAM에 더 많은 데이터를 담아요. 다만 모든 Linux 환경이 기본으로 켜 두지는 않아요.

- Fedora, Pop!_OS: 기본으로 켜져 있어요.
- Ubuntu: 꺼져 있어요.
- Amazon Linux: 작은 가상 머신에서만 켜요.
- 그 밖의 대부분 배포판: 꺼져 있어요.

### 득과 실

CPU를 조금 더 쓰고 일부 프로세스에 지연이 생기지만, 글쓴이는 체감하기 어려운 수준이라고 봐요. 대신 얻는 용량이 크고, 1:4까지의 압축비도 드물지 않다고 해요. 예전에 SaaS를 만들 때 모놀리식 앱에 기능을 넣을 때마다 두 배 큰 머신이 필요했는데, CPU는 한가했으니 RAM 압축을 켰다면 증설을 피하고 클라우드 비용을 절반으로 줄일 수 있었을 거라고 회고해요.

### 실제로 해 보니

32GB 머신(일부는 그래픽용으로 예약)에서 뉴스·기술·쇼핑·영상·위키 등 수십 개 사이트를 Firefox 새 탭으로 1초 간격으로 여는 셸 루프를 돌렸어요. 실행 중인 앱만 보면 메모리에 다 들어갈 수 없는 양이었고, 일부 수요가 zram 스왑 공간으로 넘어갔어요. 터미널에서 확인한 결과는 이랬어요.

> 5.7G of data in 1.7G of RAM. That's a compression ratio of 1:3.35.

### 시작하려면

RAM 압축은 내 하드웨어뿐 아니라 클라우드 환경에서도 "적은 자원으로 더 많이" 하게 해 준다고 정리하고, 시작 방법은 Arch Linux 위키의 zram 문서를 추천해요.
