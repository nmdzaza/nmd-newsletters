/*!
 * NMD Effects Engine v1.0
 * Drop-in enhancement for all NMD pages.
 * Add <script src="nmd-effects.js"></script> before </body>
 *
 * What this does:
 *   — Lenis smooth scroll (silky, inertia-based)
 *   — GSAP ScrollTrigger (cards, film rows, sections stagger in)
 *   — Custom cursor (gold dot + ring)
 *   — Hero text scramble on page load
 *   — Magnetic CTA buttons
 *   — Header hide on scroll-down / show on scroll-up
 *   — Breaking label live pulse dot
 *   — Reading progress bar
 *   — Grain overlay injection
 *   — News ticker animation
 */

(function () {
  'use strict';

  /* ── CONFIG ────────────────────────────────────────────────────── */
  var GOLD = '#c9a84c';
  var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%&*';
  var LENIS_CDN  = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
  var GSAP_CDN   = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
  var ST_CDN     = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';

  /* ── UTILS ─────────────────────────────────────────────────────── */
  function isMobile() {
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }
  function loadScripts(srcs, cb) {
    var i = 0;
    function next() { i < srcs.length ? loadScript(srcs[i++], next) : cb(); }
    next();
  }

  /* ── GRAIN OVERLAY ─────────────────────────────────────────────── */
  function injectGrain() {
    if (document.querySelector('.nmd-grain')) return;
    var el = document.createElement('div');
    el.className = 'nmd-grain';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);
  }

  /* ── READING PROGRESS BAR ───────────────────────────────────────── */
  function initProgressBar() {
    // Only on pages with substantial body content
    var hasContent = document.querySelector('.grid-section, .story-section, .faq-content, .what-section');
    if (!hasContent) return;
    var bar = document.createElement('div');
    bar.className = 'nmd-progress-bar';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      bar.style.width = clamp((window.scrollY / total) * 100, 0, 100) + '%';
    }, { passive: true });
  }

  /* ── HEADER HIDE / SHOW ─────────────────────────────────────────── */
  function initHeader() {
    var header = document.querySelector('header');
    if (!header) return;
    var lastY = 0;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY && y > 90) {
          header.classList.add('nmd-header-hidden');
        } else {
          header.classList.remove('nmd-header-hidden');
        }
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── BREAKING PULSE ─────────────────────────────────────────────── */
  function initBreakingLabels() {
    document.querySelectorAll('.card-label').forEach(function (el) {
      if (el.textContent.toLowerCase().indexOf('breaking') > -1) {
        el.classList.add('nmd-breaking');
      }
    });
  }

  /* ── TEXT SCRAMBLE ──────────────────────────────────────────────── */
  function scrambleTextNode(node, delayMs, duration) {
    var target = node.nodeValue;
    if (!target || !target.trim()) return;

    var span = document.createElement('span');
    node.parentNode.insertBefore(span, node);
    node.parentNode.removeChild(node);

    var startTime = null;
    var chars = SCRAMBLE_CHARS;

    function frame(ts) {
      if (!startTime) startTime = ts + delayMs;
      if (ts < startTime) { requestAnimationFrame(frame); return; }

      var progress = Math.min((ts - startTime) / duration, 1);
      var result = '';

      for (var i = 0; i < target.length; i++) {
        var ch = target[i];
        if (ch === ' ' || ch === '\n' || ch === '\r') {
          result += ch;
          continue;
        }
        var threshold = i / (target.length - 1 || 1);
        if (progress >= threshold) {
          var local = (progress - threshold) / Math.max(0.001, 1 / target.length * 4);
          result += local >= 1 ? ch : chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      span.textContent = result;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        span.textContent = target;
      }
    }
    requestAnimationFrame(frame);
  }

  function initTextScramble() {
    var hero = document.querySelector('.hero-headline, header + section h1, .hero h1');
    if (!hero) return;

    // Walk text nodes, collect them first (modifying DOM while walking breaks iteration)
    var nodes = [];
    function walk(n) {
      if (n.nodeType === 3 && n.nodeValue.trim()) {
        nodes.push(n);
      } else {
        n.childNodes.forEach(walk);
      }
    }
    walk(hero);

    nodes.forEach(function (n, i) {
      scrambleTextNode(n, 250 + i * 80, 1100);
    });
  }

  /* ── CUSTOM CURSOR ──────────────────────────────────────────────── */
  function initCursor() {
    if (isMobile()) return;

    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'nmd-cursor-dot';
    ring.className = 'nmd-cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    document.documentElement.style.cursor = 'none';

    var mouse = { x: -200, y: -200 };
    var rpos  = { x: -200, y: -200 };

    document.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });

    (function animateRing() {
      rpos.x = lerp(rpos.x, mouse.x, 0.11);
      rpos.y = lerp(rpos.y, mouse.y, 0.11);
      ring.style.transform = 'translate(' + rpos.x + 'px, ' + rpos.y + 'px)';
      requestAnimationFrame(animateRing);
    }());

    var hoverTargets = 'a, button, .card, .cta-primary, .cta-secondary, .faq-question, .pillar, .trust-card';
    document.querySelectorAll(hoverTargets).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        dot.classList.add('is-hovering');
        ring.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', function () {
        dot.classList.remove('is-hovering');
        ring.classList.remove('is-hovering');
      });
    });

    document.addEventListener('mousedown', function () {
      dot.classList.add('is-clicking');
      ring.classList.add('is-clicking');
    });
    document.addEventListener('mouseup', function () {
      dot.classList.remove('is-clicking');
      ring.classList.remove('is-clicking');
    });
  }

  /* ── MAGNETIC BUTTONS ───────────────────────────────────────────── */
  function initMagnetic() {
    if (isMobile()) return;
    var btns = document.querySelectorAll('.cta-primary, .cta-secondary');
    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r  = btn.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var dx = (e.clientX - cx) * 0.38;
        var dy = (e.clientY - cy) * 0.38;
        btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(function () { btn.style.transition = ''; }, 560);
      });
    });
  }

  /* ── GSAP SCROLL ANIMATIONS ────────────────────────────────────── */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    /* — Hero description fade up */
    var heroDesc = document.querySelector('.hero-desc, .hero-description');
    if (heroDesc) {
      gsap.from(heroDesc, { opacity: 0, y: 22, duration: 0.9, delay: 0.95, ease: 'power2.out' });
    }

    /* — Hero label slide in */
    var heroLabel = document.querySelector('.hero-label, .hero-label');
    if (heroLabel) {
      gsap.from(heroLabel, { opacity: 0, x: -18, duration: 0.7, delay: 0.2, ease: 'power2.out' });
    }

    /* — Newsletter cards: batch stagger */
    var cards = document.querySelectorAll('.card');
    if (cards.length) {
      gsap.set(cards, { opacity: 0, y: 44 });
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        onEnter: function (batch) {
          gsap.to(batch, {
            opacity: 1, y: 0,
            duration: 0.72,
            stagger: 0.085,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }

    /* — Film rows */
    document.querySelectorAll('.film-row').forEach(function (row, i) {
      gsap.set(row, { opacity: 0, y: 38 });
      ScrollTrigger.create({
        trigger: row,
        start: 'top 87%',
        onEnter: function () {
          gsap.to(row, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });
        },
        once: true,
      });
    });

    /* — Section labels */
    document.querySelectorAll('.section-label, .section-tag, .group-tag, .films-label, .films-header').forEach(function (el) {
      gsap.set(el, { opacity: 0, x: -20 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        onEnter: function () {
          gsap.to(el, { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' });
        },
        once: true,
      });
    });

    /* — About pillars, trust cards */
    var pillars = document.querySelectorAll('.pillar, .trust-card');
    if (pillars.length) {
      gsap.set(pillars, { opacity: 0, y: 28 });
      ScrollTrigger.batch(pillars, {
        start: 'top 90%',
        onEnter: function (batch) {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power2.out' });
        },
        once: true,
      });
    }

    /* — Stat number counters (about page) */
    document.querySelectorAll('.number-value').forEach(function (el) {
      var raw = el.textContent.trim();
      var num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (isNaN(num) || raw === '🐐' || raw === '0') return;
      var suffix = raw.replace(/[0-9.]/g, '');
      gsap.set(el, { opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: function () {
          gsap.to(el, { opacity: 1, duration: 0.3 });
          gsap.to({ n: 0 }, {
            n: num,
            duration: 1.9,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].n) + suffix;
            },
            onComplete: function () { el.textContent = raw; },
          });
        },
        once: true,
      });
    });

    /* — FAQ groups */
    document.querySelectorAll('.faq-group').forEach(function (group, i) {
      gsap.set(group, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: group,
        start: 'top 88%',
        onEnter: function () {
          gsap.to(group, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        },
        once: true,
      });
    });

    /* — Story / why sections two-column split */
    document.querySelectorAll('.story-left, .story-right, .why-body, .why-section > div').forEach(function (el, i) {
      gsap.set(el, { opacity: 0, x: i % 2 === 0 ? -30 : 30 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 87%',
        onEnter: function () {
          gsap.to(el, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });
    });

    /* — Headings in dark sections */
    document.querySelectorAll('.hero-headline, .start-headline, .cta-headline').forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: function () {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' });
        },
        once: true,
      });
    });

    /* — Section step items */
    document.querySelectorAll('.start-step, .pillar').forEach(function (el, i) {
      gsap.set(el, { opacity: 0, x: -16 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: function () {
          gsap.to(el, { opacity: 1, x: 0, duration: 0.55, delay: i * 0.05, ease: 'power2.out' });
        },
        once: true,
      });
    });
  }

  /* ── LENIS + GSAP INTEGRATION ────────────────────────────────────── */
  function initSmoothScroll(cb) {
    var lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); },
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenis.on('scroll', function () {
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    });
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    if (cb) cb();
  }

  /* ── TICKER ANIMATION ────────────────────────────────────────────── */
  function initTicker() {
    var wrap = document.querySelector('.nmd-ticker-wrap');
    if (!wrap) return;
    // Duplicate inner track for seamless loop
    var track = wrap.querySelector('.nmd-ticker-track');
    if (!track) return;
    var clone = track.cloneNode(true);
    wrap.querySelector('.nmd-ticker-track-wrap').appendChild(clone);
  }

  /* ── MAIN ────────────────────────────────────────────────────────── */
  function main() {
    injectGrain();
    initProgressBar();
    initHeader();
    initBreakingLabels();
    initTextScramble();
    initTicker();
    initCursor();
    initMagnetic();

    // Load GSAP → ScrollTrigger → Lenis → animations
    loadScripts([GSAP_CDN, ST_CDN, LENIS_CDN], function () {
      initSmoothScroll(function () {
        initGSAP();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }

}());
