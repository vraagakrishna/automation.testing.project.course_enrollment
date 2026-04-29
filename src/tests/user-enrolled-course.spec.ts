import { loginAndVerify } from "../flows/auth-login.flow";
import { test } from "./fixtures/course.fixture";

test.describe('User Enrolled Course Tests', () => {
    test('User sees enrolled Course', async ({
        publishAndEnrollCourseReady,
        navBar,
        dashboardPage,
        homePage,
        loginPage,
    }) => {
        console.log(publishAndEnrollCourseReady.title);

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
        // END: Verify Enrolled for Course

        // START: Verify Course is displayed

        // END: Verify Course is displayed

        // logout
        await navBar.clickLogOutBtn();
    });
});
