# 메일링 테스트 모드 → 운영 전환 체크리스트

`MAILING_LIST_MODE=test`를 끄기 전에 위에서부터 차례로 확인한다. 근거 코드는 `functions/lib/pages-handler.mjs`, `production-mailer.mjs`, `workers/mailing-retention.mjs`, `wrangler.retention.jsonc`다.
**세운** 표시는 Cloudflare·Resend 대시보드, DNS, 시크릿을 다뤄야 해서 세운만 할 수 있는 단계다. 표시가 없으면 에이전트가 repo 안에서 할 수 있다.

## 1. 저장소·정리 작업

- [ ] **세운** 운영 D1 `news-mailing-list`에 `migrations/0001`~`0004`가 모두 적용됐는지 확인한다 (`wrangler d1 migrations list news-mailing-list --remote`). 출시 알림은 새 테이블이 필요 없다.
- [ ] **세운** Pages 프로젝트(news-oiyo)의 Functions 바인딩에 D1 `MAILING_LIST_DB` → `news-mailing-list`가 있다.
- [ ] **세운** 정리 작업 Worker를 이 PR 이후 코드로 배포한다: `npx wrangler deploy -c wrangler.retention.jsonc`. 크론 `17 * * * *`이 대시보드에 보이고, 로그에 `mailing_retention` 이벤트(`launchNotice` 건수 포함)가 한 시간마다 찍히는지 본다. 이 Worker가 없으면 7일·90일 삭제와 신년운세 신청 삭제(발송 뒤 / 2027-02-28)가 일어나지 않는다.

## 2. Pages 환경 변수·시크릿 (Production)

코드가 읽는 값 전부다. 시크릿은 "Encrypt"로 넣는다. 바꾼 뒤에는 새 배포가 있어야 반영된다.

| 이름 | 값 | 없으면 |
|---|---|---|
| `MAILING_LIST_SEND` | `1` | 확인 메일·소식·출시 알림 모두 안 나간다 (`mailer_unconfigured`) |
| `RESEND_API_KEY` (시크릿) | Resend API 키, 발송 권한만 | 발송 불가 |
| `MAILING_LIST_FROM` | 예: `OIYO News <news@news.oiyo.net>` — 아래 3에서 인증한 도메인 주소 | 발송 불가 |
| `MAILING_LIST_CONFIRM_SECRET` (시크릿) | 32자 이상 무작위 | 신청 거부 (`confirmation_unconfigured`) |
| `MAILING_LIST_RETENTION_REQUIRED` | `1` | 해지 기록 보존 강제가 꺼진다. 운영은 반드시 `1` |
| `MAILING_LIST_SUPPRESSION_SECRET` (시크릿) | 32자 이상 무작위. 한번 정하면 바꾸지 않는다(바꾸면 90일 재신청 차단이 풀린다) | `RETENTION_REQUIRED=1`이면 신청·주간·출시 알림 모두 막힌다 |
| `MAILING_LIST_ADMIN_KEY` (시크릿) | 32자 이상 무작위 | 주간 소식·출시 알림 관리 API가 401 |
| `MAILING_LIST_ORIGIN` | 비워 두면 `https://news.oiyo.net` | — |
| `MAILING_LIST_MODE` | 운영: 변수를 지우거나 `live` | `test`일 때만 테스트 모드다. **값이 없어도 운영 모드다** |
| `MAILING_LIST_TEST_RECIPIENT_HASH` | 테스트 모드에서만 쓴다. 운영 전환 뒤에는 지운다 | 운영 모드에서 남아 있으면 그 주소만 신청할 수 있다 |

- [ ] **세운** 위 값을 Production 환경에 넣는다 (`MAILING_LIST_MODE`는 아직 `test`로 둔다).
- [ ] **세운** 관리 키·Resend 키는 로컬 셸에만 두고 repo·채팅에 붙이지 않는다.

## 3. 보내는 도메인 (Resend)

코드는 `https://api.resend.com/emails`로만 보낸다 (`production-mailer.mjs`).

- [ ] **세운** Resend 대시보드 → Domains에 `MAILING_LIST_FROM`의 도메인을 추가하고, Resend가 보여 주는 레코드를 Cloudflare DNS에 그대로 넣는다. 정확한 값은 Resend 화면이 정본이다.
  - **SPF**: Resend가 주는 발송 하위 도메인(`send.<도메인>`)의 MX와 `v=spf1 include:amazonses.com ~all` TXT.
  - **DKIM**: `resend._domainkey.<도메인>` TXT(공개 키).
  - **DMARC**: `_dmarc.<도메인>` TXT. 최소 `v=DMARC1; p=none; rua=mailto:<받을 주소>`로 시작하고, 리포트가 깨끗하면 `quarantine`으로 올린다. Gmail·Yahoo 대량 발송 기준이 DMARC를 요구한다.
- [ ] **세운** Resend에서 도메인 상태가 Verified인지 확인한다. 프록시(주황 구름)는 끈 상태(DNS only)여야 한다.

## 4. 법정 표기 (정보통신망법 제50조)

- [x] 확인 메일은 광고가 아님을 밝힌다 (`mailing-list.mjs` TOPICS footer).
- [x] 주간 소식·출시 알림 본문에 보내는 이, 받는 사람별 수신 거부 링크가 있다 (`digest.mjs` `withUnsubscribe`).
- [x] 출시 알림 제목은 법정 표기 `(광고)`로 시작한다 (`launch-notice.mjs`).
- [ ] 주간 소식 제목은 아직 `[광고]`다. 법령 표기 `(광고)`에 맞출지 정하고, 맞추면 `digest.mjs`와 `mailing-list.test.mjs`를 같이 고친다.
- [ ] **세운** 본문의 문의 주소 `support@oiyo.net`이 실제로 받는지 확인한다.

## 5. 테스트 발송 (아직 `MAILING_LIST_MODE=test`)

- [ ] **세운** 테스트 수신자 주소의 해시를 `MAILING_LIST_TEST_RECIPIENT_HASH`에 넣는다 (`printf '%s' 'me@example.com' | shasum -a 256`, 주소는 소문자).
- [ ] **세운** 배포된 `/subscribe/`에서 그 주소로 신청 → 확인 메일 수신 → 링크로 확인 → 메일 속 수신 거부 링크로 해지까지 한 번 한다. 받은편지함(스팸함 아님), Gmail "원본 보기"에서 SPF·DKIM·DMARC가 모두 PASS인지 본다.
- [ ] 다른 주소로 신청하면 `test_only`로 거절되는지 본다.
- [ ] 주간 소식은 테스트 모드에서 발송이 꺼져 있다. 미리보기만 한다: `npm run mailing-list:digest`.
- [ ] 출시 알림 미리보기: `npm run mailing-list:launch-notice -- --launch-url=<출시 주소>`.
- [ ] **세운** (선택) 출시 알림 실발송 테스트는 테스트 수신자 한 명에게만 간다. 단, 첫 발송이 제목·본문·**출시 주소**를 고정하므로 반드시 실제 출시 주소로만 한다. 다른 주소로 테스트했다면 운영 발송 전에 D1에서 `mailing_issues`의 `launch/new-year-2027` 행을 지워야 한다.

## 6. 전환

- [ ] **세운** `MAILING_LIST_MODE`를 지우거나 `live`로, `MAILING_LIST_TEST_RECIPIENT_HASH`를 지우고 다시 배포한다.
- [ ] **세운** 다른 주소로 신청·확인이 되는지 한 번 본다.
- [ ] **세운** 주간 소식 첫 발송: `MAILING_LIST_SEND=1 MAILING_LIST_ADMIN_KEY=… npm run mailing-list:digest -- --send`. 출시 알림: `… npm run mailing-list:launch-notice -- --launch-url=<출시 주소> --send --confirm=new-year-2027`. 결과가 "재확인 대기"·"수동 검토"면 바로 다시 돌리지 않는다 (5분 임대, 23시간 뒤에는 자동 재발송 안 함).

## 7. 되돌리기

- [ ] **세운** 즉시 멈춤: Pages 환경 변수 `MAILING_LIST_SEND=0`(또는 `MAILING_LIST_MODE=test`) 후 재배포. 신청·발송이 모두 멈추고 저장된 동의는 그대로다.
- [ ] **세운** 키 유출 의심: Resend에서 API 키를 폐기·재발급하고 `MAILING_LIST_ADMIN_KEY`를 새로 만든다. `MAILING_LIST_SUPPRESSION_SECRET`은 바꾸지 않는다.
- [ ] 정리 작업 Worker는 멈추지 않는다. 멈추면 삭제 약속(7일·90일·2027-02-28)을 어기게 된다.
- [ ] 발송 결과가 불확실할 때는 다시 보내지 말고 Resend 로그와 D1 `mailing_deliveries`를 먼저 본다.
