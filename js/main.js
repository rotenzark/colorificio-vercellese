/* Colorificio Vercellese — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate) + codice-firma del sito.
   GSAP/ScrollTrigger registrati SUBITO allo script load; reveal once:true;
   watchdog 1,5s; contenuto mai dipendente dall'animazione. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'colorificio-vercellese',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [],
      1: [['15:00', '19:30']],
      2: [['09:00', '12:30'], ['15:00', '19:30']],
      3: [['09:00', '12:30'], ['15:00', '19:30']],
      4: [['09:00', '12:30'], ['15:00', '19:30']],
      5: [['09:00', '12:30'], ['15:00', '19:30']],
      6: [['09:00', '12:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 2000,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.strada': 'The road', 'nav.trovi': 'What you find', 'nav.servizi': 'The shop',
      'nav.recensioni': 'Reviews', 'nav.dove': 'Where & when', 'nav.chiama': 'Call',
      'hero.recensioni': '124 reviews', 'hero.t2aria': 'of colour.',
      'hero.t1': 'THE ROAD',
      'hero.sub': 'Fine arts, paints, spray cans and made-to-measure colours at Via Raffaello Sanzio 30, a hundred metres from piazza De Angeli — a shop grinding colour since 1936.',
      'hero.cta1': 'Walk the road', 'hero.cta2': 'What you find', 'hero.credit': 'photo: Google Street View',
      'ticker.t1': 'made-to-measure colours', 'ticker.t2': 'fine arts · paints · spray',
      'ticker.t1b': 'made-to-measure colours', 'ticker.t2b': 'fine arts · paints · spray',
      'strada.kicker': 'Our story', 'strada.t1': 'The name is', 'strada.t2': 'a road',
      'strada.lead': 'The Colorificio Vercellese takes its name from the street where it was founded: the road — then unpaved, travelled by horse-drawn carts — that led from the centre of Milan towards Vercelli. Colour has never stopped since.',
      'tappa1.anno': 'June 1936', 'tappa1.t': 'The shop on the dirt road',
      'tappa1.p': 'The doors open: inside, paints are prepared the old way, with earths, lime and linseed oil. Outside, the carts roll by.',
      'tappa2.anno': 'The post-war years', 'tappa2.t': 'The window lights up',
      'tappa2.p': 'This is how the shop window looked right after the war: the metal-letter sign, the tins lined up under the light. The photo is the real one, from the family album.',
      'tappa3.anno': 'The nineties', 'tappa3.t': 'A hundred-metre move',
      'tappa3.p': 'From a small shop to 150 square metres: the Colorificio moves from Via Marghera to the parallel Via Raffaello Sanzio 30, where it still stands today.',
      'tappa4.anno': 'Today', 'tappa4.t': 'From lime to murals',
      'tappa4.p': 'In the window, columns of spray cans with rainbow caps; above the entrance, a mural: the road of colour has reached street art — through ninety years of brushes, canvases and paints.',
      'trovi.kicker': 'The shop', 'trovi.t1': 'What you find,', 'trovi.t2': 'by worlds of colour',
      'trovi.nota': '…and much, much more: if you can’t see it, ask at the counter.',
      'chip.arte': 'Fine arts', 'chip.casa': 'Home & paints', 'chip.spray': 'Street & spray', 'chip.hobby': 'Hobby & gifts',
      'v.colori': 'Artist colours', 'v.colori.d': 'Oil, acrylic, watercolour and tempera: Maimeri, Winsor & Newton, Talens, Lefranc, Pebeo.',
      'v.pennelli': 'Brushes', 'v.pennelli.d': 'Synthetic and natural hair — sable, ox, bristle, squirrel: Winsor & Newton, Da Vinci, Emiliano.',
      'v.carte': 'Papers and pencils', 'v.carte.d': 'Fabriano and Schoellers papers; Caran d’Ache, Stabilo, Conté, Derwent, Lyra pencils. Plus canvases, easels, accessories.',
      'v.idropitture': 'Wall paints and enamels', 'v.idropitture.d': 'Washable and breathable, satin, gloss and odourless: Duco, Keller, Tassani, Attiva, Max Mayer, Veneziani.',
      'v.effetti': 'Special effects', 'v.effetti.d': 'Trowel finishes, Venetian stuccoes, earths and oxides, wood line for restoration: waxes, shellac, fillers.',
      'v.attrezzi': 'Tools of the trade', 'v.attrezzi.d': 'Brushes, rollers, nets, poles, thinners, glues and tapes: everything you need, first coat to last.',
      'v.bombolette': 'Spray cans', 'v.bombolette.d': 'A whole window of columns, caps making a rainbow: for murals, touch-ups and creative projects.',
      'v.ral': 'RAL scale', 'v.ral.d': 'The colour coding for touch-ups and sample-matched painting: compare it at the counter, mistake less.',
      'v.decoupage': 'Découpage, stencils and fabrics', 'v.decoupage.d': 'Colours for fabric, glass and ceramics (Deka, Pebeo), stencil art and creative DIY materials.',
      'v.regalo': 'Gift ideas', 'v.regalo.d': 'Colour sets, fine pencils and little artist temptations: creative gifts for every occasion.',
      'servizi.kicker': 'The shop', 'servizi.t1': 'Advice', 'servizi.t2': 'comes with the price',
      's1.t': 'Technical advice', 's1.p': 'From “simple” wall painting to the less simple jobs — trowel finishes, Venetian stucco — with ninety years of experience behind the counter.',
      's2.t': 'Made-to-measure colours', 's2.p': 'With the professional tinting machine we prepare the colour chosen and created just for you.',
      's3.t': 'The right applicators', 's3.p': 'If you’d rather not do it yourself, we put you in touch with professionals in wall coverings and finishes.',
      's4.t': 'Home delivery', 's4.p': 'Possible depending on distance and purchase: call us and we’ll sort it out.',
      'rec.kicker': 'What people say', 'rec.t2': 'from 124 Google reviews',
      'rec.r1': '«Very kind, helpful, they give advice if you ask, and they’re fun: far better stocked than certain places I’ve seen in Brera.»',
      'rec.r2': '«Paradise for anyone looking for colours, brushes, hobby materials. The shop assistant is super kind, she helped me choose and I’m really satisfied.»',
      'rec.r3': '«I’ve come several times, for coloured spray cans and oil colours. Kind, helpful staff for every question about techniques — really well prepared!»',
      'rec.r4': '«Excellent, fully stocked, very competent, courteous and helpful staff.»',
      'rec.r5': '«Very kind and extremely competent.»',
      'dove.kicker': 'Where & when', 'dove.t1': 'A hundred metres', 'dove.t2': 'from piazza De Angeli',
      'dove.metro': 'Via Raffaello Sanzio 30, 20149 Milan · M1 De Angeli',
      'dove.nota': 'Mondays we open in the afternoon; Saturdays mornings only.',
      'dove.chiama': 'Call +39 02 4800 4230', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday',
      'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do you make made-to-measure colours?', 'faq.a1': 'Yes: with the professional tinting machine we prepare the colour chosen and created just for you, for walls and special projects.',
      'faq.q2': 'Do you carry fine-arts materials?', 'faq.a2': 'Yes: oils, acrylics, watercolours and tempera (Maimeri, Winsor & Newton, Talens), brushes, Fabriano papers, pencils and canvases.',
      'faq.q3': 'Do you stock spray cans?', 'faq.a3': 'Yes, a whole window of them: cans for murals, touch-ups and hobby work, with the RAL colour scale at hand.',
      'faq.q4': 'Do you deliver?', 'faq.a4': 'Possible, depending on distance and the type of purchase: call us on +39 02 4800 4230 and we’ll sort it out.',
      'faq.q5': 'Where are you and when are you open?', 'faq.a5': 'Via Raffaello Sanzio 30, about 100 metres from the M1 De Angeli station. Monday 3–7:30pm; Tuesday–Friday 9–12:30 and 3–7:30pm; Saturday 9–12:30.',
      'foot.dal': 'The road of colour since 1936 · Via Raffaello Sanzio 30, 20149 Milan · +39 02 4800 4230',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0 });
    } else {
      els.forEach(function (el) { el.style.opacity = 1; });
    }
    var path = document.getElementById('stradaPath');
    if (path) { path.style.strokeDashoffset = 0; }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    gsap.to('#heroPhoto', {
      yPercent: 10, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    /* GESTO-FIRMA: la strada che si disegna allo scroll.
       NB: la lunghezza si misura subito, l'animazione è scrub (non once):
       la strada "cammina" con chi scorre. Il watchdog la forza visibile. */
    var path = document.getElementById('stradaPath');
    if (path) {
      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      gsap.to(path, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '.strada', start: 'top 60%', end: 'bottom 70%', scrub: 0.6 },
      });
    }
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* ---------- hero entrance ---------- */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) {
      document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; });
      return;
    }
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .fromTo('.ht-1', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .6 }, .15)
      .fromTo('.ht-2', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .6 }, .35)
      .fromTo('.ht-2 i', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .35, stagger: .05, ease: 'back.out(1.6)' }, .5)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .9)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, 1.1);
  }

  /* ---------- intro ---------- */
  var intro = document.getElementById(SITE.introId);
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a'); if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (PLUMBING_V 1) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) };
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) };
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (PLUMBING_V 1) ---------- */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle');
    if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(root.lang === 'en' ? 'it' : 'en');
    });
  }
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ CODICE-FIRMA: chips dei mondi di colore ══════════ */
  var chips = document.querySelectorAll('.chip');
  var voci = document.querySelectorAll('.voce');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-selected', c === chip ? 'true' : 'false'); });
      var cat = chip.getAttribute('data-cat');
      voci.forEach(function (v) { v.classList.toggle('nascosta', v.getAttribute('data-cat') !== cat); });
    });
  });
  voci.forEach(function (v) { v.classList.toggle('nascosta', v.getAttribute('data-cat') !== 'arte'); });
})();
