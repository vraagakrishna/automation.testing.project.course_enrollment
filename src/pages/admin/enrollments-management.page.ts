import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class EnrollmentsManagementPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

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

    private async searchEmail(userEmail: string) {
        console.log(`Search for email: ${userEmail}`);

        await this.fillByPlaceholder('Search by email...', userEmail);
    }
}
