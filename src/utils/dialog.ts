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

    async handleAlert(
        action: () => Promise<void>,
        options: {
            accept: boolean;
            expectedMessage?: string;
        }
    ) {
        console.log('Getting alert...');
        const dialogPromise = new Promise<void>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const alertMsg = dialog.message();

                console.log(`Alert message: ${alertMsg}`);

                // Assert message if provided
                if (options.expectedMessage) {
                    expect(alertMsg).toBe(options.expectedMessage);
                }

                if (options.accept) {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }

                resolve();
            });
        });

        await action();
        await dialogPromise;
    }
}
