import { Page } from '@playwright/test';
import { BasePage } from '../pages/base-page';

export class NavBar extends BasePage {
    private loginBtnLocator = 'button.user-pill:has-text("Login")';
    private profileBtnLocator = 'button.user-pill';

    constructor(page: Page) {
        super(page);
    }

    async clickLogin() {
        console.log('Clicking Login Button...');
        await this.click(this.loginBtnLocator);
    }

    async goToAdminPanel() {
        console.log('Go to Admin Panel');
        await this.click(this.profileBtnLocator);

        await this.clickByBtnRole('Admin Panel');
    }

    async clickEnrollmentsBtn() {
        console.log('Click Enrollments Btn');

        await this.clickByBtnRole('Enrollments');
    }

    async clickOverviewBtn() {
        console.log('Click Overview Btn');

        await this.clickByBtnRole('Overview');
    }

    async clickBackToWebsiteBtn() {
        console.log('Click Back to Website Btn');

        await this.clickByBtnRole('Back to Website');
    }

    async clickLogOutBtn() {
        console.log('Click Log Out Btn');
        await this.click(this.profileBtnLocator);

        const alertPromise = this.dialog.verifyAlertMessage('Are you sure you want to logout?');

        await this.clickByBtnRole('Logout');

        await alertPromise;
    }
}
