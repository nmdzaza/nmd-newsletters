---
name: nmd-products
description: >
  Use this skill for managing NMD ZAZA's products, content site, and services.
  Triggers include: "NMD products", "AI Employee Blueprint", "Vibe Build with NMD",
  "Done-for-You Solutions", "Gumroad", "creditintelligence.com", "publish an article",
  "credit intelligence site", "update product listing", "write a product description",
  "write a sales page", "product launch", "upsell sequence", "Done-for-You client",
  "retainer client", "onboard a client", "manage my services", "business operations".
version: 0.1.0
---

# NMD Products and Business Operations

NMD ZAZA operates three primary revenue products plus the credit intelligence content site.

## Product Catalog

### AI Employee Blueprint — $47

**What it is**: A step-by-step guide for using Claude (AI) to run business operations — email, client communication, content creation, and lead generation — without hiring staff.

**Who it's for**: Solopreneurs, small business owners, freelancers who want to automate their work using AI.

**Gumroad URL**: [Update with live link]

**Sales page headline**: "The $47 System That Replaced My $3,000/Month Assistant"

**Key benefits**:
- Run your entire business from one AI session
- Generate leads, write emails, create content in minutes
- Works for credit repair, car sales, real estate, any service business
- Instant download, lifetime access, updated regularly

**Upsell**: After purchase → Vibe Build with NMD

---

### Vibe Build with NMD — $197

**What it is**: 4 live sessions where NMD personally builds your AI business system with you — customized to your business, your tools, your workflows.

**Who it's for**: Business owners who bought the Blueprint but want hands-on implementation help, or who want a fully customized AI stack built for their specific business.

**Gumroad URL**: [Update with live link]

**Sales page headline**: "I'll Build Your AI Business System With You — Live, 4 Sessions, $197"

**Key benefits**:
- 4 x 60-minute screen-share sessions
- Custom Claude skills and workflows built for your business
- Templates, scripts, and prompts you keep forever
- Post-session support via Telegram

**Upsell**: After Vibe Build → Done-for-You Solutions retainer

---

### Done-for-You Solutions — Monthly Retainer

**What it is**: NMD runs your AI-powered business operations for you on a monthly retainer. You focus on clients; NMD handles the systems, content, outreach, and automation.

**Who it's for**: Business owners generating revenue who want to scale without hiring — or those who don't have time to learn the tools themselves.

**Pricing**: Starting at $500/month (custom scoped)

**Booking**: 15-minute discovery call — book via [calendar link]

**Services included** (customized per client):
- AI-powered lead generation
- Email and social content creation
- Client communication management
- Newsletter management
- Custom Claude plugin/skill setup

---

## creditintelligence.com Content Site

**Platform**: GitHub Pages (static site)
**Purpose**: SEO content → email list → product sales funnel
**Article topics**: FICO scores, dispute letters, CFPB rights, Capital One gap, business credit, AI for finance

### Article Publishing Workflow

1. Generate article using `social-engine` skill or directly
2. Format as Markdown (.md file)
3. Add frontmatter: title, date, description, tags
4. Commit to GitHub repo → auto-publishes to site
5. Share to social + newsletter

### Frontmatter template:
```markdown
---
layout: post
title: "How to Dispute Collections with the CFPB (Step-by-Step)"
date: 2026-01-15
description: "Use this exact process to dispute collections directly with the CFPB and get faster results than mailing dispute letters."
tags: [credit-repair, dispute-letters, CFPB, collections]
---
```

### SEO Targets (High-Value Keywords)

- "how to dispute collections" (high volume, transactional)
- "FICO score hack" (viral potential)
- "609 dispute letter template" (direct download CTA)
- "business credit with EIN" (B2B segment)
- "Capital One credit building" (brand-specific traffic)
- "AI credit repair" (emerging, NMD owns this space)

## Client Onboarding (Done-for-You)

When a new Done-for-You client is onboarded:

1. Send welcome email + Telegram invite
2. Complete intake form (business type, current tools, goals, pain points)
3. Audit their current workflow and identify automation opportunities
4. Build custom Claude plugin/skills for their specific use case
5. Set up weekly check-in cadence
6. Deliver first month deliverables within 14 days

## Revenue Tracking

Track in leads.csv or Supabase:
- Product: AI Employee Blueprint / Vibe Build / DFY
- Sale date
- Amount
- Gumroad transaction ID
- Client name and email
- Status: purchased / onboarded / active / churned

## Gumroad Operations

- Products live at gumroad.com/nmdzaza (or your Gumroad profile)
- Update product descriptions and prices directly in Gumroad dashboard
- Email buyers through Gumroad built-in email tool for post-purchase sequences
- Coupon codes for launches: format `LAUNCH30` (30% off), `VIP47` (fixed price)
