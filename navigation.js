(() => {
  'use strict';
  const designs = new Set(['ink', 'academic', 'editorial', 'bento', 'simplefolio']);
  const filters = new Set(['systems', 'apps', 'ai', 'creative', 'live']);
  const projects = new Set(['patientflow', 'life-preference', 'gitlet', 'procmon', 'agent-skills', 'inkline']);
  const notes = Boolean(document.querySelector('.case-main'));
  const homeURL = new URL('index.html', location.href);
  const notesURL = new URL('project-notes.html', location.href);
  const links = [...document.querySelectorAll('a[href]')].filter(link => {
    const url = new URL(link.href);
    return url.origin === location.origin && url.pathname === (notes ? homeURL.pathname : notesURL.pathname);
  });

  function syncLinks() {
    const params = new URLSearchParams(location.search);
    const design = params.get('design');
    if (designs.has(design)) document.documentElement.dataset.design = design;
    let project;
    try { project = decodeURIComponent(location.hash.slice(1)); } catch { /* Invalid fragments use the project list. */ }
    links.forEach(link => {
      const url = new URL(link.href);
      for (const [key, allowed] of [['design', designs], ['filter', filters]]) {
        const value = params.get(key);
        if (allowed.has(value)) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      if (notes) url.hash = projects.has(project) ? project : 'projects';
      link.href = `${url.pathname}${url.search}${url.hash}`;
    });
  }

  for (const event of ['portfolio:navigation', 'popstate', 'hashchange', 'pageshow']) window.addEventListener(event, syncLinks);
  // Keep native navigation, modifier-click, downloads, and browser history intact.
  // Refresh before activation as a safeguard when another script changes the URL.
  for (const event of ['click', 'auxclick', 'contextmenu']) document.addEventListener(event, syncLinks, {capture:true});
  syncLinks();

  // One shared viewport light for the homepage and project notes. It never
  // captures input or moves content, and schedules no frames while idle.
  if (document.documentElement.dataset.design === 'ink') {
    const pointerEffects = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const aura = document.createElement('div');
    const light = document.createElement('span');
    aura.className = 'pointer-aura';
    aura.setAttribute('aria-hidden', 'true');
    light.className = 'pointer-aura__light';
    aura.append(light);
    document.body.append(aura);
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lightX = 0;
    let lightY = 0;
    let trackingPointer = false;
    let lastFrameTime = null;
    function hideAura() {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      trackingPointer = false;
      lastFrameTime = null;
      aura.classList.remove('is-visible');
    }
    function paintAura(time) {
      pointerFrame = 0;
      // Time-based easing feels consistent at different refresh rates. Settle
      // without overshoot or a trailing animation loop after the mouse stops.
      const elapsed = lastFrameTime === null ? 1000 / 60 : Math.min(time - lastFrameTime, 64);
      const blend = 1 - Math.exp(-elapsed / 70);
      lightX += (pointerX - lightX) * blend;
      lightY += (pointerY - lightY) * blend;
      const settled = Math.hypot(pointerX - lightX, pointerY - lightY) < .2;
      if (settled) {
        lightX = pointerX;
        lightY = pointerY;
      }
      light.style.transform = `translate3d(${(lightX - 360).toFixed(2)}px, ${(lightY - 360).toFixed(2)}px, 0)`;
      aura.classList.add('is-visible');
      lastFrameTime = settled ? null : time;
      if (!settled) pointerFrame = requestAnimationFrame(paintAura);
    }
    document.addEventListener('pointermove', event => {
      if (!pointerEffects.matches || event.pointerType !== 'mouse') {
        hideAura();
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      // Re-enter at the mouse rather than flying in from an old position.
      if (!trackingPointer) {
        lightX = pointerX;
        lightY = pointerY;
        trackingPointer = true;
      }
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintAura);
    }, {passive:true});
    document.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse') hideAura();
    }, {passive:true});
    document.documentElement.addEventListener('pointerleave', hideAura);
    document.addEventListener('pointercancel', hideAura);
    document.addEventListener('visibilitychange', hideAura);
    document.addEventListener('keydown', hideAura);
    pointerEffects.addEventListener('change', hideAura);
    for (const event of ['blur', 'resize', 'pagehide', 'pageshow', 'portfolio:navigation']) {
      window.addEventListener(event, hideAura);
    }
  }

  // A decorative reading indicator follows content height, including disclosures.
  const header = document.querySelector('.site-header');
  if (header) {
    const progress = document.createElement('span');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    header.append(progress);
    let frame = 0;
    function updateProgress() {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      progress.style.transform = `scaleX(${fraction})`;
    }
    function scheduleProgress() {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    }
    for (const event of ['scroll', 'resize', 'pageshow', 'portfolio:navigation']) {
      window.addEventListener(event, scheduleProgress, {passive:true});
    }
    document.addEventListener('toggle', scheduleProgress, true);
    if ('ResizeObserver' in window) new ResizeObserver(scheduleProgress).observe(document.body);
    scheduleProgress();
  }
})();
