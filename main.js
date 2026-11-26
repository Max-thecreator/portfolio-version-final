(function () {
  'use strict';

  /* --- Menu mobile --- */
  var btn = document.getElementById('navtoggle');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Lien de navigation actif selon la section visible --- */
  var links = Array.prototype.slice.call(document.querySelectorAll('nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-72px 0px -65% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- Apparition progressive des blocs --- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section-head, .lead, .bloc, .skill, .project, .tl-item, .edu-item, .org-card, .syn-wrap, .syn-id, .journal, .veille-table, .interests, .contact-row, .syn-dl, .opts');
  if (!reduce && 'IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- Bouton retour en haut --- */
  var top = document.querySelector('.to-top');
  if (top) {
    window.addEventListener('scroll', function () {
      top.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
  }

  /* --- Année du pied de page --- */
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
