import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { SoftAssert } from '../../utils/soft-assert ';

export class EnrollmentsManagementPage extends BasePage {
    enrollCourseDropdownLocator = "//select[option[contains(text(),'Select Course')]]";
    courseDropdownLocator = "//select[option[contains(text(),'All Courses')]]";

    constructor(page: Page) {
        super(page);
    }

    // #region Public Methods

    async completeAllCourses(userEmail: string) {
        console.log('Complete all courses');

        await this.searchEmail(userEmail);

        console.log('Waiting for Loading symbol to disappear');
        // Wait for loading state to disapper
        await this.page.getByText('Loading enrollments...').waitFor({
            state: 'hidden',
        });

        console.log('Checking number of rows with this email and a Complete btn');
        const rowsLocator =
            `//div[@class='admin-enrollments']//tr[` +
            `.//td[normalize-space()='${userEmail}'] and ` +
            `.//button[normalize-space()='Complete']` +
            `]`;

        const rows = this.page.locator(rowsLocator);

        const count = await rows.count();
        console.log(`Results found: ${count}`);

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);

            // Get course name from 3rd column
            const courseName = await row.locator('td').nth(2).innerText();
            console.log(`Completing course: ${courseName}`);

            const alertPromise = this.dialog.verifyAlertMessage('Mark this course as completed?', true);

            // Click Complete btn
            await this.clickByBtnRole('Complete');

            await alertPromise;

            console.log(`Course '${courseName}' is completed`);
        }
    }

    async clickEnroll(courseName: string, userEmail: string, shouldWork: boolean, softAssert: SoftAssert) {
        console.log(`Enrolling user '${userEmail}' to course '${courseName}'`);
        await this.clickByBtnRole('Enroll User');

        const courseExists = await this.page
            .locator(this.enrollCourseDropdownLocator)
            .selectOption({
                label: courseName,
            })
            .then(() => true)
            .catch(() => false);

        console.log('Course exists: ' + courseExists);

        expect(courseExists, 'Course should exist but it does not exist!').toBe(shouldWork);

        if (!courseExists) {
            console.log('Course does not exist; nothing to do!');
            await this.clickByBtnRole('Cancel');
            return;
        }

        await this.fillByPlaceholder('Search by name or email...', userEmail);

        await this.click(`//div[starts-with(text(),'${userEmail}')]/parent::div`);

        await this.clickByBtnRoleExact('Enroll User');

        console.log(`Enrolled user '${userEmail}' to course '${courseName}'`);

        await softAssert.attachScreenshot('enrolled-user-to-course', this.page);
    }

    async searchForEnrollment(courseName: string, userEmail: string, shouldExist: boolean, softAssert: SoftAssert) {
        console.log(`Searching enrollment '${userEmail}' -> '${courseName}'`);

        await this.searchEmail(userEmail);

        const courseFound = await this.searchCourse(courseName);

        if (!courseFound) {
            console.log('Course does not exist');

            expect(courseFound, 'Enrollment should exist but does not exist').toBe(shouldExist);

            return;
        }

        if (await this.page.getByText('No Enrollments Found').isVisible()) {
            console.log('Enrollment does not exist');
            expect(shouldExist, 'Enrollment mismatch').toBeTruthy();
            return;
        }

        const firstRow = this.page.locator("//div[@class='admin-enrollments']//table//tr").first();

        await firstRow.scrollIntoViewIfNeeded();

        const rows = this.page.locator(
            `//div[@class='admin-enrollments']//table//tr[
            .//td[contains(text(), '${userEmail}')] and
            .//td[contains(text(), '${courseName}')] and
            .//span[contains(text(), 'Enrolled')]
        ]`
        );

        const count = await rows.count();
        console.log(`Results found: ${count}`);

        await softAssert.attachScreenshot('enrolled-user-to-course', this.page);

        if (shouldExist) expect(count).toBeGreaterThan(0);
        else expect(count).toBe(0);
    }

    // #endregion

    // #region Private Methods

    private async searchEmail(userEmail: string) {
        console.log(`Search for email: ${userEmail}`);

        await this.fillByPlaceholder('Search by email...', userEmail);
    }

    private async searchCourse(courseName: string): Promise<boolean> {
        console.log(`Search for course: ${courseName}`);

        return await this.page
            .locator(this.courseDropdownLocator)
            .selectOption({
                label: courseName,
            })
            .then(() => true)
            .catch(() => false);
    }

    // #endregion
}
