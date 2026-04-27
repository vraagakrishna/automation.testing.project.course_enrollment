import { faker } from "@faker-js/faker";

export class UserTestData {

    domains: string[] = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
    firstName = this.generateFakeFirstName();
    lastName = this.generateFakeLastName();
    email = this.generateFakeEmail();
    weakPassword = faker.internet.password({length: 6});
    password = this.generateFakePassword();

    private sanitize(input: string) {
        return input.replaceAll(/[^A-Za-z0-9]/g, "");
    }

    private randomDomain(): string {
        const randomIndex: number = Math.floor(Math.random() * this.domains.length);
        return this.domains[randomIndex];
    }

    private generateFakeFirstName(): string {
        return this.sanitize(faker.person.firstName());
    }

    private generateFakeLastName(): string {
        return this.sanitize(faker.person.lastName());
    }

    private generateFakeEmail(): string {
        const randomNumber = faker.number.int({ min: 1000, max: 9999 });
        return `${this.lastName}.${this.firstName}.${randomNumber}@${this.randomDomain()}`;
    }

    private generateFakePassword(): string {
        let newPassword: string = '';
        const specialCharRegex = /[!@#$%^&*()_+\-={}\[\]|:;'"<>,.?/]/;

        do {
            newPassword = faker.internet.password({length: 10 });
        } while (!specialCharRegex.test(newPassword));

        return newPassword;
    }
}