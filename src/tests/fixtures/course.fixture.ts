import { test as base } from './admin.fixtures'
import { CourseManagementPage } from "../../pages/admin/course-management.page"
import { CourseFactory } from '../../utils/test-data/course.factory';
import { enrollCourseFlow } from '../../flows/course-enrollment.flow';
import { cleanUpCourses } from '../../flows/clean-up-courses.flow';
import { loginAndVerify } from '../../flows/auth-login.flow';
import { Course } from '../../models/course.model';

type CourseFixtures = {
    publishAndEnrollCourseReady: Course;
}

export const test = base.extend<CourseFixtures>({
    publishAndEnrollCourseReady: async (
        {
            addCourseReady,
            softAssert,
            navBar,
            adminDashboardPage,
            courseManagementPage,
            enrollmentsManagementPage,
            loginPage,
            dashboardPage,
        },
        use
    ) => {
        const course = CourseFactory.create(true);

        await enrollCourseFlow({
            addCourseReady,
            softAssert,
            navBar,
            adminDashboardPage,
            courseManagementPage,
            enrollmentsManagementPage,
            course,
        });

        await use(course);

        // go to login page and verify
        await navBar.clickLogin();
        await loginPage.verifyLoginPage();

        await loginAndVerify('admin', {
            loginReady: loginPage,
            dashboardPage,
        });

        // Go to admin panel
        await navBar.goToAdminPanel();

        // Verify admin panel is displayed
        await adminDashboardPage.verifyAdminDashboardIsDisplayed();

                // Go to manage courses
        await adminDashboardPage.navigateToManageCourses();

        // Verify course management page is displayed
        await courseManagementPage.verifyCourseManagementPageIsDisplayed();
    },
});