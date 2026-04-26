import test from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/auth/login-page';
import { NavBar } from '../components/nav-bar';
import { DashboardPage } from '../pages/dashboard/dashboard-page';
import { env } from '../utils/env';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');

        const hp = new HomePage(page);
        await hp.verifyHomePage();

        const nb = new NavBar(page);
        await nb.clickLogin();

        const lp = new LoginPage(page);
        await lp.verifyLoginPage();
    });

    test('Submission of blank form', async ({ page }) => {
        const lp = new LoginPage(page);

        const alertPromise = lp.verifyErrorMessage('invalid');

        await lp.loginUser('dummy@gmail.com', 'something something');

        await alertPromise;
    });

    test('Login with invalid credentials', async ({ page }) => {
        const lp = new LoginPage(page);

        const alertPromise = lp.verifyErrorMessage('invalid');

        await lp.loginUser('dummy@gmail.com', 'something something');

        await alertPromise;
    });

    test('Login with valid credentials - Admin', async ({ page }) => {
        const lp = new LoginPage(page);

        await lp.loginUser(env.adminEmail, env.adminPassword);

        const dp = new DashboardPage(page);
        await dp.verifyDashboardPage();
    });

    test('Login with valid credentials - User', async ({ page }) => {
        const lp = new LoginPage(page);

        await lp.loginUser(env.userEmail, env.userPassword);

        const dp = new DashboardPage(page);
        await dp.verifyDashboardPage();
    });
});
