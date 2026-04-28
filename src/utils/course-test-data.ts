import { faker } from '@faker-js/faker';

export class CourseTestData {
    public randomCourseName(): string {
        return `${faker.person.jobArea()} at ${faker.company.name()}`;
    }

    public randomDescription(): string {
        return faker.lorem.paragraph();
    }

    public validDuration(): string {
        return faker.number.bigInt() + ' hours';
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
