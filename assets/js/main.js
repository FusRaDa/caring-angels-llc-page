/*
    Static/vanilla-JS adaptation of Solid State by HTML5 UP.
    Original design: html5up.net | @ajlkn
    CCA 3.0 license: html5up.net/license
*/

(function () {
  'use strict';

  const body = document.body;
  const header = document.getElementById('header');
  const banner = document.getElementById('banner');
  const menu = document.getElementById('menu');

  // Play initial animations on page load.
  window.addEventListener('load', function () {
    window.setTimeout(function () {
      body.classList.remove('is-preload');
    }, 100);
  });

  // Match the original alternate-header behavior while the banner is visible.
  function updateHeader() {
    if (!banner || !header || !header.classList.contains('alt') && !header.dataset.altHeader) return;

    const bannerBottom = banner.getBoundingClientRect().bottom;
    const headerHeight = header.offsetHeight;

    if (bannerBottom <= headerHeight) {
      header.classList.remove('alt');
    } else if (header.dataset.altHeader === 'true') {
      header.classList.add('alt');
    }
  }

  if (banner && header && header.classList.contains('alt')) {
    header.dataset.altHeader = 'true';
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    updateHeader();
  }

  if (!menu) return;

  // The original Solid State script moves the menu outside #page-wrapper.
  // This is required because #page-wrapper is blurred when the menu opens;
  // leaving #menu inside it would blur the overlay too.
  document.body.appendChild(menu);

  let locked = false;
  function lock() {
    if (locked) return false;
    locked = true;
    window.setTimeout(function () { locked = false; }, 350);
    return true;
  }

  function showMenu() {
    if (lock()) body.classList.add('is-menu-visible');
  }

  function hideMenu() {
    if (lock()) body.classList.remove('is-menu-visible');
  }

  function toggleMenu() {
    if (!lock()) return;
    body.classList.toggle('is-menu-visible');
  }

  document.querySelectorAll('a[href="#menu"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu();
    });
  });

  menu.addEventListener('click', function (event) {
    if (event.target === menu) hideMenu();
  });

  const inner = menu.querySelector('.inner');
  const close = menu.querySelector('.close');

  if (inner) inner.addEventListener('click', function (event) { event.stopPropagation(); });
  if (close) close.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    hideMenu();
  });

  menu.querySelectorAll('.links a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      event.preventDefault();
      body.classList.remove('is-menu-visible');
      window.setTimeout(function () { window.location.href = href; }, 350);
    });
  });

  body.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) hideMenu();
  });
})();
