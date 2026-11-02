---
id: trend-184de313f3686dcb
title: "Claude Now Works with Google Docs, Sheets, and Slides"
sourceUrl: https://claude.com/resources/articles/claude-now-works-in-google-docs-sheets-and-slides
summary: "Anthropic이 Claude for Google Workspace 애드온을 모든 유료 플랜에 공개 베타로 내놨어요. Docs·Sheets·Slides 사이드바에서 선택 영역을 보고 직접 고치며, Claude 쪽에서 구글 파일을 만드는 커넥터도 함께 나왔어요."
translationStatus: partial
translatedBy: Grok Bot
translatedAt: 2026-10-22
---

> 원문 앞부분(애드온 기능, 편집 모드, 엔터프라이즈 통제)을 기준으로 옮겼어요. 커넥터 세부 설명은 일부만 읽었어요.

### 발표 내용

**Claude for Google Workspace**가 모든 유료 Claude 플랜에서 공개 베타로 나왔어요. Google Docs, Sheets, Slides에 Claude를 붙여 열려 있는 파일에서 바로 함께 일할 수 있어요. 또 Claude가 Claude 앱 안에서 구글 파일을 만들고 고칠 때 쓰는 Docs·Sheets·Slides **커넥터(베타)**도 공개했어요.

### 작업하는 곳에서 바로

애드온을 켜면 파일 옆 사이드바에 Claude가 열려서 앱이나 탭을 오갈 필요가 없어요. 열린 문서·시트·덱을 읽고, 어떤 텍스트·셀·슬라이드를 선택했는지 보고, 파일을 직접 고쳐요.

- **Docs**: 주변 서식은 건드리지 않고 문장을 고치거나 제목 스타일을 바꿔요. 큰 수정은 사이드바에 제안 카드로 보여 주고, 카드마다 바뀔 구절을 강조해 적용·무시를 고를 수 있어요. 예를 들어 PRD의 요약을 다듬고 다음 단계를 표로 바꾸는 일을 한 번에 해요.
- **Sheets**: 수식, 피벗 테이블, 기본 차트, 새 탭을 만들어요. 조인이나 데이터 정리는 범위를 Python으로 가져가 처리한 뒤 결과를 시트에 다시 써요. 빈 시트에 원본 파일을 붙이고 팀별 탭과 요약 차트가 있는 3분기 예산 대비 실적 보고서를 요청하면, 예산 초과 항목도 표시해 줘요.
- **Slides**: 덱의 레이아웃과 테마로 새 슬라이드를 만들고, 겹치거나 슬라이드 밖으로 나간 요소, 읽기 어려운 텍스트를 스스로 점검해요.

### 자율성은 사용자가 정해요

기본 모드 "Ask before edits"에서는 변경마다 요약이 담긴 승인 카드가 뜨고 승인해야 반영돼요. "Accept all edits" 모드에서는 멈추지 않고 변경을 적용해요.

### 커넥터·스킬·엔터프라이즈 통제가 따라와요

Claude 계정으로 로그인하면 사이드바에서도 평소 쓰는 모델, 커넥터, 스킬을 그대로 써요. 예를 들어 고객 QBR 덱을 만들 때 Salesforce에서 계정 이력을, Google Drive 커넥터로 최근 통화 메모를 가져올 수 있어요. QBR 형식을 스킬로 저장하면 팀이 같은 형식으로 다음 덱을 만들 수 있어요. Enterprise 플랜에서는 Compliance API, 고객 관리 암호화 키(CMEK), OpenTelemetry 감사 내보내기가 애드온에도 적용돼요.
