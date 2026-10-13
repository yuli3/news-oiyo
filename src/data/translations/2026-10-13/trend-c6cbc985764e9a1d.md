---
id: trend-c6cbc985764e9a1d
title: "LSearch - Spotlight for windows with embedding"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x3zut6/lsearch_spotlight_for_windows_with_embedding"
summary: "임베딩 검색과 소형 MoE 모델을 넣은 Windows용 Spotlight 같은 검색 앱 LSearch 소개 글이에요. Qwen 3.5 4B 두 개를 코딩·에이전트용으로 미세조정해 MoE로 합쳤고, 임베딩은 embeddinggemma 2(270M)를 써요."
translationStatus: full
sourceShort: true
translatedBy: "Grok Bot"
translatedAt: "2026-10-13"
---
> Reddit 페이지는 직접 읽지 못해(403) RSS로 받은 게시글 본문을 옮겼어요. 원문이 짧은 소개 글이에요.

r/LocalLLaMA에 올라온 자작 앱 소개예요. 작성자는 macOS Spotlight 같은 검색을 **Windows**용으로 만들고 이름을 **LSearch**라고 붙였어요. 임베딩 모델과, 함께 쓰는 MoE 모델이 들어 있어요.

### MoE 모델
**Qwen 3.5 4B** 두 개를 가져와 하나는 코딩 작업용, 하나는 에이전트 작업용으로 미세조정한 뒤 둘을 합쳐 **MoE**로 만들었어요(2x4B). 모든 기능에 AI를 밀어 넣고 싶지 않아서, 이 모델은 코드 고치기 용도로만 쓰게 했대요.

### 임베딩 모델
검색에는 **embeddinggemma 2(270M)**를 써요. 아직 이미지 검색은 지원하지 않아요.

### 기타
- 앱은 Opus 5.5로 작성했다고 밝혔어요.
- 모델은 Hugging Face(scutoid/2x4B)에 있지만, RAM이 16GB 이상이면 앱이 다운로드 여부를 물어보고 링크 없이 알아서 받아 줘요.
- 소스와 실행 파일(exe, Releases)은 GitHub(blueprintnerd/LSearch)에 있어요.
