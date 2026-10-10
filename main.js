(() => {
  'use strict';
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  if (['academic', 'editorial', 'bento', 'simplefolio'].includes(params.get('design'))) root.dataset.design = params.get('design');
  root.classList.add('js');
  const cards = [...document.querySelectorAll('[data-category]')];
  const moreProjects = document.querySelector('#more-projects');
  const archiveCards = [...moreProjects.querySelectorAll('[data-category]')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const filters = new Set(filterButtons.map(button => button.dataset.filter));
  const expandedByFilter = new Map([['all', moreProjects.open]]);
  let activeFilter;
  function updateProjects() {
    const archiveCount = archiveCards.filter(card => !card.hidden).length;
    const count = cards.filter(card => !card.hidden && (!moreProjects.contains(card) || (!moreProjects.hidden && moreProjects.open))).length;
    document.querySelector('#project-count').textContent = `Showing ${count} of ${cards.length} projects`;
    moreProjects.querySelector('summary span:first-child').textContent = `${moreProjects.open ? 'Hide' : 'Show'} additional projects (${archiveCount})`;
  }
  function targetFor(hash) {
    try { return hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null; }
    catch { return null; }
  }
  function writeFilter(url) {
    if (activeFilter === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', activeFilter);
    return url;
  }
  function applyFilter(value) {
    const next = filters.has(value) ? value : 'all';
    if (next === activeFilter) return;
    if (activeFilter) expandedByFilter.set(activeFilter, moreProjects.open);
    activeFilter = next;
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === next)));
    cards.forEach(card => { card.hidden = next !== 'all' && card.dataset.category !== next; });
    moreProjects.hidden = !archiveCards.some(card => !card.hidden);
    moreProjects.open = expandedByFilter.has(next) ? expandedByFilter.get(next) : next !== 'all';
    updateProjects();
    scheduleScrollUpdate();
  }
  function revealTarget(target) {
    if (target.closest('.project-card')?.hidden) applyFilter('all');
    if (moreProjects.contains(target)) {
      moreProjects.hidden = false;
      moreProjects.open = true;
      expandedByFilter.set(activeFilter, true);
      updateProjects();
    }
  }
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function focusTarget(target) {
    const destination = target.matches('main') ? target : target.querySelector('h1, h2, h3') || target;
    if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
    destination.focus({preventScroll:true});
  }
  const menu = document.querySelector('#menu');
  const nav = document.querySelector('#navigation');
  const header = document.querySelector('.site-header');
  function setMenu(open, returnFocus = false) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menu.textContent = open ? 'Close' : 'Menu';
    if (returnFocus) menu.focus({preventScroll:true});
  }
  menu.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    setMenu(open);
    if (open) nav.querySelector('a').focus({preventScroll:true});
  });
  document.addEventListener('pointerdown', event => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menu.contains(event.target)) setMenu(false);
  });
  document.addEventListener('focusin', event => {
    if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menu.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false, true);
  });
  matchMedia('(min-width: 651px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
    scheduleScrollUpdate();
  });
  const navLinks = [...nav.querySelectorAll('a')];
  const sections = navLinks.map(link => targetFor(link.hash));
  let scrollFrame = 0;
  function updateScrollState() {
    scrollFrame = 0;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    const threshold = header.getBoundingClientRect().bottom + 24;
    let current = sections.filter(section => section.getBoundingClientRect().top <= threshold).at(-1);
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
    navLinks.forEach(link => {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleScrollUpdate() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
  }
  window.addEventListener('scroll', scheduleScrollUpdate, {passive:true});
  window.addEventListener('resize', scheduleScrollUpdate, {passive:true});
  filterButtons.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.filter === activeFilter) return;
    applyFilter(button.dataset.filter);
    const url = writeFilter(new URL(location.href));
    if (targetFor(url.hash)?.closest('.project-card')?.hidden) url.hash = 'projects';
    history.pushState(null, '', url);
  }));
  moreProjects.addEventListener('toggle', () => {
    expandedByFilter.set(activeFilter, moreProjects.open);
    updateProjects();
    scheduleScrollUpdate();
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = targetFor(link.hash);
    if (!target) return;
    event.preventDefault();
    revealTarget(target);
    const url = writeFilter(new URL(location.href));
    url.hash = link.hash;
    if (url.href !== location.href) history.pushState(null, '', url);
    setMenu(false);
    target.scrollIntoView({block:'start', behavior:reducedMotion.matches ? 'instant' : 'smooth'});
    focusTarget(target);
    scheduleScrollUpdate();
  }));
  function restoreNavigation() {
    applyFilter(new URL(location.href).searchParams.get('filter'));
    const target = targetFor(location.hash);
    if (target) {
      revealTarget(target);
      const url = writeFilter(new URL(location.href));
      if (url.href !== location.href) history.replaceState(null, '', url);
      requestAnimationFrame(() => {
        target.scrollIntoView({block:'start', behavior:'instant'});
        focusTarget(target);
        scheduleScrollUpdate();
      });
    }
    setMenu(false);
    scheduleScrollUpdate();
  }
  window.addEventListener('popstate', restoreNavigation);
  window.addEventListener('hashchange', restoreNavigation);
  window.addEventListener('pageshow', scheduleScrollUpdate);
  restoreNavigation();
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
