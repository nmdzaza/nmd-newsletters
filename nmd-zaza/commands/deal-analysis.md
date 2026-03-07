---
description: Run comps, calculate ARV and MAO, and generate a full wholesale deal memo
allowed-tools: WebSearch, WebFetch, Read, Write
argument-hint: [property address, estimated repairs, and any known details]
---

Analyze the following wholesale real estate deal: $ARGUMENTS

Load the `real-estate-wholesale` skill context and complete this full deal analysis:

## Step 1 — Comp Pull

Search Zillow (zillow.com), Redfin (redfin.com), and any available county assessor data for comparable sold properties:
- Within 0.5 miles of the subject property
- Same number of bedrooms and bathrooms (or ±1)
- Similar square footage (within ±20%)
- Sold within the last 6 months

Pull 3–5 comps. For each comp, record:
- Address
- Beds/Baths
- Square footage
- Sold price
- Sold date
- Price per square foot
- Distance from subject

## Step 2 — ARV Calculation

Calculate ARV (After Repair Value) as the weighted average of the best 3 comps. Weight more recent sales and closer comps higher.

## Step 3 — Deal Math

Use the following formulas:

**Conservative MAO** (65% rule):
```
MAO = (ARV × 0.65) − Estimated Repairs
```

**Standard MAO** (70% rule):
```
MAO = (ARV × 0.70) − Estimated Repairs
```

Also calculate:
- Potential assignment fee if offered at MAO (conservative): $5,000–$15,000 target
- Break-even point for end buyer
- Equity position (MAO vs. estimated market value)

## Step 4 — Deal Memo

Output a clean deal memo in this format:

```
WHOLESALE DEAL ANALYSIS
=======================
Property: [Address]
Date: [Today]

COMPS SUMMARY
[Table of comps]

VALUATION
ARV: $[amount]
Estimated Repairs: $[amount]
MAO (70%): $[amount]
MAO (65%): $[amount]

DEAL VERDICT
[Go / No-Go / Proceed with caution]
Reason: [1-2 sentence explanation]

RECOMMENDED OFFER: $[amount]
Assignment Fee Target: $[amount]
End Buyer Profit at Close: $[amount]

NOTES
[Any deal-specific flags — location, repair uncertainty, market trends]
```

## Step 5 — Next Steps

Based on the analysis, recommend:
- Whether to pursue the deal
- What price to offer the seller
- How to position the offer in conversation (reference `seller-scripts.md`)
- Who to send it to on the cash buyer list

Ask: "Want me to generate an offer letter or seller script for this deal?"
