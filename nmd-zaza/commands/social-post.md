---
description: Cross-post content to Instagram, Facebook, X, LinkedIn, blog, and newsletter. Pass content or leave blank to auto-pull the latest newsletter.
allowed-tools: Read, Write, Bash, WebSearch
argument-hint: [topic or content — leave blank to auto-grab latest newsletter]
---

Take the following input and generate a complete cross-platform social media package for NMD ZAZA.

Input: $ARGUMENTS

Load the `social-engine` skill context and do the following:

## Step 1 — Get Content

**If `$ARGUMENTS` is empty, or is just "post" or "latest":**

Auto-detect the most recently published newsletter:

1. Run `ls -t /home/user/nmd-newsletters/*.html` (or equivalent Read/Bash) to find the most recently modified newsletter HTML file, skipping site pages: `index.html`, `nmd-blog.html`, `nmd-about.html`, `nmd-faq.html`, `nmd-link.html`, `nmd-tools.html`, `nmd-videos.html`, `nmd-solutions.html`, `nmd-get-started.html`, `nmd-plugins.html`, `nmd-privacy.html`, `nmd-terms.html`, `og-image-source.html`
2. Read that file
3. Extract from it:
   - The `og:title` or `twitter:title` meta tag → use as the headline
   - The `og:description` or `twitter:description` meta tag → use as the core hook
   - The `og:url` meta tag → use as the article URL
   - Scan the `<article>` or `<main>` body for the 2–3 most punchy sentences or stats to use as content
4. Tell the user: "I found your latest newsletter: **[title]** — generating social content now…"

**If `$ARGUMENTS` contains actual content or a topic:**
Use that content directly as the source material.

---

## Step 2 — Identify the Pillar

Determine which NMD ZAZA content pillar this falls under:
- Credit intelligence
- AI for business
- Real estate wholesale
- Car sales / dealership AI
- NMD Market
- Entrepreneurship / mindset

---

## Step 3 — Generate All Platforms

Generate ALL of the following, clearly labeled:

### INSTAGRAM
Punchy caption. Hook in the first line (make it scroll-stopping). Story in the body. CTA pointing to link in bio. 7–10 niche hashtags at the end. 150–300 chars above the hashtag line.

### FACEBOOK
Conversational, story-driven post. 150–400 chars. 2–3 hashtags max. Write like you're talking to a friend who needs this info.

### X (TWITTER)
If the content is short/punchy: one tweet under 280 chars.
If complex or multi-point: write a numbered thread [1/N] through [N/N]. Each tweet under 280 chars. End with the article URL.

### LINKEDIN
Professional, authoritative. 800–1,200 chars. Single-sentence paragraphs. Drop the article URL in the comments — write "Drop the link in comments." as the CTA. End with a question to drive engagement.

### BLOG
Full SEO-optimized article:
- H1 title with target keyword
- Intro paragraph (problem + hook)
- 3–5 H2 sections with actionable content
- 800–1,200 words
- Closing CTA to AI Employee Blueprint or Vibe Build with NMD

### NEWSLETTER
Email format:
- Subject line (under 50 chars) — 3 options, mark the recommended one
- Preview text (under 90 chars)
- Full email body (300–500 words), NMD ZAZA voice
- Sign-off: "– Cameron, NMD ZAZA"

### HIGGSFIELD VIDEO HOOK
20-second video script:
- Hook (0–3s): Disruptive visual or statement
- Problem (3–8s): Agitate the pain point
- Solution (8–15s): Show the tool or method
- CTA (15–20s): Drive to link in bio / article
Include scene description + voiceover text for each segment.

---

## Step 4 — Wrap Up

After generating all versions, ask:

> "Want me to save any of these to a file, send the newsletter via Gmail, or post anything directly?"
