// 「이번 주 AI로 만든 놀라운 것 N선」 호 목록(빌드 때 읽음). 규칙·검사는 scripts/lib/ai-wow.mjs.
import { validateIssue } from "../../scripts/lib/ai-wow.mjs";

export interface WowItem {
  id: string; title: string; url: string; via?: string; date: string; category: string; kr?: boolean;
  creator: { name: string; handle: string; platform: string; profile?: string };
  what: string; how: string; why: string; claim?: string;
}
export interface WowIssue { week: string; title: string; range: { from: string; to: string }; published: string; lede: string; items: WowItem[] }

const mods = import.meta.glob<{ default: WowIssue }>("../data/ai-wow/*.json", { eager: true });

export const wowIssues: WowIssue[] = Object.entries(mods)
  .map(([file, m]) => {
    const errs = validateIssue(m.default, file);
    if (errs.length) throw new Error(`ai-wow 데이터 오류\n${errs.join("\n")}`);
    return m.default;
  })
  .sort((a, b) => b.week.localeCompare(a.week));
