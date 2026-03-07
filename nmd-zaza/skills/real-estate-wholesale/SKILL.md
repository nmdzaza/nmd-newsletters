---
name: real-estate-wholesale
description: >
  Use this skill for any real estate wholesaling workflow. Triggers include:
  "find probate leads", "pull cash buyers", "skip trace this owner", "run comps",
  "analyze this deal", "calculate ARV", "calculate MAO", "write an offer letter",
  "write a seller script", "create a mailer campaign", "generate assignment contract",
  "find mortgage leads", "wholesale deal", "real estate wholesale", "motivated seller".
version: 0.1.0
---

# Real Estate Wholesale AI

Full end-to-end wholesale workflow for NMD ZAZA. Covers every stage from lead sourcing through closing.

## Deal Pipeline Stages

1. Lead sourcing (probate, cash buyers, motivated sellers, mortgage leads)
2. Skip tracing (owner contact info)
3. Comps + ARV calculation
4. Deal analysis (MAO, profit margin)
5. Seller outreach (scripts, offer letters)
6. Mailer campaigns
7. Contract generation (assignment contract)

## Key Formulas

**ARV** (After Repair Value): Estimated market value after full renovation. Pull 3–5 comparable sales within 0.5 miles, same bed/bath count, sold within 6 months.

**MAO** (Maximum Allowable Offer):
```
MAO = (ARV × 0.70) − Estimated Repair Costs
```
Conservative: use 0.65 instead of 0.70 for thinner markets or higher repair uncertainty.

**Assignment fee target**: $5,000–$15,000 minimum. Back into this from MAO.

**Equity position check**: Only pursue if seller owes less than 80% of ARV.

## Lead Types

See `references/lead-sources.md` for sourcing strategies per lead type.

- **Probate leads**: Decedents' estates — heirs often motivated to sell quickly
- **Pre-foreclosure**: NOD (Notice of Default) filings, 30–120 days before auction
- **Cash buyers**: Investors who buy without financing — your end buyers
- **Absentee owners**: Non-owner-occupied properties with equity
- **Tax delinquent**: Owners behind on property taxes — high motivation
- **Mortgage leads**: Homeowners with high LTV or adjustable-rate distress

## Skip Tracing Protocol

1. Start with property address from lead list
2. Pull owner name from county assessor records
3. Run skip trace via TruePeopleSearch, BeenVerified, or BatchSkipTracing
4. Collect: cell phone, email, mailing address
5. Verify number is active before dialing
6. Log results to leads.csv: `name, address, phone, email, source, status`

## Comps Analysis

Pull comps from:
- Zillow (sold listings, filter last 6 months)
- Redfin (sold tab)
- County assessor/MLS if accessible
- PropStream or Propwire for investor-grade data

Comp criteria: ±20% sq ft, same bed/bath, ≤0.5 miles, sold ≤6 months ago.
Report: address, sq ft, bed/bath, sold price, sold date, price/sq ft.
ARV = weighted average of 3–5 best comps.

## Offer Letter Tone

- Direct but respectful
- Acknowledge their situation without being predatory
- Lead with cash, fast close, no repairs needed, no realtor fees
- Always give two options: cash offer or subject-to/creative finance
- See `references/seller-scripts.md` for full phone and door-knock scripts

## Mailer Campaign Workflow

1. Pull target list (probate, absentee, tax delinquent) — minimum 500 addresses
2. Segment by lead type and motivation score
3. Select template from `references/mailer-templates.md`
4. Format for print or mail merge (CSV)
5. Send via Click2Mail, PostcardMania, or local printer
6. Track response rate — target 1–3% call-back rate
7. Follow up non-responders at 30/60/90 days

## Assignment Contract

Standard wholesale assignment contract transfers equitable interest from wholesaler to end buyer.
Key clauses: assignment fee, closing date, earnest money, inspection period.
See `references/contracts.md` for full template.

## Mortgage Leads

Target: homeowners with ARM loans resetting, high DTI, or 90+ day late payments.
Source: HMDA data, PACER bankruptcy filings, county recorder lis pendens filings.
Offer: quick cash buyout or short sale negotiation.
