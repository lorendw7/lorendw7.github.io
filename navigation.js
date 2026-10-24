(() => {
  'use strict';
  const designs = new Set(['academic', 'editorial', 'bento', 'simplefolio']);
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
})();
