#!/usr/bin/env node
/**
 * NMD ZAZA — Auto Social Poster
 * Runs on every non-bot push via GitHub Actions.
 * Detects newly added newsletter HTML files, extracts their OG meta tags,
 * and posts a tweet to @realnmdzaza for each new newsletter.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── NEWSLETTER FILE PATTERN ──────────────────────────────────────────────────
// Match newsletter files: anything ending in .html that is NOT a site page
const SITE_PAGES = new Set([
  'index.html',
  'nmd-blog.html',
  'nmd-about.html',
  'nmd-faq.html',
  'nmd-link.html',
  'nmd-tools.html',
  'nmd-videos.html',
  'nmd-solutions.html',
  'nmd-get-started.html',
  'nmd-plugins.html',
  'nmd-privacy.html',
  'nmd-terms.html',
  'nmd-effects.css',
  'og-image-source.html',
]);

// ─── HELPER: Extract a meta tag value from raw HTML ──────────────────────────
function extractMeta(html, property) {
  // Match both property= and name= variants
  const patterns = [
    new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+property=["']${property}["']`, 'i'),
    new RegExp(`<meta\\s+name=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].trim();
  }
  return null;
}

// ─── HELPER: Truncate text to maxLen, breaking at word boundary ───────────────
function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  const cut = text.lastIndexOf(' ', maxLen - 1);
  return (cut > 0 ? text.slice(0, cut) : text.slice(0, maxLen - 1)) + '…';
}

// ─── HELPER: Build tweet text ─────────────────────────────────────────────────
function buildTweet(title, description, url) {
  const hashtags = '#Credit #CreditRepair #NMD';
  // Twitter counts all URLs as 23 chars regardless of actual length
  const URL_LEN = 23;
  const FIXED = `📰 \n\n\n\n${hashtags}`.length + URL_LEN;
  // 280 char limit
  const budget = 280 - FIXED;

  // Aim for title first, then fill remainder with description
  const maxTitle = Math.min(title.length, Math.floor(budget * 0.55));
  const shortTitle = truncate(title, maxTitle);
  const remaining = budget - shortTitle.length;
  const shortDesc = truncate(description, Math.max(0, remaining));

  let tweet = `📰 ${shortTitle}\n\n${shortDesc}\n\n${url}\n\n${hashtags}`;
  // Remove trailing empty desc line if description was empty after truncation
  tweet = tweet.replace(/\n\n\n+/g, '\n\n');
  return tweet;
}

// ─── DETECT NEW NEWSLETTER FILES ─────────────────────────────────────────────
function getNewNewsletterFiles() {
  let diff;
  try {
    // Get files added in the last commit (status A = Added)
    diff = execSync('git diff --name-status HEAD~1 HEAD', { encoding: 'utf8' });
  } catch {
    // First commit edge case — list all tracked HTML files
    diff = execSync('git show --name-status --format="" HEAD', { encoding: 'utf8' });
  }

  const newFiles = [];
  for (const line of diff.split('\n')) {
    const parts = line.trim().split(/\s+/);
    if (parts[0] === 'A' && parts[1]) {
      const file = parts[1];
      const basename = path.basename(file);
      if (file.endsWith('.html') && !SITE_PAGES.has(basename)) {
        newFiles.push(path.join(process.cwd(), file));
      }
    }
  }
  return newFiles;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const { TwitterApi } = require('twitter-api-v2');

  const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
  } = process.env;

  if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
    console.log('⚠️  Twitter credentials not set — skipping social post.');
    process.exit(0);
  }

  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
  });

  const newFiles = getNewNewsletterFiles();

  if (newFiles.length === 0) {
    console.log('ℹ️  No new newsletter files detected — nothing to post.');
    process.exit(0);
  }

  for (const filePath of newFiles) {
    const basename = path.basename(filePath);
    console.log(`\n📄 Processing: ${basename}`);

    const html = fs.readFileSync(filePath, 'utf8');

    // Prefer twitter: tags; fall back to og: tags
    const title =
      extractMeta(html, 'twitter:title') ||
      extractMeta(html, 'og:title') ||
      basename.replace(/\.html$/, '').replace(/-/g, ' ');

    const description =
      extractMeta(html, 'twitter:description') ||
      extractMeta(html, 'og:description') ||
      '';

    const url =
      extractMeta(html, 'og:url') ||
      `https://nmdzaza.github.io/nmd-newsletters/${basename}`;

    const tweet = buildTweet(title, description, url);

    console.log(`   Title: ${title}`);
    console.log(`   URL:   ${url}`);
    console.log(`\n── Tweet (${tweet.length} chars) ──────────────────────────────────`);
    console.log(tweet);
    console.log('─────────────────────────────────────────────────────────────────');

    try {
      const { data } = await client.v2.tweet(tweet);
      console.log(`✅ Posted tweet: https://twitter.com/realnmdzaza/status/${data.id}`);
    } catch (err) {
      console.error(`❌ Failed to post tweet for ${basename}:`, err.message || err);
      process.exitCode = 1;
    }
  }
}

main();
