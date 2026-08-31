# news.oiyo.net 작업 진입

공통 계약은 `/Users/seuncho/coding/AGENTS.md`다. 이 파일은 이 repo에만 있는 것을 적는다.

## "news 업데이트 해줘" — 어느 런타임에서든 이것 하나

```bash
npm run update
```

`update` = `collect` → `audit:trends` → `sync`. 수집·검사·반영이 한 명령이고, Claude·Codex·Grok·Grok Bot 어디서 실행하든 같은 결과가 나온다. 셸을 쓸 수 있으면 되고 특정 런타임의 스킬·플러그인·크론을 요구하지 않는다.

그 다음 배포는 별도 승인이다:

```bash
git add src/data/news.json && git commit -m "sync $(date +%F)" && git push
```

푸시하면 Cloudflare Pages가 자동 배포한다. **즉 푸시가 곧 공개 발행이다** — 배치별 명시 승인 없이는 하지 않는다.

## 왜 이 능력이 repo 안에 있나

앞 세대 수집기는 Hermes 스킬 `oiyo-news-feed`였다. 2026-08-29 Hermes가 퇴장하자 **능력이 런타임과 함께 사라졌고 피드는 그날 멈췄다.** 09-01에야 발견됐다. 교훈은 하나다 — 능력은 런타임이 아니라 repo가 소유한다. 스킬·플러그인·크론에 능력을 두면 그 런타임이 사라질 때 같이 죽는다.

폐기된 `trend_scout` 복원과 혼동하지 말 것. 소스 목록·재시도·실패 판정은 `company-brain/AI-Sessions/wiki/decisions/trend-scout-retired-2026-08-20.md`가 규정한 흡수본 그대로다.

## 파이프라인

```
collect-news.mjs → company-brain/AI-Sessions/wiki/sources/trends/<date>.{md,sources.json}
                 → sync-news.mjs → src/data/news.json → Cloudflare Pages
```

| 파일 | 소관 |
|---|---|
| `scripts/collect-news.mjs` | 수집·선별·노트 작성 |
| `scripts/audit-trend-notes.mjs` | 노트 형식 게이트 |
| `scripts/sync-news.mjs` | 노트 → `news.json` |
| `scripts/daily-publish.sh` | 발행(입력 나이 보고 포함) |
| `scripts/lib/news-pipeline-sources.json` | **소스 이름 SSOT** |

## 지켜야 할 계약

- **`## Summary` 절은 필수다.** `sync-news.mjs`가 이 헤딩으로 사이트 리드 문단을 뽑는다. 없으면 그 날 페이지에 요약이 통째로 빠지고 아무 에러도 안 난다 — 2026-08-23~09-01에 실제로 일어났다. `audit:trends`가 이제 막는다.
- **소스 이름은 레지스트리를 따른다.** 미등록 `src`는 sync가 조용히 버린다. 새 이름을 쓰지 말고 레지스트리의 `id` 또는 `aliases`를 쓴다. `r-localllama` 같은 변형이 15개 항목을 버리게 만들었다.
- **URL은 https만.** 어댑터가 거부한다.
- **GeekNews는 원본 URL만.** `news.hada.io` 토픽 링크가 아니라 그 글의 원본 주소를 쓴다. `collect-news.mjs`가 자동 해석한다.
- **추측성·YMYL 제외.** 확인되지 않은 루머와 의료·건강은 이 파이프라인이 검증할 수 없다.
- **`raw == 0`만 실패다.** 소스 일부가 429/403이어도 조용한 날과 구분해 계속 진행한다.

## 편집 요약

`collect-news.mjs`가 쓰는 `## Summary`는 기계가 확신할 수 있는 사실(건수·소스 분포)만 담는다. 그날의 축을 짚는 편집 문장은 사람 또는 에이전트가 그 절을 손봐서 더한다. 기계가 쓴 사실을 지우지 말고 문장을 덧붙인다. 편집 없이 `sync`해도 유효한 노트다 — 요약이 덜 풍부할 뿐이다.

## 검증

```bash
npm run audit:trends   # 노트 형식·소스 이름·URL
npm run build          # 현재 62페이지
```

`astro check`는 이 repo에 설정돼 있지 않다(`@astrojs/check` 미설치). type-check script가 없으므로 `build`가 검증 게이트다.
