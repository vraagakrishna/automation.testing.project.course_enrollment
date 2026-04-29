import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { Course } from '../../models/course.model';
import { SoftAssert } from '../../utils/soft-assert ';

export class UserDashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async clickViewAllCourses() {
        console.log('Clicking View All courses Button');
        await this.clickByBtnRole('View All');
    }

    async validateEnrolledCourse(course: Course, softAssert: SoftAssert) {
        console.log(`Finding enrolled course: ${course.title}`);

        try {
            await this.findCourse(course.title);
            await softAssert.attachScreenshot('course-exists', this.page);
        } catch {
            console.log('Course did not exist!');
            await softAssert.attachScreenshot('course-does-not-exist', this.page);
        }
    }

    private async findCourse(courseTitle: string): Promise<Locator> {
        const courseCard = this.page.locator(
            `//div[contains(@class,'dashboard-grid')]//span[text()='${courseTitle}']/ancestor::div[2]`
        );

        await courseCard.scrollIntoViewIfNeeded();

        return courseCard;
    }
}
