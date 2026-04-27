import { Dialog, expect, Page } from '@playwright/test';

export class DialogHandler {
    constructor(private page: Page) {
        this.page = page;
    }

    async verifyAlertMessage(expectedMessage: string, accept = true) {
        console.log('Waiting for alert...');

        const dialog: Dialog = await new Promise((resolve) => {
            this.page.once('dialog', resolve);
        });

        const alertMessage = dialog.message();
        console.log(`Alert message found: '${alertMessage}'`);

        expect(alertMessage.toLowerCase()).toContain(expectedMessage.toLowerCase());

        if (accept) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    }
}
