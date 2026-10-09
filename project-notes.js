(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const translated = [...document.querySelectorAll('[data-zh]')];
  translated.forEach(element => { element.dataset.en = element.textContent; });
  const button = document.querySelector('#language');
  let language = params.get('lang') === 'zh' ? 'zh' : 'en';
  const backLinks = [...document.querySelectorAll('a[href^="index.html"]')];
  function setLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    translated.forEach(element => { element.textContent = element.dataset[language]; });
    button.textContent = language === 'zh' ? 'EN' : '中文';
    button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换至中文');
    document.title = language === 'zh' ? '项目证据 — 何单东' : 'Project evidence — Shandong He';
    backLinks.forEach(link => { link.href = language === 'zh' ? 'index.html?lang=zh#projects' : 'index.html#projects'; });
  }
  button.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    const url = new URL(location.href);
    if (language === 'zh') url.searchParams.set('lang', 'zh'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    setLanguage();
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  setLanguage();
})();
