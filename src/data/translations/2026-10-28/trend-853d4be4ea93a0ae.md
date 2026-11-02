---
id: trend-853d4be4ea93a0ae
title: "Show GN: Translate Book: arXiv - arXiv 논문을 원문 구조 그대로 번역본으로 변환해 주는 Claude Code 스킬"
sourceUrl: https://github.com/kcy4334-lgtm/translate-book-arxiv
summary: "Translate Book: arXiv는 arXiv 논문의 LaTeX 원본을 읽어 수식·그림·표·번호를 그대로 살린 번역본 PDF를 만드는 Claude Code·Codex·OpenClaw용 스킬이에요. 청크를 병렬 서브 에이전트가 번역하고, 해시로 검증한 뒤 Pandoc으로 합쳐요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-28
---

### 무엇인가

**Translate Book: arXiv**는 Claude Code, Codex, OpenClaw용 에이전트 스킬이에요. arXiv 논문을 **번역된 인쇄용 책**으로 바꿔요. 논문의 **LaTeX 원본**을 읽기 때문에 수식, 그림, 표, 논문 자체의 번호가 그대로 넘어가요. PDF·DOCX·EPUB 책도 Calibre를 거쳐 번역할 수 있어요.

- 데모: arXiv:2609.11801 'Thinking with Looped Flows'(CC BY 4.0)를 31쪽 한국어 책으로 만들었고, 표 1의 숫자와 ±가 모두 논문 그대로래요.
- 설치: `npx skills add kcy4334-lgtm/translate-book-arxiv -a claude-code -g` 후 "translate /path/to/paper.pdf to Korean"이라고 요청해요. 첫 페이지로 arXiv 프리프린트를 알아보고, 원본을 받기 전에 물어봐요.

### 왜 LaTeX인가

PDF 번역기는 PDF 리더가 복원할 수 있는 것만 얻어요. pdftohtml은 수식을 위치 지정된 텍스트 조각으로 쪼개고, 다시 합칠 옵션이 없대요. 그래서 저자가 쓴 LaTeX에서 출발해요.

### 동작 방식

1. arXiv `/e-print`를 받아 LaTeX를 평탄화해요. 논문이 함께 배포한 .sty 매크로를 풀고, 수식·정리·절·그림 번호를 원본에서 읽고, 그림은 원래 벡터 PDF에서 래스터화해 캡션을 붙여요.
2. 수식(`$...$`)을 살린 Markdown으로 바꾸고 청크로 나눠요. `manifest.json`이 청크 해시를 추적하고, 참고문헌은 번역하지 않고 그대로 복사해요.
3. **병렬 서브 에이전트**(기본 8개씩)가 청크 하나씩 읽고 번역해 저장해요. 청크마다 새 컨텍스트라 긴 책도 세션이 꽉 차거나 끝이 잘리지 않아요.
4. 매니페스트 해시와 원본·출력 1:1 대응을 검증해요.
5. 합친 뒤 Pandoc → HTML(목차) → DOCX, Calibre EPUB, Chromium PDF로 내보내요.

### 그 밖에

- 대상 언어는 플래그로 정해요(zh, en, ja, ko, fr, de, es 등). 인쇄 레이아웃은 한국어 기준으로 맞췄고 한국어 타이포그래피가 조정돼 있어요.
- deusyu/translate-book을 포크했고, 원 프로젝트는 claude_translater에서 나와 병렬 번역·매니페스트 검사·재개·다양한 출력 형식을 만들었어요. 이 포크는 arXiv LaTeX 경로와 로그·어드바이저를 발전시켰대요.

> README 앞부분(소개, 동작 방식)을 기준으로 옮겼어요. 언어별 출력 예시와 설치 세부는 다 읽지 않았어요.
