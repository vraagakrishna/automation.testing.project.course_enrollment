import test from '@playwright/test';
import { HomePage } from '../pages/home-page';

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('Verify Home Page is verified', async ({ page }) => {
        const hp = new HomePage(page);
        await hp.verifyHomePage();
    });
});
