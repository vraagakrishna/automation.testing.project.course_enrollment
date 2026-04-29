import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class AdminDashboardPage extends BasePage {
    private adminDashboardHeadingLocator = 'h1:has-text("Admin Dashboard")';

    constructor(page: Page) {
        super(page);
    }

    async verifyAdminDashboardIsDisplayed() {
        console.log('Verify Admin Dashboard is displayed...');

        await this.shouldBeVisible(this.adminDashboardHeadingLocator);
    }

    async navigateToManageCourses() {
        console.log('Navigate to Manage Courses page');

        await this.page.locator('div.quick-actions').getByRole('button', { name: 'Manage Courses' }).click();
    }
}
