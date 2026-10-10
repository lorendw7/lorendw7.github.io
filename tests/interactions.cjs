// Run against a static server. PLAYWRIGHT_MODULE and PLAYWRIGHT_CHANNEL are optional.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.argv[2] || 'http://127.0.0.1:8765/';
const expected = ['PatientFlow Cloud', 'Life Preference', 'Gitlet', 'Agent Skills Manager', 'Inkline'];

(async () => {
  const browser = await chromium.launch({headless:true, channel:process.env.PLAYWRIGHT_CHANNEL || undefined});
  try {
    const errors = [];
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({viewport:{width, height:844}, reducedMotion:'reduce'});
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base);
      assert.deepEqual(await page.locator('.featured-grid h3').allTextContents(), expected);
      assert.equal(await page.locator('.project-card:visible').count(), 5);
      await page.locator('[data-filter=creative]').click();
      assert.equal(new URL(page.url()).searchParams.get('filter'), 'creative');
      assert.equal(await page.locator('.project-card:visible').count(), 2);
      assert.match(await page.locator('#more-projects summary').innerText(), /Hide additional projects \(2\)/);
      await page.locator('#more-projects summary').click();
      await page.locator('[data-filter=creative]').click();
      assert.equal(await page.locator('#more-projects').evaluate(el => el.open), false, 'Selecting the current filter must preserve collapse state');
      assert.equal(await page.locator('#project-count').innerText(), 'Showing 0 of 10 projects');
      await page.locator('[data-filter=systems]').click();
      assert.equal(await page.locator('.project-card:visible').count(), 4);
      assert.match(await page.locator('#more-projects summary').innerText(), /\(1\)/);
      await page.goBack();
      await page.waitForFunction(() => document.querySelector('[data-filter=creative]').getAttribute('aria-pressed') === 'true');
      assert.equal(await page.locator('#more-projects').evaluate(el => el.open), false);
      await page.goForward();
      await page.waitForFunction(() => document.querySelector('[data-filter=systems]').getAttribute('aria-pressed') === 'true');
      await page.locator('[data-filter=ai]').click();
      await page.locator('.project-shortcuts a[href="#life-preference"]').click();
      assert.equal(await page.locator('#life-preference').isVisible(), true);
      assert.equal(new URL(page.url()).searchParams.has('filter'), false);
      assert.equal(await page.evaluate(() => document.activeElement.closest('.project-card').id), 'life-preference');
      await page.locator('[data-filter=ai]').click();
      await page.evaluate(() => { location.hash = 'life-preference'; });
      await page.waitForFunction(() => !document.querySelector('#life-preference').hidden);
      assert.equal(new URL(page.url()).searchParams.has('filter'), false);
      await page.goto(`${base}?filter=apps#balloonshooter`);
      await page.waitForFunction(() => document.querySelector('#more-projects').open);
      assert.equal(await page.locator('#balloonshooter').isVisible(), true);
      assert.equal(await page.locator('[data-filter=all]').getAttribute('aria-pressed'), 'true');
      await page.goto(`${base}?filter=creative`);
      assert.equal(await page.locator('.project-card:visible').count(), 2);
      await page.reload();
      assert.equal(await page.locator('[data-filter=creative]').getAttribute('aria-pressed'), 'true');
      await page.goto(base);
      if (width <= 650) {
        await page.locator('#menu').click();
        assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'true');
        assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '#projects');
        await page.keyboard.press('Escape');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'menu');
        assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'false');
        await page.locator('#menu').click();
        await page.locator('.hero-image').click();
        assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'false');
        await page.locator('#menu').click();
        for (let tab = 0; tab < 6; tab++) await page.keyboard.press('Tab');
        assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'false', 'Menu closes when keyboard focus leaves');
        await page.locator('#menu').click();
        await page.locator('#navigation a[href="#projects"]').click();
        assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'false');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'projects-title');
        await page.locator('#menu').click();
        await page.setViewportSize({width:900, height:844});
        assert.equal(await page.locator('#menu').getAttribute('aria-expanded'), 'false');
        await page.setViewportSize({width, height:844});
      }
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForFunction(() => document.querySelector('#navigation a[href="#contact"]').getAttribute('aria-current') === 'location');
      await page.locator('footer a[href="#home"]').click();
      await page.waitForFunction(() => window.scrollY < 5);
      await page.waitForFunction(() => !document.querySelector('#navigation [aria-current]'));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.close();
      console.log(`${width}px: filters, browser history, deep links, menu focus, and scroll navigation passed`);
    }
    for (const design of ['academic', 'editorial', 'bento', 'simplefolio']) {
      const page = await browser.newPage({viewport:{width:390, height:844}, reducedMotion:'reduce'});
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}?design=${design}&filter=ai`);
      assert.equal(await page.locator('.project-card:visible').count(), 2);
      await page.locator('.project-shortcuts a[href="#gitlet"]').click();
      assert.equal(new URL(page.url()).searchParams.get('design'), design);
      assert.equal(await page.locator('#gitlet').isVisible(), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.close();
    }
    const noJS = await browser.newPage({javaScriptEnabled:false, viewport:{width:320, height:844}});
    await noJS.goto(base);
    assert.equal(await noJS.locator('#navigation').isVisible(), true);
    assert.equal(await noJS.locator('.filters').isVisible(), false);
    assert.equal(await noJS.locator('#menu').isVisible(), false);
    await noJS.locator('#more-projects summary').click();
    assert.equal(await noJS.locator('.project-card:visible').count(), 10);
    assert.equal(await noJS.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await noJS.close();
    assert.deepEqual(errors, []);
    console.log('All design variants and navigation without JavaScript passed; no script errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
