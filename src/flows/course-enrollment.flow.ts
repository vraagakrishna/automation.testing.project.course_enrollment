import { env } from '../utils/env';

export async function enrollCourseFlow({
    addCourseReady,
    softAssert,
    navBar,
    adminDashboardPage,
    courseManagementPage,
    enrollmentsManagementPage,
    course,
}: any) {
    // Add course
    const alertPromise = addCourseReady.verifyAlertMessage('created');

    await addCourseReady.addCourse(course);

    await alertPromise;

    // check if course exists
    let courseElement = await addCourseReady.validateCourseIsDisplayed(course, softAssert);

    if (courseElement == null) {
        await navBar.clickOverviewBtn();

        await adminDashboardPage.navigateToManageCourses();

        // Verify course is displayed
        await courseManagementPage.verifyCourseManagementPageIsDisplayed();

        courseElement = await addCourseReady.validateCourseIsDisplayed(course, softAssert);
    }

    if (courseElement == null) return;

    // click enrollment btn
    await navBar.clickEnrollmentsBtn();

    // click enroll
    await enrollmentsManagementPage.clickEnroll(course.title, env.userEmail, course.published, softAssert);

    // search for enrollment
    await enrollmentsManagementPage.searchForEnrollment(course.title, env.userEmail, course.published);
}
