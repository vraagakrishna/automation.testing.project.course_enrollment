import { TestInfo } from '@playwright/test';

export class SoftAssert {
    private errors: string[] = [];
    private testInfo!: TestInfo;

    setTestInfo(testInfo: TestInfo) {
        this.testInfo = testInfo;
    }

    add(error: string) {
        this.errors.push(error);
    }

    hasErrors(): boolean {
        console.log(this.errors.length);
        return this.errors.length > 0;
    }

    getErrors(): string[] {
        return this.errors;
    }

    async attachScreenshot(name: string, page: any) {
        if (!this.testInfo) return;

        const screenshot = await page.screenshot();

        await this.testInfo.attach(name, {
            body: screenshot,
            contentType: 'image/png',
        });
    }
}
