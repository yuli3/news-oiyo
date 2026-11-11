// 통합 AI 큐레이터 데이터셋 — 옛 /radar/ · /ai/models/ · /ai/tools/ · 기존 /ai/curator/ 를
// 한 곳(/ai/curator/)으로 합친다. 원본 항목은 소실 없이 전부 유지(이름·URL·한 줄 평·섹션).
// 각 원본 데이터 파일은 그대로 SSOT로 남기고, 여기서 섹션 순서만 정규화한다.
import { REFERENCE_SHELVES, type ShelfItem } from "./reference-shelves";
import {
  MODEL_GROUPS,
  LEADERBOARDS,
  MODELS_UPDATED,
  type ModelEntry,
  type Leaderboard,
} from "./ai-models";
import { PRACTICAL_TOOL_GROUPS, type PracticalTool } from "./practical-tools";
import { NEWS_SOURCE_GROUPS, type NewsSource } from "./ai-news-sources";

export { MODELS_UPDATED };

export interface CuratorItem {
  name: string;
  url: string;
  by?: string;        // 제공사 (서비스·모델)
  note: string;       // 한 줄 평 (ko)
  free?: boolean;     // 무료 티어 존재
  strengths?: string; // 강점 태그 (모델)
  kind: "outbound" | "internal";
}

export interface CuratorSection {
  id: string;
  label: string;
  desc: string;
  group: "service" | "model" | "practice" | "news" | "design" | "reference";
  items: CuratorItem[];
}

function fromModel(m: ModelEntry): CuratorItem {
  return { name: m.name, url: m.url, by: m.by, note: m.note, strengths: m.strengths, kind: "outbound" };
}
function fromBoard(l: Leaderboard): CuratorItem {
  return { name: l.name, url: l.url, note: l.note, kind: "outbound" };
}
function fromTool(t: PracticalTool): CuratorItem {
  return { name: t.name, url: t.url, note: t.why, kind: t.url.startsWith("/") ? "internal" : "outbound" };
}
function fromNews(s: NewsSource): CuratorItem {
  return { name: s.name, url: s.url, note: s.note, kind: "outbound" };
}
function fromShelf(i: ShelfItem): CuratorItem {
  return { name: i.name, url: i.url, note: i.note, kind: i.kind };
}

const DESIGN_SHELF_IDS = new Set(["galleries", "design-eng"]);

export const CURATOR_SECTIONS: CuratorSection[] = [
  // 2026-11-11: AI 서비스 목록(대화·코딩·이미지·영상 등)은 show.oiyo.net/ai/ 로 옮겼다.
  // 같은 목록을 두 곳에 두지 않도록 여기서는 안내 한 줄만 남긴다.
  {
    id: "services",
    label: "AI 서비스 디렉터리",
    desc: "대화형 AI·코딩·이미지·영상·음성 등 서비스 목록은 OIYO 쇼케이스로 옮겼어요.",
    group: "service" as const,
    items: [{
      name: "AI 서비스 디렉터리 (OIYO 쇼케이스)",
      url: "https://show.oiyo.net/ai/",
      note: "분야별 AI 서비스를 검색하고, 무료로 써 볼 수 있는 곳과 한국 서비스만 골라 볼 수 있어요.",
      kind: "outbound" as const,
    }],
  },
  ...MODEL_GROUPS.map((g) => ({
    id: g.id, label: g.label, desc: g.desc,
    group: "model" as const, items: g.items.map(fromModel),
  })),
  {
    id: "leaderboards",
    label: "라이브 리더보드",
    desc: "정확한 실시간 순위·벤치마크는 1차·집계 출처에서. OIYO는 지도의 인덱스 역할만 한다.",
    group: "model" as const,
    items: LEADERBOARDS.map(fromBoard),
  },
  ...PRACTICAL_TOOL_GROUPS.map((g) => ({
    id: g.id, label: g.label,
    desc: "OIYO 운영에서 사용하거나 검토한 도구와 그 활용 맥락을 정리.",
    group: "practice" as const, items: g.items.map(fromTool),
  })),
  ...NEWS_SOURCE_GROUPS.map((g) => ({
    id: g.id, label: g.label, desc: g.desc,
    group: "news" as const, items: g.items.map(fromNews),
  })),
  ...REFERENCE_SHELVES.map((s) => ({
    id: s.id, label: s.label, desc: s.desc,
    group: DESIGN_SHELF_IDS.has(s.id) ? ("design" as const) : ("reference" as const),
    items: s.items.map(fromShelf),
  })),
];

export function countAll(): number {
  return CURATOR_SECTIONS.reduce((n, s) => n + s.items.length, 0);
}
