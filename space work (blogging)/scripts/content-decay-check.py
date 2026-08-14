#!/usr/bin/env python3
"""
Content decay dashboard for the Canada/UK/Australia blogs.

Pulls per-page Search Console position/impressions for the last 28 days and
the 28 days before that, for all three properties, and flags pages that are
sliding: position getting worse and/or impressions dropping, while still
having enough volume to matter. Meant to catch decay early -- before a page
falls off page 1 entirely -- rather than relying on someone noticing it in
a manual GSC pull.

Run with the blog-google skill's venv (has google-api-python-client):
    "blogging ressources/claude-blog/skills/blog-google/.venv/Scripts/python.exe" scripts/content-decay-check.py

Each property uses its own service account explicitly (does not touch the
shared ~/.config/claude-seo/google-api.json, which is scoped to Canada only
and would need editing per-country to reuse via the existing gsc_query.py).
"""

import json
import sys
from datetime import datetime, timedelta

from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

PROPERTIES = [
    {
        "name": "Canada",
        "site_url": "https://smallspacehome.ca/",
        "service_account": r"C:\Users\bader\.config\claude-seo\service_account_ca.json",
    },
    {
        "name": "UK",
        "site_url": "sc-domain:britishhomeinterior.co.uk",
        "service_account": r"C:\Users\bader\.config\claude-seo\service_account_uk.json",
    },
    {
        "name": "Australia",
        "site_url": "sc-domain:outdoorcoastalhome.com",
        "service_account": r"C:\Users\bader\.config\claude-seo\service_account_au.json",
    },
]

# Decay thresholds -- tuned for these low-traffic sites (see ANALYTICS.md logs:
# most positions are 20-90+, so a 5-position slide is meaningful, not noise).
MIN_IMPRESSIONS = 10  # ignore pages too small to have a reliable position
POSITION_DROP_THRESHOLD = 5.0  # position got at least this much worse
IMPRESSION_DROP_PCT = 0.35  # impressions fell by at least this fraction


def query_pages(site_url, sa_path, start_date, end_date):
    creds = service_account.Credentials.from_service_account_file(sa_path, scopes=SCOPES)
    service = build("searchconsole", "v1", credentials=creds)
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["page"],
        "rowLimit": 5000,
        "dataState": "final",
    }
    rows = []
    start_row = 0
    while True:
        body["startRow"] = start_row
        resp = service.searchanalytics().query(siteUrl=site_url, body=body).execute()
        batch = resp.get("rows", [])
        rows.extend(batch)
        if len(batch) < body["rowLimit"]:
            break
        start_row += body["rowLimit"]
    return {r["keys"][0]: r for r in rows}


def check_property(prop):
    # These sites are only weeks old (see ANALYTICS.md logs), so a 28-vs-28
    # comparison has no prior-period data yet. Use 14-vs-14 for now; widen
    # to 28-vs-28 once each site has ~2 months of history.
    today = datetime.now()
    end_recent = (today - timedelta(days=3)).strftime("%Y-%m-%d")
    start_recent = (today - timedelta(days=17)).strftime("%Y-%m-%d")
    end_prior = (today - timedelta(days=18)).strftime("%Y-%m-%d")
    start_prior = (today - timedelta(days=32)).strftime("%Y-%m-%d")

    try:
        recent = query_pages(prop["site_url"], prop["service_account"], start_recent, end_recent)
        prior = query_pages(prop["site_url"], prop["service_account"], start_prior, end_prior)
    except Exception as e:
        return {"name": prop["name"], "error": str(e), "flags": []}

    flags = []
    for page, r in recent.items():
        p = prior.get(page)
        if not p:
            continue
        pos_now, pos_before = r.get("position", 0), p.get("position", 0)
        imp_now, imp_before = r.get("impressions", 0), p.get("impressions", 0)
        if imp_before < MIN_IMPRESSIONS:
            continue

        pos_drop = pos_now - pos_before  # higher number = worse ranking
        imp_drop_pct = (imp_before - imp_now) / imp_before if imp_before else 0

        if pos_drop >= POSITION_DROP_THRESHOLD or imp_drop_pct >= IMPRESSION_DROP_PCT:
            flags.append({
                "page": page,
                "position_before": round(pos_before, 1),
                "position_now": round(pos_now, 1),
                "position_change": round(pos_drop, 1),
                "impressions_before": imp_before,
                "impressions_now": imp_now,
                "impressions_change_pct": round(imp_drop_pct * 100, 1),
            })

    flags.sort(key=lambda f: f["position_change"], reverse=True)
    return {"name": prop["name"], "error": None, "flags": flags,
            "window": {"recent": [start_recent, end_recent], "prior": [start_prior, end_prior]}}


def main():
    as_json = "--json" in sys.argv
    results = [check_property(p) for p in PROPERTIES]

    if as_json:
        print(json.dumps(results, indent=2))
        return

    print("=== Content Decay Check ===")
    print(f"Thresholds: position worse by >= {POSITION_DROP_THRESHOLD}, or impressions down >= {int(IMPRESSION_DROP_PCT*100)}%\n")

    any_flags = False
    for r in results:
        print(f"--- {r['name']} ---")
        if r["error"]:
            print(f"  ERROR: {r['error']}\n")
            continue
        if not r["flags"]:
            print("  No decaying pages found in this window.\n")
            continue
        any_flags = True
        for f in r["flags"]:
            print(f"  {f['page']}")
            print(f"    position: {f['position_before']} -> {f['position_now']} ({'+' if f['position_change']>=0 else ''}{f['position_change']})")
            print(f"    impressions: {f['impressions_before']} -> {f['impressions_now']} ({f['impressions_change_pct']}% change)")
        print()

    if not any_flags:
        print("Nothing flagged this run.")


if __name__ == "__main__":
    main()
