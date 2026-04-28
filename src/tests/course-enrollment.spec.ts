import { test } from './fixtures/admin.fixtures';
import { Course } from '../models/course.model';
import { CourseTestData } from '../utils/course-test-data';

test.describe('Course Enrollment Tests', () => {
    test.afterEach(({}) => {
        // click Overview btn

        // navigate to manage courses

        // verify course is displayed
        
        // delete course
    });

    test('Enroll user to Unpublished Course', async ({ addCourseReady }) => {
        const courseTestData = new CourseTestData();
        const course = new Course(courseTestData.randomCourseName(), courseTestData.randomDescription());
        course.published = false;

        // Add course
        const alertPromise = addCourseReady.verifyAlertMessage('created');

        await addCourseReady.addCourse(course);

        await alertPromise;

        // check if course exists

        // click enrollment btn

        // click enroll

        // search for enrollment
    });
});
