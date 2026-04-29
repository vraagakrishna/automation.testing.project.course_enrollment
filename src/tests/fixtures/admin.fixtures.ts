import { CourseManagementPage } from '../../pages/admin/course-management.page';
import { ConfigManager } from '../../utils/config-manager';
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

        // Verify course management page is displayed
        await courseManagementPage.verifyCourseManagementPageIsDisplayed();

        // Click add button
        await courseManagementPage.clickAddCourseBtn();

        // Verify course form
        await courseManagementPage.verifyBlankCourseFormIsDisplayed();

        await use(courseManagementPage);

        for (const course of ConfigManager.getCourses()) {
            console.log(`Cleaning up course '${course.title}'`);

            // Click Overview btn
            await navBar.clickOverviewBtn();

            // Navigate to manage courses
            await adminDashboardPage.navigateToManageCourses();

            // Verify course management page is displayed
            await courseManagementPage.verifyCourseManagementPageIsDisplayed();

            // Verify course is displayed
            const courseElement = await courseManagementPage.validateCourseIsDisplayedAndNoAssertion(course);

            if (courseElement == null) {
                console.log('Course does not exist; nothing to clean up');
            } else {
                // Delete course
                await courseManagementPage.deleteCourse(courseElement);
            }
        }

        ConfigManager.clearCourses();
    },
});
