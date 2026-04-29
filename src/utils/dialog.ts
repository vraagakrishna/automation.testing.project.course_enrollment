import { expect, Page } from '@playwright/test';

export class DialogHandler {
    constructor(private page: Page) {
        this.page = page;
    }

    async verifyAlertMessage(expectedMessage: string, accept = true) {
        console.log('Waiting for alert...');

        const dialog = await this.page.waitForEvent('dialog');

        const alertMessage = dialog.message();
        console.log(`Alert message found: '${alertMessage}'`);

        expect(alertMessage.toLowerCase())
            .toContain(expectedMessage.toLowerCase());

        if (accept) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    }
}
