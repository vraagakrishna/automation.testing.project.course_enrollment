import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import console from 'node:console';
import { Course } from '../../models/course.model';
import { SoftAssert } from '../../utils/soft-assert ';
import { ConfigManager } from '../../utils/config-manager';

export class CourseManagementPage extends BasePage {
    // #region Locators

    private courseManagementHeadingLocator = ':text("Course Management")';

    // #regoin Course Form
    private addCourseFormLocator = '//form';
    private courseTitleLocator = "//label[normalize-space()='Course Title *']/following::input[1]";
    private courseDescriptionLocator = "//label[normalize-space()='Description *']/following::textarea[1]";
    private durationLocator = "//label[normalize-space()='Duration']/following::input[1]";
    private levelLocator = "//label[normalize-space()='Level']/following::select[1]";
    private priceLocator = "//input[@type='number']";
    private thumbnailUrlLocator = "//label[normalize-space()='Thumbnail URL']/following::input[1]";
    private meetingUrlLocator = "//label[contains(text(),'Meeting URL')]/following::input[1]";
    private publishedLocator = "//input[@type='checkbox']";
    private createCourseBtnLocator = "//button[normalize-space()='Create Course']";
    private saveCourseBtnLocator = "//button[contains(., 'Update Course') and @type='submit']";
    private cancelCourseBtnLocator = "//button[normalize-space()='Cancel']";
    // #endregion

    // #endregion

    constructor(page: Page) {
        super(page);
    }

    // #region Public Methods

    async verifyCourseManagementPageIsDisplayed() {
        console.log('Verifying Course Management Page is displayed...');

        await this.shouldBeVisible(this.courseManagementHeadingLocator);
    }

    async clickAddCourseBtn() {
        console.log('Clicking Add Course btn');

        await this.clickByBtnRole('Add Course');
    }

    async verifyBlankCourseFormIsDisplayed() {
        console.log('Verifying blank Course Form is displayed...');

        await this.validateBlankCourseForm();
    }

    async addCourse(course: Course) {
        console.log(`Adding course: `, course);

        ConfigManager.addCourse(course);

        await this.clearAddCourseForm();

        await this.populateCourseData(course);

        await this.clickCreateCourseBtn();
    }

    async verifyAlertMessage(expectedMsg: string) {
        console.log(`Verifying alert message is: '${expectedMsg}'`);

        await this.dialog.verifyAlertMessage(expectedMsg);
    }

    async validateCourseIsDisplayed(course: Course, softAssert: SoftAssert): Promise<Locator | null> {
        try {
            console.log(`Verifying course is displayed: ${course.title}`);

            const courseCard = await this.findCourse(course);

            await softAssert.attachScreenshot('course-content', this.page);

            try {
                await this.validateCourseContent(courseCard, course, softAssert);
                return courseCard;
            } catch {
                console.log('Course content is incorrect!');
                return null;
            }
        } catch {
            console.log('Course did not exist after creation!');
            return null;
        }
    }

    async validateCourseIsDisplayedAndNoAssertion(course: Course) {
        try {
            console.log(`Verifying course '${course.title}' is displayed...`);
            return this.findCourse(course);
        } catch {
            console.log('Course did not exist');
            return null;
        }
    }

    async deleteCourse(courseElement: Locator) {
        console.log(`Deleting course`);

        const confirmDialogPromise = this.dialog.verifyAlertMessage('Are you sure you want to delete this course?');

        await this.clickCourseDeleteBtn(courseElement);

        await confirmDialogPromise;
    }

    // #endregion

    // #region Private Methods

    private async validateBlankCourseForm() {
        console.log('Verifying the fields on the course form');

        const addCourseForm = this.page.locator(this.addCourseFormLocator);

        try {
            await addCourseForm.waitFor({ state: 'visible' });
        } catch {
            throw new Error('Add Course form not displayed');
        }

        const expectedFields = [
            'course title',
            'description',
            'duration',
            'level',
            'price',
            'thumbnail url',
            'meeting url',
            'published',
        ];

        console.log(`Expected fields: ${expectedFields}`);

        const fieldRows = addCourseForm.locator('div');
        const rowsCount = await fieldRows.count();

        for (let i = 0; i < rowsCount; i++) {
            if (expectedFields.length === 0) break;

            const fieldRow = fieldRows.nth(i);

            // Skip row without labels
            const label = fieldRow.locator('label');
            if (!(await label.count())) continue;

            const labelText = (await label.first().innerText()).toLowerCase();

            const matchedField = expectedFields.find((field) => labelText.includes(field));

            if (!matchedField) continue;

            // Remove matched field from expected list
            expectedFields.splice(expectedFields.indexOf(matchedField), 1);
            console.log(`Expected fields: ${expectedFields}`);

            const errorMessage = `${matchedField} is not blank`;

            switch (matchedField) {
                case 'course title': {
                    const locator = this.page.locator(this.courseTitleLocator);
                    expect(await locator.inputValue(), errorMessage).toBe('');
                    break;
                }

                case 'description': {
                    const locator = this.page.locator(this.courseDescriptionLocator);
                    const value = await locator.inputValue();
                    expect(value === '' || value.trim().length === 0, errorMessage).toBeTruthy();
                    break;
                }

                case 'duration': {
                    const locator = this.page.locator(this.durationLocator);
                    expect(await locator.inputValue(), errorMessage).toBe('');
                    break;
                }

                case 'level': {
                    const locator = this.page.locator(this.levelLocator);
                    expect((await locator.inputValue()).toLowerCase(), errorMessage).toBe('beginner');
                    break;
                }

                case 'price': {
                    const locator = this.page.locator(this.priceLocator);
                    expect(await locator.inputValue(), errorMessage).toBe('0');
                    break;
                }

                case 'thumbnail url': {
                    const locator = this.page.locator(this.thumbnailUrlLocator);
                    expect(await locator.inputValue(), errorMessage).toBe('');
                    break;
                }

                case 'meeting url': {
                    const locator = this.page.locator(this.meetingUrlLocator);
                    expect(await locator.inputValue(), errorMessage).toBe('');
                    break;
                }

                case 'published': {
                    const locator = this.page.locator(this.publishedLocator);
                    expect(await locator.isChecked(), errorMessage).toBeTruthy();
                    break;
                }
            }
        }

        expect(expectedFields.length, `Missing fields: ${expectedFields.join(', ')}`).toBe(0);
    }

    private async enterCourseTitle(value: string) {
        await this.fill(this.courseTitleLocator, value);
    }

    private async enterCourseDescription(value: string) {
        await this.fill(this.courseDescriptionLocator, value);
    }

    private async enterCourseDuration(value: string) {
        await this.fill(this.durationLocator, value);
    }

    private async enterCourseLevel(value: string) {
        await this.selectOptionFromDropdown(this.levelLocator, value);
    }

    private async enterCoursePrice(value: string) {
        await this.fill(this.priceLocator, value);
    }

    private async enterCourseThumbnailUrl(value: string) {
        await this.fill(this.thumbnailUrlLocator, value);
    }

    private async enterCourseMeetingUrl(value: string) {
        await this.fill(this.meetingUrlLocator, value);
    }

    private async publishCourse(publish: boolean) {
        const checkbox = this.page.locator(this.publishedLocator);

        await checkbox.scrollIntoViewIfNeeded();

        const isChecked = await checkbox.isChecked();

        if (publish && !isChecked) {
            await checkbox.check();
        }

        if (!publish && isChecked) {
            await checkbox.uncheck();
        }
    }

    private async clearAddCourseForm() {
        console.log('Clearing Add Course Form..');
        await this.enterCourseTitle('');
        await this.enterCourseDescription('');
        await this.enterCourseDuration('');
        await this.enterCourseLevel('Beginner');
        await this.enterCoursePrice('');
        await this.enterCourseThumbnailUrl('');
        await this.enterCourseMeetingUrl('');
        await this.publishCourse(false);
    }

    private async populateCourseData(course: Course) {
        console.log('Populate Course Data: ', course);

        if (course.title != null) await this.enterCourseTitle(course.title);

        if (course.description != null) await this.enterCourseDescription(course.description);

        if (course.duration != null) await this.enterCourseDuration(course.duration);

        if (course.level != null) await this.enterCourseLevel(course.level);

        if (course.price != null) await this.enterCoursePrice(String(Math.floor(course.price)));

        if (course.thumbnailUrl != null) await this.enterCourseThumbnailUrl(course.thumbnailUrl);

        if (course.meetingUrl != null) await this.enterCourseMeetingUrl(course.meetingUrl);

        await this.publishCourse(course.published);
    }

    private async clickCreateCourseBtn() {
        await this.click(this.createCourseBtnLocator);
    }

    private async findCourse(course: Course): Promise<Locator> {
        const courseCard = this.page.locator(
            `//div[contains(@class,'courses-grid')]//h3[normalize-space()='${course.title}']/ancestor::div[2]`
        );

        await courseCard.scrollIntoViewIfNeeded();

        return courseCard;
    }

    private async validateCourseContent(courseCard: Locator, course: Course, softAssert: SoftAssert) {
        const softErrors: string[] = [];

        // -------------------------
        // Description
        // -------------------------
        console.log('Validating description...');
        const description = courseCard.locator('p');
        const actualDescription = (await description.textContent())?.trim() ?? '';
        console.log(`Actual description: ${actualDescription}`);

        expect(actualDescription).toBe(course.description);

        // -------------------------
        // Level + Duration
        // -------------------------
        console.log('Validating level and duration...');
        try {
            const badges = courseCard.locator('div').locator('div').locator('span');
            const badgeCount = await badges.count();

            const badgeTexts: string[] = [];
            for (let i = 0; i < badgeCount; i++) {
                badgeTexts.push((await badges.nth(i).innerText()).trim());
            }

            // Level
            console.log('Validating level');
            if (badgeTexts.length === 0) {
                softErrors.push(`Expected level: ${course.level}, but no badges found`);
            } else {
                const actualLevel = badgeTexts[0];
                console.log(`Actual level: ${actualLevel}`);

                try {
                    expect(actualLevel.toLowerCase()).toBe(course.level.toLowerCase());
                } catch {
                    softErrors.push(`Expected level: ${course.level}, but got: ${actualLevel}`);
                }
            }

            // Duration
            console.log('Validating duration');
            if (course.duration?.trim()) {
                if (badgeTexts.length < 2) {
                    softErrors.push(`Expected duration: ${course.duration}, but badge not found`);
                } else {
                    const actualDuration = badgeTexts[1];
                    console.log(`Actual duration: ${actualDuration}`);

                    if (!actualDuration.toLowerCase().includes(course.duration.toLowerCase())) {
                        softErrors.push(`Expected duration: ${course.duration}, but got: ${actualDuration}`);
                    }
                }
            } else {
                console.log('Duration not provided -> skipping validation');
            }
        } catch {
            softErrors.push(`Expected course level: ${course.level}, duration: ${course.duration}, but got: none`);
        }

        // -------------------------
        // Price
        // -------------------------
        console.log('Validating price');
        try {
            const priceElements = courseCard.locator('span', {
                hasText: /^R\d+(\.\d{2})?$/,
            });

            const priceCount = await priceElements.count();

            if (!course.price || course.price === 0) {
                if (priceCount > 0) {
                    const actualPrice = (await priceElements.first().innerText()).trim();
                    console.log(`Actual price: ${actualPrice}`);

                    if (!(actualPrice === 'Free' || actualPrice === 'R0.00')) {
                        softErrors.push(`Expected Free/R0.00, but got: ${actualPrice}`);
                    }
                }
            } else {
                if (priceCount === 0) {
                    softErrors.push(`Expected price: ${course.price}, but nothing displayed`);
                } else {
                    const actualPrice = (await priceElements.first().innerText()).trim();
                    console.log(`Actual price: ${actualPrice}`);

                    const expected = `R${course.price.toFixed(2)}`;

                    try {
                        expect(actualPrice).toBe(expected);
                    } catch {
                        softErrors.push(`Expected price: ${expected}, but got: ${actualPrice}`);
                    }
                }
            }
        } catch {
            softErrors.push(`Expected price: ${course.price}, but got none`);
        }

        // -------------------------
        // Thumbnail
        // -------------------------
        console.log('Validating thumbnail');
        try {
            const thumbnail = courseCard.locator('div').first();
            const style = (await thumbnail.getAttribute('style')) ?? '';
            const actualUrl = this.extractBackgroundUrl(style);
            console.log(`Actual thumbnail: ${actualUrl}`);

            const expectedUrl = course.thumbnailUrl;

            if (!expectedUrl) {
                if (actualUrl) {
                    softErrors.push(`Expected no thumbnail, but found: ${actualUrl}`);
                }
            } else {
                if (!actualUrl) {
                    softErrors.push(`Expected thumbnail URL: ${expectedUrl}, but none found`);
                } else {
                    try {
                        expect(actualUrl).toBe(expectedUrl);
                    } catch {
                        softErrors.push(`Expected thumbnail: ${expectedUrl}, but got: ${actualUrl}`);
                    }
                }
            }
        } catch {
            softErrors.push(`Expected thumbnail: ${course.thumbnailUrl}, but got none`);
        }

        // -------------------------
        // Published / Draft
        // -------------------------
        console.log('Validating Published or Draft');
        const statusText = course.published ? 'Published' : 'Draft';

        const statusVisible = await courseCard
            .getByText(statusText)
            .isVisible()
            .catch(() => false);

        if (!statusVisible) {
            softErrors.push(`Course should be ${statusText} but label not found`);
        }

        // -------------------------
        // Final assertion (soft assert equivalent)
        // -------------------------
        if (softErrors.length > 0) {
            softAssert.add(`Course validation failed for ${course.title}:\n` + softErrors.join('\n'));
            throw new Error(`Course validation failed:\n` + softErrors.join('\n'));
        }
    }

    private async clickCourseDeleteBtn(courseCard: Locator) {
        // Finds the 2nd button inside the course card (delete button)
        const deleteButton = courseCard.locator('button').nth(1);

        await deleteButton.scrollIntoViewIfNeeded();
        await deleteButton.click();
    }

    // #endregion
}
