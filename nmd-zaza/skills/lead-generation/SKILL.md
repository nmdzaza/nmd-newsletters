---
name: lead-generation
description: >
  Use this skill when searching for leads from public records and court filings.
  Triggers include: "search public court records", "find probate filings", "pull court leads",
  "find people with judgments", "search PACER", "find bankruptcy filings", "foreclosure leads",
  "find motivated sellers from court records", "search county recorder", "find lis pendens",
  "generate leads from public data", "scrape public records for leads".
version: 0.1.0
---

# Lead Generation from Public Records

NMD ZAZA uses public court and government filings as a primary lead source across multiple business lines — real estate wholesale, credit repair referrals, and car sales (repo/bankruptcy targets).

## Core Record Types by Business Line

| Record Type | Source | Best For |
|-------------|--------|----------|
| Probate filings | County courthouse | RE wholesale |
| Lis pendens / NOD | County recorder | RE wholesale, mortgage leads |
| Bankruptcy (Ch. 7 / Ch. 13) | PACER | RE wholesale, credit repair referrals |
| Civil judgments | County court | Credit repair referrals |
| Foreclosure auction | County sheriff / trustee | RE wholesale |
| Vehicle repossession orders | County court | Car sales conquest |
| Divorce filings | County court | RE wholesale, motivated sellers |

## PACER (Federal Court Records)

PACER = Public Access to Court Electronic Records. Covers all federal bankruptcy cases.

- URL: pacer.gov (account required, $0.10/page, free under $30/quarter)
- Search by: name, ZIP code, filing date range, case type
- Best searches for NMD: Chapter 7 (liquidation) and Chapter 13 (reorganization) — pull name, address, case number, attorney
- Download docket + schedule of assets to see real property listed
- Filter: cases filed within last 90 days, asset cases (not no-asset)

## County Recorder / Court Portal

Most counties have free online search portals.

Search method:
1. Google: "[County Name] county recorder online search" or "[County] clerk of courts public records"
2. Navigate to real property or civil records
3. Search document types: "Lis Pendens", "Notice of Default", "Probate", "Foreclosure"
4. Filter by date range (last 30–90 days)
5. Download or copy: grantor/grantee name, property address, filing date, case number

High-volume counties often export to CSV — always check for bulk download.

## Lead Extraction Workflow

1. Identify target record type and jurisdiction
2. Access portal (PACER, county recorder, state court website)
3. Search and filter by date, type, geography
4. Extract: name, address, phone (if listed), case/file number, filing date
5. Append phone/email via skip trace (see real-estate-wholesale skill)
6. Score leads by motivation indicators (recency, asset value, case status)
7. Import to leads.csv with source tag

## Motivation Scoring

Score each lead 1–5:
- **5**: Filed within 30 days + real property listed + no attorney (pro se)
- **4**: Filed 30–90 days + property listed
- **3**: Filed 90–180 days or attorney involved
- **2**: Over 6 months old or no property
- **1**: No contact info or case resolved

## Credit Repair Lead Identification

People with civil judgments, charge-offs, or active collections are prime credit repair referral leads.
- County civil court: search for consumer debt judgments under $10,000
- Pull defendant name and address
- Cross-reference with bankruptcy filings — means they have multiple issues
- Outreach: "We help people with judgments and collections fix their credit and qualify for financing"

## Car Sales Lead Identification

Bankruptcy filers who list a vehicle in their schedule of assets may be in need of a new vehicle after discharge.
- Filter Chapter 7 discharges 6–12 months old (post-discharge = eligible for auto financing again)
- Pull name, zip code
- Outreach: "Congratulations on your fresh start — you may now qualify for auto financing"

## Output Format

Always output leads in this CSV structure:
```
first_name, last_name, address, city, state, zip, phone, email, source, lead_type, record_type, case_number, filing_date, motivation_score, status, notes
```

## Automation Notes

- Use web search tools to find county portals for any jurisdiction
- For bulk processing, Python + BeautifulSoup or Playwright can automate structured county portals
- Always respect robots.txt and rate limits — use slow crawl (1 req/3sec) on government sites
- PACER bulk data: PACER Case Locator API available for registered accounts
