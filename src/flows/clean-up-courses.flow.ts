import { ConfigManager } from "../utils/config-manager";

export async function cleanUpCourses({
    navBar, adminDashboardPage, courseManagementPage,
}: any) {
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