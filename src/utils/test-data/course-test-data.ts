import { faker } from '@faker-js/faker';
import { TestData } from './test-data';

export class CourseTestData extends TestData {
    public randomCourseName(): string {
        return this.sanitizeKeepSpaces(`${faker.person.jobArea()} at ${faker.company.name()}`);
    }

    public randomDescription(): string {
        return faker.lorem.paragraph();
    }

    public validDuration(): string {
        return faker.number.int({ min: 10, max: 100 }) + ' hours';
    }

    public validPrice(): number {
        return faker.number.int({ min: 100, max: 1000 });
    }

    public validThumbnailUrl(): string {
        return faker.internet.url();
    }

    public validTeamsLink(): string {
        return 'https://teams.microsoft.com/l/meetup-join/' + faker.internet.username();
    }
}
