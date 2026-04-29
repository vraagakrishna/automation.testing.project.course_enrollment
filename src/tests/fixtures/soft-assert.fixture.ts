import { test as base } from '@playwright/test';
import { SoftAssert } from '../../utils/soft-assert ';

type SoftAssertFixtures = {
    softAssert: SoftAssert;
};

export const test = base.extend<SoftAssertFixtures>({
    softAssert: async (_, use, testInfo) => {
        const softAssert = new SoftAssert();

        softAssert.setTestInfo(testInfo);

        await use(softAssert);

        if (softAssert.hasErrors()) {
            const message =
                `Soft Assertion Failures:\n` +
                softAssert
                    .getErrors()
                    .map((e) => `* ${e}`)
                    .join('\n');

            // attach to report
            await testInfo.attach('soft-assert-errors', {
                body: message,
                contentType: 'text/plain',
            });

            throw new Error(message);
        }
    },
});
