---
description: Write and publish an SEO-optimized article to creditintelligence.com — research the topic, write the full post, generate GitHub Pages frontmatter, and provide deployment instructions.
allowed-tools: Read, Write, WebSearch, WebFetch, Bash
argument-hint: "[article topic or keyword]"
---

# Publish Article to creditintelligence.com

The user wants to write and publish a new article on creditintelligence.com (hosted on GitHub Pages). Follow this workflow to produce a complete, SEO-ready post.

## Step 1 — Keyword Research

Take the topic from the user's message. Run a quick search to find:
- Search volume signal (are people searching this?)
- Top-ranking articles (what's already out there?)
- Long-tail keyword variations (e.g., "how to dispute medical bills on credit report")
- Related questions (for H2 subheadings and FAQ section)

Search: `"[topic]" credit repair OR credit score -site:creditintelligence.com`

Note: 2–3 target keywords and the primary keyword to optimize for.

## Step 2 — Outline the Article

Generate a structured outline before writing:

```
TITLE: [SEO Title — include primary keyword near the front, ~60 chars]
URL SLUG: /[kebab-case-slug]
META DESCRIPTION: [150–160 chars, includes primary keyword, reads naturally]
TARGET KEYWORD: [primary keyword]
SECONDARY KEYWORDS: [2–3 related terms]

OUTLINE:
H1: [Article Title]
Intro (hook + preview of what reader will learn)
H2: [Section 1]
H2: [Section 2]
H2: [Section 3]
H2: [Section 4] (optional)
H2: Frequently Asked Questions
H2: Conclusion + CTA
```

## Step 3 — Write the Full Article

Write a complete article (800–1,500 words) following these rules:

**Structure:**
- **Hook paragraph**: Start with a surprising stat, question, or bold claim related to credit
- **Sections**: Each H2 should be 150–300 words with practical, actionable content
- **FAQ section**: 3–5 common questions with concise answers (good for featured snippets)
- **Conclusion**: Summarize key points + CTA to sign up for newsletter or get help

**SEO rules:**
- Use primary keyword in H1, first 100 words, at least 2–3 H2s, and meta description
- Use secondary keywords naturally throughout
- Internal linking: mention "learn more about [topic] in our [related article] guide" (use placeholders if no specific article exists)
- External links: link to authoritative sources (CFPB, FTC, Experian, Equifax, TransUnion official pages) — NOT competitors

**Voice:**
- Authoritative but approachable — like a credit expert who actually explains things
- Use second person ("you", "your credit")
- Short paragraphs (2–3 sentences), bullet points for lists
- No fluff, no filler phrases like "In today's world" or "It's no secret that"

**CTA:**
End every article with this CTA block:

```
---
**Need help with your credit?**

NMD ZAZA offers done-for-you credit repair powered by AI.
[Get Started →](https://creditintelligence.com/get-started) | [Free Consultation](mailto:camjohn816@gmail.com)
---
```

## Step 4 — Generate GitHub Pages Frontmatter

Wrap the article in Jekyll/GitHub Pages compatible frontmatter:

```yaml
---
layout: post
title: "[Full Article Title]"
date: [YYYY-MM-DD]
author: NMD ZAZA
categories: [credit-repair, credit-score, disputing] # pick 1–3 relevant
tags: [list, of, relevant, tags]
description: "[Meta description — 150-160 chars]"
permalink: /[url-slug]/
image: /assets/images/[slug]-featured.jpg
---
```

Then output the full article body in Markdown format, ready to paste directly after the frontmatter.

## Step 5 — Deployment Instructions

Output these instructions for the user:

```
PUBLISH TO creditintelligence.com
==================================
1. Open your local GitHub Pages repo for creditintelligence.com
2. Navigate to: _posts/
3. Create new file named: [YYYY-MM-DD]-[slug].md
   (e.g., 2026-03-06-how-to-dispute-medical-bills.md)
4. Paste the frontmatter + article content (generated above)
5. Add a featured image to: assets/images/[slug]-featured.jpg
   (optional — use a stock photo or AI-generated image)
6. Run locally to preview: bundle exec jekyll serve
7. Commit and push to main branch:
   git add .
   git commit -m "Add article: [title]"
   git push origin main
8. GitHub Pages will auto-deploy in ~1–2 minutes
9. Verify at: https://creditintelligence.com/[slug]/

SEO CHECKLIST:
□ Title includes primary keyword
□ Meta description is 150–160 chars
□ Article is 800+ words
□ At least one internal link
□ At least one external link to authoritative source
□ Featured image added with descriptive filename
□ URL slug is clean and keyword-rich
```

## Step 6 — Social + Newsletter Blast (Optional)

If user says "promote this article" after writing, automatically use the social-engine skill to:
1. Write an Instagram caption linking to the article
2. Write a tweet/X post teasing the article
3. Write a LinkedIn post with key insight from the article
4. Write a 2-paragraph newsletter teaser with "Read the full article →" CTA

## Top SEO Keywords to Target

Reference these high-value keywords for creditintelligence.com content:
- how to dispute items on credit report
- remove collections from credit report
- 609 dispute letter template
- credit repair letters that work
- how to raise credit score fast
- FCRA rights credit repair
- remove hard inquiries credit report
- pay for delete letter template
- credit utilization tips
- how to read credit report
- goodwill letter template
- how long do collections stay on credit report
- credit repair step by step
- dispute medical bills on credit report
- remove charge-off from credit report
