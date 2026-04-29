export class TestData {
    sanitizeKeepSpaces(input: string): string {
    // Removes special characters, keeps letters, numbers, and spaces
    return input.replaceAll(/[^A-Za-z0-9 ]/g, '');
}

    sanitizeNoSpace(input: string) {
        return input.replaceAll(/[^A-Za-z0-9]/g, '');
    }
}