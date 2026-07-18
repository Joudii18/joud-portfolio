// ─── Shared across every page: theme toggle, navbar shadow, scroll reveal ───
(function () {
  'use strict';

  function applyThemeIcon(btn, theme) {
    if (!btn) return;
    btn.textContent = theme === 'light' ? '🌙' : '☀️';
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  }

  function initThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyThemeIcon(btn, current);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      if (next === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode, ignore */ }
      applyThemeIcon(btn, next);
    });
  }

  function initNavbarShadow() {
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbarShadow();
    initScrollReveal();
  });
})();
