#!/usr/bin/env python3
"""Wait for a successful Cloudflare Pages check on the current Git SHA."""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.request

CHECK_NAME = "Cloudflare Pages"
FAILURES = {"failure", "cancelled", "timed_out", "action_required", "stale", "neutral", "skipped", "startup_failure"}


def fetch(repository: str, sha: str, token: str) -> dict:
    request = urllib.request.Request(
        f"https://api.github.com/repos/{repository}/commits/{sha}/check-runs?per_page=100",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "oiyo-cloudflare-deploy-gate",
        },
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def main() -> int:
    repository = os.environ.get("GITHUB_REPOSITORY", "")
    sha = os.environ.get("GITHUB_SHA", "")
    token = os.environ.get("GITHUB_TOKEN", "")
    if not repository or not sha or not token:
        print("Missing GITHUB_REPOSITORY, GITHUB_SHA, or GITHUB_TOKEN", file=sys.stderr)
        return 2

    deadline = time.monotonic() + int(os.environ.get("CLOUDFLARE_CHECK_TIMEOUT", "3600"))
    delay, previous = 10, ""
    while time.monotonic() < deadline:
        try:
            checks = [item for item in fetch(repository, sha, token).get("check_runs", []) if item.get("name") == CHECK_NAME]
            check = max(checks, key=lambda item: item.get("started_at") or "", default=None)
            label = "not-created" if check is None else f"{check.get('status')}:{check.get('conclusion') or '-'}"
            if label != previous:
                print(f"{CHECK_NAME} for {sha[:7]}: {label}", flush=True)
                previous = label
            if check and check.get("status") == "completed":
                if check.get("conclusion") == "success":
                    return 0
                if check.get("conclusion") in FAILURES:
                    print(f"{CHECK_NAME} failed: {check.get('details_url', '')}", file=sys.stderr)
                    return 1
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
            print(f"Transient check API error: {error}", flush=True)
        time.sleep(delay)
        delay = min(30, delay + 5)

    print(f"Timed out waiting for {CHECK_NAME} on {sha[:7]}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
