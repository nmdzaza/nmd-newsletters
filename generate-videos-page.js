/**
 * NMD Films Page Generator
 * ─────────────────────────────────────────────────────────────
 * Scans the /higgsfield/ folder and rebuilds nmd-videos.html
 * with one section per subfolder, containing all videos + images.
 *
 * Usage:  node generate-videos-page.js
 * ─────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const HIGGSFIELD_DIR = path.join(__dirname, 'higgsfield');
const OUTPUT_FILE    = path.join(__dirname, 'nmd-videos.html');

const VIDEO_EXTS = ['.mp4', '.mov', '.webm', '.m4v'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Folder name → "Formatted Title"
function formatTitle(name) {
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Read all subfolders in higgsfield/
function getFolders() {
  if (!fs.existsSync(HIGGSFIELD_DIR)) return [];
  return fs.readdirSync(HIGGSFIELD_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_'))
    .map(d => d.name)
    .sort();
}

// Read files in a folder
function getFiles(folderName) {
  const dir = path.join(HIGGSFIELD_DIR, folderName);
  return fs.readdirSync(dir)
    .filter(f => !f.startsWith('.') && f !== 'description.txt');
}

// Read optional description.txt
function getDescription(folderName) {
  const f = path.join(HIGGSFIELD_DIR, folderName, 'description.txt');
  if (!fs.existsSync(f)) return '';
  return fs.readFileSync(f, 'utf8').trim();
}

// Generate HTML for one video card
function videoCard(folderName, filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeMap = { '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.m4v': 'video/mp4' };
  return `
        <div class="p-card p-video">
          <video autoplay muted loop playsinline preload="none">
            <source src="higgsfield/${folderName}/${filename}" type="${mimeMap[ext] || 'video/mp4'}">
          </video>
          <div class="p-card-bar">
            <span class="p-card-tag">Video · Higgsfield AI</span>
            <span class="p-card-name">${filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}</span>
          </div>
        </div>`;
}

// Generate HTML for one image card
function imageCard(folderName, filename) {
  return `
        <div class="p-card p-image">
          <img src="higgsfield/${folderName}/${filename}" alt="${formatTitle(folderName)}" loading="lazy">
          <div class="p-card-bar">
            <span class="p-card-tag">Visual · Higgsfield AI</span>
            <span class="p-card-name">${filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}</span>
          </div>
        </div>`;
}

// Generate one full portfolio section
function generateSection(folderName) {
  const title       = formatTitle(folderName);
  const description = getDescription(folderName);
  const files       = getFiles(folderName);
  const videos      = files.filter(f => VIDEO_EXTS.includes(path.extname(f).toLowerCase()));
  const images      = files.filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()));
  const total       = videos.length + images.length;

  if (total === 0) return ''; // skip empty folders

  const cards = [
    ...videos.map(v => videoCard(folderName, v)),
    ...images.map(i => imageCard(folderName, i)),
  ].join('');

  return `
  <!-- ── ${title.toUpperCase()} ────────────────────────────── -->
  <section class="portfolio-section" id="proj-${folderName}">
    <div class="p-section-head">
      <div class="p-section-info">
        <div class="p-section-eyebrow">AI Generated · Higgsfield</div>
        <h2 class="p-section-title">${title}</h2>
        ${description ? `<p class="p-section-desc">${description}</p>` : ''}
      </div>
      <div class="p-section-count">${total} piece${total !== 1 ? 's' : ''}</div>
    </div>
    <div class="p-grid">
      ${cards}
    </div>
  </section>`;
}

// ── BUILD PAGE ─────────────────────────────────────────────
function build() {
  const folders  = getFolders();
  const sections = folders.map(generateSection).filter(Boolean).join('\n');

  const noContent = sections.trim() === ''
    ? `
  <div class="no-content">
    <p>No projects yet — drop your Higgsfield videos and images into <code>higgsfield/[project-name]/</code> and run this script again.</p>
  </div>` : '';

  const html = buildPage(sections || noContent);
  fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
  console.log(`\n✅  nmd-videos.html rebuilt`);
  console.log(`    ${folders.length} project section${folders.length !== 1 ? 's' : ''} generated`);
  folders.forEach(f => {
    const files = getFiles(f);
    const v = files.filter(x => VIDEO_EXTS.includes(path.extname(x).toLowerCase())).length;
    const i = files.filter(x => IMAGE_EXTS.includes(path.extname(x).toLowerCase())).length;
    console.log(`    • ${formatTitle(f)} — ${v} video${v !== 1 ? 's' : ''}, ${i} image${i !== 1 ? 's' : ''}`);
  });
  console.log('\n  git add . && git commit -m "Update Films" && git push\n');
}

// ── PAGE TEMPLATE ──────────────────────────────────────────
function buildPage(portfolioSections) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NMD Films — AI Video Production</title>
  <meta name="description" content="NMD Films — AI-generated video campaigns powered by Higgsfield AI and Opus Agent. Built for businesses that move fast." />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="nmd-effects.css" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0d0d0d; font-family: Inter, sans-serif; color: #e8e4df; overflow-x: hidden; }

    /* ── HEADER ──────────────────────────────────────────── */
    header { background: #0d0d0d; padding: 24px 48px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; z-index: 100; }
    .logo { display: flex; flex-direction: column; gap: 2px; text-decoration: none; }
    .logo-nmd { font-weight: 700; font-size: 22px; letter-spacing: 6px; color: #fff; text-transform: uppercase; }
    .logo-sub { font-size: 9px; letter-spacing: 4px; color: #555; text-transform: uppercase; }

    /* ── HERO ────────────────────────────────────────────── */
    .films-hero {
      min-height: 88vh;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 64px 80px;
      background: #0d0d0d;
      border-bottom: 1px solid #1a1a1a;
      position: relative;
      overflow: hidden;
    }
    /* Subtle animated grid lines */
    .films-hero::before {
      content: '';
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
      background-size: 80px 80px;
      animation: gridPan 20s linear infinite;
      pointer-events: none;
    }
    @keyframes gridPan { from { background-position: 0 0; } to { background-position: 80px 80px; } }

    .hero-kicker { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: #c9a84c; margin-bottom: 28px; display: flex; align-items: center; gap: 14px; position: relative; }
    .hero-kicker::before { content: ''; width: 36px; height: 1px; background: #c9a84c; }
    .films-hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(60px, 10vw, 140px);
      font-weight: 900;
      line-height: 0.9;
      color: #e8e4df;
      position: relative;
      max-width: 900px;
      margin-bottom: 36px;
    }
    .films-hero h1 em { font-style: italic; color: #c9a84c; display: block; }
    .hero-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; flex-wrap: wrap; position: relative; }
    .hero-sub { font-size: 16px; color: #555; line-height: 1.8; max-width: 460px; }
    .hero-sub strong { color: #e8e4df; font-weight: 600; }
    .hero-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
    .hero-badge { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; border: 1px solid rgba(201,168,76,0.3); padding: 7px 16px; }
    .hero-cta {
      display: inline-flex; align-items: center; gap: 10px;
      background: #c9a84c; color: #0d0d0d;
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;
      padding: 16px 32px; text-decoration: none; flex-shrink: 0;
      transition: background 0.25s;
    }
    .hero-cta:hover { background: #e8c96d; }
    .hero-num {
      font-family: 'Playfair Display', serif;
      font-size: 120px; font-weight: 900;
      color: rgba(201,168,76,0.04);
      position: absolute; right: -20px; bottom: -20px;
      line-height: 1; pointer-events: none; user-select: none;
    }

    /* ── HOW IT WORKS ────────────────────────────────────── */
    .how-section { padding: 100px 64px; border-bottom: 1px solid #1a1a1a; }
    .how-eyebrow { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: #555; margin-bottom: 48px; }
    .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid #1a1a1a; }
    .how-step { padding: 48px 40px; border-right: 1px solid #1a1a1a; position: relative; }
    .how-step:last-child { border-right: none; }
    .how-step::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: transparent; transition: background 0.3s; }
    .how-step:hover::after { background: #c9a84c; }
    .how-num { font-family: 'Playfair Display', serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #c9a84c; margin-bottom: 20px; }
    .how-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #e8e4df; margin-bottom: 16px; line-height: 1.1; }
    .how-desc { font-size: 14px; color: #555; line-height: 1.75; }

    /* ── NMD FILMS (existing videos, carousel) ───────────── */
    .nmd-films-section { padding: 80px 0; border-bottom: 1px solid #1a1a1a; }
    .nmd-films-top { padding: 0 64px 48px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
    .nmd-films-eyebrow { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: #555; margin-bottom: 12px; }
    .nmd-films-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: #e8e4df; }
    .films-carousel-wrap { position: relative; }
    .films-track {
      display: flex; gap: 14px;
      overflow-x: auto; scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch; scrollbar-width: none;
      padding: 0 64px 24px; cursor: grab;
    }
    .films-track:active { cursor: grabbing; }
    .films-track::-webkit-scrollbar { display: none; }
    .films-carousel-wrap::before, .films-carousel-wrap::after {
      content: ''; position: absolute; top: 0; bottom: 24px;
      width: 72px; pointer-events: none; z-index: 2;
    }
    .films-carousel-wrap::before { left: 0; background: linear-gradient(to right, #0d0d0d, transparent); }
    .films-carousel-wrap::after  { right: 0; background: linear-gradient(to left, #0d0d0d, transparent); }
    .film-card { flex-shrink: 0; width: 220px; scroll-snap-align: start; position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.5); transition: transform 0.25s, box-shadow 0.25s; }
    .film-card:hover { transform: translateY(-6px); box-shadow: 0 28px 80px rgba(0,0,0,0.7); }
    .film-card video { width: 100%; aspect-ratio: 9 / 16; object-fit: cover; display: block; }
    .film-card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 36px 14px 14px; background: linear-gradient(to top, rgba(0,0,0,0.88), transparent); }
    .film-card-tag { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; margin-bottom: 5px; }
    .film-card-title { font-size: 13px; font-weight: 700; color: #e8e4df; line-height: 1.3; font-family: 'Playfair Display', serif; }
    .film-card::after { content: ''; position: absolute; inset: 0; border-radius: 12px; border: 1px solid rgba(201,168,76,0); transition: border-color 0.25s; pointer-events: none; }
    .film-card:hover::after { border-color: rgba(201,168,76,0.45); }

    /* ── PORTFOLIO SECTIONS (generated) ──────────────────── */
    .portfolio-section { padding: 80px 64px; border-bottom: 1px solid #1a1a1a; }
    .p-section-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; padding-bottom: 24px; border-bottom: 1px solid #1a1a1a; gap: 20px; flex-wrap: wrap; }
    .p-section-eyebrow { font-size: 9px; letter-spacing: 5px; text-transform: uppercase; color: #555; margin-bottom: 12px; }
    .p-section-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 700; color: #e8e4df; line-height: 1.05; }
    .p-section-desc { font-size: 14px; color: #555; line-height: 1.75; margin-top: 12px; max-width: 500px; }
    .p-section-count { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #333; flex-shrink: 0; }
    /* Mixed grid: videos = portrait, images can be square or wide */
    .p-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
    .p-card { position: relative; border-radius: 10px; overflow: hidden; background: #111; cursor: pointer; transition: transform 0.25s, box-shadow 0.25s; }
    .p-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.7); }
    .p-video video { width: 100%; aspect-ratio: 9 / 16; object-fit: cover; display: block; }
    .p-image img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; }
    .p-card-bar { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 12px 10px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); opacity: 0; transition: opacity 0.2s; }
    .p-card:hover .p-card-bar { opacity: 1; }
    .p-card-tag { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; display: block; margin-bottom: 3px; }
    .p-card-name { font-size: 11px; color: #e8e4df; font-weight: 600; text-transform: capitalize; }
    .p-card::after { content: ''; position: absolute; inset: 0; border-radius: 10px; border: 1px solid rgba(201,168,76,0); transition: border-color 0.25s; pointer-events: none; }
    .p-card:hover::after { border-color: rgba(201,168,76,0.4); }

    /* ── NO CONTENT ──────────────────────────────────────── */
    .no-content { text-align: center; padding: 80px 48px; color: #444; }
    .no-content p { font-size: 15px; line-height: 1.8; }
    .no-content code { background: #111; padding: 2px 8px; border-radius: 4px; color: #c9a84c; font-family: monospace; }

    /* ── BOTTOM CTA ──────────────────────────────────────── */
    .films-cta-strip { padding: 100px 64px; text-align: center; border-top: 1px solid #1a1a1a; }
    .films-cta-strip h2 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 64px); font-weight: 700; color: #e8e4df; line-height: 1.1; margin-bottom: 20px; }
    .films-cta-strip p { font-size: 16px; color: #555; max-width: 500px; margin: 0 auto 40px; line-height: 1.75; }
    .films-cta-strip a { display: inline-flex; align-items: center; gap: 10px; background: #c9a84c; color: #0d0d0d; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; padding: 18px 40px; text-decoration: none; transition: background 0.25s; }
    .films-cta-strip a:hover { background: #e8c96d; }

    /* ── FOOTER ──────────────────────────────────────────── */
    .simple-footer { background: #080808; border-top: 1px solid #1a1a1a; padding: 28px 64px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .simple-footer-copy { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #333; }
    .simple-footer-links { display: flex; gap: 24px; }
    .simple-footer-links a { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #333; text-decoration: none; transition: color 0.2s; }
    .simple-footer-links a:hover { color: #c9a84c; }

    /* ── RESPONSIVE ──────────────────────────────────────── */
    @media (max-width: 900px) {
      .how-grid { grid-template-columns: 1fr; }
      .how-step { border-right: none; border-bottom: 1px solid #1a1a1a; }
      .how-step:last-child { border-bottom: none; }
    }
    @media (max-width: 768px) {
      .films-hero { padding: 0 24px 60px; min-height: 70vh; }
      .how-section, .portfolio-section, .nmd-films-top, .films-cta-strip { padding-left: 24px; padding-right: 24px; }
      .films-track { padding: 0 24px 20px; }
      .p-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
      .simple-footer { padding: 24px; }
    }
  </style>

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-K7VFHF48M5"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-K7VFHF48M5');</script>
</head>
<body>

  <!-- HEADER -->
  <header>
    <a class="logo" href="index.html">
      <span class="logo-nmd">NMD</span>
      <span class="logo-sub">No Money Down</span>
    </a>
    <div id="nav-placeholder"></div>
  </header>

  <!-- HERO -->
  <div class="films-hero">
    <div class="hero-num">AI</div>
    <div class="hero-kicker">Higgsfield AI · Opus Agent · NMD Studios</div>
    <h1>
      We don't film.
      <em>We generate.</em>
    </h1>
    <div class="hero-bottom">
      <div>
        <p class="hero-sub">
          Cinematic AI video campaigns for businesses that can't wait.<br>
          <strong>One brief. One prompt.</strong> Full campaign distributed everywhere — no crew, no studio, no agency.
        </p>
        <div class="hero-badges">
          <span class="hero-badge">Higgsfield AI</span>
          <span class="hero-badge">Opus Agent</span>
          <span class="hero-badge">Auto-Captions</span>
          <span class="hero-badge">Social-Ready</span>
          <span class="hero-badge">AI Storyboard</span>
        </div>
      </div>
      <a href="nmd-solutions.html" class="hero-cta">Get this for your business &#8594;</a>
    </div>
  </div>

  <!-- HOW IT WORKS -->
  <section class="how-section">
    <div class="how-eyebrow">The Process</div>
    <div class="how-grid">
      <div class="how-step">
        <div class="how-num">01 — The Brief</div>
        <div class="how-title">You describe the vision.</div>
        <div class="how-desc">Tell us the vibe, the goal, the audience, and the scene. No technical knowledge required — just your brand story and what you want people to feel.</div>
      </div>
      <div class="how-step">
        <div class="how-num">02 — The Prompt</div>
        <div class="how-title">We engineer the campaign.</div>
        <div class="how-desc">We craft precision Higgsfield AI prompts and a full storyboard — from opening shot to final frame. Every detail directed for maximum visual impact.</div>
      </div>
      <div class="how-step">
        <div class="how-num">03 — The Drop</div>
        <div class="how-title">Opus deploys it everywhere.</div>
        <div class="how-desc">Opus Agent automatically clips the content, adds on-brand captions, optimizes for each platform, and distributes — TikTok, Instagram, LinkedIn, YouTube Shorts.</div>
      </div>
    </div>
  </section>

  <!-- NMD FILMS — existing NMD brand content -->
  <section class="nmd-films-section">
    <div class="nmd-films-top">
      <div>
        <div class="nmd-films-eyebrow">NMD Brand · NMD Studios</div>
        <div class="nmd-films-title">NMD Original Films</div>
      </div>
      <a href="index.html#films" style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;text-decoration:none;font-weight:600;">Back to home &#8594;</a>
    </div>
    <div class="films-carousel-wrap">
      <div class="films-track" id="filmsTrack">

        <div class="film-card">
          <video autoplay muted loop playsinline preload="none">
            <source src="nmd-dealership.mp4" type="video/mp4">
          </video>
          <div class="film-card-label">
            <div class="film-card-tag">NMD Solutions</div>
            <div class="film-card-title">AI Built for Real Sales Teams</div>
          </div>
        </div>

        <div class="film-card">
          <video autoplay muted loop playsinline preload="none">
            <source src="nmd-v2.mp4" type="video/mp4">
          </video>
          <div class="film-card-label">
            <div class="film-card-tag">NMD Solutions</div>
            <div class="film-card-title">5 Tools. One System.</div>
          </div>
        </div>

        <div class="film-card">
          <video autoplay muted loop playsinline preload="none">
            <source src="nmd-v3.mp4" type="video/mp4">
          </video>
          <div class="film-card-label">
            <div class="film-card-tag">NMD Lifestyle</div>
            <div class="film-card-title">Systems That Work While You Rest</div>
          </div>
        </div>

        <div class="film-card">
          <video autoplay muted loop playsinline preload="none">
            <source src="nmd-v4.mp4" type="video/mp4">
          </video>
          <div class="film-card-label">
            <div class="film-card-tag">NMD Infrastructure</div>
            <div class="film-card-title">One Person. Full AI Operation.</div>
          </div>
        </div>

        <div class="film-card">
          <video autoplay muted loop playsinline preload="none">
            <source src="nmd-v5.mp4" type="video/mp4">
          </video>
          <div class="film-card-label">
            <div class="film-card-tag">Industry News</div>
            <div class="film-card-title">Doctor Jailed 8.5 Years: $145M Fraud</div>
          </div>
        </div>

        <div class="film-card">
          <video autoplay muted loop playsinline preload="none">
            <source src="video_c9c97ee6-4853-4721-92ba-b6050e998882.mp4" type="video/mp4">
          </video>
          <div class="film-card-label">
            <div class="film-card-tag">Higgsfield AI</div>
            <div class="film-card-title">AI-Generated Campaign</div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- GENERATED PORTFOLIO SECTIONS — rebuilt by generate-videos-page.js -->
  <!-- GENERATED-SECTIONS-START -->
${portfolioSections}
  <!-- GENERATED-SECTIONS-END -->

  <!-- BOTTOM CTA -->
  <div class="films-cta-strip">
    <h2>Ready to look like this?</h2>
    <p>AI-generated video campaigns. Delivered fast. Built for your brand, your audience, your platforms.</p>
    <a href="nmd-solutions.html">Start your campaign &#8594;</a>
  </div>

  <!-- FOOTER -->
  <footer class="simple-footer">
    <span class="simple-footer-copy">© 2026 NMD ZAZA · All Rights Reserved</span>
    <div class="simple-footer-links">
      <a href="index.html">Home</a>
      <a href="nmd-blog.html">Blog</a>
      <a href="nmd-solutions.html">Solutions</a>
      <a href="nmd-privacy.html">Privacy</a>
    </div>
  </footer>

  <script src="nmd-effects.js"></script>
  <script>
    // Carousel drag-to-scroll
    (function() {
      var track = document.getElementById('filmsTrack');
      if (!track) return;
      var isDown = false, startX, scrollLeft;
      track.addEventListener('mousedown', function(e) { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
      track.addEventListener('mouseleave', function() { isDown = false; });
      track.addEventListener('mouseup', function() { isDown = false; });
      track.addEventListener('mousemove', function(e) {
        if (!isDown) return; e.preventDefault();
        track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.5;
      });
      // Play/pause videos based on visibility
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) { e.isIntersecting ? e.target.play() : e.target.pause(); });
      }, { threshold: 0.2 });
      document.querySelectorAll('video').forEach(function(v) { io.observe(v); });
    })();
  </script>

</body>
</html>`;
}

// Run
build();
