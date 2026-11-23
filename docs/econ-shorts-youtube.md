# 경제 속보 쇼츠 → 유튜브 직접 업로드 설정 (2026-11-23)

매일 08:20 KST GitHub Actions(`.github/workflows/econ-shorts.yml`)가 영상을 만들고 `scripts/upload-econ-short.mjs`로
유튜브 「OIYO 경제 속보」 채널에 올린다. Buffer 무료 3채널(OIYO YT·IG·X)은 그대로 둔다.

전부 브라우저에서 한다(터미널 없음). 비밀값은 채팅에 붙이지 말고 GitHub 비밀값 화면에만 넣는다.

## 1. 채널 만들기
브랜드 계정으로 「OIYO 경제 속보」 채널 생성, 아동용 아님. 키트: 프로젝트 파일 `econ-shorts-2026-11-23/channel/`.

## 2. 구글 클라우드 (약 10분)
1. https://console.cloud.google.com/projectcreate → 프로젝트 이름 `oiyo-econ-shorts`
2. API 및 서비스 → 라이브러리 → **YouTube Data API v3** → 사용
3. OAuth 동의 화면(Google 인증 플랫폼) → 외부(External) → 앱 이름 `OIYO 경제 속보 업로더`, 지원 이메일 본인
   - 범위(Scopes): `.../auth/youtube.upload`, `.../auth/youtube.readonly`
   - **게시 상태를 '프로덕션(In production)'으로 바꾼다.** '테스트'로 두면 토큰이 7일 뒤 만료돼 업로드가 멈춘다. 인증(verification)은 받지 않아도 된다.
4. 사용자 인증 정보 → 사용자 인증 정보 만들기 → OAuth 클라이언트 ID → 유형 **웹 애플리케이션**
   - 승인된 리디렉션 URI: `https://developers.google.com/oauthplayground`
   - 만들어진 **클라이언트 ID**와 **클라이언트 보안 비밀번호**를 메모

## 3. 갱신 토큰 받기 (OAuth Playground)
1. https://developers.google.com/oauthplayground → 오른쪽 위 톱니바퀴 → **Use your own OAuth credentials** 체크 → ID·비밀번호 붙여넣기
2. 왼쪽 맨 아래 입력칸에 `https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly` → Authorize APIs
3. 구글 계정 선택 후 **「OIYO 경제 속보」 채널(브랜드 계정)**을 고른다 → "확인되지 않은 앱" 화면이 나오면 고급 → 이동 → 허용
4. **Exchange authorization code for tokens** → 나온 **Refresh token** 복사

## 4. GitHub에 넣기
https://github.com/yuli3/news-oiyo/settings/secrets/actions → New repository secret 세 개:
- `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`

(선택) 같은 화면 Variables 탭: `YT_CHANNEL_ID` = 채널 ID(UC로 시작). 넣어 두면 다른 채널에 잘못 올라가지 않는다.
`YT_PRIVACY`는 심사 통과 뒤 `public`으로 바꾼다(기본 private).

넣고 나서 Claude에게 "넣었어"라고만 하면 워크플로를 돌려 첫 업로드를 확인한다.

## 5. API 심사 신청 (공개 업로드용)
2020-07-28 이후 만든 미심사 API 프로젝트로 올린 영상은 유튜브가 **비공개로 잠근다**. 공개하려면 심사(무료)가 필요하다.
https://support.google.com/youtube/contact/yt_api_form → "YouTube API Services - Audit and Quota Extension"

답변 예시:
- 서비스 설명: OIYO(news.oiyo.net)가 자기 채널 「OIYO 경제 속보」 하나에만, 하루 1개의 60초 쇼츠를 자동 업로드합니다. 영상은 중앙은행·정부·통계기관 공식 발표의 제목·출처·시각만 문자 카드로 보여 주고 원문 링크를 답니다. 음악은 코드로 합성한 원곡입니다.
- 쓰는 API: videos.insert(하루 1회), channels.list(mine, 업로드 전 채널 확인). 다른 사용자의 데이터는 다루지 않습니다.
- 사용자: 운영자 본인 1명. 외부 사용자 로그인 없음.
- 코드: https://github.com/yuli3/news-oiyo/blob/main/scripts/upload-econ-short.mjs
- 개인정보처리방침·약관: https://news.oiyo.net 하단 링크

## 할당량
기본 10,000 단위/일. 업로드 1회 1,600 + 채널 확인 1 → 하루 1개면 충분.
