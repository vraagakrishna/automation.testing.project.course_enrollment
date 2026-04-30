import { NavBar } from '../components/nav-bar';
import { Course } from '../models/course.model';
import { CourseManagementPage } from '../pages/admin/course-management.page';
import { EnrollmentsManagementPage } from '../pages/admin/enrollments-management.page';
import { AdminDashboardPage } from '../pages/dashboard/admin-dashboard.page';
import { env } from '../utils/env';
import { SoftAssert } from '../utils/soft-assert ';

export async function enrollCourseFlow({
    addCourseReady,
    softAssert,
    navBar,
    adminDashboardPage,
    enrollmentsManagementPage,
    course,
}: {
    addCourseReady: CourseManagementPage;
    softAssert: SoftAssert;
    navBar: NavBar;
    adminDashboardPage: AdminDashboardPage;
    enrollmentsManagementPage: EnrollmentsManagementPage;
    course: Course;
}) {
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
        await addCourseReady.verifyCourseManagementPageIsDisplayed();

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
