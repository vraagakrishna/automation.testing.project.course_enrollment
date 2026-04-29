import { faker } from '@faker-js/faker';
import { TestData } from './test-data';

export class UserTestData extends TestData {
    domains: string[] = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    firstName = this.generateFakeFirstName();
    lastName = this.generateFakeLastName();
    email = this.generateFakeEmail();
    weakPassword = faker.internet.password({ length: 6 });
    password = this.generateFakePassword();

    private randomDomain(): string {
        const randomIndex: number = Math.floor(Math.random() * this.domains.length);
        return this.domains[randomIndex];
    }

    private generateFakeFirstName(): string {
        return this.sanitizeNoSpace(faker.person.firstName());
    }

    private generateFakeLastName(): string {
        return this.sanitizeNoSpace(faker.person.lastName());
    }

    private generateFakeEmail(): string {
        const randomNumber = faker.number.int({ min: 1000, max: 9999 });
        return `${this.lastName}.${this.firstName}.${randomNumber}@${this.randomDomain()}`;
    }

    private generateFakePassword(): string {
        let newPassword: string;

        const specialCharRegex = /[!@#$%^&*()_+\-={}[\]|:;'"<>,.?/]/;

        do {
            newPassword = faker.internet.password({ length: 10 });
        } while (!specialCharRegex.test(newPassword));

        return newPassword;
    }
}
