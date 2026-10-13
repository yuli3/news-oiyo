# 회원·댓글·추천·커뮤니티 (2026-10-13, 2026-10-19 main 위에 다시 올림)

세운 결정(2026-10-13): 외부 서비스 대신 **직접 구축**. Cloudflare Pages Functions + D1.
비교 검토 문서: Claude Docs "News 회원·댓글·커뮤니티 기능 검토".

## 무엇이 있나

| 기능 | 화면 | 서버 |
|---|---|---|
| 로그인(Google·카카오·GitHub) | `/account/`, 헤더 "로그인" | `functions/api/auth/[provider]/{login,callback}.ts`, `auth/logout.ts` |
| 닉네임·로그아웃·탈퇴 | `/account/` | `functions/api/me.ts` |
| 댓글·답글(한 단계) | 날짜 페이지, 상세 페이지, 커뮤니티 글 | `functions/api/comments/*` |
| 댓글·글 추천 | 👍 버튼 | `.../vote.ts`, `server/community.ts` |
| 신고 → 3건이면 자동 숨김 | 신고 버튼 | `functions/api/reports.ts` |
| 커뮤니티 게시판(자유·질문·정보 공유) | `/community/`, `/community/post/?id=` | `functions/api/posts/*` |
| 신고 관리(숨김·복구·삭제·정지) | `/community/admin/` | `functions/api/admin/*` |
| 공유(기기 공유 시트·링크 복사·X·페이스북) | 날짜·상세 페이지 | 없음(정적) |

입력·스팸 규칙은 `server/rules.ts` 한 곳에 있다(`npm test`).

## 켜기 전에는 꺼져 있다

`/api/config`가 `enabled:false`면 화면은 지금처럼 giscus 토론을 보이고, 헤더의 커뮤니티·로그인 링크는 숨는다.
켜지는 조건은 셋 모두: D1 바인딩 `COMMUNITY_DB`, `SESSION_SECRET`, `COMMUNITY_ENABLED=1`.
켰다가 문제가 생기면 `COMMUNITY_ENABLED`만 지우면 바로 giscus로 돌아간다(데이터는 그대로).

## 켜는 순서 (세운 작업, Cloudflare 대시보드)

1. **D1**: `news-community`는 2026-10-13에 이미 만들었고 테이블 6개도 들어가 있다(2026-10-19 확인, 다시 만들지 않는다). 마이그레이션은 모두 `IF NOT EXISTS`라 다시 적용해도 안전하다. 새로 만들어야 하면 `npx wrangler d1 create news-community` → `npx wrangler d1 migrations apply news-community --remote`(로컬 `wrangler.toml`의 `migrations_dir = "migrations/community"`).
   커뮤니티 마이그레이션은 `migrations/community/`에 따로 둔다. `migrations/` 바로 아래는 메일링 리스트 DB(`news-mailing-list`, `wrangler.retention.jsonc`) 것이라 섞으면 메일링 DB에 커뮤니티 테이블이 들어간다.
   `wrangler.toml`은 커밋하지 않는다. 커밋하면 Pages 대시보드 설정 대신 그 파일이 쓰인다.
2. **Pages → news 프로젝트 → Settings → Bindings**: D1 `COMMUNITY_DB` = news-community (Production, Preview 둘 다). 메일링 리스트의 `MAILING_LIST_DB`와 다른 바인딩이다.
3. **Settings → Variables and Secrets**
   - `SESSION_SECRET`: 32자 이상 임의 문자열(비밀)
   - 로그인 제공자 중 쓸 것만: `GOOGLE_CLIENT_ID/SECRET`, `KAKAO_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`. 짝이 다 있는 제공자만 버튼이 나온다.
   - `ADMIN_ACCOUNTS`: `kakao:<카카오 회원번호>` 같은 형식, 쉼표로 여러 개. **처음 로그인할 때** admin이 된다(이미 가입한 계정은 D1에서 `UPDATE users SET role='admin'`).
   - (권장) `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`: 있으면 댓글·글 쓸 때 사람 확인을 한다.
   - 마지막에 `COMMUNITY_ENABLED=1`.
4. **로그인 앱 등록**(콜백 주소는 모두 `https://news.oiyo.net/api/auth/<제공자>/callback`)
   - Google Cloud Console → OAuth 클라이언트(웹). 범위는 `openid` 하나.
   - Kakao Developers → 앱 → 카카오 로그인 켜기, Redirect URI 등록, 클라이언트 시크릿 켜기. **동의 항목은 하나도 켜지 않는다**(회원번호만 쓰므로 비즈 앱 전환 불필요).
   - GitHub → Settings → Developer settings → OAuth Apps.
5. 재배포 후 `/account/`에서 로그인 → 댓글 → 추천 → 신고 → `/community/admin/` 순으로 확인.

## 개인정보·운영

- 저장: 제공자 회원번호, 닉네임, 쓴 글·댓글, 추천·신고 기록, 세션(토큰의 SHA-256만). 이메일·이름·사진은 받지 않는다.
- 탈퇴: 계정·세션·추천·신고 즉시 삭제, 글·댓글은 "탈퇴한 사용자"로 남는다(`/account/` 안내문과 같다).
- **켜기 전에 개인정보 처리방침(blog.oiyo.net/ko/privacy/)에 위 항목을 추가해야 한다.** 이 저장소에는 없다.
- 권리침해 신고(정보통신망법 임시조치)는 `/community/admin/`에서 숨김 처리 후 대응한다.
- 커뮤니티 페이지(`/community/*`, `/account/`)는 `noindex`라 광고가 붙지 않는다(사용자 글에 광고를 거는 위험을 피함). 날짜·상세 페이지의 광고는 그대로다.
- CSP는 아직 없다(`public/_headers` 주석 참고). 화면은 사용자 글을 `textContent`로만 넣고(`src/lib/community.ts` `el()`), 세션 쿠키는 `HttpOnly`라 스크립트가 읽지 못한다.

## 로컬에서 돌려 보기

```bash
npm run build
cat > wrangler.toml <<'T'
name = "news-local"
pages_build_output_dir = "dist"
compatibility_date = "2026-09-01"
[[d1_databases]]
binding = "COMMUNITY_DB"
database_name = "news-community"
database_id = "local"
migrations_dir = "migrations/community"
T
npx wrangler d1 migrations apply news-community --local
npx wrangler pages dev dist --binding COMMUNITY_ENABLED=1 --binding SESSION_SECRET=local-secret-local-secret-1234
```
