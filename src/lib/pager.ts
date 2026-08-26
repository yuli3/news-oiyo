/** Landing pager: page 1 is `/`, later pages are `/page/N/`. */
export function pageHref(pageIndex0: number): string {
  return pageIndex0 <= 0 ? "/" : `/page/${pageIndex0 + 1}/`;
}
