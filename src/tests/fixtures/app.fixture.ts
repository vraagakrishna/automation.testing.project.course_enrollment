import { test as base } from './base.fixture';
import { LoginPage } from '../../pages/auth/login-page';
import { HomePage } from '../../pages/home-page';

type AppFixtures = {
    homeReady: HomePage;
    loginReady: LoginPage;
};

export const test = base.extend<AppFixtures>({
    homeReady: async ({ page, homePage }, use) => {
        await page.goto('');
        await homePage.verifyHomePage();

        await use(homePage);
    },

    loginReady: async ({ page, homePage, navBar, loginPage }, use) => {
        await page.goto('');
        await homePage.verifyHomePage();
        await navBar.clickLogin();
        await loginPage.verifyLoginPage();

        await use(loginPage);
    },
});
