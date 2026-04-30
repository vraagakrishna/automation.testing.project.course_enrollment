import { test as base } from './soft-assert.fixture';
import { HomePage } from '../../pages/home-page';
import { NavBar } from '../../components/nav-bar';
import { LoginPage } from '../../pages/auth/login-page';
import { DashboardPage } from '../../pages/dashboard/dashboard-page';
import { AdminDashboardPage } from '../../pages/dashboard/admin-dashboard.page';
import { EnrollmentsManagementPage } from '../../pages/admin/enrollments-management.page';
import { CourseManagementPage } from '../../pages/admin/course-management.page';
import { UserDashboardPage } from '../../pages/dashboard/user-dashboard.page';
import { CoursePage } from '../../pages/user/course.page';

type BaseFixtures = {
    homePage: HomePage;
    navBar: NavBar;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminDashboardPage: AdminDashboardPage;
    enrollmentsManagementPage: EnrollmentsManagementPage;
    courseManagementPage: CourseManagementPage;
    userDashboardPage: UserDashboardPage;
    coursePage: CoursePage;
};

export const test = base.extend<BaseFixtures>({
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

    adminDashboardPage: async ({ page }, use) => {
        const adp = new AdminDashboardPage(page);
        await use(adp);
    },

    enrollmentsManagementPage: async ({ page }, use) => {
        const emp = new EnrollmentsManagementPage(page);
        await use(emp);
    },

    courseManagementPage: async ({ page }, use) => {
        const cmp = new CourseManagementPage(page);
        await use(cmp);
    },

    userDashboardPage: async ({ page }, use) => {
        const udp = new UserDashboardPage(page);
        await use(udp);
    },

    coursePage: async ({ page }, use) => {
        const cp = new CoursePage(page);
        await use(cp);
    },
});
