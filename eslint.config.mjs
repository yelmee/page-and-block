// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
    rules: {
        '@typescript-eslint/no-unused-vars':'off',
        '@typescript-eslint/no-explicit-any':'off',
    }
}, storybook.configs["flat/recommended"]);