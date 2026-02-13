import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        rules: {
            'import/no-absolute-path': 'off',
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
            'no-undef': 'error',
            'no-unreachable': 'warn',
            'no-unused-vars': 'warn',
        },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
]);
