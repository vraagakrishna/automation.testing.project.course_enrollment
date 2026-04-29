import { CourseManagementPage } from '../../pages/admin/course-management.page';
import { env } from '../../utils/env';
import { test as base } from './auth.fixture';

type AdminFixtures = {
    addCourseReady: CourseManagementPage;
};

export const test = base.extend<AdminFixtures>({
    addCourseReady: async (
        {
            navBar,
            adminDashboardPage,
            enrollmentsManagementPage,
            courseManagementPage,
            adminDashboard: _adminDashboard,
        },
        use
    ) => {
        // Go to admin panel
        await navBar.goToAdminPanel();

        // Verify admin panel is displayed
        await adminDashboardPage.verifyAdminDashboardIsDisplayed();

        // START: Complete all courses
        await navBar.clickEnrollmentsBtn();

        await enrollmentsManagementPage.completeAllCourses(env.userEmail);

        await navBar.clickOverviewBtn();
        // END: Complete all courses

        // Go to manage courses
        await adminDashboardPage.navigateToManageCourses();

        // Verify course is displayed
        await courseManagementPage.verifyCourseManagementPageIsDisplayed();

        // Click add button
        await courseManagementPage.clickAddCourseBtn();

        // Verify course form
        await courseManagementPage.verifyBlankCourseFormIsDisplayed();

        await use(courseManagementPage);
    },
});
