import { test as base } from './app.fixture';
import { DashboardPage } from '../../pages/dashboard/dashboard-page';
import { env } from '../../utils/env';

type AuthFixtures = {
    adminDashboard: DashboardPage;
    userDashboard: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
    adminDashboard: async ({ loginReady, dashboardPage }, use) => {
        await loginReady.loginUser(env.adminEmail, env.adminPassword);
        await dashboardPage.verifyDashboardPage();

        await use(dashboardPage);
    },

    userDashboard: async ({ loginReady, dashboardPage }, use) => {
        await loginReady.loginUser(env.userEmail, env.userPassword);
        await dashboardPage.verifyDashboardPage();

        await use(dashboardPage);
    },
});
