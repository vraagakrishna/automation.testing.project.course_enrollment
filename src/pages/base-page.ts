import { expect, Locator, Page } from '@playwright/test';
import { DialogHandler } from '../utils/dialog';

export class BasePage {
    protected page: Page;
    protected dialog: DialogHandler;

    // #region Ctor

    constructor(page: Page) {
        this.page = page;
        this.dialog = new DialogHandler(this.page);
    }

    // #endregion

    // #region Protected Methods

    protected async containsText(locator: string, expectedText: string) {
        const headingLocator = this.getLocator(locator);

        await expect(headingLocator).toBeVisible();

        const headingText = await headingLocator.textContent();
        console.info(`Text found: '${headingText}', Expected Text: '${expectedText}'`);

        await expect(headingLocator).toContainText(expectedText);
    }

    protected async shouldBeVisible(locator: string) {
        await expect(this.getLocator(locator)).toBeVisible();
    }

    protected async click(locator: string) {
        const element = this.getLocator(locator);

        await element.click();
    }

    protected async fill(locator: string, value: string) {
        const element = this.getLocator(locator);

        await element.fill(value);
    }

    // #endregion

    // #region Private Methods

    private getLocator(locator: string): Locator {
        return this.page.locator(locator);
    }

    // #endregion
}
