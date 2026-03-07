# Court Records Sources by State

## Universal Sources (All States)

| Source | URL | Record Types | Cost |
|--------|-----|--------------|------|
| PACER | pacer.gov | Federal bankruptcy, civil | $0.10/page |
| RECAP Archive | courtlistener.com | Federal (PACER mirror) | Free |
| UniCourt | unicourt.com | Multi-state court data | Paid |
| CourtListener | courtlistener.com | Federal + some state | Free |

## State-Specific Portals (Major Markets)

### Florida
- Orange County: myorangeclerk.com
- Miami-Dade: miami-dadeclerk.com
- Hillsborough: hcclerk.org
- Probate: search "Probate" in case type filter

### Texas
- Travis County: traviscountytx.gov/courts
- Dallas: dallascountytx.gov/courts
- Harris (Houston): hcdistrictclerk.com

### Georgia
- Fulton County: fultoncountyga.gov/courts
- Gwinnett: gwinnettcourts.com

### California
- LA Superior Court: lacourt.org
- San Diego: sdcourt.ca.gov
- Sacramento: saccourt.ca.gov

### Illinois
- Cook County (Chicago): cookcountyclerkofcourt.org

## Finding Any County Portal

Use this search template:
```
"[County Name] county [clerk of courts OR recorder OR assessor] public records search"
```

Or use: publicrecords.onlinesearches.com as a directory.

## Bulk Data Sources

- **ATTOM Data**: attomdata.com — nationwide property + foreclosure + lien data (paid)
- **PropStream**: propstream.com — investor-grade, includes pre-foreclosure, tax delinquent, absentee
- **BatchLeads**: batchleads.io — bulk skip tracing + list pulling
- **Propwire**: propwire.com — free tier available, nationwide property data
- **LandVoice**: landvoice.com — FSBO, expired, pre-foreclosure

## PACER Search Tips

1. Go to pacer.gov → Case Locator
2. Search type: Bankruptcy
3. Filed date: last 90 days
4. State/district: your target market
5. Nature of suit: leave blank for all
6. Export results to CSV when available
7. Filter in Excel: keep cases with real property in Schedule A/B

## CSV Import Checklist

Before importing to leads.csv:
- [ ] Deduplicate by address
- [ ] Verify address is residential (not commercial)
- [ ] Remove cases with attorney representation (harder to reach directly)
- [ ] Flag cases older than 90 days as lower priority
- [ ] Add `source` column with record type + county
