import { test } from './fixtures/admin.fixtures';
import { Course } from '../models/course.model';
import { CourseTestData } from '../utils/course-test-data';

test.describe('Course Enrollment Tests', () => {
    test.afterEach(({ }) => {
        // click Overview btn

        // navigate to manage courses

        // verify course is displayed
        
        // delete course
    });

    test('Enroll user to Unpublished Course', async ({ addCourseReady, softAssert, navBar, adminDashboardPage, courseManagementPage }) => {
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

        // click enrollment btn

        // click enroll

        // search for enrollment
    });
});
