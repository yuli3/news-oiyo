---
id: trend-06b11b1ed40b04ee
title: "Show GN: rdocs2md – Rust로 만든 경량 문서→Markdown 변환 CLI/MCP (HWP/PDF/Office 지원)"
sourceUrl: https://github.com/kirinonakar/rdocs2md
summary: "rdocs2md는 PDF, 한글(HWP/HWPX), 오피스, ODF, RTF, EPUB을 오프라인에서 Markdown·HTML·JSON으로 바꾸는 Rust 단일 실행 파일이에요. CLI와 AI 에이전트용 MCP stdio 서버를 함께 제공해요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

kirinonakar/rdocs2md 깃허브 README를 'Visibility and PDF image warnings' 절 앞부분까지 읽고 옮겼어요. 그 뒤 README 내용은 읽지 못했어요.

### 무엇인가

- Rust로 만든 휴대용 실행 파일 하나로, AI 에이전트가 쓰기 좋은 MCP와 CLI 인터페이스를 갖췄어요. 현재 Windows x64용이고 완전히 오프라인으로 돌아가요.
- PDF, 한글(HWP/HWPX), 오피스, OpenDocument, RTF, EPUB 등을 UTF-8 Markdown, HTML, JSON으로 바꾸고, 읽는 순서와 문서 구조를 최대한 살린다고 해요.

### CLI 사용

- 기본 출력은 입력 파일 옆의 같은 이름 `.md` 파일이에요. 예: `rdocs2md.exe "회의록.hwpx" -o "회의록.md"`, `--pages 2-4,7 --stdout`, `--slides 2-3 --mode layout --json layout.json`, `--extract-images --image-dir`, `--sheets 2 --format html`.
- 파일·폴더·따옴표로 감싼 와일드카드 패턴을 함께 넘길 수 있고, `--recursive`로 하위 폴더를 훑어요. 일괄 모드에서 파일 하나가 실패하거나 파서가 패닉해도 계속 진행하고, 실패가 있으면 종료 코드 1, 잘못된 옵션이면 2를 돌려줘요.
- 모드는 세 가지예요. `semantic`은 제목·목록·문단·표 중심 Markdown, 기본값 `hybrid`는 논리 구조를 지키되 세로쓰기·RTL 문단 등에 HTML을 쓰고, `layout`은 줄바꿈·공백·정렬·들여쓰기를 살린 HTML이에요.
- `--pages`, `--slides`, `--sheets`, `--chapters`, `--range`는 같은 범위 옵션의 별칭이에요. PDF·PPT·XLS·ODS·EPUB·HWP 5 등은 요청 범위 밖 내용을 건너뛰어 읽어요.
- `--search`로 추출 텍스트를 검색해 JSON으로 받을 수 있어요(기본 대소문자 무시, 파일당 50건, 최대 200건).

### MCP 서버

- MCP 설정에 실행 파일 경로와 `mcp --root <폴더>`를 넣어요. root 밖 문서를 다루려면 `--allow-outside-root`를 추가해요.
- 도구는 `list_supported_formats`, `inspect_document`, `convert_document`, `extract_document_range`, `search_document`, `convert_documents`예요. 결과가 인라인 한도(512KiB)에 닿으면 `output_path`로 저장하거나 `range`로 나눠 받아요.
- 줄 단위 JSON-RPC 2.0을 쓰고, 프로토콜 버전 2024-11-05, 2025-03-26, 2025-06-18, 2025-11-25를 협상할 수 있어요.
- JSON IR은 흰색 글자, 3pt 미만, 숨김, 영역 밖 텍스트를 `visibility_flags`로 표시해요. 문서에 숨겨진 텍스트를 에이전트가 그대로 믿지 않도록 돕는 장치예요.
