import { Page } from '@playwright/test';
import { BasePage } from '../pages/base-page';

export class NavBar extends BasePage {
    private loginBtnLocator = 'button.user-pill:has-text("Login")';

    constructor(page: Page) {
        super(page);
    }

    async clickLogin() {
        console.log('Clicking Login Button...');
        await this.click(this.loginBtnLocator);
    }
}
