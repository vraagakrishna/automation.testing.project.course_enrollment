import { test as base } from './app.fixture';
import { DashboardPage } from '../../pages/dashboard/dashboard-page';
import { loginAndVerify } from '../../flows/auth-login.flow';

type AuthFixtures = {
    adminDashboard: DashboardPage;
    userDashboard: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
    adminDashboard: async ({ loginReady, dashboardPage }, use) => {
        await loginAndVerify('admin', {
            loginReady,
            dashboardPage,
        });
        await use(dashboardPage);
    },

    userDashboard: async ({ loginReady, dashboardPage }, use) => {
        await loginAndVerify('user', {
            loginReady,
            dashboardPage,
        });

        await use(dashboardPage);
    },
});
