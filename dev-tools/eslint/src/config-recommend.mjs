// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import js from '@eslint/js';
import oxlint from 'eslint-plugin-oxlint';
import prettier from 'eslint-plugin-prettier/recommended';
import { configs as tsConfigs } from 'typescript-eslint';

import { commons } from './common.mjs';
import importConfig from './import.mjs';
/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
	js.configs.recommended,
	...tsConfigs.recommended,
	prettier,
	...importConfig,
	...commons,
	// oxlint should be the last one
	// Turn off all rules already supported by oxlint.
	// https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/src/rules.rs
	...oxlint.configs['flat/recommended'],
];

export default eslintConfig;
