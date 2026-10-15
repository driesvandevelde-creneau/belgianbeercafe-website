/* Belgian Beer Café — site behaviour (no dependencies). All content is in the HTML; this only shows and hides it. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Mobile menu: close after choosing a link */
  $$('.burger').forEach(function (d) {
    $$('a', d).forEach(function (a) { a.addEventListener('click', function () { d.removeAttribute('open'); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') d.removeAttribute('open'); });
  });

  /* Generic tabs: <div data-tabs> with buttons [data-panel="id"] */
  $$('[data-tabs]').forEach(function (group) {
    var btns = $$('[data-panel]', group);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (o) {
          var on = o === b;
          o.classList.toggle('tab--on', on);
          o.setAttribute('aria-selected', on ? 'true' : 'false');
          var p = document.getElementById(o.getAttribute('data-panel'));
          if (p) p.hidden = !on;
        });
      });
    });
  });

  /* Café finder: region tabs, search, load more */
  var finder = $('[data-finder]');
  if (finder) {
    var cards = $$('.loc', finder), step = 6, shown = step, region = 'me', q = '';
    var regionBtns = $$('[data-region]', finder), input = $('#q', finder), form = $('form', finder);
    var more = $('[data-more]', finder), none = $('[data-none]', finder);
    var apply = function () {
      var hits = cards.filter(function (c) {
        return q ? c.getAttribute('data-kw').indexOf(q) >= 0 : c.getAttribute('data-r') === region;
      });
      cards.forEach(function (c) { c.hidden = true; });
      hits.slice(0, shown).forEach(function (c) { c.hidden = false; });
      if (more) more.hidden = hits.length <= shown;
      if (none) none.hidden = hits.length > 0;
    };
    regionBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        region = b.getAttribute('data-region'); q = ''; shown = step; if (input) input.value = '';
        regionBtns.forEach(function (o) { o.classList.toggle('tab--on', o === b); o.setAttribute('aria-selected', o === b ? 'true' : 'false'); });
        apply();
      });
    });
    if (input) input.addEventListener('input', function () { q = input.value.toLowerCase().trim(); shown = step; apply(); });
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); q = input.value.toLowerCase().trim(); shown = step; apply(); });
    if (more) $('button', more).addEventListener('click', function () { shown += step; apply(); });
    apply();
  }

  /* Menus section: region tabs filter the café tabs; café tabs switch panels */
  var menus = $('[data-menus]');
  if (menus) {
    var mRegionBtns = $$('[data-mregion]', menus), cafeBtns = $$('[data-menu]', menus), panels = $$('.menupanel', menus);
    var pickCafe = function (id) {
      cafeBtns.forEach(function (b) { var on = b.getAttribute('data-menu') === id; b.classList.toggle('tab--on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      panels.forEach(function (p) { p.hidden = p.id !== 'menu-' + id; });
    };
    var pickRegion = function (r) {
      mRegionBtns.forEach(function (b) { var on = b.getAttribute('data-mregion') === r; b.classList.toggle('tab--on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      var first = null;
      cafeBtns.forEach(function (b) { var vis = b.getAttribute('data-r') === r; b.hidden = !vis; if (vis && !first) first = b; });
      if (first) pickCafe(first.getAttribute('data-menu'));
    };
    mRegionBtns.forEach(function (b) { b.addEventListener('click', function () { pickRegion(b.getAttribute('data-mregion')); }); });
    cafeBtns.forEach(function (b) { b.addEventListener('click', function () { pickCafe(b.getAttribute('data-menu')); }); });
    pickRegion('me');
  }

  /* Photo carousels */
  $$('[data-carousel]').forEach(function (c) {
    var slides = JSON.parse(c.getAttribute('data-carousel')), i = 0, img = $('img', c), dots = $('.carousel__dots', c);
    var show = function () { img.src = slides[i].src; img.alt = slides[i].alt; dots.textContent = (i + 1) + ' / ' + slides.length; };
    $('[data-prev]', c).addEventListener('click', function () { i = (i - 1 + slides.length) % slides.length; show(); });
    $('[data-next]', c).addEventListener('click', function () { i = (i + 1) % slides.length; show(); });
  });

  /* Printed menu book + full-screen reader */
  $$('[data-book]').forEach(function (book) {
    var data = JSON.parse(book.getAttribute('data-book')), names = data.names, pages = data.pages, venue = data.venue;
    var cat = 'food', pg = 0;
    var scope = book.closest('[data-book-scope]') || document;
    var p1 = $('.book__page--1', book), p2 = $('.book__page--2', book), blank = $('.book__blank', book), label = $('[data-book-label]', book);
    var reader = $('[data-reader]', scope), rImg = reader && $('.reader__page', reader), rTitle = reader && $('.reader__title', reader);
    var render = function () {
      var list = pages[cat], n = list.length; pg = Math.min(pg, n - 1); pg -= pg % 2;
      var has2 = pg + 1 < n;
      p1.src = list[pg]; p1.alt = venue + ' menu, ' + names[cat] + ' page ' + (pg + 1);
      p2.hidden = !has2; blank.hidden = has2;
      if (has2) { p2.src = list[pg + 1]; p2.alt = venue + ' menu, ' + names[cat] + ' page ' + (pg + 2); }
      label.textContent = names[cat] + ' · ' + (has2 ? 'Pages ' + (pg + 1) + ' - ' + (pg + 2) + ' of ' + n : 'Page ' + (pg + 1) + ' of ' + n);
      if (reader) { rImg.src = list[pg]; rImg.alt = p1.alt; rTitle.textContent = venue + ' · ' + names[cat] + ' · Page ' + (pg + 1) + ' of ' + n; }
      $$('[data-cat]', scope).forEach(function (b) { b.classList.toggle('tab--on', b.getAttribute('data-cat') === cat); });
    };
    var prev = function () { var n = pages[cat].length; pg = pg - 2 < 0 ? (n - 1) - ((n - 1) % 2) : pg - 2; render(); };
    var next = function () { var n = pages[cat].length; pg = pg + 2 >= n ? 0 : pg + 2; render(); };
    $$('[data-cat]', scope).forEach(function (b) { b.addEventListener('click', function () { cat = b.getAttribute('data-cat'); pg = 0; render(); }); });
    $$('[data-book-prev]', scope).forEach(function (b) { b.addEventListener('click', prev); });
    $$('[data-book-next]', scope).forEach(function (b) { b.addEventListener('click', next); });
    var open = function () { reader.hidden = false; document.body.style.overflow = 'hidden'; };
    var close = function () { reader.hidden = true; document.body.style.overflow = ''; };
    $$('[data-reader-open]', scope).forEach(function (b) { b.addEventListener('click', open); });
    $$('[data-reader-close]', scope).forEach(function (b) { b.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (!reader || reader.hidden) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next();
    });
    render();
  });
})();
