import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
    private homePageTitle = 'Ndosi Test Automation';
    private homePageHeadingLocator = '#overview-hero';

    constructor(page: Page) {
        super(page);
    }

    async verifyHomePage() {
        console.log('Waiting for Home Page to be visible...');

        await expect(this.page).toHaveTitle(this.homePageTitle);

        const expectedHeading = 'Master Test Automation';

        await this.containsText(this.homePageHeadingLocator, expectedHeading);
    }
}
