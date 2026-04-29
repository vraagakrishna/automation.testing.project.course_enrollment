import { test } from './fixtures/admin.fixtures';
import { Course } from '../models/course.model';
import { CourseTestData } from '../utils/test-data/course-test-data';
import { env } from '../utils/env';

test.describe('Course Enrollment Tests', () => {
    test('Enroll user to Unpublished Course', async ({
        addCourseReady,
        softAssert,
        navBar,
        adminDashboardPage,
        courseManagementPage,
        enrollmentsManagementPage,
    }) => {
        const courseTestData = new CourseTestData();
        const course = new Course(courseTestData.randomCourseName(), courseTestData.randomDescription());
        course.level = 'Advanced';
        course.duration = courseTestData.validDuration();
        course.price = courseTestData.validPrice();
        course.thumbnailUrl = courseTestData.validThumbnailUrl();
        course.meetingUrl = courseTestData.validTeamsLink();
        course.published = false;

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
    });

    test('Enroll user to Published Course', async ({
        addCourseReady,
        softAssert,
        navBar,
        adminDashboardPage,
        courseManagementPage,
        enrollmentsManagementPage,
    }) => {
        const courseTestData = new CourseTestData();
        const course = new Course(courseTestData.randomCourseName(), courseTestData.randomDescription());
        course.level = 'Advanced';
        course.duration = courseTestData.validDuration();
        course.price = courseTestData.validPrice();
        course.thumbnailUrl = courseTestData.validThumbnailUrl();
        course.meetingUrl = courseTestData.validTeamsLink();
        course.published = true;

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
    });
});
