import { Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class LoginPage extends BasePage {
    private loginPageHeadingLocator = '#login-heading';
    private emailFieldLocator = '#login-email';
    private passwordFieldLocator = '#login-password';
    private loginSubmitBtnLocator = '#login-submit';

    constructor(page: Page) {
        super(page);
    }

    // #region Public Methods

    async verifyLoginPage() {
        console.log('Waiting for Login Page to be visible...');

        await this.shouldBeVisible(this.loginPageHeadingLocator);

        const expectedHeading: string = 'Login to Access Learning Materials';

        await this.containsText(this.loginPageHeadingLocator, expectedHeading);
    }

    async loginUser(email: string, password: string) {
        console.log(`Login user with email='${email}', password='${password}'`);

        await this.clearLoginForm();

        await this.enterEmail(email);
        await this.enterPassword(password);

        console.log('Clicking Login Button...');
        await this.click(this.loginSubmitBtnLocator);
    }

    async verifyErrorMessage(errorMsg: string) {
        console.log(`Verifying error message is: '${errorMsg}'`);

        await this.dialog.verifyAlertMessage(errorMsg);
    }

    // #endregion

    // #region Private Methods

    private async clearLoginForm() {
        await this.enterEmail('');
        await this.enterPassword('');
    }

    private async enterEmail(email: string) {
        await this.fill(this.emailFieldLocator, email);
    }

    private async enterPassword(password: string) {
        await this.fill(this.passwordFieldLocator, password);
    }

    // #endregion
}
