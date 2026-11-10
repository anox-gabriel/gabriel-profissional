/* Empreendi Contabilidade — interações (JS puro, sem bibliotecas) */
(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.querySelector('.header');
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('menu');
  var waFloat = document.querySelector('.wa-float');
  var hero = document.querySelector('.hero');

  /* Ano no rodapé */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* Header ao rolar + botão flutuante de WhatsApp */
  function onScroll() {
    var s = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', s > 30);
    if (waFloat && hero) waFloat.classList.toggle('is-on', s > hero.offsetHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  burger.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Revelar ao rolar */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    // pequeno atraso em cascata para elementos irmãos
    document.querySelectorAll('.cards, .benefits__list, .hero__copy').forEach(function (group) {
      group.querySelectorAll('.reveal').forEach(function (el, i) { el.style.setProperty('--rd', (i * 0.08) + 's'); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Link do menu ativo conforme a seção */
  var links = nav.querySelectorAll('a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute('href'));
      if (sec) spy.observe(sec);
    });
  }

  /* Abas de serviços (acessíveis por teclado) */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function activate(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { activate(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); activate(n, true); }
    });
  });

  /* Carrossel de depoimentos: setas + arrastar com o mouse */
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('.slider__track');
    var prev = slider.querySelector('[data-prev]');
    var next = slider.querySelector('[data-next]');
    function step() {
      var card = track.querySelector('.review');
      return card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 4;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max;
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    // arrastar (só mouse; no toque o scroll nativo já resolve)
    var down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add('is-drag'); }
      track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      track.classList.remove('is-drag');
      if (moved) { // encaixa no card mais próximo
        var s = step();
        track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: 'smooth' });
      }
    });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
  });
})();
