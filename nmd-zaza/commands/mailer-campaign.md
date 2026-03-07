---
description: Build a targeted direct mail campaign for motivated seller leads
allowed-tools: Read, Write, WebSearch
argument-hint: [lead type, target area, number of mailers, optional: specific message angle]
---

Create a direct mail campaign based on the following details: $ARGUMENTS

Load the `real-estate-wholesale` skill context and produce a complete campaign package:

## Step 1 — Campaign Brief

Identify from the input:
- Lead type (probate, pre-foreclosure, absentee owner, tax delinquent, general motivated seller)
- Target area (city, county, or ZIP codes)
- Volume (number of mailers)
- Message angle (if specified) or recommend the best angle for the lead type

## Step 2 — Template Selection

Select the most appropriate template from the mailer reference data:
- Probate/Estate → Template 1 (compassionate, respectful tone)
- Pre-foreclosure/NOD → Template 2 (urgent, solution-focused)
- Absentee owner / general → Template 3 (direct, value-focused)
- High volume blitz → Postcard template

Customize the selected template with any specific details provided.

## Step 3 — Campaign Output

Generate the following:

**A. Customized mailer copy** — ready to print or upload to mail service. Fill in all placeholders except `[Name]` and `[Address]` (those are mail-merge fields).

**B. Mail merge CSV structure** — provide the exact column headers needed for the mail merge:
```
first_name, last_name, address, city, state, zip, lead_type, template
```

**C. Recommended mail service** — based on volume and lead type:
- Under 100 pieces: Yellow Letters Complete (highest response for probate)
- 100–500 pieces: Click2Mail (easy online mail merge)
- 500+ pieces: PostcardMania or local commercial printer
- Neighborhood blitz: USPS EDDM (Every Door Direct Mail) — no names needed

**D. Follow-up sequence** — recommended touchpoint schedule:
- Mailer 1: Week 1
- Mailer 2: Week 3 (different template or color)
- Follow-up call: Week 4 (for any who called in but didn't commit)
- Mailer 3: Week 6 (final touch)

**E. Response tracking setup** — recommended fields for tracking inbound calls from this campaign:
- Caller name and number
- Property address they're calling about
- Level of motivation (hot/warm/cold)
- Next step agreed upon

## Step 4 — Campaign Summary

Provide a one-paragraph campaign summary:
- Total pieces, lead type, target market
- Expected response rate (1–3% typical; 3–5% for yellow letters to probate)
- Estimated cost range based on mail service recommended
- Projected lead volume from campaign

Ask: "Do you have a list of addresses ready, or do you need help sourcing [lead type] addresses in [area]?"
