# nmd-zaza Plugin

**Version:** 0.1.0
**Author:** NMD ZAZA
**Repository:** https://github.com/nmdzaza/nmd-plugins

---

## Overview

The `nmd-zaza` plugin is the full business AI suite for NMD ZAZA — covering real estate wholesale, public records lead generation, social media engine, Telegram market bot, newsletter writing, and product/content operations.

This plugin is designed to work alongside the existing `car-sales-suite` and `credit-repair-pro` plugins, covering all remaining NMD ZAZA business verticals that those plugins don't handle.

---

## Skills

### `nmd-zaza:real-estate-wholesale`
Full real estate wholesale workflow — probate leads, cash buyers, skip tracing, comps, ARV/MAO calculations, deal analysis, offer writing, seller scripts, mailer campaigns, and assignment contracts.

**Trigger phrases:** "find probate leads", "pull cash buyers", "skip trace", "run comps", "analyze this deal", "calculate ARV", "calculate MAO", "write an offer letter", "generate a mailer", "build assignment contract"

---

### `nmd-zaza:lead-generation`
Public court records lead generation — searches PACER, county recorders, probate filings, lis pendens, pre-foreclosure, bankruptcy, civil judgments, and vehicle repossession filings. Cross-applies to credit repair and car sales lead pools.

**Trigger phrases:** "search public court records", "find probate filings", "pull court leads", "search PACER", "find bankruptcy filings", "get lis pendens leads", "find distressed sellers from court records"

---

### `nmd-zaza:social-engine`
Cross-platform social media posting engine. Takes one piece of content and generates platform-optimized posts for Instagram, Facebook, X (Twitter), LinkedIn, GitHub Pages blog, email newsletter, and Higgsfield AI video hook.

**Trigger phrases:** "post to all platforms", "cross-post this", "social media blast", "generate a Higgsfield video hook", "create social content", "write posts for all channels"

---

### `nmd-zaza:market-bot`
NMD Market Telegram bot suite — marketplace listings, AI assistant (Groq + llama-3.1-70b-versatile), article generation bot, escrow system, trust scoring. Backed by Supabase (`nmd_market` database).

**Trigger phrases:** "NMD Market", "Telegram bot", "market bot", "Groq bot", "update the bot", "add a listing", "escrow", "bot message", "bot command"

---

### `nmd-zaza:newsletter-engine`
Email newsletter writing for NMD ZAZA audiences — credit repair, real estate, AI/automation, and product-focused sends. Includes welcome sequence, subject line formulas, product CTAs, and Gmail send prep.

**Trigger phrases:** "write a newsletter", "create an email newsletter", "send newsletter", "weekly roundup", "welcome sequence", "email blast", "write my email list"

---

### `nmd-zaza:nmd-products`
NMD ZAZA product catalog and operations — AI Employee Blueprint ($47), Vibe Build with NMD ($197), Done-for-You retainer. Also handles creditintelligence.com article publishing, Gumroad operations, and client onboarding.

**Trigger phrases:** "AI Employee Blueprint", "Vibe Build with NMD", "Done-for-You Solutions", "publish an article", "creditintelligence.com", "Gumroad", "onboard a client"

---

## Commands

| Command | What It Does |
|---------|-------------|
| `/social-post` | Cross-post content to all 7 platforms + Higgsfield hook |
| `/probate-leads` | Search public records for motivated sellers in a jurisdiction |
| `/deal-analysis` | Pull comps, calculate ARV + MAO, output deal memo |
| `/offer-letter` | Generate cash offer letter + seller phone script |
| `/mailer-campaign` | Build mailer campaign with templates + mail merge CSV |
| `/skip-trace` | Find owner contact info from free + paid sources |
| `/assignment-contract` | Generate full assignment package (3 documents) |
| `/newsletter` | Write complete newsletter with subject, preview, body, CTA |
| `/publish-article` | Write SEO article + GitHub Pages frontmatter + deploy instructions |

---

## Tools Used

- **iMessage / SMS** — seller outreach, client follow-up
- **Gmail** — newsletter sends, client communications
- **Telegram** — NMD Market bot interface
- **Supabase** — `nmd_market` database for bot data
- **Groq API** — `llama-3.1-70b-versatile` for bot AI responses
- **GitHub Pages** — creditintelligence.com blog
- **Gumroad** — product sales
- **Higgsfield AI** — video content hooks
- **leads.csv** — CRM flat file for all lead types
- **PACER** — federal court records
- **County recorder portals** — local probate, lis pendens, pre-foreclosure

---

## Existing Plugins (Do Not Duplicate)

These workflows are already covered by separate installed plugins:

- **`car-sales-suite`** — All car dealership lead management, outreach, and follow-up
- **`credit-repair-pro`** — Credit report analysis, dispute letters, client updates

---

## Installation

1. Download `nmd-zaza.plugin` from https://github.com/nmdzaza/nmd-plugins
2. In Claude Desktop → Settings → Plugins → Install from file
3. Select `nmd-zaza.plugin`
4. Skills and commands will be available immediately

---

## File Structure

```
nmd-zaza/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── real-estate-wholesale/
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── lead-sources.md
│   │       ├── seller-scripts.md
│   │       ├── mailer-templates.md
│   │       └── contracts.md
│   ├── lead-generation/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── court-records-sources.md
│   ├── social-engine/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── platform-specs.md
│   ├── market-bot/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── bot-architecture.md
│   ├── newsletter-engine/
│   │   └── SKILL.md
│   └── nmd-products/
│       └── SKILL.md
├── commands/
│   ├── social-post.md
│   ├── probate-leads.md
│   ├── deal-analysis.md
│   ├── offer-letter.md
│   ├── mailer-campaign.md
│   ├── skip-trace.md
│   ├── assignment-contract.md
│   ├── newsletter.md
│   └── publish-article.md
└── README.md
```

---

## License

Private — NMD ZAZA internal use only.
