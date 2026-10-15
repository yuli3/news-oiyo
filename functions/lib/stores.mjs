import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export function createMemoryStore() {
  const records = new Map();
  return {
    async getByEmail(email) {
      const found = records.get(email);
      return found ? structuredClone(found) : null;
    },
    async findByToken(kind, hash) {
      for (const record of records.values()) {
        const current = kind === "confirm" ? record.confirmTokenHash : record.unsubscribeTokenHash;
        if (current && current === hash) return structuredClone(record);
      }
      return null;
    },
    async save(next, prev) {
      const current = records.get(next.email) || null;
      // Compare under the same write boundary so stale confirmation cannot overwrite revocation (2026-10-15).
      if (JSON.stringify(current) !== JSON.stringify(prev || null)) return false;
      records.set(next.email, structuredClone(next));
      return true;
    },
    async listActive() {
      return [...records.values()]
        .filter((record) => record.status === "active")
        .map((record) => ({ email: record.email, unsubscribeToken: record.unsubscribeToken }));
    },
  };
}

export function createFileStore(filePath) {
  let chain = Promise.resolve();
  const withLock = (fn) => {
    const run = chain.then(fn, fn);
    chain = run.then(() => {}, () => {});
    return run;
  };
  async function load() {
    try {
      const parsed = JSON.parse(await readFile(filePath, "utf8"));
      return parsed.records && typeof parsed.records === "object" ? parsed.records : {};
    } catch (error) {
      if (error?.code === "ENOENT") return {};
      throw error;
    }
  }
  return {
    async getByEmail(email) {
      return withLock(async () => {
        const records = await load();
        return records[email] ? structuredClone(records[email]) : null;
      });
    },
    async findByToken(kind, hash) {
      return withLock(async () => {
        const records = await load();
        const email = Object.values(records).find((record) => {
          const current = kind === "confirm" ? record.confirmTokenHash : record.unsubscribeTokenHash;
          return current === hash;
        })?.email;
        return email && records[email] ? structuredClone(records[email]) : null;
      });
    },
    async save(next, prev) {
      return withLock(async () => {
        const records = await load();
        if (JSON.stringify(records[next.email] || null) !== JSON.stringify(prev || null)) return false;
        records[next.email] = next;
        await mkdir(dirname(filePath), { recursive: true });
        const tmp = `${filePath}.${process.pid}.tmp`;
        await writeFile(tmp, JSON.stringify({ records }, null, 2), { mode: 0o600 });
        await rename(tmp, filePath);
        return true;
      });
    },
    async listActive() {
      return withLock(async () => {
        const records = await load();
        return Object.values(records)
          .filter((record) => record.status === "active")
          .map((record) => ({ email: record.email, unsubscribeToken: record.unsubscribeToken }));
      });
    },
  };
}
