import { sha256Hex } from "./mailing-list.mjs";

export function createKvStore(kv) {
  return {
    async getByEmail(email) {
      const raw = await kv.get(`e:${await sha256Hex(email)}`);
      return raw ? JSON.parse(raw) : null;
    },
    async findByToken(kind, hash) {
      const email = await kv.get(`${kind === "confirm" ? "c" : "u"}:${hash}`);
      if (!email) return null;
      return this.getByEmail(email);
    },
    async save(next, prev) {
      if (prev?.confirmTokenHash && prev.confirmTokenHash !== next.confirmTokenHash) {
        await kv.delete(`c:${prev.confirmTokenHash}`);
      }
      if (prev?.unsubscribeTokenHash && prev.unsubscribeTokenHash !== next.unsubscribeTokenHash) {
        await kv.delete(`u:${prev.unsubscribeTokenHash}`);
      }
      await kv.put(`e:${await sha256Hex(next.email)}`, JSON.stringify(next));
      if (next.confirmTokenHash) await kv.put(`c:${next.confirmTokenHash}`, next.email);
      if (next.unsubscribeTokenHash) await kv.put(`u:${next.unsubscribeTokenHash}`, next.email);
    },
  };
}
