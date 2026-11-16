---
id: trend-ca61dda03f8f9583
title: "axios/axios"
sourceUrl: https://github.com/axios/axios
summary: "브라우저와 Node.js에서 쓰는 Promise 기반 HTTP 클라이언트 axios 저장소예요. 요청·응답 가로채기, 데이터 변환, 요청 취소, JSON·폼 데이터 직렬화, CSRF 보호를 지원해요. README는 운영 환경에서 타임아웃과 응답 크기 상한을 꼭 설정하라고 당부해요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-17
---

GitHub 저장소 README를 읽고 정리했어요. README가 매우 길어 개요, 설치, 기본 사용법, 보안 공지까지 핵심을 옮겼고 세부 설정 옵션 목록은 생략했어요. README 상단의 후원사 광고(도박 사이트 포함)는 옮기지 않았어요.

### 무엇인가

**axios**는 **브라우저와 Node.js를 위한 Promise 기반 HTTP 클라이언트**예요.

### 주요 기능

- 브라우저에서는 XMLHttpRequest, Node.js에서는 http 요청을 만들어요.
- Promise API로 비동기 요청을 다뤄요.
- 요청·응답을 **가로채(interceptor)** 사용자 로직을 넣거나 데이터를 바꿀 수 있어요.
- 요청·응답 데이터 변환, 내장 **요청 취소** API를 지원해요.
- JSON 직렬화·파싱, 객체를 multipart/form-data나 x-www-form-urlencoded로 직렬화해요.
- 클라이언트 쪽 **CSRF 보호**를 제공해요.

### 설치와 임포트

- npm 등으로 설치한 뒤 `import axios from 'axios'`나 `require('axios')`로 불러와요. `require`를 쓰면 기본 내보내기만 쓸 수 있어요.
- 특수한 환경에선 `axios/dist/browser/axios.cjs`, `axios/dist/node/axios.cjs` 번들을 직접 불러올 수 있고, jsDelivr·unpkg CDN도 안내해요.

### 기본 사용법

- `await axios.get('/user?ID=12345')`처럼 쓰고, `params` 옵션을 쓰면 쿼리 문자열을 자동으로 만들어 줘 읽기 쉬워요.
- `Promise.all`로 여러 요청을 동시에 보낼 수 있어요.
- `axios.get/post/put/patch/delete/options` 같은 별칭 메서드와, 공통 설정을 담은 **인스턴스**(`axios.create`)를 만들 수 있어요.
- async/await는 ES2017 기능이라 IE 같은 옛 브라우저에선 주의하라고 해요.

### 운영 시 주의

- **타임아웃을 꼭 설정**하라고 해요. 없으면 멈춘 요청이 무기한 걸릴 수 있어요.
- **압축 폭탄 방어는 기본으로 꺼져 있어요.** `maxContentLength`, `maxBodyLength` 기본값이 -1(무제한)이라, 악의적이거나 침해된 서버가 작은 gzip·brotli·zstd 응답을 보내 기가바이트로 풀리게 하면 Node.js 프로세스가 고갈될 수 있어요. 신뢰하지 않는 서버를 부를 땐 예를 들어 `axios.defaults.maxBodyLength = 10 * 1024 * 1024`처럼 상한을 두라고 안내해요.
- README 상단에는 axios v0용 보안 업데이트 안내도 있어요.
