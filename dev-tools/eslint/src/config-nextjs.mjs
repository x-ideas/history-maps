import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier/recommended';

import { commons } from './common.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
	...compat.extends('next', 'next/typescript'),
	prettier,
	...commons,
	{
		rules: {
			'import/no-anonymous-default-export': 'off',
		},
	},
];
export default eslintConfig;
