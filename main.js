(() => {
  'use strict';
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  if (['academic', 'editorial', 'bento'].includes(params.get('design'))) root.dataset.design = params.get('design');
  const languageButton = document.querySelector('#language');
  const translated = [...document.querySelectorAll('[data-zh]')];
  translated.forEach(element => { element.dataset.en = element.textContent; });
  let language = params.get('lang') === 'zh' ? 'zh' : 'en';
  const cards = [...document.querySelectorAll('[data-category]')];
  const updateCount = () => { const n = cards.filter(card => !card.hidden).length; document.querySelector('#project-count').textContent = language === 'zh' ? `显示 ${n} 个项目` : `${n} projects shown`; };
  function setLanguage() {
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    translated.forEach(element => { element.textContent = element.dataset[language]; });
    languageButton.textContent = language === 'zh' ? 'EN' : '中文';
    languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换至中文');
    document.title = language === 'zh' ? '何单东 — 研究与工程' : 'Shandong He — Research & Engineering';
    updateCount();
  }
  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    const url = new URL(location.href);
    if (language === 'zh') url.searchParams.set('lang', 'zh'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    setLanguage();
  });
  setLanguage();
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
    updateCount();
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
