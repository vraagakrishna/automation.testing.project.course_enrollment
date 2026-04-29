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
        const element = this.getLocator(locator);

        await expect(element).toBeVisible();

        const text = await element.textContent();
        console.info(`Text found: '${text}', Expected Text: '${expectedText}'`);

        await expect(element).toContainText(expectedText);
    }

    protected async shouldBeVisible(locator: string) {
        await expect(this.getLocator(locator)).toBeVisible();
    }

    protected async click(locator: string) {
        const element = this.getLocator(locator);

        await element.scrollIntoViewIfNeeded();

        await element.click();
    }

    protected async clickByBtnRole(name: string) {
        await this.page.getByRole('button', { name: name }).click();
    }

    protected async fill(locator: string, value: string) {
        const element = this.getLocator(locator);

        await element.fill(value);
    }

    protected async fillByPlaceholder(placeholder: string, value: string) {
        await this.page.getByPlaceholder(placeholder).fill(value);
    }

    protected async selectOptionFromDropdown(locator: string, option: string) {
        const element = this.getLocator(locator);
        await element.selectOption({ label: option });
    }
    // #endregion

    // #region Private Methods

    private getLocator(locator: string): Locator {
        return this.page.locator(locator);
    }

    // #endregion
}
