import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { Course } from '../../models/course.model';
import { SoftAssert } from '../../utils/soft-assert ';

export class CoursePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async findCourse(course: Course, softAssert: SoftAssert): Promise<Locator | null> {
        console.log(`Finding course: ${course.title}`);

        try {
            const courseCardElement = await this.findCourseCard(course.title);
            await softAssert.attachScreenshot('course-content', this.page);

            return courseCardElement;
        } catch {
            console.log('Course did not exist');
            await softAssert.attachScreenshot('course-did-not-exist', this.page);
            return null;
        }
    }

    async validateCourseDetails(
        course: Course,
        courseCardElement: Locator,
        shouldEnroll: boolean,
        softAssert: SoftAssert
    ) {
        console.log(`Validate course details: `, course);

        // =========================
        // Validate description
        // =========================
        console.log('Validating description...');
        try {
            const actualDescription = (await courseCardElement.locator('p').first().innerText()).trim();
            console.log(`Actual description: ${actualDescription}`);

            if (actualDescription !== course.description) {
                softAssert.add(
                    `Expected description: ${course.description}, but actual description: ${actualDescription}`
                );
            }
        } catch {
            softAssert.add('Course description is not found');
        }

        // =========================
        // Validate level and price
        // =========================
        console.log('Validating level and price...');
        try {
            const badges = courseCardElement.locator('xpath=.//div[2]/span');
            const badgeCount = await badges.count();

            const badgeTexts: string[] = [];

            for (let i = 0; i < badgeCount; i++) {
                badgeTexts.push((await badges.nth(i).innerText()).trim());
            }

            // Validate level
            console.log('Validating level...');
            if (badgeTexts.length === 0) {
                softAssert.add(`Expected course level: ${course.level}, but no badges found`);
            } else {
                const actualLevel = badgeTexts[0];
                console.log(`Actual level: ${actualLevel}`);

                if (actualLevel.toLowerCase() !== course.level.toLowerCase()) {
                    softAssert.add(`Expected course level: ${course.level}, but actual course level: ${actualLevel}`);
                }
            }

            // Validate price
            console.log('Validating price...');
            const expectedPrice = course.price;

            if (badgeTexts.length < 2) {
                if (expectedPrice != null) {
                    softAssert.add(`Expected course price: ${expectedPrice}, but price badge not found`);
                }
            } else {
                const actualPrice = badgeTexts[1];
                console.log(`Actual price: ${actualPrice}`);

                if (expectedPrice == null || expectedPrice === 0) {
                    if (actualPrice.toLowerCase() !== 'free' && actualPrice.toLowerCase() !== 'r0.00') {
                        softAssert.add(`Expected no price or 'Free', but got: ${actualPrice}`);
                    }
                } else {
                    const expectedFormatted = `R${expectedPrice}`;

                    if (actualPrice !== expectedFormatted) {
                        softAssert.add(
                            `Expected course price: ${expectedFormatted}, but actual course price: ${actualPrice}`
                        );
                    }
                }
            }
        } catch {
            softAssert.add(`Expected course level ${course.level}, but got none`);
        }

        // =========================
        // Validate thumbnail
        // =========================
        console.log('Validating thumbnail...');
        try {
            const images = courseCardElement.locator('img');
            const imageCount = await images.count();

            const expectedUrl = course.thumbnailUrl;

            // Image exists
            if (imageCount > 0) {
                const actualUrl = await images.first().getAttribute('src');
                console.log(`Actual thumbnail: ${actualUrl}`);

                if (!expectedUrl) {
                    softAssert.add('Image is displayed but no expected thumbnail URL was provided');
                } else if (actualUrl !== expectedUrl) {
                    softAssert.add(`Expected course thumbnail URL: ${expectedUrl}, but found: ${actualUrl}`);
                }
            }

            // No image → fallback div
            else {
                const thumbnailDiv = courseCardElement.locator('xpath=./div[1]');

                const style = (await thumbnailDiv.getAttribute('style')) || '';

                const actualUrl = this.extractBackgroundUrl(style);
                console.log(`Actual thumbnail: ${actualUrl}`);

                if (expectedUrl) {
                    softAssert.add('Expected image thumbnail, but fallback UI is shown');
                }

                if (actualUrl != null) {
                    softAssert.add(`Expected default thumbnail (no URL), but found: ${actualUrl}`);
                }
            }
        } catch {
            softAssert.add('Course thumbnail is not found');
        }

        // =========================
        // Validate enrolled
        // =========================
        console.log('Validating enrolled...');
        try {
            const enrolledText = (await courseCardElement.locator('button').first().innerText()).trim();
            console.log(`Enrolled text: ${enrolledText}`);

            const userEnrolled = enrolledText.toLowerCase().includes('enrolled') && 
                !enrolledText.toLowerCase().includes('not enrolled');

            if (userEnrolled !== shouldEnroll) {
                softAssert.add(`Expected enrolled: ${shouldEnroll}, but actual enrolled: ${userEnrolled}`);
            }
        } catch {
            softAssert.add('Course enrolled is not found');
        }
    }

    private async findCourseCard(title: string) {
        const courseCard = this.page.locator(
            `//div[contains(@class,'courses-grid')]//h3[normalize-space()='${title}']/ancestor::div[1]`
        );

        await courseCard.scrollIntoViewIfNeeded();

        return courseCard;
    }
}
