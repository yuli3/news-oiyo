// 화면이 커뮤니티를 켤지 정한다. enabled:false 면 날짜 페이지는 giscus 로 돌아간다.
import { db, json } from "../../server/http";
import { enabledProviders } from "../../server/oauth";
import type { Handler } from "../../server/types";

export const onRequestGet: Handler = ({ env }) => {
  if (!db(env)) return json({ enabled: false });
  return json({ enabled: true, providers: enabledProviders(env), turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null });
};
