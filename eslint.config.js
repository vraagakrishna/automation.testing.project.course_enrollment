import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import unicorn from 'eslint-plugin-unicorn';

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
            unicorn,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'off',

            'playwright/no-skipped-test': 'warn',
            'playwright/no-focused-test': 'error',

            '@typescript-eslint/no-floating-promises': 'error',

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
                {
                    selector: 'variable',
                    format: ['camelCase'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],

            'unicorn/filename-case': [
                'error',
                {
                    cases: {
                        kebabCase: true,
                    },
                },
            ],
        },
    },
];
