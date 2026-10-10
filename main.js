(() => {
  'use strict';
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  if (['academic', 'editorial', 'bento', 'simplefolio'].includes(params.get('design'))) root.dataset.design = params.get('design');
  const cards = [...document.querySelectorAll('[data-category]')];
  const moreProjects = document.querySelector('#more-projects');
  const archiveCards = [...moreProjects.querySelectorAll('[data-category]')];
  const updateCount = () => {
    const n = cards.filter(card => !card.hidden && (!moreProjects.contains(card) || (!moreProjects.hidden && moreProjects.open))).length;
    document.querySelector('#project-count').textContent = `Showing ${n} of ${cards.length} projects`;
  };
  updateCount();
  const menu = document.querySelector('#menu');
  const nav = document.querySelector('#navigation');
  const header = document.querySelector('.site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => { menu.setAttribute('aria-expanded', String(nav.classList.toggle('is-open'))); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 651px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    if (button.dataset.filter === 'all') {
      moreProjects.hidden = false;
      moreProjects.open = false;
    } else {
      const hasArchivedMatches = archiveCards.some(card => !card.hidden);
      moreProjects.hidden = !hasArchivedMatches;
      moreProjects.open = hasArchivedMatches;
    }
    updateCount();
  }));
  moreProjects.addEventListener('toggle', updateCount);
  document.querySelectorAll('.project-shortcuts a').forEach(link => link.addEventListener('click', () => {
    if (document.querySelector(link.hash).hidden) document.querySelector('[data-filter="all"]').click();
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    }), { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('#research, #projects, #awards, #about, #contact').forEach(section => observer.observe(section));
  }
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
