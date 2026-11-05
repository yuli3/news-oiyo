---
id: trend-3d2c531a97dc2ae9
title: "[Paper] SpecOPD: Branch-Parallel On-Policy Distillation for Speculative Decoding - By Qwen"
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1xoo0pp/paper_specopd_branchparallel_onpolicy
summary: "Qwen 팀이 투기적 디코딩용 드래프터를 브랜치 병렬로 온폴리시 증류하는 SpecOPD 논문을 공개했어요. 평균 수용 길이가 최대 41.45% 늘고, 자기회귀 디코딩 대비 최대 3.56배 빠른 생성 속도를 보고했어요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-06
---

r/LocalLLaMA 글은 논문 초록과 링크로 이뤄져 있어요. Reddit 자동 수집이 막혀 Grok Bot이 공개 페이지를 직접 열어 전문을 읽었어요.

### 초록 번역
투기적 디코딩(Speculative Decoding, SD)은 토큰을 하나씩 순서대로 만드는 비용을 줄여 LLM 추론을 빠르게 해요. 최신 SD 기법은 한 번의 forward pass로 블록 전체를 예측하는 병렬 드래프터로 제안 비용을 줄이지만, 전체 속도 향상은 여전히 **수용 길이(acceptance length)**에 달려 있어요.

온폴리시 증류(OPD)는 잘 학습된 드래프터를 수용 길이 정체 구간 너머로 끌어올릴 수 있지만, 기존 파이프라인은 순차적인 draft-and-verify 롤아웃으로 감독 신호를 모아요. 저자들의 핵심 통찰은 온폴리시 감독이 이런 의존성을 물려받을 필요가 없다는 거예요. 드래프트 블록은 기준 prefix와 드래프트에서 샘플링한 이력만으로 감독할 수 있어요.

그래서 **SpecOPD**를 제안해요. 기준 anchor에서 변하는 드래프터 정책으로부터 뽑은 독립 브랜치들에 걸쳐 드래프트 샘플링과 타깃 감독을 병렬화하는 브랜치 병렬 OPD 프레임워크예요. 브랜치들을 proposal tree로 묶어 타깃 prefix 계산을 공유하고, full attention에는 tree mask, sparse attention에는 브랜치 일관 indexer 그룹, linear attention에는 indexed state replay를 써서 각 브랜치의 이력을 보존해요. 드래프터는 수용 길이를 직접 겨냥하는 E2E-TV surrogate로 학습해요.

실험 범위는 8B full-attention(GQA), 27B full–linear(GQA–GDN), 125B sparse–linear(QSA–GDN) 타깃, 세 가지 병렬 드래프트 구조(DFlash, DSpark, DFlash V2), 네 가지 과제 영역(대화, 코딩, 수학, 에이전트)이에요.

### 결과
- 평균 수용 길이 최대 **41.45%** 향상
- 기본 설정 기준, 순차 롤아웃 OPD보다 감독 토큰 처리량 **16.09배**
- 자기회귀 디코딩 대비 생성 속도 최대 **3.56배**

글에는 논문 PDF, 프로젝트 블로그, GitHub(QwenApp/SpecOPD), 저자들의 X 게시물 링크가 함께 있어요.
