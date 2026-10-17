const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const ROUTES = [
  { path: '/', name: 'home-portfolio' },
  { path: '/assignments', name: 'assignments-gallery' },
  { path: '/assignments/EW-01', name: 'assignment-detail-awaiting' },
  { path: '/assignments/EW-05', name: 'assignment-detail-deliverables' },
  { path: '/timeline', name: 'timeline' },
];

(async () => {
  const browser = await chromium.launch();
  const outputDir = path.join(__dirname, '..', 'docs', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Capturing real screenshots across viewports for final 3-section portfolio...');

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route.path}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);

        const screenshotPath = path.join(outputDir, `${route.name}-${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`✓ [${vp.name}] ${route.path} saved`);
      } catch (err) {
        console.error(`✗ [${vp.name}] ${route.path} error:`, err.message);
      }
    }
    await context.close();
  }

  // Theme testing: capture dark vs light on desktop
  const lightContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const lightPage = await lightContext.newPage();
  await lightPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(outputDir, 'home-portfolio-desktop-light.png'), fullPage: true });
  console.log(`✓ [desktop-light] / saved`);

  await lightPage.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle' });
  await lightPage.evaluate(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await lightPage.waitForTimeout(300);
  await lightPage.screenshot({ path: path.join(outputDir, 'assignments-gallery-desktop-light.png'), fullPage: true });
  console.log(`✓ [desktop-light] /assignments saved`);

  await lightContext.close();
  await browser.close();
  console.log('All screenshots captured successfully.');
})();
