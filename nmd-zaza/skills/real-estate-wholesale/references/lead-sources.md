# Real Estate Lead Sources

## Probate Leads

**What they are**: When someone dies, their estate goes through probate court. Heirs often want to liquidate real estate quickly.

**Where to find them**:
- County courthouse probate filings (in-person or online via county recorder portal)
- PACER (federal bankruptcy court — separate from probate but overlapping motivation)
- Probate leads services: MLS Leads, REDX Probate, US Probate Leads
- Search: "[County Name] probate court records" + year

**What to look for**: Estate listings with real property, executor/administrator contact info, filing date (fresher = better)

**Script hook**: "Hi, I'm calling about the property at [address]. I understand the estate may be looking to sell — I buy properties for cash and can close in as little as 14 days."

---

## Pre-Foreclosure / NOD Leads

**What they are**: Homeowners who have received a Notice of Default — they're behind on payments and have 30–120 days before the property goes to auction.

**Where to find them**:
- PACER (lis pendens, foreclosure filings)
- County recorder website — search "Notice of Default" or "Lis Pendens"
- RealtyTrac, ATTOM Data
- PropStream — pre-foreclosure filter

**Timing**: Best window is 30–90 days after NOD filing. Too early = owner in denial. Too late = attorney involved.

---

## Cash Buyer Lists

**What they are**: Real estate investors who buy without bank financing — these are your end buyers for wholesale deals.

**Where to find them**:
- County recorder: search deed transfers with "cash" or no mortgage recorded
- BiggerPockets — post in your market looking for buyers
- Real estate investor meetups (REIA groups)
- Facebook Groups: "[City] Real Estate Investors"
- Craigslist: post "3/2 investor special, cash only, 14-day close" and collect inbound

**What to collect**: Name, email, phone, buying criteria (areas, property types, price range, volume/month)

**Maintain in**: cash-buyers.csv — update after every deal

---

## Absentee Owner Leads

**Where to find them**:
- County assessor records: mailing address ≠ property address
- PropStream — absentee owner filter
- ListSource, DataTree

**Best targets**: High equity (owned 10+ years), out-of-state owner, single-family or small multi

---

## Tax Delinquent Leads

**Where to find them**:
- County tax assessor/collector website — delinquent tax list (often published annually)
- Some counties sell the list; others post it publicly
- Search: "[County] delinquent property tax list [year]"

**Note**: Many states have redemption periods. Know your state's timeline.

---

## Mortgage / Distress Leads

**Sources**:
- HMDA (Home Mortgage Disclosure Act) data — public, downloadable from CFPB
- Lis pendens filings — loan default notices at county recorder
- PACER Chapter 7/13 bankruptcy filings with real property schedules
- Listsource — filter by 90-day late, ARM loans, high LTV

---

## Lead Tracking (leads.csv)

Standard columns:
```
first_name, last_name, address, city, state, zip, phone, email, source, lead_type, status, contacted_date, notes
```

Status values: `new`, `contacted`, `appointment`, `offer_sent`, `under_contract`, `closed`, `dead`
