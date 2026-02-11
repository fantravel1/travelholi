/* ============================================
   TravelHoli.com — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNav();
    initMobileMenu();
    initScrollReveal();
    initFAQ();
    initSmoothScroll();
    initCountdown();
  }

  /* ---------- Navigation scroll effect ---------- */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var scrollThreshold = 60;

    function handleScroll() {
      if (window.scrollY > scrollThreshold) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check on load
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.querySelector('.nav__menu');
    var overlay = document.querySelector('.nav-overlay');
    var links = document.querySelectorAll('.nav__link, .nav__cta');

    if (!toggle || !menu) return;

    function openMenu() {
      toggle.classList.add('nav__toggle--active');
      menu.classList.add('nav__menu--open');
      if (overlay) overlay.classList.add('nav-overlay--visible');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      toggle.classList.remove('nav__toggle--active');
      menu.classList.remove('nav__menu--open');
      if (overlay) overlay.classList.remove('nav-overlay--visible');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('nav__menu--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('nav__menu--open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything immediately
      reveals.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
    }
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq__item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq__question');
      var answer = item.querySelector('.faq__answer');

      if (!question || !answer) return;

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('faq__item--active');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('faq__item--active');
            var otherAnswer = otherItem.querySelector('.faq__answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            var otherBtn = otherItem.querySelector('.faq__question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('faq__item--active');
          answer.style.maxHeight = null;
          question.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('faq__item--active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '#0') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var navHeight = document.querySelector('.nav')
          ? document.querySelector('.nav').offsetHeight
          : 0;

        var targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      });
    });
  }

  /* ---------- Countdown to Holi 2026 ---------- */
  function initCountdown() {
    var countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;

    // Holi 2026: March 4, 2026
    var holiDate = new Date('2026-03-04T00:00:00+05:30');

    function updateCountdown() {
      var now = new Date();
      var diff = holiDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML =
          '<span class="countdown__message">Happy Holi 2026!</span>';
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.querySelector('.countdown__days').textContent = days;
      countdownEl.querySelector('.countdown__hours').textContent = String(hours).padStart(2, '0');
      countdownEl.querySelector('.countdown__minutes').textContent = String(minutes).padStart(2, '0');
      countdownEl.querySelector('.countdown__seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
})();
