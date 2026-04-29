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

                // classes
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },

                // functions
                {
                    selector: 'function',
                    format: ['camelCase'],
                },

                // types, interfaces, enums
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },

                // variables + constants + parameters
                {
                    selector: 'variableLike',
                    format: ['camelCase', 'UPPER_CASE'],
                },

                // allow underscore prefix for unused params (IMPORTANT)
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
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
