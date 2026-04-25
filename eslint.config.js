import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        ignores: ['node_modules', 'playwright-report', 'test-results'],
    },

    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            playwright,
        },
        rules: {
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',

            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'off',

            'playwright/no-skipped-test': 'warn',
            'playwright/no-focused-test': 'error',

            '@typescript-eslint/no-floating-promises': 'error',
        },
    },
];
