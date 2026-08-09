// 기계가 읽는 AI 모델 카탈로그 배포본 — /models 페이지와 같은 SSOT(src/data/ai-models.ts)에서 생성.
// Dataset JSON-LD의 distribution 대상. AI·크롤러·개발자가 그대로 인용/파싱할 수 있게 정적 JSON으로 노출한다.
import { LEADERBOARDS, MODEL_GROUPS, MODELS_UPDATED } from "../../../data/ai-models";

export function GET() {
  const body = {
    name: "OIYO AI Model Catalog",
    description:
      "Curated map of frontier and open-weight AI model families plus local runtimes, maintained by OIYO. Rankings change fast, so exact scores are delegated to live leaderboards listed under `leaderboards`.",
    url: "https://news.oiyo.net/ai/models/",
    dateModified: MODELS_UPDATED,
    license: "https://creativecommons.org/licenses/by/4.0/",
    publisher: { name: "OIYO", url: "https://oiyo.net" },
    groups: MODEL_GROUPS.map((g) => ({
      id: g.id,
      label: g.label,
      description: g.desc,
      models: g.items.map((m) => ({
        name: m.name,
        by: m.by,
        url: m.url,
        note: m.note,
        strengths: m.strengths.split("·").map((s) => s.trim()),
      })),
    })),
    leaderboards: LEADERBOARDS,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
