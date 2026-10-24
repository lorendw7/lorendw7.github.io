// Checks actual browser navigation; deployed destinations are stubbed to keep the suite deterministic.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.argv[2] || 'http://127.0.0.1:8765/';
const destinations = {
  inkline: 'https://lorendw7.github.io/inkline/',
  'starry-eyes': 'https://starry-eyes.vercel.app/',
  balloonshooter: 'https://lorendw7.github.io/BalloonBarrage/en/'
};

(async () => {
  const browser = await chromium.launch({headless:true, channel:process.env.PLAYWRIGHT_CHANNEL || undefined});
  const errors = [];
  try {
    for (const width of [1440, 768, 390, 320]) {
      const context = await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
      for (const url of Object.values(destinations)) await context.route(url, route => route.fulfill({contentType:'text/html',body:'<title>Destination</title><h1>Website opened</h1>'}));
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, {waitUntil:'domcontentloaded'});
      await page.locator('[data-filter=live]').click();
      assert.equal(new URL(page.url()).searchParams.get('filter'), 'live');
      assert.deepEqual(await page.locator('.project-card:visible').evaluateAll(cards => cards.map(card => card.id)), Object.keys(destinations));
      assert.equal(await page.locator('#project-count').innerText(), 'Showing 3 of 10 projects');
      assert.match(await page.locator('#more-projects summary').innerText(), /Hide additional projects \(2\)/);
      for (const [id,url] of Object.entries(destinations)) {
        const preview = page.locator(`#${id} .website-preview img`);
        await preview.scrollIntoViewIfNeeded();
        await preview.evaluate(img => img.decode());
        assert.equal(await preview.evaluate(img => img.naturalWidth > 0 && Math.abs(img.getBoundingClientRect().width / img.getBoundingClientRect().height - 1.6) < 0.01), true);
        assert.ok(await preview.getAttribute('alt'));
        assert.equal(await page.locator(`#${id} .website-preview`).evaluate(el => el.scrollWidth <= el.clientWidth), true);
        // Visual panels, titles, and CTAs must all lead to the actual website, with no overlay intercepting them.
        for (const selector of ['.live-preview', 'h3 a', '.live-cta']) {
          const link = page.locator(`#${id} ${selector}`);
          assert.equal(await link.getAttribute('href'), url);
          const [popup] = await Promise.all([page.waitForEvent('popup'), link.click()]);
          await popup.waitForLoadState('domcontentloaded');
          assert.equal(popup.url(), url);
          assert.equal(await popup.evaluate(() => window.opener), null);
          await popup.close();
          assert.equal(new URL(page.url()).searchParams.get('filter'), 'live');
        }
      }
      await page.reload({waitUntil:'domcontentloaded'});
      assert.equal(await page.locator('.project-card:visible').count(), 3);
      await page.locator('[data-filter=systems]').click();
      await page.goBack({waitUntil:'domcontentloaded'});
      await page.waitForFunction(() => document.querySelector('[data-filter=live]').getAttribute('aria-pressed') === 'true');
      assert.equal(await page.locator('.project-card:visible').count(), 3);
      await page.goto(`${base}?filter=live#life-preference`, {waitUntil:'domcontentloaded'});
      assert.equal(await page.locator('#life-preference').isVisible(), true);
      assert.equal(new URL(page.url()).searchParams.has('filter'), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await context.close();
      console.log(`${width}px: live filter, all website links, popups, reload, history and deep-link recovery passed`);
    }

    for (const design of ['academic', 'editorial', 'bento', 'simplefolio']) {
      const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}?design=${design}&filter=live`, {waitUntil:'domcontentloaded'});
      await page.locator('#inkline a[href*="project-notes.html"]').click();
      assert.equal(new URL(page.url()).searchParams.get('design'), design);
      assert.equal(new URL(page.url()).searchParams.get('filter'), 'live');
      assert.equal(new URL(page.url()).hash, '#inkline');
      assert.equal(await page.locator('html').getAttribute('data-design'), design);
      await page.waitForFunction(() => document.activeElement.id === 'inkline-title');
      await page.locator('.case-back').click();
      assert.equal(new URL(page.url()).hash, '#inkline');
      assert.equal(await page.locator('[data-filter=live]').getAttribute('aria-pressed'), 'true');
      // Returning from a different notes section reveals that project even when the original filter excludes it.
      await page.locator('#inkline a[href*="project-notes.html"]').click();
      await page.locator('.project-shortcuts a[href="#procmon"]').click();
      await page.locator('.case-back').click();
      assert.equal(new URL(page.url()).hash, '#procmon');
      assert.equal(await page.locator('#procmon').isVisible(), true);
      assert.equal(await page.locator('[data-filter=all]').getAttribute('aria-pressed'), 'true');
      await page.locator('[data-filter=live]').click();
      for (const id of Object.keys(destinations)) {
        const preview = page.locator(`#${id} .website-preview img`);
        await preview.scrollIntoViewIfNeeded();
        await preview.evaluate(img => img.decode());
        assert.equal(await preview.evaluate(img => {
          const box = img.getBoundingClientRect();
          const frame = img.closest('.website-preview').getBoundingClientRect();
          return box.width > 0 && box.top >= frame.top && box.bottom <= frame.bottom;
        }), true, `${design}: preview must fit its frame`);
      }
      // A non-link description must remain selectable, rather than being covered by a stretched title link.
      assert.equal(await page.locator('#inkline > p').first().evaluate(el => {
        el.scrollIntoView();
        const box = el.getBoundingClientRect();
        return Boolean(document.elementFromPoint(box.x + 12, box.y + 12).closest('a'));
      }), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.close();
    }

    for (const motion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({reducedMotion:motion});
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => addEventListener('pagereveal', event => { window.transitionObserved = Boolean(event.viewTransition); }));
      await page.goto(base, {waitUntil:'domcontentloaded'});
      await page.locator('#patientflow a[href*="project-notes.html"]').click();
      await page.waitForFunction(() => typeof window.transitionObserved === 'boolean');
      const observed = await page.evaluate(() => window.transitionObserved);
      if (motion === 'reduce') assert.equal(observed, false, 'Reduced motion disables the cross-document animation');
      console.log(`Page navigation with ${motion}: native transition ${observed ? 'observed' : 'disabled or unsupported'}`);
      await page.goBack({waitUntil:'domcontentloaded'});
      assert.equal(await page.locator('#patientflow').isVisible(), true);
      await page.close();
    }

    const noJS = await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:844}});
    await noJS.goto(base, {waitUntil:'load'});
    await noJS.locator('#more-projects summary').click();
    assert.equal(await noJS.locator('.live-cta:visible').count(), 3);
    assert.equal(await noJS.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await noJS.locator('#inkline a[href*="project-notes.html"]').click();
    assert.equal(new URL(noJS.url()).hash, '#inkline');
    await noJS.locator('.case-back').click();
    assert.equal(await noJS.locator('#projects').isVisible(), true);
    await noJS.close();
    assert.deepEqual(errors, []);
    console.log('All design variants, return context, text selection and no-JavaScript navigation passed; no script errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
