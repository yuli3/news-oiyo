---
id: trend-f86eb79a6b83086e
title: "protomaps/PMTiles"
sourceUrl: https://github.com/protomaps/PMTiles
summary: "PMTiles는 타일 데이터를 하나의 파일에 담는 아카이브 형식으로, S3 같은 일반 저장소에 올려 별도 타일 서버 없이 지도를 쓸 수 있게 해요. 지금 명세는 버전 3이고, 참조 구현은 BSD 3-Clause, 명세 자체는 퍼블릭 도메인 또는 CC0이에요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-19
---

protomaps/PMTiles 저장소 README를 끝까지 읽었어요. 스타 수는 이 수집본에 없어 적지 않았어요.

PMTiles는 타일 데이터를 담는 단일 파일 아카이브 형식이에요. 아카이브를 S3 같은 일반 저장소에 올려 두고, 맞춤 타일 백엔드나 제3자 제공자 없이 ‘서버리스’로 저비용·무유지 지도 앱을 만들 수 있다고 해요. 관련 글로 Protomaps 블로그 ‘Dynamic Maps, Static Storage’를 안내하고, 뷰어는 https://pmtiles.io/ 이며 로컬·원격 아카이브를 미리 볼 수 있어요. 클라우드 저장소의 아카이브는 출처 https://protomaps.github.io 에 CORS가 필요할 수 있다고 해요. 벡터 타일 예시는 미국 우편번호(ZCTA) 데이터이고, 데모는 MapLibre GL JS v1.15 이상이 필요하다고 해요. 같이 볼 자료로 Cloud Optimized GeoTIFF도 적혀 있어요.

만들기는 go-pmtiles 릴리스의 pmtiles 바이너리로, `pmtiles convert INPUT.mbtiles OUTPUT.pmtiles`와 S3 업로드 예가 나와 있고, 업로드에는 AWS 액세스 키 환경 변수가 필요하다고 해요. 소비 쪽으로는 자바스크립트(Leaflet, MapLibre GL JS, OpenLayers), Go(go-pmtiles), 파이썬 스크립트, AWS 람다와 클라우드플레어 워커용 서버리스 안내가 있어요. 지금 명세는 버전 3이에요.

레시피는 인구조사국 우편번호 셰이프파일을 GDAL/OGR로 GeoJSON으로 바꾼 뒤 tippecanoe로 zcta 레이어 PMTiles를 만드는 예이고, 업로드는 go-pmtiles나 RClone 예가 있어요. 참조 구현은 BSD 3-Clause License로 공개되고, 명세 자체는 퍼블릭 도메인이거나 해당되는 곳에서는 CC0이라고 해요.
