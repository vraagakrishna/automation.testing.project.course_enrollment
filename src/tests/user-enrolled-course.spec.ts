import { loginAndVerify } from '../flows/auth-login.flow';
import { test } from './fixtures/course.fixture';

test.describe('User Enrolled Course Tests', () => {
    test('User sees enrolled Course', async ({
        publishAndEnrollCourseReady: course,
        navBar,
        dashboardPage,
        homePage,
        loginPage,
        userDashboardPage,
        softAssert,
        coursePage,
    }) => {
        console.log(course.title);

        // click 'Back to Website'
        await navBar.clickBackToWebsiteBtn();

        // verify dashboard page is displayed
        await dashboardPage.verifyDashboardPage();

        // log out admin
        await navBar.clickLogOutBtn();

        // verify home page is displayed
        await homePage.verifyHomePage();

        // go to login page
        await navBar.clickLogin();

        // verify login page is displayed
        await loginPage.verifyLoginPage();

        // login as user and verify
        await loginAndVerify('user', {
            loginReady: loginPage,
            dashboardPage,
        });

        // START: Verify Enrolled for Course
        await userDashboardPage.validateEnrolledCourse(course, softAssert);
        // END: Verify Enrolled for Course

        // START: Verify Course is displayed
        userDashboardPage.clickViewAllCourses();

        const userCourseElement = await coursePage.findCourse(course, softAssert);

        if (userCourseElement == null) {
            // course is published and does not exist
            if (course.published) {
                softAssert.add(`User cannot see Published Course: ${course.title}`);
            }
        } else {
            // course is unpublishded and does exist
            if (!course.published) {
                softAssert.add(`User cannot see Unpublished Course: ${course.title}`);
            }

            // cousre exists and published
            else {
                coursePage.validateCourseDetails(course, userCourseElement, true, softAssert);
            }
        }
        // END: Verify Course is displayed

        // logout
        await navBar.clickLogOutBtn();
    });
});
