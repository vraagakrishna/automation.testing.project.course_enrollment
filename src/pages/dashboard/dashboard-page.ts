import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class DashboardPage extends BasePage {
    private welcomeHeadingLocator = ':text("Welcome back")';

    constructor(page: Page) {
        super(page);
    }

    async verifyDashboardPage() {
        console.log('Verifying dashboard page...');

        await this.shouldBeVisible(this.welcomeHeadingLocator);
    }
}
