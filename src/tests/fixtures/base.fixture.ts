import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { NavBar } from '../../components/nav-bar';
import { LoginPage } from '../../pages/auth/login-page';
import { DashboardPage } from '../../pages/dashboard/dashboard-page';

type MyFixtures = {
    homePage: HomePage;
    navBar: NavBar;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const hp = new HomePage(page);
        await use(hp);
    },

    navBar: async ({ page }, use) => {
        const nb = new NavBar(page);
        await use(nb);
    },

    loginPage: async ({ page }, use) => {
        const lp = new LoginPage(page);
        await use(lp);
    },

    dashboardPage: async ({ page }, use) => {
        const dp = new DashboardPage(page);
        await use(dp);
    },
});
