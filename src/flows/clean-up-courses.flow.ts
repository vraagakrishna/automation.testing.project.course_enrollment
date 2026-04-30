import { NavBar } from '../components/nav-bar';
import { CourseManagementPage } from '../pages/admin/course-management.page';
import { AdminDashboardPage } from '../pages/dashboard/admin-dashboard.page';
import { ConfigManager } from '../utils/config-manager';

export async function cleanUpCourses({
    navBar,
    adminDashboardPage,
    courseManagementPage,
}: {
    navBar: NavBar;
    adminDashboardPage: AdminDashboardPage;
    courseManagementPage: CourseManagementPage;
}) {
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
}
