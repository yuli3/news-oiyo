---
id: trend-c5d2eae2e7295589
title: "Show GN: 수노(Suno)용 한국어 작사 Claude 스킬 – 부를 수 있는 가사와 Style 입력을 같이 설계"
sourceUrl: "https://github.com/previtlab/suno-lyrics-skill"
summary: "PrevitLAB(MOHOHA)이 공개한 Claude 에이전트 스킬로, Suno에 넣을 부를 수 있는 한국어 가사와 Style·Exclude·Title을 장르에 맞춰 함께 설계해요. 발라드·랩·트로트·K-pop 등 장르별로 규칙을 켜고 끄며, CC BY 4.0이라 상업적 이용도 돼요."
translationStatus: full
translatedBy: "Grok Bot"
translatedAt: "2026-10-18"
---

GitHub 저장소 previtlab/suno-lyrics-skill의 README(한국어 부분 전체, v3.0)를 읽고 정리했어요. 원문이 한국어라 번역보다는 요약·재구성이에요.

### 무엇인가
Suno에 넣을 **부를 수 있는 한국어 가사**와 함께 Suno가 요구하는 **Style·Exclude·Title** 입력까지 설계하는 Claude 에이전트 스킬이에요. 특정 아티스트·장르 템플릿이 아니라, 사연형 발라드부터 랩·트로트·댄스·R&B·록·재즈·뮤지컬·전자음악까지 **장르에 맞게 규칙을 켜고 끄는 범용 작사 지침**이라고 소개해요.

### 설치
| 환경 | 방법 |
|---|---|
| Claude.ai(웹·앱) | Releases에서 `suno-lyrics-skill.zip`을 받아 Customize → Skills → Create skill → Upload a skill. 코드 실행이 켜져 있어야 하고 Free·Pro·Max·Team·Enterprise에서 사용 가능(Team·Enterprise는 조직 설정에서 스킬 허용 필요) |
| Claude Code | `cp -r suno-lyrics-skill ~/.claude/skills/` (프로젝트 전용은 `.claude/skills/`) |

설치 뒤 작사를 부탁하면 Claude가 스킬을 알아서 불러오고, `/suno-lyrics-skill`로 직접 부를 수도 있어요.

### 작동 순서
1. 창작 모드와 **Song Brief**를 정해요. 모르는 칸은 가설을 세워 진행하고 중요한 가설만 짧게 밝혀요.
2. 가사를 쓰고 **납품 전 점검**을 거쳐요.
3. Lyrics → Style → Exclude → Title 순서로 출력하고, 생성 결과에서 확인할 점도 적어 줘요.

### 예시
"이별 3년 뒤 옛 동네 버스 정류장에서 그 사람을 떠올리는 미디엄 템포 발라드, 3분 30초 안쪽"을 요청하면 후렴 "한 대만 더 보내고 가자 / 네가 늘 하던 말"과 함께 `Korean medium-tempo ballad, 80 BPM, 4/4, warm upright piano…` 같은 영어 Style 문구, 제목 "한 대만 더"를 돌려줘요. Exclude는 첫 생성에서 비워 두기를 권해요.

### 구성과 라이선스
- `SKILL.md`(§0~§36)와 템플릿 3개(`song-brief.md`, `final-output.md`, `pre-delivery-audit.md`)가 들어 있고, 템플릿은 스킬 없이 사람이 복사해 써도 돼요.
- 이 스킬로 만든 곡들은 MOHOHA 유튜브 채널에 있고, 규칙을 풀어 쓴 강의 시리즈("SUNO 작사의 모든 것")도 있어요.
- **CC BY 4.0**이라 사용·수정·재배포·상업적 이용이 모두 자유이고, 저작자 표기(PrevitLAB (MOHOHA))만 하면 돼요.
