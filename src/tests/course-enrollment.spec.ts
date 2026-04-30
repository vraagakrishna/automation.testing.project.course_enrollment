import { test } from './fixtures/admin.fixtures';
import { CourseFactory } from '../utils/test-data/course.factory';
import { enrollCourseFlow } from '../flows/course-enrollment.flow';

test.describe('Course Enrollment Tests', () => {
    test('Enroll user to Unpublished Course', async ({
        addCourseReady,
        softAssert,
        navBar,
        adminDashboardPage,
        courseManagementPage,
        enrollmentsManagementPage,
    }) => {
        const course = CourseFactory.create(false);

        await enrollCourseFlow({
            addCourseReady,
            softAssert,
            navBar,
            adminDashboardPage,
            courseManagementPage,
            enrollmentsManagementPage,
            course,
        });
    });

    test('Enroll user to Published Course', async ({
        addCourseReady,
        softAssert,
        navBar,
        adminDashboardPage,
        courseManagementPage,
        enrollmentsManagementPage,
    }) => {
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
    });
});
