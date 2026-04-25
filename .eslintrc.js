module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:playwright/recommended',
        'prettier', // prevents conflict with prettier
    ],
    env: {
        node: true,
        es2022: true,
    },
    rules: {
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],

        'no-console': 'off', // useful in tests

        '@typescript-eslint/no-explicit-any': 'off',

        // Playwright-specific tweaks
        'playwright/no-skipped-test': 'warn',
        'playwright/no-focused-test': 'error',
    },
};
