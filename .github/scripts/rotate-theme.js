#!/usr/bin/env node
/**
 * NMD ZAZA — Auto Theme Rotator
 * Runs on every push via GitHub Actions.
 * Reads theme-state.json, advances to the next theme,
 * injects a CSS override block between <!-- NMD-THEME-START/END -->
 * markers in index.html, and updates theme-state.json.
 */

const fs   = require('fs');
const path = require('path');

// ─── THEME DEFINITIONS ────────────────────────────────────────────────────────
// Each theme has: name, accent, bg, cardBg, border, textPrimary, textSub,
//                 vantaColor, vantaBg, labelColor, liveTag, btnHover
const THEMES = [
  {
    name:       'Gold Standard',
    accent:     '#c9a84c',
    bg:         '#0d0d0d',
    cardBg:     '#111',
    border:     '#1e1e1e',
    textPrimary:'#f5f0e8',
    textSub:    '#888',
    vantaFg:    '0xc9a84c',
    vantaBg:    '0x0d0d0d',
    labelColor: '#c9a84c',
    liveColor:  '#c0392b',
    btnHover:   '#e6c86e',
  },
  {
    name:       'Arctic Ice',
    accent:     '#00b4d8',
    bg:         '#020a10',
    cardBg:     '#051520',
    border:     '#0a2030',
    textPrimary:'#e8f4f8',
    textSub:    '#4a8fa8',
    vantaFg:    '0x00b4d8',
    vantaBg:    '0x020a10',
    labelColor: '#00b4d8',
    liveColor:  '#0077b6',
    btnHover:   '#48cae4',
  },
  {
    name:       'Blood Money',
    accent:     '#e63946',
    bg:         '#0a0000',
    cardBg:     '#140000',
    border:     '#2a0000',
    textPrimary:'#ffe8e8',
    textSub:    '#883333',
    vantaFg:    '0xe63946',
    vantaBg:    '0x0a0000',
    labelColor: '#e63946',
    liveColor:  '#ff6b6b',
    btnHover:   '#ff6b78',
  },
  {
    name:       'Emerald City',
    accent:     '#2d9b6d',
    bg:         '#010d08',
    cardBg:     '#041210',
    border:     '#0a2018',
    textPrimary:'#e8f5f0',
    textSub:    '#2d6b4d',
    vantaFg:    '0x2d9b6d',
    vantaBg:    '0x010d08',
    labelColor: '#2d9b6d',
    liveColor:  '#00ff88',
    btnHover:   '#3dbb88',
  },
  {
    name:       'Rose Gold',
    accent:     '#c77daa',
    bg:         '#0d080c',
    cardBg:     '#160e14',
    border:     '#2a1525',
    textPrimary:'#f5eaf2',
    textSub:    '#7a4a6a',
    vantaFg:    '0xc77daa',
    vantaBg:    '0x0d080c',
    labelColor: '#c77daa',
    liveColor:  '#ff80b5',
    btnHover:   '#e090c0',
  },
  {
    name:       'Platinum',
    accent:     '#b0b8c8',
    bg:         '#080808',
    cardBg:     '#101010',
    border:     '#202028',
    textPrimary:'#f0f2f5',
    textSub:    '#555566',
    vantaFg:    '0xb0b8c8',
    vantaBg:    '0x080808',
    labelColor: '#b0b8c8',
    liveColor:  '#8890a0',
    btnHover:   '#d0d8e8',
  },
  {
    name:       'Volt',
    accent:     '#d4ff00',
    bg:         '#050500',
    cardBg:     '#0c0c00',
    border:     '#1a1a00',
    textPrimary:'#f5ffcc',
    textSub:    '#666600',
    vantaFg:    '0xd4ff00',
    vantaBg:    '0x050500',
    labelColor: '#d4ff00',
    liveColor:  '#aacc00',
    btnHover:   '#eeff55',
  },
  {
    name:       'Copper',
    accent:     '#b87333',
    bg:         '#080400',
    cardBg:     '#130900',
    border:     '#261400',
    textPrimary:'#f5ece0',
    textSub:    '#7a4a1a',
    vantaFg:    '0xb87333',
    vantaBg:    '0x080400',
    labelColor: '#b87333',
    liveColor:  '#d4884a',
    btnHover:   '#d48844',
  },
  {
    name:       'Ultra Violet',
    accent:     '#8b5cf6',
    bg:         '#04000f',
    cardBg:     '#0a001a',
    border:     '#18003a',
    textPrimary:'#ede8ff',
    textSub:    '#4a2a8a',
    vantaFg:    '0x8b5cf6',
    vantaBg:    '0x04000f',
    labelColor: '#8b5cf6',
    liveColor:  '#a78bfa',
    btnHover:   '#a07cff',
  },
  {
    name:       'Deep Ocean',
    accent:     '#0891b2',
    bg:         '#000a10',
    cardBg:     '#001520',
    border:     '#002030',
    textPrimary:'#e0f2f8',
    textSub:    '#1a5570',
    vantaFg:    '0x0891b2',
    vantaBg:    '0x000a10',
    labelColor: '#0891b2',
    liveColor:  '#06b6d4',
    btnHover:   '#0ea5cc',
  },
];

// ─── PATHS ────────────────────────────────────────────────────────────────────
const ROOT       = path.join(__dirname, '..', '..');
const STATE_FILE = path.join(ROOT, 'theme-state.json');
const INDEX_FILE = path.join(ROOT, 'index.html');

// ─── LOAD STATE ───────────────────────────────────────────────────────────────
const state   = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
const nextIdx = (state.current + 1) % THEMES.length;
const theme   = THEMES[nextIdx];

console.log(`Rotating from theme ${state.current} → ${nextIdx}: ${theme.name}`);

// ─── BUILD CSS OVERRIDE BLOCK ─────────────────────────────────────────────────
const cssBlock = `<!-- NMD-THEME-START -->
<style id="nmd-theme">
  /* ═══════════════════════════════════════════
     ACTIVE THEME: ${theme.name}
     Auto-rotated by GitHub Actions on push
     Theme ${nextIdx + 1} of ${THEMES.length}
  ═══════════════════════════════════════════ */

  :root {
    --accent:       ${theme.accent};
    --bg:           ${theme.bg};
    --card-bg:      ${theme.cardBg};
    --border:       ${theme.border};
    --text-primary: ${theme.textPrimary};
    --text-sub:     ${theme.textSub};
  }

  body                              { background: ${theme.bg}; color: ${theme.textPrimary}; }
  .brand                            { color: ${theme.accent}; }
  .nav-link:hover, .nav-link.active { color: ${theme.accent}; }
  .hero-eyebrow                     { color: ${theme.accent}; border-color: ${theme.accent}; }
  .hero h1 span                     { color: ${theme.accent}; }
  .btn-primary                      { background: ${theme.accent}; color: ${theme.bg}; }
  .btn-primary:hover                { background: ${theme.btnHover}; }
  .btn-secondary                    { border-color: ${theme.accent}; color: ${theme.accent}; }
  .btn-secondary:hover              { background: rgba(${hexToRgb(theme.accent)},0.12); }
  .card                             { background: ${theme.cardBg}; border-color: ${theme.border}; }
  .card:hover                       { border-color: ${theme.accent}; box-shadow: 0 0 0 1px ${theme.accent}22; }
  .card-accent                      { background: ${theme.accent} !important; }
  .card-label                       { color: ${theme.accent} !important; }
  .card-arrow                       { color: ${theme.accent}; }
  .tool-card                        { background: ${theme.cardBg}; border-color: ${theme.border}; }
  .tool-card:hover                  { border-color: ${theme.accent}; }
  .tool-icon                        { background: ${theme.accent}22; color: ${theme.accent}; }
  .tool-link                        { color: ${theme.accent}; }
  .section-label                    { color: ${theme.accent}; }
  .join-section                     { background: ${theme.cardBg}; border-color: ${theme.border}; }
  .join-btn                         { background: ${theme.accent}; color: ${theme.bg}; }
  .join-btn:hover                   { background: ${theme.btnHover}; }
  .live-tag                         { background: ${theme.liveColor}; }
  .footer-brand                     { color: ${theme.accent}; }
  .footer-link:hover                { color: ${theme.accent}; }
  hr                                { border-color: ${theme.border}; }
  .section-divider                  { border-color: ${theme.border}; }
  .nav                              { border-color: ${theme.border}; }
  .hero-sub                         { color: ${theme.textSub}; }
  .card-desc                        { color: ${theme.textSub}; }
  .card-date                        { color: ${theme.textSub}; }
  .footer-text                      { color: ${theme.textSub}; }
  .tool-desc                        { color: ${theme.textSub}; }
</style>
<!-- NMD-THEME-END -->`;

// ─── HELPER: hex → "r,g,b" string for rgba() ─────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0,2), 16);
  const g = parseInt(h.substring(2,4), 16);
  const b = parseInt(h.substring(4,6), 16);
  return `${r},${g},${b}`;
}

// ─── INJECT INTO index.html ───────────────────────────────────────────────────
let html = fs.readFileSync(INDEX_FILE, 'utf8');

// Replace existing theme block if present, otherwise insert after </style>
if (html.includes('<!-- NMD-THEME-START -->')) {
  html = html.replace(
    /<!-- NMD-THEME-START -->[\s\S]*?<!-- NMD-THEME-END -->/,
    cssBlock
  );
} else {
  html = html.replace('</style>', `</style>\n\n${cssBlock}`);
}

// Also update Vanta colors if present
html = html.replace(
  /color:\s*0x[0-9a-fA-F]{6}(\s*,\s*\/\/.*?NET foreground)?/g,
  (match) => match.replace(/0x[0-9a-fA-F]{6}/, theme.vantaFg)
);
html = html.replace(
  /backgroundColor:\s*0x[0-9a-fA-F]{6}/g,
  `backgroundColor: ${theme.vantaBg}`
);

fs.writeFileSync(INDEX_FILE, html, 'utf8');

// ─── SAVE STATE ───────────────────────────────────────────────────────────────
fs.writeFileSync(STATE_FILE, JSON.stringify({ current: nextIdx }, null, 2) + '\n', 'utf8');

console.log(`✅ Theme rotated to: ${theme.name} (${nextIdx})`);
console.log(`   Accent: ${theme.accent}  |  BG: ${theme.bg}`);
