(() => {
  'use strict';
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  function focusSection() {
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
    if (!target) return;
    const heading = target.querySelector('h1, h2') || target;
    heading.setAttribute('tabindex', '-1');
    heading.focus({preventScroll:true});
  }
  window.addEventListener('hashchange', focusSection);
  // Initial fragment navigation runs after deferred scripts; focus once it settles.
  window.addEventListener('pageshow', () => requestAnimationFrame(focusSection));
})();
