import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

export function createDevMailer(outboxPath) {
  return {
    canSend: true,
    devExpose: true,
    async send(message) {
      await mkdir(dirname(outboxPath), { recursive: true });
      await appendFile(outboxPath, `${JSON.stringify({ at: new Date().toISOString(), ...message })}\n`, { mode: 0o600 });
      return { ok: true };
    },
  };
}
