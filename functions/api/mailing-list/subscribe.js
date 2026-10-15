import { onMailingList } from "../../lib/pages-handler.mjs";

export function onRequest(context) {
  return onMailingList(context);
}
