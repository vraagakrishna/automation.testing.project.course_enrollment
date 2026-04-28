import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import console from 'node:console';
import { Course } from '../../models/course.model';

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

        await this.clearAddCourseForm();

        await this.populateCourseData(course);

        await this.clickCreateCourseBtn();
    }

    async verifyAlertMessage(expectedMsg: string) {
        console.log(`Verifying alert message is: '${expectedMsg}'`);

        await this.dialog.verifyAlertMessage(expectedMsg);
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

    // #endregion
}
