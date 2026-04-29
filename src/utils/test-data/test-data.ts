export class TestData {
    sanitizeKeepSpaces(input: string): string {
        return input
            .replaceAll(/[^A-Za-z0-9 ]/g, '') // remove special chars, keep spaces
            .replaceAll(/\s+/g, ' ') // collapse multiple spaces into one
            .trim(); // optional: remove leading/trailing spaces
    }

    sanitizeNoSpace(input: string) {
        return input.replaceAll(/[^A-Za-z0-9]/g, '');
    }
}
