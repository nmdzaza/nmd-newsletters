---
description: Skip trace a real estate lead — find owner contact info (phone, email, current address) using free and paid sources, then output a ready-to-call contact record.
allowed-tools: WebSearch, WebFetch, Read, Write, Bash
argument-hint: "[owner name] [last known address or property address]"
---

# Skip Trace Lead

The user wants to skip trace a property owner or lead. Your job is to find current contact information for this person so they can be called or mailed.

## Step 1 — Parse the Input

Extract from the user's message:
- Owner name (first + last)
- Property address or last known address
- City / state / zip if provided

## Step 2 — Free Sources (Run First)

Search these in order and note any results found:

1. **Whitepages / Spokeo / FastPeopleSearch**
   - Search: `"[Full Name]" "[city, state]" phone`
   - Look for: current phone numbers, current address, relatives

2. **Facebook / LinkedIn**
   - Search: `"[Full Name]" "[city]"` on each platform
   - Look for: profile, employer, contact info in bio

3. **Google**
   - Search: `"[Full Name]" "[property address]"`
   - Search: `"[Full Name]" "[city]" contact OR phone OR email`
   - Look for: any public mentions, business listings, social profiles

4. **County Property Appraiser**
   - Search: `[county] property appraiser "[owner name]"` or `site:[county].gov "[owner name]"`
   - Look for: mailing address (often different from property address if absentee owner)

5. **Business Registrations**
   - Search: `[state] LLC search "[Full Name]"` (e.g., Florida SunBiz, Texas SOS)
   - Look for: registered agent address, business phone

## Step 3 — Paid Sources (If Free Sources Come Up Empty)

Recommend these services to the user if free sources don't yield a current phone:

| Service | Best For | Cost |
|---------|----------|------|
| BatchSkipTracing | Bulk RE leads | ~$0.18/record |
| PropStream | RE wholesalers (includes skip trace) | ~$99/mo |
| TLOxp | Deep skip trace | ~$1–3/record |
| BeenVerified | Consumer lookup | ~$26/mo |
| Spokeo Pro | Email + phone | ~$14/mo |

## Step 4 — Compile Contact Record

Output this table for the lead:

```
SKIP TRACE RESULT
=================
Name:            [Full Name]
Property:        [Property Address]
Mailing Address: [Current mailing address if different]
Phone 1:         [Best number] — [source]
Phone 2:         [Secondary number if found] — [source]
Email:           [Email if found] — [source]
Relatives:       [Names of relatives / associated contacts]
Confidence:      High / Medium / Low
Last Verified:   [Date of most recent source]
Notes:           [Any relevant flags — deceased, LLC-owned, tenant-occupied, etc.]
```

## Step 5 — Recommended Next Action

Based on confidence level:

- **High confidence** → "Ready to call. Load script from real-estate-wholesale skill → cold call opening."
- **Medium confidence** → "Try calling — if no answer, send direct mail using mailer-campaign command."
- **Low confidence** → "Recommend BatchSkipTracing bulk upload for accurate results. Export lead to leads.csv first."

## Step 6 — Save to leads.csv (Optional)

If the user says "save this lead" or "add to CSV", append a new row to `leads.csv` using this format:

```
first_name,last_name,property_address,mailing_address,phone1,phone2,email,lead_type,motivation_score,status,notes
```

Set `status` to `skip_traced` and `motivation_score` to whatever was assessed from court records (or ask user to rate 1–5).

## Important Notes

- Never claim 100% certainty on skip trace results — always note the source
- If owner appears deceased, flag clearly and suggest probating heirs search
- If property is LLC-owned, skip trace the LLC registered agent instead of a person
- Always recommend the user verify phone number before calling to avoid TCPA issues
