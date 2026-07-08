/* ===========================
   HRGenX — custom.js (vanilla JS, no jQuery)
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Dynamic year ---- */
  var yearEl = document.getElementById('displayYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Sticky nav: add .scrolled on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ---- Hamburger toggle ---- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // close when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ---- Active nav link (matches current page filename) ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // fallback: just show everything
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Smooth close mobile nav on outside click ---- */
  document.addEventListener('click', function (e) {
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!header.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    }
  });

});
