import { test, expect } from '@playwright/test';
import { RAScraper } from './script.js';

test('checking berlin agenda', async ({ page }) => {
  await page.goto('https://ra.co/events/de/berlin');

  const sc = new RAScraper

  sc.loadAllCurrentDay(page)

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});