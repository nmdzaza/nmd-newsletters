---
description: Generate a complete real estate assignment of contract package — purchase agreement, assignment agreement, and buyer introduction letter — for a wholesale deal.
allowed-tools: Read, Write
argument-hint: "[property address] [seller name] [purchase price] [buyer name] [assignment fee]"
---

# Generate Assignment Contract Package

The user wants to create a wholesale deal assignment package. Generate all three documents needed to close an assignment deal.

## Step 1 — Gather Deal Details

Extract from the user's message or ask for:

| Field | Description |
|-------|-------------|
| Property Address | Full street address, city, state, zip |
| Seller Name | Legal name as it appears on title |
| Seller Phone | For contract |
| Purchase Price | Price you agreed to pay seller (your contract price) |
| Earnest Money | Deposit amount (typically $100–$500 for wholesale) |
| Closing Date | Target close date (typically 14–21 days out) |
| End Buyer Name | Name of the investor buying from you |
| End Buyer Phone/Email | For buyer intro letter |
| Assignment Fee | Your profit (End Buyer Price − Seller Contract Price) |
| End Buyer Price | Total price end buyer pays |
| Title Company | Name and contact (use buyer's title company if they have one) |

If any fields are missing, use `[FIELD]` placeholders and note them at the top.

## Step 2 — Generate Document 1: Purchase and Sale Agreement

```
REAL ESTATE PURCHASE AND SALE AGREEMENT
(With Assignment Rights)

Date: [DATE]

BUYER: NMD ZAZA (and/or assigns)
Address: ______________________________
Phone: ________________________________

SELLER: [SELLER NAME]
Property Address: [PROPERTY ADDRESS]
City, State, Zip: [CITY, STATE, ZIP]

PURCHASE PRICE: $[PURCHASE PRICE]

EARNEST MONEY DEPOSIT: $[EARNEST MONEY], due within 3 business days of execution,
to be held by [TITLE COMPANY].

CLOSING DATE: On or before [CLOSING DATE].

INSPECTION PERIOD: Buyer shall have [7] days from execution to inspect the property.
Buyer may cancel for any reason during inspection period and receive full refund of
earnest money.

PROPERTY CONDITION: Property sold AS-IS. Seller makes no warranties as to condition.

ASSIGNMENT: Buyer reserves the right to assign this contract to any third party
without Seller's consent. Seller agrees to cooperate with any assigned buyer.

CLOSING COSTS: Each party responsible for their own closing costs unless otherwise
agreed. Seller to pay any outstanding liens, taxes, and judgments from proceeds.

POSSESSION: At closing.

TITLE: Seller to convey marketable title via general warranty deed, free and clear
of all encumbrances except current year taxes.

___________________________          ___________________________
BUYER Signature / Date               SELLER Signature / Date

NMD ZAZA (and/or assigns)           [SELLER NAME]
```

## Step 3 — Generate Document 2: Assignment of Contract Agreement

```
ASSIGNMENT OF REAL ESTATE PURCHASE CONTRACT

Date: [DATE]

ASSIGNOR: NMD ZAZA ("Assignor")
ASSIGNEE: [END BUYER NAME] ("Assignee")

RE: Purchase Contract dated [ORIGINAL CONTRACT DATE]
    Property: [PROPERTY ADDRESS], [CITY, STATE, ZIP]
    Original Seller: [SELLER NAME]
    Contract Purchase Price: $[PURCHASE PRICE]

ASSIGNMENT FEE: $[ASSIGNMENT FEE]

Assignor hereby assigns all rights, title, and interest in the above-referenced
Purchase and Sale Agreement to Assignee.

Assignee accepts this assignment and agrees to:
1. Pay the Assignment Fee of $[ASSIGNMENT FEE] to Assignor at closing
2. Close on or before [CLOSING DATE]
3. Pay the original contract price of $[PURCHASE PRICE] to Seller
4. Total funds required at closing: $[END BUYER PRICE]

The Assignment Fee shall be paid directly to Assignor at closing via the
title company/closing attorney.

Assignee understands they are purchasing this contract AS-IS and has performed
their own due diligence.

___________________________          ___________________________
ASSIGNOR Signature / Date            ASSIGNEE Signature / Date

NMD ZAZA                             [END BUYER NAME]
```

## Step 4 — Generate Document 3: End Buyer Introduction Letter

```
[DATE]

To: [END BUYER NAME]
Re: Investment Property — [PROPERTY ADDRESS]

[BUYER NAME],

I'm pleased to present you with this wholesale acquisition opportunity:

PROPERTY DETAILS
----------------
Address:        [PROPERTY ADDRESS], [CITY, STATE, ZIP]
Asking Price:   $[END BUYER PRICE] (includes assignment fee)
ARV:            $[ARV] (based on comps — see attached)
Est. Repairs:   $[REPAIR ESTIMATE]
After-Repair Net: ~$[ARV - END BUYER PRICE - REPAIRS] profit potential

YOUR NUMBERS
------------
Purchase Price:     $[END BUYER PRICE]
Estimated Repairs:  $[REPAIR ESTIMATE]
Total In:           $[END BUYER PRICE + REPAIRS]
ARV:                $[ARV]
Estimated Profit:   $[PROFIT]
ROI:                ~[ROI]%

DEAL OVERVIEW
-------------
[2–3 sentences describing the property, condition, neighborhood, and why it's a deal]

NEXT STEPS
----------
1. Review and sign the Assignment Agreement (attached)
2. Submit proof of funds or hard money commitment letter to title company
3. Close on or before [CLOSING DATE]

Title Company: [TITLE COMPANY NAME] — [TITLE COMPANY CONTACT]

Ready to move forward? Reply or call me at [YOUR PHONE].

Let's close this deal,

Cameron Johnson
NMD ZAZA
[YOUR PHONE] | camjohn816@gmail.com
```

## Step 5 — Output Summary

After generating all three documents, provide:

```
DEAL SUMMARY
============
Property:       [ADDRESS]
Seller Price:   $[PURCHASE PRICE]
End Buyer:      $[END BUYER PRICE]
Assignment Fee: $[ASSIGNMENT FEE]
Close Date:     [DATE]
Title:          [TITLE COMPANY]

DOCUMENTS GENERATED:
✅ Purchase & Sale Agreement (with assignment clause)
✅ Assignment of Contract
✅ End Buyer Introduction Letter

NEXT STEPS:
1. Get Seller to sign Purchase & Sale Agreement
2. Collect earnest money ($[AMOUNT]) — send to title company
3. Send Assignment Agreement + Intro Letter to [END BUYER NAME]
4. Follow up with title company to confirm receipt
```

## Notes

- Always use "and/or assigns" after Buyer name in the purchase agreement
- Earnest money should be non-refundable after inspection period ends
- If doing a double-close instead of assignment, flag it and note buyer will need to fund the A→B leg
- Recommend user have a real estate attorney review contracts for their state
- If user needs a state-specific contract, note which state and reference the `contracts.md` reference file
