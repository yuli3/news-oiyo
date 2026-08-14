#!/usr/bin/env bash
# Publish whatever the trend collector has produced since the last run.
#
# The chain is: trend_scout.py -> company-brain/.../trends/*.md -> sync-news.mjs
# -> src/data/news.json -> Cloudflare Pages. On 2026-08-14 both halves were
# found dead: publishing had stopped on 07-21 and collection on 08-10, and the
# site had served a three-week-old front page the whole time without any signal
# saying so.
#
# This script owns the publish half only. It cannot collect — trend_scout.py is
# not on this machine — so it reports the age of its input instead of silently
# republishing the same days forever. A run that finds nothing new is a success,
# not a no-op to ignore: STALE in the log means collection is still down.
#
# It stages src/data/news.json and nothing else. Other sessions share this
# working tree, so a broad `git add` here would carry off their work.
set -euo pipefail

cd "$(dirname "$0")/.."
TRENDS="$HOME/coding/company-brain/AI-Sessions/wiki/sources/trends"
STAMP=$(date +%F)

if [ ! -d "$TRENDS" ]; then
  echo "[$STAMP] FAIL trends directory missing: $TRENDS"
  exit 1
fi

newest=$(ls "$TRENDS" | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' | sort | tail -1 | sed 's/\.md$//')
age=$(( ( $(date +%s) - $(date -j -f %Y-%m-%d "$newest" +%s) ) / 86400 ))

node scripts/sync-news.mjs

# sync stamps generatedAt on every run, so a plain `git diff --quiet` reports a
# change even when no new day arrived — which would push a commit and trigger a
# Pages rebuild daily for nothing. Judge on the content, and drop a
# timestamp-only edit rather than leaving it in a shared working tree.
# The greps exit 1 when they match nothing, and "nothing" is the ordinary case
# here, so the pipeline must not be allowed to take `set -e` down with it.
substantive=$(git diff -U0 -- src/data/news.json \
  | grep -E '^[+-]' | grep -Ev '^(\+\+\+|---)' | grep -v '"generatedAt"' | head -1 || true)

if [ -z "$substantive" ]; then
  git checkout -- src/data/news.json
  echo "[$STAMP] no change · newest trend note $newest (${age}d old)"
  [ "$age" -gt 2 ] && echo "[$STAMP] STALE collection has produced nothing for ${age} days — trend_scout.py is down"
  exit 0
fi

git add src/data/news.json
AGENT_SESSION=news-daily-publish git commit -q -m "sync $STAMP"
git push -q
echo "[$STAMP] published · newest trend note $newest (${age}d old)"
