const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // Wait for framer-motion animations
  await page.screenshot({ path: 'pixel_agents_test.png' });
  await browser.close();
})();
