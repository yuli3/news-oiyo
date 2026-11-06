---
id: trend-839ac4b68d910bef
title: "Gemini Omni 1.2 Flash"
sourceUrl: https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash
summary: "구글이 Gemini Omni 1.2 Flash를 공개했어요. 네이티브 15초 영상·다중 턴 편집·레퍼런스 유지가 강화됐고, 1.1 대비 가격은 30% 낮아 720p 기준 초당 0.07달러예요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-07
---

Google DeepMind 제품 매니저 Anish Nangia의 공식 블로그(2026-11-05)를 읽고 옮겼어요.

### 한눈에
**Gemini Omni 1.2 Flash**가 Gemini API와 Gemini for business에 일반 제공돼요. 핵심은 네이티브 **15초 영상 생성·편집**, 다중 턴 대화형 수정, 레퍼런스(캐릭터·제품·스타일) 유지 강화, 그리고 Omni 1.1 대비 **가격 30% 인하**(720p 초당 $0.07)예요. Google Vids, Flow, Ads, Gemini 앱(AI Ultra 구독자 롤아웃) 등에서도 쓸 수 있다고 해요.

### 무엇이 좋아졌나요
- **길이**: 1.1의 10초에서 15초로 늘었고, 3–15초를 1초 단위로 지정할 수 있어요.
- **비용 흐름**: 360p/720p로 빠르게 초안을 잡고, 전체를 다시 만들지 않고 후속 편집으로 고친 뒤 1080p·4K로 업스케일하는 식이에요.
- **레퍼런스**: 캐릭터·제품·스타일 이미지, 최대 3초 모션 클립, 오디오 큐를 섞어 안내하면 얼굴·의상·패키지 타이포·브랜드 색이 각도 바뀌어도 유지된다고 해요. 가상 피팅·카탈로그·브랜드 광고 예시가 나와요.
- **일관성**: 키프레임 보간·클립 확장 때 드리프트·모핑이 줄었다고 해요.
- **대화형 편집**: 배경·조명·비율 등을 턴마다 바꿔도 캐릭터 연기와 프레이밍을 유지하는 식의 예시가 있어요.
- **음성**: 립싱크와 다중 화자 조건이 더 자연스럽다고 해요.
- **카메라**: FPV 플라이스루·줌아웃·오빗 등에서 불필요한 점프컷이 줄었다고 해요.

### 제공과 안전
Google Cloud 엔터프라이즈 인프라·보안을 바탕으로 일반 제공되며 Provisioned Throughput을 쓸 수 있고, 출력에는 눈에 잘 안 띄는 SynthID 워터마크가 들어간다고 해요. 빠른 스포츠 동작·급격한 대본 변경·복잡한 물리 등은 아직 개선 중이라고 밝히고, 대량 영상 제작에 적합하다고 안내해요. 개발자는 AI Studio·문서·가격 페이지, 기업은 Cloud 콘솔·API로 시작하면 돼요.
