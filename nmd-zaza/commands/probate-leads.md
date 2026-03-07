---
description: Search public court records for probate and motivated seller leads
allowed-tools: WebSearch, WebFetch, Read, Write, Bash
argument-hint: [county and state, e.g. "Orange County FL" or "Harris County TX"]
---

Search for probate and motivated seller leads from public court records for the following jurisdiction: $ARGUMENTS

Load the `lead-generation` skill and `real-estate-wholesale` skill context, then execute this workflow:

1. **Identify the court portal** — Search for "[jurisdiction] county recorder public records" and "[jurisdiction] probate court filings online". Find the direct URL.

2. **Search for these record types** (in priority order):
   - Probate filings (estate cases with real property)
   - Lis pendens / Notice of Default
   - Pre-foreclosure notices
   - Divorce filings with real property listed (if available)

3. **For each record found**, extract:
   - Decedent/owner name
   - Property address
   - Filing date
   - Case number
   - Executor/administrator name (for probate)
   - Attorney name and contact (if represented)

4. **Score motivation** (1–5 scale):
   - 5: Filed within 30 days, real property listed, no attorney
   - 4: Filed 30–90 days, property listed
   - 3: Filed 90–180 days or attorney involved
   - 2: Over 6 months old
   - 1: No property or case resolved

5. **Output a lead table** formatted as CSV-ready data:
```
first_name, last_name, address, city, state, zip, source, lead_type, case_number, filing_date, motivation_score, notes
```

6. **Recommend next steps** for the top 5 leads by motivation score — skip trace method, best contact approach (call, mail, door knock), and suggested outreach script from `seller-scripts.md`.

7. Ask: "Want me to add these to leads.csv, or run a skip trace on the top leads?"
