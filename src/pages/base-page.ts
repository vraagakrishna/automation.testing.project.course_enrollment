import { expect, Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async containsText(locator: string, expectedText: string) {
        const headingLocator = this.page.locator(locator);

        await expect(headingLocator).toBeVisible();

        const headingText = await headingLocator.textContent();
        console.info(`Text found: '${headingText}', Expected Text: '${expectedText}'`);

        await expect(headingLocator).toContainText(expectedText);
    }
}
